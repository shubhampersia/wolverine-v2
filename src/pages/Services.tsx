import Layout from "@/components/Layout";
import { FadeIn, StaggerContainer } from "@/components/Animations";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

type ServiceKey = | "bending" | "bead" | "end" | "cutting" | "stamping" | "cleaning" | "welding" | "assembly" | "surface";

const services = [ { key: "bending", label: "5 Axis Tube Bending" }, { key: "bead", label: "Bead Forming" }, { key: "end", label: "End Forming" }, { key: "cutting", label: "Precision Cutting" }, { key: "stamping", label: "Stamping" }, { key: "cleaning", label: "Ultrasonic Cleaning" }, { key: "welding", label: "Brazing & Welding" }, { key: "assembly", label: "Assembly" }, { key: "surface", label: "Surface Treatment" }, ];

const serviceContent: Record<
  ServiceKey,
  { title: string; description: string; image: string }
> = {
  bending: {
    title: "5 Axis Tube Bending",
    description: "Bending across multiple axes to meet specified angles and tolerances.",
    image: "/axis.jpeg",
  },
  bead: {
    title: "Bead Forming",
    description: "Forming beads on tubes for retention and proper fit during assembly.",
    image: "/bead.png",
  },
  end: {
    title: "End Forming",
    description: "Shaping ends based on connection and assembly requirements.",
    image: "/end.png",
  },
  cutting: {
    title: "Precision Cutting",
    description: "Cutting raw material to required lengths based on drawing specifications.",
    image: "/precision.jpg",
  },
  stamping: {
    title: "Stamping",
    description: "Shaping parts using dies for consistent output.",
    image: "/paint.jpeg",
  },
  cleaning: {
    title: "Ultrasonic Cleaning",
    description: "Cleaning surfaces using ultrasonic processes to remove contaminants.",
    image: "/ultrasonic.png",
  },
  welding: {
    title: "Brazing & Welding",
    description: "Joining metals using brazing and welding based on application requirements.",
    image: "/brazing.jpg",
  },
  assembly: {
    title: "Assembly",
    description: "Assembling multiple parts into a finished unit as per design requirements.",
    image: "/assembly.JPG",
  },
  surface: {
    title: "Surface Treatment",
    description: "Surface finishing processes carried out based on material and application needs.",
    image: "/surface.jpg",
  },
};

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
  const [active, setActive] = useState<ServiceKey>("bending");
  const tabRef = useRef<HTMLDivElement>(null);
  const data = serviceContent[active];

  const handleScroll = () => {
    const el = tabRef.current;
    if (!el) return;
    const leftBtn = document.getElementById("arrow-left");
    const rightBtn = document.getElementById("arrow-right");
    const atStart = el.scrollLeft <= 0;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
    if (leftBtn) {
      leftBtn.classList.toggle("opacity-0", atStart);
      leftBtn.classList.toggle("pointer-events-none", atStart);
    }
    if (rightBtn) {
      rightBtn.classList.toggle("opacity-0", atEnd);
      rightBtn.classList.toggle("pointer-events-none", atEnd);
    }
  };

  const scrollLeft = () => {
    tabRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    tabRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <Layout>
      {/* ━━ HERO: Dark with large type ━━ */}
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
                    <span className="text-3xl font-bold text-secondary-foreground">9+</span>
                    <p className="text-secondary-foreground/50 text-sm mt-1">Core Processes</p>
                  </div>
                  <div className="border-l-2 border-primary pl-4">
                    <span className="text-3xl font-bold text-secondary-foreground">100%</span>
                    <p className="text-secondary-foreground/50 text-sm mt-1">Quality Tracked</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ SERVICE LIST ━━ */}
      <section className="py-14 lg:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">

          {/* Tab bar with inline arrows (desktop only) */}
          <div className="relative flex items-center gap-2">
            {/* Left arrow — hidden at start */}
            <button
              onClick={scrollLeft}
              id="arrow-left"
              className="hidden md:flex shrink-0 w-9 h-9 items-center justify-center rounded-full
                bg-gradient-to-br from-yellow-300 to-yellow-500 text-black border border-yellow-400
                shadow-md hover:shadow-lg hover:from-yellow-400 hover:to-yellow-600 transition
                opacity-0 pointer-events-none"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Scrollable tabs — finger-scrollable on mobile, arrow-scrollable on desktop */}
            <div
              ref={tabRef}
              onScroll={handleScroll}
              className="flex gap-4 overflow-x-auto flex-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <style>{`div::-webkit-scrollbar { display: none; }`}</style>
              {services.map((s) => {
                const isActive = s.key === active;
                return (
                  <button
                    key={s.key}
                    onClick={() => setActive(s.key as ServiceKey)}
                    className={[
                      "h-12 md:h-14 px-4 md:px-6 text-sm md:text-base font-medium whitespace-nowrap border-b-2 transition shrink-0",
                      isActive
                        ? "text-black border-yellow-400 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-md shadow-sm"
                        : "text-muted-foreground border-transparent hover:text-foreground",
                    ].join(" ")}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>

            {/* Right arrow — hidden when at end */}
            <button
              onClick={scrollRight}
              id="arrow-right"
              className="hidden md:flex shrink-0 w-9 h-9 items-center justify-center rounded-full
                bg-gradient-to-br from-yellow-300 to-yellow-500 text-black border border-yellow-400
                shadow-md hover:shadow-lg hover:from-yellow-400 hover:to-yellow-600 transition"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Content */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* LEFT */}
            <div>
              <h3 className="text-2xl md:text-4xl font-bold text-foreground">{data.title}</h3>
              <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
                {data.description}
              </p>
            </div>
            {/* RIGHT */}
            <div className="flex justify-center md:justify-end">
              <div className="w-full md:w-[70%] aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ DETAIL CARDS ━━ */}
      <section className="py-16 lg:py-18">
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
                  Every project follows a structured workflow from planning through delivery,
                  ensuring precision and compliance at each stage.
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
                        i % 2 === 0 ? "bg-primary/10 text-primary" : "bg-primary/20 text-primary"
                      }`}
                    >
                      {card.highlight}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-3">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ CTA ━━ */}
      <section className="section-dark py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="heading-section mb-4">Ready to Get Started?</h2>
            <p className="text-secondary-foreground/50 max-w-xl mx-auto mb-8">
              Contact us to discuss your manufacturing requirements and how our services can
              support your production needs.
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
