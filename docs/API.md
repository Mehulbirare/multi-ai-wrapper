# API Documentation

## `MultiAI` Class

The main entry point for the library.

### Constructor

```javascript
new MultiAI({
  providers: [
    { name: 'openai', apiKey: '...', priority: 1 },
    { name: 'anthropic', apiKey: '...', priority: 2 },
    { name: 'gemini', apiKey: '...', priority: 3 }
  ]
})
```

### `chat(options)`

Returns a promise that resolves to a response object.

**Options:**
- `message` (string): The user prompt.
- `messages` (array): Alternative to `message`, array of `{ role, content }`.
- `model` (string): Model name or alias ('smart', 'fast', 'cheap'). Default: provider specific default.
- `temperature` (number): 0.0 to 1.0.
- `maxTokens` (number): Maximum tokens to generate.

**Returns:**
- `text` (string): The generated response.
- `usage` (object): Token usage `{ promptTokens, completionTokens, totalTokens }`.
- `cost` (number): Estimated cost in USD.
- `provider` (string): The provider that handled the request.
- `model` (string): The specific model used.

### `chatStream(options)`

Returns an async generator that yields chunks.

**Options:** Same as `chat`.

**Yields:**
- `text` (string): The text chunk.
- `costSoFar` (number): Estimated cost so far.
- `provider` (string): The provider name.

### `getCostStats()`

Returns cost statistics.

**Returns:**
- `totalCost` (number)
- `totalRequests` (number)
- `byProvider` (object): Breakdown by provider.
