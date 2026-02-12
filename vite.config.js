import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // If deploying to GitHub Pages under a path like
  // https://<user>.github.io/space-battle-simulator/
  // set the base to '/space-battle-simulator/' so asset URLs resolve correctly.
  base: "/space-battle-simulator/",
});
