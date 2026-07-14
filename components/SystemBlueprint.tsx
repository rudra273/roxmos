"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * SystemBlueprint — hero graphic.
 * A living architecture diagram: sources feed a production pipeline
 * (INGEST → TRAIN → EVALUATE → DEPLOY → MONITOR) drawn as orthogonal
 * routed pipes on an engineering grid. On load the schematic draws in;
 * then a 12s cycle runs forever — packets travel the pipes (SMIL),
 * stages light up in turn (CSS windows in globals.css), and MONITOR
 * feeds a dashed drift/feedback loop back to TRAIN.
 *
 * Palette discipline: white hairlines on ink, one blue accent.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Pulses start after the draw-in choreography finishes */
const PULSE_BEGIN = "3.2s";

/* Pulse travel windows — fractions of the shared 12s cycle.
   Must agree with the bp-win-* keyframes in globals.css. */
const T = {
  src1: [0.0, 0.07],
  src2: [0.015, 0.085],
  src3: [0.03, 0.1],
  toTrain: [0.2, 0.27],
  toEval: [0.46, 0.515],
  toDeploy: [0.66, 0.72],
  toMonitor: [0.82, 0.87],
  feedback: [0.9, 0.995],
} as const;

const INK_FILL = "rgba(10, 15, 30, 0.85)";
const LINE = "rgba(255, 255, 255, 0.15)";
const LINE_FAINT = "rgba(255, 255, 255, 0.04)";
const TEXT_DIM = "rgba(255, 255, 255, 0.28)";
const TEXT_LABEL = "rgba(255, 255, 255, 0.88)";
const BLUE = "#4da2ff";
const BLUE_SOFT = "#82beff";
const BLUE_PALE = "#cfe4ff";

/* ── tiny building blocks ─────────────────────────────── */

function fade(rm: boolean, delay: number, dur = 0.6) {
  if (rm) return {};
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: dur, delay, ease: EASE },
  };
}

function rise(rm: boolean, delay: number) {
  if (rm) return {};
  return {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  };
}

/** Solid pipe that draws itself in */
function Pipe({ d, delay, dur, rm }: { d: string; delay: number; dur: number; rm: boolean }) {
  if (rm) {
    return <path d={d} fill="none" stroke={LINE} strokeWidth="1.2" strokeLinecap="round" />;
  }
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={LINE}
      strokeWidth="1.2"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: dur, delay, ease: "easeInOut" }}
    />
  );
}

/** Dashed loop (feedback / retrain) with slow dash drift */
function DashedPipe({ d, delay, rm }: { d: string; delay: number; rm: boolean }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={LINE}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeDasharray="4 7"
      className="bp-anim bp-drift"
      {...fade(rm, delay, 0.8)}
    />
  );
}

/** Direction chevron at a pipe's end */
function Chevron({ d, delay, rm }: { d: string; delay: number; rm: boolean }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="rgba(255, 255, 255, 0.35)"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...fade(rm, delay, 0.4)}
    />
  );
}

function EdgeLabel({
  x,
  y,
  delay,
  rm,
  anchor = "middle",
  children,
}: {
  x: number;
  y: number;
  delay: number;
  rm: boolean;
  anchor?: "start" | "middle";
  children: React.ReactNode;
}) {
  return (
    <motion.text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize="11"
      letterSpacing="0.08em"
      fill={TEXT_DIM}
      className="font-mono"
      {...fade(rm, delay, 0.6)}
    >
      {children}
    </motion.text>
  );
}

