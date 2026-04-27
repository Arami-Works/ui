---
"@aramiworks/ui": patch
---

Bind design system Figma file to Montage tokens. The design system file (`b79qv459pnXaypgNQfNXuc`) now owns `color` (light + dark modes), `radii`, and `spacing` variable collections, with all master components rebound from MD3 defaults to these variables. The token pipeline gains alpha-aware hex output and aliases for the new collection names, allowing `colors.ts` to round-trip identically from the Figma file.
