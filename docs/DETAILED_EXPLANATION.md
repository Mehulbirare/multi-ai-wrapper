# Detailed Explanation & Next Steps

This document provides a comprehensive overview of how the **Multi-AI Wrapper** works under the hood and outlines the recommended path for integrating and extending it in your projects.

---

## 🏗️ How It Works

The **Multi-AI Wrapper** acts as a robust middle layer between your application and various AI providers (OpenAI, Anthropic, Google Gemini). Instead of managing separate SDKs and error handling logic for each service, you interact with a single, unified `MultiAI` class.

### Core Components

1.  **The Router (`MultiAI` Class)**:
    -   This is the main entry point. It accepts an array of provider configurations.
    -   **Priority System**: Providers are sorted by `priority`. If the primary provider (e.g., OpenAI) fails, the router automatically catches the error and tries the next provider in the list (e.g., Anthropic).
    -   **Model Aliasing**: It translates generic model names like `"smart"`, `"fast"`, or `"cheap"` into specific model IDs for each provider (e.g., `gpt-4o` vs `claude-3-5-sonnet`).

2.  **Provider Adapters**:
    -   Each provider (OpenAI, Anthropic, Gemini) has its own adapter class extending a common `AIProvider` base class.
    -   These adapters normalize inputs (messages, temperature) and outputs (text response, token usage).
    -   **Cost Tracking**: Each adapter knows the pricing for its supported models and calculates the estimated cost for every request.

3.  **Streaming & Token Estimation**:
    -   The wrapper unifies streaming interfaces into a single async generator (`chatStream`).
    -   It includes a utility to estimate token usage for streaming responses (where official usage data might be delayed or missing), allowing for real-time cost tracking.

---

## 🚀 Integration Guide: Next Steps

Now that you have the package installed, here is the recommended workflow to integrate it into your production application.

### Step 1: Secure Your API Keys

Do **not** hardcode API keys in your codebase. Use environment variables.

1.  Create a `.env` file in your project root:
    ```env
    OPENAI_API_KEY=sk-proj-...
    ANTHROPIC_API_KEY=sk-ant-...
    GEMINI_API_KEY=AIzaSy...
    ```
2.  Install `dotenv` to load these variables:
    ```bash
    npm install dotenv
    ```

### Step 2: Create a Centralized AI Service

Instead of initializing the `MultiAI` class in every file, create a dedicated service module (e.g., `services/ai.js` or `lib/ai.ts`).

**`services/ai.js`**:
```javascript
require('dotenv').config();
const MultiAI = require('multi-ai-wrapper');

const aiService = new MultiAI({
  providers: [
    { 
      name: 'openai', 
      apiKey: process.env.OPENAI_API_KEY, 
      priority: 1 // Primary provider
    },
    { 
      name: 'anthropic', 
      apiKey: process.env.ANTHROPIC_API_KEY, 
      priority: 2 // First fallback
    },
    { 
      name: 'gemini', 
      apiKey: process.env.GEMINI_API_KEY, 
      priority: 3 // Second fallback
    }
  ]
});

module.exports = aiService;
```

### Step 3: Implement in Your Application Logic

Import your service and use it in your API routes or backend logic.

**Example: Express.js Route**
```javascript
const express = require('express');
const aiService = require('./services/ai');
const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    // changing model is as easy as changing a string
    const response = await aiService.chat({
      message,
      model: 'smart', 
      temperature: 0.7
    });

    // Log the cost for analytics
    console.log(`Request Cost: $${response.cost} (Provider: ${response.provider})`);

    res.json({ reply: response.text });
  } catch (error) {
    res.status(500).json({ error: 'AI Service currently unavailable.' });
  }
});
```

### Step 4: Monitoring & Analytics

Use the built-in cost tracking to build an internal dashboard or log usage.

```javascript
// At any point, check the aggregated stats
const stats = aiService.getCostStats();

console.log('Total Spend:', stats.totalCost);
console.log('Spend by Provider:', stats.byProvider);
```

---

## 📦 Publishing Your Wrapper (Optional)

If you want to share your customized version of this wrapper or publish the package to NPM yourself:

1.  **Login to NPM**:
    ```bash
    npm login
    ```
2.  **Verify Package Details**:
    Ensure `package.json` has a unique `name` and correct `version`.
3.  **Publish**:
    ```bash
    npm publish --access public
    ```
    *(Note: You'll need to remove `private: true` from package.json if it exists)*

---

## 🛠️ Extending the Package

Users often need to add more providers (e.g., Mistral, Cohere, or local LLMs via Ollama).

1.  **Create a New Adapter**:
    Copy `src/providers/openai.js` and rename it (e.g., `ollama.js`).
2.  **Implement Methods**:
    Implement `chat()` and `chatStream()` using the new provider's SDK or API.
3.  **Register Provider**:
    Import the new class in `src/core/router.js` and add it to the `PROVIDER_MAP`.
4.  **Add Pricing**:
    Add the model pricing to the `PRICING` constant in your new adapter file.
