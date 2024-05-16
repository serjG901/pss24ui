import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  base: "/pss24ui/",
});