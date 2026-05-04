---
"@aramiworks/ui": patch
---

Align Card surface tokens with Figma master (Montage canonical). Elevated card now uses `$surface` (was `$surfaceContainerLow`); filled card uses `$surfaceVariant` (was `$surfaceContainerHighest`). Outlined card unchanged. Visual change: elevated card is pure white in light mode and relies on shadow for separation; filled card is the surfaceVariant tint. Updates card specs story to drop `md.sys.color.*` references in favor of Montage token names.
