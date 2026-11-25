import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DimensionLabel } from "@/components/brand/dimension-label";

export default function LocaleNotFound() {
  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-[70vh] max-w-[720px] flex-col items-start justify-center gap-4 px-6 py-24"
    >
      <DimensionLabel code="ERR. 404" label="الصفحة غير موجودة" />
      <h1 className="text-3xl font-semibold text-text sm:text-4xl">
        الصفحة دي مش موجودة
      </h1>
      <p className="text-base text-text-muted">
        ممكن يكون الرابط اتغيّر أو الصفحة مش متاحة في البيئة الحالية.
      </p>
      <Button asChild variant="primary">
        <Link href="/">الرجوع للرئيسية</Link>
      </Button>
    </main>
  );
}
