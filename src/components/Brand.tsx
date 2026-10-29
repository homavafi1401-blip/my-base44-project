export function BurgerMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-label="Tasty Bites burger logo">
      <path
        d="M4.2 13.2C4.2 8.1 9.4 4.6 16 4.6s11.8 3.5 11.8 8.6c0 .9-.7 1.6-1.6 1.6H5.8c-.9 0-1.6-.7-1.6-1.6Z"
        fill="#FF9800"
      />
      <g fill="#090909" opacity="0.85">
        <ellipse cx="11.4" cy="9.4" rx="1.1" ry="0.6" transform="rotate(-18 11.4 9.4)" />
        <ellipse cx="16.4" cy="8.2" rx="1.1" ry="0.6" />
        <ellipse cx="21.2" cy="9.6" rx="1.1" ry="0.6" transform="rotate(18 21.2 9.6)" />
      </g>
      <rect x="5" y="16" width="22" height="2.6" rx="1.3" fill="#F2F2F2" />
      <rect x="5" y="19.2" width="22" height="3" rx="1.5" fill="#FFA500" />
      <path
        d="M5.4 23.4h21.2c.4 0 .7.4.6.8-.7 2.6-3 4.2-5.7 4.2H10.5c-2.7 0-5-1.6-5.7-4.2-.1-.4.2-.8.6-.8Z"
        fill="#FF9800"
      />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <BurgerMark className={compact ? 'h-8 w-8' : 'h-10 w-10'} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[22px] uppercase tracking-[0.02em] text-white sm:text-[24px]">
          Tasty<span className="text-brand">Bites</span>
        </span>
        <span className="mt-1 text-[8px] font-medium uppercase tracking-[0.42em] text-white/45">
          Eat. Enjoy. Repeat.
        </span>
      </span>
    </span>
  );
}
