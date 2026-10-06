import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Route data is imported straight from the app's own data files so the
// prerender list can never drift out of sync with the site. Adding a new
// blog post, service or industry automatically adds its prerendered page.
import { blogs } from "./src/data/blog-posts";
import { services } from "./src/data/services";
import { industries } from "./src/data/industries";

// Static routes that aren't driven by a data file.
const staticRoutes = [
  "/",
  "/about",
  "/services",
  "/industries",
  "/blogs",
  "/contact",
  "/privacy-policy",
  "/automotive-component-manufacturers",
  "/auto-parts-manufacturers-india",
];

// Detail routes. Without these, crawlers that don't execute JavaScript fall
// back to the generic <meta name="description"> in index.html, which reads as
// a missing or duplicated description across every detail page.
const blogRoutes = blogs.map((post) => `/blogs/${post.key}`);
const serviceRoutes = services.map((service) => `/services/${service.key}`);
const industryRoutes = industries.map((industry) => `/industries/${industry.key}`);

const prerenderRoutes = [
  ...staticRoutes,
  ...blogRoutes,
  ...serviceRoutes,
  ...industryRoutes,
];

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => ({
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
              routes: prerenderRoutes,
              renderer: new (await import("@prerenderer/renderer-puppeteer")).default({
                // Prerendering ~40 routes instead of 9, so give Puppeteer a
                // couple of parallel tabs to keep build times reasonable.
                maxConcurrentRoutes: 4,
                renderAfterTime: 500,
              }),
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