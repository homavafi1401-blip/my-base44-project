# Tasty Bites — Restaurant Website

Premium dark-themed fast-food website built with React, TypeScript, Tailwind CSS, Framer Motion and Lucide icons.

## What's inside

- **Home** (`/`) — hero, floating category bar, bestsellers, delivery promo banner, menu preview, about, contact.
- **Menu** (`/menu`) — full menu with category filters and search.
- **Checkout** (`/checkout`) — delivery details, coupon (`WELCOME20`), order confirmation.
- **Cart** — slide-in drawer, quantity controls, localStorage persistence, free-delivery progress.

All product data, prices and category copy live in `src/data/products.ts`; brand, contact details and
commerce rules (promo code, delivery fee) live in `src/data/site.ts`.

## Local development

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

The app is served by the Vite dev server on http://localhost:3000 (container port 5173), with hot reload.
Dependencies are installed from `package.json` inside a named `node_modules` volume on every container
start, so a lockfile change never needs an image rebuild.

Type-check inside the container:

```bash
docker compose -f docker-compose.base44.yml exec -T web npx tsc --noEmit
```

## Notes

- Food photography and Google Fonts are loaded from the network (Unsplash / Google Fonts).
- The checkout and contact form are demo flows: no payment is taken and no email is sent. Connect a
  payment provider (and an email/backend endpoint in `ContactSection.tsx` and `CheckoutPage.tsx`) to
  make them live.
- Placeholder contact details (phone, email, address) are meant to be replaced in `src/data/site.ts`.
