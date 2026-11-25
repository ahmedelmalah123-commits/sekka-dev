import type { ReactNode } from "react";
import { CheckCircle2, Clock, FileWarning } from "lucide-react";
import { Bdi } from "@/components/ui/bdi";
import { cn } from "@/lib/utils";

type TitleBlockStatus = "draft" | "in_review" | "approved";

type TitleBlockProps = {
  code: string;
  title: string;
  headingLevel?: "h2" | "h3" | "h4";
  source?: string;
  reviewedAt?: string;
  version?: string;
  status?: TitleBlockStatus;
  statusLabel?: string;
  children?: ReactNode;
  className?: string;
};

const statusConfig: Record<
  TitleBlockStatus,
  { defaultLabel: string; Icon: typeof Clock; toneClass: string }
> = {
  draft: {
    defaultLabel: "مسودة — بانتظار المراجعة",
    Icon: FileWarning,
    toneClass: "text-warning border-warning/40 bg-surface-muted",
  },
  in_review: {
    defaultLabel: "قيد المراجعة",
    Icon: Clock,
    toneClass: "text-info border-info/40 bg-surface-muted",
  },
  approved: {
    defaultLabel: "معتمد",
    Icon: CheckCircle2,
    toneClass: "text-success border-success/40 bg-surface-muted",
  },
};

/**
 * Engineering Title Block component used for legal metadata, official citations,
 * and structured human task specifications (Spec 2.4 & 7.1 #8).
 */
export function TitleBlock({
  code,
  title,
  headingLevel = "h3",
  source,
  reviewedAt,
  version,
  status = "draft",
  statusLabel,
  children,
  className,
}: TitleBlockProps) {
  const meta = statusConfig[status];
  const StatusIcon = meta.Icon;
  const Heading = headingLevel;

  return (
    <section
      className={cn(
        "border border-border-strong bg-surface text-text rounded-sm",
        className
      )}
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface-muted px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-medium text-text-muted tabular-nums">
            <Bdi>{code}</Bdi>
          </span>
          <Heading className="text-base font-semibold text-text">{title}</Heading>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-xs font-medium",
            meta.toneClass
          )}
        >
          <StatusIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{statusLabel ?? meta.defaultLabel}</span>
        </span>
      </header>

      {children ? <div className="p-4">{children}</div> : null}

      <footer className="grid grid-cols-1 gap-px border-t border-border bg-border sm:grid-cols-3">
        <div className="bg-surface px-4 py-2.5">
          <p className="text-xs text-text-muted">المصدر</p>
          <p className="text-sm font-medium text-text">
            {source ?? "بانتظار تحديد المصدر الرسمي"}
          </p>
        </div>
        <div className="bg-surface px-4 py-2.5">
          <p className="text-xs text-text-muted">تاريخ المراجعة</p>
          <p className="text-sm font-medium text-text tabular-nums">
            {reviewedAt ?? "غير مُراجع بعد"}
          </p>
        </div>
        <div className="bg-surface px-4 py-2.5">
          <p className="text-xs text-text-muted">رقم النسخة</p>
          <p className="font-mono text-sm font-medium text-text tabular-nums">
            <Bdi>{version ?? "v0.1-draft"}</Bdi>
          </p>
        </div>
      </footer>
    </section>
  );
}
