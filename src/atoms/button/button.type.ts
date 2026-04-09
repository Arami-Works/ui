import type { GetProps } from "tamagui";
import type { Button as TamaguiButton } from "tamagui";

/** MD3 Button variants */
export type ButtonVariant =
  | "filled"
  | "outlined"
  | "text"
  | "elevated"
  | "tonal";

export type ButtonProps = Omit<GetProps<typeof TamaguiButton>, "variant"> & {
  /** MD3 button variant. Default: "filled" */
  variant?: ButtonVariant;
  /** Disables the button */
  disabled?: boolean;
  /** Accessibility hint describing the result of pressing the button */
  accessibilityHint?: string;
};
