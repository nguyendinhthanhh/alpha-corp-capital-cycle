# Decision Log

## 2026-06-21 - AI Capital Tutor architecture

- Added a global `AI Capital Tutor` drawer that is route-aware and page-state aware.
- The frontend runs in demo/rule-based mode by default so no API key is required in the browser.
- Context is built from verified project data (`caseData`, `capitalLabData`, `capitalFlowStages`) and page state from the active route.
- A right-side panel is used on desktop; on mobile the same surface becomes a bottom sheet.
- Transparency for AI scope, fallback behavior, and context inputs is exposed in the Appendix page.
- The implementation avoids a generic chat bubble and instead pushes contextual actions, source labels, and structured summaries.

## 2026-06-21 - Server-side AI grounding

- Replaced the frontend-first tutor flow with a server-first `POST /api/ai/chat` pipeline.
- Added provider adapters so the project can use `openai-compatible` or `gemini-native` without exposing secrets to the browser.
- Moved retrieval, verified knowledge assembly, prompt construction, response normalization, and fallback generation to `server/`.
- Disabled silent frontend fallback. The browser now either receives a real provider-backed response, an explicitly labeled fallback from the server, or a configuration/error message.
- Added `docs/02-ACADEMIC-SOURCE-OF-TRUTH.md` as the canonical grounding note for AI tutor behavior.
