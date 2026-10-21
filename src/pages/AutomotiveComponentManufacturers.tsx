import { useEffect, useState, type ReactNode } from "react";
import Layout from "@/components/Layout";
import { FadeIn } from "@/components/Animations";
import {
  ArrowRight, ChevronRight, Settings, ShieldCheck, Boxes, Wrench, ClipboardCheck,
  Droplets, Thermometer, Cog, CarFront, GitBranch, Factory, Scissors, Flame, Layers,
  Sparkles, Truck, CheckCircle2, Globe2, Users, BarChart3, Award,
} from "lucide-react";
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

/* ---------- diagram / card content (visual only; page copy is in the sections below) ---------- */
const heroCards = [
  { icon: Settings, title: "Engineering Expertise", text: "Turning complex requirements into practical solutions" },
  { icon: BarChart3, title: "Advanced Manufacturing", text: "Precision, scalability and consistency" },
  { icon: ShieldCheck, title: "Disciplined Quality", text: "Components that meet the highest standards" },
  { icon: Users, title: "Global Partnership", text: "Supporting customers across the product lifecycle" },
];

const processSteps = [
  { icon: Boxes, label: "Material Selection" },
  { icon: Wrench, label: "Tooling" },
  { icon: Factory, label: "Production" },
  { icon: ClipboardCheck, label: "Inspection" },
];

const applications = [
  { icon: Droplets, label: "Fluid Transfer Systems" },
  { icon: Thermometer, label: "Thermal Management Applications" },
  { icon: Cog, label: "Powertrain Assemblies" },
  { icon: CarFront, label: "Other Critical Vehicle Systems" },
];

const capabilityIcons = [GitBranch, Layers, Scissors, Flame, Cog, Sparkles, Droplets, Truck];

const qualityBlocks = [
  {
    icon: Award,
    title: "Consistency",
    body: `Manufacturing excellence is achieved through consistency, accountability, and continuous improvement. Wolverine operates with robust quality management systems, comprehensive process controls, and complete product traceability to ensure every component meets customer and industry requirements.`,
  },
  {
    icon: CheckCircle2,
    title: "Trusted Partnership",
    body: `Combined with the global manufacturing strength of the MMI Group, we offer the responsiveness of a focused manufacturing partner and the resources of an established international organization.`,
  },
  {
    icon: Globe2,
    title: "Long-Term Success",
    body: `As trusted automotive component manufacturers and reliable automotive parts suppliers, we are committed to delivering precision-engineered solutions that help customers achieve operational excellence, production efficiency, and long-term success.`,
  },
];

/* Site-wide card look: bordered surface, gold border on hover (mirrors .card-bordered) */
const cardBase =
  "bg-background border border-foreground/10 rounded-2xl shadow-[var(--shadow-ambient)] transition-all duration-300 hover:border-primary hover:-translate-y-0.5";

const Heading = ({
  line1, line2, className = "", oneLine = false,
}: { line1: string; line2: string; className?: string; oneLine?: boolean }) => (
  <h2 className={`heading-section ${className}`}>
    {line1} <span className={oneLine ? "text-primary" : "block text-primary"}>{line2}</span>
  </h2>
);

const IconCircle = ({ children, size = "h-14 w-14" }: { children: ReactNode; size?: string }) => (
  <span className={`flex ${size} shrink-0 items-center justify-center rounded-full bg-primary/10 text-foreground/75`}>
    {children}
  </span>
);

/* Marquee keyframes (same approach as the home page) */
const marqueeStyles = `
  @keyframes cap-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  .cap-track { animation: cap-marquee 45s linear infinite; }
  .cap-marquee:hover .cap-track { animation-play-state: paused; }
  @media (prefers-reduced-motion: reduce) {
    .cap-track { animation: none; }
    .cap-marquee { overflow-x: auto; }
  }
`;

