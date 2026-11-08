/**
 * Real Value Land brand mark, redrawn as vector from the owner's logo:
 * R, a V whose right stroke rises into an arrow, and L, inside a surveyed
 * parcel outline with staked corners. Colors come from the site palette
 * ("dark" for dark backgrounds, "light" for light ones). Plain SVG with
 * inline attributes, so it also renders inside next/og ImageResponse.
 */
export const BRAND = {
  /** Deep forest green (site --color-forest-dark). */
  ink: "#10261B",
  /** Warm sandy gold (site --color-gold). */
  accent: "#D4A373",
  /** Light gold (site --color-gold-light), for secondary text on ink. */
  sage: "#E8C9A3",
  /** Warm cream (site --color-cream). */
  paper: "#FAFAED",
} as const;

// Traced from the original artwork (1080×1350 canvas).
const VIEWBOX = { x: 55, y: 88, w: 945, h: 1072 };
const OUTLINE = "M76 714 L626 346 L982 668 L876 1138 L259 1138 Z";
const LETTERS = [
  // R (with its triangular counter)
  "M76 714 L345 535 L358 603 L262 885 L500 1140 L410 1140 L252 962 L327 1140 L259 1140 Z M145 728 L280 635 L203 858 Z",
  // V, left stroke
  "M370 518 L425 480 L545 980 L515 1140 Z",
  // V right stroke, rising into the arrow
  "M513 1140 L575 1140 L745 212 L680 205 Z",
  "M650 200 L722 102 L766 218 Z",
  // L
  "M722 428 L778 480 L665 1088 L886 1090 L876 1140 L593 1140 Z",
];
const CORNERS: [number, number][] = [
  [76, 714],
  [626, 346],
  [982, 668],
  [876, 1138],
  [259, 1138],
];

const PALETTES = {
  dark: { letters: BRAND.paper, outline: BRAND.sage, dot: BRAND.accent, dotStroke: BRAND.ink },
  light: { letters: BRAND.ink, outline: BRAND.ink, dot: BRAND.accent, dotStroke: BRAND.ink },
} as const;

export function LogoMark({
  size = 40,
  variant = "dark",
  className,
}: {
  /** Rendered height in px; width follows the mark's proportions. */
  size?: number;
  /** Background the mark sits on. */
  variant?: "dark" | "light";
  className?: string;
}) {
  const colors = PALETTES[variant];
  // Keep the thin outline and corner dots visible at small sizes.
  const unitsPerPx = VIEWBOX.h / size;
  const line = Math.max(6, 1.3 * unitsPerPx);
  const dot = Math.max(15, 2.3 * unitsPerPx);
  const width = Math.round((size * VIEWBOX.w) / VIEWBOX.h);

  return (
    <svg
      width={width}
      height={size}
      viewBox={`${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.w} ${VIEWBOX.h}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d={OUTLINE}
        fill="none"
        stroke={colors.outline}
        strokeWidth={line}
        strokeLinejoin="round"
      />
      {LETTERS.map((d) => (
        <path key={d.slice(0, 12)} d={d} fill={colors.letters} fillRule="evenodd" />
      ))}
      {CORNERS.map(([cx, cy]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={dot}
          fill={colors.dot}
          stroke={colors.dotStroke}
          strokeWidth={dot * 0.28}
        />
      ))}
    </svg>
  );
}

/**
 * Logo mark and "REAL VALUE LAND" on one line: the parcel's bottom edge
 * sits on the text baseline and its side corners at cap height, with the
 * peak and arrow rising above the lettering.
 */
export function BrandLockup({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <span className="flex items-end gap-2.5 text-[28px]">
      {/* Lifted so the parcel's bottom edge lands on the baseline (measured for Barlow Condensed). */}
      <LogoMark size={44} variant={variant} className="mb-[0.075em] shrink-0" />
      <span
        className={`font-brand leading-none tracking-wide uppercase ${
          variant === "dark" ? "text-cream" : "text-forest-dark"
        }`}
      >
        Real Value Land
      </span>
    </span>
  );
}
