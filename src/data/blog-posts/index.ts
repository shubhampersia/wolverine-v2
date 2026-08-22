// ─────────────────────────────────────────────────────────────────────────
// Blog data — barrel file.
//
// Each post now lives in its own file in this folder, named after its
// `key` (e.g. `evaluate-automotive-parts-suppliers-checklist.ts`). This
// keeps individual posts short and easy to edit without scrolling through
// one giant file.
//
// To add a new post:
//   1. Create a new file here, e.g. `my-new-post.ts`, copying the shape
//      of an existing post file (import BlogPost, `const post = {...}`,
//      `export default post`).
//   2. Import it below and add it to the `blogs` array in the order you
//      want it to appear.
//
// Everything that previously imported from "@/data/blogs" (the `blogs`
// array, `getBlogByKey`, and the `BlogPost` / `BlogSection` types)
// continues to work unchanged — only the internal file layout changed.
// ─────────────────────────────────────────────────────────────────────────

import evaluateAutomotivePartsSuppliersChecklist from "./evaluate-automotive-parts-suppliers-checklist";
import tier1VsTier2AutomotivePartsSuppliers from "./tier1-vs-tier2-automotive-parts-suppliers";
import automotivePartsSupplierCertificationsIatf16949 from "./automotive-parts-supplier-certifications-iatf-16949";
import redFlagsShortlistingAutomotivePartsSuppliers from "./red-flags-shortlisting-automotive-parts-suppliers";
import automotiveComponentManufacturersDrawingToDispatch from "./automotive-component-manufacturers-drawing-to-dispatch";
import inHouseToolAndDieAutomotiveComponentManufacturers from "./in-house-tool-and-die-automotive-component-manufacturers";
import zeroDefectQualityControlAutomotiveComponentManufacturers from "./zero-defect-quality-control-automotive-component-manufacturers";
import localisationIndiaAutomotiveComponentManufacturers from "./localisation-india-automotive-component-manufacturers";

import type { BlogPost, BlogSection } from "./types";

export type { BlogPost, BlogSection };

export const blogs: BlogPost[] = [
  evaluateAutomotivePartsSuppliersChecklist,
  tier1VsTier2AutomotivePartsSuppliers,
  automotivePartsSupplierCertificationsIatf16949,
  redFlagsShortlistingAutomotivePartsSuppliers,
  automotiveComponentManufacturersDrawingToDispatch,
  inHouseToolAndDieAutomotiveComponentManufacturers,
  zeroDefectQualityControlAutomotiveComponentManufacturers,
  localisationIndiaAutomotiveComponentManufacturers,
];

export const getBlogByKey = (key: string) => blogs.find((b) => b.key === key);
