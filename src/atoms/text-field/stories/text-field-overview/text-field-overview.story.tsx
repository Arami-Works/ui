import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { XStack, YStack, Text } from "tamagui";
import { TextField } from "../../text-field";

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

function FilledExample() {
  const [value, setValue] = useState("");
  return (
    <TextField
      label="Label"
      value={value}
      onChangeText={setValue}
      helperText="Supporting text"
    />
  );
}

function OutlinedExample() {
  const [value, setValue] = useState("");
  return (
    <TextField
      variant="outlined"
      label="Label"
      value={value}
      onChangeText={setValue}
      helperText="Supporting text"
    />
  );
}

function ErrorExample() {
  return (
    <TextField
      label="Email"
      value="invalid"
      errorText="Please enter a valid email"
    />
  );
}

function WithIconsExample() {
  const [value, setValue] = useState("");
  return (
    <TextField
      label="Search"
      value={value}
      onChangeText={setValue}
      leadingIcon="search"
      trailingIcon="close"
      onTrailingIconPress={() => setValue("")}
    />
  );
}

function WithCounterExample() {
  const [value, setValue] = useState("");
  return (
    <TextField
      label="Description"
      value={value}
      onChangeText={setValue}
      maxLength={100}
      helperText="Enter a short description"
    />
  );
}

function DisabledExample() {
  return <TextField label="Disabled" value="Cannot edit" disabled />;
}

function Overview() {
  return (
    <YStack
      backgroundColor="#FFFFFF"
      borderRadius={12}
      borderWidth={1}
      borderColor="#E0E0E0"
      padding={24}
      gap={24}
    >
      <YStack gap={8}>
        <SectionLabel label="Filled" />
        <FilledExample />
      </YStack>

      <YStack gap={8}>
        <SectionLabel label="Outlined" />
        <OutlinedExample />
      </YStack>

      <YStack gap={8}>
        <SectionLabel label="Error" />
        <ErrorExample />
      </YStack>

      <YStack gap={8}>
        <SectionLabel label="With Icons" />
        <WithIconsExample />
      </YStack>

      <YStack gap={8}>
        <SectionLabel label="With Counter" />
        <WithCounterExample />
      </YStack>

      <YStack gap={8}>
        <SectionLabel label="Disabled" />
        <DisabledExample />
      </YStack>
    </YStack>
  );
}

const meta: Meta = {
  title: "Atoms/TextField/Overview",
  component: Overview,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
