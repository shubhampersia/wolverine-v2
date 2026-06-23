import Layout from "@/components/Layout";
import { FadeIn, StaggerContainer } from "@/components/Animations";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import heroImg from "@/assets/hero-factory.jpg";
import aboutImg from "@/assets/about-facility.jpg";

const clients = [
  "/logos/1.png",
  "/logos/2.png",
  "/logos/3.png",
  "/logos/4.png",
  "/logos/5.png",
  "/logos/6.png",
  "/logos/7.png",
  "/logos/8.png",
  "/logos/9.png",
  "/logos/10.png"
];

const capabilities = [
  "5 Axis Tube Bending",
  "Bead Forming",
  "End Forming",
  "Precision Cutting",
  "Assembly",
  "Stamping",
  "Ultrasonic Cleaning",
  "Brazing & Welding",
  "Surface Treatment",
];

// Inline keyframes injected once at module level — no styled-jsx needed
const marqueeStyles = `
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    animation: marquee 25s linear infinite;
  }
`;

const Index = () => {
  return (
    <Layout>
  <Helmet>
    <title>
      Tube Bending & Engineered Tubular Assembly Manufacturer | WLVTEC
    </title>

    <meta
      name="description"
      content="WLVTEC provides precision tube bending and engineered tubular assembly solutions."
    />

    <link
      rel="canonical"
      href="https://wlvtec.com/"
    />

    <script type="application/ld+json">{JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "WLVTEC",
      "url": "https://wlvtec.com",
      "logo": "https://wlvtec.com/favicon.ico",
      "contactPoint": { "@type": "ContactPoint", "contactType": "sales" }
    },
    {
      "@type": "WebSite",
      "url": "https://wlvtec.com",
      "name": "WLVTEC"
    }
  ]
})}</script>
  </Helmet>
      {/* Inject marquee keyframes globally */}
      <style>{marqueeStyles}</style>

      {/* ━━ HERO: Full-bleed image with dark overlay ━━ */}
