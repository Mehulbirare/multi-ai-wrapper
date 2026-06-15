# 🤖 Multi-AI Wrapper

[![npm version](https://img.shields.io/npm/v/multi-ai-wrapper.svg?style=flat-square)](https://www.npmjs.com/package/multi-ai-wrapper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![OpenAI](https://img.shields.io/badge/OpenAI-Enabled-green.svg?style=flat-square)](https://platform.openai.com)
[![Anthropic](https://img.shields.io/badge/Anthropic-Enabled-orange.svg?style=flat-square)](https://www.anthropic.com)
[![Google Gemini](https://img.shields.io/badge/Gemini-Enabled-blue.svg?style=flat-square)](https://ai.google.dev)

**The Universal API for Generative AI.**

Use OpenAI (GPT-4), Anthropic (Claude 3.5), and Google Gemini through a **single, unified interface**. Never worry about API downtime again with built-in **automatic fallbacks**. Monitor every penny with **real-time cost tracking**.

> **Build reliable, cost-effective AI applications in minutes, not days.**

🌟 **GitHub Repository**: [https://github.com/Mehulbirare/multi-ai-wrapper](https://github.com/Mehulbirare/multi-ai-wrapper)

---

## 🆕 What's New in v1.0.2

- **Fixed cost calculation accuracy** — model pricing now matches the most specific model name, so `gpt-4o` / `gpt-4o-mini` / `gpt-4-turbo` are no longer mispriced as `gpt-4` (previously this overestimated `gpt-4o` cost by ~6×). The same robust matching now applies to the Anthropic and Gemini providers.
- **Hardened cost math** — guards against missing token counts so a partial usage payload can never produce `NaN`.
- **Fixed the test script** — `npm test` now runs Jest correctly (it previously failed because Jest specs were executed with plain `node`).
- **Added `.gitignore`** — keeps `node_modules/`, `.env`, and local tooling out of version control.

---

## ⚡ Why Use Multi-AI Wrapper?

Developers choose `multi-ai-wrapper` over LangChain or official SDKs because it solves the biggest problems in AI integration:

| Feature | `multi-ai-wrapper` | Official SDKs | LangChain |
| :--- | :---: | :---: | :---: |
| **Unified API** | ✅ Yes | ❌ No | ✅ Yes |
| **Automatic Fallback** | ✅ **Built-in** | ❌ Manual | ⚠️ Complex |
| **Cost Tracking** | ✅ **Real-time (USD)** | ❌ No | ❌ Difficult |
| **Lightweight** | ✅ **Extremely** | ✅ Yes | ❌ Heavy |
| **Streaming** | ✅ **Unified Stream** | ⚠️ Varies | ✅ Yes |

### Key Benefits

1.  **Zero Downtime (High Availability)**: If OpenAI is down, your app automatically switches to Anthropic or Gemini. Your users never see an error.
2.  **Accurate Cost Optimization**: Track spending per provider and model with correct per-model pricing (GPT-4o, GPT-4o-mini, Claude 3.5, Gemini, etc. are each priced individually). Switch to cheaper models instantly with aliases like `"cheap"` or `"smart"`.
3.  **No Vendor Lock-in**: Write your code once. Switch providers by changing one line of configuration.
4.  **Developer Experience**: Simple, intuitive API that just works. No complex abstractions or boilerplate.

---

## 📦 Installation

```bash
npm install multi-ai-wrapper
```

## 🚀 Quick Start

### 1. Initialize

Create a single instance for your entire app.

```javascript
const AI = require('multi-ai-wrapper');

const ai = new AI({
  providers: [
    { name: 'openai', apiKey: process.env.OPENAI_API_KEY, priority: 1 },    // Primary
    { name: 'anthropic', apiKey: process.env.ANTHROPIC_API_KEY, priority: 2 } // Backup
  ]
});
```

### 2. Chat (Unified API)

```javascript
const response = await ai.chat({
  message: "Explain quantum computing to a 5-year-old",
  model: "smart", // Automatically uses GPT-4o or Claude 3.5 Sonnet
  temperature: 0.7
});

console.log(response.text);
console.log(`Provider used: ${response.provider}`); // e.g., "openai"
console.log(`Cost: $${response.cost}`); // e.g., "$0.0024"
```

### 3. Stream (Real-time)

```javascript
const stream = await ai.chatStream({
  message: "Write a futuristic story...",
  model: "fast" // Automatically uses GPT-4o-mini or Gemini Flash
});

for await (const chunk of stream) {
  process.stdout.write(chunk.text);
}
```

---

## 🔧 Advanced Features

### Smart Model Aliases

Don't memorize model names. Use aliases that map to the best option for each provider:

-   `"smart"`: Best capability (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro)
-   `"fast"`: Low latency (GPT-4o-mini, Claude Haiku, Gemini Flash)
-   `"cheap"`: Lowest cost (GPT-4o-mini, Gemini Flash)

### Detailed Cost Analytics

```javascript
const stats = ai.getCostStats();
console.log(stats);
/*
{
  totalCost: 0.145,
  totalRequests: 52,
  byProvider: {
    openai: { cost: 0.120, requests: 40 },
    anthropic: { cost: 0.025, requests: 12 }
  }
}
*/
```

---

## 📚 Documentation

For a deep dive into architecture and advanced configuration, see the [Detailed Explanation & Guide](docs/DETAILED_EXPLANATION.md).

## 🤝 Contributing

We welcome contributions! Whether it's adding a new provider (Mistral, Cohere, etc.) or fixing a bug, please check out our repository.

## 📄 License

MIT © [Mehulbirare](https://github.com/Mehulbirare)
