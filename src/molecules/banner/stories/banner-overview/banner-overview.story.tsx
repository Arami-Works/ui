import type { Meta, StoryObj } from "@storybook/react-vite";
import { YStack } from "tamagui";
import { Banner } from "../../banner";
import { SectionLabel } from "../../../../storybook";

function Overview() {
  return (
    <YStack
      backgroundColor="#FFFFFF"
      borderRadius={12}
      borderWidth={1}
      borderColor="#E0E0E0"
      padding={24}
      gap={16}
    >
      <SectionLabel label="Basic" />
      <Banner message="This is a banner message" />

      <SectionLabel label="With supporting text" />
      <Banner
        message="Connection lost"
        supportingText="Check your internet connection and try again."
      />

      <SectionLabel label="With icon" />
      <Banner
        message="Update available"
        supportingText="A new version is ready to install."
        icon="info"
      />

      <SectionLabel label="With actions" />
      <Banner
        message="Photo has been archived"
        icon="photo"
        actions={[
          { label: "Undo", onPress: () => {} },
          { label: "View", onPress: () => {} },
        ]}
      />

      <SectionLabel label="Single action" />
      <Banner
        message="Your trial ends in 3 days"
        supportingText="Upgrade now to keep all features."
        icon="warning"
        actions={[{ label: "Upgrade", onPress: () => {} }]}
      />
    </YStack>
  );
}

const meta: Meta = {
  title: "molecules/banner/overview",
  component: Overview,
  tags: ["autodocs", "!dev"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/placeholder",
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
