import type { ReactNode } from "react";

/** Row height density. Default: "default" (52px). "compact" = 36px. */
export type TableDensity = "default" | "compact";

export type TableProps = {
  /** Table content — TableHeader + TableRow children */
  children?: ReactNode;
  /** Row height density. Default: "default" */
  density?: TableDensity;
  /** Test ID */
  testID?: string;
};

export type TableHeaderProps = {
  /** Header cells */
  children?: ReactNode;
  /** @internal injected by Table */
  density?: TableDensity;
};

export type TableRowProps = {
  /** Row cells */
  children?: ReactNode;
  /** @internal injected by Table — alternating stripe */
  stripe?: boolean;
  /** @internal injected by Table */
  density?: TableDensity;
};

export type TableCellProps = {
  /** Cell content */
  children?: ReactNode;
};
