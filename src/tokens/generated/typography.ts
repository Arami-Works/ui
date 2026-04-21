/**
 * MD3 Typography Tokens — Montage-matched
 * Auto-generated from Figma Variables via Token Studio
 * DO NOT EDIT — run the token pipeline to regenerate
 *
 * Source: Montage (wanteddev/montage-web) typography scale
 * Mapping: scripts/figma-docs/montage-tokens.md
 * Letter spacing converted from em to px (em * fontSize)
 */

export const fontSize = {
  displayLarge: 56,
  displayMedium: 40,
  displaySmall: 36,
  headlineLarge: 32,
  headlineMedium: 28,
  headlineSmall: 24,
  titleLarge: 22,
  titleMedium: 20,
  titleSmall: 18,
  labelLarge: 14,
  labelMedium: 13,
  labelSmall: 12,
  bodyLarge: 17,
  bodyMedium: 16,
  bodySmall: 15,
} as const;

export const lineHeight = {
  displayLarge: 72,
  displayMedium: 52,
  displaySmall: 48,
  headlineLarge: 44,
  headlineMedium: 38,
  headlineSmall: 32,
  titleLarge: 30,
  titleMedium: 28,
  titleSmall: 26,
  labelLarge: 20,
  labelMedium: 18,
  labelSmall: 16,
  bodyLarge: 24,
  bodyMedium: 24,
  bodySmall: 22,
} as const;

export const letterSpacing = {
  displayLarge: -1.79,
  displayMedium: -1.13,
  displaySmall: -0.97,
  headlineLarge: -0.81,
  headlineMedium: -0.66,
  headlineSmall: -0.55,
  titleLarge: -0.43,
  titleMedium: -0.24,
  titleSmall: -0.04,
  labelLarge: 0.2,
  labelMedium: 0.25,
  labelSmall: 0.3,
  bodyLarge: 0,
  bodyMedium: 0.09,
  bodySmall: 0.14,
} as const;

export type TypographyToken = keyof typeof fontSize;
