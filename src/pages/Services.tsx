import Layout from "@/components/Layout";
import { FadeIn, StaggerContainer } from "@/components/Animations";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const servicesList = [
  { name: "5 Axis Tube Bending", icon: "⟁" },
  { name: "Bead Forming", icon: "◎" },
  { name: "End Forming", icon: "◈" },
  { name: "Precision Cutting", icon: "⊘" },
  { name: "Stamping", icon: "⬡" },
  { name: "Ultrasonic Cleaning", icon: "∿" },
  { name: "Brazing & Welding", icon: "⊕" },
  { name: "Assembly", icon: "⧉" },
  { name: "Surface Treatment", icon: "◬" },
];

const serviceCards = [
  {
    title: "Tube Bending with Integrated Inspection",
    desc: "Tube bending services are carried out to customer drawings and technical specifications. Operations include forming tubes to specified bend radii, angles, and geometries using established production methods.",
    highlight: "Precision to ±0.5°",
  },
  {
    title: "Process Planning & Execution",
    desc: "Manufacturing support includes review of customer-provided engineering documentation, process planning for tube bending operations, and execution aligned to approved specifications.",
    highlight: "End-to-end workflow",
  },
  {
    title: "Inspection & Execution Alignment",
    desc: "Production activities follow structured workflows covering material identification, inspection, documentation, and PPAP requirements. Execution is aligned with customer schedules and specifications.",
    highlight: "PPAP compliant",
  },
  {
    title: "Product Traceability and Identification",
    desc: "Materials are tracked through production to ensure traceability from raw material to finished product, supported by defined documentation practices.",
    highlight: "Full traceability",
  },
];

const Services = () => {
  return (
    <Layout>
      {/* ━━ HERO: Dark with large type ━━ */}
      <section className="section-dark section-breath relative overflow-hidden">
        {/* Decorative grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--secondary-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--secondary-foreground)) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-7">
              <FadeIn>
                <div className="numbered-label mb-6">
                  <span className="num">01</span> What We Offer
                </div>
                <h1 className="heading-display mb-6">Services</h1>
                <div className="divider-gold mb-8" />
                <p className="text-secondary-foreground/60 max-w-2xl text-lg leading-relaxed">
                  Manufacturing services focused on tube bending operations,
                  executed through controlled production workflows aligned to
                  customer engineering requirements.
                </p>
              </FadeIn>
            </div>
            <div className="col-span-12 lg:col-span-5 flex items-end">
              <FadeIn delay={0.2}>
                <div className="grid grid-cols-2 gap-6 w-full">
                  <div className="border-l-2 border-primary pl-4">
                    <span className="text-3xl font-bold text-secondary-foreground">
                      9+
                    </span>
                    <p className="text-secondary-foreground/50 text-sm mt-1">
                      Core Processes
                    </p>
                  </div>
                  <div className="border-l-2 border-primary pl-4">
                    <span className="text-3xl font-bold text-secondary-foreground">
                      100%
                    </span>
                    <p className="text-secondary-foreground/50 text-sm mt-1">
                      Quality Tracked
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ SERVICE LIST: Standalone section ━━ */}
      <section className="py-14 lg:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="numbered-label mb-4">
              <span className="num">★</span> Full Capability Range
            </div>
            <div className="divider-gold mb-10" />
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {servicesList.map((s) => (
              <FadeIn key={s.name}>
                <div className="flex items-center gap-4 py-5 px-6 rounded-2xl border border-border bg-background hover:border-primary hover:shadow-lg transition-all duration-300 group">
                  <span className="text-2xl w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                    {s.icon}
                  </span>
                  <span className="text-foreground font-semibold text-sm">
                    {s.name}
                  </span>
                </div>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ━━ DETAIL CARDS: Staggered layout ━━ */}
      {/* <section className="py-16 lg:py-18">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-12 gap-8 lg:gap-16 mb-16">
            <div className="col-span-12 lg:col-span-5">
              <FadeIn>
                <div className="numbered-label mb-6">
                  <span className="num">02</span> Core Processes
                </div>
                <h2 className="heading-section mb-6">How We Deliver</h2>
                <div className="divider-gold mb-6" />
                <p className="text-muted-foreground leading-relaxed">
                  Every project follows a structured workflow from planning
                  through delivery, ensuring precision and compliance at each
                  stage.
                </p>
              </FadeIn>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {serviceCards.map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.08}>
                <div className="h-full group card-dark">
                  <div className="flex items-start justify-between mb-5">
                    <span className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center text-xs font-bold text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${
                        i % 2 === 0
                          ? "bg-primary/10 text-primary"
                          : "bg-primary/20 text-primary"
                      }`}
                    >
                      {card.highlight}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-3">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section> */}

      {/* ━━ CTA: Dark band ━━ */}
      <section className="section-dark py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="heading-section mb-4">Ready to Get Started?</h2>
            <p className="text-secondary-foreground/50 max-w-xl mx-auto mb-8">
              Contact us to discuss your manufacturing requirements and how our
              services can support your production needs.
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

export default Services;
