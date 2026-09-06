import Layout from "@/components/Layout";
import { FadeIn } from "@/components/Animations";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import FaqSection, { type Faq } from "@/components/FaqSection";

const capabilities = [
  "5 Axis Tube Bending (up to Ø38 mm)",
  "Bead Forming",
  "End Forming",
  "Precision Cutting",
  "Stamping",
  "Ultrasonic Cleaning",
  "Brazing & Welding",
  "Surface Treatment",
  "Assembly",
];

const industries = [
  "Automotive",
  "Commercial Vehicles",
  "Agricultural Equipment",
  "Construction Equipment",
  "Oil & Gas Equipment",
  "Electrical Power",
  "Pumps & Compressors",
  "Consumer Appliances",
  "Medical Components",
  "Aerospace",
  "Packaging Equipment",
  "Electrical Cabinets",
];

const faqs: Faq[] = [
  {
    question: "What automotive manufacturing capabilities does WLVTEC provide?",
    answer:
      "WLVTEC provides 5 Axis Tube Bending, Bead Forming, End Forming, Precision Cutting, Stamping, Ultrasonic Cleaning, Brazing & Welding, Surface Treatment, and Assembly services.",
  },
  {
    question: "Does WLVTEC manufacture components based on customer specifications?",
    answer:
      "Yes. Manufacturing activities are carried out using customer-provided engineering documentation, drawings, and bills of materials.",
  },
  {
    question: "What quality standards are followed during manufacturing?",
    answer:
      "Manufacturing systems are implemented in accordance with IATF 16949 and ISO 9001:2015 standards and are certified under the Hyundai SQ Mark.",
  },
  {
    question: "Does WLVTEC offer inventory management support?",
    answer:
      "Yes. Inventory management services include safety stock maintenance, FIFO control, batch traceability, and customer-defined release protocols.",
  },
  {
    question: "Which industries are supported by WLVTEC's manufacturing operations?",
    answer:
      "WLVTEC supports multiple sectors, including Automotive, Commercial Vehicles, Agricultural Equipment, Construction Equipment, Oil & Gas Equipment, Electrical Power, Pumps & Compressors, Consumer Appliances, Medical Components, Aerospace, Packaging Equipment, and Electrical Cabinets.",
  },
];

const AutoPartsManufacturersIndia = () => {
  return (
    <Layout>
      <Helmet>
        <title>Auto Parts Manufacturers in India | WLVTEC</title>
        <meta
          name="description"
          content="WLVTEC supports automotive manufacturing requirements through tube bending, engineered tubular assemblies, and associated production processes at our Chennai facility."
        />
        <link rel="canonical" href="https://www.wlvtec.com/auto-parts-manufacturers-india" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.wlvtec.com/" },
              {
                "@type": "ListItem",
                position: 2,
                name: "Auto Parts Manufacturers in India",
                item: "https://www.wlvtec.com/auto-parts-manufacturers-india",
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
              <span className="num">01</span> Auto Parts Manufacturing
            </div>
            <h1 className="heading-display mb-6 max-w-3xl">Auto Parts Manufacturing</h1>
            <div className="divider-gold mb-8" />
            <p className="text-secondary-foreground/60 max-w-2xl text-lg leading-relaxed mb-8">
              WLVTEC supports automotive manufacturing requirements through tube bending,
              engineered tubular assemblies, and associated production processes. Manufacturing
              activities are carried out using customer-provided engineering documentation and
              established manufacturing procedures to achieve specified dimensions, bend radii,
              angles, and tolerance requirements. With capabilities aligned to industrial and
              automotive applications, the company supports customers seeking reliable production
              partners among auto parts manufacturers in India.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Request a Quote <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ━━ PRODUCTION PROCESS ━━ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <div className="numbered-label mb-6">
              <span className="num">02</span> Production Process
            </div>
            <h2 className="heading-section mb-6">From Material to Finished Component</h2>
            <div className="divider-gold mb-6" />
            <p className="text-muted-foreground leading-relaxed">
              Production begins with material identification and process planning, followed by
              forming, tube bending &amp; brazing, assembly alterations, inspection, and
              documentation. Components are manufactured in accordance with approved drawings and
              bills of materials, ensuring consistency throughout the production cycle. Defined
              inspection and documentation practices support traceability from raw material
              receipt through finished components.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ━━ CAPABILITIES ━━ */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <div className="numbered-label mb-6">
              <span className="num">03</span> Chennai Facility
            </div>
            <h2 className="heading-section mb-6">Tube Bending & Fabrication Capabilities</h2>
            <div className="divider-gold mb-8" />
            <p className="text-muted-foreground leading-relaxed mb-8">
              Tube bending forms a core part of the manufacturing process. The Chennai facility is
              equipped for 5 Axis Tube Bending operations supporting tubes up to Ø38 mm diameter,
              enabling the production of complex multi-plane bends. These capabilities support the
              manufacture of tubular components used across automotive and industrial
              applications.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        </div>
      </section>

      {/* ━━ ASSEMBLY & QUALITY ━━ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <div className="numbered-label mb-6">
              <span className="num">04</span> Assembly &amp; Quality
            </div>
            <h2 className="heading-section mb-6">Assembly, Traceability & Certifications</h2>
            <div className="divider-gold mb-6" />
            <p className="text-muted-foreground leading-relaxed">
              Assembly activities are performed in accordance with customer-provided engineering
              requirements and documented procedures. Component integration, verification, and
              associated records are maintained throughout the assembly process to ensure
              alignment with specified program requirements. Manufacturing systems are implemented
              in accordance with IATF 16949 and ISO 9001:2015 standards and are certified under
              the Hyundai SQ Mark.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ━━ SUPPLY CHAIN ━━ */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <div className="numbered-label mb-6">
              <span className="num">05</span> Global Supply Support
            </div>
            <h2 className="heading-section mb-6">Inventory & Supply Chain Management</h2>
            <div className="divider-gold mb-6" />
            <p className="text-muted-foreground leading-relaxed mb-6">
              In addition to production capabilities, WLVTEC supports inventory management through
              ISO-certified warehouses. Services include safety stock maintenance, FIFO control,
              batch traceability, and customer-defined release protocols. Global supply management
              operations extend across India, China, Vietnam, Indonesia, and South Korea,
              supporting supplier qualification, production tracking, logistics coordination, and
              audit activities.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By combining tube bending, engineered assemblies, inventory management, and global
              supply support, WLVTEC serves a range of industrial sectors, including automotive
              and commercial vehicles. These capabilities position us among established auto parts
              manufacturers in India supporting customer-specific manufacturing requirements.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ━━ INDUSTRIES SERVED ━━ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <div className="numbered-label mb-6">
              <span className="num">06</span> Industries Served
            </div>
            <h2 className="heading-section mb-8">Sectors We Support</h2>
          </FadeIn>
          <div className="flex flex-wrap gap-3">
            {industries.map((ind, i) => (
              <FadeIn key={ind} delay={i * 0.03}>
                <span className="inline-block rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-foreground/80">
                  {ind}
                </span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <FaqSection faqs={faqs} eyebrow="07" />

      {/* ━━ CTA ━━ */}
      <section className="section-dark py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="heading-section mb-4">Ready to Get Started?</h2>
            <p className="text-secondary-foreground/50 max-w-xl mx-auto mb-8">
              Contact our Chennai facility to discuss tube bending, engineered assemblies, and
              supply chain support for your program.
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

export default AutoPartsManufacturersIndia;
