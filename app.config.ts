import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "@cheunjm/ui",
  slug: "cheunjm-ui",
  version: "0.0.1",
  orientation: "portrait",
  userInterfaceStyle: "automatic",
  platforms: ["ios", "android", "web"],
  web: {
    bundler: "metro",
  },
});
