import Layout from "@/components/Layout";
import { FadeIn, StaggerContainer } from "@/components/Animations";
import { ArrowRight } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { industries, industryContent, type IndustryKey } from "@/data/industries";

const IndustryDetail = () => {
  const { industryKey } = useParams();
  if (!industryKey || !Object.prototype.hasOwnProperty.call(industryContent, industryKey)) {
    return <Navigate to="/industries" replace />;
  }

  const data = industryContent[industryKey as IndustryKey];

  return (
    <Layout>
      <Helmet>
        <title>{data.name} | WLVTEC</title>
        <meta
          name="description"
          content={data.description}
        />
        <link rel="canonical" href={`https://wlvtec.com/industries/${data.key}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://wlvtec.com/" },
            { "@type": "ListItem", "position": 2, "name": "Industries", "item": "https://wlvtec.com/industries" },
            { "@type": "ListItem", "position": 3, "name": data.name, "item": `https://wlvtec.com/industries/${data.key}` },
          ],
        })}</script>
      </Helmet>

      <section className="section-breath">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="numbered-label mb-6">
              <span className="num">01</span> Industry Focus
            </div>
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary/10 mb-6">
                  <data.icon size={28} className="text-primary" />
                </div>
                <h1 className="heading-display mb-6">{data.name}</h1>
                <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                  {data.description}
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <Link to="/industries" className="text-sm font-medium text-primary hover:text-primary/80">
                    ← Back to industries
                  </Link>
                  <Link
                    to="/contact"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    Start a Project <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-secondary-foreground/10 bg-background/70 p-8">
                <h2 className="font-semibold text-lg mb-4">Key Applications</h2>
                <ul className="space-y-4 text-muted-foreground list-disc list-inside">
                  {data.details.map((detail) => (
                    <li key={detail} className="leading-relaxed">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          <div className="mt-16">
            <FadeIn>
              <h2 className="heading-section mb-8">Explore Other Industries</h2>
            </FadeIn>
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {industries.map((industry) => (
                <FadeIn key={industry.key}>
                  <Link
                    to={`/industries/${industry.key}`}
                    className={`rounded-2xl border p-5 transition hover:border-primary/40 ${
                      industry.key === data.key ? "border-primary/30 bg-primary/10" : "border-secondary-foreground/10 bg-background"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <industry.icon size={22} className="text-primary" />
                      <span className="font-semibold">{industry.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {industry.description}
                    </p>
                  </Link>
                </FadeIn>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IndustryDetail;