/** Packet travelling a pipe during its slice of the 12s cycle */
function Pulse({
  href,
  t,
  rm,
}: {
  href: string;
  t: readonly [number, number];
  rm: boolean;
}) {
  if (rm) return null;
  const [t0, t1] = t;
  const e = 0.006;
  return (
    <g
      className="bp-pulse"
      opacity="0"
      style={{ filter: "drop-shadow(0 0 6px rgba(130, 190, 255, 0.8))" }}
    >
      <circle r="8" fill="rgba(77, 162, 255, 0.16)" />
      <circle r="4.5" fill="rgba(130, 190, 255, 0.45)" />
      <circle r="2.4" fill={BLUE_PALE} />
      <animateMotion
        dur="12s"
        begin={PULSE_BEGIN}
        repeatCount="indefinite"
        calcMode="linear"
        keyPoints="0;0;1;1"
        keyTimes={`0;${t0};${t1};1`}
      >
        <mpath href={href} />
      </animateMotion>
      <animate
        attributeName="opacity"
        dur="12s"
        begin={PULSE_BEGIN}
        repeatCount="indefinite"
        values="0;0;1;1;0;0"
        keyTimes={`0;${t0};${Math.min(t0 + e, 1)};${Math.max(t1 - e, 0)};${t1};1`}
      />
    </g>
  );
}

type Win = "ingest" | "train" | "eval" | "deploy" | "monitor";

/** Pipeline stage node */
function NodeBox({
  x,
  y,
  w,
  h,
  label,
  sub,
  step,
  win,
  delay,
  rm,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  step: string;
  win: Win;
  delay: number;
  rm: boolean;
}) {
  const cy = y + h / 2;
  const hasBelow = win === "train" || win === "eval" || win === "deploy" || !!sub;
  const labelY = hasBelow ? cy - 5 : cy;
  const subY = cy + 14;
  const leftPad = x + 28;

  return (
    <motion.g {...rise(rm, delay)}>
      {/* base card */}
      <rect x={x} y={y} width={w} height={h} rx="10" fill={INK_FILL} stroke={LINE} strokeWidth="1.2" />
      {/* blue activation overlay — lit during this stage's window */}
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="10"
        fill="rgba(77, 162, 255, 0.06)"
        stroke={BLUE}
        strokeOpacity="0.75"
        strokeWidth="1.2"
        className={`bp-anim bp-win bp-win-${win}`}
        style={{ filter: "drop-shadow(0 0 14px rgba(77, 162, 255, 0.3))" }}
      />
      {/* status dot: grey base + blue overlay sharing the window */}
      <circle cx={x + 16} cy={labelY} r="3" fill="rgba(255, 255, 255, 0.16)" />
      <circle
        cx={x + 16}
        cy={labelY}
        r="3"
        fill={BLUE_SOFT}
        className={`bp-anim bp-win bp-win-${win}`}
        style={{ filter: "drop-shadow(0 0 5px rgba(130, 190, 255, 0.9))" }}
      />
      <text
        x={leftPad}
        y={labelY}
        dominantBaseline="central"
        fontSize="15"
        letterSpacing="0.16em"
        fill={TEXT_LABEL}
        className="font-mono"
      >
        {label}
      </text>
      <text
        x={x + w - 12}
        y={y + 18}
        textAnchor="end"
        fontSize="10.5"
        letterSpacing="0.1em"
        fill="rgba(255, 255, 255, 0.22)"
        className="font-mono"
      >
        {step}
      </text>

      {sub && (
        <text
          x={leftPad}
          y={subY}
          dominantBaseline="central"
          fontSize="11.5"
          letterSpacing="0.06em"
          fill={TEXT_DIM}
          className="font-mono"
        >
          {sub}
        </text>
      )}

      {/* stage-specific internals */}
      {win === "train" && (
        <>
          <rect x={leftPad} y={subY - 2} width="92" height="2.5" rx="1.25" fill="rgba(255, 255, 255, 0.1)" />
          <rect
            x={leftPad}
            y={subY - 2}
            width="92"
            height="2.5"
            rx="1.25"
            fill={BLUE}
            className="bp-anim bp-bar-fill"
          />
        </>
      )}
      {win === "eval" && (
        <text
          x={leftPad}
          y={subY}
          dominantBaseline="central"
          fontSize="11.5"
          letterSpacing="0.06em"
          fill={BLUE_SOFT}
          className="bp-anim bp-win bp-win-eval font-mono"
        >
          0.98 · pass
        </text>
      )}
      {win === "deploy" && (
        <g className="bp-anim bp-live-pill">
          <rect
            x={leftPad}
            y={subY - 9}
            width="48"
            height="17"
            rx="8.5"
            fill="rgba(77, 162, 255, 0.1)"
            stroke="rgba(77, 162, 255, 0.55)"
            strokeWidth="1"
          />
          <circle cx={leftPad + 11} cy={subY - 0.5} r="2" fill={BLUE_SOFT} />
          <text
            x={leftPad + 19}
            y={subY - 0.5}
            dominantBaseline="central"
            fontSize="9.5"
            letterSpacing="0.16em"
            fill={BLUE_PALE}
            className="font-mono"
          >
            LIVE
          </text>
        </g>
      )}
    </motion.g>
  );
}

