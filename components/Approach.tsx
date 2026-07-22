/* ──────────────────────────────────────────────────────────
   Approach — light section, two-column layout inside one large
   rounded card (mirrors the reference layout):

     · left  — big display heading + a decorative "system" graphic
                (dotted field, dashed connectors, floating node
                 labels, a document card with chart placeholders)
     · right — muted column heading + a list of rows describing
                the questions we work through on every engagement

   Static for now — no scroll / hover animation (to be planned).
   ────────────────────────────────────────────────────────── */

const QUESTIONS: string[] = [
  "What problem are we actually solving?",
  "Is the data ready to build on?",
  "Which model and architecture fit best?",
  "How fast can we prove it works?",
  "How do we measure quality objectively?",
  "What does production-ready look like?",
  "How do we keep it reliable over time?",
];

export default function Approach() {
  return (
    <section id="approach" className="relative z-10 -mt-[100svh] bg-paper text-ink">
      <div className="mx-auto w-full px-6 py-12 md:px-12 lg:mx-0 lg:w-[80%] lg:px-0 lg:py-16 lg:pl-16">
        {/* section label */}
        <p className="font-mono text-[11px] tracking-[0.3em] text-ink/40">
          APPROACH
        </p>

        {/* big rounded card */}
        <div className="mt-6 rounded-[28px] bg-[#f1f3f8] p-6 md:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
            {/* ── Left — heading + graphic ── */}
            <div className="flex flex-col">
              <h2 className="max-w-xl font-display text-3xl font-semibold leading-[1.05] tracking-tight md:text-4xl lg:text-[2.6rem]">
                How We Turn an Ambiguous Problem into a Shipped System
              </h2>

              <div className="mt-16 lg:mt-auto lg:pt-32">
                <ApproachGraphic />
              </div>
            </div>

            {/* ── Right — muted heading + rows ── */}
            <div>
              <p className="font-display text-2xl font-medium text-accent md:text-3xl">
                Questions We Work Through Together
              </p>

              <ul className="mt-6 flex flex-col gap-3">
                {QUESTIONS.map((q) => (
                  <li key={q}>
                    <div className="group flex items-center justify-between gap-4 rounded-2xl bg-white px-5 py-3">
                      <span className="font-display text-sm font-semibold tracking-tight transition-transform duration-300 ease-out group-hover:translate-x-1 md:text-base">
                        {q}
                      </span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink/[0.06] text-ink/70">
                        <IconArrow className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Decorative graphic — dotted field + dashed connectors,
   floating node labels, and a document card with chart
   placeholders. Purely illustrative. ── */

function ApproachGraphic() {
  return (
    <div className="relative h-[300px] w-full select-none md:h-[340px]" aria-hidden>
      {/* dotted background field */}
      <div className="absolute inset-0 [background-image:radial-gradient(rgba(4,6,13,0.12)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      {/* dashed connectors */}
      <svg
        viewBox="0 0 620 340"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full text-ink/20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeDasharray="4 6"
        strokeLinecap="round"
      >
        <path d="M70 70 C70 120 120 130 175 130" />
        <path d="M70 210 C70 190 120 185 175 185" />
        <path d="M425 160 C480 160 480 130 545 130" />
        <path d="M300 300 C300 260 380 250 425 250" />
        <path d="M425 160 L425 250" />
      </svg>

      {/* document card with chart placeholders */}
      <div className="absolute left-1/2 top-6 w-[170px] -translate-x-1/2 rounded-xl bg-white p-4 shadow-[0_10px_40px_-20px_rgba(4,6,13,0.35)] md:w-[190px]">
        <div className="space-y-2">
          <div className="h-1.5 w-3/4 rounded bg-ink/10" />
          <div className="h-1.5 w-1/2 rounded bg-ink/10" />
        </div>
        <div className="mt-5 flex items-end gap-4">
          {/* bar chart */}
          <div className="flex items-end gap-1.5">
            <span className="block w-3 rounded-sm bg-ink/10" style={{ height: 34 }} />
            <span className="block w-3 rounded-sm bg-ink/10" style={{ height: 52 }} />
            <span className="block w-3 rounded-sm bg-ink/10" style={{ height: 22 }} />
          </div>
          {/* pie */}
          <div
            className="h-12 w-12 rounded-full bg-ink/10"
            style={{
              background:
                "conic-gradient(rgba(4,6,13,0.18) 0 68%, rgba(4,6,13,0.08) 0)",
            }}
          />
        </div>
        <div className="mt-5 space-y-2">
          <div className="h-1.5 w-full rounded bg-ink/10" />
          <div className="h-1.5 w-2/3 rounded bg-ink/10" />
        </div>
      </div>

      {/* floating node labels */}
      <NodeLabel className="left-2 top-12">Problem Framing</NodeLabel>
      <NodeLabel className="left-2 top-[188px]">Data Audit</NodeLabel>
      <NodeLabel className="right-2 top-[112px]">Prototype</NodeLabel>
      <NodeLabel className="bottom-2 left-1/2 -translate-x-1/2">
        Evaluation
      </NodeLabel>
    </div>
  );
}

function NodeLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={
        "absolute rounded-lg bg-white/90 px-3 py-1.5 font-mono text-[11px] tracking-tight text-ink/45 shadow-[0_6px_20px_-12px_rgba(4,6,13,0.4)] " +
        className
      }
    >
      {children}
    </span>
  );
}

function IconArrow({ className }: { className?: string }) {
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
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}
