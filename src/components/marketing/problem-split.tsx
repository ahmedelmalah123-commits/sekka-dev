import { SectionHeader } from "@/components/marketing/section-header";

const PROBLEMS = [
  {
    side: "قبل",
    icon: "✗",
    items: [
      "أدوات متفرقة في كل مكان",
      "قرارات بتتاخد وبتتنسى",
      "مش عارف الخطوة الجاية",
      "معلومات قانونية مش موثوقة",
      "توهان في البداية",
    ],
  },
  {
    side: "مع سِكّة",
    icon: "✓",
    items: [
      "مكان واحد للمشروع كله",
      "كل قرار متسجّل بسببه",
      "AI يقترح الخطوة الجاية",
      "معلومة قانونية بمصدرها ومراجعتها",
      "مسار واضح من الفكرة للتنفيذ",
    ],
  },
];

export function ProblemSplit() {
  return (
    <section
      className="py-20 bg-surface-muted"
      aria-labelledby="problem-heading"
    >
      <div className="mx-auto max-w-[1200px] px-4">
        <SectionHeader
          id="problem-heading"
          label="المشكلة"
          annotation="FIG. 03"
          headingLevel="h2"
          className="mb-12 text-center"
        >
          كل مؤسس بيمر بنفس التوهان
        </SectionHeader>

        <div className="grid gap-6 md:grid-cols-2">
          {PROBLEMS.map((col) => (
            <div
              key={col.side}
              className="rounded-sm border border-border bg-surface p-8"
            >
              <div className="mb-4 flex items-center gap-2">
                <span
                  className={`text-xl font-bold ${col.side === "قبل" ? "text-danger" : "text-success"}`}
                  aria-hidden="true"
                >
                  {col.icon}
                </span>
                <h3 className="font-display text-lg font-semibold text-text">
                  {col.side}
                </h3>
              </div>
              <ul className="flex flex-col gap-3" role="list">
                {col.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-text-muted">
                    <span
                      className={`mt-0.5 text-sm font-bold ${col.side === "قبل" ? "text-danger" : "text-success"}`}
                      aria-hidden="true"
                    >
                      {col.icon}
                    </span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
