import { createTamagui, createTokens, createFont } from "tamagui";
import { shorthands } from "@tamagui/shorthands";
import { createAnimations } from "@tamagui/animations-react-native";
import { colors } from "./generated/colors";
import { darkColors } from "./generated/colors-dark";
import { spacing } from "./generated/spacing";
import { fontSize, lineHeight, letterSpacing } from "./generated/typography";
import { radii } from "./generated/radii";

const animations = createAnimations({
  quick: {
    type: "spring",
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
  standard: {
    type: "spring",
    damping: 25,
    mass: 1,
    stiffness: 220,
  },
  standardDecelerate: {
    type: "spring",
    damping: 22,
    mass: 1,
    stiffness: 180,
  },
  standardAccelerate: {
    type: "spring",
    damping: 24,
    mass: 1,
    stiffness: 260,
  },
  emphasized: {
    type: "spring",
    damping: 20,
    mass: 1,
    stiffness: 180,
  },
  emphasizedDecelerate: {
    type: "spring",
    damping: 18,
    mass: 1,
    stiffness: 120,
  },
  emphasizedAccelerate: {
    type: "spring",
    damping: 22,
    mass: 1,
    stiffness: 280,
  },
});

const pretendardFont = createFont({
  family: "Pretendard-Regular",
  size: fontSize,
  lineHeight,
  letterSpacing,
  weight: {
    4: "400",
    5: "500",
    6: "600",
    7: "700",
  },
  face: {
    400: { normal: "Pretendard-Regular" },
    500: { normal: "Pretendard-Medium" },
    600: { normal: "Pretendard-SemiBold" },
    700: { normal: "Pretendard-Bold" },
  },
});

const tokens = createTokens({
  color: {
    ...colors,
    outlineColor: colors.outline,
    outlineVariantColor: colors.outlineVariant,
  },
  space: { ...spacing, true: spacing.md },
  size: { ...spacing, true: spacing.md },
  radius: radii,
  zIndex: {
    none: 0,
    xs: 100,
    sm: 200,
    md: 300,
    lg: 400,
    xl: 500,
    true: 300,
  },
});

const lightTheme = Object.fromEntries(
  Object.entries({
    ...colors,
    outlineColor: colors.outline,
    outlineVariantColor: colors.outlineVariant,
  }).map(([key, value]) => [key, value]),
);

const darkTheme = Object.fromEntries(
  Object.entries({
    ...darkColors,
    outlineColor: darkColors.outline,
    outlineVariantColor: darkColors.outlineVariant,
  }).map(([key, value]) => [key, value]),
);

const config = createTamagui({
  tokens,
  themes: { light: lightTheme, dark: darkTheme },
  shorthands,
  animations,
  fonts: {
    heading: pretendardFont,
    body: pretendardFont,
    label: pretendardFont,
  },
  settings: {
    allowedStyleValues: "somewhat-strict-web",
    autocomplete: "native",
  },
  media: {
    sm: { maxWidth: 600 },
    md: { maxWidth: 900 },
    lg: { maxWidth: 1200 },
  },
});

export type AppConfig = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
