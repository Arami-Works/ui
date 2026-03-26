/**
 * MD3 Typography Tokens
 * Auto-generated from Figma Variables via Token Studio
 * DO NOT EDIT — run the token pipeline to regenerate
 */

export const fontSize = {
  displayLarge: 57,
  displayMedium: 45,
  displaySmall: 36,
  headlineLarge: 32,
  headlineMedium: 28,
  headlineSmall: 24,
  titleLarge: 22,
  titleMedium: 16,
  titleSmall: 14,
  labelLarge: 14,
  labelMedium: 12,
  labelSmall: 11,
  bodyLarge: 16,
  bodyMedium: 14,
  bodySmall: 12,
} as const;

export const lineHeight = {
  displayLarge: 64,
  displayMedium: 52,
  displaySmall: 44,
  headlineLarge: 40,
  headlineMedium: 36,
  headlineSmall: 32,
  titleLarge: 28,
  titleMedium: 24,
  titleSmall: 20,
  labelLarge: 20,
  labelMedium: 16,
  labelSmall: 16,
  bodyLarge: 24,
  bodyMedium: 20,
  bodySmall: 16,
} as const;

export const letterSpacing = {
  displayLarge: -0.25,
  displayMedium: 0,
  displaySmall: 0,
  headlineLarge: 0,
  headlineMedium: 0,
  headlineSmall: 0,
  titleLarge: 0,
  titleMedium: 0.15,
  titleSmall: 0.1,
  labelLarge: 0.1,
  labelMedium: 0.5,
  labelSmall: 0.5,
  bodyLarge: 0.5,
  bodyMedium: 0.25,
  bodySmall: 0.4,
} as const;

export type TypographyToken = keyof typeof fontSize;
