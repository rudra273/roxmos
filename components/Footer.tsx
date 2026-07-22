"use client";

import { motion } from "framer-motion";

/* ──────────────────────────────────────────────────────────
   Footer — two sections:
   1. Upper  · brand blurb + several nav-link columns
   2. Lower  · dark, full-width "ROXMOS" wordmark spread
              corner-to-corner, with a slim legal bar.
   ────────────────────────────────────────────────────────── */

const EASE = [0.22, 1, 0.36, 1] as const;

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Approach", href: "#approach" },
      { label: "Work", href: "#work" },
      { label: "Blog", href: "#blog" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "AI SaaS Products", href: "#services" },
      { label: "Web Development", href: "#services" },
      { label: "Mobile Development", href: "#services" },
      { label: "User Experience", href: "#services" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Overview", href: "#products" },
      { label: "Platform", href: "#products" },
      { label: "Pricing", href: "#products" },
      { label: "Changelog", href: "#products" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "X / Twitter", href: "https://twitter.com" },
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "GitHub", href: "https://github.com" },
      { label: "Dribbble", href: "https://dribbble.com" },
    ],
  },
];

const WORDMARK = "ROXMOS".split("");

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative w-full overflow-hidden border-t border-white/10 bg-ink"
    >
      {/* blue ambience */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 500px at 50% 100%, rgba(77,162,255,0.10), transparent 70%)",
        }}
      />

      {/* ── Upper: nav links ── */}
      <div className="relative mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_repeat(4,1fr)] md:gap-8">
          {/* Brand blurb */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="font-display text-2xl font-bold tracking-tight text-white">
              ROX<span className="text-accent">MOS</span>
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              We design and build AI-native products, platforms and the
              experiences around them.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors duration-200 hover:text-glow"
            >
              Start a project
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
          </motion.div>

          {/* Link columns */}
          {COLUMNS.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.05 + i * 0.05, ease: EASE }}
            >
              <h3 className="font-mono text-[11px] tracking-[0.25em] text-white/40">
                {col.title.toUpperCase()}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-sm text-white/60 transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Lower: giant corner-to-corner wordmark ── */}
      <div className="relative w-full border-t border-white/10">
        {/* legal bar */}
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-12 lg:px-16">
          <p className="font-mono text-[11px] tracking-[0.2em] text-white/35">
            © {2026} ROXMOS — ALL RIGHTS RESERVED
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-white/40 transition-colors duration-200 hover:text-white/70"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-xs text-white/40 transition-colors duration-200 hover:text-white/70"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-xs text-white/40 transition-colors duration-200 hover:text-white/70"
            >
              Cookies
            </a>
          </div>
        </div>

        {/* full-width ROXMOS — letters spread edge to edge */}
        <div className="flex w-full items-end justify-between px-4 pb-2 md:px-8 md:pb-4">
          {WORDMARK.map((letter, i) => (
            <span
              key={i}
              className="select-none font-display font-bold leading-[0.8] tracking-tight text-white/[0.06]"
              style={{ fontSize: "clamp(3rem, 17vw, 16rem)" }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
