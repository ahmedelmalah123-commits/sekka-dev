import { Bdi } from "@/components/ui/bdi";
import { cn } from "@/lib/utils";

type DimensionLabelProps = {
  code: string;
  label?: string;
  className?: string;
};

/**
 * Technical blueprint annotation (e.g. `FIG. 01`, `01 / 06`) rendered in IBM Plex Mono
 * with hairline drafting ticks and RTL-safe <Bdi> isolation.
 */
export function DimensionLabel({
  code,
  label,
  className,
}: DimensionLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 text-xs text-text-muted",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="inline-block h-3 w-px bg-terracotta-decor"
      />
      <span className="font-mono font-medium tracking-normal text-text tabular-nums">
        <Bdi>{code}</Bdi>
      </span>
      {label ? (
        <>
          <span aria-hidden="true" className="text-border-strong">
            —
          </span>
          <span className="font-medium text-text-muted">{label}</span>
        </>
      ) : null}
      <span
        aria-hidden="true"
        className="inline-block h-3 w-px bg-terracotta-decor"
      />
    </div>
  );
}
