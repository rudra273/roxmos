"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { PRODUCTS, type Product } from "@/lib/products";

/* ──────────────────────────────────────────────────────────
   Products — scroll-stacked glass deck.

   Each card is `position: sticky` and ~90% of the viewport.
   Scrolling pins card N, then card N+1 slides up and over it.
   Every card pins a little lower than the previous one
   (STEP_REM), so once the whole deck is stacked the headers
   of the earlier cards stay visible — the "rows" state.
   Pinned cards also scale down slightly as they get covered.

   Product data (incl. detail-page content) lives in
   @/lib/products. Each card links to /products/[slug].
   ────────────────────────────────────────────────────────── */

const EASE = [0.22, 1, 0.36, 1] as const;

/* sticky-top of the first card, and how much lower each next
   card pins (= the visible "row" height of a covered card) */
const BASE_REM = 4.5;
const STEP_REM = 3.25;

export default function Products() {
  const deckRef = useRef<HTMLDivElement>(null);

  return (
    <section id="products" className="relative overflow-clip">
      {/* ── Gradient backdrop — light white→blue. Glows are
             pre-blurred radial gradients (no filter). ── */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,#f8fbff_0%,#e9f1ff_30%,#d2e3ff_64%,#b7d2ff_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(640px 640px at 4% 14%, rgba(77,162,255,0.28), transparent 70%)",
            "radial-gradient(700px 700px at 98% 46%, rgba(124,108,255,0.20), transparent 70%)",
            "radial-gradient(560px 560px at 38% 96%, rgba(130,190,255,0.22), transparent 70%)",
          ].join(","),
        }}
      />

      <div className="relative">
        {/* ── Heading ── */}
        <div className="mx-auto max-w-[1440px] px-6 pt-24 md:px-12 lg:px-16 lg:pt-32">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-mono text-[11px] tracking-[0.3em] text-primary"
          >
            PRODUCTS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
            className="mt-4 max-w-3xl pb-10 font-display text-3xl font-semibold leading-[1.05] tracking-tight text-ink md:pb-16 md:text-5xl"
          >
            Things we build, ship and run.
          </motion.h2>
        </div>

        {/* ── Sticky deck ── */}
        <div
          ref={deckRef}
          className="relative mx-auto flex max-w-[1440px] flex-col items-stretch gap-8 px-6 pb-24 md:px-12 lg:px-16"
        >
          {PRODUCTS.map((p, i) => (
            <ProductCard
              key={p.n}
              product={p}
              index={i}
              total={PRODUCTS.length}
            />
          ))}

          {/* ── Pin hold ──
               Extra scroll INSIDE the deck, after the cards. It extends
               the deck's height so the last card (sticky) stays pinned
               through this stretch — the deck freezes in place instead of
               scrolling up. Approach pulls itself up over this same amount
               (-mt-[100svh] z-10) and slides over the frozen deck like a
               sheet. This height and Approach's -mt MUST match. Keep
               Approach directly after Products in app/page.tsx. */}
          <div aria-hidden className="pointer-events-none h-[100svh]" />
        </div>
      </div>
    </section>
  );
}

/* ── One sticky glass card ── */

function ProductCard({
  product,
  index,
  total,
}: {
  product: Product;
  index: number;
  total: number;
}) {
  const { n, name, tagline, tag, image, accent, slug } = product;

  /* Each card pins a little lower than the previous one (the
     staggered `top`) so the earlier headers stay visible — that
     is the overlap effect. Every card gets the SAME height,
     sized to the deepest card's offset, so the image area (the
     flex-1 region below) is identical across all products and
     no card ends up taller or shorter than the others. Width is
     never scaled, so cards keep a constant width behind the deck. */
  const top = `${BASE_REM + index * STEP_REM}rem`;
  const height = `calc(100svh - ${BASE_REM + 2 + (total - 1) * STEP_REM}rem)`;

  return (
    <motion.article
      style={{ top, height }}
      className="sticky flex w-full flex-col overflow-hidden rounded-lg border border-white/12 bg-[#0a1120]/70 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_30px_70px_-24px_rgba(12,28,64,0.55)] backdrop-blur-2xl backdrop-saturate-150"
    >
      {/* header — stays visible as the "row" when covered */}
      <div className="flex items-center justify-between gap-4 px-5 pt-3 pb-3 md:px-8 md:pt-3.5 md:pb-4">
        <div className="flex min-w-0 items-center gap-3.5">
          <span
            className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-md border font-mono text-[11px] sm:flex"
            style={{ borderColor: `${accent}55`, color: accent }}
          >
            {n}
          </span>
          <h3 className="truncate font-display text-lg font-semibold tracking-tight md:text-2xl">
            {name}
          </h3>
          <span className="hidden font-mono text-[10px] tracking-[0.25em] text-white/40 lg:inline">
            {tag}
          </span>
        </div>

        {/* buttons — top right */}
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={`/products/${slug}`}
            className="hidden items-center rounded-md border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors duration-200 hover:bg-white/12 hover:text-white sm:inline-flex"
          >
            Details
          </Link>
          <Link
            href={`/products/${slug}`}
            className="inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-ink transition-colors duration-200 hover:bg-glow"
          >
            Visit
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3"
            >
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </Link>
        </div>
      </div>

      <p className="px-5 pb-4 text-sm text-white/55 md:px-8 md:text-base">
        {tagline}
      </p>

      {/* main image */}
      <div className="relative mx-4 mb-4 flex-1 overflow-hidden rounded-md border border-white/10 md:mx-6 md:mb-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={`${name} product screenshot`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* soft accent wash over the image bottom */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background: `linear-gradient(to top, ${accent}22, transparent)`,
          }}
        />
      </div>
    </motion.article>
  );
}
