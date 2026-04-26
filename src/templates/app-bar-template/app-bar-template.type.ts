import type { ReactNode } from "react";

export type AppBarTemplateProps = {
  /** Slot for the top app bar (e.g. TopAppBar). Pinned to the top. */
  topBar?: ReactNode;
  /** Slot for the screen content rendered below the top bar. Typically another template (e.g. DashboardTemplate, ListTemplate). */
  children?: ReactNode;
  /** Test ID for the outer container. */
  testID?: string;
};
