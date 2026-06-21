# AI Integration

The AI tutor now talks to Gemini through a local Node proxy. The API key stays on the server side and is not bundled into the frontend.

## Environment

Create a local `.env.local` file from `.env.example` and set:

- `GEMINI_API_KEY`
- `GEMINI_MODEL=gemini-2.5-flash`
- `AI_PROXY_PORT=8787` if you want a different port
- `VITE_AI_CHAT_URL` only if you want to override the default `/api/ai-chat`

## Running locally

1. Start the Gemini proxy:

```bash
npm run ai:proxy
```

2. Start the Vite app in another terminal:

```bash
npm run dev
```

Or run both together:

```bash
npm run dev:ai
```

## Behavior

- The frontend always calls `/api/ai-chat` by default.
- In dev, Vite proxies that path to `http://localhost:8787`.
- If the proxy is unavailable or Gemini errors, the app falls back to the local rule-based tutor.
