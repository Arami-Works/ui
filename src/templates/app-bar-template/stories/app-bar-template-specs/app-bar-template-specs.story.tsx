import type { Meta, StoryObj } from "@storybook/react-vite";
import { XStack, YStack, Text } from "tamagui";

const specs = [
  { property: "EFCV level", value: "Middle (flow)" },
  { property: "Layout", value: "Vertical column" },
  { property: "Top bar slot", value: "Pinned to top" },
  { property: "Content slot", value: "Fills available space (flex: 1)" },
  { property: "Common top bar", value: "TopAppBar organism" },
  { property: "Nests inside", value: "NavigationTemplate" },
  {
    property: "Common children",
    value: "DashboardTemplate, ListTemplate, DetailTemplate, FormTemplate",
  },
];

function SpecRow({
  property,
  value,
  isHeader,
}: {
  property: string;
  value: string;
  isHeader?: boolean;
}) {
  return (
    <XStack
      height={36}
      alignItems="center"
      borderBottomWidth={1}
      borderBottomColor="#E0E0E0"
    >
      <Text
        width={160}
        paddingLeft={16}
        fontSize={14}
        fontWeight={isHeader ? "600" : "400"}
        color="#1C1B1F"
      >
        {property}
      </Text>
      <Text
        flex={1}
        fontSize={14}
        fontWeight={isHeader ? "600" : "400"}
        color="#49454F"
      >
        {value}
      </Text>
    </XStack>
  );
}

function Specs() {
  return (
    <XStack
      backgroundColor="#FFFFFF"
      borderRadius={12}
      borderWidth={1}
      borderColor="#E0E0E0"
      padding={24}
    >
      <YStack width={500}>
        <SpecRow property="Property" value="Value" isHeader />
        {specs.map((s) => (
          <SpecRow key={s.property} property={s.property} value={s.value} />
        ))}
      </YStack>
    </XStack>
  );
}

const meta: Meta = {
  title: "templates/app-bar-template/specs",
  component: Specs,
  tags: ["autodocs", "!dev"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/HaGgCBIkDbJ2jVZp0dUFR0/templates?node-id=10-15",
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
