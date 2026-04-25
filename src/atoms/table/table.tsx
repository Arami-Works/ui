import { Children, cloneElement, isValidElement, type ReactElement } from "react";
import { styled, View } from "tamagui";
import type {
  TableProps,
  TableHeaderProps,
  TableRowProps,
  TableCellProps,
} from "./table.type";

const StyledTable = styled(View, {
  name: "Table",
  borderWidth: 1,
  borderColor: "$outline",
  borderRadius: "$md",
  overflow: "hidden",
} as const);

const StyledRow = styled(View, {
  name: "TableRow",
  flexDirection: "row",

  variants: {
    density: {
      default: { minHeight: 52 },
      compact: { minHeight: 36 },
    },
    stripe: {
      true: { backgroundColor: "$surfaceContainer" },
      false: { backgroundColor: "$surface" },
    },
    isHeader: {
      true: { backgroundColor: "$surfaceContainerHighest" },
      false: {},
    },
  } as const,

  defaultVariants: {
    density: "default",
    stripe: false,
    isHeader: false,
  },
} as const);

const StyledCell = styled(View, {
  name: "TableCell",
  flex: 1,
  paddingHorizontal: "$md",
  paddingVertical: "$sm",
  justifyContent: "center",
} as const);

export function Table({ children, density = "default", testID }: TableProps) {
  let rowIndex = 0;
  const enhancedChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    if (child.type === TableHeader) {
      return cloneElement(child as ReactElement<TableHeaderProps>, { density });
    }
    if (child.type === TableRow) {
      const stripe = rowIndex % 2 === 1;
      rowIndex += 1;
      return cloneElement(child as ReactElement<TableRowProps>, {
        density,
        stripe,
      });
    }
    return child;
  });

  return <StyledTable testID={testID}>{enhancedChildren}</StyledTable>;
}

export function TableHeader({ children, density }: TableHeaderProps) {
  return (
    <StyledRow isHeader density={density}>
      {children}
    </StyledRow>
  );
}

export function TableRow({ children, density, stripe }: TableRowProps) {
  return (
    <StyledRow density={density} stripe={stripe}>
      {children}
    </StyledRow>
  );
}

export function TableCell({ children }: TableCellProps) {
  return <StyledCell>{children}</StyledCell>;
}
