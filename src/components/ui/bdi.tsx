import type { ReactNode } from "react";

type BdiProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Isolates Latin brand names, codes, URLs, and numbers embedded inside Arabic RTL text (Spec 4.3).
 */
export function Bdi({ children, className }: BdiProps) {
  return (
    <bdi dir="auto" className={className}>
      {children}
    </bdi>
  );
}
