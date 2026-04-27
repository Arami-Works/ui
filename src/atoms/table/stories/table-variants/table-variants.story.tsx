import type { Meta, StoryObj } from "@storybook/react-vite";
import { YStack } from "tamagui";
import { Table, TableHeader, TableRow, TableCell } from "../../table";
import { Text } from "../../../text";

function Variants() {
  return (
    <YStack gap={32} padding={16}>
      <YStack gap={8}>
        <Text role="title" size="medium">
          Default density (52px rows)
        </Text>
        <Table density="default">
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
      </YStack>

      <YStack gap={8}>
        <Text role="title" size="medium">
          Compact density (36px rows)
        </Text>
        <Table density="compact">
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
      </YStack>
    </YStack>
  );
}

const meta: Meta = {
  title: "atoms/table/variants",
  component: Variants,
  tags: ["autodocs", "!dev"],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
