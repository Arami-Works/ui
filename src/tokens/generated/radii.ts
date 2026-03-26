/**
 * MD3 Shape (Border Radius) Tokens
 * Auto-generated from Figma Variables via Token Studio
 * DO NOT EDIT — run the token pipeline to regenerate
 */
export const radii = {
  /** 0px — sharp corners */
  none: 0,
  /** 4px — extra small rounding */
  xs: 4,
  /** 8px — small rounding */
  sm: 8,
  /** 12px — medium rounding */
  md: 12,
  /** 16px — large rounding */
  lg: 16,
  /** 20px */
  xl: 20,
  /** 28px — extra large rounding */
  "2xl": 28,
  /** 9999px — fully rounded (pill) */
  full: 9999,
} as const;

export type RadiiToken = keyof typeof radii;
