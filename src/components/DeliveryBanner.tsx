import { motion } from 'framer-motion';
import { Check, Copy, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { site } from '../data/site';
import { useCart } from '../context/CartContext';
import { ScooterArt } from './ScooterArt';

export function DeliveryBanner() {
  const [copied, setCopied] = useState(false);
  const { notify } = useCart();
  const navigate = useNavigate();

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(site.promoCode);
      setCopied(true);
      notify(`Code ${site.promoCode} copied`);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      notify(`Use code ${site.promoCode} at checkout`);
    }
  };

  return (
    <section id="offers" className="relative bg-ink py-16 sm:py-20">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FF9800] via-[#FFA100] to-[#FFA500] px-6 py-9 sm:px-10 lg:px-12"
        >
          {/* dotted decoration */}
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40">
            <div
              className="absolute left-6 top-5 h-16 w-24"
              style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.45) 1.5px, transparent 1.5px)', backgroundSize: '9px 9px' }}
            />
            <div
              className="absolute bottom-5 right-6 h-16 w-28"
              style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.45) 1.5px, transparent 1.5px)', backgroundSize: '9px 9px' }}
            />
            <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full border-[18px] border-black/5" />
            <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full border-[18px] border-white/15" />
          </div>

          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_1.05fr_1fr]">
            {/* left */}
            <div className="text-black">
              <span className="inline-flex items-center gap-2 rounded-full bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-white">
                <Sparkles className="h-3 w-3 text-brand" /> Hungry?
              </span>
              <p className="mt-3 font-script text-3xl leading-tight text-black sm:text-[34px]">
                We Deliver To You!
              </p>
              <p className="mt-2 max-w-[240px] text-[12px] font-medium leading-relaxed text-black/70">
                Fresh from the grill in under 30 minutes — anywhere in the city.
              </p>
            </div>

            {/* center */}
            <div className="order-3 lg:order-none">
              <ScooterArt className="mx-auto w-full max-w-[380px] animate-floaty drop-shadow-[0_18px_24px_rgba(0,0,0,0.18)]" />
            </div>

            {/* right */}
            <div className="text-black lg:text-right">
              <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-black/70">Get</p>
              <div className="flex items-end gap-2 lg:justify-end">
                <span className="display text-[68px] leading-[0.85] text-black sm:text-[82px]">20%</span>
                <span className="pb-2 text-[13px] font-extrabold uppercase tracking-[0.2em] text-black">Off</span>
              </div>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.26em] text-black/75">
                On your first order
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3 lg:justify-end">
                <button
                  type="button"
                  onClick={copyCode}
                  className="group inline-flex items-center gap-2 rounded-full border-2 border-dashed border-black/60 bg-white/25 px-4 py-2 text-[12px] font-extrabold uppercase tracking-[0.22em] text-black transition-colors hover:bg-black hover:text-white"
                >
                  {site.promoCode}
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" />}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/checkout')}
                  className="rounded-full bg-black px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-transform hover:-translate-y-0.5"
                >
                  Redeem
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
