/**
 * Figma Variables → intermediate JSON
 *
 * Fetches all local variables from the Figma tokens file and outputs
 * normalised JSON files that tokens-build.ts consumes.
 *
 * Usage:  npx tsx scripts/tokens-fetch.ts
 * Env:    FIGMA_ACCESS_TOKEN (via Doppler)
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// ── Figma tokens file ────────────────────────────────────────────────
const FIGMA_FILE_KEY = "81sGJB0y1lYCDY5oB35aBA";

// ── Types ────────────────────────────────────────────────────────────
interface FigmaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface FigmaVariable {
  id: string;
  name: string;
  variableCollectionId: string;
  resolvedType: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN";
  valuesByMode: Record<string, FigmaColor | number | string | boolean>;
  description: string;
}

interface FigmaVariableCollection {
  id: string;
  name: string;
  modes: Array<{ modeId: string; name: string }>;
  defaultModeId: string;
}

interface FigmaResponse {
  status: number;
  error: boolean;
  meta: {
    variables: Record<string, FigmaVariable>;
    variableCollections: Record<string, FigmaVariableCollection>;
  };
}

// ── Token JSON shape written to disk ─────────────────────────────────
interface TokenLeaf {
  $value: string | number;
  $type: "color" | "number";
  $description?: string;
}

type TokenTree = { [key: string]: TokenLeaf | TokenTree };

// ── Collection → output file name ────────────────────────────────────
const COLLECTION_MAP: Record<string, string> = {
  "md.sys.color": "colors",
  "md.sys.spacing": "spacing",
  "md.sys.typography": "typography",
  "md.sys.shape": "shape",
  "md.sys.elevation": "elevation",
};

// ── Helpers ──────────────────────────────────────────────────────────
function rgbaToHex(c: FigmaColor): string {
  const hex = (n: number) =>
    Math.round(n * 255)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase();
  return `#${hex(c.r)}${hex(c.g)}${hex(c.b)}`;
}

function setNested(obj: TokenTree, path: string[], leaf: TokenLeaf): void {
  let cursor: TokenTree = obj;
  for (let i = 0; i < path.length - 1; i++) {
    if (!cursor[path[i]] || "$value" in (cursor[path[i]] as TokenLeaf)) {
      cursor[path[i]] = {};
    }
    cursor = cursor[path[i]] as TokenTree;
  }
  cursor[path[path.length - 1]] = leaf;
}

// ── Main ─────────────────────────────────────────────────────────────
async function main() {
  const token = process.env.FIGMA_ACCESS_TOKEN;
  if (!token) {
    console.error("Error: FIGMA_ACCESS_TOKEN env var is required.");
    console.error("Run via: doppler run --project ui --config master -- npx tsx scripts/tokens-fetch.ts");
    process.exit(1);
  }

  console.log("Fetching variables from Figma...");
  const res = await fetch(
    `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/variables/local`,
    { headers: { "X-Figma-Token": token } },
  );

  if (!res.ok) {
    console.error(`Figma API error: ${res.status} ${res.statusText}`);
    const body = await res.text();
    console.error(body);
    process.exit(1);
  }

  const data: FigmaResponse = await res.json();
  const { variables, variableCollections } = data.meta;

  // Group variables by collection
  const grouped = new Map<
    string,
    { collection: FigmaVariableCollection; vars: FigmaVariable[] }
  >();

  for (const v of Object.values(variables)) {
    const collection = variableCollections[v.variableCollectionId];
    if (!collection) continue;
    const entry = grouped.get(collection.name);
    if (entry) {
      entry.vars.push(v);
    } else {
      grouped.set(collection.name, { collection, vars: [v] });
    }
  }

  // Write per-collection JSON
  const outDir = join(process.cwd(), "src/tokens/.figma-raw");
  mkdirSync(outDir, { recursive: true });

  for (const [collectionName, { collection, vars }] of grouped) {
    const outputName = COLLECTION_MAP[collectionName];
    if (!outputName) {
      console.warn(`  Skipping unknown collection: ${collectionName}`);
      continue;
    }

    const defaultModeId = collection.defaultModeId;
    const tokens: TokenTree = {};

    for (const v of vars) {
      const raw = v.valuesByMode[defaultModeId];
      if (raw === undefined) continue;

      const resolved =
        v.resolvedType === "COLOR" ? rgbaToHex(raw as FigmaColor) : raw;

      const leaf: TokenLeaf = {
        $value: resolved as string | number,
        $type: v.resolvedType === "COLOR" ? "color" : "number",
      };
      if (v.description) leaf.$description = v.description;

      const parts = v.name.split("/");
      setNested(tokens, parts, leaf);
    }

    const outPath = join(outDir, `${outputName}.json`);
    writeFileSync(outPath, JSON.stringify(tokens, null, 2) + "\n");
    console.log(`  ${outputName}.json (${vars.length} variables)`);
  }

  console.log("Fetch complete.");
}

main();
