/**
 * MD3 Color Tokens
 * Auto-generated from Figma Variables — DO NOT EDIT
 * Regenerate: npm run tokens:sync
 */
export const colors = {
  // Primary
  primary: "#0066FF",
  onPrimary: "#FFFFFF",
  primaryContainer: "#70737C29",
  onPrimaryContainer: "#0066FF",

  // Secondary
  secondary: "#37383C9C",
  onSecondary: "#FFFFFF",
  secondaryContainer: "#70737C14",
  onSecondaryContainer: "#171719",

  // Tertiary
  tertiary: "#989BA2",
  onTertiary: "#FFFFFF",
  tertiaryContainer: "#70737C0D",
  onTertiaryContainer: "#2E2F33E0",

  // Error
  error: "#FF4242",
  onError: "#FFFFFF",
  errorContainer: "#FF42421F",
  onErrorContainer: "#FF4242",

  // Surface
  surface: "#FFFFFF",
  onSurface: "#171719",
  surfaceVariant: "#F7F7F8",
  onSurfaceVariant: "#2E2F33E0",
  surfaceContainerLowest: "#FFFFFF",
  surfaceContainerLow: "#F7F7F8",
  surfaceContainer: "#70737C0D",
  surfaceContainerHigh: "#FFFFFF",
  surfaceContainerHighest: "#70737C14",

  // Outline
  outline: "#E1E2E4",
  outlineVariant: "#EAEBEC",

  // Inverse
  inverseSurface: "#1B1C1E",
  inverseOnSurface: "#F7F7F8",
  inversePrimary: "#3385FF",

  // Scrim
  scrim: "#17171985",
  shadow: "#000000",
} as const;

export type ColorToken = keyof typeof colors;
