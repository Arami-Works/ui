import { useState } from "react";
import { View as RNView } from "react-native";
import { styled, View, XStack, YStack } from "tamagui";
import { Text } from "../text";
import { Button } from "../button";
import { shadows } from "../../tokens/custom/shadows";
import type { TooltipProps, TooltipPlacement } from "./tooltip.type";

const PlainContainer = styled(View, {
  name: "TooltipPlain",
  backgroundColor: "$inverseSurface",
  borderRadius: "$xs",
  paddingHorizontal: "$sm",
  paddingVertical: "$xs",
  maxWidth: 200,
});

const RichContainer = styled(View, {
  name: "TooltipRich",
  backgroundColor: "$surfaceContainer",
  borderRadius: "$md",
  padding: "$lg",
  maxWidth: 280,
  ...shadows.small,
});

function getTooltipOffset(placement: TooltipPlacement): object {
  switch (placement) {
    case "top":
      return {
        bottom: "100%",
        left: "50%",
        marginBottom: 4,
        transform: [{ translateX: -50 }],
      };
    case "bottom":
      return {
        top: "100%",
        left: "50%",
        marginTop: 4,
        transform: [{ translateX: -50 }],
      };
    case "left":
      return {
        right: "100%",
        top: "50%",
        marginRight: 4,
        transform: [{ translateY: -50 }],
      };
    case "right":
      return {
        left: "100%",
        top: "50%",
        marginLeft: 4,
        transform: [{ translateY: -50 }],
      };
  }
}

export function Tooltip({
  label,
  description,
  variant = "plain",
  placement = "top",
  children,
  actionLabel,
  onAction,
  testID,
  defaultVisible = false,
}: TooltipProps) {
  const [visible, setVisible] = useState(defaultVisible);

  const tooltipStyle = {
    position: "absolute" as const,
    zIndex: 999,
    ...getTooltipOffset(placement),
  };

  return (
    <RNView style={{ position: "relative" }} testID={testID}>
      <RNView
        onTouchStart={() => setVisible(true)}
        onTouchEnd={() => setVisible(false)}
      >
        {children}
      </RNView>
      {visible && (
        <RNView style={tooltipStyle} accessibilityRole={"tooltip" as any}>
          {variant === "plain" ? (
            <PlainContainer>
              <Text role="body" size="small" color="$inverseOnSurface">
                {label}
              </Text>
            </PlainContainer>
          ) : (
            <RichContainer>
              <YStack gap="$xs">
                <Text role="title" size="small" color="$onSurface">
                  {label}
                </Text>
                {description && (
                  <Text role="body" size="medium" color="$onSurfaceVariant">
                    {description}
                  </Text>
                )}
                {actionLabel && onAction && (
                  <XStack justifyContent="flex-end" marginTop="$sm">
                    <Button variant="text" onPress={onAction}>
                      {actionLabel}
                    </Button>
                  </XStack>
                )}
              </YStack>
            </RichContainer>
          )}
        </RNView>
      )}
    </RNView>
  );
}
