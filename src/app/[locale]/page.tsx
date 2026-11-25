import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { BlueprintGrid } from "@/components/brand/blueprint-grid";
import { DimensionLabel } from "@/components/brand/dimension-label";
import { RegistrationMarks } from "@/components/brand/registration-marks";
import { StarConstruction } from "@/components/brand/star-construction";
import { TitleBlock } from "@/components/brand/title-block";
import { Badge } from "@/components/ui/badge";
import { Bdi } from "@/components/ui/bdi";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { brandConfig } from "@/config/brand.config";
import { isStyleguideEnabled } from "@/lib/styleguide-guard";

export default async function FoundationHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const showStyleguide = isStyleguideEnabled();

  return (
    <main id="main-content" className="relative min-h-screen overflow-hidden">
      <BlueprintGrid />

      <div className="relative mx-auto flex max-w-[1200px] flex-col gap-12 px-6 py-12">
        <header className="flex items-center justify-between border-b border-border pb-6">
          <div className="flex items-center gap-3">
            <StarConstruction size={32} variant="mark" animated={false} />
            <span className="font-display text-2xl font-semibold text-text">
              {brandConfig.name.ar}
            </span>
            <Badge variant="muted">
              <Bdi>W0 Foundation</Bdi>
            </Badge>
          </div>
          <ThemeToggle />
        </header>

        <section className="grid items-center gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <DimensionLabel code="FIG. 00" label="أساس النظام التصميمي" />
            <h1 className="text-4xl font-semibold leading-tight text-text sm:text-5xl">
              {brandConfig.tagline.ar}
            </h1>
            <p className="font-mono text-sm text-text-muted">
              <Bdi>{brandConfig.tagline.en}</Bdi>
            </p>
            <p className="max-w-xl text-lg text-text-muted">
              {brandConfig.description.ar}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {showStyleguide ? (
                <Link
                  href="/styleguide"
                  className={buttonVariants({ variant: "primary" })}
                >
                  استعراض معرض المكونات (W0)
                </Link>
              ) : null}
            </div>
          </div>

          <div className="flex justify-center lg:col-span-5">
            <RegistrationMarks className="bg-surface/90 p-8 border border-border">
              <div className="flex flex-col items-center gap-4">
                <StarConstruction size={200} />
                <DimensionLabel code="KHATAM 08" label="خطوط الإنشاء" />
              </div>
            </RegistrationMarks>
          </div>
        </section>

        <TitleBlock
          code="DOC. W0-01"
          title="حالة مرحلة الأساس"
          headingLevel="h2"
          status="in_review"
          statusLabel="مرحلة W0 — قيد المراجعة"
          source="ai-cofounder-website-spec.md"
          reviewedAt="2026-11-25"
          version="w0-foundation"
        >
          <p className="text-sm text-text-muted">
            تجهيز البنية الأساسية، متغيرات الألوان، الخطوط، <Bdi>RTL</Bdi>،
            ومكونات الهوية قبل بدء بناء صفحات الموقع العام في <Bdi>W1</Bdi>.
          </p>
        </TitleBlock>
      </div>
    </main>
  );
}
