import type { ReactNode } from "react";
import { DimensionLabel } from "@/components/brand/dimension-label";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  label: string;
  annotation: string;
  headingLevel?: "h1" | "h2";
  id?: string;
  children: ReactNode;
  className?: string;
};

export function SectionHeader({
  label,
  annotation,
  headingLevel = "h2",
  id,
  children,
  className,
}: SectionHeaderProps) {
  const Heading = headingLevel;
  const headingClass =
    headingLevel === "h1"
      ? "font-display text-3xl font-semibold text-text md:text-[2.75rem] leading-snug"
      : "font-display text-2xl font-semibold text-text md:text-[2rem] leading-snug";

  return (
    <div className={cn("space-y-3", className)}>
      <DimensionLabel code={annotation} label={label} />
      <Heading id={id} className={headingClass}>
        {children}
      </Heading>
    </div>
  );
}
