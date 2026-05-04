---
"@aramiworks/ui": patch
---

Bind Table Figma master variants to Montage tokens: variant frame fill→`surface`, stroke→`outline`. TableHeader fill→`surfaceVariant`. Code aligned to match: header and stripe rows now use `$surfaceVariant` (was `$surfaceContainerHighest`/`$surfaceContainer`). TableRow alt stripe in Figma kept hardcoded (#FAFAFA has no exact Montage token — flagged as follow-up). Update table specs story to reference Montage token names.
