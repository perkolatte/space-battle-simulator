# Space Battle Simulator

A small, retro-styled React + Vite demo that simulates a terse, contemplative dogfight between two piloted vessels. The UI and narrative lean into a transhumanist, Citizen-Sleeper–adjacent atmosphere: quiet, a little weary, and attentive to what the machine does to people.

![Simulator screenshot](screenshot.png)

## Overview

- Single-page app built with React and Vite.
- Simple combat mechanics: each round both sides may hit or miss; damage is calculated with hit probabilities that depend on ship health.
- Narrative-driven status messages: varied, non-repeating lines that react to health thresholds and tide-turning events.
- Lightweight UI: attack readout, ship panels, and a fixed-size game-message pane for status text.
- No backend — state is kept in-memory (use `Restart` to reset the demo).

## Quick start

1. Install dependencies:
   ```bash
   npm ci
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:5173 in your browser.

## Build

Build the production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
# or: npx serve dist
```

## Deployment (GitHub Pages)

This repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds the site with Vite and publishes the `dist/` directory to the `gh-pages` branch.

Notes:

- The workflow is configured to run on pushes to `main` and uses `peaceiris/actions-gh-pages` to publish the site.
- If you host under a repository subpath (username.github.io/repo-name), set `base` in `vite.config.js`, for example:

```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/space-battle-simulator/' // adjust to your repo name
});
```

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — build production files into `dist/`
- `npm run preview` — serve the production build locally

## Inspiration & Credits

The project draws atmosphere and tone from contemplative, transhumanist RPGs and space-opera narratives. It is an original demo for learning and UI experimentation and is not affiliated with any commercial franchise.

## License

This repository is provided as a learning demo. Copyright and licensing are up to you — add a LICENSE file if you plan to open-source it.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
