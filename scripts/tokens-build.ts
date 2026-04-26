/**
 * Token builder — .figma-raw/ JSON → src/tokens/generated/*.ts
 *
 * Reads the intermediate JSON produced by tokens-fetch.ts and generates
 * TypeScript files that exactly match the hand-authored format
 * (as const objects + type aliases).
 *
 * Usage:  npx tsx scripts/tokens-build.ts
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// ── Paths ────────────────────────────────────────────────────────────
const RAW_DIR = join(process.cwd(), "src/tokens/.figma-raw");
const OUT_DIR = join(process.cwd(), "src/tokens/generated");

// ── Types for intermediate JSON ──────────────────────────────────────
interface TokenLeaf {
  $type: "color" | "number";
  $value?: string | number;
  /** Present when Figma collection has multiple modes (e.g., Light/Dark). */
  $valuesByMode?: Record<string, string | number>;
  $description?: string;
}

type TokenTree = { [key: string]: TokenLeaf | TokenTree };

function isLeaf(node: unknown): node is TokenLeaf {
  if (typeof node !== "object" || node === null) return false;
  return "$value" in node || "$valuesByMode" in node;
}

/** Resolve a leaf's value for a specific mode name, falling back to $value. */
function leafValue(leaf: TokenLeaf, mode?: string): string | number {
  if (mode && leaf.$valuesByMode && mode in leaf.$valuesByMode) {
    return leaf.$valuesByMode[mode];
  }
  if (leaf.$value !== undefined) return leaf.$value;
  if (leaf.$valuesByMode) {
    // No exact mode match — use first available.
    return Object.values(leaf.$valuesByMode)[0];
  }
  throw new Error("Token leaf has neither $value nor $valuesByMode");
}

function readJson(name: string): TokenTree {
  const filePath = join(RAW_DIR, `${name}.json`);
  return JSON.parse(readFileSync(filePath, "utf-8")) as TokenTree;
}

// ── Helpers ──────────────────────────────────────────────────────────
const HEADER = (title: string, extra?: string) =>
  [
    "/**",
    ` * MD3 ${title} Tokens`,
    " * Auto-generated from Figma Variables — DO NOT EDIT",
    " * Regenerate: npm run tokens:sync",
    extra ? ` *\n * ${extra}` : undefined,
    " */",
  ]
    .filter(Boolean)
    .join("\n");

function propKey(key: string): string {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
}

function indent(s: string, n = 2): string {
  const pad = " ".repeat(n);
  return s
    .split("\n")
    .map((l) => (l.trim() ? pad + l : l))
    .join("\n");
}

// ── Color builder ────────────────────────────────────────────────────

/** Explicit key order within each group to guarantee stable output. */
const COLOR_GROUP_ORDER: Record<string, string[]> = {
  Surface: [
    "surface",
    "onSurface",
    "surfaceVariant",
    "onSurfaceVariant",
    "surfaceContainerLowest",
    "surfaceContainerLow",
    "surfaceContainer",
    "surfaceContainerHigh",
    "surfaceContainerHighest",
  ],
};

const COLOR_GROUPS: Array<{ name: string; test: (k: string) => boolean }> = [
  { name: "Primary", test: (k) => /^(primary|onPrimary)/.test(k) },
  { name: "Secondary", test: (k) => /^(secondary|onSecondary)/.test(k) },
  { name: "Tertiary", test: (k) => /^(tertiary|onTertiary)/.test(k) },
  { name: "Error", test: (k) => /^(error|onError)/.test(k) },
  {
    name: "Surface",
    test: (k) => /^(surface|onSurface)/.test(k),
  },
  { name: "Outline", test: (k) => /^outline/.test(k) },
  { name: "Inverse", test: (k) => /^inverse/.test(k) },
  { name: "Scrim", test: (k) => k === "scrim" || k === "shadow" },
];

interface ColorEmitOptions {
  /** Mode name (e.g., "Light", "Dark") to resolve $valuesByMode against. */
  mode?: string;
  /** Title for the file header (e.g., "Color", "Dark Color"). */
  title: string;
  /** Exported const name (e.g., "colors", "darkColors"). */
  exportName: string;
  /** Exported type alias name (e.g., "ColorToken", "DarkColorToken"). */
  typeName: string;
}

function buildColors(tokens: TokenTree, opts: ColorEmitOptions): string {
  const lines: string[] = [];
  const used = new Set<string>();

  for (const group of COLOR_GROUPS) {
    const matched = Object.keys(tokens).filter(
      (k) => isLeaf(tokens[k]) && group.test(k),
    );
    if (matched.length === 0) continue;

    // Apply explicit ordering if defined, otherwise keep source order
    const order = COLOR_GROUP_ORDER[group.name];
    const members = order ? order.filter((k) => matched.includes(k)) : matched;

    lines.push(`  // ${group.name}`);
    for (const key of members) {
      const leaf = tokens[key] as TokenLeaf;
      lines.push(`  ${propKey(key)}: "${leafValue(leaf, opts.mode)}",`);
      used.add(key);
    }
    lines.push("");
  }

  // Catch any ungrouped tokens
  for (const key of Object.keys(tokens)) {
    if (used.has(key) || !isLeaf(tokens[key])) continue;
    const leaf = tokens[key] as TokenLeaf;
    lines.push(`  ${propKey(key)}: "${leafValue(leaf, opts.mode)}",`);
  }

  // Remove trailing blank line inside object
  while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
    lines.pop();
  }

  return [
    HEADER(opts.title),
    `export const ${opts.exportName} = {`,
    ...lines,
    "} as const;",
    "",
    `export type ${opts.typeName} = keyof typeof ${opts.exportName};`,
    "",
  ].join("\n");
}

