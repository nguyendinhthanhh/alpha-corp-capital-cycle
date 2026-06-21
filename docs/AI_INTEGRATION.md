# AI Integration

AI Capital Tutor hien su dung backend nho o `server/` lam diem vao duy nhat cho chat AI. Frontend chi goi `POST /api/ai/chat`.

## Environment

Tao `.env.local` tu `.env.example` va cau hinh mot trong hai cach:

1. `AI_PROVIDER=openai-compatible`
   - `AI_BASE_URL`
   - `AI_API_KEY`
   - `AI_MODEL`

2. `AI_PROVIDER=gemini-native`
   - `GEMINI_API_KEY`
   - `GEMINI_MODEL`

Bien bo sung:

- `AI_DEMO_MODE=false`
- `AI_SERVER_PORT=8787`
- `AI_REQUEST_TIMEOUT_MS=30000`
- `AI_MAX_OUTPUT_TOKENS=1000`

## Running locally

Chay ca client va server:

```bash
npm run dev
```

Hoac chay rieng:

```bash
npm run dev:client
npm run dev:server
```

## Behavior

- Frontend luon goi `POST /api/ai/chat`.
- Vite dev proxy chuyen `/api` sang `http://localhost:8787`.
- Neu provider AI loi trong luc server van hoat dong, server tra ve fallback co dan nhan ro.
- Neu backend chua cau hinh provider, UI hien loi cau hinh thay vi gia vo da ket noi AI that.
