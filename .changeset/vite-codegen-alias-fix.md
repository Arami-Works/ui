---
"@aramiworks/ui": patch
---

Fix Vite alias resolution for `react-native/Libraries/Utilities/codegenNativeComponent` so Storybook web builds (and dev server) resolve the spec import to a stub instead of failing with esbuild path errors.
