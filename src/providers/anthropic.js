const Anthropic = require('@anthropic-ai/sdk');
const AIProvider = require('./base');
const { estimateTokens } = require('../utils/token-counter');

const PRICING = {
    'claude-3-opus': { input: 15.00, output: 75.00 },
    'claude-3-sonnet': { input: 3.00, output: 15.00 },
    'claude-3-haiku': { input: 0.25, output: 1.25 },
    'claude-3-5-sonnet': { input: 3.00, output: 15.00 },
};

class AnthropicProvider extends AIProvider {
    constructor(config) {
        super(config);
        this.client = new Anthropic({ apiKey: config.apiKey });
    }

    async *chatStream(options) {
        const messages = options.messages || [{ role: 'user', content: options.message }];
        const model = options.model || 'claude-3-5-sonnet-20240620';

        try {
            const stream = await this.client.messages.create({
                model: model,
                max_tokens: options.maxTokens || 1024,
                messages: messages,
                temperature: options.temperature,
                stream: true,
            });

            let promptTokens = this.estimatePromptTokens(messages);
            let outputText = '';

            for await (const chunk of stream) {
                if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
                    const text = chunk.delta.text;
                    outputText += text;
                    const outputTokens = estimateTokens(outputText);
                    const cost = this.calculateCost({ input_tokens: promptTokens, output_tokens: outputTokens }, model);

                    yield {
                        text,
                        costSoFar: cost,
                        provider: 'anthropic'
                    };
                }
            }
        } catch (error) {
            throw new Error(`Anthropic Stream Error: ${error.message}`);
        }
    }

    estimatePromptTokens(messages) {
        return messages.reduce((acc, m) => acc + estimateTokens(m.content), 0);
    }

    async chat(options) {
        const messages = options.messages || [{ role: 'user', content: options.message }];
        const model = options.model || 'claude-3-5-sonnet-20240620';

        try {
            const response = await this.client.messages.create({
                model: model,
                max_tokens: options.maxTokens || 1024,
                messages: messages,
                temperature: options.temperature,
            });

            const usage = response.usage;
            const cost = this.calculateCost(usage, model);

            return {
                text: response.content[0].text,
                usage: {
                    promptTokens: usage.input_tokens,
                    completionTokens: usage.output_tokens,
                    totalTokens: usage.input_tokens + usage.output_tokens,
                },
                provider: 'anthropic',
                cost,
                model: model
            };
        } catch (error) {
            throw new Error(`Anthropic API Error: ${error.message}`);
        }
    }

    calculateCost(usage, modelName) {
        const pricingKey = Object.keys(PRICING).find(key => modelName.includes(key));
        const pricing = PRICING[pricingKey];
        if (!pricing) return 0;

        const inputCost = (usage.input_tokens / 1000000) * pricing.input;
        const outputCost = (usage.output_tokens / 1000000) * pricing.output;
        return inputCost + outputCost;
    }
}

module.exports = AnthropicProvider;