<section className="relative h-[85vh] min-h-[700px] flex items-center overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="/banner.png"
      alt="Wolverine manufacturing facility"
      className="w-full h-full object-cover object-center"
    />

    {/* Dark overlay for readability */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
  </div>

  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
    <div className="max-w-4xl text-center lg:text-left">
      <FadeIn>
        <div className="numbered-label text-white/60 mb-6 justify-center lg:justify-start">
          <span className="num">01</span> Precision Manufacturing
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h1 className="heading-display text-white leading-tight">
          Tube Bending &amp;
          <br />
          Engineered Tubular
          <br />
          Assembly Manufacturer
        </h1>

        <p className="text-white/70 text-xl mt-4">
          Designed. Manufactured. Delivered.
        </p>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p className="mt-6 text-white/85 max-w-2xl text-lg leading-relaxed mx-auto lg:mx-0">
          A Legacy of Quality and Innovation in Tube Bending &amp;
          Industrial Manufacturing.
        </p>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="flex justify-center lg:justify-start">
          <Link to="/contact" className="btn-primary mt-8 inline-flex">
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </FadeIn>
    </div>
  </div>
</section>

      {/* ━━ CLIENTS: Marquee band ━━ */}
      <section className="bg-white py-[80px] w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-10">
            <h2 className="heading-section">Our Clients</h2>
            <div className="divider-gold mx-auto mt-3" />
          </div>
        </div>

        {/*
          FIX 2 — Clients marquee on mobile
          • Moved the scrolling track OUTSIDE the padded container so it
            truly spans edge-to-edge (padding on the parent was clipping it).
          • Replaced <style jsx> (requires styled-jsx) with the module-level
            <style> tag injected above.
          • The duplicate set of logos ensures seamless looping when the
            first set scrolls fully off-screen.
        */}
        <div className="w-full overflow-hidden">
          <div className="flex whitespace-nowrap items-center w-max animate-marquee">
            {/* First copy */}
            {clients.map((logo, idx) => (
              <div
                key={`logo1-${idx}`}
                className="shrink-0 flex items-center justify-center mx-12"
              >
                <img
                  src={logo}
                  alt={`Client ${idx + 1}`}
                  className="h-12 md:h-14 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}

            {/* Duplicate for seamless loop */}
            {clients.map((logo, idx) => (
              <div
                key={`logo2-${idx}`}
                className="shrink-0 flex items-center justify-center mx-12"
                aria-hidden="true"
              >
                <img
                  src={logo}
                  alt=""
                  className="h-12 md:h-14 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ ABOUT: Clean white with bordered image ━━ */}
      <section className="section-breath">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="col-span-12 lg:col-span-5">
              <FadeIn>
                <div className="numbered-label mb-6">
                  <span className="num">02</span> About Company
                </div>
                <h2 className="heading-section mb-6">
                  Precision Perfected, Every Step of the Way
                </h2>
                <div className="divider-gold mb-6" />
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Wolverine Chennai operates as a dedicated Tube Bending plant
                  within the manufacturing network. The facility supports
                  industrial manufacturing requirements by producing components
                  through controlled forming processes.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Production activities are carried out based on
                  customer-provided engineering documentation. Material
                  identification, forming, Tube Bending &amp; Brazing, Assembly
                  alterations, and inspection are performed in accordance with
                  defined procedures.
                </p>
                <Link to="/about" className="btn-ghost">
                  Learn More <ArrowRight size={16} />
                </Link>
              </FadeIn>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <FadeIn delay={0.15}>
                <div className="relative">
                  <img
                    src="/precision.jpeg"
                    alt="Tube bending process"
                    className="w-full rounded-2xl object-cover aspect-[4/3] relative z-10"
                  />
                  <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-primary/30 z-0" />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ SERVICES: Dark inverted section ━━ */}
      <section className="section-dark section-breath">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-12 gap-8 lg:gap-16">
            <div className="col-span-12 lg:col-span-6">
              <FadeIn>
                <div className="numbered-label mb-6">
                  <span className="num">03</span> Solutions
                </div>
                <h2 className="heading-section mb-6">
                  Tube Bending &amp; Assembly
                </h2>
                <div className="divider-gold mb-6" />
                <p className="text-muted-foreground leading-relaxed mb-8">
                  The Chennai plant provides Tube Bending &amp; Brazing, and
                  Assembly services for industrial applications.
                  Operations are performed to meet specified geometries and
                  tolerance requirements.
                </p>
                <Link to="/services" className="btn-primary">
                  Learn More <ArrowRight size={16} />
                </Link>
              </FadeIn>
            </div>
            <div className="col-span-12 lg:col-span-6 flex items-center">
              <FadeIn delay={0.1}>
                <div className="relative w-full rounded-2xl overflow-hidden aspect-[4/3]">
                  <img
                    src="/tube.jpg"
                    alt="Tube bending process"
                    className="w-full h-full object-cover"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ CAPABILITIES: Striped background with bordered cards ━━ */}
      <section className="section-stripe section-breath">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-12 gap-8 lg:gap-16">
            <div className="col-span-12 lg:col-span-4">
              <FadeIn>
                <div className="numbered-label mb-6">
                  <span className="num">04</span> What We Do
                </div>
                <h2 className="heading-section">
                  Our <span className="text-primary">Capabilities</span>
                </h2>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  Focused solely on tube bending operations, with production
                  executed to ensure repeatability and compliance.
                </p>
              </FadeIn>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {capabilities.map((cap) => (
                  <FadeIn key={cap}>
                    <div className="card-bordered bg-background/80 backdrop-blur-sm flex items-start gap-3 !p-5">
                      <CheckCircle2
                        size={18}
                        className="text-primary shrink-0 mt-0.5"
                      />
                      <span className="text-sm font-medium text-foreground">
                        {cap}
                      </span>
                    </div>
                  </FadeIn>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ SERVICE CARDS: White section, dark cards ━━ */}
      <section className="section-breath pt-6 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <h2 className="heading-section mb-12">Our Services</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Inventory Management",
                desc: "ISO-certified warehouses provide Safety Stock Maintenance, FIFO control, batch traceability, and customer-defined release protocols.",
              },
              {
                title: "Global Operations",
                desc: "Supply management networks across India, China, Vietnam, Indonesia and South Korea support supplier qualification, audits, production tracking, and logistics.",
              },
            ].map((service, i) => (
              <FadeIn key={service.title} delay={i * 0.1}>
                <div className="card-dark h-full">
                  <h3 className="font-bold text-xl mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {service.desc}
                  </p>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all"
                  >
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
