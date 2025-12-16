import path from "node:path";

import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import electron from "vite-plugin-electron/simple";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isElectron = process.env.ELECTRON_DISABLE !== "true";

  const basePlugins = [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    tailwindcss(),
    svgr(),
    react(),
    tsconfigPaths(),
  ];

  // Electron 모드일 때만 electron 플러그인 추가
  const plugins = isElectron
    ? [
        ...basePlugins,
        electron({
          main: {
            // Shortcut of `build.lib.entry`.
            entry: "electron/main.ts",
          },
          preload: {
            // Shortcut of `build.rollupOptions.input`.
            // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
            input: path.join(__dirname, "electron/preload.ts"),
          },
          // Ployfill the Electron and Node.js API for Renderer process.
          // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
          // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
          renderer:
            process.env.NODE_ENV === "test"
              ? // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
                undefined
              : {},
        }),
      ]
    : basePlugins;

  return {
    base: isElectron ? "./" : "/",
    plugins,
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL || "",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          secure: true,
        },
      },
    },
  };
});
