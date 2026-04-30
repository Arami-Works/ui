import { Pressable } from "react-native";
import { styled, View } from "tamagui";
import {
  DISABLED_OPACITY,
  PRESSED_OPACITY,
} from "../../tokens/custom/interaction";
import { shadows } from "../../tokens/custom/shadows";
import type { CardProps } from "./card.type";

const ElevatedCard = styled(View, {
  name: "CardElevated",
  backgroundColor: "$surfaceContainerLow",
  borderRadius: "$md",
  padding: "$lg",
  ...shadows.xsmall,
});

const FilledCard = styled(View, {
  name: "CardFilled",
  backgroundColor: "$surfaceContainerHighest",
  borderRadius: "$md",
  padding: "$lg",
});

const OutlinedCard = styled(View, {
  name: "CardOutlined",
  backgroundColor: "$surface",
  borderRadius: "$md",
  padding: "$lg",
  borderWidth: 1,
  borderColor: "$outlineVariant",
});

const cardComponents = {
  elevated: ElevatedCard,
  filled: FilledCard,
  outlined: OutlinedCard,
};

export function Card({
  variant = "elevated",
  children,
  onPress,
  onLongPress,
  disabled = false,
  testID,
}: CardProps) {
  const Container = cardComponents[variant];

  if (onPress || onLongPress) {
    return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        disabled={disabled}
        testID={testID}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        style={({ pressed }) => ({
          opacity: disabled ? DISABLED_OPACITY : pressed ? PRESSED_OPACITY : 1,
        })}
      >
        {({ pressed }) => (
          <Container
            style={{ transform: [{ scale: pressed && !disabled ? 0.98 : 1 }] }}
          >
            {children}
          </Container>
        )}
      </Pressable>
    );
  }

  return (
    <Container
      testID={testID}
      style={disabled ? { opacity: DISABLED_OPACITY } : undefined}
    >
      {children}
    </Container>
  );
}
