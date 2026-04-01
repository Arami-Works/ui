import type { Meta, StoryObj } from "@storybook/react";
import { XStack, YStack, Text } from "tamagui";
import { Badge } from "../../badge";

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
    <XStack
      backgroundColor="#FFFFFF"
      borderRadius={12}
      borderWidth={1}
      borderColor="#E0E0E0"
      padding={24}
      gap={32}
      alignItems="flex-start"
    >
      <YStack alignItems="center" gap={8}>
        <SectionLabel label="Small (dot)" />
        <Badge />
      </YStack>

      <YStack alignItems="center" gap={8}>
        <SectionLabel label="Large (1)" />
        <Badge size="large" count={1} />
      </YStack>

      <YStack alignItems="center" gap={8}>
        <SectionLabel label="Large (99)" />
        <Badge size="large" count={99} />
      </YStack>

      <YStack alignItems="center" gap={8}>
        <SectionLabel label="Large (999+)" />
        <Badge size="large" count={1500} />
      </YStack>
    </XStack>
  );
}

const meta: Meta = {
  title: "Atoms/Badge/Overview",
  component: Overview,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
