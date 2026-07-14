"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* ──────────────────────────────────────────────────────────
   Work — pinned client-work showcase.

   The whole section is a tall scroll track (WRAP_VH). Inside
   it a 100svh stage is `position: sticky`, so it pins while
   you scroll. Left column: project text that crossfades.
   Right column: images stacked in one glass frame — each new
   image slides in from the right and fully covers the one
   below it.

   The track is one viewport TALLER than the projects need
   (HOLD segment at the end). During that last stretch the
   stage stays pinned while the next section (Contact, which
   pulls itself up with -mt-[100vh]) rises over it.

   Swap the `image` paths in PROJECTS for real shots
   (drop files into /public/work/).
   ────────────────────────────────────────────────────────── */

const EASE = [0.22, 1, 0.36, 1] as const;

/* 3 project segments + 1 viewport of "hold" for the Contact
   overlap → progress 0.75–1 is the covered phase. */
const WRAP_VH = 400;

/* transition windows on the 0–1 track progress:
   image 2 slides in over T1, image 3 over T2 */
const T1: [number, number] = [0.24, 0.42];
const T2: [number, number] = [0.52, 0.7];

const PROJECTS: {
  n: string;
  client: string;
  tag: string;
  title: string;
  desc: string;
  image: string;
  accent: string;
}[] = [
  {
    n: "01",
    client: "NORTHLINE BANK",
    tag: "FINTECH · DASHBOARD",
    title: "Treasury, in real time.",
    desc: "A live treasury dashboard unifying accounts, positions and cashflow forecasts — built to replace a week of spreadsheets with one screen.",
    image: "/work/northline.svg",
    accent: "#4da2ff",
  },
  {
    n: "02",
    client: "NOVACARE",
    tag: "HEALTHCARE · PLATFORM",
    title: "Care that follows the patient.",
    desc: "Patient records, vitals and scheduling in a single clinician workspace — rolled out across 40+ clinics without a day of downtime.",
    image: "/work/novacare.svg",
    accent: "#35d3c0",
  },
  {
    n: "03",
    client: "CARGOFLOW",
    tag: "LOGISTICS · TRACKING",
    title: "Every shipment, on the map.",
    desc: "Fleet tracking and route intelligence for cross-border freight — live ETAs, exception alerts and a control tower the ops team actually uses.",
    image: "/work/cargoflow.svg",
    accent: "#a78bfa",
  },
];

