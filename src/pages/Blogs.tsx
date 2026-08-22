import Layout from "@/components/Layout";
import { FadeIn, StaggerContainer } from "@/components/Animations";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { blogs } from "@/data/blogs";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const Blogs = () => {
  return (
    <Layout>
      <Helmet>
        <title>Blog | WLVTEC</title>

        <meta
          name="description"
          content="Insights on tube bending, automotive sourcing, and precision manufacturing from the WLVTEC team."
        />

        <link rel="canonical" href="https://wlvtec.com/blog" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://wlvtec.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://wlvtec.com/blog",
              },
            ],
          })}
        </script>
      </Helmet>

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
          <FadeIn>
            <div className="numbered-label mb-6">
              <span className="num">01</span> Insights
            </div>

            <h1 className="heading-display mb-6">Blog</h1>

            <div className="divider-gold mb-8" />

            <p className="text-secondary-foreground/60 max-w-2xl text-lg leading-relaxed">
              Practical guidance on sourcing, tube bending, and precision
              manufacturing — written for engineering and procurement teams.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ━━ BLOG GRID ━━ */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogs.map((post, i) => (
              <FadeIn key={post.key} delay={i * 0.06}>
                <Link
                  to={`/blog/${post.key}`}
                  className="
                    group
                    h-full
                    flex
                    flex-col
                    rounded-2xl
                    border
                    border-border
                    overflow-hidden
                    bg-background
                    hover:border-primary/40
                    hover:-translate-y-1
                    transition-all
                    duration-300
                    shadow-sm
                    hover:shadow-lg
                  "
                >
                  <div className="p-6 flex flex-col flex-1">

                    {/* CATEGORY + READ TIME */}
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="
                          inline-flex
                          items-center
                          rounded-full
                          bg-secondary
                          px-4
                          py-1.5
                          text-xs
                          font-bold
                          uppercase
                          tracking-wider
                          text-primary
                        "
                      >
                        {post.category}
                      </span>

                      <span className="w-1 h-1 rounded-full bg-primary/50" />

                      <span
                        className="
                          text-muted-foreground
                          text-sm
                          font-medium
                        "
                      >
                        {post.readTime}
                      </span>
                    </div>

                    {/* TITLE */}
                    <h2
                      className="
                        font-bold
                        text-lg
                        leading-snug
                        mb-3
                        text-foreground
                        transition-none
                      "
                    >
                      {post.title}
                    </h2>

                    {/* DESCRIPTION */}
                    <p
                      className="
                        text-muted-foreground
                        text-sm
                        leading-relaxed
                        line-clamp-3
                        mb-6
                      "
                    >
                      {post.tldr}
                    </p>

                    {/* DATE + READ MORE */}
                    <div className="mt-auto flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {formatDate(post.date)}
                      </span>

                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1
                          font-semibold
                          text-primary
                        "
                      >
                        Read more

                        <ArrowRight
                          size={14}
                          className="
                            group-hover:translate-x-1
                            transition-transform
                          "
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ━━ CTA ━━ */}
      <section className="section-dark py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="heading-section mb-4">
              Have a Sourcing Requirement?
            </h2>

            <p className="text-secondary-foreground/50 max-w-xl mx-auto mb-8">
              Talk to our team about tube bending, fabrication, and tubular
              assembly for your next programme.
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

export default Blogs;