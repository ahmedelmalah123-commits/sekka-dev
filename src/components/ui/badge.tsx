import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        neutral: "border-border-strong bg-surface text-text",
        muted: "border-border bg-surface-muted text-text",
        highlight: "border-border-strong bg-highlight/30 text-text",
        success: "border-success/40 bg-surface text-success",
        warning: "border-warning/40 bg-surface text-warning",
        danger: "border-danger/40 bg-surface text-danger",
        info: "border-info/40 bg-surface text-info",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
