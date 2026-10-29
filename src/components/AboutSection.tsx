import { motion } from 'framer-motion';
import { Flame, Leaf, Timer } from 'lucide-react';
import { photo } from '../data/products';

const stats = [
  { value: '12+', label: 'Years on the grill' },
  { value: '80k', label: 'Burgers served' },
  { value: '4.9', label: 'Average rating' },
];

const pillars = [
  { icon: Flame, title: 'Flame Grilled', text: 'Charcoal heat, never a flat top.' },
  { icon: Leaf, title: 'Fresh Daily', text: 'Produce delivered every morning.' },
  { icon: Timer, title: 'Under 30 Min', text: 'Hot at your door, or it’s on us.' },
];

export function AboutSection() {
  return (
    <section id="about" className="relative scroll-mt-20 overflow-hidden bg-ink py-20 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-brand/10 blur-[140px]" />
      <div className="container-page relative grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <img
              src={photo('1577219491135-ce391730fb2c', 900)}
              alt="Tasty Bites kitchen team stacking a fresh burger on a dark counter"
              loading="lazy"
              className="h-[320px] w-full object-cover sm:h-[420px]"
            />
          </div>
          <div className="absolute -bottom-8 -right-2 hidden w-44 overflow-hidden rounded-2xl border-4 border-ink shadow-card sm:block">
            <img
              src={photo('1551782450-a2132b4ba21d', 400)}
              alt="Close-up of a flame-grilled burger with melted cheese"
              loading="lazy"
              className="h-36 w-full object-cover"
            />
          </div>
          <div className="absolute -left-3 -top-3 rounded-2xl bg-brand px-4 py-3 text-ink shadow-glow">
            <p className="font-display text-2xl leading-none">100% Fresh</p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em]">& Premium</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-eyebrow">Our Story</span>
          <h2 className="display mt-2 text-[clamp(30px,4.6vw,48px)] text-white">
            Built On <span className="text-brand">Fire</span> &amp; Flavour
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
            Tasty Bites started as a single street cart with one obsession: the perfect bite. Today
            we still hand-press every patty, bake our buns daily and mix our signature sauce in-house —
            because fast food should never taste rushed.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {pillars.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-xl border border-white/10 bg-card/70 p-4">
                <Icon className="h-5 w-5 text-brand" />
                <p className="mt-3 text-[13px] font-semibold text-white">{title}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted/75">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl text-brand">{stat.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/45">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