const AutomotiveComponentManufacturers = () => {
  // The highlight moves from step to step every few seconds (paused on hover, off for reduced-motion users)
  const [activeStep, setActiveStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActiveStep((v) => (v + 1) % processSteps.length), 1600);
    return () => clearInterval(id);
  }, [paused]);

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
          href="https://wlvtec.com/automotive-component-manufacturers/"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://wlvtec.com/" },
              {
                "@type": "ListItem",
                position: 2,
                name: "Automotive Component Manufacturers",
                item: "https://wlvtec.com/automotive-component-manufacturers/",
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
      <section className="section-dark relative overflow-hidden py-16 lg:py-20">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--secondary-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--secondary-foreground)) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rotate-45 border border-primary/25" />
        <div className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rotate-45 border border-primary/20" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <FadeIn>
            <div className="numbered-label mb-6">
              <span className="num">01</span> Precision Manufacturing
            </div>
            <h1 className="mb-6 text-3xl font-extrabold leading-[1.1] tracking-tight md:text-4xl lg:text-5xl">
              Precision Manufacturing. <span className="block text-primary">Built for Performance.</span>
            </h1>
            <div className="divider-gold mb-8" />
            <p className="max-w-none text-lg leading-relaxed text-secondary-foreground/60">
              Wolverine manufactures precision-engineered tubular and fabricated components for
              OEMs, Tier-1 suppliers, and industrial manufacturers worldwide. As part of the MMI
              Group, we bring together engineering expertise, advanced manufacturing capabilities,
              and disciplined quality systems to deliver components that meet the highest
              standards of performance, reliability, and consistency.
            </p>
            <p className="mt-6 max-w-none text-lg leading-relaxed text-secondary-foreground/60">
              With decades of manufacturing experience, we support customers across the product
              lifecycle, from design and development to full-scale production. Our focus is
              simple: transforming complex engineering requirements into dependable manufacturing
              outcomes.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="relative lg:ml-auto lg:max-w-[500px]">
              <svg className="absolute left-0 top-0 hidden lg:block" width="60" height="372" viewBox="0 0 60 372" fill="none" aria-hidden="true">
                <path d="M6 42 C50 110 50 262 6 330" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                {[[6, 42], [36, 138], [36, 234], [6, 330]].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="5" fill="hsl(var(--primary))" />
                ))}
              </svg>
              <div className="flex flex-col gap-3">
                {heroCards.map(({ icon: Icon, title, text }, i) => (
                  <div
                    key={title}
                    className={`flex min-h-[84px] items-center gap-4 rounded-[44px] border border-secondary-foreground/10 bg-secondary-foreground/[0.05] pr-6 ${
                      i === 1 || i === 2 ? "lg:ml-[78px]" : "lg:ml-[48px]"
                    }`}
                  >
                    <span className="flex h-[84px] w-[84px] shrink-0 items-center justify-center rounded-full border border-secondary-foreground/15 bg-secondary-foreground/[0.08]">
                      <Icon size={32} strokeWidth={1.6} className="text-secondary-foreground" />
                    </span>
                    <div className="min-w-0 py-2">
                      <div className="text-sm font-bold uppercase tracking-wide">{title}</div>
                      <div className="mt-0.5 text-sm leading-snug text-secondary-foreground/60">{text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ━━ PRECISION & CONTROL ━━ */}
      <section className="bg-muted/30 py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <div className="numbered-label mb-6">
              <span className="num">02</span> Process Discipline
            </div>
            <Heading line1="Manufacturing with" line2="Precision and Control" className="mb-6" />
            <div className="divider-gold mb-6" />
            <p className="mb-6 leading-relaxed text-muted-foreground">
              Every component is produced through structured manufacturing processes designed to
              ensure dimensional accuracy, repeatability, and quality. From material selection and
              tooling to production and inspection, each stage is governed by rigorous controls
              that support consistent performance across production volumes.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              As experienced automotive component manufacturers, we understand the importance of
              maintaining tight tolerances, process stability, and product integrity. Our teams
              work closely with customers to align engineering requirements with manufacturing
              efficiency, helping accelerate production while maintaining uncompromising quality
              standards.
            </p>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
              <div className="flex items-start justify-between">
                {processSteps.map(({ icon: Icon, label }, i, arr) => (
                  <div key={label} className="relative flex w-1/4 flex-col items-center text-center">
                    <span
                      className={`flex h-24 w-24 items-center justify-center rounded-full border-2 p-2 transition-colors duration-300 ${
                        i === activeStep ? "border-primary" : "border-primary/20"
                      }`}
                    >
                      <span
                        className={`flex h-full w-full items-center justify-center rounded-full transition-colors duration-300 ${
                          i === activeStep
                            ? "bg-primary text-primary-foreground"
                            : "bg-primary/10 text-foreground/75"
                        }`}
                      >
                        <Icon size={32} strokeWidth={1.75} />
                      </span>
                    </span>
                    {i < arr.length - 1 && (
                      <span className="absolute left-[calc(50%+54px)] top-[46px] flex w-[calc(100%-108px)] items-center justify-center">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                      </span>
                    )}
                    <span className="mt-4 text-base font-extrabold text-primary">0{i + 1}</span>
                    <span
                      className={`px-1 text-sm font-semibold leading-snug transition-colors duration-300 ${
                        i === activeStep ? "text-foreground" : "text-foreground/70"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* bracket from first to last step, with the label sitting on its bottom line */}
              <div className="mx-[12.5%] mt-5 flex items-stretch">
                <div className="relative flex-1">
                  <span className="absolute inset-x-0 top-0 h-1/2 rounded-bl-2xl border-b border-l border-primary/70" />
                </div>
                <span className="mx-3 w-max max-w-[60%] rounded-lg bg-primary/15 px-5 py-3 text-center text-xs font-bold uppercase leading-snug tracking-wide sm:text-[13px]">
                  From material selection and tooling to production and inspection
                </span>
                <div className="relative flex-1">
                  <span className="absolute inset-x-0 top-0 h-1/2 rounded-br-2xl border-b border-r border-primary/70" />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ━━ AUTOMOTIVE APPLICATIONS ━━ */}
      <section className="bg-background py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="numbered-label mb-6">
              <span className="num">03</span> Automotive Focus
            </div>
            <Heading line1="Supporting Critical" line2="Automotive Applications" oneLine className="mb-6" />
            <div className="divider-gold mb-10" />
          </FadeIn>

          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                The automotive industry demands components that perform reliably under demanding
                operating conditions. Wolverine manufactures precision components used across fluid
                transfer systems, thermal management applications, powertrain assemblies, and other
                critical vehicle systems.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                Our capabilities support both high-volume production programs and specialized
                manufacturing requirements, enabling customers to meet evolving performance,
                quality, and supply chain expectations. This commitment has established Wolverine as
                a trusted partner to global OEMs and leading automotive parts suppliers.
              </p>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="grid gap-4 sm:grid-cols-2">
                {applications.map(({ icon: Icon, label }) => (
                  <div key={label} className={`${cardBase} flex min-h-[96px] items-center gap-4 px-5 py-4`}>
                    <IconCircle>
                      <Icon size={26} strokeWidth={1.75} />
                    </IconCircle>
                    <div className="flex-1">
                      <div className="text-base font-bold leading-snug">{label}</div>
                      <div className="mt-2 h-[3px] w-6 rounded-full bg-primary" />
                    </div>
                    <ChevronRight size={20} className="shrink-0 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ━━ INTEGRATED CAPABILITIES ━━ */}
      <section className="overflow-hidden bg-muted/30 py-16 lg:py-20">
        <style>{marqueeStyles}</style>
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="numbered-label mb-6">
              <span className="num">04</span> Capabilities
            </div>
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
              <div>
                <Heading line1="Integrated Manufacturing" line2="Capabilities" className="mb-6" />
                <div className="divider-gold" />
              </div>
              <p className="leading-relaxed text-muted-foreground">
                Each capability is backed by disciplined process management, ensuring seamless
                integration into customer production environments and consistent results across
                every program.
              </p>
            </div>
          </FadeIn>
        </div>

        <div
          className="mt-12"
          style={{
            maskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
          }}
        >
          <div className="cap-marquee w-full overflow-hidden py-2">
            <div className="cap-track flex w-max">
              {/* 2 copies: the first is the real content, the second is a visual repeat for a seamless loop */}
              {[0, 1].map((copy) =>
                capabilities.map((cap, i) => {
                  const Icon = capabilityIcons[i];
                  return (
                    <div
                      key={`${copy}-${cap}`}
                      aria-hidden={copy > 0 ? true : undefined}
                      className={`${cardBase} mr-4 flex h-[96px] w-[340px] shrink-0 items-center gap-4 px-5`}
                    >
                      <IconCircle>
                        <Icon size={26} strokeWidth={1.75} />
                      </IconCircle>
                      <span className="text-lg font-extrabold text-primary">{String(i + 1).padStart(2, "0")}</span>
                      <span className="h-9 w-px shrink-0 bg-border" />
                      <span className="flex-1 text-base font-semibold leading-snug">{cap}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ━━ QUALITY SYSTEMS ━━ */}
      <section className="bg-background py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 lg:grid-cols-[0.8fr_2.2fr] lg:gap-12">
          <FadeIn>
            <Heading line1="Quality Systems Built for" line2="Long-Term Success" className="mb-6" />
            <div className="divider-gold" />
          </FadeIn>

          <div className="grid gap-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border">
            {qualityBlocks.map(({ icon: Icon, title, body }, i) => (
              <FadeIn key={title} delay={i * 0.08}>
                <div className="flex h-full flex-col items-start md:px-6">
                  <span className="mb-5">
                    <IconCircle>
                      <Icon size={26} strokeWidth={1.75} />
                    </IconCircle>
                  </span>
                  <h3 className="mb-3 text-lg font-bold">{title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <FaqSection faqs={faqs} />

      {/* ━━ CTA ━━ */}
      <section className="section-dark relative overflow-hidden py-16 lg:py-20">
        <div className="pointer-events-none absolute bottom-0 left-12 h-32 w-8 -skew-x-[35deg] bg-primary" />
        <div className="pointer-events-none absolute right-24 top-0 h-8 w-24 -skew-x-[35deg] bg-primary" />
        <div className="pointer-events-none absolute -right-6 top-0 h-full w-24 skew-x-[35deg] border-l border-primary/50" />
        <div className="pointer-events-none absolute -left-6 top-0 h-full w-24 -skew-x-[35deg] border-r border-primary/30" />

        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <FadeIn>
            <h2 className="heading-section mb-4">
              Ready to <span className="text-primary">Get Started?</span>
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-secondary-foreground/50">
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