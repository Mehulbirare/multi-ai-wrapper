const { GoogleGenerativeAI } = require('@google/generative-ai');
const AIProvider = require('./base');
const { estimateTokens } = require('../utils/token-counter');

const PRICING = {
    'gemini-1.5-flash': { input: 0.35, output: 1.05 },
    'gemini-1.5-pro': { input: 3.50, output: 10.50 },
    'gemini-pro': { input: 0.50, output: 1.50 }, // Legacy
};

class GeminiProvider extends AIProvider {
    constructor(config) {
        super(config);
        this.genAI = new GoogleGenerativeAI(config.apiKey);
    }

    async chat(options) {
        const modelName = options.model || 'gemini-1.5-flash';
        const model = this.genAI.getGenerativeModel({ model: modelName });
        const prompt = options.message;

        try {
            let result;
            let text = '';
            let usage = {};

            if (options.messages && options.messages.length > 0) {
                const history = options.messages.slice(0, -1).map(m => ({
                    role: m.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: m.content }]
                }));

                const lastMessage = options.messages[options.messages.length - 1].content;
                const chat = model.startChat({
                    history: history,
                    generationConfig: {
                        maxOutputTokens: options.maxTokens,
                        temperature: options.temperature,
                    },
                });

                result = await chat.sendMessage(lastMessage);
            } else {
                result = await model.generateContent({
                    contents: [{ role: 'user', parts: [{ text: prompt }] }],
                    generationConfig: {
                        maxOutputTokens: options.maxTokens,
                        temperature: options.temperature
                    }
                });
            }

            const response = await result.response;
            text = response.text();

            const usageMetadata = response.usageMetadata;
            if (usageMetadata) {
                usage = {
                    promptTokens: usageMetadata.promptTokenCount,
                    completionTokens: usageMetadata.candidatesTokenCount,
                    totalTokens: usageMetadata.totalTokenCount
                };
            } else {
                // Fallback estimation
                const promptTokens = this.estimatePromptTokens(options.messages || [{ role: 'user', content: prompt }]);
                const completionTokens = estimateTokens(text);
                usage = {
                    promptTokens,
                    completionTokens,
                    totalTokens: promptTokens + completionTokens
                };
            }

            const cost = this.calculateCost(usage, modelName);

            return {
                text,
                usage,
                cost,
                provider: 'gemini',
                model: modelName
            };

        } catch (error) {
            throw new Error(`Gemini API Error: ${error.message}`);
        }
    }

    async *chatStream(options) {
        const modelName = options.model || 'gemini-1.5-flash';
        const model = this.genAI.getGenerativeModel({ model: modelName });
        const prompt = options.message;

        try {
            let result;

            if (options.messages && options.messages.length > 0) {
                // Chat stream
                const history = options.messages.slice(0, -1).map(m => ({
                    role: m.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: m.content }]
                }));
                const lastMessage = options.messages[options.messages.length - 1].content;
                const chat = model.startChat({
                    history: history,
                    generationConfig: {
                        maxOutputTokens: options.maxTokens,
                        temperature: options.temperature
                    }
                });
                result = await chat.sendMessageStream(lastMessage);
            } else {
                // Generate content stream
                result = await model.generateContentStream({
                    contents: [{ role: 'user', parts: [{ text: prompt }] }],
                    generationConfig: {
                        maxOutputTokens: options.maxTokens,
                        temperature: options.temperature
                    }
                });
            }

            let promptTokens = this.estimatePromptTokens(options.messages || [{ role: 'user', content: prompt }]);
            let outputText = '';

            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                if (chunkText) {
                    outputText += chunkText;
                    const completionTokens = estimateTokens(outputText);
                    const cost = this.calculateCost({ promptTokens, completionTokens }, modelName);
                    yield {
                        text: chunkText,
                        costSoFar: cost,
                        provider: 'gemini'
                    };
                }
            }

        } catch (error) {
            throw new Error(`Gemini Stream Error: ${error.message}`);
        }
    }

    estimatePromptTokens(messages) {
        return messages.reduce((acc, m) => acc + estimateTokens(m.content), 0);
    }

    calculateCost(usage, modelName) {
        const pricingKey = Object.keys(PRICING).find(key => modelName.includes(key));
        const pricing = PRICING[pricingKey];
        if (!pricing) return 0;

        // Usage keys might differ if coming from verify vs stream
        const pTokens = usage.promptTokens || usage.prompt_tokens || 0;
        const cTokens = usage.completionTokens || usage.completion_tokens || 0;

        const inputCost = (pTokens / 1000000) * pricing.input;
        const outputCost = (cTokens / 1000000) * pricing.output;
        return inputCost + outputCost;
    }
}

module.exports = GeminiProvider;
