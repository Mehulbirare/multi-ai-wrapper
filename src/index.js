const MultiAI = require('./core/router');
const OpenAIProvider = require('./providers/openai');
const AnthropicProvider = require('./providers/anthropic');
const GeminiProvider = require('./providers/gemini');

// Export the main class as default export (or named export if desired)
module.exports = MultiAI;

// Also export providers for direct usage (optional)
module.exports.OpenAIProvider = OpenAIProvider;
module.exports.AnthropicProvider = AnthropicProvider;
module.exports.GeminiProvider = GeminiProvider;
