import { ScrollView } from "react-native";
import { XStack } from "tamagui";
import { Chip } from "../../atoms";
import { spacing } from "../../tokens/generated/spacing";
import type { DateFilterChipsProps } from "./date-filter-chips.type";

export function DateFilterChips({
  options,
  selectedValue,
  onSelectionChange,
  disabled = false,
  accessibilityLabel,
  testID,
}: DateFilterChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: spacing.lg }}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="radiogroup"
      testID={testID}
    >
      <XStack gap="$sm">
        {options.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            type="filter"
            selected={option.value === selectedValue}
            leadingIcon={option.icon}
            disabled={disabled}
            onPress={() => onSelectionChange?.(option.value)}
            testID={testID ? `${testID}-chip-${option.value}` : undefined}
          />
        ))}
      </XStack>
    </ScrollView>
  );
}
