// ─────────────────────────────────────────────────────────────────────────
// Shared blog types.
// Each individual post lives in its own file in this folder
// (post-1-*.ts, post-2-*.ts, ...) and imports these types.
// ─────────────────────────────────────────────────────────────────────────

export type BlogSection =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | {
      type: "checklist";
      heading?: string;
      intro?: string;
      items: { title: string; desc: string }[];
    }
  | { type: "bulletList"; heading?: string; items: string[] };

export interface BlogPost {
  key: string; // used in the URL: /blog/:key
  title: string;
  author: string;
  date: string; // ISO date, e.g. "2026-08-20"
  readTime: string; // e.g. "6 min read"
  category: string;
  targetKeyword: string;
  metaTitle: string;
  metaDescription: string;
  tldr: string;
  sections: BlogSection[];
}
