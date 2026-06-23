export type ServiceKey =
  | "bending"
  | "end"
  | "bead"
  | "cutting"
  | "stamping"
  | "cleaning"
  | "assembly"
  | "surface";

export interface ServiceItem {
  key: ServiceKey;
  label: string;
  title: string;
  description: string;
  image: string;
  details: string[];
}

export const services: ServiceItem[] = [
  {
    key: "bending",
    label: "CNC Bending (5-Axis)",
    title: "CNC Bending (5-Axis)",
    description:
      "Precision bending of tubes up to Ø38 mm diameter, enabling complex multi-plane bends through five-axis CNC control. The process delivers high accuracy, repeatability, and consistent dimensional performance.",
    image: "/axis.jpeg",
    details: [
      "Advanced 5-axis control for complex multi-plane bends.",
      "Repeatable accuracy and tight dimensional control.",
      "Suitable for production runs requiring high consistency.",
    ],
  },
  {
    key: "end",
    label: "End Forming",
    title: "End Forming",
    description:
      "Tube-end forming operations including expansion, reduction, flaring, beading, and necking. Interchangeable tooling allows a range of end profiles to be produced according to engineering specifications.",
    image: "/end.png",
    details: [
      "Flexible tooling for multiple end-form profiles.",
      "Precision expansion, reduction, flaring, and necking.",
      "Engineered to meet customer assembly requirements.",
    ],
  },
  {
    key: "bead",
    label: "Beading",
    title: "Beading",
    description:
      "Formation of uniform bead profiles on tubes to support hose retention and assembly requirements. The process ensures consistent dimensions, secure fitment, and reliable performance.",
    image: "/bead.png",
    details: [
      "Uniform bead geometry for reliable hose retention.",
      "Consistent dimensions across production batches.",
      "Designed for secure assembly and fitment control.",
    ],
  },
  {
    key: "cutting",
    label: "Flame Brazing",
    title: "Flame Brazing",
    description:
      "Joining of metallic tube assemblies using oxygen and acetylene heating with brazing filler material. Suitable for copper, brass, steel, and other metal components requiring strong, leak-proof joints.",
    image: "/flame.jpeg",
    details: [
      "Oxygen-acetylene flame brazing for metallic assemblies.",
      "Controlled heat input ensures strong joints.",
      "Ideal for leak-proof and durable tube connections.",
    ],
  },
  {
    key: "stamping",
    label: "Induction Brazing",
    title: "Induction Brazing",
    description:
      "High-frequency induction heating for precise brazing of metallic components. The method provides localized heating, consistent joint quality, and reduced oxidation during production.",
    image: "/induction.PNG",
    details: [
      "Localized heating for consistent joint quality.",
      "Reduced oxidation and clean brazed surfaces.",
      "Suitable for precision assemblies and small batches.",
    ],
  },
  {
    key: "cleaning",
    label: "Ultrasonic Cleaning",
    title: "Ultrasonic Cleaning",
    description:
      "Removal of oil, grease, dirt, and machining contaminants using ultrasonic cleaning and alkaline degreasing solutions. Suitable for fabricated parts, tubes, and assemblies with complex geometries.",
    image: "/ultrasonic.png",
    details: [
      "Ultrasonic agitation removes contaminants from complex parts.",
      "Alkaline degreasing solutions for thorough cleaning.",
      "Well suited for tubes, assemblies, and precision components.",
    ],
  },
  {
    key: "assembly",
    label: "Assembly",
    title: "Assembly",
    description:
      "Assembly of components as per approved drawings and work instructions, with verification of fitment, alignment, and assembly quality before release to subsequent operations.",
    image: "/assembly.jpg",
    details: [
      "Component assembly according to customer drawings.",
      "Fitment and alignment verification before release.",
      "Quality checks integrated into every production step.",
    ],
  },
  {
    key: "surface",
    label: "Post-Process Surface Treatment",
    title: "Post-Process Surface Treatment",
    description:
      "Surface treatment of fabricated components to improve cleanliness, corrosion resistance, appearance, and surface characteristics. Treatments are selected based on material specifications, functional requirements, and end-use application standards.",
    image: "/surface.jpg",
    details: [
      "Surface conditioning for improved corrosion resistance.",
      "Enhanced cleanliness and finished appearance.",
      "Treatments selected based on material and application needs.",
    ],
  },
];

export const serviceContent: Record<ServiceKey, ServiceItem> = services.reduce(
  (acc, item) => {
    acc[item.key] = item;
    return acc;
  },
  {} as Record<ServiceKey, ServiceItem>
);
