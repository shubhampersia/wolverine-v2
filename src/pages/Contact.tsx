import Layout from "@/components/Layout";
import { FadeIn } from "@/components/Animations";
import { Phone, MapPin, Mail, ArrowRight, PhoneCall } from "lucide-react";
import { useState } from "react";
import PhoneInput from "@/components/PhoneInput";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const [form, setForm] = useState({
    firstName: "",
    secondName: "",
    email: "",
    phone: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Clear individual field error as soon as user types
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.firstName.trim())   newErrors.firstName   = "First name is required";
    if (!form.secondName.trim())  newErrors.secondName  = "Second name is required";
    if (!form.email.trim())       newErrors.email       = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
                                  newErrors.email       = "Enter a valid email address";
    if (!form.phone.trim())       newErrors.phone       = "Mobile number is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/send-email.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName:   form.firstName,
          secondName:  form.secondName,
          email:       form.email,
          mobile:      form.phone,
          description: form.description,
        }),
      });

      const result = await res.json();

      if (result.success) {
        setSubmitStatus("success");
        setForm({ firstName: "", secondName: "", email: "", phone: "", description: "" });
        setErrors({});
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
<Helmet>
  <title>Contact Us | WLVTEC</title>

  <meta
    name="description"
    content="Contact WLVTEC for inquiries regarding tube bending and tubular assembly manufacturing solutions."
  />

  <link
    rel="canonical"
    href="https://wlvtec.com/contact"
  />

  <script type="application/ld+json">{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://wlvtec.com/" },
    { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://wlvtec.com/contact" }
  ]
})}</script>

<script type="application/ld+json">{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What tube diameters can WLVTEC bend?",
      "acceptedAnswer": { "@type": "Answer", "text": "Up to Ø38 mm via 5-axis CNC bending." }
    }
  ]
})}</script>
</Helmet>
      {/* ━━ HERO: Gold band header ━━ */}
      <section className="section-gold py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-11 h-11 rounded-full border border-primary-foreground/30 flex items-center justify-center text-primary-foreground">
                <PhoneCall size={16} />
              </div>
              <h1 className="heading-display">Contact Us</h1>
            </div>
            <p className="text-primary-foreground/70 text-lg max-w-xl">
              Reach out to our team for support, inquiries, or project
              discussions.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ━━ FORM: Striped background with bordered form ━━ */}
      <section className="section-stripe py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-12 gap-6 lg:gap-8">
            <div className="col-span-12 lg:col-span-4 flex items-center">
              <FadeIn>
                <div>
                  <h1 className="heading-section mb-3 text-[2.8rem] lg:text-[3.4rem]">Submit an Inquiry</h1>
                  <div className="divider-gold mb-5" />
                  <p className="text-muted-foreground leading-relaxed max-w-sm">
                    Have a project requirement or a technical question? Get in
                    touch with us and our team will respond.
                  </p>
                </div>
              </FadeIn>
            </div>

            <div className="col-span-12 lg:col-span-8">
              <FadeIn delay={0.1}>
                <form
                  onSubmit={handleSubmit}
                  className="card-bordered bg-background p-6 md:p-8 lg:p-10 space-y-5"
                >
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="label-utility mb-2 block">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        placeholder="Enter your first name"
                        className={`w-full h-11 px-4 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow ${
                          errors.firstName ? "border-red-400" : "border-input"
                        }`}
                      />
                      {errors.firstName && (
                        <span className="text-xs text-red-500 mt-1 block">{errors.firstName}</span>
                      )}
                    </div>
                    <div>
                      <label className="label-utility mb-2 block">
                        Second Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.secondName}
                        onChange={(e) => handleChange("secondName", e.target.value)}
                        placeholder="Enter your second name"
                        className={`w-full h-11 px-4 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow ${
                          errors.secondName ? "border-red-400" : "border-input"
                        }`}
                      />
                      {errors.secondName && (
                        <span className="text-xs text-red-500 mt-1 block">{errors.secondName}</span>
                      )}
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="label-utility mb-2 block">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="Enter your email address"
                        className={`w-full h-11 px-4 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow ${
                          errors.email ? "border-red-400" : "border-input"
                        }`}
                      />
                      {errors.email && (
                        <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>
                      )}
                    </div>
                    <div>
                      {/* PhoneInput renders its own label "Mobile Number" */}
                      <PhoneInput
                        value={form.phone}
                        onChange={(val) => handleChange("phone", val)}
                        error={errors.phone}
                        required
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="label-utility mb-2 block">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={form.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      placeholder="Enter your description in detail"
                      rows={5}
                      className={`w-full px-4 py-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none transition-shadow ${
                        errors.description ? "border-red-400" : "border-input"
                      }`}
                    />
                    {errors.description && (
                      <span className="text-xs text-red-500 mt-1 block">{errors.description}</span>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="space-y-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary disabled:opacity-60"
                    >
                      {isSubmitting ? "Sending..." : "Submit"} <ArrowRight size={16} />
                    </button>

                    {submitStatus === "success" && (
                      <p className="text-sm text-green-600 font-medium">
                        ✓ Inquiry submitted! We'll get back to you soon.
                      </p>
                    )}
                    {submitStatus === "error" && (
                      <p className="text-sm text-red-500 font-medium">
                        ✗ Something went wrong. Please try again or email us directly.
                      </p>
                    )}
                  </div>
                </form>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ CONTACT CARDS + MAP ━━ */}
      <section className="section-stripe py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 items-center">

            {/* Left Cards */}
            <div className="space-y-4">
              {[
                {
                  icon: Phone,
                  label: "CALL US",
                  value: "9986094599",
                },
                {
                  icon: MapPin,
                  label: "ADDRESS",
                  value: `A-36/2, Oragadam, 5th Cross Road, SIPCOT Industrial Park, Sriperumbudur, Kancheepuram, 
                  Tamil Nadu, India - 602105`,
                },
                {
                  icon: Mail,
                  label: "EMAIL US",
                  value: "ed@wtube.co",
                },
              ].map((item) => (
                <FadeIn key={item.label}>
                  <div className="card-dark flex items-center gap-5 rounded-[28px] py-5 px-4 shadow-sm">
                    
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-sm">
                      <item.icon
                        size={22}
                        className="text-primary-foreground"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-1">
                        {item.label}
                      </p>

                      <p className="text-sm md:text-base text-secondary-foreground whitespace-pre-line leading-relaxed">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Google Map */}
            <FadeIn>
              <div className="rounded-[28px] overflow-hidden border border-border bg-background shadow-sm w-full">
                <iframe
                  title="WLVTEC location"
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3889.860979422892!2d79.9348832750744!3d12.85225438745223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDUxJzA4LjEiTiA3OcKwNTYnMTQuOSJF!5e0!3m2!1sen!2sin!4v1782410450604!5m2!1sen!2sin"
                  width="100%"
                  height="390"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </FadeIn>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
