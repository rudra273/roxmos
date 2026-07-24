"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { PrivacyPolicyContent } from "@/lib/daykit-privacy";

/* ──────────────────────────────────────────────────────────
   PrivacyPolicy — a reusable, data-driven policy page body.

   Renders any product's policy from a PrivacyPolicyContent
   object, so the same component backs DayKit today and any
   future product's /products/[slug]/privacy-policy page.

   Kept as a "use client" component like the rest of the site's
   sections; the server route handles metadata. Styling mirrors
   ProductDetail: bg-ink base, mono eyebrows, font-display
   headings, and the signature glass frame for the document.
   ────────────────────────────────────────────────────────── */

const EASE = [0.22, 1, 0.36, 1] as const;

const CONTAINER = "mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16";

export default function PrivacyPolicy({
  content,
  productSlug,
  accent = "#4da2ff",
}: {
  content: PrivacyPolicyContent;
  productSlug?: string;
  accent?: string;
}) {
  const { product, effectiveDate, intro, sections } = content;

  return (
    <section className="relative overflow-clip bg-ink pt-32 pb-24 md:pt-40 md:pb-32">
      {/* accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(760px 520px at 20% 0%, ${accent}1c, transparent 70%)`,
        }}
      />

      <div className={`relative ${CONTAINER}`}>
        {/* breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-8 flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-white/40"
        >
          <Link href="/#products" className="transition-colors hover:text-white">
            PRODUCTS
          </Link>
          <span aria-hidden>/</span>
          {productSlug ? (
            <Link
              href={`/products/${productSlug}`}
              className="uppercase transition-colors hover:text-white"
            >
              {product}
            </Link>
          ) : (
            <span className="uppercase">{product}</span>
          )}
          <span aria-hidden>/</span>
          <span style={{ color: accent }}>PRIVACY</span>
        </motion.div>

        {/* header */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
          className="max-w-3xl font-display text-4xl font-semibold leading-[1.03] tracking-tight text-white md:text-6xl"
        >
          {product} Privacy Policy
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
          className="mt-5 font-mono text-[12px] tracking-[0.2em]"
          style={{ color: accent }}
        >
          EFFECTIVE {effectiveDate.toUpperCase()}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
          className="mt-3 max-w-2xl text-base text-white/55 md:text-lg"
        >
          {intro}
        </motion.p>

        {/* document */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="glass mt-12 rounded-loose p-7 md:mt-16 md:p-12"
        >
          <div className="space-y-12">
            {sections.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.05, ease: EASE }}
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className="font-mono text-[11px] tracking-[0.25em]"
                    style={{ color: accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-xl font-semibold tracking-tight text-white md:text-2xl">
                    {s.title}
                  </h2>
                </div>
                <div className="mt-4 space-y-3 border-l border-white/10 pl-5 md:pl-6">
                  {s.body.map((para, j) => (
                    <p
                      key={j}
                      className="text-[15px] leading-relaxed text-white/65 md:text-base"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* back link */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-12 flex flex-wrap gap-3"
        >
          {productSlug && (
            <Link
              href={`/products/${productSlug}`}
              className="inline-flex h-11 items-center rounded-tight bg-primary px-6 text-[13.5px] font-semibold text-white transition-colors duration-200 hover:bg-accent"
            >
              Back to {product}
            </Link>
          )}
          <Link
            href="/#products"
            className="inline-flex h-11 items-center rounded-tight border border-white/20 bg-white/5 px-6 text-[13.5px] font-medium text-white/80 transition-colors duration-200 hover:bg-white/12 hover:text-white"
          >
            All products
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
