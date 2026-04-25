import type { ReactNode } from "react";

/** Row height density. Default: "default" (52px). "compact" = 36px. */
export type TableDensity = "default" | "compact";

export type TableProps = {
  /**
   * Table content — TableHeader + TableRow children.
   *
   * Only direct TableHeader/TableRow children are enhanced with density and
   * stripe props. Children wrapped in another component or behind a conditional
   * expression won't be detected and will render at default density without stripes.
   */
  children?: ReactNode;
  /** Row height density. Default: "default" */
  density?: TableDensity;
  /** Test ID */
  testID?: string;
};

export type TableHeaderProps = {
  /** Header cells */
  children?: ReactNode;
};

export type TableRowProps = {
  /** Row cells */
  children?: ReactNode;
};

export type TableCellProps = {
  /** Cell content */
  children?: ReactNode;
};
