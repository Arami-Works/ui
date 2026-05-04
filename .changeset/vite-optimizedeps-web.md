---
"@aramiworks/ui": patch
---

Apply web extension priority to Vite's `optimizeDeps` so packages like `react-native-safe-area-context` resolve to their `.web.js` variants in the dev server (matching `resolve.extensions`). Fixes a runtime "Element type is invalid" error in Storybook web caused by the native specs being pre-bundled instead of the web implementations.
