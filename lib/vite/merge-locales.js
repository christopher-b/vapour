// See https://github.com/TryGhost/Themes/tree/main/packages/theme-translations
// This is a shim to make the Gulp task work in our Vite environment

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { mergeLocales } = require("@tryghost/theme-translations/build");

function runMergeLocales() {
  const task = mergeLocales();
  task(() => {});
}

export default function mergeLocalesPlugin() {
  return {
    name: "merge-locales",
    buildStart() {
      runMergeLocales();
    },
    handleHotUpdate({ file }) {
      if (file.includes("locales-local")) {
        runMergeLocales();
        this.warn(
          "Note: You will need to restart Ghost to see translation updates",
        );
      }
    },
  };
}
