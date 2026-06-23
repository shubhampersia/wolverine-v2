import type { LucideIcon } from "lucide-react";
import {
  Car,
  Fuel,
  Droplets,
  Truck,
  Tractor,
  HardHat,
  Syringe,
  Plane,
  Zap,
  Waves,
  Shield,
  Gauge,
  Grid3X3,
  Wrench,
  Flower2,
  Package,
} from "lucide-react";

export type IndustryKey =
  | "automotive"
  | "engine-oil-cooling"
  | "oil-gas-equipment"
  | "commercial-vehicles"
  | "agricultural-equipment"
  | "construction-equipment"
  | "medical-components"
  | "aerospace"
  | "electrical-power"
  | "consumer-appliance"
  | "electrical-cabinets"
  | "pumps-compressors"
  | "industrial-racks"
  | "hardware-fasteners"
  | "lawn-garden"
  | "packaging-equipment";

export interface IndustryItem {
  key: IndustryKey;
  name: string;
  description: string;
  details: string[];
  icon: LucideIcon;
}

export const industries: IndustryItem[] = [
  {
    key: "automotive",
    name: "Automotive",
    description:
      "Precision tubular assemblies for automotive cooling, fuel, and engine systems.",
    details: [
      "Components designed for OEM-level durability and fit.",
      "Applications include coolant circuits, fuel delivery, and emissions systems.",
      "Manufacturing controls tuned for automotive quality standards.",
    ],
    icon: Car,
  },
  {
    key: "engine-oil-cooling",
    name: "Engine Oil Cooling",
    description:
      "Specialized tube assemblies for oil cooler circuits in engine and transmission systems.",
    details: [
      "Precise forming for compact oil cooler routing.",
      "Compatible with coolant and lubricant handling systems.",
      "Built to support consistent thermal performance.",
    ],
    icon: Fuel,
  },
  {
    key: "oil-gas-equipment",
    name: "Oil & Gas Equipment",
    description:
      "Fabrication of tubular components for oil, gas, and hydraulic applications in demanding industrial environments.",
    details: [
      "Designed for pressure integrity and long-term reliability.",
      "Suitable for flow control and piping assemblies.",
      "Manufactured to meet industry inspection and traceability needs.",
    ],
    icon: Droplets,
  },
  {
    key: "commercial-vehicles",
    name: "Commercial Vehicles",
    description:
      "Tube bending and assembly solutions for heavy trucks, fleet vehicles, and transport equipment.",
    details: [
      "Parts engineered for rugged service cycles.",
      "Applications include exhaust, fuel, and pneumatic systems.",
      "Production supports batch consistency for fleet programs.",
    ],
    icon: Truck,
  },
  {
    key: "agricultural-equipment",
    name: "Agricultural Equipment",
    description:
      "Manufacturing for agricultural machinery components that require durable tubular assemblies.",
    details: [
      "Formed tubes for hydraulics, fuel, and structural assemblies.",
      "Built to withstand vibration and outdoor environments.",
      "Quality controls oriented around field reliability.",
    ],
    icon: Tractor,
  },
  {
    key: "construction-equipment",
    name: "Construction Equipment",
    description:
      "Tubular manufacturing services for construction machinery and heavy equipment systems.",
    details: [
      "Robust components for hydraulic and structural use.",
      "Fabricated to withstand industrial wear and tear.",
      "Manufactured to align with demanding construction application standards.",
    ],
    icon: HardHat,
  },
  {
    key: "medical-components",
    name: "Medical Components",
    description:
      "Precision tube components for medical devices, instrumentation, and healthcare equipment.",
    details: [
      "Tight tolerances for critical medical applications.",
      "Controlled cleaning and assembly practices.",
      "Suitable for components requiring consistent traceability.",
    ],
    icon: Syringe,
  },
  {
    key: "aerospace",
    name: "Aerospace",
    description:
      "Tube bending and assembly for aerospace systems requiring high integrity and dimensional precision.",
    details: [
      "Precision forming for aerospace fluid and structural systems.",
      "Manufactured with a focus on repeatability and documentation.",
      "Compatible with stringent aerospace supply chain requirements.",
    ],
    icon: Plane,
  },
  {
    key: "electrical-power",
    name: "Electrical Power",
    description:
      "Components for electrical power systems, switchgear, and energy distribution products.",
    details: [
      "Fabrication for cable trays, busducts, and electrical modules.",
      "Designed to meet safe installation and routing needs.",
      "Supports manufacturing of power distribution assemblies.",
    ],
    icon: Zap,
  },
  {
    key: "consumer-appliance",
    name: "Consumer Appliance",
    description:
      "Tubular assemblies for household and commercial appliances requiring dependable fit and finish.",
    details: [
      "Manufactured for repeatable assembly performance.",
      "Suitable for appliance cooling, fuel, and fluid handling parts.",
      "Quality-controlled for consistent end-use function.",
    ],
    icon: Waves,
  },
  {
    key: "electrical-cabinets",
    name: "Electrical Cabinets",
    description:
      "Manufacturing of components for electrical cabinets, enclosures, and control panels.",
    details: [
      "Precision components for internal routing and mounting.",
      "Compatible with cabinet assembly and safety indexing.",
      "Produced in accordance with electrical enclosure requirements.",
    ],
    icon: Shield,
  },
  {
    key: "pumps-compressors",
    name: "Pumps & Compressors",
    description:
      "Fabrication of tubular parts used in pumps, compressors, and fluid-handling machinery.",
    details: [
      "Components designed for reliable fluid conveyance.",
      "Suitable for pressure and vacuum service.",
      "Manufactured to support equipment performance and longevity.",
    ],
    icon: Gauge,
  },
  {
    key: "industrial-racks",
    name: "Industrial Racks",
    description:
      "Structural and fluid handling components for industrial racking, storage, and process systems.",
    details: [
      "Formed parts for support, routing, and bracketing.",
      "Built to integrate with industrial production systems.",
      "Designed for long-life service in manufacturing environments.",
    ],
    icon: Grid3X3,
  },
  {
    key: "hardware-fasteners",
    name: "Hardware & Fasteners",
    description:
      "Manufacturing support for hardware, fasteners, and small mechanical assemblies.",
    details: [
      "Components produced for assembly accuracy and fit.",
      "Suitable for brackets, clips, and fastening systems.",
      "Inspection ensures consistency for repeat applications.",
    ],
    icon: Wrench,
  },
  {
    key: "lawn-garden",
    name: "Lawn & Garden",
    description:
      "Tubular parts for garden machinery, outdoor equipment, and landscaping systems.",
    details: [
      "Designed for outdoor durability and functional reliability.",
      "Applicable to irrigation, mower, and equipment assemblies.",
      "Manufactured for robust field performance.",
    ],
    icon: Flower2,
  },
  {
    key: "packaging-equipment",
    name: "Packaging Equipment",
    description:
      "Components for packaging machinery and automated handling systems.",
    details: [
      "Formed parts for conveyors, guides, and product handling.",
      "Built to support reliable packaging line operation.",
      "Produced for consistent assembly integration.",
    ],
    icon: Package,
  },
];

export const industryContent: Record<IndustryKey, IndustryItem> = industries.reduce(
  (acc, item) => {
    acc[item.key] = item;
    return acc;
  },
  {} as Record<IndustryKey, IndustryItem>
);
