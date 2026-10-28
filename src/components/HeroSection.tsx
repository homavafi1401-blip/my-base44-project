import { useState } from 'react';
import type { MouseEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, BadgePercent, Play, Star, X } from 'lucide-react';
import Particles from './Particles';
import { photo } from '../data/images';
import { video } from '../config';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: 'easeOut' as const },
});

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const [videoOpen, setVideoOpen] = useState(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 110, damping: 22 });
  const smoothY = useSpring(pointerY, { stiffness: 110, damping: 22 });
  const parallaxX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const parallaxY = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);

  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      id="home"
      onMouseMove={handlePointerMove}
      className="relative isolate overflow-hidden bg-brand-black pb-28 pt-28 lg:pb-36 lg:pt-32"
    >
      {/* Cinematic background: warm glows and drifting smoke */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -left-40 top-0 h-[460px] w-[460px] rounded-full bg-brand-orange/25 blur-[150px]" />
        <div className="absolute -right-24 top-1/4 h-[520px] w-[520px] rounded-full bg-brand-red/30 blur-[160px]" />
        <div className="smoke absolute left-1/4 top-1/3 h-72 w-[520px] rounded-full bg-brand-orange/10 blur-[110px]" />
        <div className="smoke absolute bottom-10 right-1/4 h-64 w-[420px] rounded-full bg-brand-red/10 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-brand-black via-brand-black/70 to-transparent" />
      </div>

      <Particles />

      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        {/* Copy */}
        <div className="relative z-10 text-center lg:text-left">
          <motion.p
            {...fadeUp(0.05)}
            className="font-script text-2xl text-brand-orange sm:text-3xl"
          >
            Craving Something
          </motion.p>

          <motion.h1 {...fadeUp(0.12)} className="mt-1">
            <span className="block font-script text-[3.4rem] leading-[0.9] text-white sm:text-6xl lg:text-7xl">
              Delicious
            </span>
            <span className="mt-2 block font-display text-[3.9rem] uppercase leading-[0.85] text-brand-orange drop-shadow-[0_14px_44px_rgba(255,152,0,0.45)] sm:text-7xl lg:text-[5.6rem]">
              Burgers
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.32em] text-white/75 backdrop-blur"
          >
            Hot <span className="text-brand-orange">•</span> Fresh
            <span className="text-brand-orange">•</span> Tasty
          </motion.p>

          <motion.p
            {...fadeUp(0.26)}
            className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/55 lg:mx-0"
          >
            Handcrafted burgers made with premium ingredients for a perfect bite.
          </motion.p>

          <motion.div
            {...fadeUp(0.32)}
            className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-start"
          >
            <a
              href="#menu"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-orange px-7 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-black shadow-glow-orange transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-amber hover:shadow-glow-amber"
            >
              Order Now
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            {video.url ? (
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/5 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur transition-all duration-300 hover:border-brand-orange hover:text-brand-orange"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10">
                  <Play className="h-3.5 w-3.5 fill-current" />
                </span>
                Watch Video
              </button>
            ) : (
              <a
                href="#offers"
                className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/5 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur transition-all duration-300 hover:border-brand-orange hover:text-brand-orange"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10">
                  <BadgePercent className="h-4 w-4" />
                </span>
                View Offers
              </a>
            )}
          </motion.div>
        </div>

        {/* Burger */}
        <div className="relative mx-auto w-full max-w-[520px] lg:max-w-[600px]">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,152,0,0.32),transparent_62%)] blur-2xl"
          />
          <motion.div style={{ x: parallaxX, y: parallaxY }} className="relative">
            <div className="animate-float-y">
              <img
                src={photo('burger', 1000)}
                alt="Gourmet double cheeseburger with melted cheddar, lettuce and tomato"
                width={1000}
                height={1000}
                className="food-cutout w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.8)]"
              />
            </div>
            <img
              src={photo('fries', 420)}
              alt="Golden crispy fries"
              loading="lazy"
              className="food-cutout absolute -left-6 bottom-8 hidden h-28 w-28 lg:block"
            />
            <img
              src={photo('drink', 420)}
              alt="Ice cold cola"
              loading="lazy"
              className="food-cutout absolute -right-4 bottom-20 hidden h-32 w-32 lg:block"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="absolute -left-1 top-0 z-20 grid h-24 w-24 place-items-center rounded-full border border-white/15 bg-brand-black/70 backdrop-blur sm:h-28 sm:w-28 lg:-left-6"
          >
            <svg
              viewBox="0 0 100 100"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full animate-spin-slow"
            >
              <defs>
                <path
                  id="hero-badge-circle"
                  d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
              </defs>
              <text style={{ fill: 'rgba(255,255,255,0.75)', fontSize: '8.2px', letterSpacing: '2.4px', fontWeight: 600 }}>
                <textPath href="#hero-badge-circle">100% FRESH &amp; PREMIUM •</textPath>
              </text>
            </svg>
            <span className="flex items-center gap-0.5" aria-hidden="true">
              <Star className="h-3.5 w-3.5 fill-brand-orange text-brand-orange" />
              <Star className="h-5 w-5 fill-brand-orange text-brand-orange" />
              <Star className="h-3.5 w-3.5 fill-brand-orange text-brand-orange" />
            </span>
          </motion.div>
        </div>
      </div>

      {video.url && videoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Brand video"
          className="fixed inset-0 z-[80] grid place-items-center bg-black/80 p-5 backdrop-blur-sm"
          onClick={() => setVideoOpen(false)}
        >
          <div
            role="document"
            className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-brand-charcoal p-8 text-center"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setVideoOpen(false)}
              aria-label="Close video"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-brand-orange hover:text-brand-orange"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="pr-10 text-left font-display text-xl uppercase tracking-wide text-white">
              {video.title}
            </h2>
            <video
              src={video.url}
              controls
              autoPlay
              playsInline
              className="mt-4 w-full rounded-2xl bg-black"
            />
          </div>
        </div>
      )}
    </section>
  );
}
