import type { Metadata } from "next";
import { SectionHeader } from "@/components/marketing/section-header";
import { ContactForm } from "@/components/marketing/contact-form";
import { getTurnstileSiteKey } from "@/server/security/turnstile";
import { BlueprintGrid } from "@/components/brand/blueprint-grid";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "ابعتلنا سؤالك أو استفسارك بخصوص سِكّة أو باقات الحاضنات والمسرّعات.",
};

export default function ContactPage() {
  const siteKey = getTurnstileSiteKey();

  return (
    <>
      <section className="relative overflow-hidden py-16 border-b border-border">
        <BlueprintGrid className="absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-4 text-center">
          <SectionHeader label="تواصل معنا" annotation="FIG. 01" headingLevel="h1">
            عندك سؤال أو اقتراح؟
          </SectionHeader>
          <p className="mt-4 text-text-muted max-w-xl mx-auto">
            ابعتلنا رسالتك وهنرد عليك في أقرب وقت.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[680px] px-4">
          <div className="rounded-sm border border-border bg-surface p-6 md:p-8">
            <ContactForm turnstileSiteKey={siteKey} />
          </div>
        </div>
      </section>
    </>
  );
}
