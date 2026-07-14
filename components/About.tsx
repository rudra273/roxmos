"use client";

import { useRef } from "react";
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

export default function About() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 0.85", "start 0.3"],
  });

  const ROWS = [
    { n: "01", t: "Applied AI", d: "LLM & ML systems designed for production" },
    { n: "02", t: "Product & Web", d: "Full-stack SaaS, web and mobile builds" },
    { n: "03", t: "Experience Design", d: "Interface and UX for complex systems" },
    { n: "04", t: "MLOps", d: "Evaluation, monitoring and drift control" },
  ];

  return (
    <section id="about">
      {/* ── White part — big statement ── */}
      <div className="bg-paper text-ink">
        <div className="mx-auto max-w-[1440px] px-6 pb-16 pt-40 md:px-12 lg:px-16 lg:pt-48">
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

      {/* ── Grey part — capability rows ── */}
      <div className="bg-[#e8ebf1] text-ink">
        <div className="mx-auto max-w-[1440px] px-6 py-8 md:px-12 lg:px-16">
          {ROWS.map((row, i) => (
            <motion.div
              key={row.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className="flex items-baseline gap-6 border-t border-ink/10 py-6 md:gap-12"
            >
              <span className="font-mono text-xs text-ink/35">{row.n}</span>
              <h3 className="w-40 shrink-0 font-display text-lg font-semibold md:w-64 md:text-2xl">
                {row.t}
              </h3>
              <p className="text-sm text-ink/55 md:text-base">{row.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