/** Data-source chip */
function Chip({
  x,
  y,
  w,
  h,
  label,
  delay,
  rm,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  delay: number;
  rm: boolean;
}) {
  const cy = y + h / 2;
  return (
    <motion.g {...rise(rm, delay)}>
      <rect x={x} y={y} width={w} height={h} rx="8" fill="rgba(10, 15, 30, 0.6)" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
      <circle cx={x + 15} cy={cy} r="2.4" fill="rgba(130, 190, 255, 0.55)" />
      <text
        x={x + 26}
        y={cy}
        dominantBaseline="central"
        fontSize="12"
        letterSpacing="0.14em"
        fill="rgba(255, 255, 255, 0.5)"
        className="font-mono"
      >
        {label}
      </text>
    </motion.g>
  );
}

function Cross({ x, y }: { x: number; y: number }) {
  return (
    <g stroke="rgba(255, 255, 255, 0.09)" strokeWidth="1">
      <line x1={x - 4} y1={y} x2={x + 4} y2={y} />
      <line x1={x} y1={y - 4} x2={x} y2={y + 4} />
    </g>
  );
}

/* ── desktop variant (980 × 640) ──────────────────────── */

const D_EDGES = {
  e1: "M 150 100 H 192 Q 200 100 200 108 V 168 Q 200 176 208 176 H 228",
  e2: "M 150 190 H 228",
  e3: "M 150 280 H 192 Q 200 280 200 272 V 212 Q 200 204 208 204 H 228",
  e4: "M 382 190 H 493",
  e5: "M 647 190 H 758",
  e6: "M 835 220 V 312 Q 835 320 827 320 H 593 Q 585 320 585 328 V 410",
  e7: "M 647 440 H 758",
  e8: "M 835 470 V 552 Q 835 560 827 560 H 445 Q 437 560 437 552 V 258 Q 437 250 445 250 H 537 Q 545 250 545 242 V 220",
  e9: "M 835 160 V 104 Q 835 96 827 96 H 578 Q 570 96 570 104 V 160",
};

