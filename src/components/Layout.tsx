import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Site-wide WebSite + Organization structured data (JSON-LD).
// Rendered on every page via Layout so it doesn't need to be duplicated
// per-route. Page-specific WebPage schema is added on the individual
// page (see src/pages/Index.tsx for the homepage WebPage schema).
const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.wlvtec.com/#website",
      "url": "https://www.wlvtec.com/",
      "name": "Wolverine",
      "publisher": { "@id": "https://www.wlvtec.com/#organization" },
    },
    {
      "@type": "Organization",
      "@id": "https://www.wlvtec.com/#organization",
      "name": "Wolverine",
      "url": "https://www.wlvtec.com/",
      "logo": "https://www.wlvtec.com/assets/wolverine-logo-D3-7EV5-.png",
      "description":
        "Wolverine Chennai operates as a dedicated Tube Bending plant, providing tube bending, brazing, and assembly services for industrial manufacturing.",
      "email": "ed@wtube.co",
      "telephone": "+91-9986094599",
      "address": {
        "@type": "PostalAddress",
        "streetAddress":
          "A-36/2, Oragadam, 5th Cross Road, SIPCOT Industrial Park, Sriperumbudur",
        "addressLocality": "Kancheepuram",
        "addressRegion": "Tamil Nadu",
        "postalCode": "602105",
        "addressCountry": "IN",
      },
      "sameAs": ["https://twitter.com/Wolverine"],
    },
  ],
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(siteSchema)}
        </script>
      </Helmet>
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
