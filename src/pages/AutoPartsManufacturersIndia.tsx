import { useEffect, useState, type ReactNode } from "react";
import Layout from "@/components/Layout";
import { FadeIn } from "@/components/Animations";
import ContactCtaForm from "@/components/ContactCtaForm";
import {
  ChevronRight, Spline, Boxes, FileCheck2, CarFront, Search, ClipboardList,
  Layers, Flame, Cog, ClipboardCheck, FileText, CircleDot, Scissors, Hammer, Waves,
  Sparkles, Wrench, ShieldCheck, Award, BadgeCheck, Warehouse, ListChecks, PackageCheck,
  Globe2, Truck, Tractor, Construction, Fuel, Zap, Gauge, Microwave, HeartPulse, Plane,
  Package, Cable,
} from "lucide-react";
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

/* ---------- diagram / card content (visual only; page copy is in the sections below) ---------- */
const heroCards = [
  { icon: Spline, title: "Tube Bending", text: "Specified bend radii, angles and tolerances" },
  { icon: Boxes, title: "Engineered Tubular Assemblies", text: "Built to customer drawings and bills of materials" },
  { icon: FileCheck2, title: "Customer Documentation", text: "Established manufacturing procedures" },
  { icon: CarFront, title: "Automotive & Industrial", text: "Reliable production partner in India" },
];

const processSteps = [
  { icon: Search, label: "Material Identification" },
  { icon: ClipboardList, label: "Process Planning" },
  { icon: Layers, label: "Forming" },
  { icon: Flame, label: "Tube Bending & Brazing" },
  { icon: Cog, label: "Assembly" },
  { icon: ClipboardCheck, label: "Inspection" },
  { icon: FileText, label: "Documentation" },
];

const capabilityIcons = [Spline, Layers, CircleDot, Scissors, Hammer, Waves, Flame, Sparkles, Wrench];

const certifications = [
  { icon: ShieldCheck, title: "IATF 16949", text: "Manufacturing system standard" },
  { icon: Award, title: "ISO 9001:2015", text: "Manufacturing system standard" },
  { icon: BadgeCheck, title: "Hyundai SQ Mark", text: "Certified" },
];

const inventoryServices = [
  { icon: Warehouse, label: "Safety Stock Maintenance" },
  { icon: ListChecks, label: "FIFO Control" },
  { icon: ClipboardCheck, label: "Batch Traceability" },
  { icon: PackageCheck, label: "Customer-defined Release Protocols" },
];

const supplyCountries = ["India", "China", "Vietnam", "Indonesia", "South Korea"];

const industryIcons = [CarFront, Truck, Tractor, Construction, Fuel, Zap, Gauge, Microwave, HeartPulse, Plane, Package, Cable];

/* Site-wide card look: bordered surface, gold border on hover (mirrors .card-bordered) */
const cardBase =
  "bg-background border border-foreground/10 rounded-2xl shadow-[var(--shadow-ambient)] transition-all duration-300 hover:border-primary hover:-translate-y-0.5";

const IconCircle = ({ children, size = "h-14 w-14" }: { children: ReactNode; size?: string }) => (
  <span className={`flex ${size} shrink-0 items-center justify-center rounded-full bg-primary/10 text-foreground/75`}>{children}</span>
);

const Heading = ({
  line1, line2, className = "", oneLine = false,
}: { line1: string; line2: string; className?: string; oneLine?: boolean }) => (
  <h2 className={`heading-section ${className}`}>
    {line1} <span className={oneLine ? "text-primary" : "block text-primary"}>{line2}</span>
  </h2>
);

/* Marquee keyframes (same approach as the home page) */
const marqueeStyles = `
  @keyframes industries-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  .industries-track { animation: industries-marquee 45s linear infinite; }
  .industries-track.reverse { animation-direction: reverse; }
  .industries-marquee:hover .industries-track { animation-play-state: paused; }
  @media (prefers-reduced-motion: reduce) { .industries-track { animation: none; } }
`;

