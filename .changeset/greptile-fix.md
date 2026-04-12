---
"@aramiworks/ui": patch
---

fix(useConfirmDialog): stabilize callbacks with refs to prevent stale closures and Modal remounts; remove redundant react-native Text wrapper inside Dialog body

fix(menu): reset submenu state on close, guard disabled subitems, add submenu accessibility role

fix(full-screen-dialog): scope keyboardShouldPersistTaps to keyboardAvoiding=true only
