/* ──────────────────────────────────────────────────────────
   Shared product data.

   This is the single source of truth for products — imported by
   both the homepage deck (components/Products.tsx) and the
   per-product detail page (app/products/[slug]/page.tsx).

   The detail fields (overview, features, highlights, gallery)
   are PLACEHOLDER demo content for now. Swap them — and the
   `image`/`gallery` paths — for real copy and screenshots later;
   no route or component changes are needed.
   ────────────────────────────────────────────────────────── */

export type Product = {
  slug: string; // route segment, e.g. "orbit-ai" → /products/orbit-ai
  n: string; // "01".."04" — display index
  name: string;
  tagline: string; // one-line description
  tag: string; // category label, e.g. "AI PLATFORM"
  image: string; // hero / main screenshot
  accent: string; // per-product accent hex

  /* ── demo detail fields (placeholder) ── */
  overview: string[]; // intro paragraphs
  features: { title: string; desc: string }[];
  highlights: { label: string; value: string }[]; // stat tiles
  gallery: string[]; // screenshots (only one asset exists per product today)
};

export const PRODUCTS: Product[] = [
  {
    slug: "orbit-ai",
    n: "01",
    name: "Orbit AI",
    tagline: "AI copilots that plug into your operations and act.",
    tag: "AI PLATFORM",
    image: "/products/orbit-ai.svg",
    accent: "#4da2ff",
    overview: [
      "Orbit AI is a copilot layer that sits on top of the tools your team already uses. It reads context across your stack, drafts the next action, and — with your approval — carries it out.",
      "This is placeholder copy for the demo template. Replace it with the real product overview once the content is ready.",
    ],
    features: [
      {
        title: "Context-aware copilots",
        desc: "Copilots that understand your data, your docs and your workflows out of the box.",
      },
      {
        title: "Action, not just answers",
        desc: "Move from suggestion to execution — Orbit takes the steps you approve.",
      },
      {
        title: "Plug-in integrations",
        desc: "Connect your existing operational tools in minutes, no rebuild required.",
      },
      {
        title: "Guardrails & approvals",
        desc: "Every automated action runs inside policies and human checkpoints you define.",
      },
      {
        title: "Live observability",
        desc: "See what the copilot did, why, and what it changed — in real time.",
      },
      {
        title: "Enterprise-ready",
        desc: "Roles, audit trails and data controls built for teams that scale.",
      },
    ],
    highlights: [
      { label: "Faster ops", value: "3.4×" },
      { label: "Uptime", value: "99.9%" },
      { label: "Integrations", value: "40+" },
    ],
    gallery: ["/products/orbit-ai.svg"],
  },
  {
    slug: "vidyalaya",
    n: "02",
    name: "Vidyalaya",
    tagline: "A modern learning platform for schools and academies.",
    tag: "EDTECH",
    image: "/products/vidyalaya.svg",
    accent: "#a78bfa",
    overview: [
      "Vidyalaya brings classes, assignments, attendance and communication into one calm, modern platform — built for schools and academies that have outgrown spreadsheets and group chats.",
      "This is placeholder copy for the demo template. Replace it with the real product overview once the content is ready.",
    ],
    features: [
      {
        title: "Unified classroom",
        desc: "Lessons, materials and assignments organised per class and per student.",
      },
      {
        title: "Smart attendance",
        desc: "Roll-call in seconds with trends and alerts for at-risk students.",
      },
      {
        title: "Parent communication",
        desc: "Keep families in the loop with updates, grades and announcements.",
      },
      {
        title: "Gradebook & reports",
        desc: "Flexible grading that rolls up into clear term reports automatically.",
      },
      {
        title: "Scheduling",
        desc: "Timetables, rooms and teachers coordinated without the clashes.",
      },
      {
        title: "Works on any device",
        desc: "A responsive experience for staff, students and parents alike.",
      },
    ],
    highlights: [
      { label: "Schools", value: "120+" },
      { label: "Students", value: "85k" },
      { label: "Satisfaction", value: "4.8/5" },
    ],
    gallery: ["/products/vidyalaya.svg"],
  },
  {
    slug: "storely",
    n: "03",
    name: "Storely",
    tagline: "Launch a full commerce storefront in days, not months.",
    tag: "COMMERCE",
    image: "/products/storely.svg",
    accent: "#34d399",
    overview: [
      "Storely is a commerce toolkit that gets you from idea to storefront fast — products, cart, checkout and payments, all wired together and ready to customise.",
      "This is placeholder copy for the demo template. Replace it with the real product overview once the content is ready.",
    ],
    features: [
      {
        title: "Storefront in days",
        desc: "Start from polished templates and go live without a rebuild.",
      },
      {
        title: "Frictionless checkout",
        desc: "A conversion-tuned checkout with the payment methods buyers expect.",
      },
      {
        title: "Inventory & orders",
        desc: "Track stock, fulfil orders and handle returns from one dashboard.",
      },
      {
        title: "Discounts & campaigns",
        desc: "Run promotions, bundles and codes without touching code.",
      },
      {
        title: "Analytics",
        desc: "Understand what sells, what stalls and where buyers drop off.",
      },
      {
        title: "Headless-ready",
        desc: "Use the storefront as-is or drive it through the API.",
      },
    ],
    highlights: [
      { label: "Time to launch", value: "< 1wk" },
      { label: "Conversion lift", value: "+22%" },
      { label: "Stores live", value: "500+" },
    ],
    gallery: ["/products/storely.svg"],
  },
  {
    slug: "daykit",
    n: "04",
    name: "Daykit",
    tagline: "Plan the day once — tasks, notes and habits in one kit.",
    tag: "PRODUCTIVITY",
    image: "/products/daykit.svg",
    accent: "#fbbf24",
    overview: [
      "Daykit is a calm daily planner that keeps tasks, notes and habits in one place. Plan the day once in the morning, then let Daykit keep you on track.",
      "This is placeholder copy for the demo template. Replace it with the real product overview once the content is ready.",
    ],
    features: [
      {
        title: "One daily plan",
        desc: "A single view for what matters today — no app-switching.",
      },
      {
        title: "Tasks & notes together",
        desc: "Capture a thought or a to-do in the same quick flow.",
      },
      {
        title: "Habit streaks",
        desc: "Build routines with gentle, satisfying streak tracking.",
      },
      {
        title: "Quick capture",
        desc: "Get things out of your head in a keystroke, sort them later.",
      },
      {
        title: "Review & reflect",
        desc: "End the day with a light review that carries work forward.",
      },
      {
        title: "Syncs everywhere",
        desc: "Your kit stays in sync across phone, tablet and desktop.",
      },
    ],
    highlights: [
      { label: "Daily users", value: "60k" },
      { label: "Tasks/day", value: "1.2M" },
      { label: "Rating", value: "4.9/5" },
    ],
    gallery: ["/products/daykit.svg"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
