# AGENTS.md

## Running the app

- Everything runs through `docker-compose.base44.yml` (single `web` service, `node:22-alpine`, bind mount
  + named `node_modules` volume). Do not install Node on the sandbox host.
- Dependencies are installed by the container's start command (`npm install && npm run dev`), so
  `package.json` changes only need `docker compose -f docker-compose.base44.yml restart web`.
- Health check hits `http://127.0.0.1:5173/` inside the container (the dev server, not a build).
- The host port is `3000` → container `5173`. Vite binds `0.0.0.0`; `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS`
  is passed through from the platform for the preview proxy host. `server.watch.usePolling` is on because
  bind mounts do not always emit fs events.
- No database, no backend, no secrets. Cart state is `localStorage` key `tastybites.cart.v1`.

## Type checking

```bash
docker compose -f docker-compose.base44.yml exec -T web npx tsc --noEmit
```

## Content is data-driven

- Products, prices, categories, bestseller picks, hero images: `src/data/products.ts`.
- Brand copy, contact details, promo code, delivery fee: `src/data/site.ts`.
- Photos are hot-linked Unsplash URLs (`photo(id)` helper) and fonts come from Google Fonts — both need
  network access in the browser. Swapping the photo id is enough to change a dish image.

## Known demo behaviour (not bugs)

- Checkout (`/checkout`) and the contact form are client-side demos: they validate, show confirmation and
  clear the cart, but take no payment and send no email.
- "Watch video" opens a self-contained animated kitchen film modal (no external player/asset).