const AutoPartsManufacturersIndia = () => {
  // Highlight moves from step to step every few seconds (paused on hover, off for reduced-motion users)
  const [activeStep, setActiveStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActiveStep((s) => (s + 1) % processSteps.length), 2500);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <Layout>
      <Helmet>
        <title>Auto Parts Manufacturers | WLVTEC</title>
        <meta
          name="description"
          content="Among the leading auto parts manufacturers in India, Wolverine delivers precision-engineered components, tube assemblies and welded parts for global OEMs."
        />
        <link rel="canonical" href="https://wlvtec.com/auto-parts-manufacturers-india/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://wlvtec.com/" },
              {
                "@type": "ListItem",
                position: 2,
                name: "Auto Parts Manufacturers",
                item: "https://wlvtec.com/auto-parts-manufacturers-india/",
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
              <span className="num">01</span> Auto Parts Manufacturing
            </div>
            <h1 className="mb-6 text-3xl font-extrabold leading-[1.1] tracking-tight md:text-4xl lg:text-5xl">
              Auto Parts <span className="block text-primary">Manufacturing</span>
            </h1>
            <div className="divider-gold mb-8" />
            <p className="max-w-none text-lg leading-relaxed text-secondary-foreground/60">
              WLVTEC supports automotive manufacturing requirements through tube bending,
              engineered tubular assemblies, and associated production processes. Manufacturing
              activities are carried out using customer-provided engineering documentation and
              established manufacturing procedures to achieve specified dimensions, bend radii,
              angles, and tolerance requirements. With capabilities aligned to industrial and
              automotive applications, the company supports customers seeking reliable production
              partners among auto parts manufacturers in India.
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

      {/* ━━ PRODUCTION PROCESS ━━ */}
      <section className="bg-background py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <div className="numbered-label mb-6">
              <span className="num">02</span> Production Process
            </div>
            <Heading line1="From Material to" line2="Finished Component" className="mb-6" />
            <div className="divider-gold mb-6" />
            <p className="leading-relaxed text-muted-foreground">
              Production begins with material identification and process planning, followed by
              forming, Tube Bending &amp; Brazing, assembly alterations, inspection, and
              documentation. Components are manufactured in accordance with approved drawings and
              bills of materials, ensuring consistency throughout the production cycle. Defined
              inspection and documentation practices support traceability from raw material
              receipt through finished components.
            </p>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div
              className={`${cardBase} p-6 sm:p-8`}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <ol className="grid grid-cols-2 gap-x-2 gap-y-10 sm:grid-cols-4">
                {processSteps.map(({ icon: Icon, label }, i) => (
                  <li key={label} className="relative flex flex-col items-center text-center">
                    <span
                      className={`flex h-20 w-20 items-center justify-center rounded-full ring-1 ring-offset-[3px] ring-offset-background transition-all duration-500 ${
                        i === activeStep
                          ? "scale-105 bg-primary text-primary-foreground ring-primary"
                          : "bg-primary/10 text-foreground/75 ring-transparent"
                      }`}
                    >
                      <Icon size={30} strokeWidth={1.75} />
                    </span>
                    {i % 4 !== 3 && i !== processSteps.length - 1 && (
                      <span className="absolute left-[calc(50%+44px)] top-10 hidden w-[calc(100%-88px+0.5rem)] items-center sm:flex">
                        <span className="h-px flex-1 border-t border-dashed border-primary/60" />
                        <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                      </span>
                    )}
                    <span className="mt-4 text-base font-extrabold text-primary">0{i + 1}</span>
                    <span
                      className={`px-1 text-sm font-semibold leading-snug transition-colors duration-500 ${
                        i === activeStep ? "text-foreground" : "text-foreground/70"
                      }`}
                    >
                      {label}
                    </span>
                  </li>
                ))}
                <li className="flex flex-col items-center justify-center rounded-2xl bg-primary/15 px-3 py-4 text-center">
                  <ShieldCheck size={30} strokeWidth={1.6} className="mb-2 text-primary" />
                  <span className="text-sm font-bold uppercase tracking-wide">Traceability</span>
                  <span className="mt-1 text-xs leading-snug text-muted-foreground">
                    From raw material receipt through finished components
                  </span>
                </li>
              </ol>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ━━ CAPABILITIES ━━ */}
      <section className="bg-muted/30 py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-x-16 gap-y-10 px-6 lg:grid-cols-2">
          <FadeIn>
            <div className="lg:col-start-1 lg:row-start-1">
              <div className="numbered-label mb-6">
                <span className="num">03</span> Chennai Facility
              </div>
              <Heading line1="Tube Bending &" line2="Fabrication Capabilities" className="mb-6" />
              <div className="divider-gold" />
            </div>
          </FadeIn>

          <FadeIn>
            <p className="leading-relaxed text-muted-foreground lg:col-start-2 lg:row-start-1 lg:self-end">
              Tube bending forms a core part of the manufacturing process. The Chennai facility is
              equipped for 5 Axis Tube Bending operations supporting tubes up to Ø38 mm diameter,
              enabling the production of complex multi-plane bends. These capabilities support the
              manufacture of tubular components used across automotive and industrial
              applications.
            </p>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:row-start-2 lg:grid-cols-3">
            {capabilities.map((cap, i) => {
              const Icon = capabilityIcons[i];
              return (
                <FadeIn key={cap} delay={i * 0.05}>
                  <div className={`${cardBase} flex h-full min-h-[96px] items-center gap-4 px-5`}>
                    <IconCircle>
                      <Icon size={26} strokeWidth={1.6} />
                    </IconCircle>
                    <span className="text-lg font-extrabold text-primary">{String(i + 1).padStart(2, "0")}</span>
                    <span className="h-9 w-px shrink-0 bg-border" />
                    <span className="flex-1 text-base font-semibold leading-snug">{cap}</span>
                    <ChevronRight size={20} className="shrink-0 text-muted-foreground" />
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━ ASSEMBLY & QUALITY ━━ */}
      <section className="bg-background py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <div className="numbered-label mb-6">
              <span className="num">04</span> Assembly &amp; Quality
            </div>
            <Heading line1="Assembly, Traceability &" line2="Certifications" className="mb-6" />
            <div className="divider-gold mb-6" />
            <p className="leading-relaxed text-muted-foreground">
              Assembly activities are performed in accordance with customer-provided engineering
              requirements and documented procedures. Component integration, verification, and
              associated records are maintained throughout the assembly process to ensure
              alignment with specified program requirements. Manufacturing systems are implemented
              in accordance with IATF 16949 and ISO 9001:2015 standards and are certified under
              the Hyundai SQ Mark.
            </p>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="flex flex-col gap-4">
              {certifications.map(({ icon: Icon, title, text }) => (
                <div key={title} className={`${cardBase} flex min-h-[96px] items-center gap-5 px-6`}>
                  <IconCircle size="h-16 w-16">
                    <Icon size={30} strokeWidth={1.6} />
                  </IconCircle>
                  <div className="flex-1">
                    <div className="text-lg font-bold leading-snug">{title}</div>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="h-[3px] w-6 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground">{text}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ━━ SUPPLY CHAIN ━━ */}
      <section className="bg-muted/30 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="numbered-label mb-6">
              <span className="num">05</span> Global Supply Support
            </div>
            <Heading line1="Inventory &" line2="Supply Chain Management" oneLine className="mb-6" />
            <div className="divider-gold mb-10" />
          </FadeIn>

          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                In addition to production capabilities, WLVTEC supports inventory management through
                ISO-certified warehouses. Services include safety stock maintenance, FIFO control,
                batch traceability, and customer-defined release protocols. Global supply management
                operations extend across India, China, Vietnam, Indonesia, and South Korea,
                supporting supplier qualification, production tracking, logistics coordination, and
                audit activities.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                By combining tube bending, engineered assemblies, inventory management, and global
                supply support, WLVTEC serves a range of industrial sectors, including automotive
                and commercial vehicles. These capabilities position us among established auto parts
                manufacturers in India supporting customer-specific manufacturing requirements.
              </p>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="grid gap-4 sm:grid-cols-2">
                {inventoryServices.map(({ icon: Icon, label }) => (
                  <div key={label} className={`${cardBase} flex min-h-[96px] items-center gap-4 px-5 py-4`}>
                    <IconCircle>
                      <Icon size={26} strokeWidth={1.75} />
                    </IconCircle>
                    <div className="flex-1">
                      <div className="text-base font-bold leading-snug">{label}</div>
                      <div className="mt-2 h-[3px] w-6 rounded-full bg-primary" />
                    </div>
                  </div>
                ))}
                <div className={`${cardBase} flex flex-wrap items-center gap-4 px-5 py-4 sm:col-span-2`}>
                  <IconCircle>
                    <Globe2 size={26} strokeWidth={1.75} />
                  </IconCircle>
                  <div className="flex flex-1 flex-wrap gap-2">
                    {supplyCountries.map((c) => (
                      <span
                        key={c}
                        className="inline-block rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm font-medium text-foreground/80"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ━━ INDUSTRIES SERVED ━━ */}
      <section className="overflow-hidden bg-background py-16 lg:py-20">
        <style>{marqueeStyles}</style>
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="numbered-label mb-6">
              <span className="num">06</span> Industries Served
            </div>
            <Heading line1="Sectors We" line2="Support" oneLine className="mb-6" />
            <div className="divider-gold mb-10" />
          </FadeIn>
        </div>

        <div
          className="flex flex-col gap-4"
          style={{
            maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
          }}
        >
          {[industries.slice(0, 6), industries.slice(6)].map((row, r) => {
            const offset = r === 0 ? 0 : 6;
            return (
              <div key={r} className="industries-marquee w-full overflow-hidden py-2">
                <div className={`industries-track flex w-max ${r === 1 ? "reverse" : ""}`}>
                  {/* 4 copies: first is real content, the rest are visual repeats for a seamless loop */}
                  {[0, 1, 2, 3].map((copy) =>
                    row.map((ind, i) => {
                      const Icon = industryIcons[offset + i];
                      return (
                        <div
                          key={`${copy}-${ind}`}
                          aria-hidden={copy > 0 ? true : undefined}
                          className={`${cardBase} mr-4 flex h-[88px] w-[290px] shrink-0 items-center gap-4 px-5`}
                        >
                          <IconCircle>
                            <Icon size={26} strokeWidth={1.75} />
                          </IconCircle>
                          <span className="flex-1 text-base font-semibold leading-snug">{ind}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <FaqSection faqs={faqs} eyebrow="07" />

      <ContactCtaForm description="Share your requirements for tube bending, engineered assemblies, and supply chain support, and our Chennai team will get back to you." />
    </Layout>
  );
};

export default AutoPartsManufacturersIndia;