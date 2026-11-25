import type { Metadata } from "next";
import { SectionHeader } from "@/components/marketing/section-header";
import { LeadForm } from "@/components/marketing/lead-form";
import { getTurnstileSiteKey } from "@/server/security/turnstile";
import { BlueprintGrid } from "@/components/brand/blueprint-grid";

export const metadata: Metadata = {
  title: "قائمة الانتظار",
  description: "سجّل في قائمة الانتظار وكن من أوائل المؤسسين اللي بيجربوا سِكّة.",
};

export default function WaitlistPage() {
  const siteKey = getTurnstileSiteKey();

  return (
    <>
      <section className="relative overflow-hidden py-16 border-b border-border">
        <BlueprintGrid className="absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-4 text-center">
          <SectionHeader label="قائمة الانتظار" annotation="FIG. 01" headingLevel="h1">
            انضم لقائمة الانتظار
          </SectionHeader>
          <p className="mt-4 text-text-muted max-w-xl mx-auto">
            بنجهّز النسخة الأولى حاليًا. سجّل بياناتك وهنبعتلك دعوة أول ما نفتح التجربة.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[600px] px-4">
          <LeadForm turnstileSiteKey={siteKey} />
        </div>
      </section>
    </>
  );
}
