import Link from "next/link";
import { BlueprintGrid } from "@/components/brand/blueprint-grid";
import { StarConstruction } from "@/components/brand/star-construction";
import { Button } from "@/components/ui/button";
import { brandConfig } from "@/config/brand.config";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-32"
      aria-labelledby="hero-heading"
    >
      {/* Blueprint background */}
      <BlueprintGrid
        className="absolute inset-0 opacity-50"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1200px] px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Copy */}
          <div className="text-center md:text-start">
            {/* Dimension label */}
            <span className="mb-4 inline-block font-mono text-xs text-text-muted border border-border px-2 py-0.5">
              FIG. 01 · شريك المؤسس بالذكاء الاصطناعي
            </span>

            <h1
              id="hero-heading"
              className="font-display text-[2.25rem] font-semibold leading-snug text-text md:text-[3.5rem]"
            >
              {brandConfig.tagline.ar}
            </h1>

            <p className="mt-6 text-lg text-text-muted leading-relaxed md:text-xl">
              {brandConfig.description.ar}
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 md:flex-row md:items-start">
              <Button asChild size="lg">
                <Link href="/waitlist">ابدأ مشروعك مجانًا</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/how-it-works">شوف إزاي بيشتغل</Link>
              </Button>
            </div>
          </div>

          {/* Star / product preview placeholder */}
          <div
            className="flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="relative flex items-center justify-center rounded-sm border border-border bg-surface p-8 shadow-sm">
              <StarConstruction size={240} className="text-terracotta-decor" />
              {/* Dimension label overlay */}
              <span className="absolute bottom-2 end-2 font-mono text-[10px] text-text-muted">
                FIG. 02 · بيترسم زي المشروع
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
