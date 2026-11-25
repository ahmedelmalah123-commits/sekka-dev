import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Alert } from "@/components/ui/alert";
import { StyleguideShowcase } from "@/components/gallery/styleguide-showcase";
import { isStyleguideEnabled } from "@/lib/styleguide-guard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "معرض المكونات (W0)",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function StyleguidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (!isStyleguideEnabled()) {
    notFound();
  }

  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main-content" className="mx-auto max-w-[1200px] px-6 py-10">
      <Alert variant="warning" title="بيئة معاينة داخلية" className="mb-8">
        هذه الصفحة مخصصة لمراجعة المكونات في W0 ولا تُفهرس في محركات البحث وتُرجع 404 في الإنتاج.
      </Alert>
      <StyleguideShowcase />
    </main>
  );
}
