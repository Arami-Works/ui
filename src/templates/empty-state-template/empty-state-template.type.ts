import type { ReactElement, ReactNode } from "react";

export type EmptyStateTemplateProps = {
  /** Slot for TopAppBar or custom header */
  topBar?: ReactNode;
  /** Icon slot — a ReactNode (e.g. custom SVG, Image) or a MaterialIcons name string */
  icon?: ReactElement | string;
  /** Title text */
  title?: string;
  /** Body text */
  body?: string;
  /** Action slot, typically a Button */
  action?: ReactNode;
  testID?: string;
};
