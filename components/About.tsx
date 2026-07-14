"use client";

import { useRef, type ReactElement } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Big statement — revealed word by word on scroll.
   `hl` words get a black highlight box that fills in. */
const HEADING: { t: string; hl?: boolean }[] = [
  { t: "We" }, { t: "design" }, { t: "AI" }, { t: "systems" },
  { t: "that" }, { t: "move" }, { t: "from" }, { t: "prototype" },
  { t: "to" }, { t: "production", hl: true }, { t: "—" }, { t: "built," },
  { t: "evaluated," }, { t: "and" }, { t: "run" }, { t: "with" },
  { t: "real" }, { t: "engineering", hl: true }, { t: "rigor." },
];

function Word({
  word,
  progress,
  range,
}: {
  word: { t: string; hl?: boolean };
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);

  return (
    <span className="mr-[0.28em] inline-block">
      <motion.span
        style={{ opacity }}
        className={
          word.hl
            ? "rounded-md bg-ink px-2 py-0.5 text-paper"
            : "text-ink"
        }
      >
        {word.t}
      </motion.span>
    </span>
  );
}

const PRINCIPLES: { n: string; t: string; Icon: (props: { className?: string }) => ReactElement }[] = [
  { n: "01", t: "We measure before we ship", Icon: IconMeasure },
  { n: "02", t: "Fewer people, deeper ownership", Icon: IconTeam },
  { n: "03", t: "Built to run, not to pitch", Icon: IconRun },
  { n: "04", t: "We own outcomes end-to-end", Icon: IconEndToEnd },
];

export default function About() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 0.85", "start 0.3"],
  });

  return (
    <section id="about">
      {/* ── White part — big statement ── */}
      <div className="bg-paper text-ink">
        <div className="mx-auto max-w-[1440px] px-6 pb-16 pt-20 md:px-12 lg:px-16 lg:pt-24">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-mono text-[11px] tracking-[0.3em] text-ink/40"
          >
            ABOUT ROXMOS
          </motion.p>

          <h2
            ref={headingRef}
            className="mt-10 max-w-5xl font-display text-3xl font-semibold leading-[1.22] tracking-tight md:text-5xl lg:text-6xl"
          >
            {HEADING.map((word, i) => {
              const start = i / HEADING.length;
              const end = start + 1 / HEADING.length;
              return (
                <Word
                  key={i}
                  word={word}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </h2>
        </div>
      </div>

      {/* ── Grey part — operating principles ── */}
      <div className="bg-[#e8ebf1] text-ink">
        <div className="mx-auto max-w-[1440px] px-6 py-5 md:px-12 lg:px-16 lg:py-6">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className="flex items-center justify-between gap-6 border-t border-ink/10 py-3.5 last:border-b md:py-4"
            >
              <div className="flex items-center gap-5 md:gap-10">
                <span className="font-mono text-xs text-ink/35">{p.n}</span>
                <h3 className="font-display text-base font-semibold tracking-tight md:text-xl">
                  {p.t}
                </h3>
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary md:h-11 md:w-11">
                <p.Icon className="h-4 w-4 text-white md:h-5 md:w-5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Row icons — each maps directly to its principle ──
   01 measure → bar chart · 02 fewer people → team ·
   03 built to run → terminal prompt · 04 end-to-end → route between two points */

function IconMeasure({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 3v18h18" />
      <path d="M8 17v-4" />
      <path d="M13 17V8" />
      <path d="M18 17V6" />
    </svg>
  );
}

function IconTeam({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconRun({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 17l6-6-6-6" />
      <path d="M12 19h8" />
    </svg>
  );
}

function IconEndToEnd({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </svg>
  );
}
