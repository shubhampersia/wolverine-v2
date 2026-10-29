import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "@/components/PhoneInput";

type Inquiry = {
  firstName: string;
  secondName: string;
  email: string;
  phone: string;
  description: string;
};

const emptyInquiry: Inquiry = {
  firstName: "",
  secondName: "",
  email: "",
  phone: "",
  description: "",
};

type Props = {
  description?: string;
};

const ContactCtaForm = ({
  description = "Share your project details and our team will get back to you.",
}: Props) => {
  const navigate = useNavigate();
  const [form, setForm] = useState<Inquiry>(emptyInquiry);
  const [errors, setErrors] = useState<Partial<Record<keyof Inquiry, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (field: keyof Inquiry, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => {
      if (!previous[field]) return previous;
      const next = { ...previous };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<Record<keyof Inquiry, string>> = {};
    if (!form.firstName.trim()) nextErrors.firstName = "First name is required";
    if (!form.secondName.trim()) nextErrors.secondName = "Second name is required";
    if (!form.email.trim()) nextErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address";
    }
    if (!form.phone.trim()) nextErrors.phone = "Mobile number is required";
    if (!form.description.trim()) nextErrors.description = "Description is required";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(false);
    try {
      const isLocalDev = ["localhost", "127.0.0.1", "0.0.0.0"].includes(
        window.location.hostname,
      );
      if (isLocalDev) {
        setForm(emptyInquiry);
        setErrors({});
        navigate("/thank-you", { state: { submitted: true } });
        return;
      }

      const response = await fetch("/send-email.php", {
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

      if (!response.headers.get("content-type")?.includes("application/json")) {
        throw new Error("Non-JSON response from email endpoint");
      }
      const result: { success?: boolean } = await response.json();
      if (!result.success) {
        setSubmitError(true);
        return;
      }

      setForm(emptyInquiry);
      setErrors({});
      navigate("/thank-you", { state: { submitted: true } });
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: keyof Inquiry) =>
    `h-11 w-full rounded-2xl border-2 bg-background px-4 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-primary ${
      errors[field] ? "border-red-400" : "border-primary"
    }`;

  return (
    <section className="section-dark relative overflow-hidden py-14 lg:py-20">
      <div className="pointer-events-none absolute -left-6 top-0 h-full w-24 -skew-x-[35deg] border-r border-primary/30" />
      <div className="pointer-events-none absolute -right-6 top-0 h-full w-24 skew-x-[35deg] border-l border-primary/50" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <div>
          <h2 className="mb-5 text-4xl font-extrabold leading-tight text-secondary-foreground lg:text-5xl">
            Let&apos;s Talk About <span className="text-primary">Your Requirements</span>
          </h2>
          <div className="divider-gold mb-7" />
          <p className="max-w-sm text-secondary-foreground/70 leading-relaxed">{description}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5 rounded-[28px] bg-background p-6 text-foreground shadow-xl md:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="label-utility !text-foreground mb-2 block" htmlFor="cta-first-name">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                id="cta-first-name"
                required
                value={form.firstName}
                onChange={(event) => handleChange("firstName", event.target.value)}
                placeholder="Enter your first name"
                className={inputClass("firstName")}
              />
              {errors.firstName && <span className="mt-1 block text-xs text-red-500">{errors.firstName}</span>}
            </div>
            <div>
              <label className="label-utility !text-foreground mb-2 block" htmlFor="cta-second-name">
                Second Name <span className="text-red-500">*</span>
              </label>
              <input
                id="cta-second-name"
                required
                value={form.secondName}
                onChange={(event) => handleChange("secondName", event.target.value)}
                placeholder="Enter your second name"
                className={inputClass("secondName")}
              />
              {errors.secondName && <span className="mt-1 block text-xs text-red-500">{errors.secondName}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="label-utility !text-foreground mb-2 block" htmlFor="cta-email">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="cta-email"
                type="email"
                required
                value={form.email}
                onChange={(event) => handleChange("email", event.target.value)}
                placeholder="Enter your email address"
                className={inputClass("email")}
              />
              {errors.email && <span className="mt-1 block text-xs text-red-500">{errors.email}</span>}
            </div>
            <PhoneInput
              value={form.phone}
              onChange={(value) => handleChange("phone", value)}
              error={errors.phone}
              labelClassName="!text-foreground"
              containerClassName="!h-11 !rounded-2xl !border-2 !border-primary"
              inputClassName="text-sm"
            />
          </div>

          <div>
            <label className="label-utility !text-foreground mb-2 block" htmlFor="cta-description">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="cta-description"
              required
              value={form.description}
              onChange={(event) => handleChange("description", event.target.value)}
              placeholder="Enter your description in detail"
              rows={5}
              className={`w-full resize-none rounded-2xl border-2 bg-background px-4 py-3 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.description ? "border-red-400" : "border-primary"
              }`}
            />
            {errors.description && (
              <span className="mt-1 block text-xs text-red-500">{errors.description}</span>
            )}
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary min-w-[122px] rounded-full disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
            {submitError && (
              <p role="alert" className="text-sm font-medium text-red-500">
                Something went wrong. Please try again or email us directly.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactCtaForm;