function DesktopBlueprint({ rm }: { rm: boolean }) {
  return (
    <svg
      viewBox="0 0 980 640"
      fill="none"
      className={`h-auto w-full ${rm ? "bp-static" : ""}`}
      role="img"
      aria-label="Roxmos production AI pipeline: data sources flow into ingest, train, evaluate, deploy and monitor stages, with a continuous feedback loop back into training."
    >
      <defs>
        <pattern id="bpd-grid" width="44" height="44" patternUnits="userSpaceOnUse">
          <path d="M 44 0 L 0 0 0 44" fill="none" stroke={LINE_FAINT} strokeWidth="1" />
        </pattern>
        <radialGradient id="bpd-fade-grad" cx="0.5" cy="0.45" r="0.72">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="75%" stopColor="white" stopOpacity="0.7" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="bpd-fade">
          <rect x="0" y="0" width="980" height="640" fill="url(#bpd-fade-grad)" />
        </mask>
      </defs>

      {/* engineering grid + survey crosses */}
      <motion.g {...fade(rm, 0, 0.9)}>
        <rect x="0" y="0" width="980" height="640" fill="url(#bpd-grid)" mask="url(#bpd-fade)" />
        <Cross x={440} y={88} />
        <Cross x={880} y={132} />
        <Cross x={176} y={528} />
        <Cross x={924} y={308} />
        <Cross x={308} y={396} />
      </motion.g>

      {/* corner annotation */}
      <motion.g {...fade(rm, 0.2, 0.7)} className="font-mono">
        <text x="956" y="614" textAnchor="end" fontSize="11.5" letterSpacing="0.12em" fill="rgba(255, 255, 255, 0.24)">
          cycle 12s · autonomous
        </text>
      </motion.g>

      {/* source chips */}
      <Chip x={40} y={83} w={110} h={34} label="APIS" delay={0.15} rm={rm} />
      <Chip x={40} y={173} w={110} h={34} label="EVENTS" delay={0.24} rm={rm} />
      <Chip x={40} y={263} w={110} h={34} label="DOCS" delay={0.33} rm={rm} />

      {/* pipes — ids consumed by the SMIL pulses below */}
      <g>
        <path id="bpd-e1" d={D_EDGES.e1} fill="none" stroke="none" />
        <path id="bpd-e2" d={D_EDGES.e2} fill="none" stroke="none" />
        <path id="bpd-e3" d={D_EDGES.e3} fill="none" stroke="none" />
        <path id="bpd-e4" d={D_EDGES.e4} fill="none" stroke="none" />
        <path id="bpd-e5" d={D_EDGES.e5} fill="none" stroke="none" />
        <path id="bpd-e6" d={D_EDGES.e6} fill="none" stroke="none" />
        <path id="bpd-e7" d={D_EDGES.e7} fill="none" stroke="none" />
        <path id="bpd-e8" d={D_EDGES.e8} fill="none" stroke="none" />
        <Pipe d={D_EDGES.e1} delay={0.45} dur={0.5} rm={rm} />
        <Pipe d={D_EDGES.e2} delay={0.45} dur={0.5} rm={rm} />
        <Pipe d={D_EDGES.e3} delay={0.45} dur={0.5} rm={rm} />
        <Pipe d={D_EDGES.e4} delay={0.95} dur={0.35} rm={rm} />
        <Pipe d={D_EDGES.e5} delay={1.3} dur={0.35} rm={rm} />
        <Pipe d={D_EDGES.e6} delay={1.6} dur={0.55} rm={rm} />
        <Pipe d={D_EDGES.e7} delay={1.95} dur={0.35} rm={rm} />
        <DashedPipe d={D_EDGES.e8} delay={2.35} rm={rm} />
        <DashedPipe d={D_EDGES.e9} delay={2.35} rm={rm} />
      </g>

      {/* direction chevrons */}
      <Chevron d="M 224 172 L 230 176 L 224 180" delay={0.95} rm={rm} />
      <Chevron d="M 224 186 L 230 190 L 224 194" delay={0.95} rm={rm} />
      <Chevron d="M 224 200 L 230 204 L 224 208" delay={0.95} rm={rm} />
      <Chevron d="M 489 186 L 495 190 L 489 194" delay={1.3} rm={rm} />
      <Chevron d="M 754 186 L 760 190 L 754 194" delay={1.65} rm={rm} />
      <Chevron d="M 581 406 L 585 412 L 589 406" delay={2.15} rm={rm} />
      <Chevron d="M 754 436 L 760 440 L 754 444" delay={2.3} rm={rm} />
      <Chevron d="M 541 224 L 545 218 L 549 224" delay={2.5} rm={rm} />
      <Chevron d="M 566 156 L 570 162 L 574 156" delay={2.5} rm={rm} />

      {/* pipe labels */}
      <EdgeLabel x={437} y={180} delay={1.35} rm={rm}>clean · embed</EdgeLabel>
      <EdgeLabel x={702} y={180} delay={1.65} rm={rm}>checkpoints</EdgeLabel>
      <EdgeLabel x={847} y={268} delay={2.1} rm={rm} anchor="start">pass ≥ 0.95</EdgeLabel>
      <EdgeLabel x={702} y={430} delay={2.3} rm={rm}>traces</EdgeLabel>
      <EdgeLabel x={640} y={548} delay={2.55} rm={rm}>feedback · drift</EdgeLabel>
      <EdgeLabel x={700} y={86} delay={2.55} rm={rm}>retrain</EdgeLabel>

      {/* stages */}
      <NodeBox x={230} y={162} w={150} h={56} label="INGEST" sub="batch · stream" step="01" win="ingest" delay={0.7} rm={rm} />
      <NodeBox x={495} y={162} w={150} h={56} label="TRAIN" step="02" win="train" delay={1.1} rm={rm} />
      <NodeBox x={760} y={162} w={150} h={56} label="EVALUATE" step="03" win="eval" delay={1.45} rm={rm} />
      <NodeBox x={495} y={412} w={150} h={56} label="DEPLOY" step="04" win="deploy" delay={1.85} rm={rm} />
      <NodeBox x={760} y={412} w={150} h={56} label="MONITOR" sub="uptime 99.97%" step="05" win="monitor" delay={2.15} rm={rm} />

      {/* packets */}
      <Pulse href="#bpd-e1" t={T.src1} rm={rm} />
      <Pulse href="#bpd-e2" t={T.src2} rm={rm} />
      <Pulse href="#bpd-e3" t={T.src3} rm={rm} />
      <Pulse href="#bpd-e4" t={T.toTrain} rm={rm} />
      <Pulse href="#bpd-e5" t={T.toEval} rm={rm} />
      <Pulse href="#bpd-e6" t={T.toDeploy} rm={rm} />
      <Pulse href="#bpd-e7" t={T.toMonitor} rm={rm} />
      <Pulse href="#bpd-e8" t={T.feedback} rm={rm} />
    </svg>
  );
}

