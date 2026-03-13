# Amazon Clone — Scaler SDE Intern Assignment

I built a full-stack Amazon-like e-commerce application using **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **PostgreSQL** (via Neon + Drizzle ORM) as part of the Scaler SDE Intern assignment.


NOTE: all bonus points assignment tasks are also completed. 
* Order Confirmation Mail
* Wishlist 
* Responsive design (mobile, tablet, desktop)
* Wishlist functionality
* Email notification on order placement
* Order History

---

## Getting Started

### Prerequisites

- Node.js 18+ or [Bun](https://bun.sh/)
- A [Neon](https://neon.tech) PostgreSQL database (or any PostgreSQL instance)
- Backend API running — see [Backend Repository](https://github.com/deevee47/amazon-backend)

### 1. Clone the repository

```bash
git clone https://github.com/deevee47/amazon-clone-frontend.git
cd amazon-clone-frontend
```

### 2. Install dependencies

```bash
bun install
# or
npm install
```

### 3. Configure environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env.local
```

**.env.example:**
```env
DATABASE_URL="postgresql://neondb_owner:password@localhost/neondb"
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (Neon or local Postgres) |
| `NEXT_PUBLIC_API_URL` | Base URL of the backend Express API |

### 4. Start the development server

```bash
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Backend

I built the backend as a separate Express.js API server that handles products, cart, wishlist, addresses, and orders.

**Repository:** [github.com/deevee47/amazon-backend](https://github.com/deevee47/amazon-backend)

Start the backend first, then set `NEXT_PUBLIC_API_URL` to its base URL before running the frontend.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| State Management | Zustand |
| Database ORM | Drizzle ORM |
| Database | PostgreSQL (Neon Serverless) |
| Carousel | Embla Carousel (via shadcn/ui) |
| Package Manager | Bun |

---

## Optimizations I Implemented

### Search Debouncing
I wrote a custom `useDebounce` hook with a 300 ms delay and applied it to the search input in `SearchInput.tsx`. This prevents an API request from firing on every keystroke — it only triggers a fetch once the user pauses typing.

```ts
// hooks/useDebounce.ts
export function useDebounce<T>(value: T, delay: number): T
```

### Server vs Client Component Split
I kept data-fetching pages (`/`, `/products`, `/products/[id]`) as **React Server Components** — they fetch data at render time on the server with zero client-side JS overhead. I only added `"use client"` where interactivity was actually needed (`AddToCartButton`, `CartSidebar`, `SearchInput`, `CheckoutPage`).

This eliminates client-side data-loading waterfalls and reduces the JavaScript bundle sent to the browser.

### Incremental Static Regeneration (ISR)
I used Next.js ISR with a 1-hour revalidation window on product detail and listing pages:

```ts
apiFetch(`/api/products/${id}`, { next: { revalidate: 3600 } })
```

Pages are statically generated at build time and automatically re-fetched in the background every hour, giving near-static performance with always-fresh data.

### Parallel Data Fetching with `Promise.all`
Wherever I needed multiple independent API calls, I ran them concurrently with `Promise.all()` instead of sequentially — cutting total wait time down to the slowest single request:

```ts
// ProductsList.tsx — 3 category sections fetched in parallel
const [electronics, beauty, furniture] = await Promise.all([
  apiFetch(...),
  apiFetch(...),
  apiFetch(...),
]);
```

### Optimistic UI Updates
I made cart operations (update quantity, remove item, save for later) update Zustand state **immediately** before the API call resolves. The UI feels instant with no loading spinner needed for routine cart interactions.

### Zustand Selector Pattern
I consumed cart and wishlist state with granular selectors to prevent unnecessary re-renders:

```ts
const cartItems = useStore(store, (s) => s.cartItems);
const updateQuantity = useStore(store, (s) => s.updateQuantity);
```

Each component subscribes only to the slice of state it actually uses, so unrelated state changes don't trigger a re-render.

### Next.js Image Optimization
I used the `next/image` component throughout with:
- **Responsive `sizes` attributes** — the browser downloads only the appropriately sized image for the current viewport
- **`priority` flag** on above-the-fold banner images — preloaded to prevent LCP delay
- **Whitelisted remote domains** in `next.config.ts` — enables automatic WebP/AVIF conversion and resizing while blocking arbitrary image sources

### Session Caching
I generate a session ID once and persist it in `localStorage`. Every subsequent page load and API call reuses the existing ID instead of creating a new session each time.

### Component-Based Architecture
I decomposed the UI into small, single-responsibility components (`ProductImageGallery`, `AddToCartButton`, `DeliverySection`, `OrderSummary`, etc.). Each component owns its own state and re-renders independently — a change in one doesn't cascade into its siblings.

### Error Boundaries & Loading Skeletons
I added a co-located `loading.tsx` skeleton and `error.tsx` boundary for every route segment that performs async data fetching. Users always see meaningful UI while data loads or if a request fails, rather than a blank or broken screen.