export default function Work() {
  const reduceMotion = useReducedMotion() ?? false;
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  /* Which project's text is showing. Driven off scroll progress
     as a single active index — so exactly ONE text block is ever
     mounted (AnimatePresence swaps them). The switch points sit at
     the midpoint of each image transition, so the text flips just
     as the incoming image finishes covering the previous one. */
  const SWITCH_1 = (T1[0] + T1[1]) / 2; // 0 → 1
  const SWITCH_2 = (T2[0] + T2[1]) / 2; // 1 → 2
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = v < SWITCH_1 ? 0 : v < SWITCH_2 ? 1 : 2;
    setActive((prev) => (prev === next ? prev : next));
  });

  const current = PROJECTS[active];

  /* thin progress rail next to the counter */
  const railScale = useTransform(scrollYProgress, [0, 0.75], [0, 1]);

  return (
    <section id="work" className="relative bg-ink">
      {/* scroll track — its height is the scroll distance */}
      <div ref={trackRef} style={{ height: `${WRAP_VH}vh` }}>
        {/* pinned stage */}
        <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
          {/* blue ambience */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: [
                "radial-gradient(700px 700px at 88% 12%, rgba(77,162,255,0.10), transparent 70%)",
                "radial-gradient(600px 600px at 6% 88%, rgba(77,162,255,0.07), transparent 70%)",
              ].join(","),
            }}
          />

          <div className="relative mx-auto grid w-full max-w-[1240px] items-center gap-10 px-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14 md:px-12">
            {/* ── Left: heading + swapping project text ── */}
            <div className="flex flex-col">
              <p className="font-mono text-[11px] tracking-[0.3em] text-primary">
                WORK
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.05] tracking-tight text-white md:text-4xl">
                Client work we&apos;re proud of.
              </h2>

              {/* one text block at a time — AnimatePresence guarantees
                  the previous project is fully gone before/as the next
                  fades in, so they never overlap */}
              <div className="mt-8 grid md:mt-12">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.n}
                    initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    style={{ gridArea: "1 / 1" }}
                    className="flex flex-col"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-md border font-mono text-[11px]"
                        style={{
                          borderColor: `${current.accent}55`,
                          color: current.accent,
                        }}
                      >
                        {current.n}
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.25em] text-white/45">
                        {current.client}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-white md:text-[2rem] md:leading-tight">
                      {current.title}
                    </h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55 md:text-base">
                      {current.desc}
                    </p>
                    <span
                      className="mt-6 font-mono text-[10px] tracking-[0.25em]"
                      style={{ color: current.accent }}
                    >
                      {current.tag}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* counter + progress rail */}
              <div className="mt-10 flex items-center gap-4 md:mt-14">
                <div className="relative h-px w-28 overflow-hidden bg-white/12">
                  <motion.div
                    style={{ scaleX: reduceMotion ? 1 : railScale }}
                    className="absolute inset-0 origin-left bg-primary"
                  />
                </div>
                <span className="font-mono text-[10px] tracking-[0.25em] text-white/35">
                  03 PROJECTS
                </span>
              </div>
            </div>

            {/* ── Right: glass frame with sliding images ── */}
            <div className="relative">
              {/* soft blue glow behind the frame */}
              <div
                aria-hidden
                className="absolute -inset-6 rounded-2xl bg-primary/10 blur-2xl"
              />
              <div className="glass relative overflow-hidden rounded-xl p-2 shadow-[0_30px_80px_-30px_rgba(77,162,255,0.25)] md:p-3">
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/10">
                  {PROJECTS.map((p, i) => (
                    <WorkImage
                      key={p.n}
                      project={p}
                      index={i}
                      progress={scrollYProgress}
                      reduceMotion={reduceMotion}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* scroll hint, fades once you start */}
          <motion.p
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]),
            }}
            className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-white/30"
          >
            SCROLL
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ── One stacked image — slides in from the right and fully
      covers the image beneath it ── */

function WorkImage({
  project,
  index,
  progress,
  reduceMotion,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const window: [number, number] | null =
    index === 1 ? T1 : index === 2 ? T2 : null;

  /* slide in from the right (first image is the base layer) */
  const x = useTransform(progress, window ?? [0, 1], window ? ["104%", "0%"] : ["0%", "0%"], {
    ease: (t) => 1 - Math.pow(1 - t, 3),
  });
  /* reduced motion: fade instead of slide */
  const fade = useTransform(progress, window ?? [0, 1], window ? [0, 1] : [1, 1]);

  /* the covered image sinks back slightly while being covered */
  const coverWindow: [number, number] | null =
    index === 0 ? T1 : index === 1 ? T2 : null;
  const scale = useTransform(
    progress,
    coverWindow ?? [0, 1],
    coverWindow && !reduceMotion ? [1, 0.96] : [1, 1],
  );

  return (
    <motion.div
      style={{
        x: reduceMotion ? "0%" : x,
        opacity: reduceMotion ? fade : 1,
        scale,
        zIndex: index,
      }}
      className="absolute inset-0"
    >
      {/* left-edge shadow so the incoming image reads as a layer */}
      {index > 0 && (
        <div
          aria-hidden
          className="absolute -left-8 inset-y-0 w-8 bg-gradient-to-l from-black/50 to-transparent"
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.image}
        alt={`${project.client} project preview`}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* faint accent wash at the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4"
        style={{
          background: `linear-gradient(to top, ${project.accent}1f, transparent)`,
        }}
      />
    </motion.div>
  );
}
