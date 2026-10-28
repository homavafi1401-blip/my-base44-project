/**
 * Restaurant copy and link targets.
 * Everything here is a placeholder you can safely replace with real details.
 */
export const site = {
  name: 'TASTYBITES',
  tagline: 'EAT. ENJOY. REPEAT.',
  description:
    'We serve delicious food made with the best ingredients, crafted fresh to order and delivered hot to your door.',
  phone: '+1 (000) 000-0000',
  phoneHref: 'tel:+10000000000',
  email: 'hello@example.com',
  address: '123 Placeholder Street, New York, USA',
  couponCode: 'WELCOME20',
  /** Fraction taken off the subtotal when the coupon above is applied. */
  couponDiscount: 0.2,
  copyright: `© ${new Date().getFullYear()} TastyBites. All Rights Reserved.`,
};

export type NavItem = { label: string; id: string };
export type NavLink = { label: string; href: string };

/** Sections in page order — used for the header scroll-spy. */
export const navItems: NavItem[] = [
  { label: 'HOME', id: 'home' },
  { label: 'MENU', id: 'menu' },
  { label: 'OFFERS', id: 'offers' },
  { label: 'ABOUT US', id: 'about' },
  { label: 'CONTACT', id: 'contact' },
];

export const quickLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'Offers', href: '#offers' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

/** No pages exist behind these yet — update the hrefs when they do. */
export const customerCare: NavLink[] = [
  { label: 'My Orders', href: '#menu' },
  { label: 'Delivery Info', href: '#offers' },
  { label: 'FAQs', href: '#contact' },
  { label: 'Terms & Conditions', href: '#contact' },
  { label: 'Privacy Policy', href: '#contact' },
];

export type SocialName = 'facebook' | 'instagram' | 'twitter' | 'tiktok' | 'youtube';

/** Placeholder destinations — replace with the real profiles. */
export const socials: { name: SocialName; label: string; href: string }[] = [
  { name: 'facebook', label: 'Facebook', href: '' },
  { name: 'instagram', label: 'Instagram', href: '' },
  { name: 'twitter', label: 'Twitter', href: '' },
  { name: 'tiktok', label: 'TikTok', href: '' },
  { name: 'youtube', label: 'YouTube', href: '' },
];

/** Add a store URL to `href` to turn a badge into a real link. */
export const appBadges = [
  { label: 'App Store', caption: 'Download on the', href: '' },
  { label: 'Google Play', caption: 'Get it on', href: '' },
];
