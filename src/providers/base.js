class AIProvider {
    constructor(config = {}) {
        this.name = config.name || 'unknown';
        this.apiKey = config.apiKey;
        this.priority = config.priority || 999;
    }

    async chat(options) {
        throw new Error('Chat method must be implemented by provider');
    }

    async chatStream(options) {
        throw new Error('Chat stream method must be implemented by provider');
    }

    getCost(usage, model) {
        throw new Error('Cost calculation method must be implemented by provider');
    }
}

module.exports = AIProvider;
