import Layout from "@/components/Layout";
import { FadeIn } from "@/components/Animations";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy | WLVTEC</title>

        <meta
          name="description"
          content="Read Wolverine's privacy policy to understand how we collect, use, and protect your information."
        />

        <link rel="canonical" href="https://www.wlvtec.com/privacy-policy" />

        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.wlvtec.com/" },
            { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://www.wlvtec.com/privacy-policy" }
          ]
        })}</script>
      </Helmet>

      <section className="px-4 sm:px-6 md:px-[2%] pt-[15px] sm:pt-[18px] pb-[15px] sm:pb-[18px] mb-[clamp(16px,2.5vh,32px)]">
        <div className="max-w-[1500px] mx-auto rounded-3xl overflow-hidden bg-secondary p-10 lg:p-14">
          <FadeIn>
            <div className="numbered-label text-primary mb-6">
              <span className="num">01</span> Legal
            </div>
            <h1 className="heading-display text-secondary-foreground text-3xl lg:text-4xl mb-4">
              Privacy Policy
            </h1>
            <div className="divider-gold mb-6" />
            <p className="text-secondary-foreground/60 leading-relaxed text-sm max-w-[560px]">
              Last updated: July 2026
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pt-6 pb-16 lg:py-14">
        <div className="max-w-4xl mx-auto px-6 space-y-10 text-sm leading-relaxed text-foreground/80">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">Information We Collect</h2>
            <p>
              When you contact us through our website, request a quote, or apply for a
              position, we may collect information such as your name, email address,
              phone number, company name, and any details you choose to share with us.
              We do not collect this information for any purpose beyond responding to
              your inquiry.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">How We Use Your Information</h2>
            <p>
              Information submitted through our contact and career forms is used solely
              to respond to your inquiry, evaluate your application, or fulfil a request
              for information about our products and services. We do not sell, rent, or
              trade your personal information to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">Cookies &amp; Analytics</h2>
            <p>
              Our website may use cookies and similar technologies, including analytics
              tools, to understand how visitors use our site and to improve the
              browsing experience. You can control or disable cookies through your
              browser settings at any time.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">Data Security</h2>
            <p>
              We take reasonable technical and organizational measures to protect the
              information you share with us from unauthorized access, alteration, or
              disclosure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices or content of those external sites.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or how your
              information is handled, please reach out to us through our{" "}
              <a href="/contact" className="text-primary underline underline-offset-4">
                Contact page
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
