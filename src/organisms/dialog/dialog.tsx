import { Image, Modal, Pressable, ScrollView } from "react-native";
import { styled, View, XStack, YStack } from "tamagui";
import { Icon } from "../../atoms/icon";
import { Text } from "../../atoms/text";
import { Button } from "../../atoms/button";
import type { DialogProps } from "./dialog.type";

const Scrim = styled(View, {
  name: "DialogScrim",
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.32)",
  justifyContent: "center",
  alignItems: "center",
});

const DIALOG_RADIUS = 28;

const Container = styled(View, {
  name: "Dialog",
  backgroundColor: "$surfaceContainerHigh",
  borderRadius: DIALOG_RADIUS,
  minWidth: 280,
  maxWidth: 560,
  overflow: "hidden",
});

export function Dialog({
  visible,
  heroImage,
  icon,
  title,
  children,
  confirmLabel = "OK",
  dismissLabel = "Cancel",
  onConfirm,
  onDismiss,
  scrollable = false,
  testID,
}: DialogProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
      testID={testID ? `${testID}-modal` : undefined}
    >
      <Pressable
        style={{ flex: 1 }}
        onPress={onDismiss}
        testID={testID ? `${testID}-scrim` : undefined}
      >
        <Scrim>
          <Pressable onPress={(e) => e?.stopPropagation()}>
            <Container testID={testID}>
              {heroImage && (
                <Image
                  source={heroImage}
                  style={{
                    width: "100%",
                    height: 200,
                    // Android doesn't honour Container's overflow:hidden, so we
                    // replicate the top radius here to clip the image correctly.
                    borderTopLeftRadius: DIALOG_RADIUS,
                    borderTopRightRadius: DIALOG_RADIUS,
                  }}
                  resizeMode="cover"
                  accessible={false}
                  testID={testID ? `${testID}-hero` : undefined}
                />
              )}
              <View padding={24} paddingTop={heroImage ? 16 : 24}>
                <YStack gap={16}>
                  {icon && (
                    <View alignItems="center">
                      <Icon
                        name={icon}
                        size={24}
                        color="$secondary"
                        testID={testID ? `${testID}-icon` : undefined}
                      />
                    </View>
                  )}

                  {title && (
                    <Text
                      role="headline"
                      size="small"
                      color="$onSurface"
                      testID={testID ? `${testID}-title` : undefined}
                    >
                      {title}
                    </Text>
                  )}

                  {children &&
                    (scrollable ? (
                      <ScrollView
                        style={{ maxHeight: 300 }}
                        testID={testID ? `${testID}-body` : undefined}
                      >
                        <Text
                          role="body"
                          size="medium"
                          color="$onSurfaceVariant"
                        >
                          {children}
                        </Text>
                      </ScrollView>
                    ) : (
                      <Text
                        role="body"
                        size="medium"
                        color="$onSurfaceVariant"
                        testID={testID ? `${testID}-body` : undefined}
                      >
                        {children}
                      </Text>
                    ))}

                  <XStack justifyContent="flex-end" gap={8}>
                    {onDismiss && (
                      <Button
                        variant="text"
                        onPress={onDismiss}
                        testID={testID ? `${testID}-dismiss` : undefined}
                      >
                        {dismissLabel}
                      </Button>
                    )}
                    {onConfirm && (
                      <Button
                        variant="text"
                        onPress={onConfirm}
                        testID={testID ? `${testID}-confirm` : undefined}
                      >
                        {confirmLabel}
                      </Button>
                    )}
                  </XStack>
                </YStack>
              </View>
            </Container>
          </Pressable>
        </Scrim>
      </Pressable>
    </Modal>
  );
}
