import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Must come BEFORE the "react-native" alias — Vite matches aliases in order
      // and the general alias would prefix-match this path first otherwise.
      "react-native/Libraries/Utilities/codegenNativeComponent": resolve(
        __dirname,
        "src/mocks/react-native-codegenNativeComponent.ts",
      ),
      "react-native": "react-native-web",
    },
    extensions: [".web.tsx", ".web.ts", ".web.js", ".tsx", ".ts", ".js"],
  },
  define: {
    "process.env": {},
  },
});
