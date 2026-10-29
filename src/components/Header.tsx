import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, ShoppingBag, ShoppingCart, X } from 'lucide-react';
import { Logo } from './Brand';
import { navLinks } from '../data/site';
import { useCart } from '../context/CartContext';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { count, openCart } = useCart();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome, location.pathname]);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const goTo = (id: string) => {
    setMobileOpen(false);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  };

  const current = isHome ? active : location.pathname === '/menu' ? 'menu' : '';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'border-white/10 bg-[#050505]/95 backdrop-blur-md' : 'border-white/[0.06] bg-[#050505]'
      }`}
    >
      <div className="container-page flex h-[76px] items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => goTo('home')}
          className="shrink-0 rounded-lg text-left"
          aria-label="Tasty Bites home"
        >
          <Logo />
        </button>

        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => goTo(link.id)}
              className={`group relative py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                current === link.id ? 'text-brand' : 'text-white/80 hover:text-white'
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-brand transition-all duration-300 ${
                  current === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-brand hover:text-brand"
          >
            <ShoppingCart className="h-[18px] w-[18px]" />
            <span
              className={`absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold ${
                count > 0 ? 'bg-brand text-ink' : 'bg-white/15 text-white/70'
              }`}
            >
              {count}
            </span>
          </button>

          <button type="button" onClick={() => goTo('menu')} className="btn-brand hidden h-11 px-6 sm:inline-flex">
            <ShoppingBag className="h-4 w-4" />
            Order Online
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-white/10 bg-[#0b0b0b] lg:hidden"
          >
            <div className="container-page flex flex-col py-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => goTo(link.id)}
                  className={`flex min-h-[48px] items-center border-b border-white/[0.06] text-left text-[12px] font-semibold uppercase tracking-[0.2em] ${
                    current === link.id ? 'text-brand' : 'text-white/85'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button type="button" onClick={() => goTo('menu')} className="btn-brand mt-4 w-full">
                <ShoppingBag className="h-4 w-4" />
                Order Online
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
