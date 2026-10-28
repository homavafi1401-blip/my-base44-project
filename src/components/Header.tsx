import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Flame, Menu as MenuIcon, ShoppingBag, X } from 'lucide-react';
import { navItems, site } from '../data/site';
import { ordering } from '../config';
import { useActiveSection } from '../hooks/useActiveSection';

const sectionIds = navItems.map((item) => item.id);

type HeaderProps = {
  cartCount: number;
  onOpenCart: () => void;
};

export default function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen
          ? 'border-b border-white/10 bg-brand-black/95 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="container-page flex h-[76px] items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-3" aria-label={`${site.name} home`}>
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-orange shadow-glow-orange">
            <Flame className="h-6 w-6 text-white" strokeWidth={2.4} />
          </span>
          <span className="leading-none">
            <span className="block font-display text-2xl tracking-[0.04em] text-white">
              {site.name}
            </span>
            <span className="mt-1 block text-[9px] font-semibold tracking-[0.3em] text-white/45">
              {site.tagline}
            </span>
          </span>
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative py-2 text-[11px] font-semibold tracking-[0.2em] transition-colors ${
                  isActive ? 'text-white' : 'text-white/55 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-brand-orange transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open cart, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
            className="relative grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-brand-orange hover:text-brand-orange"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -right-1 -top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-brand-orange px-1 text-[10px] font-bold text-brand-black"
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          <a
            href={ordering.url || '#menu'}
            {...(ordering.url ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="hidden items-center gap-2 rounded-full bg-brand-orange px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-black transition-all duration-300 hover:bg-brand-amber hover:shadow-glow-amber sm:inline-flex"
          >
            <ShoppingBag className="h-4 w-4" />
            Order Online
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-brand-orange hover:text-brand-orange lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden border-t border-white/10 bg-brand-black lg:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold tracking-[0.12em] transition-colors ${
                    active === item.id
                      ? 'bg-white/5 text-brand-orange'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href={ordering.url || '#menu'}
                {...(ordering.url ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-brand-black"
              >
                <ShoppingBag className="h-4 w-4" />
                Order Online
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
