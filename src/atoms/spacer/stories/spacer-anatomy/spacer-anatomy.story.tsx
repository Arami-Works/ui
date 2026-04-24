import type { Meta, StoryObj } from "@storybook/react-vite";
import { XStack, YStack, Text, View } from "tamagui";
import { Spacer } from "../../spacer";

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
        width={200}
        height={100}
        justifyContent="center"
        alignItems="center"
      >
        <View position="relative">
          {/* Dashed border wrapper visualises the invisible spacer */}
          <View
            width={60}
            borderWidth={1}
            borderStyle="dashed"
            borderColor="#6750A4"
            backgroundColor="#EADDFF"
            opacity={0.5}
          >
            <Spacer direction="vertical" size={40} />
          </View>

          <View position="absolute" top={-30} right={-30}>
            <Callout number={1} />
          </View>
        </View>
      </YStack>

      <YStack gap={12}>
        <LegendItem number={1} label="Space" />
      </YStack>
    </XStack>
  );
}

const meta: Meta = {
  title: "atoms/spacer/anatomy",
  component: Anatomy,
  tags: ["autodocs", "!dev"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/b79qv459pnXaypgNQfNXuc/atoms?node-id=52-5",
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
