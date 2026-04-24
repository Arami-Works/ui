import { styled, View, Text, useTheme } from "tamagui";
import { Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { DISABLED_OPACITY } from "../../tokens/custom/interaction";
import { spacing } from "../../tokens/generated/spacing";
import { radii } from "../../tokens/generated/radii";
import type { SegmentedButtonProps } from "./segmented-button.type";

const StyledGroup = styled(View, {
  name: "SegmentedButton",
  flexDirection: "row",
  borderWidth: 1,
  borderColor: "$outline",
  borderRadius: "$xl",
  overflow: "hidden",
  height: 40,
} as const);

const StyledDivider = styled(View, {
  name: "SegmentedButtonDivider",
  width: 1,
  backgroundColor: "$outline",
} as const);

const SegmentLabel = styled(Text, {
  name: "SegmentLabel",
  fontSize: 14,
  fontWeight: "500",
  lineHeight: 20,
} as const);

export function SegmentedButton({
  segments,
  selected,
  multiSelect = false,
  onSelectionChange,
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
  testID,
}: SegmentedButtonProps) {
  const theme = useTheme();

  const selectedSet = new Set(Array.isArray(selected) ? selected : [selected]);

  const outlineColor = theme.outline?.val as string;
  const secondaryContainerColor = theme.secondaryContainer?.val as string;
  const onSecondaryContainerColor = theme.onSecondaryContainer?.val as string;
  const onSurfaceColor = theme.onSurface?.val as string;

  function handlePress(value: string) {
    if (disabled) return;

    if (multiSelect) {
      const next = new Set(selectedSet);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      onSelectionChange?.([...next]);
    } else {
      onSelectionChange?.(value);
    }
  }

  return (
    <StyledGroup
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole="tablist"
      testID={testID}
      opacity={disabled ? DISABLED_OPACITY : 1}
    >
      {segments.map((segment, index) => {
        const isSelected = selectedSet.has(segment.value);
        const isDisabled = disabled || segment.disabled;
        const isFirst = index === 0;
        const isLast = index === segments.length - 1;

        return (
          <View key={segment.value} flexDirection="row" flex={1}>
            {index > 0 && <StyledDivider />}
            <Pressable
              onPress={() => handlePress(segment.value)}
              disabled={isDisabled}
              accessibilityRole="tab"
              accessibilityState={{
                selected: isSelected,
                disabled: isDisabled,
              }}
              testID={testID ? `${testID}-segment-${segment.value}` : undefined}
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: spacing.sm,
                backgroundColor: isSelected
                  ? secondaryContainerColor
                  : "transparent",
                borderTopLeftRadius: isFirst ? radii.xl : 0,
                borderBottomLeftRadius: isFirst ? radii.xl : 0,
                borderTopRightRadius: isLast ? radii.xl : 0,
                borderBottomRightRadius: isLast ? radii.xl : 0,
                opacity: segment.disabled ? DISABLED_OPACITY : 1,
              }}
            >
              {isSelected && (
                <MaterialIcons
                  name="check"
                  size={18}
                  color={onSecondaryContainerColor}
                />
              )}
              {!isSelected && segment.icon && (
                <MaterialIcons
                  name={segment.icon as any}
                  size={18}
                  color={onSurfaceColor}
                />
              )}
              <SegmentLabel
                color={isSelected ? "$onSecondaryContainer" : "$onSurface"}
              >
                {segment.label}
              </SegmentLabel>
            </Pressable>
          </View>
        );
      })}
    </StyledGroup>
  );
}
