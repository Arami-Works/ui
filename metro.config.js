const { getDefaultConfig } = require("expo/metro-config");
const { generate } = require("@storybook/react-native/scripts/generate");

// Auto-generate storybook.requires.ts on metro start
generate({
  configPath: "./.ondevice",
  useJs: false,
});

const config = getDefaultConfig(__dirname);

config.transformer = {
  ...config.transformer,
  unstable_allowRequireContext: true,
};

config.resolver = {
  ...config.resolver,
  sourceExts: [...(config.resolver?.sourceExts ?? []), "mjs"],
};

module.exports = config;
