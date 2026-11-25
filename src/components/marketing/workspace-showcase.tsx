"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeader } from "@/components/marketing/section-header";

const TABS = [
  {
    value: "decisions",
    label: "القرارات",
    content:
      "كل قرار بتاخده بيتسجل بتاريخه وسببه. الـ AI بيراجع القرارات القديمة عشان ميتعارضوش.",
  },
  {
    value: "docs",
    label: "المستندات",
    content:
      "مستنداتك (خطة العمل، العقود، التقارير) كلها في مكان واحد. كل نسخة محفوظة ومعروف مين عملها.",
  },
  {
    value: "tasks",
    label: "المهام",
    content:
      "مهام الـ AI والمهام البشرية في نفس المكان. كل مهمة بشرية فيها: أروح فين، أحتاج إيه، الرسوم، الموعد.",
  },
] as const;

export function WorkspaceShowcase() {
  const [active, setActive] = useState<string>("decisions");

  return (
    <section className="py-20" aria-labelledby="workspace-heading">
      <div className="mx-auto max-w-[1200px] px-4">
        <SectionHeader
          id="workspace-heading"
          label="الـ Workspace"
          annotation="FIG. 06"
          headingLevel="h2"
          className="mb-10 text-center"
        >
          مشروعك في مساحة عمل مستقلة
        </SectionHeader>

        <Tabs value={active} onValueChange={setActive} dir="rtl">
          <TabsList className="mb-6">
            {TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {TABS.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <div className="rounded-sm border border-border bg-surface p-8 min-h-[160px]">
                <p className="text-text-muted leading-relaxed">{tab.content}</p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