/* ── mobile variant (360 × 640, vertical flow) ────────── */

const M_EDGES = {
  m1: "M 66 61 V 80 Q 66 88 74 88 H 132 Q 140 88 140 96 V 100",
  m2: "M 180 61 V 100",
  m3: "M 294 61 V 80 Q 294 88 286 88 H 228 Q 220 88 220 96 V 100",
  m4: "M 180 156 V 204",
  m5: "M 180 260 V 308",
  m6: "M 180 364 V 412",
  m7: "M 180 468 V 516",
  m8: "M 266 544 H 312 Q 320 544 320 536 V 240 Q 320 232 312 232 H 268",
};

function MobileBlueprint({ rm }: { rm: boolean }) {
  return (
    <svg
      viewBox="0 0 360 640"
      fill="none"
      className={`mx-auto h-auto w-full max-w-[380px] ${rm ? "bp-static" : ""}`}
      role="img"
      aria-label="Roxmos production AI pipeline: data sources flow into ingest, train, evaluate, deploy and monitor stages, with a continuous feedback loop back into training."
    >
      <defs>
        <pattern id="bpm-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke={LINE_FAINT} strokeWidth="1" />
        </pattern>
        <radialGradient id="bpm-fade-grad" cx="0.5" cy="0.5" r="0.75">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="75%" stopColor="white" stopOpacity="0.7" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="bpm-fade">
          <rect x="0" y="0" width="360" height="640" fill="url(#bpm-fade-grad)" />
        </mask>
      </defs>

      <motion.g {...fade(rm, 0, 0.9)}>
        <rect x="0" y="0" width="360" height="640" fill="url(#bpm-grid)" mask="url(#bpm-fade)" />
      </motion.g>

      <Chip x={20} y={29} w={92} h={30} label="APIS" delay={0.15} rm={rm} />
      <Chip x={134} y={29} w={92} h={30} label="EVENTS" delay={0.24} rm={rm} />
      <Chip x={248} y={29} w={92} h={30} label="DOCS" delay={0.33} rm={rm} />

      <g>
        <path id="bpm-m1" d={M_EDGES.m1} fill="none" stroke="none" />
        <path id="bpm-m2" d={M_EDGES.m2} fill="none" stroke="none" />
        <path id="bpm-m3" d={M_EDGES.m3} fill="none" stroke="none" />
        <path id="bpm-m4" d={M_EDGES.m4} fill="none" stroke="none" />
        <path id="bpm-m5" d={M_EDGES.m5} fill="none" stroke="none" />
        <path id="bpm-m6" d={M_EDGES.m6} fill="none" stroke="none" />
        <path id="bpm-m7" d={M_EDGES.m7} fill="none" stroke="none" />
        <path id="bpm-m8" d={M_EDGES.m8} fill="none" stroke="none" />
        <Pipe d={M_EDGES.m1} delay={0.45} dur={0.4} rm={rm} />
        <Pipe d={M_EDGES.m2} delay={0.45} dur={0.4} rm={rm} />
        <Pipe d={M_EDGES.m3} delay={0.45} dur={0.4} rm={rm} />
        <Pipe d={M_EDGES.m4} delay={0.9} dur={0.3} rm={rm} />
        <Pipe d={M_EDGES.m5} delay={1.2} dur={0.3} rm={rm} />
        <Pipe d={M_EDGES.m6} delay={1.5} dur={0.3} rm={rm} />
        <Pipe d={M_EDGES.m7} delay={1.8} dur={0.3} rm={rm} />
        <DashedPipe d={M_EDGES.m8} delay={2.2} rm={rm} />
      </g>

      <Chevron d="M 136 96 L 140 102 L 144 96" delay={0.9} rm={rm} />
      <Chevron d="M 176 96 L 180 102 L 184 96" delay={0.9} rm={rm} />
      <Chevron d="M 216 96 L 220 102 L 224 96" delay={0.9} rm={rm} />
      <Chevron d="M 176 200 L 180 206 L 184 200" delay={1.2} rm={rm} />
      <Chevron d="M 176 304 L 180 310 L 184 304" delay={1.5} rm={rm} />
      <Chevron d="M 176 408 L 180 414 L 184 408" delay={1.8} rm={rm} />
      <Chevron d="M 176 512 L 180 518 L 184 512" delay={2.1} rm={rm} />
      <Chevron d="M 270 228 L 264 232 L 270 236" delay={2.35} rm={rm} />

      <motion.text
        x={334}
        y={388}
        fontSize="10"
        letterSpacing="0.12em"
        fill={TEXT_DIM}
        className="font-mono"
        transform="rotate(-90 334 388)"
        textAnchor="middle"
        {...fade(rm, 2.4, 0.6)}
      >
        feedback · drift
      </motion.text>

      <NodeBox x={96} y={102} w={168} h={52} label="INGEST" sub="batch · stream" step="01" win="ingest" delay={0.6} rm={rm} />
      <NodeBox x={96} y={206} w={168} h={52} label="TRAIN" step="02" win="train" delay={0.95} rm={rm} />
      <NodeBox x={96} y={310} w={168} h={52} label="EVALUATE" step="03" win="eval" delay={1.25} rm={rm} />
      <NodeBox x={96} y={414} w={168} h={52} label="DEPLOY" step="04" win="deploy" delay={1.55} rm={rm} />
      <NodeBox x={96} y={518} w={168} h={52} label="MONITOR" sub="uptime 99.97%" step="05" win="monitor" delay={1.85} rm={rm} />

      <Pulse href="#bpm-m1" t={T.src1} rm={rm} />
      <Pulse href="#bpm-m2" t={T.src2} rm={rm} />
      <Pulse href="#bpm-m3" t={T.src3} rm={rm} />
      <Pulse href="#bpm-m4" t={T.toTrain} rm={rm} />
      <Pulse href="#bpm-m5" t={T.toEval} rm={rm} />
      <Pulse href="#bpm-m6" t={T.toDeploy} rm={rm} />
      <Pulse href="#bpm-m7" t={T.toMonitor} rm={rm} />
      <Pulse href="#bpm-m8" t={T.feedback} rm={rm} />
    </svg>
  );
}

/* ── public component ─────────────────────────────────── */

export default function SystemBlueprint() {
  const rm = useReducedMotion() ?? false;

  return (
    <div className="pointer-events-none select-none" aria-hidden={false}>
      <div className="hidden lg:block">
        <DesktopBlueprint rm={rm} />
      </div>
      <div className="lg:hidden">
        <MobileBlueprint rm={rm} />
      </div>
    </div>
  );
}
