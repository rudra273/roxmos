"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { Product } from "@/lib/products";

/* ──────────────────────────────────────────────────────────
   ProductDetail — the animated body of a /products/[slug] page.

   Kept as a "use client" component (like the rest of the site's
   sections) so the server page.tsx can stay a plain server
   component that handles params + metadata. Everything here is
   driven by the `product` prop from @/lib/products.

   Styling mirrors the homepage: bg-ink/bg-paper alternating
   sections, mono eyebrows, font-display headings, the per-product
   `accent` for badges/washes, and the signature glass frame.
   ────────────────────────────────────────────────────────── */

const EASE = [0.22, 1, 0.36, 1] as const;

const CONTAINER = "mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16";

export default function ProductDetail({ product }: { product: Product }) {
  const {
    n,
    name,
    tagline,
    tag,
    image,
    accent,
    overview,
    features,
    highlights,
    gallery,
  } = product;

  return (
    <>
      {/* ── 1. Hero (dark) ── */}
      <section className="relative overflow-clip bg-ink pt-32 pb-20 md:pt-40 md:pb-28">
        {/* accent glow, tinted per product */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(760px 520px at 20% 0%, ${accent}22, transparent 70%)`,
          }}
        />

        <div className={`relative ${CONTAINER}`}>
          {/* breadcrumb / back */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-8 flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-white/40"
          >
            <Link
              href="/#products"
              className="transition-colors hover:text-white"
            >
              PRODUCTS
            </Link>
            <span aria-hidden>/</span>
            <span style={{ color: accent }}>{tag}</span>
          </motion.div>

          <div className="flex items-start gap-4 md:gap-6">
            {/* numbered accent badge */}
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mt-1 hidden h-11 w-11 shrink-0 items-center justify-center rounded-md border font-mono text-sm sm:flex"
              style={{ borderColor: `${accent}55`, color: accent }}
            >
              {n}
            </motion.span>

            <div className="min-w-0">
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
                className="max-w-3xl font-display text-4xl font-semibold leading-[1.03] tracking-tight text-white md:text-6xl"
              >
                {name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
                className="mt-5 max-w-2xl text-base text-white/55 md:text-lg"
              >
                {tagline}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.18, ease: EASE }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Link
                  href="/#contact"
                  className="inline-flex h-11 items-center rounded-tight bg-primary px-6 text-[13.5px] font-semibold text-white transition-colors duration-200 hover:bg-accent"
                >
                  Get Started
                </Link>
                <Link
                  href="/#products"
                  className="inline-flex h-11 items-center rounded-tight border border-white/20 bg-white/5 px-6 text-[13.5px] font-medium text-white/80 transition-colors duration-200 hover:bg-white/12 hover:text-white"
                >
                  Back to products
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Showcase image (dark) — signature glass frame ── */}
      <section className="bg-ink pb-20 md:pb-28">
        <div className={CONTAINER}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="glass relative aspect-[16/9] overflow-hidden rounded-loose"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={`${name} product screenshot`}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
              style={{
                background: `linear-gradient(to top, ${accent}22, transparent)`,
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── 3. Overview (light) ── */}
      <section className="bg-paper py-24 text-ink lg:py-32">
        <div className={CONTAINER}>
          <div className="grid gap-10 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-16">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: EASE }}
                className="font-mono text-[11px] tracking-[0.3em] text-ink/40"
              >
                OVERVIEW
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
                className="mt-4 font-display text-3xl font-semibold leading-[1.05] tracking-tight md:text-4xl"
              >
                What {name} is.
              </motion.h2>
            </div>

            <div className="space-y-5">
              {overview.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: 0.08 + i * 0.06, ease: EASE }}
                  className="text-lg leading-relaxed text-ink/70"
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Features grid (dark) ── */}
      <section className="bg-ink py-24 lg:py-32">
        <div className={CONTAINER}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-mono text-[11px] tracking-[0.3em] text-primary"
          >
            FEATURES
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
            className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl"
          >
            Everything you get.
          </motion.h2>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.06, ease: EASE }}
                className="group relative overflow-hidden rounded-loose border border-white/12 bg-surface/40 p-6 transition-colors duration-300 hover:border-white/20"
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-md border"
                  style={{ borderColor: `${accent}44`, color: accent }}
                >
                  <IconSpark />
                </span>
                <h3 className="mt-5 font-display text-lg font-medium tracking-tight text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Highlights / stats band (dark surface) ── */}
      <section className="bg-surface py-20 lg:py-28">
        <div className={CONTAINER}>
          <div className="grid gap-8 sm:grid-cols-3">
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
                className="text-center sm:text-left"
              >
                <div
                  className="font-display text-4xl font-semibold tracking-tight md:text-5xl"
                  style={{ color: accent }}
                >
                  {h.value}
                </div>
                <div className="mt-2 font-mono text-[11px] tracking-[0.25em] text-white/40">
                  {h.label.toUpperCase()}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* extra gallery images, if more than the hero shot exists */}
      {gallery.length > 1 && (
        <section className="bg-ink pb-24 lg:pb-32">
          <div className={CONTAINER}>
            <div className="grid gap-4 md:grid-cols-2">
              {gallery.slice(1).map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
                  className="glass relative aspect-[16/10] overflow-hidden rounded-loose"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${name} screenshot ${i + 2}`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. CTA band (dark) ── */}
      <section className="relative overflow-clip bg-ink py-24 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(700px 400px at 50% 100%, ${accent}1f, transparent 70%)`,
          }}
        />
        <div className={`relative ${CONTAINER} text-center`}>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mx-auto max-w-2xl font-display text-3xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl"
          >
            Ready to try {name}?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <Link
              href="/#contact"
              className="inline-flex h-11 items-center rounded-tight bg-primary px-6 text-[13.5px] font-semibold text-white transition-colors duration-200 hover:bg-accent"
            >
              Get Started
            </Link>
            <Link
              href="/#products"
              className="inline-flex h-11 items-center rounded-tight border border-white/20 bg-white/5 px-6 text-[13.5px] font-medium text-white/80 transition-colors duration-200 hover:bg-white/12 hover:text-white"
            >
              Explore other products
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* ── Icon — minimal spark mark, matches the site's inline-svg style ── */
function IconSpark() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M8 1.5 9.6 6.4 14.5 8 9.6 9.6 8 14.5 6.4 9.6 1.5 8 6.4 6.4 8 1.5Z" />
    </svg>
  );
}
