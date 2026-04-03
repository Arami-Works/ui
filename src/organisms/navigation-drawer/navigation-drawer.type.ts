import type { ReactNode } from "react";

export type DrawerDestination = {
  /** Unique key */
  key: string;
  /** Material icon name (unfilled) */
  icon: string;
  /** Material icon name (filled, for active state) */
  activeIcon?: string;
  /** Label */
  label: string;
  /** Optional badge count */
  badgeCount?: number;
};

export type DrawerSection = {
  /** Optional section header */
  header?: string;
  /** Destinations in this section */
  destinations: DrawerDestination[];
};

export type NavigationDrawerProps = {
  /** Whether the drawer is open */
  open: boolean;
  /** Close handler */
  onClose: () => void;
  /** Navigation sections */
  sections: DrawerSection[];
  /** Currently active destination key */
  activeKey?: string;
  /** Destination press handler */
  onDestinationPress?: (key: string) => void;
  /** Optional header content */
  header?: ReactNode;
  /** Test ID */
  testID?: string;
};
