/**
 * MD3 Shape (Border Radius) Tokens — Montage-matched
 * Auto-generated from Figma Variables via Token Studio
 * DO NOT EDIT — run the token pipeline to regenerate
 *
 * Source: Montage (wanteddev/montage-web) border radius values
 * Mapping: scripts/figma-docs/montage-tokens.md
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
