import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => ({   // ADD async HERE
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  build: {
    rollupOptions: {
      plugins: mode === "production"
        ? [
            (await import("@prerenderer/rollup-plugin")).default({
              routes: ["/", "/about", "/services", "/industries", "/blog", "/contact"],
              renderer: new (await import("@prerenderer/renderer-puppeteer")).default(),
            }),
          ]
        : [],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));