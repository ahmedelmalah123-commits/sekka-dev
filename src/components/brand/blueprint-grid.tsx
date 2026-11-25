import { useId } from "react";
import { cn } from "@/lib/utils";

type BlueprintGridProps = {
  className?: string;
  density?: "subtle" | "standard";
};

/**
 * Architectural blueprint grid rendered via lightweight repeating SVG patterns using --grid-line.
 * Strictly decorative (aria-hidden) and tuned so foreground copy keeps full contrast.
 */
export function BlueprintGrid({
  className,
  density = "standard",
}: BlueprintGridProps) {
  const uid = useId().replace(/:/g, "");
  const minorId = `bp-minor-${uid}`;
  const majorId = `bp-major-${uid}`;
  const minorOpacity = density === "subtle" ? 0.35 : 0.55;
  const majorOpacity = density === "subtle" ? 0.5 : 0.75;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden select-none",
        className
      )}
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={minorId}
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke="var(--grid-line)"
              strokeWidth="0.75"
              strokeOpacity={minorOpacity}
            />
          </pattern>
          <pattern
            id={majorId}
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <rect width="120" height="120" fill={`url(#${minorId})`} />
            <path
              d="M 120 0 L 0 0 0 120"
              fill="none"
              stroke="var(--grid-line)"
              strokeWidth="1"
              strokeOpacity={majorOpacity}
            />
            <path
              d="M -4 0 L 4 0 M 0 -4 L 0 4"
              fill="none"
              stroke="var(--grid-line)"
              strokeWidth="1"
              strokeOpacity={majorOpacity}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${majorId})`} />
      </svg>
    </div>
  );
}
