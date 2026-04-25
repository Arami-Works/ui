import type { Meta, StoryObj } from "@storybook/react-vite";
import { YStack } from "tamagui";
import { Table, TableHeader, TableRow, TableCell } from "../../table";
import { Text } from "../../../text";

function Specs() {
  return (
    <YStack gap={16} padding={16}>
      <Text role="headline" size="small">
        Table Specs
      </Text>
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
              Default row height
            </Text>
          </TableCell>
          <TableCell>
            <Text role="body" size="medium">
              52
            </Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Text role="body" size="medium">
              Compact row height
            </Text>
          </TableCell>
          <TableCell>
            <Text role="body" size="medium">
              36
            </Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Text role="body" size="medium">
              Cell padding (horizontal)
            </Text>
          </TableCell>
          <TableCell>
            <Text role="body" size="medium">
              spacing.md (12)
            </Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Text role="body" size="medium">
              Cell padding (vertical)
            </Text>
          </TableCell>
          <TableCell>
            <Text role="body" size="medium">
              spacing.sm (8)
            </Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Text role="body" size="medium">
              Border color
            </Text>
          </TableCell>
          <TableCell>
            <Text role="body" size="medium">
              $outline
            </Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Text role="body" size="medium">
              Border radius
            </Text>
          </TableCell>
          <TableCell>
            <Text role="body" size="medium">
              radii.md (12)
            </Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Text role="body" size="medium">
              Header background
            </Text>
          </TableCell>
          <TableCell>
            <Text role="body" size="medium">
              $surfaceContainerHighest
            </Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Text role="body" size="medium">
              Body row background
            </Text>
          </TableCell>
          <TableCell>
            <Text role="body" size="medium">
              $surface
            </Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Text role="body" size="medium">
              Stripe background
            </Text>
          </TableCell>
          <TableCell>
            <Text role="body" size="medium">
              $surfaceContainer (alternating)
            </Text>
          </TableCell>
        </TableRow>
      </Table>
    </YStack>
  );
}

const meta: Meta = {
  title: "atoms/table/specs",
  component: Specs,
  tags: ["autodocs", "!dev"],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
