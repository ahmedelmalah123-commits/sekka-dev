import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RegistrationMarksProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Architectural corner registration marks (crop marks) framing ProductFrame and document cards.
 * Uses logical CSS positioning (start/end) for RTL safety.
 */
export function RegistrationMarks({
  children,
  className,
}: RegistrationMarksProps) {
  return (
    <div className={cn("relative p-2", className)}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 start-0 h-3 w-3 border-t border-s border-terracotta-decor"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 end-0 h-3 w-3 border-t border-e border-terracotta-decor"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 start-0 h-3 w-3 border-b border-s border-terracotta-decor"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 end-0 h-3 w-3 border-b border-e border-terracotta-decor"
      />
      {children}
    </div>
  );
}
