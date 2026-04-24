import {
  argbFromHex,
  themeFromSourceColor,
  hexFromArgb,
} from "@material/material-color-utilities";

const primarySeed = argbFromHex("#FF2D55");
const secondarySeed = argbFromHex("#009E99");

// Generate theme from primary seed
const theme = themeFromSourceColor(primarySeed, [
  { name: "custom-secondary", value: secondarySeed, blend: false },
]);

const light = theme.schemes.light;
const dark = theme.schemes.dark;

// Extract all token names from the scheme
const tokenNames = [
  "primary", "onPrimary", "primaryContainer", "onPrimaryContainer",
  "secondary", "onSecondary", "secondaryContainer", "onSecondaryContainer",
  "tertiary", "onTertiary", "tertiaryContainer", "onTertiaryContainer",
  "error", "onError", "errorContainer", "onErrorContainer",
  "surface", "onSurface", "surfaceVariant", "onSurfaceVariant",
  "outline", "outlineVariant",
  "inverseSurface", "inverseOnSurface", "inversePrimary",
  "scrim", "shadow",
];

// Surface container tokens aren't in the base scheme — derive from surface tones
const { TonalPalette } = await import("@material/material-color-utilities");

// Get the neutral palette for surface containers
const neutralPalette = theme.palettes.neutral;

console.log("=== LIGHT MODE ===\n");
for (const name of tokenNames) {
  const val = light[name];
  if (val !== undefined) {
    console.log(`  ${name}: "${hexFromArgb(val)}",`);
  }
}

// Surface containers from neutral palette (MD3 light mode tones)
console.log(`  surfaceContainerLowest: "${hexFromArgb(neutralPalette.tone(100))}",`);
console.log(`  surfaceContainerLow: "${hexFromArgb(neutralPalette.tone(96))}",`);
console.log(`  surfaceContainer: "${hexFromArgb(neutralPalette.tone(94))}",`);
console.log(`  surfaceContainerHigh: "${hexFromArgb(neutralPalette.tone(92))}",`);
console.log(`  surfaceContainerHighest: "${hexFromArgb(neutralPalette.tone(90))}",`);

console.log("\n=== DARK MODE ===\n");
for (const name of tokenNames) {
  const val = dark[name];
  if (val !== undefined) {
    console.log(`  ${name}: "${hexFromArgb(val)}",`);
  }
}

// Surface containers from neutral palette (MD3 dark mode tones)
console.log(`  surfaceContainerLowest: "${hexFromArgb(neutralPalette.tone(4))}",`);
console.log(`  surfaceContainerLow: "${hexFromArgb(neutralPalette.tone(10))}",`);
console.log(`  surfaceContainer: "${hexFromArgb(neutralPalette.tone(12))}",`);
console.log(`  surfaceContainerHigh: "${hexFromArgb(neutralPalette.tone(17))}",`);
console.log(`  surfaceContainerHighest: "${hexFromArgb(neutralPalette.tone(22))}",`);

// Also show the custom secondary override
console.log("\n=== CUSTOM SECONDARY (from #009E99 seed) ===\n");
const customSecondary = theme.customColors[0];
if (customSecondary) {
  const cl = customSecondary.light;
  const cd = customSecondary.dark;
  console.log("Light:");
  console.log(`  secondary: "${hexFromArgb(cl.color)}",`);
  console.log(`  onSecondary: "${hexFromArgb(cl.onColor)}",`);
  console.log(`  secondaryContainer: "${hexFromArgb(cl.colorContainer)}",`);
  console.log(`  onSecondaryContainer: "${hexFromArgb(cl.onColorContainer)}",`);
  console.log("Dark:");
  console.log(`  secondary: "${hexFromArgb(cd.color)}",`);
  console.log(`  onSecondary: "${hexFromArgb(cd.onColor)}",`);
  console.log(`  secondaryContainer: "${hexFromArgb(cd.colorContainer)}",`);
  console.log(`  onSecondaryContainer: "${hexFromArgb(cd.onColorContainer)}",`);
}

// Show the tonal palettes for reference
console.log("\n=== TONAL PALETTES ===\n");
const tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];
console.log("Primary palette:");
for (const t of tones) {
  console.log(`  tone ${t}: ${hexFromArgb(theme.palettes.primary.tone(t))}`);
}
console.log("Secondary palette (from primary — NOT custom):");
for (const t of tones) {
  console.log(`  tone ${t}: ${hexFromArgb(theme.palettes.secondary.tone(t))}`);
}
console.log("Custom secondary palette (from #009E99):");
if (customSecondary) {
  // The custom color palette tones
  for (const t of tones) {
    // customSecondary has .color which is the harmonized argb
    // We need the palette - extract from the value
  }
}
