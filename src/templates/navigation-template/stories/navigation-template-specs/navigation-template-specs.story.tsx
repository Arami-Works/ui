import type { Meta, StoryObj } from "@storybook/react-vite";
import { XStack, YStack, Text } from "tamagui";

const specs = [
  { property: "EFCV level", value: "Outer (experience)" },
  { property: "Layout", value: "Full screen, vertical column" },
  { property: "Content slot", value: "Fills available space (flex: 1)" },
  { property: "Nav bar slot", value: "Pinned to bottom" },
  { property: "Common nav bar", value: "NavigationBar organism" },
  { property: "Nests inside", value: "Container variants" },
  { property: "Common children", value: "AppBarTemplate, DashboardTemplate" },
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
      <YStack width={420}>
        <SpecRow property="Property" value="Value" isHeader />
        {specs.map((s) => (
          <SpecRow key={s.property} property={s.property} value={s.value} />
        ))}
      </YStack>
    </XStack>
  );
}

const meta: Meta = {
  title: "templates/navigation-template/specs",
  component: Specs,
  tags: ["autodocs", "!dev"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/b79qv459pnXaypgNQfNXuc/ui?node-id=1037-2",
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
