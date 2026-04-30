import type { ReactNode } from "react";

export type CardVariant = "elevated" | "filled" | "outlined";

export type CardProps = {
  /** Visual style variant. Default: "elevated" */
  variant?: CardVariant;
  /** Card content */
  children?: ReactNode;
  /** Press handler — makes card interactive */
  onPress?: () => void;
  /** Long-press handler */
  onLongPress?: () => void;
  /** Whether card is disabled */
  disabled?: boolean;
  /** Test ID */
  testID?: string;
};
