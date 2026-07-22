"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.4, 0, 0.2, 1] as const;

/* Sticky "Discuss a Project" CTA — bottom-center, glass style matching the
   navbar. Hidden while the Hero or Footer sections are in view. */
export default function DiscussProjectButton() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const footer = document.getElementById("footer");
    if (!hero || !footer) return;

    const heroObserver = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
    );
    /* Hide the CTA as soon as the footer is even close to entering
       the viewport (rootMargin pulls the trigger up by 240px), so the
       button never overlaps the footer content. */
    const footerObserver = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { rootMargin: "0px 0px 240px 0px" },
    );

    heroObserver.observe(hero);
    footerObserver.observe(footer);

    return () => {
      heroObserver.disconnect();
      footerObserver.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {!heroVisible && !footerVisible && (
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="fixed inset-x-0 bottom-6 z-40 mx-auto flex w-fit items-center gap-1.5 whitespace-nowrap rounded-loose bg-[rgba(30,32,40,0.4)] px-6 py-3 text-center text-[13px] font-medium text-white backdrop-blur-[44px] transition-colors duration-200 hover:bg-[rgba(30,32,40,0.6)]"
        >
          Discuss a Project
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden
          >
            <path
              d="m6 3.5 4.5 4.5L6 12.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
