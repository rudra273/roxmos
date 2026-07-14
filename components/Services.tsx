"use client";

import { useEffect, useRef, type ReactElement } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

/* ──────────────────────────────────────────────────────────
   Sui-style scroll timeline (sui.io "Innovation, engineered.").

   A central dashed vertical line runs down the middle. A white
   cube marker + a filled segment track scroll progress along it.
   Service cards alternate left / right of the line in a zigzag.

   As the marker reaches a card, that card "opens":
     · the mono all-caps title decodes character-by-character
       out of a scramble (Sui uses SplitText + ScrambleText)
     · the card body expands (height 0 → full) and its isometric
       graphic scales in (0.7 → 1, opacity 0 → 1) — our
       dependency-free stand-in for Sui's Rive 3D icons
   Everything reverses on scroll-up.

   framer-motion only, to stay consistent with Hero/About
   (no GSAP / Lenis / Rive dependency).
   ────────────────────────────────────────────────────────── */

const EASE = [0.22, 1, 0.36, 1] as const;
const SCRAMBLE = "ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789#%&/<>*+=";

type LineIcon = (props: { className?: string }) => ReactElement;

const SERVICES: {
  n: string;
  title: string;
  tag: string;
  Icon: LineIcon;
}[] = [
  { n: "01", title: "AI SaaS Products", tag: "LLM · RAG · EVALS", Icon: IconAI },
  { n: "02", title: "Web Development", tag: "NEXT.JS · EDGE", Icon: IconWeb },
  { n: "03", title: "Mobile Development", tag: "iOS · ANDROID", Icon: IconMobile },
  { n: "04", title: "User Experience Design", tag: "RESEARCH · UI", Icon: IconUX },
];

