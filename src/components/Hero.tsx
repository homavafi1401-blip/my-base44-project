import { motion } from 'framer-motion';
import { ArrowRight, Play, Star } from 'lucide-react';
import { heroImages } from '../data/products';
import { Embers } from './Embers';

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
};

export function Hero({ onWatchVideo }: { onWatchVideo: () => void }) {
  const scrollToMenu = () => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative overflow-hidden bg-ink pb-24 pt-10 sm:pb-28 lg:pb-40 lg:pt-16">
      {/* warm light + grain */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 top-0 h-[620px] w-[620px] rounded-full bg-brand/20 blur-[150px]" />
        <div className="absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[#ff6a00]/12 blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)',
            backgroundSize: '3px 3px',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>
      <Embers />

      <div className="container-page relative z-10 grid items-center gap-10 lg:grid-cols-[1.02fr_1fr] lg:gap-4">
        {/* ------------------------------- copy ------------------------------- */}
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          className="relative order-2 max-w-xl lg:order-1"
        >
          <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="font-script text-lg text-white sm:text-xl">
            Craving Something
          </motion.p>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="font-script text-3xl leading-tight text-white sm:text-4xl"
          >
            Delicious
          </motion.p>
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="display text-distressed mt-1 text-shadow-glow text-[clamp(64px,13vw,138px)]"
          >
            Burgers
          </motion.h1>

          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="mt-4 flex flex-wrap items-center gap-4">
            <span className="rounded-full border border-white/25 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.32em] text-white/70">
              Hot <span className="text-brand">•</span> Fresh <span className="text-brand">•</span> Tasty
            </span>
            <span className="hidden h-px w-14 bg-white/20 sm:block" />
          </motion.div>

          <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-[15px]">
            Handcrafted burgers made with premium ingredients for a perfect bite — flame-grilled,
            stacked high, served hot from our kitchen to your door.
          </motion.p>

          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="mt-8 flex flex-wrap items-center gap-4">
            <button type="button" onClick={scrollToMenu} className="btn-brand group">
              Order Now
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button type="button" onClick={onWatchVideo} className="group inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-ink">
                <Play className="h-4 w-4 translate-x-[1px] fill-current" />
              </span>
              Watch Video
            </button>
          </motion.div>
        </motion.div>

        {/* ------------------------------ visuals ----------------------------- */}
        <div className="relative order-1 mx-auto h-[330px] w-full max-w-[560px] sm:h-[420px] lg:order-2 lg:h-[560px] lg:max-w-none">
          <div aria-hidden className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-[90px]" />

          {/* soda cup behind */}
          <div className="absolute right-[-1%] top-[1%] z-10 h-[42%] w-[30%] sm:h-[44%]">
            <motion.img
              src={heroImages.drink}
              alt="Ice cold branded soft drink cup with a straw"
              loading="eager"
              initial={{ opacity: 0, y: 26, rotate: 10 }}
              animate={{ opacity: 1, y: 0, rotate: 4 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="img-mask h-full w-full rounded-[30px] object-cover"
            />
          </div>

          {/* fries behind */}
          <div className="absolute left-[-2%] top-[32%] z-10 h-[40%] w-[36%] sm:h-[42%]">
            <motion.img
              src={heroImages.fries}
              alt="Golden crispy French fries in a branded black carton"
              loading="eager"
              initial={{ opacity: 0, x: -26, rotate: -10 }}
              animate={{ opacity: 1, x: 0, rotate: -5 }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="img-mask h-full w-full rounded-[30px] object-cover"
            />
          </div>

          {/* main burger */}
          <div className="absolute left-1/2 top-1/2 z-20 h-[88%] aspect-square -translate-x-1/2 -translate-y-1/2">
            <motion.img
              src={heroImages.burger}
              alt="Double cheeseburger with melting cheddar, fresh lettuce and tomato on a dark stone platter"
              loading="eager"
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="img-mask h-full w-full rounded-[46%] object-cover drop-shadow-[0_35px_60px_rgba(0,0,0,0.85)]"
            />
          </div>

          {/* warm rim light */}
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_65%_35%,rgba(255,190,90,0.28),transparent_62%)]" />

          {/* 100% fresh badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="absolute right-[3%] bottom-[14%] z-30 flex h-[104px] w-[104px] flex-col items-center justify-center rounded-full border border-[#ffd089]/70 bg-black/85 text-center shadow-glow backdrop-blur-sm sm:h-[124px] sm:w-[124px]"
          >
            <span className="flex gap-0.5 text-[#FFC64B]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-2.5 w-2.5 fill-current" />
              ))}
            </span>
            <span className="mt-1 px-2 font-display text-[19px] leading-none text-white sm:text-[22px]">100%</span>
            <span className="mt-1 px-3 text-[7px] font-semibold uppercase leading-tight tracking-[0.2em] text-white/70">
              Fresh &amp; Premium
            </span>
          </motion.div>

          {/* stone platform shadow */}
          <div aria-hidden className="absolute bottom-[6%] left-1/2 h-8 w-[62%] -translate-x-1/2 rounded-full bg-black/70 blur-2xl" />
        </div>
      </div>
    </section>
  );
}
