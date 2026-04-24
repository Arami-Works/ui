import type { Meta, StoryObj } from "@storybook/react-vite";
import { XStack, YStack, Text, View } from "tamagui";
import { Tooltip } from "../../tooltip";

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
        width={220}
        height={200}
        justifyContent="flex-end"
        alignItems="center"
        paddingBottom={24}
      >
        <View position="relative">
          <Tooltip
            label="Tooltip title"
            variant="rich"
            description="Description text"
            actionLabel="Action"
            placement="top"
            defaultVisible
          >
            {/* Zero-height trigger so only the popup is visible */}
            <View width={160} height={0} />
          </Tooltip>

          {/* Callout 1 — Container (top-right of popup) */}
          <View position="absolute" top={-120} right={-20}>
            <Callout number={1} />
          </View>

          {/* Callout 2 — Label (top-left of popup) */}
          <View position="absolute" top={-120} left={-20}>
            <Callout number={2} />
          </View>

          {/* Callout 3 — Description (mid-right of popup) */}
          <View position="absolute" top={-80} right={-20}>
            <Callout number={3} />
          </View>

          {/* Callout 4 — Action (bottom-left of popup) */}
          <View position="absolute" top={-40} left={-20}>
            <Callout number={4} />
          </View>
        </View>
      </YStack>

      <YStack gap={12}>
        <LegendItem number={1} label="Container" />
        <LegendItem number={2} label="Label" />
        <LegendItem number={3} label="Description (rich)" />
        <LegendItem number={4} label="Action (rich)" />
      </YStack>
    </XStack>
  );
}

const meta: Meta = {
  title: "atoms/tooltip/anatomy",
  component: Anatomy,
  tags: ["autodocs", "!dev"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/b79qv459pnXaypgNQfNXuc/atoms?node-id=300-2",
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
