"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ──────────────────────────────────────────────────────────
   Lesse-style navbar:
   - Floating logo square (top-left)
   - Centered dark blurred bar with 4 links
   - "Services" expands the bar's height into a 2-col card grid
   ────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Products", href: "#products" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  { title: "AI SaaS Products", meta: "/01", icon: IconAI },
  { title: "Web Development", meta: "/02", icon: IconWeb },
  { title: "Mobile Development", meta: "/03", icon: IconMobile },
  { title: "User Experience Design", meta: "/04", icon: IconUX },
];

const EASE = [0.4, 0, 0.2, 1] as const;

export default function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Floating logo — top left */}
      <a
        href="#"
        aria-label="ROXMOS home"
        className="fixed left-4 top-4 z-50 flex h-12 items-center rounded-[14px] bg-[#0a0a0a]/90 px-5 font-display text-lg font-bold tracking-tight backdrop-blur-xl"
      >
        ROX<span className="text-accent">MOS</span>
      </a>

      {/* Get Started — top right (desktop only) */}
      <a
        href="#contact"
        className="fixed right-4 top-5 z-50 hidden h-9 items-center rounded-md bg-primary px-5 text-[13.5px] font-semibold text-white transition-colors duration-200 hover:bg-accent md:flex"
      >
        Get Started
      </a>

      {/* ── Centered bar (desktop) ── */}
      <nav className="pointer-events-none fixed inset-x-0 top-4 z-50 hidden justify-center md:flex">
        <motion.div
          initial={false}
          onMouseLeave={() => setServicesOpen(false)}
          animate={{ height: servicesOpen ? "auto" : 50 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="pointer-events-auto w-fit max-w-[calc(100vw-3rem)] overflow-hidden rounded-[16px] bg-[rgba(30,32,40,0.55)] p-2 backdrop-blur-[44px]"
        >
          {/* Link row */}
          <div className="flex items-center gap-1">
            <button
              onMouseEnter={() => setServicesOpen(true)}
              onClick={() => setServicesOpen((v) => !v)}
              className={`whitespace-nowrap rounded-[9px] px-3.5 py-2 text-center text-[12.5px] font-medium text-white transition-colors duration-200 ${
                servicesOpen ? "bg-white/10" : "hover:bg-white/10"
              }`}
            >
              Services
            </button>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onMouseEnter={() => setServicesOpen(false)}
                className="whitespace-nowrap rounded-[9px] px-3.5 py-2 text-center text-[12.5px] font-medium text-white transition-colors duration-200 hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Services dropdown — 2-col card grid */}
          <div className="mt-2 grid grid-cols-2 gap-2">
            {SERVICES.map((s) => (
              <a
                key={s.title}
                href="#services"
                onClick={() => setServicesOpen(false)}
                className="group relative flex h-[110px] flex-col justify-between overflow-hidden rounded-[14px] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-[18px] transition-transform duration-200 ease-out active:scale-[0.98]"
              >
                {/* hover sheen */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,rgba(77,162,255,0.14),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative flex items-center gap-2.5">
                  <s.icon />
                  <h3 className="text-[15px] font-medium text-white">
                    {s.title}
                  </h3>
                  <span className="ml-auto text-[11px] text-white/40">
                    {s.meta}
                  </span>
                </div>

                <span className="relative text-[12px] text-white/35 transition-colors duration-300 group-hover:text-glow">
                  Explore →
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </nav>

      {/* ── Mobile: burger (top-right) + fullscreen overlay ── */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
        className="fixed right-4 top-4 z-50 flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-[14px] bg-[#0a0a0a]/90 backdrop-blur-xl md:hidden"
      >
        <span className="h-px w-5 bg-white" />
        <span className="h-px w-5 bg-white" />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink/85 backdrop-blur-2xl md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-display text-lg font-bold">
                ROX<span className="text-accent">MOS</span>
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xl"
              >
                ×
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
              {[{ label: "Services", href: "#services" }, ...NAV_LINKS].map(
                (link, i) => (
                  <div key={link.href + link.label} className="overflow-hidden">
                    <motion.a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%" }}
                      transition={{
                        duration: 0.55,
                        delay: 0.08 + i * 0.07,
                        ease: EASE,
                      }}
                      className="block font-display text-5xl font-bold tracking-tight text-white/90 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </motion.a>
                  </div>
                ),
              )}
            </nav>

            <div className="px-8 pb-10">
              <p className="mb-3 text-xs uppercase tracking-wider text-white/30">
                Services
              </p>
              <ul className="space-y-1.5 text-sm text-white/60">
                {SERVICES.map((s) => (
                  <li key={s.title}>{s.title}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Card icons (16px, minimal marks) ── */

function IconAI() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-glow">
      <path d="M8 1.5 9.6 6.4 14.5 8 9.6 9.6 8 14.5 6.4 9.6 1.5 8 6.4 6.4 8 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function IconWeb() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-glow">
      <path d="m5.5 5-3 3 3 3M10.5 5l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconMobile() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-glow">
      <rect x="4.5" y="1.75" width="7" height="12.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 12h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconUX() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-glow">
      <path d="M2.5 2.5 7 13.5l1.5-4.5L13 7.5 2.5 2.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}
