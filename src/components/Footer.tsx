import {
  Facebook,
  Flame,
  Instagram,
  Mail,
  MapPin,
  Music2,
  Phone,
  Smartphone,
  Twitter,
  Youtube,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { appBadges, customerCare, quickLinks, site, socials, type SocialName } from '../data/site';

const socialIcons: Record<SocialName, LucideIcon> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  tiktok: Music2,
  youtube: Youtube,
};

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-24 border-t border-white/10 bg-brand-charcoal pt-16">
      <div className="container-page grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr_1fr]">
        <div id="about" className="scroll-mt-28">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-orange shadow-glow-orange">
              <Flame className="h-6 w-6 text-white" strokeWidth={2.4} />
            </span>
            <span className="leading-none">
              <span className="block font-display text-2xl tracking-[0.04em] text-white">
                {site.name}
              </span>
              <span className="mt-1 block text-[9px] font-semibold tracking-[0.3em] text-white/40">
                {site.tagline}
              </span>
            </span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/45">{site.description}</p>

          <ul className="mt-6 flex items-center gap-2">
            {socials.map((social) => {
              const Icon = socialIcons[social.name];
              return (
                <li key={social.name}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/55 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-orange hover:text-brand-orange"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav aria-label="Quick links">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.24em] text-white">Quick Links</h2>
          <ul className="mt-5 space-y-3">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-white/45 transition-colors hover:text-brand-orange"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Customer care">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.24em] text-white">
            Customer Care
          </h2>
          <ul className="mt-5 space-y-3">
            {customerCare.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-white/45 transition-colors hover:text-brand-orange"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-[0.24em] text-white">Contact Us</h2>
          <ul className="mt-5 space-y-3 text-sm text-white/45">
            <li>
              <a
                href={site.phoneHref}
                className="flex items-start gap-3 transition-colors hover:text-brand-orange"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-start gap-3 transition-colors hover:text-brand-orange"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
              {site.address}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-[0.24em] text-white">
            Download Our App
          </h2>
          <div className="mt-5 space-y-3">
            {appBadges.map((badge) => (
              <button
                key={badge.label}
                type="button"
                title="App link coming soon"
                className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition-colors hover:border-brand-orange"
              >
                <Smartphone className="h-5 w-5 text-brand-orange" />
                <span className="leading-tight">
                  <span className="block text-[9px] uppercase tracking-[0.18em] text-white/40">
                    {badge.caption}
                  </span>
                  <span className="block text-sm font-semibold text-white">{badge.label}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-center text-xs text-white/35 sm:flex-row sm:text-left">
          <p>{site.copyright}</p>
          <p>Made with premium ingredients &amp; a lot of care.</p>
        </div>
      </div>
    </footer>
  );
}
