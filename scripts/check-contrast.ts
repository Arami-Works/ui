/**
 * WCAG AA/AAA contrast check for semantic color token pairs.
 *
 * Reads src/tokens/generated/colors.ts + colors-dark.ts, computes WCAG 2.1
 * contrast ratio for every foreground/background pair documented in the MD3
 * token system, and prints a markdown report.
 *
 * Usage:
 *   npm run tokens:check-contrast
 *
 * Exit codes:
 *   0 — always (non-blocking). Surface failures in the report.
 */

import { colors } from "../src/tokens/generated/colors";
import { darkColors } from "../src/tokens/generated/colors-dark";

type ColorMap = Record<string, string>;

// WCAG pass thresholds
const AA_TEXT = 4.5;
const AA_UI = 3.0;

type PairKind = "text" | "ui";

interface Pair {
  fg: string;
  bg: string;
  kind: PairKind;
}

// Pairs to evaluate in both light and dark themes.
// - "text" pairs require AA 4.5:1 (4.5 text / 3 large).
// - "ui" pairs require AA 3:1 (non-text UI components / borders).
const PAIRS: Pair[] = [
  { fg: "onPrimary", bg: "primary", kind: "text" },
  { fg: "onPrimaryContainer", bg: "primaryContainer", kind: "text" },
  { fg: "onSecondary", bg: "secondary", kind: "text" },
  { fg: "onSecondaryContainer", bg: "secondaryContainer", kind: "text" },
  { fg: "onTertiary", bg: "tertiary", kind: "text" },
  { fg: "onTertiaryContainer", bg: "tertiaryContainer", kind: "text" },
  { fg: "onError", bg: "error", kind: "text" },
  { fg: "onErrorContainer", bg: "errorContainer", kind: "text" },
  { fg: "onSurface", bg: "surface", kind: "text" },
  { fg: "onSurfaceVariant", bg: "surfaceVariant", kind: "text" },
  { fg: "onSurfaceVariant", bg: "surface", kind: "text" },
  { fg: "inverseOnSurface", bg: "inverseSurface", kind: "text" },
  { fg: "outline", bg: "surface", kind: "ui" },
  { fg: "outlineVariant", bg: "surface", kind: "ui" },
];

/** Parse a 6- or 8-char hex string into RGBA in the range [0,1]. */
export function parseHex(hex: string): {
  r: number;
  g: number;
  b: number;
  a: number;
} {
  const s = hex.replace("#", "");
  if (s.length !== 6 && s.length !== 8) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  const r = parseInt(s.slice(0, 2), 16) / 255;
  const g = parseInt(s.slice(2, 4), 16) / 255;
  const b = parseInt(s.slice(4, 6), 16) / 255;
  const a = s.length === 8 ? parseInt(s.slice(6, 8), 16) / 255 : 1;
  return { r, g, b, a };
}

/**
 * Composite a foreground color (possibly with alpha) over an opaque background.
 * Returns the effective opaque color as seen by the user.
 */
export function compositeOver(
  fg: { r: number; g: number; b: number; a: number },
  bg: { r: number; g: number; b: number },
): { r: number; g: number; b: number } {
  return {
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
  };
}

/** sRGB channel → linear. */
function linearize(c: number): number {
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/** WCAG 2.1 relative luminance. */
export function relativeLuminance(rgb: {
  r: number;
  g: number;
  b: number;
}): number {
  const r = linearize(rgb.r);
  const g = linearize(rgb.g);
  const b = linearize(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG 2.1 contrast ratio between two opaque colors. */
export function contrastRatio(
  a: { r: number; g: number; b: number },
  b: { r: number; g: number; b: number },
): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const [L1, L2] = la > lb ? [la, lb] : [lb, la];
  return (L1 + 0.05) / (L2 + 0.05);
}

/**
 * Resolve a token to an opaque RGB color, compositing against `surface` when
 * the token's hex carries an alpha channel.
 */
function resolveOpaque(
  theme: ColorMap,
  name: string,
): { r: number; g: number; b: number } {
  const hex = theme[name];
  if (!hex) throw new Error(`Missing token: ${name}`);
  const parsed = parseHex(hex);
  if (parsed.a === 1) return parsed;
  const surface = parseHex(theme.surface);
  return compositeOver(parsed, surface);
}

interface Result {
  fg: string;
  bg: string;
  kind: PairKind;
  ratio: number;
  passAA: boolean;
}

function evaluate(theme: ColorMap, pair: Pair): Result {
  const bg = resolveOpaque(theme, pair.bg);
  const fgHex = theme[pair.fg];
  if (!fgHex) throw new Error(`Missing token: ${pair.fg}`);
  const fgParsed = parseHex(fgHex);
  const fg = fgParsed.a === 1 ? fgParsed : compositeOver(fgParsed, bg);
  const ratio = contrastRatio(fg, bg);
  const aaThreshold = pair.kind === "text" ? AA_TEXT : AA_UI;
  return {
    fg: pair.fg,
    bg: pair.bg,
    kind: pair.kind,
    ratio,
    passAA: ratio >= aaThreshold,
  };
}

function mark(result: Result): string {
  return result.passAA ? "PASS" : "FAIL";
}

function formatRow(light: Result, dark: Result): string {
  const pair = `${light.fg} on ${light.bg}`;
  const kind = light.kind === "text" ? "text (4.5:1)" : "ui (3:1)";
  const lightCell = `${light.ratio.toFixed(2)}:1 ${mark(light)}`;
  const darkCell = `${dark.ratio.toFixed(2)}:1 ${mark(dark)}`;
  return `| ${pair} | ${kind} | ${lightCell} | ${darkCell} |`;
}

function main() {
  const lightResults = PAIRS.map((p) => evaluate(colors as ColorMap, p));
  const darkResults = PAIRS.map((p) => evaluate(darkColors as ColorMap, p));

  const lightFails = lightResults.filter((r) => !r.passAA);
  const darkFails = darkResults.filter((r) => !r.passAA);

  const lines: string[] = [];
  lines.push("# WCAG AA Contrast Report");
  lines.push("");
  lines.push(
    `Thresholds: **AA text** 4.5:1, **AA UI** 3:1. Alpha tokens are composited over \`surface\`.`,
  );
  lines.push("");
  lines.push(`| Pair | Kind (AA) | Light | Dark |`);
  lines.push(`| --- | --- | --- | --- |`);
  for (let i = 0; i < PAIRS.length; i++) {
    lines.push(formatRow(lightResults[i], darkResults[i]));
  }
  lines.push("");
  lines.push(
    `Summary: light ${lightResults.length - lightFails.length}/${lightResults.length} pass, dark ${darkResults.length - darkFails.length}/${darkResults.length} pass.`,
  );

  const report = lines.join("\n");
  console.log(report);

  // Non-blocking: always exit 0 so CI surfaces the report without gating.
}

if (require.main === module) {
  main();
}
