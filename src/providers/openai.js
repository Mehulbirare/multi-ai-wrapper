const OpenAI = require('openai');
const AIProvider = require('./base');
const { estimateTokens } = require('../utils/token-counter');

const PRICING = {
    'gpt-4': { input: 0.03, output: 0.06 },
    'gpt-4-turbo': { input: 0.01, output: 0.03 },
    'gpt-3.5-turbo': { input: 0.0005, output: 0.0015 },
    'gpt-4o': { input: 0.005, output: 0.015 },
    'gpt-4o-mini': { input: 0.00015, output: 0.0006 }
};

class OpenAIProvider extends AIProvider {
    constructor(config) {
        super(config);
        this.client = new OpenAI({ apiKey: config.apiKey });
    }

    async chat(options) {
        const messages = options.messages || [{ role: 'user', content: options.message }];

        try {
            const response = await this.client.chat.completions.create({
                model: options.model || 'gpt-3.5-turbo',
                messages: messages,
                max_tokens: options.maxTokens,
                temperature: options.temperature,
            });

            const usage = response.usage;
            const cost = this.calculateCost(usage, response.model);

            return {
                text: response.choices[0].message.content,
                usage: {
                    promptTokens: usage.prompt_tokens,
                    completionTokens: usage.completion_tokens,
                    totalTokens: usage.total_tokens,
                },
                cost,
                provider: 'openai',
                model: response.model
            };
        } catch (error) {
            throw new Error(`OpenAI API Error: ${error.message}`);
        }
    }

    async *chatStream(options) {
        const messages = options.messages || [{ role: 'user', content: options.message }];

        try {
            const stream = await this.client.chat.completions.create({
                model: options.model || 'gpt-3.5-turbo',
                messages: messages,
                max_tokens: options.maxTokens,
                temperature: options.temperature,
                stream: true,
            });

            let promptTokens = this.estimatePromptTokens(messages);
            let outputText = '';

            for await (const chunk of stream) {
                const text = chunk.choices[0]?.delta?.content || '';
                if (text) {
                    outputText += text;
                    const completionTokens = estimateTokens(outputText);
                    const cost = this.calculateCost({ prompt_tokens: promptTokens, completion_tokens: completionTokens }, options.model || 'gpt-3.5-turbo');

                    yield {
                        text,
                        costSoFar: cost,
                        provider: 'openai'
                    };
                }
            }
        } catch (error) {
            throw new Error(`OpenAI Stream Error: ${error.message}`);
        }
    }

    estimatePromptTokens(messages) {
        return messages.reduce((acc, m) => acc + estimateTokens(m.content), 0);
    }

    calculateCost(usage, modelName) {
        // Simple logic to match model prefix
        const pricing = Object.entries(PRICING).find(([key]) => modelName.includes(key))?.[1];
        if (!pricing) return 0;

        const inputCost = (usage.prompt_tokens / 1000) * pricing.input;
        const outputCost = (usage.completion_tokens / 1000) * pricing.output;
        return inputCost + outputCost;
    }
}

module.exports = OpenAIProvider;
