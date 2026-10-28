# TastyBites — project notes

Premium fast-food restaurant landing page. React 18 + TypeScript + Tailwind CSS +
Framer Motion + Lucide icons, bundled by Vite.

## Running it

```sh
docker compose -f docker-compose.base44.yml up -d --build
```

- Web entry point: host port `3000` (Vite dev server inside the container).
- The repo is bind-mounted at `/app` and `node_modules` lives in a named volume;
  `npm install` runs on container start, then `npm run dev`. Editing `src/`
  hot-reloads — no rebuild needed.
- No external credentials are required. Food photography comes from Unsplash URLs
  (`src/data/images.ts`), so the page needs outbound network access for images and
  Google Fonts.

## Layout of the code

- `src/data/site.ts` — brand copy, nav, footer links, contact placeholders.
- `src/data/menu.ts` — categories and products (prices, descriptions, images).
- `src/data/images.ts` — photo sources; swap a photo id to change the picture.
- `src/config.ts` — `ordering.url`; empty means the cart shows a clearly labelled
  "Checkout Coming Soon" placeholder instead of pretending an order was placed.
- `src/hooks/useCart.ts` — cart state, quantities and totals.
- `src/components/*` — Header, HeroSection, FoodCategories, Bestsellers,
  ProductCard, DeliveryBanner, ShoppingCart, Footer.

## Verifying it works

```sh
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/       # expect 200
docker compose -f docker-compose.base44.yml exec -T web npm run typecheck
```

Behaviour to check in the browser: category filter (click a category, click again
to clear), add to cart, quantity +/- and remove in the cart drawer, coupon copy,
mobile hamburger menu, and no horizontal scroll at 375px.

## Colour system (important)

`src/index.css` declares each brand colour twice: as a hex custom property
(`--platform-orange`) and as RGB channels (`--platform-orange-rgb`).
`tailwind.config.js` binds the Tailwind palette to the channel variables
(`rgb(var(--platform-orange-rgb) / <alpha-value>)`) so opacity utilities such as
`bg-brand-orange/25` actually compile. Binding Tailwind straight to the hex
variable silently drops every `/opacity` class — that is how the scrolled header
and the hero glows once disappeared. Keep both declarations in sync when the
palette changes.

## Sandbox-only notes

- `vite.config.ts` adds `.<BASE44_SANDBOX_HOST_DOMAIN>` to `server.allowedHosts`
  only when `BASE44_PREVIEW_MODE === "1"`; the preview proxy sends that host and
  the sandbox id rotates. Unset (normal development) leaves Vite's default
  localhost allowlist untouched.
- The platform also supplies `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS`, passed
  through Compose; Vite ≥ 6.1 appends it to the same allowlist.
