/**
 * DataFlow — hero graphic.
 * Faint grid + thin data streams converging into a bright core,
 * with refined output beams leaving it: raw data in → intelligence out.
 * Pure SVG/CSS (no canvas, no three.js). Keyframes live in globals.css.
 */

const CX = 1030;
const CY = 470;

// Incoming streams (raw data)
const IN_PATHS = [
  `M -60 120 C 360 170, 700 320, ${CX} ${CY}`,
  `M -60 300 C 380 330, 720 400, ${CX} ${CY}`,
  `M -60 480 C 400 490, 750 480, ${CX} ${CY}`,
  `M -60 660 C 380 640, 740 560, ${CX} ${CY}`,
  `M -60 840 C 420 790, 780 630, ${CX} ${CY}`,
  `M 260 -60 C 480 140, 800 320, ${CX} ${CY}`,
  `M 560 960 C 680 760, 860 590, ${CX} ${CY}`,
];

// Outgoing beams (intelligence)
const OUT_PATHS = [
  `M ${CX} ${CY} C 1160 440, 1320 410, 1520 380`,
  `M ${CX} ${CY} C 1170 470, 1340 470, 1520 470`,
  `M ${CX} ${CY} C 1160 500, 1320 530, 1520 560`,
];

export default function DataFlow() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          {/* Faint engineering grid, faded at the edges */}
          <pattern id="df-grid" width="72" height="72" patternUnits="userSpaceOnUse">
            <path d="M 72 0 L 0 0 0 72" stroke="rgba(130,190,255,0.05)" strokeWidth="1" />
          </pattern>
          <radialGradient id="df-grid-fade" cx="62%" cy="50%" r="65%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="df-grid-mask">
            <rect width="1440" height="900" fill="url(#df-grid-fade)" />
          </mask>
          <radialGradient id="df-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#82beff" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#4da2ff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#4da2ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1440" height="900" fill="url(#df-grid)" mask="url(#df-grid-mask)" />

        {/* Incoming: faint rails + travelling light pulses */}
        {IN_PATHS.map((d, i) => (
          <g key={`in-${i}`}>
            <path d={d} stroke="rgba(130,190,255,0.10)" strokeWidth="1" />
            <path
              d={d}
              pathLength={1}
              className="df-pulse"
              stroke="#82beff"
              strokeWidth="1.6"
              strokeLinecap="round"
              style={{
                ["--dur" as string]: `${5.5 + (i % 4) * 1.3}s`,
                ["--delay" as string]: `${i * -1.7}s`,
              }}
            />
          </g>
        ))}

        {/* Outgoing: brighter, faster — the refined signal */}
        {OUT_PATHS.map((d, i) => (
          <g key={`out-${i}`}>
            <path d={d} stroke="rgba(130,190,255,0.18)" strokeWidth="1.2" />
            <path
              d={d}
              pathLength={1}
              className="df-pulse df-pulse-out"
              stroke="#bcdcff"
              strokeWidth="2.2"
              strokeLinecap="round"
              style={{
                ["--dur" as string]: `${2.6 + i * 0.5}s`,
                ["--delay" as string]: `${i * -0.9}s`,
              }}
            />
          </g>
        ))}

        {/* Core: glow, expanding ring, nucleus */}
        <circle cx={CX} cy={CY} r="150" fill="url(#df-core)" className="df-core" />
        <circle cx={CX} cy={CY} r="26" stroke="rgba(130,190,255,0.35)" strokeWidth="1" className="df-ring" />
        <circle cx={CX} cy={CY} r="7" fill="#eaf4ff" className="df-core" />
        <circle cx={CX} cy={CY} r="14" stroke="rgba(234,244,255,0.4)" strokeWidth="1" />
      </svg>
    </div>
  );
}
