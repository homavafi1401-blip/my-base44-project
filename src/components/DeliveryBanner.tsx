import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { photo } from '../data/images';
import { site } from '../data/site';

export default function DeliveryBanner() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(site.couponCode);
    } catch {
      // Clipboard API can be blocked inside an iframe — fall back to a selection copy.
      const area = document.createElement('textarea');
      area.value = site.couponCode;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand('copy');
      } catch {
        /* nothing else we can do; the code is visible on screen */
      }
      area.remove();
    }
    setCopied(true);
  };

  return (
    <section id="offers" className="relative scroll-mt-24 bg-brand-black pb-20 lg:pb-28">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-orange via-brand-amber to-brand-orange px-6 py-10 shadow-[0_30px_70px_-30px_rgba(255,152,0,0.8)] sm:px-10 lg:px-14 lg:py-14"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 1100 320"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
          >
            <path
              d="M-20,220 C180,120 300,270 520,190 S820,90 1120,180"
              fill="none"
              stroke="#090909"
              strokeWidth="2.5"
              strokeDasharray="8 12"
              strokeLinecap="round"
            />
          </svg>
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.85fr_1fr]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand-black/70">
                Hungry?
              </p>
              <p className="mt-3 font-script text-4xl leading-tight text-brand-black sm:text-5xl lg:text-[3.4rem]">
                We Deliver To You!
              </p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-black/75">
                Hot, fresh and packed with care — straight from our kitchen to your door.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-[300px]">
              <div className="absolute inset-x-6 bottom-2 h-6 rounded-full bg-black/25 blur-xl" />
              <img
                src={photo('delivery', 800)}
                alt="Delivery rider on a scooter carrying a branded delivery box"
                loading="lazy"
                className="relative w-full rounded-[26px] object-cover shadow-[0_28px_50px_-20px_rgba(0,0,0,0.65)] ring-1 ring-white/25"
              />
            </div>

            <div className="rounded-3xl bg-brand-black/85 p-6 backdrop-blur-sm ring-1 ring-white/10">
              <p className="font-display text-3xl uppercase leading-none text-white sm:text-4xl">
                Get 20% Off
              </p>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/60">
                On your first order
              </p>

              <div className="mt-5 rounded-2xl border border-dashed border-white/25 bg-white/5 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">
                  Coupon code
                </p>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <span className="font-display text-xl tracking-[0.16em] text-white">
                    {site.couponCode}
                  </span>
                  <button
                    type="button"
                    onClick={copyCode}
                    aria-label={`Copy coupon code ${site.couponCode}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-black transition-colors hover:bg-brand-amber"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
              <p aria-live="polite" className="mt-3 h-4 text-[11px] text-brand-black/70">
                {copied ? 'Coupon code copied to your clipboard.' : ''}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
