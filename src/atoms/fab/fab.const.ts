import { radii } from "../../tokens/generated/radii";
import { spacing } from "../../tokens/generated/spacing";
import type { FabSize, FabColor } from "./fab.type";

export const FAB_SIZE_MAP: Record<
  FabSize,
  { width: number; height: number; borderRadius: number; iconSize: number }
> = {
  small: { width: 40, height: 40, borderRadius: radii.md, iconSize: 24 },
  regular: { width: 56, height: 56, borderRadius: radii.lg, iconSize: 24 },
  large: { width: 96, height: 96, borderRadius: 28, iconSize: 36 },
} as const;

export const FAB_COLOR_MAP: Record<
  FabColor,
  { background: string; icon: string }
> = {
  primary: { background: "primaryContainer", icon: "onPrimaryContainer" },
  surface: { background: "surfaceContainerHigh", icon: "primary" },
  secondary: {
    background: "secondaryContainer",
    icon: "onSecondaryContainer",
  },
  tertiary: { background: "tertiaryContainer", icon: "onTertiaryContainer" },
} as const;

export const FAB_EXTENDED_GAP = spacing.md;
export const FAB_EXTENDED_PADDING_HORIZONTAL = spacing.lg;
export const FAB_EXTENDED_BORDER_RADIUS = radii.lg;