export default function Services() {
  const reduceMotion = useReducedMotion() ?? false;
  const listRef = useRef<HTMLDivElement>(null);

  // Scroll progress of the timeline column through the viewport centre.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.6", "end 0.4"],
  });
  const fillH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const markerTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="services" className="bg-ink text-white">
      <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-12 lg:px-16 lg:py-32">
        {/* ── Heading ── */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
        >
          Built to ship.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="mt-5 flex items-center gap-3"
        >
          <span className="h-3 w-3 shrink-0 bg-primary" />
          <span className="text-sm text-white/55 md:text-base">
            Four disciplines, one team — from first design to production.
          </span>
        </motion.div>

        {/* ── Timeline ── */}
        <div ref={listRef} className="relative mt-16 lg:mt-24">
          {/* Central dashed line + progress + marker */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-[11px] w-px -translate-x-1/2 md:left-1/2"
          >
            {/* dashed track */}
            <div className="absolute inset-0 w-px [background-image:repeating-linear-gradient(to_bottom,rgba(255,255,255,0.28)_0_2px,transparent_2px_12px)]" />
            {/* filled progress */}
            {!reduceMotion && (
              <motion.div
                style={{ height: fillH }}
                className="absolute left-0 top-0 w-px bg-primary/80"
              />
            )}
            {/* travelling marker */}
            {!reduceMotion && (
              <motion.div
                style={{ top: markerTop }}
                className="absolute left-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 bg-white shadow-[0_0_16px_rgba(130,190,255,0.9)]"
              />
            )}
          </div>

          {/* Rows */}
          <div className="flex flex-col gap-10 md:gap-4">
            {SERVICES.map((s, i) => (
              <ServiceRow
                key={s.n}
                service={s}
                side={i % 2 === 0 ? "right" : "left"}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── One timeline row — card sits left or right of the line ── */

function ServiceRow({
  service,
  side,
  reduceMotion,
}: {
  service: (typeof SERVICES)[number];
  side: "left" | "right";
  reduceMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-35% 0px -35% 0px" });
  const active = reduceMotion || inView;

  const rightSide = side === "right";

  return (
    <div
      ref={ref}
      className={[
        "relative pl-8 md:grid md:grid-cols-2 md:gap-x-16 md:pl-0",
      ].join(" ")}
    >
      {/* connector node where this row meets the centre line */}
      <span
        aria-hidden
        className={[
          "absolute top-9 h-[7px] w-[7px] -translate-y-1/2 transition-colors duration-500",
          active ? "bg-primary" : "bg-white/25",
          "left-[11px] -translate-x-1/2 md:left-1/2",
        ].join(" ")}
      />
      {/* connector line to the card */}
      <span
        aria-hidden
        className={[
          "absolute top-9 hidden h-px -translate-y-1/2 transition-colors duration-500 md:block",
          active ? "bg-primary/60" : "bg-white/15",
          rightSide ? "left-1/2 w-16" : "right-1/2 w-16",
        ].join(" ")}
      />

      {/* card — placed in the correct grid column */}
      <div className={rightSide ? "md:col-start-2" : "md:col-start-1"}>
        <ServiceCard service={service} active={active} reduceMotion={reduceMotion} />
      </div>
    </div>
  );
}

function ServiceCard({
  service,
  active,
  reduceMotion,
}: {
  service: (typeof SERVICES)[number];
  active: boolean;
  reduceMotion: boolean;
}) {
  const { n, title, tag, Icon } = service;

  return (
    <div className="relative border border-white/12 bg-surface/40">
      {/* corner squares (Sui's gray_cube) */}
      <CornerSquares active={active} />

      {/* header: number box + decoding title */}
      <div className="flex items-center gap-4 border-b border-white/10 p-4 md:p-5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/15 font-mono text-xs text-white/70">
          {n}
        </span>
        <ScrambleTitle text={title} active={active} reduceMotion={reduceMotion} />
      </div>

      {/* body: expands to reveal the isometric graphic */}
      <motion.div
        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
        animate={{
          height: active ? 200 : reduceMotion ? 200 : 0,
          opacity: active ? 1 : reduceMotion ? 1 : 0,
        }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative overflow-hidden"
      >
        <div className="relative h-[200px] w-full">
          <IsoGraphic active={active} reduceMotion={reduceMotion} />
          {/* glowing service icon at the centre node */}
          <motion.div
            animate={{
              opacity: active ? 1 : 0,
              scale: active ? 1 : 0.6,
            }}
            transition={{ duration: 0.5, ease: EASE, delay: active ? 0.35 : 0 }}
            className="absolute left-1/2 top-[38%] flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-ink/70 text-glow ring-1 ring-inset ring-primary/40 shadow-[0_0_24px_rgba(77,162,255,0.5)] backdrop-blur-sm"
          >
            <Icon className="h-5 w-5" />
          </motion.div>
        </div>
      </motion.div>

      {/* footer: line icon + capability tag */}
      <div className="flex items-center gap-3 border-t border-white/10 p-4 md:p-5">
        <Icon className="h-4 w-4 text-white/45" />
        <span className="font-mono text-[11px] tracking-[0.2em] text-white/40">
          {tag}
        </span>
      </div>
    </div>
  );
}

function CornerSquares({ active }: { active: boolean }) {
  const base =
    "absolute h-[5px] w-[5px] transition-colors duration-500 " +
    (active ? "bg-primary" : "bg-white/20");
  return (
    <>
      <span className={base + " left-0 top-0 -translate-x-1/2 -translate-y-1/2"} />
      <span className={base + " right-0 top-0 translate-x-1/2 -translate-y-1/2"} />
      <span className={base + " left-0 bottom-0 -translate-x-1/2 translate-y-1/2"} />
      <span className={base + " right-0 bottom-0 translate-x-1/2 translate-y-1/2"} />
    </>
  );
}

/* ── Title that decodes character-by-character ──
   Small mono all-caps, like Sui's card titles. A rAF loop eases
   `progress` 0↔1 as the card activates; chars resolve left→right,
   showing scramble glyphs until resolved. Spans are mutated
   directly (refs) to avoid per-frame re-renders. */

function ScrambleTitle({
  text,
  active,
  reduceMotion,
}: {
  text: string;
  active: boolean;
  reduceMotion: boolean;
}) {
  const chars = text.split("");
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const progress = useRef(0);
  const raf = useRef<number | null>(null);

  const paint = (p: number) => {
    const n = chars.length;
    for (let i = 0; i < n; i++) {
      const el = spanRefs.current[i];
      if (!el) continue;
      const ch = chars[i];
      if (ch === " ") {
        el.textContent = " ";
        el.style.opacity = "1";
        continue;
      }
      const start = (i / n) * 0.55;
      const cp = clamp((p - start) / 0.45, 0, 1);
      if (cp >= 1) {
        el.textContent = ch;
        el.style.opacity = "1";
      } else if (cp <= 0) {
        el.textContent = randGlyph();
        el.style.opacity = "0.2";
      } else {
        el.textContent = randGlyph();
        el.style.opacity = String(0.2 + cp * 0.8);
      }
    }
  };

  useEffect(() => {
    if (!reduceMotion) return;
    progress.current = 1;
    paint(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const DURATION = 700;
    const from = progress.current;
    const to = active ? 1 : 0;
    if (from === to) {
      paint(to);
      return;
    }
    const startTime = performance.now();
    const tick = (now: number) => {
      const t = clamp((now - startTime) / DURATION, 0, 1);
      const eased = 1 - Math.pow(2, -10 * t);
      const p = from + (to - from) * (t >= 1 ? 1 : eased);
      progress.current = p;
      paint(p);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reduceMotion]);

  return (
    <span
      aria-label={text}
      className="font-mono text-xs uppercase tracking-[0.12em] text-white md:text-sm"
    >
      {chars.map((ch, i) => (
        <span
          key={i}
          aria-hidden
          ref={(el) => {
            spanRefs.current[i] = el;
          }}
          className="inline-block whitespace-pre"
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

/* ── Isometric graphic — dependency-free stand-in for Sui's Rive
   3D icons. Two stacked iso planes with a grid, drawn in on
   activate, gently floating. ── */

const drawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.8, ease: EASE, delay: 0.1 + i * 0.06 },
      opacity: { duration: 0.25, delay: 0.1 + i * 0.06 },
    },
  }),
};

function IsoGraphic({
  active,
  reduceMotion,
}: {
  active: boolean;
  reduceMotion: boolean;
}) {
  const state = reduceMotion ? "visible" : active ? "visible" : "hidden";

  return (
    <motion.div
      animate={reduceMotion ? undefined : { y: active ? [0, -6, 0] : 0 }}
      transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.svg
        viewBox="0 0 320 220"
        className="h-full w-full max-w-[340px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduceMotion ? false : "hidden"}
        animate={state}
      >
        {/* top plane */}
        <g className="text-primary">
          <motion.path
            d="M160 30 L265 72 L160 114 L55 72 Z"
            variants={drawVariants}
            custom={0}
          />
          <motion.path
            d="M107.5 51 L212.5 93"
            className="text-white/25"
            variants={drawVariants}
            custom={1}
          />
          <motion.path
            d="M212.5 51 L107.5 93"
            className="text-white/25"
            variants={drawVariants}
            custom={1}
          />
        </g>

        {/* vertical connectors */}
        <g className="text-white/25">
          <motion.path d="M55 72 L55 150" variants={drawVariants} custom={2} />
          <motion.path d="M265 72 L265 150" variants={drawVariants} custom={2} />
          <motion.path d="M160 114 L160 192" variants={drawVariants} custom={2} />
        </g>

        {/* bottom plane */}
        <g className="text-glow/70">
          <motion.path
            d="M160 108 L265 150 L160 192 L55 150 Z"
            variants={drawVariants}
            custom={3}
          />
          <motion.path
            d="M107.5 129 L212.5 171"
            className="text-white/20"
            variants={drawVariants}
            custom={4}
          />
          <motion.path
            d="M212.5 129 L107.5 171"
            className="text-white/20"
            variants={drawVariants}
            custom={4}
          />
        </g>
      </motion.svg>
    </motion.div>
  );
}

/* ── helpers ── */

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}
function randGlyph() {
  return SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
}

/* ── Line icons ── */

function IconAI({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M12 8.5 13 11l2.5 1-2.5 1-1 2.5-1-2.5L8.5 12l2.5-1 1-2.5Z" />
    </svg>
  );
}

function IconWeb({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m8 9-3 3 3 3" />
      <path d="m16 9 3 3-3 3" />
      <path d="M13.5 7.5 10.5 16.5" />
    </svg>
  );
}

function IconMobile({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="7" y="3" width="10" height="18" rx="2.5" />
      <path d="M10.5 17.5h3" />
    </svg>
  );
}

function IconUX({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 4l6.5 15.5 2.4-6.1 6.1-2.4L5 4Z" />
    </svg>
  );
}
