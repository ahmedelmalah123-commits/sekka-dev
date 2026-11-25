import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type StarConstructionProps = {
  size?: number;
  variant?: "construction" | "mark";
  animated?: boolean;
  className?: string;
  label?: string;
};

/**
 * Eight-pointed Arabic Khatam star built from compass-and-straightedge construction lines
 * (two 45-degree rotated squares inscribed inside a drafting circle).
 * Honors `prefers-reduced-motion` via CSS and also accepts `animated={false}` for static contexts.
 */
export function StarConstruction({
  size = 160,
  variant = "construction",
  animated = true,
  className,
  label,
}: StarConstructionProps) {
  const decorative = !label;
  const isCompactMark = variant === "mark";
  const strokeClass =
    animated && !isCompactMark ? "sekka-construction-stroke" : undefined;
  const delayedStrokeClass =
    animated && !isCompactMark
      ? "sekka-construction-stroke-delayed"
      : undefined;

  const dashStyle = (length: number): CSSProperties =>
    ({ "--dash-length": `${length}` }) as CSSProperties;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={label}
      className={cn("shrink-0", className)}
    >
      {!isCompactMark && (
        <g stroke="var(--grid-line)" strokeWidth="1">
          <circle
            cx="80"
            cy="80"
            r="68"
            strokeDasharray="4 4"
            opacity="0.85"
          />
          <circle cx="80" cy="80" r="46" opacity="0.65" />
          <line x1="80" y1="6" x2="80" y2="154" opacity="0.6" />
          <line x1="6" y1="80" x2="154" y2="80" opacity="0.6" />
          <line x1="22" y1="22" x2="138" y2="138" opacity="0.45" />
          <line x1="138" y1="22" x2="22" y2="138" opacity="0.45" />
        </g>
      )}

      {/* Square 1 (0deg) */}
      <rect
        x="34"
        y="34"
        width="92"
        height="92"
        stroke={isCompactMark ? "var(--highlight)" : "var(--text)"}
        strokeWidth={isCompactMark ? "3" : "1.5"}
        className={strokeClass}
        style={animated && !isCompactMark ? dashStyle(368) : undefined}
      />

      {/* Square 2 (45deg rotated) */}
      <rect
        x="34"
        y="34"
        width="92"
        height="92"
        transform="rotate(45 80 80)"
        stroke={
          isCompactMark ? "var(--highlight)" : "var(--terracotta-decor)"
        }
        strokeWidth={isCompactMark ? "3" : "1.75"}
        className={delayedStrokeClass}
        style={animated && !isCompactMark ? dashStyle(368) : undefined}
      />

      {/* Inner octagon ring & seed node */}
      {!isCompactMark && (
        <>
          <circle
            cx="80"
            cy="80"
            r="22"
            stroke="var(--text)"
            strokeWidth="1"
            opacity="0.7"
          />
          <circle
            cx="80"
            cy="80"
            r="5"
            fill="var(--highlight)"
            stroke="var(--text)"
            strokeWidth="1.25"
          />
          <circle cx="80" cy="15" r="2.5" fill="var(--terracotta-decor)" />
          <circle cx="145" cy="80" r="2.5" fill="var(--terracotta-decor)" />
          <circle cx="80" cy="145" r="2.5" fill="var(--terracotta-decor)" />
          <circle cx="15" cy="80" r="2.5" fill="var(--terracotta-decor)" />
        </>
      )}

      {isCompactMark && (
        <circle cx="80" cy="80" r="10" fill="var(--highlight)" />
      )}
    </svg>
  );
}