/** Detect which mode names are present in a color tokens tree. */
function detectColorModes(tokens: TokenTree): string[] {
  const modes = new Set<string>();
  function walk(tree: TokenTree): void {
    for (const key of Object.keys(tree)) {
      const node = tree[key];
      if (isLeaf(node)) {
        if (node.$valuesByMode) {
          for (const mode of Object.keys(node.$valuesByMode)) {
            modes.add(mode);
          }
        }
      } else {
        walk(node as TokenTree);
      }
    }
  }
  walk(tokens);
  return Array.from(modes);
}

// ── Numeric object builder (spacing, radii, elevation) ───────────────
function buildNumericObject(
  title: string,
  exportName: string,
  typeName: string,
  tokens: TokenTree,
  headerExtra?: string,
): string {
  const lines: string[] = [];

  for (const key of Object.keys(tokens)) {
    const leaf = tokens[key];
    if (!isLeaf(leaf)) continue;

    const value = leafValue(leaf);
    if (leaf.$description) {
      lines.push(`  /** ${leaf.$description} */`);
    } else {
      lines.push(`  /** ${value}px */`);
    }
    lines.push(`  ${propKey(key)}: ${value},`);
  }

  return [
    HEADER(title, headerExtra),
    `export const ${exportName} = {`,
    ...lines,
    "} as const;",
    "",
    `export type ${typeName} = keyof typeof ${exportName};`,
    "",
  ].join("\n");
}

// ── Typography builder ───────────────────────────────────────────────
function buildTypography(tokens: TokenTree): string {
  const groups = ["fontSize", "lineHeight", "letterSpacing"] as const;
  const sections: string[] = [HEADER("Typography"), ""];

  for (const group of groups) {
    const subtree = tokens[group];
    if (!subtree || isLeaf(subtree)) continue;

    const lines: string[] = [];
    for (const key of Object.keys(subtree)) {
      const leaf = (subtree as TokenTree)[key];
      if (!isLeaf(leaf)) continue;
      lines.push(`  ${propKey(key)}: ${leafValue(leaf)},`);
    }

    sections.push(`export const ${group} = {`, ...lines, "} as const;", "");
  }

  sections.push("export type TypographyToken = keyof typeof fontSize;", "");
  return sections.join("\n");
}

// ── Main ─────────────────────────────────────────────────────────────
function main() {
  if (!existsSync(RAW_DIR)) {
    console.error(`Error: ${RAW_DIR} not found. Run tokens:fetch first.`);
    process.exit(1);
  }

  mkdirSync(OUT_DIR, { recursive: true });

  // Colors may emit one or two files depending on mode count in raw JSON.
  const colorBuilds: Array<{
    file: string;
    source: string;
    builder: () => string;
  }> = [];
  const colorsRawPath = join(RAW_DIR, "colors.json");
  if (existsSync(colorsRawPath)) {
    const colorsTree = readJson("colors");
    const modes = detectColorModes(colorsTree);
    const hasDark = modes.some((m) => /dark/i.test(m));
    const lightMode = modes.find((m) => /light/i.test(m));
    const darkMode = modes.find((m) => /dark/i.test(m));

    colorBuilds.push({
      file: "colors.ts",
      source: "colors",
      builder: () =>
        buildColors(colorsTree, {
          mode: lightMode,
          title: "Color",
          exportName: "colors",
          typeName: "ColorToken",
        }),
    });

    if (hasDark) {
      colorBuilds.push({
        file: "colors-dark.ts",
        source: "colors",
        builder: () =>
          buildColors(colorsTree, {
            mode: darkMode,
            title: "Dark Color",
            exportName: "darkColors",
            typeName: "DarkColorToken",
          }),
      });
    }
  }

  const builds: Array<{ file: string; source: string; builder: () => string }> =
    [
      ...colorBuilds,
      {
        file: "spacing.ts",
        source: "spacing",
        builder: () =>
          buildNumericObject(
            "Spacing",
            "spacing",
            "SpacingToken",
            readJson("spacing"),
          ),
      },
      {
        file: "typography.ts",
        source: "typography",
        builder: () => buildTypography(readJson("typography")),
      },
      {
        file: "radii.ts",
        source: "shape",
        builder: () =>
          buildNumericObject(
            "Shape (Border Radius)",
            "radii",
            "RadiiToken",
            readJson("shape"),
          ),
      },
      {
        file: "elevation.ts",
        source: "elevation",
        builder: () =>
          buildNumericObject(
            "Elevation",
            "elevation",
            "ElevationToken",
            readJson("elevation"),
            "MD3 uses tonal elevation (surface tint overlay) + shadow elevation.\n * These values map to Android elevation dp / iOS shadow equivalents.",
          ),
      },
    ];

  for (const { file, source, builder } of builds) {
    const sourcePath = join(RAW_DIR, `${source}.json`);
    if (!existsSync(sourcePath)) {
      console.warn(`  Skipping ${file} — ${source}.json not found`);
      continue;
    }

    const content = builder();
    writeFileSync(join(OUT_DIR, file), content);
    console.log(`  ${file}`);
  }

  console.log("Build complete.");
}

main();
