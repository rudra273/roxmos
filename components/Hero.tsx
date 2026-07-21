"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import SystemBlueprint from "./SystemBlueprint";

const LINE_1 = "We design and build AI systems that work in production —";
const LINE_2 = "for teams that want intelligence embedded in how they operate, not bolted on.";
const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduceMotion = useReducedMotion();

  // Hero content eases out as you scroll — contained to the hero
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const y = useTransform(scrollY, [0, 500], [0, 60]);

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-ink lg:h-[90svh] lg:min-h-[648px]"
    >
      {/* Soft ambient glow behind the blueprint */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute right-[-10%] top-1/2 h-[75vmin] w-[75vmin] -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />
      </div>

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-center gap-14 px-6 pb-16 pt-32 md:px-12 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-16 lg:pb-0 lg:pt-0"
      >
        {/* Statement + CTAs */}
        <div className="lg:col-span-5">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            className="mt-6 max-w-xl font-display text-xl font-semibold leading-[1.25] tracking-tight md:text-2xl xl:text-3xl"
          >
            <span className="text-white">{LINE_1} </span>
            <span className="text-white/45">{LINE_2}</span>
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <a
              href="#contact"
              className="rounded-sm bg-primary px-8 py-3.5 text-sm font-semibold transition-all duration-300 hover:bg-accent hover:shadow-[0_0_35px_rgba(77,162,255,0.45)]"
            >
              Discuss a project
            </a>
          </motion.div>
        </div>

        {/* Living system blueprint */}
        <div className="lg:col-span-7">
          <SystemBlueprint />
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4, ease: EASE }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
        aria-hidden
      >
        <span className="font-mono text-[9px] tracking-[0.35em] text-white/30">
          SCROLL
        </span>
        <span className="relative block h-8 w-px overflow-hidden bg-white/10">
          <span className="bp-cue-dot absolute left-0 top-1/2 block h-3 w-px bg-glow" />
        </span>
      </motion.div>
    </section>
  );
}
