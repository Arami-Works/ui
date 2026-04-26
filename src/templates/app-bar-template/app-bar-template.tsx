import { View } from "tamagui";
import type { AppBarTemplateProps } from "./app-bar-template.type";

export function AppBarTemplate({
  topBar,
  children,
  testID,
}: AppBarTemplateProps) {
  return (
    <View flex={1} flexDirection="column" testID={testID}>
      {topBar}
      <View flex={1} testID={testID ? `${testID}-content` : undefined}>
        {children}
      </View>
    </View>
  );
}
