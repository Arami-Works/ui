import type { Meta, StoryObj } from "@storybook/react-vite";
import { XStack, YStack, Text } from "tamagui";

const specs = [
  { property: "Container background", value: "$surfaceContainerLow" },
  { property: "Padding horizontal", value: "16 dp" },
  { property: "Padding vertical", value: "16 dp" },
  { property: "Icon size", value: "24 dp" },
  { property: "Icon color", value: "$onSurface" },
  { property: "Message font", value: "Body Medium (14sp)" },
  { property: "Message color", value: "$onSurface" },
  { property: "Supporting text font", value: "Body Small (12sp)" },
  { property: "Supporting text color", value: "$onSurfaceVariant" },
  { property: "Action button variant", value: "Text" },
  { property: "Max actions", value: "2" },
  { property: "Animation duration", value: "250 ms" },
];

function SpecRow({ property, value, isHeader }: { property: string; value: string; isHeader?: boolean }) {
  return (
    <XStack height={36} alignItems="center" borderBottomWidth={1} borderBottomColor="#E0E0E0">
      <Text width={220} paddingLeft={16} fontSize={14} fontWeight={isHeader ? "600" : "400"} color="#1C1B1F">{property}</Text>
      <Text flex={1} fontSize={14} fontWeight={isHeader ? "600" : "400"} color="#49454F">{value}</Text>
    </XStack>
  );
}

function Specs() {
  return (
    <XStack backgroundColor="#FFFFFF" borderRadius={12} borderWidth={1} borderColor="#E0E0E0" padding={24}>
      <YStack width={520}>
        <SpecRow property="Property" value="Value" isHeader />
        {specs.map((s) => (<SpecRow key={s.property} property={s.property} value={s.value} />))}
      </YStack>
    </XStack>
  );
}

const meta: Meta = {
  title: "molecules/banner/specs",
  component: Specs,
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
