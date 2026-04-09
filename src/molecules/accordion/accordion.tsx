import { useCallback, useEffect, useState } from "react";
import { Pressable } from "react-native";
import { styled, View, XStack, YStack } from "tamagui";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Divider } from "../../atoms/divider";
import { Icon } from "../../atoms/icon";
import { Text } from "../../atoms/text";
import type { AccordionItemProps, AccordionProps } from "./accordion.type";

const HeaderRow = styled(XStack, {
  name: "AccordionHeader",
  paddingHorizontal: "$lg",
  paddingVertical: "$md",
  alignItems: "center",
  gap: "$lg",
  backgroundColor: "$surface",
});

const ContentContainer = styled(View, {
  name: "AccordionContent",
  paddingHorizontal: "$lg",
  paddingBottom: "$lg",
  backgroundColor: "$surface",
});

export function AccordionItem({
  title,
  supportingText,
  expanded: controlledExpanded,
  defaultExpanded = false,
  onToggle,
  leadingIcon,
  children,
  disabled = false,
  testID,
}: AccordionItemProps) {
  const isControlled = controlledExpanded !== undefined;
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isExpanded = isControlled ? controlledExpanded : internalExpanded;

  const progress = useSharedValue(isExpanded ? 1 : 0);
  const rotation = useSharedValue(isExpanded ? 180 : 0);

  useEffect(() => {
    progress.value = withTiming(isExpanded ? 1 : 0, { duration: 250 });
    rotation.value = withTiming(isExpanded ? 180 : 0, { duration: 250 });
  }, [isExpanded, progress, rotation]);

  const contentStyle = useAnimatedStyle(() => ({
    maxHeight: progress.value * 500,
    opacity: progress.value,
    overflow: "hidden" as const,
  }));

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const handleToggle = useCallback(() => {
    if (disabled) return;
    const next = !isExpanded;
    if (!isControlled) {
      setInternalExpanded(next);
    }
    onToggle?.(next);
  }, [disabled, isExpanded, isControlled, onToggle]);

  return (
    <View testID={testID}>
      <Pressable
        onPress={handleToggle}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded }}
        style={{ opacity: disabled ? 0.38 : 1 }}
      >
        <HeaderRow>
          {leadingIcon ? (
            <Icon name={leadingIcon} size={24} color="$onSurfaceVariant" />
          ) : null}
          <YStack flex={1}>
            <Text role="body" size="large" color="$onSurface">
              {title}
            </Text>
            {supportingText ? (
              <Text role="body" size="medium" color="$onSurfaceVariant">
                {supportingText}
              </Text>
            ) : null}
          </YStack>
          <Animated.View
            style={chevronStyle}
            testID={testID ? `${testID}-chevron` : undefined}
          >
            <Icon name="expand-more" size={24} color="$onSurfaceVariant" />
          </Animated.View>
        </HeaderRow>
      </Pressable>
      <Animated.View style={contentStyle}>
        <ContentContainer>{children}</ContentContainer>
      </Animated.View>
      <Divider />
    </View>
  );
}

function AccordionRoot({ children, testID }: AccordionProps) {
  return <YStack testID={testID}>{children}</YStack>;
}

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
});
