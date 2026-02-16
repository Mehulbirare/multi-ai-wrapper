const OpenAIProvider = require('../providers/openai');
const AnthropicProvider = require('../providers/anthropic');
const GeminiProvider = require('../providers/gemini');

const PROVIDER_MAP = {
    openai: OpenAIProvider,
    anthropic: AnthropicProvider,
    gemini: GeminiProvider,
};

const MODEL_ALIASES = {
    smart: {
        openai: 'gpt-4o',
        anthropic: 'claude-3-5-sonnet-20240620',
        gemini: 'gemini-1.5-pro',
    },
    fast: {
        openai: 'gpt-4o-mini',
        anthropic: 'claude-3-haiku-20240307',
        gemini: 'gemini-1.5-flash',
    },
    cheap: {
        openai: 'gpt-4o-mini',
        anthropic: 'claude-3-haiku-20240307',
        gemini: 'gemini-1.5-flash',
    },
};

class MultiAI {
    constructor(config = {}) {
        this.providers = [];
        this.costStats = {
            totalCost: 0,
            totalRequests: 0,
            byProvider: {},
        };

        if (config.providers) {
            this.providers = config.providers
                .map((pConfig) => {
                    const ProviderClass = PROVIDER_MAP[pConfig.name];
                    if (!ProviderClass) {
                        console.warn(`Provider ${pConfig.name} not supported.`);
                        return null;
                    }
                    return new ProviderClass(pConfig);
                })
                .filter(Boolean)
                .sort((a, b) => (a.priority || 999) - (b.priority || 999));
        }
    }

    getProvider(name) {
        return this.providers.find((p) => p.name === name);
    }

    resolveModel(alias, providerName) {
        if (MODEL_ALIASES[alias] && MODEL_ALIASES[alias][providerName]) {
            return MODEL_ALIASES[alias][providerName];
        }
        return alias; // Return as is if not an alias
    }

    async chat(options) {
        let lastError;
        const errors = [];

        // Try providers in order
        for (const provider of this.providers) {
            try {
                const model = this.resolveModel(options.model, provider.name);
                // Clone options to avoid mutating original
                const requestOptions = { ...options, model };

                const response = await provider.chat(requestOptions);

                this.trackCost(response);
                return response;
            } catch (error) {
                console.warn(`Provider ${provider.name} failed: ${error.message}`);
                errors.push({ provider: provider.name, error: error.message });
                lastError = error;
                // Continue to next provider (Fallback)
            }
        }

        throw new Error(`All providers failed. Errors: ${JSON.stringify(errors)}`);
    }

    async *chatStream(options) {
        const errors = [];
        let hasYielded = false;

        // Try providers in order
        for (const provider of this.providers) {
            try {
                const model = this.resolveModel(options.model, provider.name);
                // Avoid modifying options object
                const requestOptions = { ...options, model };

                // Attempt to get the stream
                // Note: some providers might not throw until iteration starts
                const stream = provider.chatStream(requestOptions);

                for await (const chunk of stream) {
                    hasYielded = true;
                    yield chunk;
                }

                // If we finished successfully, return
                return;
            } catch (error) {
                console.warn(`Provider ${provider.name} stream failed: ${error.message}`);
                errors.push({ provider: provider.name, error: error.message });

                // If we already sent data to the user, we can't cleanly fallback 
                // because the user has already received partial content.
                // We must abort and throw.
                if (hasYielded) {
                    throw new Error(`Stream failed after sending data (Provider: ${provider.name}). Cannot fallback. Error: ${error.message}`);
                }
                // Otherwise, try next provider
            }
        }

        throw new Error(`All providers failed streaming. Errors: ${JSON.stringify(errors)}`);
    }

    trackCost(response) {
        if (response.cost) {
            this.costStats.totalCost += response.cost;
            this.costStats.totalRequests += 1;

            if (!this.costStats.byProvider[response.provider]) {
                this.costStats.byProvider[response.provider] = { cost: 0, requests: 0 };
            }
            this.costStats.byProvider[response.provider].cost += response.cost;
            this.costStats.byProvider[response.provider].requests += 1;
        }
    }

    getCostStats() {
        return this.costStats;
    }
}

module.exports = MultiAI;
