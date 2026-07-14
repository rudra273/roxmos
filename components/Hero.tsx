"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import DataFlow from "./DataFlow";

const LINE_1 = "Roxmos is an AI SaaS company based in India.";
const LINE_2 = "Here we design AI systems and deliver services for our clients.";
const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduceMotion = useReducedMotion();

  // Hero content eases out as you scroll — contained to the hero
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 550], [1, 0]);
  const scale = useTransform(scrollY, [0, 550], [1, 0.94]);
  const y = useTransform(scrollY, [0, 550], [0, 70]);

  return (
    <section className="relative flex h-[100svh] items-center justify-center overflow-hidden bg-ink">
      {/* Soft ambient glow under the data-flow graphic */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-[62%] top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[140px]" />
      </div>

      {/* Data-flow streams — raw data converging into intelligence */}
      <DataFlow />

      {/* Content — intro line, top-left */}
      <motion.div
        style={{ opacity, scale, y }}
        className="absolute left-6 top-24 z-10 max-w-lg px-6 text-left md:left-16 md:top-28 lg:left-24"
      >
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          className="font-sans text-xl font-semibold leading-[1.3] tracking-tight md:text-2xl lg:text-3xl"
        >
          <span className="text-white">{LINE_1} </span>
          <span className="text-white/50">{LINE_2}</span>
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          className="mt-8 flex justify-start"
        >
          <a
            href="#contact"
            className="rounded-sm bg-primary px-8 py-3.5 text-sm font-semibold transition-all duration-300 hover:bg-accent hover:shadow-[0_0_35px_rgba(77,162,255,0.45)]"
          >
            Discuss a project
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-1 rounded-full bg-glow"
          />
        </div>
      </motion.div>
    </section>
  );
}
