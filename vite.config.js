import { defineConfig } from "vite";
import prism from "vite-plugin-prismjs";
import tailwindcss from "@tailwindcss/vite";
import ghostManifestPartials from "./lib/vite/ghost-manifest-partials.js";
import ViteRestart from "vite-plugin-restart";

export default defineConfig({
  base: "./",
  publicDir: false,
  manifest: true,
  css: {
    devSourcemap: true,
  },
  build: {
    outDir: "assets/built",
    assetsDir: ".", // Don't write to assets/built/assets/*; it triggers a gscan warning
    emptyOutDir: true,
    manifest: "manifest.json", // Output a manifest so we can include static references to built assets
    rollupOptions: {
      input: "assets/js/index.js",
    },
  },
  plugins: [
    ViteRestart({
      reload: ["**/*.hbs"],
    }),
    ghostManifestPartials(
      "assets/built/manifest.json",
      "partials/vite_assets/head.hbs",
      "partials/vite_assets/foot.hbs",
    ),
    tailwindcss(),
    prism({
      languages: ["javascript"],
      // theme: "twilight", // Use a custom theme by including the CSS file and referencing in from index.css
      plugins: ["line-numbers"],
      css: true,
    }),
  ],
});
