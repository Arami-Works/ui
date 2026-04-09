import type { Meta, StoryObj } from "@storybook/react-vite";
import { XStack, YStack, Text, View } from "tamagui";

function Callout({ number }: { number: number }) {
  return (
    <XStack
      width={24}
      height={24}
      borderRadius={12}
      backgroundColor="#6750A4"
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize={12} fontWeight="600" color="#FFFFFF">
        {number}
      </Text>
    </XStack>
  );
}

function LegendItem({ number, label }: { number: number; label: string }) {
  return (
    <XStack gap={10} alignItems="center">
      <Callout number={number} />
      <Text fontSize={14} color="#1C1B1F">
        {label}
      </Text>
    </XStack>
  );
}

function Anatomy() {
  return (
    <XStack
      backgroundColor="#FFFFFF"
      borderRadius={12}
      borderWidth={1}
      borderColor="#E0E0E0"
      padding={24}
      gap={48}
      alignItems="center"
    >
      <YStack width={360} gap={8}>
        <View position="relative">
          <XStack
            paddingHorizontal={16}
            paddingVertical={16}
            gap={16}
            alignItems="flex-start"
            backgroundColor="#F7F2FA"
            borderRadius={8}
          >
            <View
              width={24}
              height={24}
              borderRadius={4}
              backgroundColor="#E8DEF8"
            />
            <YStack flex={1}>
              <Text fontSize={14} color="#1C1B1F">
                Banner message
              </Text>
              <Text fontSize={12} color="#49454F">
                Supporting text
              </Text>
            </YStack>
          </XStack>
          <XStack
            justifyContent="flex-end"
            paddingHorizontal={8}
            paddingVertical={8}
          >
            <Text fontSize={14} color="#6750A4">
              Action
            </Text>
          </XStack>
          <View height={1} backgroundColor="#CAC4D0" />
          <View position="absolute" top={-12} left={-12}>
            <Callout number={1} />
          </View>
          <View position="absolute" top={8} left={28}>
            <Callout number={2} />
          </View>
          <View position="absolute" top={8} left={60}>
            <Callout number={3} />
          </View>
          <View position="absolute" top={28} left={60}>
            <Callout number={4} />
          </View>
          <View position="absolute" top={52} right={-12}>
            <Callout number={5} />
          </View>
          <View position="absolute" bottom={-12} left={-12}>
            <Callout number={6} />
          </View>
        </View>
      </YStack>
      <YStack gap={12}>
        <LegendItem number={1} label="Container" />
        <LegendItem number={2} label="Icon (optional)" />
        <LegendItem number={3} label="Message" />
        <LegendItem number={4} label="Supporting text (optional)" />
        <LegendItem number={5} label="Action buttons (optional)" />
        <LegendItem number={6} label="Divider" />
      </YStack>
    </XStack>
  );
}

const meta: Meta = {
  title: "molecules/banner/anatomy",
  component: Anatomy,
  tags: ["autodocs", "!dev"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/placeholder",
    },
  },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};
