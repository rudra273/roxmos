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
- **Hero (SystemBlueprint)** — 100svh split hero: statement + CTAs left, a "living system blueprint" right (`components/SystemBlueprint.tsx`). An animated SVG architecture diagram — APIS / EVENTS / DOCS chips feed INGEST → TRAIN → EVALUATE → DEPLOY → MONITOR over orthogonal routed pipes on an engineering grid, with a dashed feedback/drift loop back to TRAIN and a retrain loop from EVALUATE. On load the schematic draws in (Framer Motion); then a shared 12s cycle runs forever: packets travel the pipes (SMIL `animateMotion`), each stage lights as work passes through (CSS windows, `bp-*` keyframes in `globals.css`), TRAIN fills a progress bar, EVALUATE emits a score, DEPLOY flips LIVE, MONITOR reports uptime. Vertical variant on mobile; `prefers-reduced-motion` gets a static softly-lit diagram. White hairlines + single blue accent only — designed for the dark/white alternating page.

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
