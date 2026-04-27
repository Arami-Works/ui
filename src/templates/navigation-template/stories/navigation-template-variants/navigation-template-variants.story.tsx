import type { Meta, StoryObj } from "@storybook/react-vite";
import { View, Text } from "tamagui";
import { NavigationTemplate } from "../../navigation-template";
import type { NavigationTemplateProps } from "../../navigation-template.type";

const FIGMA_BASE =
  "https://www.figma.com/design/b79qv459pnXaypgNQfNXuc/ui?node-id=";

const meta: Meta<NavigationTemplateProps> = {
  title: "templates/navigation-template/variants",
  component: NavigationTemplate,
  parameters: {
    design: { type: "figma", url: `${FIGMA_BASE}1037-2` },
  },
};

export default meta;

type Story = StoryObj<NavigationTemplateProps>;

export const WithNavBar: Story = {
  args: {
    children: (
      <View flex={1} bg="#F7F2FA" ai="center" jc="center">
        <Text>Content</Text>
      </View>
    ),
    navBar: (
      <View bg="#E8DEF8" h={80} w="100%" ai="center" jc="center">
        <Text>Navigation Bar</Text>
      </View>
    ),
  },
};

export const WithoutNavBar: Story = {
  args: {
    children: (
      <View flex={1} bg="#F7F2FA" ai="center" jc="center">
        <Text>Full bleed content</Text>
      </View>
    ),
  },
};
