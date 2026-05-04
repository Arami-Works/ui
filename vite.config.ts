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
  // esbuild's optimizeDeps pass doesn't inherit resolve.extensions, so the
  // `.web.js` variants in packages like react-native-safe-area-context get
  // missed and the native specs are bundled instead. Mirror the extension
  // priority here so dev pre-bundling picks the web implementations.
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: [
        ".web.tsx",
        ".web.ts",
        ".web.js",
        ".tsx",
        ".ts",
        ".js",
      ],
    },
  },
  define: {
    "process.env": {},
  },
});
