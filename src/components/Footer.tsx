import { Apple, Facebook, Instagram, Mail, MapPin, Music2, Phone, Play, Twitter, Youtube } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from './Brand';
import { navLinks, site } from '../data/site';

const socials = [
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: Twitter, label: 'X', href: 'https://x.com' },
  { icon: Music2, label: 'TikTok', href: 'https://tiktok.com' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
];

const quickLinks = navLinks;

const careLinks: { label: string; section?: string; to?: string }[] = [
  { label: 'My Orders', to: '/checkout' },
  { label: 'Delivery Info', section: 'offers' },
  { label: 'FAQs', section: 'contact' },
  { label: 'Terms & Conditions', section: 'contact' },
  { label: 'Privacy Policy', section: 'contact' },
];

export function Footer() {
  const navigate = useNavigate();

  const goToSection = (id: string) => {
    if (window.location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#070707]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_0.9fr_1.05fr_1.15fr_1fr] lg:gap-0">
          {/* brand */}
          <div className="lg:pr-8">
            <Logo />
            <p className="mt-5 max-w-[260px] text-[12.5px] leading-relaxed text-muted/75">
              Handcrafted burgers, crispy chicken and golden fries — flame-grilled fresh, delivered
              hot across the city.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-white/70 transition-all duration-300 hover:border-brand hover:bg-brand hover:text-ink"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* quick links */}
          <div className="lg:border-l lg:border-white/10 lg:pl-8">
            <h3 className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-brand">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => goToSection(link.id)}
                    className="text-[12.5px] text-muted/80 transition-colors hover:text-brand"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* customer care */}
          <div className="lg:border-l lg:border-white/10 lg:pl-8">
            <h3 className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-brand">Customer Care</h3>
            <ul className="mt-4 space-y-2.5">
              {careLinks.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link
                      to={link.to}
                      className="text-[12.5px] text-muted/80 transition-colors hover:text-brand"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => goToSection(link.section!)}
                      className="text-left text-[12.5px] text-muted/80 transition-colors hover:text-brand"
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div className="lg:border-l lg:border-white/10 lg:pl-8">
            <h3 className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-brand">Contact Us</h3>
            <ul className="mt-4 space-y-3 text-[12.5px] text-muted/80">
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                <a href={site.phoneHref} className="transition-colors hover:text-brand">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-brand">
                  {site.email}
                </a>
              </li>
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                <span className="leading-relaxed">{site.address}</span>
              </li>
            </ul>
          </div>

          {/* app */}
          <div className="lg:border-l lg:border-white/10 lg:pl-8">
            <h3 className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-brand">Download Our App</h3>
            <div className="mt-4 space-y-2.5">
              {[
                { store: 'App Store', Icon: Apple },
                { store: 'Google Play', Icon: Play },
              ].map(({ store, Icon }) => (
                <a
                  key={store}
                  href="#"
                  onClick={(event) => event.preventDefault()}
                  className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.03] px-3 py-2.5 transition-colors hover:border-brand/60"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[8px] uppercase tracking-[0.16em] text-white/45">
                      Download on the
                    </span>
                    <span className="block text-[12px] font-semibold text-white">{store}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[11px] text-white/40 sm:flex-row">
          <p>© 2026 TastyBites. All Rights Reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <span className="text-brand">♥</span> &amp; flame-grilled flavour
          </p>
        </div>
      </div>
    </footer>
  );
}
