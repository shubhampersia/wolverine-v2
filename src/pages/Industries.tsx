import Layout from "@/components/Layout";
import { FadeIn, StaggerContainer } from "@/components/Animations";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { industries } from "@/data/industries";

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
                <Link
                  to={`/industries/${ind.key}`}
className="rounded-2xl border border-secondary-foreground/10 p-6 flex flex-col items-center text-center gap-4 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 group shadow-none"                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <ind.icon size={28} className="text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="font-semibold text-sm text-white">{ind.name}</span>
                </Link>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </Layout>
  );
};

export default Industries;
