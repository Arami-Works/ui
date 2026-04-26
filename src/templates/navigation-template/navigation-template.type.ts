import type { ReactNode } from "react";

export type NavigationTemplateProps = {
  /** Slot for persistent navigation chrome (e.g. NavigationBar, NavigationRail). Pinned to the bottom. */
  navBar?: ReactNode;
  /** Slot for the screen content rendered above the nav bar. Typically another template (e.g. AppBarTemplate or DashboardTemplate). */
  children?: ReactNode;
  /** Test ID for the outer container. */
  testID?: string;
};
