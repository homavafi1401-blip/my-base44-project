import { AnimatePresence, motion } from 'framer-motion';
import { Pause, Play, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { heroImages } from '../data/products';

const chapters = [
  { title: 'The Grill', caption: 'Charcoal heat, smashed patties, 90 seconds a side.' },
  { title: 'The Stack', caption: 'Cheddar, lettuce, tomato, house sauce — in that order.' },
  { title: 'The Bite', caption: 'Wrapped in seconds, at your door in under thirty minutes.' },
];

/** "Watch video" overlay — a self-contained kitchen film sequence, no external player. */
export function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [playing, setPlaying] = useState(true);
  const [chapter, setChapter] = useState(0);

  useEffect(() => {
    if (!open) return;
    setChapter(0);
    setPlaying(true);
  }, [open]);

  useEffect(() => {
    if (!open || !playing) return;
    const timer = window.setInterval(() => setChapter((current) => (current + 1) % chapters.length), 3200);
    return () => window.clearInterval(timer);
  }, [open, playing]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[85] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Tasty Bites kitchen film"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/12 bg-black shadow-card"
          >
            <div className="relative aspect-video overflow-hidden">
              <motion.img
                key={chapter}
                src={heroImages.burger}
                alt="Close-up of a double cheeseburger on a dark stone platter"
                initial={{ scale: 1.08, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: playing ? 3.4 : 0.4, ease: 'linear' }}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                <p className="text-[10px] uppercase tracking-[0.3em] text-brand">Kitchen Film · 0:45</p>
                <h3 className="display mt-2 text-2xl text-white sm:text-3xl">{chapters[chapter].title}</h3>
                <p className="mt-1.5 max-w-md text-[12.5px] text-muted">{chapters[chapter].caption}</p>
                <div className="mt-4 flex gap-1.5">
                  {chapters.map((item, index) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setChapter(index)}
                      aria-label={`Play chapter ${item.title}`}
                      className={`h-1 flex-1 rounded-full transition-colors ${index === chapter ? 'bg-brand' : 'bg-white/25'}`}
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                aria-label={playing ? 'Pause film' : 'Play film'}
                className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand/95 text-ink shadow-glow transition-transform hover:scale-105"
              >
                {playing ? <Pause className="h-6 w-6 fill-current" /> : <Play className="h-6 w-6 translate-x-0.5 fill-current" />}
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-brand hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
