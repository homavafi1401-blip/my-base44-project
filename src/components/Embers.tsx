import { motion } from 'framer-motion';
import { useMemo } from 'react';

/** Slow-rising ember particles that give the hero its grill-heat atmosphere. */
export function Embers({ count = 24 }: { count?: number }) {
  const embers = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 41) % 100,
        bottom: (i * 17) % 55,
        size: 2 + (i % 4),
        delay: (i % 9) * 0.7,
        duration: 7 + (i % 6),
        drift: i % 2 === 0 ? 26 : -22,
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {embers.map((ember, index) => (
        <motion.span
          key={index}
          className="ember"
          style={{
            left: `${ember.left}%`,
            bottom: `${ember.bottom}%`,
            width: ember.size,
            height: ember.size,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -300, x: [0, ember.drift, 0], opacity: [0, 0.9, 0] }}
          transition={{
            duration: ember.duration,
            delay: ember.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}
