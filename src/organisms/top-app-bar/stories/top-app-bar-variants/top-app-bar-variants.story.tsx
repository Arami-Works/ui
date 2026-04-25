import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pressable } from "react-native";
import { XStack, Text } from "tamagui";
import { TopAppBar } from "../../top-app-bar";
import type { TopAppBarProps } from "../../top-app-bar.type";

const FIGMA_BASE =
  "https://www.figma.com/design/9wluFWH1CfEuAf0KjDEUFt/organisms?node-id=";

const meta: Meta<TopAppBarProps> = {
  title: "organisms/top-app-bar/variants",
  component: TopAppBar,
  parameters: {
    design: { type: "figma", url: `${FIGMA_BASE}14-11` },
  },
  args: {
    title: "Title",
    navigationIcon: "arrow-back",
    onNavigationPress: () => {},
    actions: [{ icon: "more-vert", onPress: () => {} }],
  },
};

export default meta;
type Story = StoryObj<TopAppBarProps>;

export const CenterAligned: Story = {
  args: { type: "center-aligned" },
};

export const Small: Story = {
  args: { type: "small" },
};

export const Medium: Story = {
  args: { type: "medium" },
};

export const Large: Story = {
  args: { type: "large" },
};

export const WithTrailingContent: Story = {
  args: {
    type: "small",
    actions: undefined,
    trailingContent: (
      <XStack gap="$xs" alignItems="center" paddingHorizontal="$md">
        <Pressable onPress={() => {}}>
          <Text fontSize={14} color="$primary">
            Edit
          </Text>
        </Pressable>
        <Pressable onPress={() => {}}>
          <Text fontSize={14} color="$error">
            Delete
          </Text>
        </Pressable>
      </XStack>
    ),
  },
};
