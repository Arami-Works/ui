---
"@aramiworks/ui": patch
---

slider, switch: bind hardcoded white fills in Figma masters to onPrimary token. Slider discrete-enabled ticks (5 ellipses) and Switch selected-enabled thumb were drawn with raw #FFFFFF — now bound to `onPrimary` so theme + dark mode work correctly. Code already used `onPrimary`; only Figma was drifted.
