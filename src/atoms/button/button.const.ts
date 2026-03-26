import type { ButtonVariant } from "./button.type";

/** MD3 variant → Tamagui token mapping */
export const variantStyles: Record<
  ButtonVariant,
  {
    backgroundColor: string;
    color: string;
    borderWidth: number;
    borderColor: string;
  }
> = {
  filled: {
    backgroundColor: "$primary",
    color: "$onPrimary",
    borderWidth: 0,
    borderColor: "transparent",
  },
  outlined: {
    backgroundColor: "transparent",
    color: "$primary",
    borderWidth: 1,
    borderColor: "$outline",
  },
  text: {
    backgroundColor: "transparent",
    color: "$primary",
    borderWidth: 0,
    borderColor: "transparent",
  },
  elevated: {
    backgroundColor: "$surfaceContainerLow",
    color: "$primary",
    borderWidth: 0,
    borderColor: "transparent",
  },
  tonal: {
    backgroundColor: "$secondaryContainer",
    color: "$onSecondaryContainer",
    borderWidth: 0,
    borderColor: "transparent",
  },
};
