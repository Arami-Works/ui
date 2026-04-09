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
      <YStack width={360} gap={0}>
        <View position="relative">
          <XStack
            height={56}
            alignItems="center"
            paddingHorizontal={16}
            gap={16}
            backgroundColor="#FFFBFE"
          >
            <View
              width={24}
              height={24}
              borderRadius={4}
              backgroundColor="#E8DEF8"
            />
            <YStack flex={1}>
              <Text fontSize={16} color="#1C1B1F">
                Title
              </Text>
              <Text fontSize={14} color="#49454F">
                Supporting text
              </Text>
            </YStack>
            <Text fontSize={20} color="#49454F">
              &#x25BC;
            </Text>
          </XStack>
          <View
            paddingHorizontal={16}
            paddingVertical={16}
            backgroundColor="#FFFBFE"
          >
            <Text fontSize={14} color="#1C1B1F">
              Collapsible content area
            </Text>
          </View>
          <View height={1} backgroundColor="#CAC4D0" />
          <View position="absolute" top={-12} left={-12}>
            <Callout number={1} />
          </View>
          <View position="absolute" top={8} left={28}>
            <Callout number={2} />
          </View>
          <View position="absolute" top={8} left={56}>
            <Callout number={3} />
          </View>
          <View position="absolute" top={24} left={56}>
            <Callout number={4} />
          </View>
          <View position="absolute" top={8} right={-12}>
            <Callout number={5} />
          </View>
          <View position="absolute" top={64} left={-12}>
            <Callout number={6} />
          </View>
          <View position="absolute" bottom={-12} left={-12}>
            <Callout number={7} />
          </View>
        </View>
      </YStack>
      <YStack gap={12}>
        <LegendItem number={1} label="Header row" />
        <LegendItem number={2} label="Leading icon (optional)" />
        <LegendItem number={3} label="Title" />
        <LegendItem number={4} label="Supporting text (optional)" />
        <LegendItem number={5} label="Chevron indicator" />
        <LegendItem number={6} label="Content area" />
        <LegendItem number={7} label="Divider" />
      </YStack>
    </XStack>
  );
}

const meta: Meta = {
  title: "molecules/accordion/anatomy",
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
