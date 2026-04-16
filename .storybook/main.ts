// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import { join, dirname } from "path";
import "../src/storybook-sort.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ["../src/**/*.story.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-designs",
    "@storybook/addon-docs",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    reactDocgen: false,
  },
  viteFinal: async (viteConfig) => {
    viteConfig.resolve = viteConfig.resolve || {};
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      // Specific alias must come before the general "react-native" alias,
      // otherwise Vite matches "react-native" first and rewrites the path
      // to react-native-web/... which doesn't have this shim.
      "react-native/Libraries/Renderer/shims/ReactFabric": join(
        __dirname,
        "../src/mocks/react-native-ReactFabric.ts",
      ),
      "react-native": "react-native-web",
      "@expo/vector-icons/MaterialIcons": join(
        __dirname,
        "../src/mocks/expo-vector-icons.tsx",
      ),
      "@": join(__dirname, "../src"),
    };
    viteConfig.optimizeDeps = {
      ...(viteConfig.optimizeDeps || {}),
      exclude: [
        ...((viteConfig.optimizeDeps || {}).exclude || []),
        "react-native-reanimated",
      ],
    };
    viteConfig.define = {
      ...(viteConfig.define || {}),
      __DEV__: JSON.stringify(false),
    };
    return viteConfig;
  },
};

export default config;
