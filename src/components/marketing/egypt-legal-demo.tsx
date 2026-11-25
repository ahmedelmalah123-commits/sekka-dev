import { SectionHeader } from "@/components/marketing/section-header";

export function EgyptLegalDemo() {
  return (
    <section className="py-20" aria-labelledby="legal-heading">
      <div className="mx-auto max-w-[1200px] px-4">
        <SectionHeader
          id="legal-heading"
          label="مثال: التأسيس في مصر"
          annotation="FIG. 08"
          headingLevel="h2"
          className="mb-10 text-center"
        >
          كل خطوة بشرية بكل تفاصيلها
        </SectionHeader>

        {/* Task card in TitleBlock style */}
        <div className="mx-auto max-w-2xl">
          <div className="rounded-sm border-2 border-border bg-surface">
            {/* Title block header */}
            <div className="flex items-center justify-between border-b border-border bg-surface-muted px-4 py-2">
              <span className="font-mono text-xs font-semibold text-text-muted uppercase tracking-wider">
                مهمة بشرية · تأسيس شركة ذات مسؤولية محدودة
              </span>
              <span className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-terracotta-decor">
                [مسودة — مثال توضيحي]
              </span>
            </div>

            <div className="grid grid-cols-1 gap-0 divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0">
              <div className="p-4 space-y-3">
                <Row label="أروح فين" value="الشركة المصرية لضمان الجودة (جدة، هيئة الاستثمار GAFI) [مثال]" />
                <Row label="أحتاج إيه" value="صورة بطاقة الهوية الوطنية، عقد الإيجار، نموذج التأسيس" />
                <Row label="الرسوم" value="[قيمة من جدول معتمد — مش hardcoded]" dimmed />
                <Row label="الموعد" value="[من جدول المواعيد الرسمي]" dimmed />
              </div>
              <div className="p-4 space-y-3">
                <Row label="المصدر الرسمي" value="GAFI.gov.eg [رابط يتحقق قبل النشر]" />
                <Row label="آخر مراجعة" value="[تاريخ من جدول المراجعة]" dimmed />
                <Row label="رقم النسخة" value="v1" />
              </div>
            </div>

            <div className="border-t border-border bg-surface-muted px-4 py-2">
              <p className="text-xs text-text-muted">
                ⚠️ هذا مثال توضيحي فقط. الأرقام والمواعيد الحقيقية بتيجي من جدول قانوني مراجع. راجع الجهة الرسمية أو محامي قبل التنفيذ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  dimmed,
}: {
  label: string;
  value: string;
  dimmed?: boolean;
}) {
  return (
    <div>
      <dt className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-0.5">
        {label}
      </dt>
      <dd className={`text-sm ${dimmed ? "text-text-muted italic" : "text-text"}`}>
        {value}
      </dd>
    </div>
  );
}
