import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlueprintGrid } from "@/components/brand/blueprint-grid";

export function ClosingCta() {
  return (
    <section
      className="relative overflow-hidden py-24 text-center"
      aria-labelledby="cta-heading"
    >
      <BlueprintGrid
        className="absolute inset-0 opacity-30"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[700px] px-4">
        <h2
          id="cta-heading"
          className="font-display text-3xl font-semibold text-text md:text-4xl"
        >
          مستنيين إيه؟
        </h2>
        <p className="mt-4 text-lg text-text-muted">
          سجّل في قائمة الانتظار وكن من أوائل اللي بيجربوا سِكّة.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/waitlist">انضم لقائمة الانتظار</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">تواصل معنا</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
