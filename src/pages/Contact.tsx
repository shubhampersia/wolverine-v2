import Layout from "@/components/Layout";
import { FadeIn } from "@/components/Animations";
import { Phone, MapPin, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import PhoneInput from "@/components/PhoneInput";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.description.trim()) newErrors.description = "Description is required";

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
          firstName: form.firstName,
          secondName: form.secondName,
          email: form.email,
          mobile: form.phone,
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
      {/* ━━ HERO: Gold band header ━━ */}
      <section className="section-gold py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="numbered-label mb-6">
              <span className="num">01</span> Get in Touch
            </div>
            <h1 className="heading-display mb-4">Contact Us</h1>
            <p className="text-primary-foreground/70 text-lg max-w-xl">
              Reach out to our team for support, inquiries, or project
              discussions.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ━━ CONTACT CARDS: Dark cards on white ━━ */}
      <section className="py-12 -mt-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            {[
              { icon: Phone, label: "CALL US", value: "9986094599" },
              {
                icon: MapPin,
                label: "ADDRESS",
                value:
                  "A-36/2, Oragadam, 5th Cross Road, SIPCOT Industrial Park,\nSriperumbudur, Kancheepuram, Tamil Nadu, India - 602105",
              },
              { icon: Mail, label: "EMAIL US", value: "ed@wtube.co" },
            ].map((item) => (
              <FadeIn key={item.label} className="h-full">
<div className="card-dark flex items-center  gap-4 h-full py-5">                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <item.icon size={20} className="text-primary-foreground" />
                  </div>
                  <div className="max-w-xs">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm text-secondary-foreground whitespace-pre-line leading-relaxed">
                      {item.value}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ FORM: Striped background with bordered form ━━ */}
      <section className="section-stripe section-breath">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-12 gap-8 lg:gap-16">
            <div className="col-span-12 lg:col-span-4">
              <FadeIn>
                <div className="numbered-label mb-6">
                  <span className="num">02</span> Inquiry
                </div>
                <h2 className="heading-section mb-4">Submit an Inquiry</h2>
                <div className="divider-gold mb-6" />
                <p className="text-muted-foreground leading-relaxed">
                  Have a project requirement or a technical question? Get in
                  touch with us and our team will respond.
                </p>
              </FadeIn>
            </div>

            <div className="col-span-12 lg:col-span-8">
              <FadeIn delay={0.1}>
                <form
                  onSubmit={handleSubmit}
                  className="card-bordered bg-background !p-8 lg:!p-10 space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="label-utility mb-2 block">First Name</label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        placeholder="Enter your first name"
                        className="w-full h-11 px-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                      />
                      {errors.firstName && (
                        <span className="text-xs text-red-500 mt-1 block">{errors.firstName}</span>
                      )}
                    </div>
                    <div>
                      <label className="label-utility mb-2 block">Second Name</label>
                      <input
                        type="text"
                        value={form.secondName}
                        onChange={(e) => setForm({ ...form, secondName: e.target.value })}
                        placeholder="Enter your second name"
                        className="w-full h-11 px-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="label-utility mb-2 block">Email Address</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="Enter your email address"
                        className="w-full h-11 px-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                      />
                      {errors.email && (
                        <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>
                      )}
                    </div>
<PhoneInput
  value={form.phone}
  onChange={(val) => setForm({ ...form, phone: val })}
/>
                  </div>

                  <div>
                    <label className="label-utility mb-2 block">Description</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Enter your description in detail"
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none transition-shadow"
                    />
                    {errors.description && (
                      <span className="text-xs text-red-500 mt-1 block">{errors.description}</span>
                    )}
                  </div>

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
                        ✗ Something went wrong. Please try again or email us at ed@wtube.co
                      </p>
                    )}
                  </div>
                </form>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
