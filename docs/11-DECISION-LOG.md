# Decision Log

## 2026-06-21 - AI Capital Tutor architecture

- Added a global `AI Capital Tutor` drawer that is route-aware and page-state aware.
- The frontend runs in demo/rule-based mode by default so no API key is required in the browser.
- Context is built from verified project data (`caseData`, `capitalLabData`, `capitalFlowStages`) and page state from the active route.
- A right-side panel is used on desktop; on mobile the same surface becomes a bottom sheet.
- Transparency for AI scope, fallback behavior, and context inputs is exposed in the Appendix page.
- The implementation avoids a generic chat bubble and instead pushes contextual actions, source labels, and structured summaries.

