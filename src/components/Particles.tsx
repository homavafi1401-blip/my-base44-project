import { useMemo } from 'react';

/** Slow-rising embers behind the hero. Purely decorative. */
export default function Particles({ count = 20 }: { count?: number }) {
  const sparks = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        top: 25 + Math.random() * 75,
        size: 2 + Math.random() * 3.5,
        delay: Math.random() * 9,
        duration: 8 + Math.random() * 9,
        color: Math.random() > 0.68 ? 'var(--fresh-red)' : 'var(--platform-orange)',
      })),
    [count]
  );

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {sparks.map((spark) => (
        <span
          key={spark.id}
          className="spark absolute rounded-full"
          style={{
            left: `${spark.left}%`,
            top: `${spark.top}%`,
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            backgroundColor: spark.color,
            boxShadow: `0 0 10px ${spark.color}`,
            animationDelay: `${spark.delay}s`,
            animationDuration: `${spark.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
