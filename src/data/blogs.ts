// ─────────────────────────────────────────────────────────────────────────
// Blog data now lives as individual files in ./blog-posts (one file per
// post, named after its `key`), so each article is easy to find and edit
// on its own. This file just re-exports everything from there, so any
// existing `import { blogs, getBlogByKey } from "@/data/blogs"` keeps
// working exactly as before — no other files need to change.
//
// To add/edit a post, go to `src/data/blog-posts/`.
// ─────────────────────────────────────────────────────────────────────────

export * from "./blog-posts";
