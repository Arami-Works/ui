import { View } from "tamagui";
import { ScrollView } from "react-native";
import type { FormTemplateProps } from "./form-template.type";

export function FormTemplate({
  topBar,
  children,
  actions,
  testID,
}: FormTemplateProps) {
  return (
    <View flex={1} testID={testID}>
      {topBar}

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>

      {actions && (
        <View
          paddingHorizontal={16}
          paddingBottom={16}
          paddingTop={8}
          borderTopWidth={1}
          borderTopColor="$outlineVariant"
        >
          {actions}
        </View>
      )}
    </View>
  );
}
