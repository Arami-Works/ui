import type { GetProps } from "tamagui";
import type { View } from "tamagui";

/** MD3 Badge size: small (dot) or large (with count) */
export type BadgeSize = "small" | "large";

export type BadgeProps = Omit<GetProps<typeof View>, "children"> & {
  /** Badge size. Default: "small" */
  size?: BadgeSize;
  /** Count to display (only shown when size="large"). Max 999, shows "999+" above. */
  count?: number;
};
