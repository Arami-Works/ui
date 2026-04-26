---
"@aramiworks/ui": patch
---

Wrap Storybook web preview in `SafeAreaProvider` so stories using `useSafeAreaInsets` (e.g. top-app-bar) render correctly in Chromatic.
