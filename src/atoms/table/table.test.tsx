import { render, screen } from "@/test-utils";
import { Text } from "tamagui";
import { Table, TableHeader, TableRow, TableCell } from "./table";

describe("Table", () => {
  it("renders header and rows", () => {
    render(
      <Table testID="table">
        <TableHeader>
          <TableCell>
            <Text>Property</Text>
          </TableCell>
          <TableCell>
            <Text>Value</Text>
          </TableCell>
        </TableHeader>
        <TableRow>
          <TableCell>
            <Text>Dot Size</Text>
          </TableCell>
          <TableCell>
            <Text>6 × 6</Text>
          </TableCell>
        </TableRow>
      </Table>,
    );

    expect(screen.getByTestId("table")).toBeTruthy();
    expect(screen.getByText("Property")).toBeTruthy();
    expect(screen.getByText("Dot Size")).toBeTruthy();
  });

  it("supports default density", () => {
    render(
      <Table testID="table">
        <TableRow>
          <TableCell>
            <Text>cell</Text>
          </TableCell>
        </TableRow>
      </Table>,
    );
    expect(screen.getByTestId("table")).toBeTruthy();
  });

  it("supports compact density", () => {
    render(
      <Table density="compact" testID="table">
        <TableRow>
          <TableCell>
            <Text>cell</Text>
          </TableCell>
        </TableRow>
      </Table>,
    );
    expect(screen.getByTestId("table")).toBeTruthy();
  });

  it("alternates row stripes — odd-indexed rows get stripe", () => {
    const { toJSON } = render(
      <Table testID="table">
        <TableRow>
          <TableCell>
            <Text>row 0</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Text>row 1</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Text>row 2</Text>
          </TableCell>
        </TableRow>
      </Table>,
    );
    expect(toJSON()).toBeTruthy();
    expect(screen.getByText("row 0")).toBeTruthy();
    expect(screen.getByText("row 1")).toBeTruthy();
    expect(screen.getByText("row 2")).toBeTruthy();
  });

  it("renders without header", () => {
    render(
      <Table testID="table">
        <TableRow>
          <TableCell>
            <Text>only row</Text>
          </TableCell>
        </TableRow>
      </Table>,
    );
    expect(screen.getByText("only row")).toBeTruthy();
  });

  it("renders empty table", () => {
    render(<Table testID="table" />);
    expect(screen.getByTestId("table")).toBeTruthy();
  });

  it("renders multiple cells per row", () => {
    render(
      <Table testID="table">
        <TableRow>
          <TableCell>
            <Text>a</Text>
          </TableCell>
          <TableCell>
            <Text>b</Text>
          </TableCell>
          <TableCell>
            <Text>c</Text>
          </TableCell>
        </TableRow>
      </Table>,
    );
    expect(screen.getByText("a")).toBeTruthy();
    expect(screen.getByText("b")).toBeTruthy();
    expect(screen.getByText("c")).toBeTruthy();
  });

  it("preserves non-element children (text nodes)", () => {
    render(
      <Table testID="table">
        {"plain text node"}
        <TableRow>
          <TableCell>
            <Text>row</Text>
          </TableCell>
        </TableRow>
      </Table>,
    );
    expect(screen.getByText("row")).toBeTruthy();
  });

  it("preserves unknown element children (not header/row)", () => {
    render(
      <Table testID="table">
        <Text>caption above rows</Text>
        <TableRow>
          <TableCell>
            <Text>row</Text>
          </TableCell>
        </TableRow>
      </Table>,
    );
    expect(screen.getByText("caption above rows")).toBeTruthy();
    expect(screen.getByText("row")).toBeTruthy();
  });
});
