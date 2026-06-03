import Layout from "@/components/Layout";
import { FadeIn } from "@/components/Animations";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import aboutImg from "@/assets/about-facility.jpg";

const careerImages = [
  "/career/1.jpeg",
  "/career/2.jpeg",
  "/career/3.jpeg",
  "/career/4.jpeg",
  "/career/5.jpeg",
  "/career/6.jpeg",
];

const About = () => {
  return (
    <Layout>
      {/* ━━ HERO: Split — dark left, image right ━━ */}
      {/* ━━ HERO: Split — dark left, image right ━━ */}
      <section className="px-4 sm:px-6 md:px-[2%] pt-[15px] sm:pt-[18px] mb-[clamp(16px,2.5vh,32px)]">
        <div className="max-w-[1500px] mx-auto rounded-3xl overflow-hidden h-[80vh] sm:h-[85vh] md:h-[90vh]">
          <div className="grid grid-cols-12 gap-0 h-full">
            {/* Left Content */}
            <div className="col-span-12 lg:col-span-5 bg-secondary p-10 lg:p-14 flex flex-col justify-center">
              <FadeIn>
                <div className="numbered-label text-primary mb-6">
                  <span className="num">01</span> About Us
                </div>

                <h1 className="heading-display text-secondary-foreground text-3xl lg:text-4xl mb-6">
                  Built for Precision
                </h1>

                <div className="divider-gold mb-6" />

                <p className="text-secondary-foreground/60 leading-relaxed text-sm max-w-[420px]">
                  Founded in 2018, a subsidiary of MMI, Wolverine operates as a
                  manufacturing and supply-chain partner for global OEMs.
                </p>
              </FadeIn>
            </div>

            {/* Right Image */}
            <div className="col-span-12 lg:col-span-7 h-full">
              <FadeIn delay={0.15}>
                <img
                  src={aboutImg}
                  alt="Wolverine facility"
                  className="w-full h-full object-cover"
                />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ DETAILS: Offset text on white ━━ */}
      <section className="py-20 lg:py-[8vh]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-12 gap-8 lg:gap-20">
            <div className="col-span-12 lg:col-span-6 lg:col-start-1">
              <FadeIn>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Manufacturing activities at the facility focus exclusively on
                  tube bending operations executed to customer drawings and
                  technical specifications. Production follows defined workflows
                  covering material identification, inspection, and
                  documentation.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  All systems are implemented in accordance with IATF-16949 and
                  ISO 9001:2015 standards and are certified under the Hyundai SQ
                  Mark, with controls established for traceability, inspection,
                  and production management.
                </p>
              </FadeIn>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:col-start-8">
              <FadeIn delay={0.1}>
                <div className="border-l-2 border-primary pl-6 space-y-6">
                  <div>
                    <p className="text-3xl font-bold text-foreground">
                      IATF-16949
                    </p>
                  </div>

                  <div>
                    <p className="text-3xl font-bold text-foreground">
                      ISO 9001:2015
                    </p>
                  </div>

                  <div>
                    <p className="text-3xl font-bold text-foreground">Global</p>
                    <p className="text-muted-foreground text-sm">
                      OEM Partnerships
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

{/* ━━ TEAM: Dark section with glass cards ━━ */}
<section className="section-dark section-breath">
  <div className="max-w-7xl mx-auto px-6">
    <FadeIn>
      <div className="numbered-label mb-6">
        <span className="num">02</span> Leadership
      </div>
      <h2 className="heading-section mb-12">About Our Team</h2>
    </FadeIn>

    <div className="space-y-6">
      {[
        {
          name: "Manjunath",
          role: "Executive Director",
          image: "/manju.png",
          bio: "21 years of experience in the Manufacturing industry. Started in 2005. Specialised in Mechanical Engineering, predominantly worked in Automobile Global OEMs. Has experience in Supply Chain, Production Management, Quality Assurance and Sales & Marketing.",
        },
        {
          name: "Jacob",
          role: "President",
          image: "/jacob.webp",
          bio: "Brings decades of leadership in precision manufacturing and global operations, driving Wolverine's mission to deliver consistently reliable industrial components.",
        },
      ].map((member, i) => (
        <FadeIn key={member.name} delay={i * 0.1}>
          <div className="grid grid-cols-12 gap-6 items-start p-6 lg:p-8 rounded-2xl border border-secondary-foreground/10 hover:border-primary/30 transition-colors">

            {/* Image */}
            <div className="col-span-12 md:col-span-3">
              <img
                src={member.image}
                alt={member.name}
                className="w-full aspect-square object-cover rounded-xl"
              />
            </div>

            {/* Content */}
            <div className="col-span-12 md:col-span-9 md:pt-2">
              <h3 className="font-bold text-xl text-secondary-foreground">
                {member.name}
              </h3>

              <p className="text-primary text-xs font-semibold uppercase tracking-wider mt-1 mb-4">
                {member.role}
              </p>

              <p className="text-secondary-foreground/60 leading-relaxed max-w-2xl">
                {member.bio}
              </p>
            </div>

          </div>
        </FadeIn>
      ))}
    </div>
  </div>
</section>

      {/* ━━ CAREERS: Gold band CTA ━━ */}
      <section className="section-breath">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="col-span-12 lg:col-span-6">
              <FadeIn>
                <h2 className="heading-section mb-4">Careers</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Build Your Career Within a Tube Bending Operation Focused on
                  Precision Forming, Process Control, and Manufacturing
                  Consistency.
                </p>
                <Link to="/contact" className="btn-primary">
                  Join Us <ArrowRight size={16} />
                </Link>
              </FadeIn>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <FadeIn delay={0.1}>
<div className="grid grid-cols-3 gap-3">
  {careerImages.map((image, i) => (
    <div
      key={i}
      className={`overflow-hidden rounded-xl ${
        i % 2 === 0 ? "aspect-[3/4]" : "aspect-square"
      }`}
    >
      <img
        src={image}
        alt={`Career ${i + 1}`}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />
    </div>
  ))}
</div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
