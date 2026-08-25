import Layout from "@/components/Layout";
import { FadeIn, StaggerContainer } from "@/components/Animations";
import { Helmet } from "react-helmet-async";
import { industries } from "@/data/industries";

const industryImages: Record<string, string> = {
  automotive: "/industries/Automotive.png",
  "engine-oil-cooling": "/industries/Engine Oil Cooling.png",
  "oil-gas-equipment": "/industries/Oil & Gas Equipment.png",
  "commercial-vehicles": "/industries/Commercial Vehicles.png",
  "agricultural-equipment": "/industries/Agricultural Equipment.png",
  "construction-equipment": "/industries/Construction Equipment.png",
  "medical-components": "/industries/Medical Components.png",
  aerospace: "/industries/Aerospace.png",
  "electrical-power": "/industries/Electrical Power.png",
  "consumer-appliance": "/industries/Consumer Appliance.png",
  "electrical-cabinets": "/industries/Electrical Cabinets.png",
  "pumps-compressors": "/industries/Pumps & Compressors.png",
  "industrial-racks": "/industries/Industrial Racks.png",
  "hardware-fasteners": "/industries/Hardware & Fasteners.png",
  "lawn-garden": "/industries/Lawn & Garden.png",
  "packaging-equipment": "/industries/Packaging Equipment.png",
};

const Industries = () => {
  return (
    <Layout>
<Helmet>
  <title>Industries Served | WLVTEC</title>

  <meta
    name="description"
    content="WLVTEC serves automotive, industrial, and engineering sectors with precision manufacturing solutions."
  />

  <link
    rel="canonical"
    href="https://wlvtec.com/industries"
  />

  <script type="application/ld+json">{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://wlvtec.com/" },
    { "@type": "ListItem", "position": 2, "name": "Industries", "item": "https://wlvtec.com/industries" }
  ]
})}</script>
</Helmet>
      {/* ━━ HERO: Stripe background with offset heading ━━ */}
      <section className="section-stripe section-breath border-b hairline">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="numbered-label mb-6">
              <span className="num">01</span> Sectors
            </div>
            <h1 className="heading-display mb-4">Industries We Serve</h1>
            <div className="divider-gold mb-6" />
            <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
              Precision tube bending components for diverse industrial applications worldwide.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ━━ GRID: Dark section with bordered cards ━━ */}
      <section className="section-dark section-breath">
        <div className="max-w-7xl mx-auto px-6">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((ind) => (
              <FadeIn key={ind.key}>
                <div
                  className="overflow-hidden rounded-2xl border border-secondary-foreground/10 flex flex-col text-center hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 group shadow-none"
                >
                  <img
                    src={industryImages[ind.key]}
                    alt={ind.name}
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <span className="p-6 font-semibold text-sm text-white">
                    {ind.name}
                  </span>
                </div>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </Layout>
  );
};

export default Industries;
