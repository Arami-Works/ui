import { View } from "tamagui";
import type { NavigationTemplateProps } from "./navigation-template.type";

export function NavigationTemplate({
  navBar,
  children,
  testID,
}: NavigationTemplateProps) {
  return (
    <View flex={1} flexDirection="column" testID={testID}>
      <View flex={1} testID={testID ? `${testID}-content` : undefined}>
        {children}
      </View>
      {navBar}
    </View>
  );
}
