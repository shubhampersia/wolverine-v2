import Layout from "@/components/Layout";
import { FadeIn } from "@/components/Animations";
import { CheckCircle2, Home, RotateCcw } from "lucide-react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ThankYou = () => {
  const location = useLocation();
  const submitted = (location.state as { submitted?: boolean } | null)?.submitted;

  // If someone opens /thank-you directly (without submitting the form), send them to the form
  if (!submitted) {
    return <Navigate to="/contact" replace />;
  }

  return (
    <Layout>
      <Helmet>
        <title>Thank You | WLVTEC</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="section-stripe py-20 lg:py-28 min-h-[70vh] flex items-center">
        <div className="max-w-2xl mx-auto px-6 text-center w-full">
          <FadeIn>
            <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6 text-primary">
              <CheckCircle2 size={40} />
            </div>

            <h1 className="heading-section mb-3 text-[2.4rem] lg:text-[3rem]">
              Thank You!
            </h1>
            <div className="divider-gold mb-5 mx-auto" />

            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Your inquiry has been submitted successfully. Our team will get
              back to you shortly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/" className="btn-primary">
                <Home size={16} /> Back to Homepage
              </Link>
              <Link to="/contact" className="btn-ghost">
                <RotateCcw size={16} /> Submit Another Inquiry
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default ThankYou;