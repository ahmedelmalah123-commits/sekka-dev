import type { Metadata } from "next";
import { SectionHeader } from "@/components/marketing/section-header";
import { Alert } from "@/components/ui/alert";
import { brandConfig } from "@/config/brand.config";

export const metadata: Metadata = {
  title: "سياسة الخصوصية (مسودة)",
  description: "مسودة صفحة سياسة الخصوصية — بانتظار المراجعة القانونية.",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-[720px] px-4 space-y-8">
        <SectionHeader label="قانوني" annotation="DRAFT" headingLevel="h1">
          سياسة الخصوصية
        </SectionHeader>

        <Alert variant="warning" title={brandConfig.legalDraftNotice.ar}>
          هذه الصفحة مجرد هيكل مبدئي (Placeholder). سيتم مراجعتها وتحديثها قانونيًا وفقًا لقانون حماية البيانات الشخصية المصري رقم 151 لسنة 2020 قبل الإطلاق الرسمي.
        </Alert>

        <div className="space-y-4 text-sm leading-relaxed text-text-muted rounded-sm border border-border bg-surface p-6">
          <h2 className="font-display text-base font-semibold text-text">
            ١. البيانات التي نجمعها في المرحلة الحالية (مسودة)
          </h2>
          <p>
            نجمع فقط البيانات التي تقدمها طوعًا في نموذج قائمة الانتظار أو نموذج التواصل (الاسم، البريد الإلكتروني، رقم الهاتف الاختياري، ووصف الفكرة الاختياري) مع تسجيل وقت الموافقة الصريحة.
          </p>
          <h2 className="font-display text-base font-semibold text-text">
            ٢. عدم التدريب على بياناتك (مسودة)
          </h2>
          <p>
            لا نستخدم بياناتك أو أفكار مشاريعك لتدريب أي نماذج ذكاء اصطناعي بدون موافقة صريحة.
          </p>
        </div>
      </div>
    </section>
  );
}
