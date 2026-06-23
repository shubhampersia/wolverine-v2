import Layout from "@/components/Layout";
import { FadeIn, StaggerContainer } from "@/components/Animations";
import { ArrowRight } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { services, serviceContent, type ServiceKey } from "@/data/services";

const ServiceDetail = () => {
  const { serviceKey } = useParams();
  if (!serviceKey || !Object.prototype.hasOwnProperty.call(serviceContent, serviceKey)) {
    return <Navigate to="/services" replace />;
  }

  const data = serviceContent[serviceKey as ServiceKey];

  return (
    <Layout>
      <Helmet>
        <title>{data.title} | WLVTEC</title>
        <meta
          name="description"
          content={data.description}
        />
        <link rel="canonical" href={`https://wlvtec.com/services/${data.key}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": data.title,
          "provider": { "@type": "Organization", "name": "WLVTEC" },
          "serviceType": data.title,
        })}</script>
      </Helmet>

      <section className="section-breath">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="numbered-label mb-6">
              <span className="num">01</span> Service Detail
            </div>
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div>
                <h1 className="heading-display mb-6">{data.title}</h1>
                <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                  {data.description}
                </p>
                <div className="flex flex-wrap gap-3 items-center">
                  <Link to="/services" className="text-sm font-medium text-primary hover:text-primary/80">
                    ← Back to all services
                  </Link>
                  <Link
                    to="/contact"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    Request a Quote <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden shadow-lg bg-muted">
                <img
                  src={data.image}
                  alt={data.title}
                  className="w-full h-[420px] object-cover"
                />
              </div>
            </div>
          </FadeIn>

          <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_320px] items-start">
            <FadeIn>
              <div>
                <h2 className="heading-section mb-6">What We Deliver</h2>
                <ul className="space-y-4 text-muted-foreground list-disc list-inside">
                  {data.details.map((detail) => (
                    <li key={detail} className="leading-relaxed">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="rounded-3xl border border-secondary-foreground/10 p-6 bg-background/70">
                <h3 className="font-semibold mb-4">Other Services</h3>
                <div className="space-y-3">
                  {services.map((service) => (
                    <Link
                      key={service.key}
                      to={`/services/${service.key}`}
                      className={`block rounded-2xl p-4 transition border ${
                        service.key === data.key
                          ? "border-primary/30 bg-primary/10 text-primary"
                          : "border-secondary-foreground/10 bg-background hover:border-primary/40"
                      }`}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceDetail;
