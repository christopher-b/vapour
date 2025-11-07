# A Ghost CMS theme boilerplate with Vite + TailwindCSS

This theme is intended as a starting point for Ghost themes powered by Vite and TailwindCSS, and any other modern JS goodness you want to bring. The visual design is intentionally bare bones, but it is intended to be fully-featured out of the box.

This theme is based on the [Ghost Starter theme](https://github.com/TryGhost/Starter), with inspiration from [biswajit-saha/vite-ghost-theme](https://github.com/biswajit-saha/vite-ghost-theme).

## Theme Features

There are a few problems we need to solve when using Vite with Ghost:

- Ghost and Vite both provide their development servers, but we point our browser at the Ghost server in development. This means we need to load the [Vite client](https://vite.dev/guide/backend-integration.html) and JS entrypoint in development, but we load built assets in production. We solve this by introducing a `development_mode` [custom setting](https://docs.ghost.org/themes/custom-settings). We turn it on in our development environment and leave defaulted to off in production.
- We want to include built assets bundle in our production deployments, which means we can't hard-code built asset filenames in our templates. We solve this with a [custom Vite plugin](lib/vite/ghost-manifest-partials.js) that reads the Vite [asset manifest](https://vite.dev/config/build-options.html#build-manifest) and outputs dynamically-generated Handlbars templates that include the assets listed in the manifest. We can include these templates in our layouts, using the `development_mode` setting to ensure they're only loaded in production.

This setup provides hot module replacement and automatic reloads (even on changes to your Handlebars files)

A note about cache busting: Ghost handles assert version automatically using the `{{asset}}` helper, so we don't _need_ to use Vite's fingerprinted filenames; we could just output static assets and skip the whole manifest-scanning-partial-generation thing. But I like the flexibility it grants: we can load whatever Vite outputs without modifying our templates manually.

### TailwindCSS

TailwindCSS is supported out of the box. Sample Tailwind theme tokens are inluded in [`assets/css/tailwind.css`](assets/css/tailwind.css). Support for font-families from [modernfontstacks.com](https://modernfontstacks.com) is included, as are font overrides in the Ghost Theme UI (see `assets/css/fonts.css`).

[Tailwind Typography](https://github.com/tailwindlabs/tailwindcss-typography) is configured, which includes customizable styles for CMS content via the `prose` utilities.

### PrismJS

Code blocks get automatic syntax highlights via [PrismJS](https://prismjs.com/). Only Javacript support is enaled by default; other languages can be added in the Prism plugin config in vite.config.js. You can also include one of the bundled themes, or pull in additional themes from [prismjs/prism-themes](https://github.com/prismjs/prism-themes)

### GitHub Deploy Actions

[GH Deploy Action](.github/workflows/deploy-theme.yml) included by default. [Learn more how to deploy your theme automatically](https://github.com/TryGhost/action-deploy-theme)

## How to Use This Theme

### Start development mode

From the theme folder, start development mode:

```bash
yarn dev
```

Open the Ghost admin dashboard on your development server. Open settings and navigate to Design & Branding > Customize > Theme, and enable the "Development mode" setting.

Changes you make to your styles, scripts, and Handlebars files will show up automatically in the browser. CSS and Javascript will be compiled and output to the `built` folder.

Press `ctrl + c` in the terminal to exit development mode.

### Build, zip, and test your theme

Compile your CSS and JavaScript assets for production with the following command:

```bash
yarn build
```

Create a zip archive:

```bash
yarn zip
```

Use `gscan` to test your theme for compatibility with Ghost:

```bash
yarn test
```

## Copyright & License

Copyright (c) 2013-2025 - Released under the [MIT license](LICENSE).
