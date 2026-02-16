# 🤖 Multi-AI Wrapper Documentation

Welcome to the **Multi-AI Wrapper** documentation! This is your comprehensive guide to integrating and using the universal API for generative AI.

## 📖 Documentation Pages

### [API Documentation](API.md)
Complete API reference for the `MultiAI` class, including:
- Constructor options
- `chat()` method
- `chatStream()` method for real-time streaming
- `getCostStats()` for cost tracking
- Full parameter and return type specifications

### [Detailed Explanation & Integration Guide](DETAILED_EXPLANATION.md)
In-depth coverage of:
- How the Multi-AI Wrapper works internally
- Core components and architecture
- Provider adapters and routing
- Step-by-step integration guide for production applications
- Best practices for API key management
- Monitoring and analytics setup

### [SEO & Promotion Guide](SEO_AND_PROMOTION.md)
Marketing and promotion strategies for the Multi-AI Wrapper project

---

## 🚀 Quick Start

If you're new to Multi-AI Wrapper, here's a quick example to get you started:

```javascript
const AI = require('multi-ai-wrapper');

const ai = new AI({
  providers: [
    { name: 'openai', apiKey: process.env.OPENAI_API_KEY, priority: 1 },
    { name: 'anthropic', apiKey: process.env.ANTHROPIC_API_KEY, priority: 2 }
  ]
});

const response = await ai.chat({
  message: "Explain quantum computing to a 5-year-old",
  model: "smart",
  temperature: 0.7
});

console.log(response.text);
console.log(`Cost: $${response.cost}`);
```

## 🔗 Additional Resources

- **Main Repository**: [https://github.com/Mehulbirare/multi-ai-wrapper](https://github.com/Mehulbirare/multi-ai-wrapper)
- **npm Package**: [https://www.npmjs.com/package/multi-ai-wrapper](https://www.npmjs.com/package/multi-ai-wrapper)
- **Contributing Guide**: [CONTRIBUTING.md](../CONTRIBUTING.md)

## 💡 Key Features

- ✅ **Unified API** for OpenAI, Anthropic, and Google Gemini
- ✅ **Automatic Fallback** - Zero downtime if a provider is unavailable
- ✅ **Real-time Cost Tracking** in USD
- ✅ **Smart Model Aliases** - Use "smart", "fast", or "cheap" instead of model IDs
- ✅ **Streaming Support** with unified interface
- ✅ **Lightweight** with minimal dependencies

---

## 📄 License

MIT © [Mehulbirare](https://github.com/Mehulbirare)
