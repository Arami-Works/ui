import type { Meta, StoryObj } from "@storybook/react";
import { XStack, YStack, Text } from "tamagui";
import { Slider } from "../../slider";

function SectionLabel({ label }: { label: string }) {
  return (
    <XStack
      backgroundColor="#E8DEF8"
      borderRadius={14}
      paddingHorizontal={12}
      paddingVertical={6}
      justifyContent="center"
    >
      <Text fontSize={12} fontWeight="500" color="#6750A4">
        {label}
      </Text>
    </XStack>
  );
}

function Overview() {
  return (
    <YStack
      backgroundColor="#FFFFFF"
      borderRadius={12}
      borderWidth={1}
      borderColor="#E0E0E0"
      padding={24}
      gap={32}
    >
      <YStack gap={8}>
        <SectionLabel label="Continuous" />
        <Slider type="continuous" value={50} />
      </YStack>

      <YStack gap={8}>
        <SectionLabel label="Discrete (step=20)" />
        <Slider type="discrete" step={20} value={40} />
      </YStack>

      <YStack gap={8}>
        <SectionLabel label="With Value Label" />
        <Slider type="continuous" value={75} showLabel />
      </YStack>

      <YStack gap={8}>
        <SectionLabel label="Disabled" />
        <Slider type="continuous" value={30} disabled />
      </YStack>
    </YStack>
  );
}

const meta: Meta = {
  title: "Atoms/Slider/Overview",
  component: Overview,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
