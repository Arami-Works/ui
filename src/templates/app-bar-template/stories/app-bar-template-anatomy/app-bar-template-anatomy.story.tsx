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
      <YStack
        width={300}
        height={300}
        justifyContent="center"
        alignItems="center"
      >
        <View position="relative" width={200} height={280}>
          <View
            backgroundColor="#F7F2FA"
            borderRadius={12}
            width={200}
            height={280}
            overflow="hidden"
          >
            {/* Top app bar slot */}
            <View
              backgroundColor="#E8DEF8"
              height={48}
              width="100%"
              justifyContent="center"
              alignItems="center"
              borderBottomWidth={1}
              borderBottomColor="#CAC4D0"
            >
              <Text fontSize={10} color="#6750A4">
                Top App Bar
              </Text>
            </View>

            {/* Content slot */}
            <View
              flex={1}
              padding={8}
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize={10} color="#49454F">
                Content (children)
              </Text>
            </View>
          </View>

          <View position="absolute" top={12} right={-30}>
            <Callout number={1} />
          </View>
          <View position="absolute" top={150} right={-30}>
            <Callout number={2} />
          </View>
        </View>
      </YStack>

      <YStack gap={12}>
        <LegendItem number={1} label="Top bar slot — pinned to top" />
        <LegendItem number={2} label="Content slot (children) — fills space" />
      </YStack>
    </XStack>
  );
}

const meta: Meta = {
  title: "templates/app-bar-template/anatomy",
  component: Anatomy,
  tags: ["autodocs", "!dev"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/b79qv459pnXaypgNQfNXuc/ui?node-id=1037-10",
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
