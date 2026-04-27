import type { Meta, StoryObj } from "@storybook/react-vite";
import { XStack, YStack, Text as TamaguiText, View } from "tamagui";
import { Table, TableHeader, TableRow, TableCell } from "../../table";
import { Text } from "../../../text";

function Callout({ number }: { number: number }) {
  return (
    <XStack
      width={24}
      height={24}
      borderRadius={12}
      backgroundColor="#6750A4"
      justifyContent="center"
      alignItems="center"
    >
      <TamaguiText fontSize={12} fontWeight="600" color="#FFFFFF">
        {number}
      </TamaguiText>
    </XStack>
  );
}

function LegendItem({ number, label }: { number: number; label: string }) {
  return (
    <XStack gap={10} alignItems="center">
      <Callout number={number} />
      <TamaguiText fontSize={14} color="#1C1B1F">
        {label}
      </TamaguiText>
    </XStack>
  );
}

function Anatomy() {
  return (
    <XStack
      backgroundColor="#FFFFFF"
      borderRadius={12}
      borderWidth={1}
      borderColor="#E0E0E0"
      padding={24}
      gap={48}
      alignItems="center"
    >
      <YStack width={420} justifyContent="center" alignItems="center">
        <View position="relative" width="100%">
          <Table>
            <TableHeader>
              <TableCell>
                <Text role="title" size="small">
                  Property
                </Text>
              </TableCell>
              <TableCell>
                <Text role="title" size="small">
                  Value
                </Text>
              </TableCell>
            </TableHeader>
            <TableRow>
              <TableCell>
                <Text role="body" size="medium">
                  Row 1
                </Text>
              </TableCell>
              <TableCell>
                <Text role="body" size="medium">
                  A
                </Text>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Text role="body" size="medium">
                  Row 2
                </Text>
              </TableCell>
              <TableCell>
                <Text role="body" size="medium">
                  B
                </Text>
              </TableCell>
            </TableRow>
          </Table>

          {/* Callout 1 — Container (top-right) */}
          <View position="absolute" top={-36} right={-20}>
            <Callout number={1} />
          </View>

          {/* Callout 2 — Header row (left middle, between header and body) */}
          <View position="absolute" top={20} left={-36}>
            <Callout number={2} />
          </View>

          {/* Callout 3 — Body row with stripe */}
          <View position="absolute" top={120} left={-36}>
            <Callout number={3} />
          </View>

          {/* Callout 4 — Cell */}
          <View position="absolute" bottom={-36} right={20}>
            <Callout number={4} />
          </View>
        </View>
      </YStack>

      <YStack gap={12}>
        <LegendItem number={1} label="Container" />
        <LegendItem number={2} label="Header row" />
        <LegendItem number={3} label="Body row (alternating stripe)" />
        <LegendItem number={4} label="Cell" />
      </YStack>
    </XStack>
  );
}

const meta: Meta = {
  title: "atoms/table/anatomy",
  component: Anatomy,
  tags: ["autodocs", "!dev"],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
