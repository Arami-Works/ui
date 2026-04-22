/**
 * Shadow Tokens — Montage-matched
 * Hand-written (not from Figma pipeline)
 *
 * Source: Montage (wanteddev/montage-web) shadow levels
 * Reference: scripts/figma-docs/montage-tokens.md
 *
 * Montage uses rgba(23,23,23, opacity) consistently.
 * React Native shadow props (iOS) + elevation (Android).
 */

export const shadows = {
  /** 0px 1px 2px -1px rgba(23,23,23,0.10) */
  xsmall: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  /** 0px 2px 4px -2px + 0px 4px 6px -1px rgba(23,23,23,0.06) */
  small: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  /** 0px 4px 6px -2px + 0px 10px 15px -3px rgba(23,23,23,0.07) */
  medium: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 15,
    elevation: 4,
  },
  /** 0px 6px 10px -4px + 0px 16px 24px -6px rgba(23,23,23,0.08) */
  large: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
  },
  /** 0px 10px 15px -5px + 0px 24px 38px -10px rgba(23,23,23,0.10-0.12) */
  xlarge: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.11,
    shadowRadius: 38,
    elevation: 12,
  },
} as const;

export type ShadowLevel = keyof typeof shadows;
