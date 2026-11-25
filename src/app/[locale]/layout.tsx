import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { THEME_INIT_SCRIPT } from "@/components/ui/theme-toggle";
import { brandConfig } from "@/config/brand.config";
import { routing } from "@/i18n/routing";
import { fontVariablesClassName } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: `${brandConfig.name.ar} (${brandConfig.name.en}) — ${brandConfig.tagline.ar}`,
    template: `%s | ${brandConfig.name.ar}`,
  },
  description: brandConfig.description.ar,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={fontVariablesClassName}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-bg text-text antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-50 focus:rounded-sm focus:border focus:border-primary focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-text"
        >
          تخطي إلى المحتوى الرئيسي
        </a>
        {children}
      </body>
    </html>
  );
}
