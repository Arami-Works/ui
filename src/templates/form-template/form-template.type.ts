import type { ReactNode } from "react";

export type FormTemplateProps = {
  /** Slot for TopAppBar at the top */
  topBar?: ReactNode;
  /** Form field content (scrollable) */
  children?: ReactNode;
  /** Sticky bottom action buttons */
  actions?: ReactNode;
  /** Test ID for the outer container */
  testID?: string;
};
