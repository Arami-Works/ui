import type { Meta, StoryObj } from "@storybook/react-vite";
import { View, Text } from "tamagui";
import { AppBarTemplate } from "../../app-bar-template";
import type { AppBarTemplateProps } from "../../app-bar-template.type";

const FIGMA_BASE =
  "https://www.figma.com/design/b79qv459pnXaypgNQfNXuc/ui?node-id=";

const meta: Meta<AppBarTemplateProps> = {
  title: "templates/app-bar-template/variants",
  component: AppBarTemplate,
  parameters: {
    design: { type: "figma", url: `${FIGMA_BASE}1037-10` },
  },
};

export default meta;

type Story = StoryObj<AppBarTemplateProps>;

export const WithTopBar: Story = {
  args: {
    topBar: (
      <View bg="#E8DEF8" h={64} w="100%" ai="center" jc="center">
        <Text>Top App Bar</Text>
      </View>
    ),
    children: (
      <View flex={1} bg="#F7F2FA" ai="center" jc="center">
        <Text>Content</Text>
      </View>
    ),
  },
};

export const WithoutTopBar: Story = {
  args: {
    children: (
      <View flex={1} bg="#F7F2FA" ai="center" jc="center">
        <Text>Full bleed content</Text>
      </View>
    ),
  },
};
