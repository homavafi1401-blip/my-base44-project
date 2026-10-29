import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { site } from '../data/site';

const details = [
  { icon: Phone, label: 'Call us', value: site.phone, href: site.phoneHref },
  { icon: Mail, label: 'Email us', value: site.email, href: `mailto:${site.email}` },
  { icon: MapPin, label: 'Visit us', value: site.address },
  { icon: Clock, label: 'Opening hours', value: site.hours },
];

type Fields = { name: string; email: string; phone: string; message: string };
const emptyForm: Fields = { name: '', email: '', phone: '', message: '' };

export function ContactSection() {
  const [values, setValues] = useState<Fields>(emptyForm);
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [sent, setSent] = useState(false);

  const update = (field: keyof Fields) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSent(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Partial<Fields> = {};
    if (values.name.trim().length < 2) next.name = 'Please tell us your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) next.email = 'Enter a valid email address';
    if (values.phone.trim() && values.phone.replace(/\D/g, '').length < 7) next.phone = 'Enter a valid phone number';
    if (values.message.trim().length < 10) next.message = 'Please add at least 10 characters';

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // Demo submission — connect an email service or backend endpoint here.
    setSent(true);
    setValues(emptyForm);
  };

  const inputClass = (invalid?: string) =>
    `w-full rounded-xl border bg-[#101010] px-4 py-3 text-sm text-white placeholder:text-white/30 transition-colors outline-none focus:border-brand ${
      invalid ? 'border-red-500/70' : 'border-white/12'
    }`;

  return (
    <section id="contact" className="relative scroll-mt-20 bg-ink2 py-20 sm:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">Say Hello</span>
          <h2 className="display mt-2 text-[clamp(30px,4.6vw,48px)] text-white">
            Get In <span className="text-brand">Touch</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            Catering, big orders or just a question about our menu — our team replies within
            one working day.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {details.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="rounded-xl border border-white/10 bg-card/60 p-4">
                <Icon className="h-4 w-4 text-brand" />
                <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-white/40">{label}</p>
                {href ? (
                  <a href={href} className="mt-1 block text-[13px] text-white transition-colors hover:text-brand">
                    {value}
                  </a>
                ) : (
                  <p className="mt-1 text-[13px] leading-relaxed text-white">{value}</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl border border-white/10 bg-card/70 p-6 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-white/50">
                Name
              </label>
              <input
                id="contact-name"
                value={values.name}
                onChange={update('name')}
                placeholder="Alex Carter"
                aria-invalid={Boolean(errors.name)}
                className={inputClass(errors.name)}
              />
              {errors.name && <p className="mt-1.5 text-[11px] text-red-400">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-white/50">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                value={values.email}
                onChange={update('email')}
                placeholder="you@email.com"
                aria-invalid={Boolean(errors.email)}
                className={inputClass(errors.email)}
              />
              {errors.email && <p className="mt-1.5 text-[11px] text-red-400">{errors.email}</p>}
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="contact-phone" className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-white/50">
              Phone <span className="normal-case tracking-normal text-white/30">(optional)</span>
            </label>
            <input
              id="contact-phone"
              value={values.phone}
              onChange={update('phone')}
              placeholder="+1 555 000 0000"
              aria-invalid={Boolean(errors.phone)}
              className={inputClass(errors.phone)}
            />
            {errors.phone && <p className="mt-1.5 text-[11px] text-red-400">{errors.phone}</p>}
          </div>

          <div className="mt-4">
            <label htmlFor="contact-message" className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-white/50">
              Message
            </label>
            <textarea
              id="contact-message"
              rows={5}
              value={values.message}
              onChange={update('message')}
              placeholder="Tell us what you need…"
              aria-invalid={Boolean(errors.message)}
              className={`${inputClass(errors.message)} resize-none`}
            />
            {errors.message && <p className="mt-1.5 text-[11px] text-red-400">{errors.message}</p>}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button type="submit" className="btn-brand">
              <Send className="h-4 w-4" />
              Send Message
            </button>
            {sent && (
              <span role="status" className="inline-flex items-center gap-2 text-[12px] text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                Thanks — we&apos;ll be in touch shortly.
              </span>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
