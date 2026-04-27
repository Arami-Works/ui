/**
 * MD3 Shape (Border Radius) Tokens
 * Auto-generated from Figma Variables — DO NOT EDIT
 * Regenerate: npm run tokens:sync
 */
export const radii = {
  /** 0px — sharp corners */
  none: 0,
  /** 4px — extra small rounding */
  xs: 4,
  /** 10px — small rounding (Montage button medium) */
  sm: 10,
  /** 12px — medium rounding (Montage card/textfield) */
  md: 12,
  /** 16px — large rounding */
  lg: 16,
  /** 20px — Montage modal large */
  xl: 20,
  /** 24px — extra large rounding (Montage featured card) */
  "2xl": 24,
  /** 9999px — fully rounded (pill/avatar) */
  full: 9999,
} as const;

export type RadiiToken = keyof typeof radii;
