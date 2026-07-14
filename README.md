# ROXMOS — Website

Next.js 15 (App Router) + TypeScript + Tailwind v4 + Framer Motion + React Three Fiber.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Built so far

- **Navbar** — glassmorphism pill, Lesse-style roll-hover links, hides on scroll down / reveals on scroll up, fullscreen overlay menu on mobile with staggered link reveals.
- **Hero (NeuralHero)** — pinned scrollytelling hero (300vh): a neural network of bent bezier wires draws in layer-by-layer as you scroll (blue → violet → magenta), nodes pop, pulses travel the wires, the net blooms, then releases to the next section. Three stage captions narrate raw data → patterns → intelligence. Ghost skeleton visible on load; `prefers-reduced-motion` gets a static fully-lit 100vh version. Color versions live in `PALETTES` in `components/NeuralNetwork.tsx` — switch `ACTIVE_PALETTE` between `gradient` (v1, active), `mono` (v2, all blue), `spectrum` (v3, full color). Previous hero kept in `components/Hero.tsx` + `DataFlow.tsx`.

## Design tokens (app/globals.css)

| Token | Value | Use |
|---|---|---|
| `ink` | `#04060d` | dark base |
| `surface` | `#0a0f1e` | raised dark |
| `primary` | `#4da2ff` | key blue |
| `accent` | `#62adff` | hover blue |
| `glow` | `#82beff` | particles / glows |
| `paper` | `#f6f8fc` | white sections |

`glass` utility = translucent white + blur, used for navbar and future cards.

## Next up

Our Services → Products → Services → Our Approach → Footer (placeholders live in `app/page.tsx`).
