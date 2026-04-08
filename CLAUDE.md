# @aramiworks/ui — Design System

Expo-based component library. Brad Frost atomic design with MD3 interface and Tamagui internals.

## Start Storybook

```bash
npm start          # Expo dev server (press i for iOS, a for Android, w for web)
```

## Structure

- `src/atoms/` — basic building blocks (Button, Text, Icon, etc.)
- `src/molecules/` — composed atoms (SearchBar, FormField, etc.)
- `src/organisms/` — complex UI sections (TopAppBar, NavigationBar, etc.)
- `src/templates/` — page-level layouts (FormTemplate, ListTemplate, etc.)
- `src/tokens/generated/` — auto-generated from Figma (DO NOT EDIT)
- `src/tokens/custom/` — hand-written tokens (animation, etc.)
- `.ondevice/` — Storybook React Native config

## Secrets Management

- **Doppler project**: `ui` with environments `develop` / `stage` / `master`
- **Local**: `doppler run --project ui --config master -- <command>`
- **CI**: `DOPPLER_TOKEN` GitHub secret → `dopplerhq/cli-action@v3` → `doppler run --`
- **EAS environments**: `develop` / `stage` / `master` (set via `APP_ENV` in eas.json profiles)

## Conventions

- Components use Tamagui `styled()` internally, expose MD3 API externally
- All visual values come from tokens — no hardcoded colors, spacing, or sizes
- Stories in `stories/` subfolder with `.story.tsx` extension
- Token pipeline: Figma Variables → `tokens:sync` → `tokens/generated/*.ts`

## Token Pipeline

Figma Variables (tokens file `81sGJB0y1lYCDY5oB35aBA`) are the source of truth for design tokens. The pipeline fetches variables via the Figma REST API and generates TypeScript files.

```bash
npm run tokens:sync             # fetch from Figma + build TypeScript (requires FIGMA_ACCESS_TOKEN)
npm run tokens:fetch            # fetch only → src/tokens/.figma-raw/*.json
npm run tokens:build            # build only → src/tokens/generated/*.ts
```

- **Fetch** (`scripts/tokens-fetch.ts`): Calls `GET /v1/files/:key/variables/local`, outputs per-collection JSON to `src/tokens/.figma-raw/` (gitignored)
- **Build** (`scripts/tokens-build.ts`): Reads `.figma-raw/` JSON, generates TypeScript matching the `as const` + type alias pattern
- **FIGMA_ACCESS_TOKEN**: Stored in Doppler (`ui` project, `master` config). Run locally via `doppler run --project ui --config master -- npm run tokens:sync`
- Generated files: `colors.ts`, `spacing.ts`, `typography.ts`, `radii.ts`, `elevation.ts` — DO NOT EDIT manually
