/**
 * MD3 Dark Color Tokens
 * Auto-generated from Figma Variables — DO NOT EDIT
 * Regenerate: npm run tokens:sync
 */
export const darkColors = {
  // Primary
  primary: "#3385FF",
  onPrimary: "#FFFFFF",
  primaryContainer: "#70737C47",
  onPrimaryContainer: "#3385FF",

  // Secondary
  secondary: "#AEB0B69C",
  onSecondary: "#FFFFFF",
  secondaryContainer: "#70737C38",
  onSecondaryContainer: "#F7F7F8",

  // Tertiary
  tertiary: "#5A5C63",
  onTertiary: "#FFFFFF",
  tertiaryContainer: "#70737C1F",
  onTertiaryContainer: "#C2C4C8E0",

  // Error
  error: "#FF6363",
  onError: "#FFFFFF",
  errorContainer: "#FF63631F",
  onErrorContainer: "#FF6363",

  // Surface
  surface: "#1B1C1E",
  onSurface: "#F7F7F8",
  surfaceVariant: "#0F0F10",
  onSurfaceVariant: "#C2C4C8E0",
  surfaceContainerLowest: "#0F0F10",
  surfaceContainerLow: "#141415",
  surfaceContainer: "#70737C1F",
  surfaceContainerHigh: "#212225",
  surfaceContainerHighest: "#70737C38",

  // Outline
  outline: "#37383C",
  outlineVariant: "#333438",

  // Inverse
  inverseSurface: "#FFFFFF",
  inverseOnSurface: "#171719",
  inversePrimary: "#0066FF",

  // Scrim
  scrim: "#171719BD",
  shadow: "#000000",
} as const;

export type DarkColorToken = keyof typeof darkColors;
