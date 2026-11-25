import Link from "next/link";
import { brandConfig } from "@/config/brand.config";
import { fontVariablesClassName } from "@/lib/fonts";
import "./globals.css";

export default function RootNotFound() {
  return (
    <html
      lang={brandConfig.locale.default}
      dir={brandConfig.locale.dir}
      className={fontVariablesClassName}
    >
      <body className="min-h-screen bg-bg text-text antialiased">
        <main className="mx-auto flex min-h-screen max-w-[720px] flex-col items-start justify-center gap-4 px-6 py-24">
          <p className="font-mono text-xs text-text-muted">ERR. 404</p>
          <h1 className="text-3xl font-semibold text-text">
            الصفحة غير موجودة
          </h1>
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-sm bg-primary px-5 text-sm font-medium text-primary-contrast hover:bg-primary-hover"
          >
            الرجوع للرئيسية
          </Link>
        </main>
      </body>
    </html>
  );
}
