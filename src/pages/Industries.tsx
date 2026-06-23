import Layout from "@/components/Layout";
import { FadeIn, StaggerContainer } from "@/components/Animations";
import {
  Car, Fuel, Droplets, Truck, Tractor, HardHat, Syringe, Plane,
  Zap, Waves, Shield, Gauge, Grid3X3, Wrench, Flower2, Package,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const industries = [
  { name: "Automotive", icon: Car },
  { name: "Engine Oil Cooling", icon: Fuel },
  { name: "Oil & Gas Equipment", icon: Droplets },
  { name: "Commercial Vehicles", icon: Truck },
  { name: "Agricultural Equipment", icon: Tractor },
  { name: "Construction Equipment", icon: HardHat },
  { name: "Medical Components", icon: Syringe },
  { name: "Aerospace", icon: Plane },
  { name: "Electrical Power", icon: Zap },
  { name: "Consumer Appliance", icon: Waves },
  { name: "Electrical Cabinets", icon: Shield },
  { name: "Pumps & Compressors", icon: Gauge },
  { name: "Industrial Racks", icon: Grid3X3 },
  { name: "Hardware & Fasteners", icon: Wrench },
  { name: "Lawn & Garden", icon: Flower2 },
  { name: "Packaging Equipment", icon: Package },
];

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
              <FadeIn key={ind.name}>
                <div className="rounded-2xl border border-secondary-foreground/10 p-6 flex flex-col items-center text-center gap-4 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <ind.icon size={28} className="text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="font-semibold text-sm text-secondary-foreground">{ind.name}</span>
                </div>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </Layout>
  );
};

export default Industries;
