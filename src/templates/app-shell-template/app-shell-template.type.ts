import type { ReactNode } from "react";

export type AppShellTemplateProps = {
  /** Slot for the top app bar (e.g. TopAppBar or AppBarTemplate). Pinned to the top. */
  topAppBar?: ReactNode;
  /** Slot for the bottom navigation bar (e.g. NavigationBar). Pinned to the bottom. */
  bottomNavigationBar?: ReactNode;
  /** Slot for the screen content rendered between the top and bottom bars. Typically a page-level template (DashboardTemplate, ListTemplate, etc.). */
  children?: ReactNode;
  /** Test ID for the outer container. */
  testID?: string;
};
