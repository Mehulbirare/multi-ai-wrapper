# Multi-AI Provider Wrapper

A unified interface that lets developers use multiple AI providers (OpenAI, Anthropic, Google Gemini) through one simple API. Write once, run everywhere.

**GitHub Repository**: [https://github.com/Mehulbirare/multi-ai-wrapper](https://github.com/Mehulbirare/multi-ai-wrapper)

## Features

- **Unified API**: Single interface for all providers.
- **Automatic Fallback**: Seamlessly switches to backup providers if one fails.
- **Cost Tracking**: Monitor spending across all providers in real-time.
- **Streaming Support**: Unified streaming interface.
- **Smart model aliases**: Use 'smart', 'fast', 'cheap' aliases.

## Installation

```bash
npm install multi-ai-wrapper
```

## 🚀 Next Steps: Getting Started

Once you've installed the package, follow these steps to integrate it into your project:

1.  **Get Your API Keys**:
    You'll need API keys for the providers you want to use:
    - [OpenAI API Key](https://platform.openai.com/api-keys)
    - [Anthropic API Key](https://console.anthropic.com/)
    - [Google AI Studio Key](https://aistudio.google.com/app/apikey)

2.  **Set Up Your Environment (Recommended)**:
    Store your keys securely. We recommend usng `dotenv`.
    
    Create a `.env` file:
    ```env
    OPENAI_API_KEY=sk-...
    ANTHROPIC_API_KEY=sk-...
    GEMINI_API_KEY=...
    ```

3.  **Initialize the Wrapper**:
    Create a new file (e.g., `ai-service.js`) and initialize the client:

    ```javascript
    require('dotenv').config(); // If using .env
    const AI = require('multi-ai-wrapper');

    const ai = new AI({
      providers: [
        { name: 'openai', apiKey: process.env.OPENAI_API_KEY, priority: 1 },
        { name: 'anthropic', apiKey: process.env.ANTHROPIC_API_KEY, priority: 2 }
      ]
    });
    
    module.exports = ai;
    ```

4.  **Start Chatting!**:
    Import your configured instance and start making requests using the unified API.

## Usage

### Basic Example

```javascript
const AI = require('multi-ai-wrapper');

const ai = new AI({
  providers: [
    { name: 'openai', apiKey: 'sk-...', priority: 1 },
    { name: 'anthropic', apiKey: 'sk-...', priority: 2 }
  ]
});

async function main() {
  const response = await ai.chat({
    message: "Write a haiku about coding",
    model: "smart", // Maps to gpt-4o or claude-3-5-sonnet
    temperature: 0.7
  });

  console.log(response.text);
  console.log(`Provider used: ${response.provider}`);
  console.log(`Cost: $${response.cost}`);
}

main();
```

### Streaming

```javascript
const stream = await ai.chatStream({
  message: "Write a long story",
  model: "fast"
});

for await (const chunk of stream) {
  process.stdout.write(chunk.text);
  console.log(` (Cost: $${chunk.costSoFar})`);
}
```

### Advanced Configuration

```javascript
const ai = new AI({
  providers: [
    { name: 'openai', apiKey: '...', priority: 1 },
    { name: 'gemini', apiKey: '...', priority: 2 }
  ],
  // Global options can be added here in future
});

// Get total stats
const stats = ai.getCostStats();
console.log(stats);
```

## Supported Providers & Models

- **OpenAI**: gpt-4o, gpt-4-turbo, gpt-3.5-turbo
- **Anthropic**: claude-3-5-sonnet, claude-3-opus, claude-3-haiku
- **Google Gemini**: gemini-1.5-pro, gemini-1.5-flash

## License

MIT
