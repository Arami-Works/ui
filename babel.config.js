module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "@tamagui/babel-plugin",
        {
          components: ["tamagui"],
          disableExtraction: true,
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
