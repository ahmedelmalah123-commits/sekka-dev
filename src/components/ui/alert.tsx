import type { ReactNode } from "react";
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type AlertVariant = "info" | "success" | "warning" | "danger";

type AlertProps = {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  className?: string;
  role?: "alert" | "status";
};

const variantMap: Record<
  AlertVariant,
  { Icon: typeof Info; borderClass: string; iconClass: string }
> = {
  info: {
    Icon: Info,
    borderClass: "border-info/50",
    iconClass: "text-info",
  },
  success: {
    Icon: CheckCircle2,
    borderClass: "border-success/50",
    iconClass: "text-success",
  },
  warning: {
    Icon: TriangleAlert,
    borderClass: "border-warning/50",
    iconClass: "text-warning",
  },
  danger: {
    Icon: AlertCircle,
    borderClass: "border-danger/50",
    iconClass: "text-danger",
  },
};

export function Alert({
  variant = "info",
  title,
  children,
  className,
  role,
}: AlertProps) {
  const { Icon, borderClass, iconClass } = variantMap[variant];
  const computedRole = role ?? (variant === "danger" ? "alert" : "status");

  return (
    <div
      role={computedRole}
      className={cn(
        "flex items-start gap-3 rounded-sm border bg-surface p-4 text-sm text-text",
        borderClass,
        className
      )}
    >
      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", iconClass)} aria-hidden="true" />
      <div className="space-y-1">
        {title ? <p className="font-semibold text-text">{title}</p> : null}
        <div className="text-text-muted">{children}</div>
      </div>
    </div>
  );
}
