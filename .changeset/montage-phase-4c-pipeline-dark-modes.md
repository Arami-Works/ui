---
"@aramiworks/ui": patch
---

Token pipeline now extracts all Figma modes (Light + Dark) and auto-generates `colors.ts` and `colors-dark.ts` in a single pass. `colors-dark.ts` was previously hand-maintained — it is now regenerated from Figma Variables with identical values.
