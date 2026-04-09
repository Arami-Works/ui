import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { YStack } from "tamagui";
import { Accordion, AccordionItem } from "../../accordion";
import { Text } from "../../../../atoms/text";
import { SectionLabel } from "../../../../storybook";

function BasicVariant() {
  return (
    <Accordion>
      <Accordion.Item title="Basic item">
        <Text role="body" size="medium">Simple accordion content.</Text>
      </Accordion.Item>
    </Accordion>
  );
}

function WithSupportingText() {
  return (
    <Accordion>
      <Accordion.Item title="With subtitle" supportingText="Extra details here">
        <Text role="body" size="medium">Content with supporting text header.</Text>
      </Accordion.Item>
    </Accordion>
  );
}

function WithLeadingIcon() {
  return (
    <Accordion>
      <Accordion.Item title="Settings" leadingIcon="settings">
        <Text role="body" size="medium">Settings content.</Text>
      </Accordion.Item>
    </Accordion>
  );
}

function ControlledVariant() {
  const [expanded, setExpanded] = useState(true);
  return (
    <Accordion>
      <AccordionItem
        title="Controlled"
        expanded={expanded}
        onToggle={setExpanded}
      >
        <Text role="body" size="medium">This is controlled externally.</Text>
      </AccordionItem>
    </Accordion>
  );
}

function DisabledVariant() {
  return (
    <Accordion>
      <Accordion.Item title="Disabled item" disabled>
        <Text role="body" size="medium">Cannot expand.</Text>
      </Accordion.Item>
    </Accordion>
  );
}

function Variants() {
  return (
    <YStack
      backgroundColor="#FFFFFF"
      borderRadius={12}
      borderWidth={1}
      borderColor="#E0E0E0"
      padding={24}
      gap={24}
    >
      <SectionLabel label="Basic" />
      <BasicVariant />

      <SectionLabel label="With supporting text" />
      <WithSupportingText />

      <SectionLabel label="With leading icon" />
      <WithLeadingIcon />

      <SectionLabel label="Controlled" />
      <ControlledVariant />

      <SectionLabel label="Disabled" />
      <DisabledVariant />
    </YStack>
  );
}

const meta: Meta = {
  title: "molecules/accordion/variants",
  component: Variants,
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
