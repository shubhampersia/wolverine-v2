import Layout from "@/components/Layout";
import { FadeIn } from "@/components/Animations";
import { Phone, MapPin, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ firstName: "", secondName: "", email: "", phone: "", description: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Inquiry submitted successfully!");
    setForm({ firstName: "", secondName: "", email: "", phone: "", description: "" });
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Phone, label: "CALL US", value: "9986094599" },
              {
                icon: MapPin,
                label: "ADDRESS",
                value:
                  "1625 Sonny Schulz Blvd Suites,\nStevensville, Maryland 21666",
              },
              { icon: Mail, label: "EMAIL US", value: "ed@wtube.co" },
            ].map((item) => (
              <FadeIn key={item.label}>
                <div className="card-dark flex items-start gap-4 h-[110px]">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <item.icon size={20} className="text-primary-foreground" />
                  </div>

                  <div className="max-w-xs">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                      {item.label}
                    </p>

                    <p className="text-sm text-secondary-foreground whitespace-pre-line leading-relaxed line-clamp-2">
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
                      <label className="label-utility mb-2 block">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) =>
                          setForm({ ...form, firstName: e.target.value })
                        }
                        placeholder="Enter your first name"
                        className="w-full h-11 px-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                        required
                      />
                    </div>
                    <div>
                      <label className="label-utility mb-2 block">
                        Second Name
                      </label>
                      <input
                        type="text"
                        value={form.secondName}
                        onChange={(e) =>
                          setForm({ ...form, secondName: e.target.value })
                        }
                        placeholder="Enter your second name"
                        className="w-full h-11 px-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="label-utility mb-2 block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        placeholder="Enter your email address"
                        className="w-full h-11 px-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                        required
                      />
                    </div>
                    <div>
                      <label className="label-utility mb-2 block">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        placeholder="Enter your number"
                        className="w-full h-11 px-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label-utility mb-2 block">
                      Description
                    </label>
                    <textarea
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      placeholder="Enter your description in detail"
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none transition-shadow"
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary">
                    Submit <ArrowRight size={16} />
                  </button>
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
