"use client";

import { motion } from "framer-motion";

/* ──────────────────────────────────────────────────────────
   Contact — simple placeholder for now (to be redesigned).

   NOTE: `-mt-[100vh]` is load-bearing. The Work section's
   scroll track is one viewport taller than its content, and
   this section pulls itself up by exactly that viewport — so
   it slides OVER the still-pinned Work stage like a sheet.
   Keep Contact directly after Work in app/page.tsx.
   ────────────────────────────────────────────────────────── */

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative z-10 -mt-[100vh] min-h-screen rounded-t-[2rem] border-t border-white/10 bg-surface shadow-[0_-40px_80px_-20px_rgba(0,0,0,0.8)]"
    >
      {/* blue ambience */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-[2rem]"
        style={{
          background:
            "radial-gradient(800px 500px at 50% 0%, rgba(77,162,255,0.10), transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-[1440px] flex-col justify-center px-6 py-24 md:px-12 lg:px-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="font-mono text-[11px] tracking-[0.3em] text-primary"
        >
          CONTACT
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
          className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl"
        >
          Let&apos;s build what&apos;s next.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="mt-6 max-w-xl text-base text-white/55"
        >
          Tell us about your product, platform or problem — we&apos;ll get back
          within a day.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="mt-12 flex flex-col gap-6 md:flex-row md:items-center"
        >
          <a
            href="mailto:hello@roxmos.com"
            className="glass inline-flex w-fit items-center gap-3 rounded-lg px-6 py-4 text-lg font-medium text-white transition-colors duration-200 hover:bg-white/10"
          >
            hello@roxmos.com
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-primary"
            >
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </a>
          <span className="font-mono text-[10px] tracking-[0.25em] text-white/35">
            OR DROP US A LINE ANYTIME
          </span>
        </motion.div>
      </div>
    </section>
  );
}
