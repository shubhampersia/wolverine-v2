import Layout from "@/components/Layout";
import { FadeIn } from "@/components/Animations";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import FaqSection, { type Faq } from "@/components/FaqSection";

const capabilities = [
  "CNC tube bending and forming",
  "End forming and bead forming",
  "Precision cutting and fabrication",
  "Brazing and welding",
  "Mechanical assembly",
  "Surface treatment and finishing",
  "Ultrasonic cleaning",
  "Inventory and supply chain support",
];

const faqs: Faq[] = [
  {
    question: "What products does Wolverine manufacture?",
    answer:
      "Wolverine manufactures precision tubular and fabricated components for automotive applications.",
  },
  {
    question: "Which industries does Wolverine serve?",
    answer: "Wolverine primarily supports OEMs, Tier-1 suppliers, and industrial manufacturers.",
  },
  {
    question: "What manufacturing capabilities does Wolverine offer?",
    answer:
      "Capabilities include CNC tube bending, forming, welding, assembly, finishing, and ultrasonic cleaning.",
  },
  {
    question: "How does Wolverine maintain quality standards?",
    answer: "Wolverine uses robust quality systems, process controls, and complete product traceability.",
  },
  {
    question: "Can Wolverine support large production programs?",
    answer:
      "Yes. Wolverine supports both high-volume production and specialized manufacturing requirements.",
  },
];

const AutomotiveComponentManufacturers = () => {
  return (
    <Layout>
      <Helmet>
        <title>Automotive Component Manufacturers | Wolverine</title>
        <meta
          name="description"
          content="Wolverine manufactures precision-engineered tubular and fabricated components for OEMs, Tier-1 suppliers, and industrial manufacturers worldwide."
        />
        <link
          rel="canonical"
          href="https://www.wlvtec.com/automotive-component-manufacturers"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.wlvtec.com/" },
              {
                "@type": "ListItem",
                position: 2,
                name: "Automotive Component Manufacturers",
                item: "https://www.wlvtec.com/automotive-component-manufacturers",
              },
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          })}
        </script>
      </Helmet>

      {/* ━━ HERO ━━ */}
      <section className="section-dark section-breath relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--secondary-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--secondary-foreground)) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative">
          <FadeIn>
            <div className="numbered-label mb-6">
              <span className="num">01</span> Precision Manufacturing
            </div>
            <h1 className="heading-display mb-6 max-w-3xl">
              Precision Manufacturing. Built for Performance.
            </h1>
            <div className="divider-gold mb-8" />
            <p className="text-secondary-foreground/60 max-w-2xl text-lg leading-relaxed mb-8">
              Wolverine manufactures precision-engineered tubular and fabricated components for
              OEMs, Tier-1 suppliers, and industrial manufacturers worldwide. As part of the MMI
              Group, we bring together engineering expertise, advanced manufacturing capabilities,
              and disciplined quality systems to deliver components that meet the highest
              standards of performance, reliability, and consistency.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Request a Quote <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ━━ INTRO ━━ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <p className="text-muted-foreground leading-relaxed text-lg">
              With decades of manufacturing experience, we support customers across the product
              lifecycle, from design and development to full-scale production. Our focus is
              simple: transforming complex engineering requirements into dependable manufacturing
              outcomes.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ━━ PRECISION & CONTROL ━━ */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <div className="numbered-label mb-6">
              <span className="num">02</span> Process Discipline
            </div>
            <h2 className="heading-section mb-6">Manufacturing with Precision and Control</h2>
            <div className="divider-gold mb-6" />
            <p className="text-muted-foreground leading-relaxed mb-6">
              Every component is produced through structured manufacturing processes designed to
              ensure dimensional accuracy, repeatability, and quality. From material selection and
              tooling to production and inspection, each stage is governed by rigorous controls
              that support consistent performance across production volumes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              As experienced automotive component manufacturers, we understand the importance of
              maintaining tight tolerances, process stability, and product integrity. Our teams
              work closely with customers to align engineering requirements with manufacturing
              efficiency, helping accelerate production while maintaining uncompromising quality
              standards.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ━━ AUTOMOTIVE APPLICATIONS ━━ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <div className="numbered-label mb-6">
              <span className="num">03</span> Automotive Focus
            </div>
            <h2 className="heading-section mb-6">Supporting Critical Automotive Applications</h2>
            <div className="divider-gold mb-6" />
            <p className="text-muted-foreground leading-relaxed mb-6">
              The automotive industry demands components that perform reliably under demanding
              operating conditions. Wolverine manufactures precision components used across fluid
              transfer systems, thermal management applications, powertrain assemblies, and other
              critical vehicle systems.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our capabilities support both high-volume production programs and specialized
              manufacturing requirements, enabling customers to meet evolving performance,
              quality, and supply chain expectations. This commitment has established Wolverine as
              a trusted partner to global OEMs and leading automotive parts suppliers.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ━━ INTEGRATED CAPABILITIES ━━ */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <div className="numbered-label mb-6">
              <span className="num">04</span> Capabilities
            </div>
            <h2 className="heading-section mb-6">Integrated Manufacturing Capabilities</h2>
            <div className="divider-gold mb-8" />
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {capabilities.map((cap, i) => (
              <FadeIn key={cap} delay={i * 0.05}>
                <div className="flex items-start gap-3 rounded-xl border border-border p-4 bg-background">
                  <span className="w-7 h-7 shrink-0 rounded-full border-2 border-primary flex items-center justify-center text-[11px] font-bold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-foreground/90 leading-snug pt-0.5">{cap}</span>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <p className="text-muted-foreground leading-relaxed">
              Each capability is backed by disciplined process management, ensuring seamless
              integration into customer production environments and consistent results across
              every program.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ━━ QUALITY SYSTEMS ━━ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <h2 className="heading-section mb-6">Quality Systems Built for Long-Term Success</h2>
            <div className="divider-gold mb-6" />
            <p className="text-muted-foreground leading-relaxed mb-6">
              Manufacturing excellence is achieved through consistency, accountability, and
              continuous improvement. Wolverine operates with robust quality management systems,
              comprehensive process controls, and complete product traceability to ensure every
              component meets customer and industry requirements.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Combined with the global manufacturing strength of the MMI Group, we offer the
              responsiveness of a focused manufacturing partner and the resources of an established
              international organization.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              As trusted automotive component manufacturers and reliable automotive parts
              suppliers, we are committed to delivering precision-engineered solutions that help
              customers achieve operational excellence, production efficiency, and long-term
              success.
            </p>
          </FadeIn>
        </div>
      </section>

      <FaqSection faqs={faqs} />

      {/* ━━ CTA ━━ */}
      <section className="section-dark py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="heading-section mb-4">Ready to Get Started?</h2>
            <p className="text-secondary-foreground/50 max-w-xl mx-auto mb-8">
              Contact us to discuss your manufacturing requirements and how our capabilities can
              support your production programs.
            </p>
            <Link to="/contact" className="btn-primary">
              Contact Us <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default AutomotiveComponentManufacturers;
