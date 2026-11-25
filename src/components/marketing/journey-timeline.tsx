import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/marketing/section-header";

const STAGES = [
  { num: "01", title: "الفكرة والتحقق", status: "available" },
  { num: "02", title: "التخطيط والبحث", status: "available" },
  { num: "03", title: "التأسيس القانوني", status: "available" },
  { num: "04", title: "بناء النموذج الأولي", status: "coming_soon" },
  { num: "05", title: "الإطلاق والمبيعات الأولى", status: "coming_soon" },
  { num: "06", title: "التسويق والنمو", status: "coming_soon" },
  { num: "07", title: "الفريق والتوظيف", status: "coming_soon" },
  { num: "08", title: "التمويل والاستثمار", status: "coming_soon" },
  { num: "09", title: "التوسع والمقياس", status: "coming_soon" },
] as const;

export function JourneyTimeline() {
  return (
    <section className="py-20 bg-surface-muted" aria-labelledby="journey-heading">
      <div className="mx-auto max-w-[1200px] px-4">
        <SectionHeader
          id="journey-heading"
          label="رحلة المشروع"
          annotation="FIG. 05"
          headingLevel="h2"
          className="mb-12 text-center"
        >
          من الفكرة للنمو في 9 مراحل
        </SectionHeader>

        <ol
          className="relative border-s border-border ps-6"
          role="list"
          aria-label="مراحل رحلة المشروع"
        >
          {STAGES.map((stage) => (
            <li key={stage.num} className="mb-8 last:mb-0">
              <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-border bg-bg" aria-hidden="true" />
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-mono text-xs text-text-muted">
                  {stage.num}
                </span>
                <span className="font-display text-base font-semibold text-text">
                  {stage.title}
                </span>
                {stage.status === "available" ? (
                  <Badge variant="success" className="text-[10px]">
                    متاح الآن
                  </Badge>
                ) : (
                  <Badge variant="muted" className="text-[10px] text-text-muted">
                    قريبًا
                  </Badge>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
