import type { Meta, StoryObj } from "@storybook/react-vite";
import { Banner } from "../../banner";
import type { BannerProps } from "../../banner.type";

const meta: Meta<BannerProps> = {
  title: "molecules/banner/variants",
  component: Banner,
  args: { message: "Banner message" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/placeholder",
    },
  },
};

export default meta;
type Story = StoryObj<BannerProps>;

export const Basic: Story = {
  name: "Basic",
  args: { message: "This is a basic banner" },
};

export const WithSupportingText: Story = {
  name: "With Supporting Text",
  args: {
    message: "Connection lost",
    supportingText: "Check your internet connection and try again.",
  },
};

export const WithIcon: Story = {
  name: "With Icon",
  args: {
    message: "Update available",
    icon: "info",
  },
};

export const WithActions: Story = {
  name: "With Actions",
  args: {
    message: "Photo archived",
    icon: "photo",
    actions: [
      { label: "Undo", onPress: () => {} },
      { label: "View", onPress: () => {} },
    ],
  },
};

export const FullFeatured: Story = {
  name: "Full Featured",
  args: {
    message: "Your trial ends in 3 days",
    supportingText: "Upgrade now to keep all features.",
    icon: "warning",
    actions: [{ label: "Upgrade", onPress: () => {} }],
  },
};
