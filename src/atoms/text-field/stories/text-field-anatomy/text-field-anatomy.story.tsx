import type { Meta, StoryObj } from "@storybook/react-vite";
import { XStack, YStack, Text, View } from "tamagui";
import { TextField } from "../../text-field";

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
        width={280}
        height={180}
        justifyContent="center"
        alignItems="center"
      >
        <View position="relative" width={240}>
          <TextField
            label="Label"
            value="Input text"
            helperText="Helper text"
            variant="filled"
          />

          <View position="absolute" top={-30} right={-20}>
            <Callout number={1} />
          </View>

          <View position="absolute" top={2} left={-30}>
            <Callout number={2} />
          </View>

          <View position="absolute" top={24} right={-30}>
            <Callout number={3} />
          </View>

          <View position="absolute" bottom={-10} left={-30}>
            <Callout number={4} />
          </View>
        </View>
      </YStack>

      <YStack gap={12}>
        <LegendItem number={1} label="Container" />
        <LegendItem number={2} label="Label" />
        <LegendItem number={3} label="Input text" />
        <LegendItem number={4} label="Helper text" />
      </YStack>
    </XStack>
  );
}

const meta: Meta = {
  title: "atoms/text-field/anatomy",
  component: Anatomy,
  tags: ["autodocs", "!dev"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/b79qv459pnXaypgNQfNXuc/atoms?node-id=52-2",
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
