import type { Meta, StoryObj } from "@storybook/react-vite";
import { YStack } from "tamagui";
import { Accordion } from "../../accordion";
import { Text } from "../../../../atoms/text";
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
      <Accordion>
        <Accordion.Item title="Section 1">
          <Text role="body" size="medium">This is the content of section 1.</Text>
        </Accordion.Item>
        <Accordion.Item title="Section 2">
          <Text role="body" size="medium">This is the content of section 2.</Text>
        </Accordion.Item>
        <Accordion.Item title="Section 3">
          <Text role="body" size="medium">This is the content of section 3.</Text>
        </Accordion.Item>
      </Accordion>

      <SectionLabel label="With supporting text" />
      <Accordion>
        <Accordion.Item title="Personal info" supportingText="Name, email, phone">
          <Text role="body" size="medium">Your personal information goes here.</Text>
        </Accordion.Item>
        <Accordion.Item title="Shipping address" supportingText="Street, city, zip">
          <Text role="body" size="medium">Your shipping address goes here.</Text>
        </Accordion.Item>
      </Accordion>

      <SectionLabel label="With leading icons" />
      <Accordion>
        <Accordion.Item title="Account" leadingIcon="person">
          <Text role="body" size="medium">Account settings and preferences.</Text>
        </Accordion.Item>
        <Accordion.Item title="Notifications" leadingIcon="notifications">
          <Text role="body" size="medium">Notification preferences.</Text>
        </Accordion.Item>
        <Accordion.Item title="Privacy" leadingIcon="lock">
          <Text role="body" size="medium">Privacy and security settings.</Text>
        </Accordion.Item>
      </Accordion>

      <SectionLabel label="Default expanded" />
      <Accordion>
        <Accordion.Item title="Open by default" defaultExpanded>
          <Text role="body" size="medium">This section starts expanded.</Text>
        </Accordion.Item>
        <Accordion.Item title="Closed by default">
          <Text role="body" size="medium">This section starts collapsed.</Text>
        </Accordion.Item>
      </Accordion>

      <SectionLabel label="Disabled" />
      <Accordion>
        <Accordion.Item title="Disabled section" disabled>
          <Text role="body" size="medium">Cannot expand this.</Text>
        </Accordion.Item>
        <Accordion.Item title="Enabled section">
          <Text role="body" size="medium">This works normally.</Text>
        </Accordion.Item>
      </Accordion>
    </YStack>
  );
}

const meta: Meta = {
  title: "molecules/accordion/overview",
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
