/**
 * MD3 Elevation Tokens
 * Auto-generated from Figma Variables via Token Studio
 * DO NOT EDIT — run the token pipeline to regenerate
 *
 * MD3 uses tonal elevation (surface tint overlay) + shadow elevation.
 * These values map to Android elevation dp / iOS shadow equivalents.
 */
export const elevation = {
  /** Level 0 — no elevation */
  level0: 0,
  /** Level 1 — 1dp shadow */
  level1: 1,
  /** Level 2 — 3dp shadow */
  level2: 3,
  /** Level 3 — 6dp shadow */
  level3: 6,
  /** Level 4 — 8dp shadow */
  level4: 8,
  /** Level 5 — 12dp shadow */
  level5: 12,
} as const;

export type ElevationToken = keyof typeof elevation;
