import { SectionHeader } from "@/components/marketing/section-header";

const COMMITMENTS = [
  {
    num: "١",
    title: "مبنخترعش أرقام",
    body: "أي رقم أو رسوم أو إجراء ليه مصدر رسمي، أو بيتعلّم صراحة إنه افتراض.",
  },
  {
    num: "٢",
    title: "المعلومة القانونية مراجعة",
    body: "كل محتوى قانوني بيمر بمراجعة ومعاه المصدر الرسمي وتاريخ آخر مراجعة.",
  },
  {
    num: "٣",
    title: "القرار دايمًا ليك",
    body: "إحنا بنقترح ونشرح ونرتّب. إنت بتقرر. الـ AI ما بيحفظش قرار من غير موافقتك.",
  },
] as const;

export function TrustCommitments() {
  return (
    <section className="py-20 bg-surface-muted" aria-labelledby="trust-heading">
      <div className="mx-auto max-w-[1200px] px-4">
        <SectionHeader
          id="trust-heading"
          label="الثقة"
          annotation="FIG. 09"
          headingLevel="h2"
          className="mb-12 text-center"
        >
          3 التزامات، مش وعود
        </SectionHeader>

        <div className="grid gap-6 md:grid-cols-3">
          {COMMITMENTS.map((c) => (
            <div
              key={c.num}
              className="rounded-sm border border-border bg-surface p-6"
            >
              <span
                className="mb-3 block font-mono text-3xl font-bold text-terracotta-decor"
                aria-hidden="true"
              >
                {c.num}
              </span>
              <h3 className="mb-2 font-display text-base font-semibold text-text">
                {c.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-muted">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
