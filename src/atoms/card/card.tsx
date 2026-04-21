import { Pressable } from "react-native";
import { styled, View } from "tamagui";
import {
  DISABLED_OPACITY,
  PRESSED_OPACITY,
} from "../../tokens/custom/interaction";
import type { CardProps } from "./card.type";

const ElevatedCard = styled(View, {
  name: "CardElevated",
  backgroundColor: "$surfaceContainerLow",
  borderRadius: "$md",
  padding: 16,
  shadowColor: "#171717",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
});

const FilledCard = styled(View, {
  name: "CardFilled",
  backgroundColor: "$surfaceContainerHighest",
  borderRadius: "$md",
  padding: 16,
});

const OutlinedCard = styled(View, {
  name: "CardOutlined",
  backgroundColor: "$surface",
  borderRadius: "$md",
  padding: 16,
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
  disabled = false,
  testID,
}: CardProps) {
  const Container = cardComponents[variant];

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
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
