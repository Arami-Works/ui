---
"@aramiworks/ui": minor
---

TopAppBar: apply top safe-area inset internally via `useSafeAreaInsets`, and add a `trailingContent?: ReactNode` slot to support text/destructive actions (e.g. 수정/삭제 in stock-tracker accounts-detail) when the icon-only `actions` API isn't sufficient. The `trailingContent` slot replaces `actions` when both are provided.
