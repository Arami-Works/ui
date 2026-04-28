import { View } from "tamagui";
import type { AppShellTemplateProps } from "./app-shell-template.type";

export function AppShellTemplate({
  topAppBar,
  bottomNavigationBar,
  children,
  testID,
}: AppShellTemplateProps) {
  return (
    <View flex={1} flexDirection="column" testID={testID}>
      {topAppBar}
      <View flex={1} testID={testID ? `${testID}-content` : undefined}>
        {children}
      </View>
      {bottomNavigationBar}
    </View>
  );
}
