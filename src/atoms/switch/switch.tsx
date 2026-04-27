import { styled, View, useTheme } from "tamagui";
import { Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { DISABLED_OPACITY } from "../../tokens/custom/interaction";
import type { SwitchProps } from "./switch.type";

const Track = styled(View, {
  name: "SwitchTrack",
  width: 52,
  height: 32,
  borderRadius: "$full",
  justifyContent: "center",
  paddingHorizontal: 2,

  variants: {
    selected: {
      true: {
        backgroundColor: "$primary",
        borderWidth: 0,
      },
      false: {
        backgroundColor: "$surfaceContainerHighest",
        borderWidth: 2,
        borderColor: "$outline",
      },
    },
  } as const,

  defaultVariants: {
    selected: false,
  },
} as const);

const Thumb = styled(View, {
  name: "SwitchThumb",
  borderRadius: "$full",
  justifyContent: "center",
  alignItems: "center",
} as const);

export function Switch({
  selected = false,
  showIcon = false,
  disabled = false,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  testID,
  ...props
}: SwitchProps) {
  const theme = useTheme();

  const thumbSize = selected || showIcon ? 24 : 16;

  const thumbBackgroundColor = (() => {
    if (selected) {
      return showIcon
        ? (theme.onPrimaryContainer?.val as string)
        : (theme.onPrimary?.val as string);
    }
    return showIcon
      ? (theme.onSurfaceVariant?.val as string)
      : (theme.outline?.val as string);
  })();

  const iconColor = selected
    ? (theme.primaryContainer?.val as string)
    : (theme.surfaceContainerHighest?.val as string);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked: selected, disabled }}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      testID={testID}
      style={{ minWidth: 52, minHeight: 48, justifyContent: "center" }}
    >
      <View opacity={disabled ? DISABLED_OPACITY : 1} {...props}>
        <Track selected={selected as any}>
          <Thumb
            width={thumbSize}
            height={thumbSize}
            backgroundColor={thumbBackgroundColor as any}
            alignSelf={selected ? "flex-end" : "flex-start"}
          >
            {showIcon && (
              <MaterialIcons
                name={selected ? "check" : "close"}
                size={16}
                color={iconColor}
              />
            )}
          </Thumb>
        </Track>
      </View>
    </Pressable>
  );
}
