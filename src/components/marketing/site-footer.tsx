import Link from "next/link";
import { brandConfig } from "@/config/brand.config";

const FOOTER_GROUPS = [
  {
    label: "المنتج",
    links: [
      { label: "كيف يعمل", href: "/how-it-works" },
      { label: "المميزات", href: "/features" },
      { label: "الأسعار", href: "/pricing" },
      { label: "قائمة الانتظار", href: "/waitlist" },
    ],
  },
  {
    label: "التواصل",
    links: [
      { label: "الأسئلة الشائعة", href: "/faq" },
      { label: "تواصل معنا", href: "/contact" },
    ],
  },
  {
    label: "القانوني",
    links: [
      { label: "الشروط والأحكام", href: "/terms" },
      { label: "سياسة الخصوصية", href: "/privacy" },
    ],
  },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="mx-auto max-w-[1200px] px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-display text-lg font-semibold text-text">
              {brandConfig.name.ar}
            </span>
            <p className="mt-2 text-sm text-text-muted">
              {brandConfig.tagline.ar}
            </p>
          </div>

          {/* Link groups */}
          {FOOTER_GROUPS.map((group) => (
            <div key={group.label}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted font-mono">
                {group.label}
              </h3>
              <ul className="flex flex-col gap-2" role="list">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted transition-colors hover:text-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-text-muted md:flex-row">
          <span>
            © {year} {brandConfig.name.ar} · {brandConfig.name.en}. جميع الحقوق محفوظة.
          </span>
          <span className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-text-muted">
            مسودة — الصفحات القانونية بانتظار المراجعة
          </span>
        </div>
      </div>
    </footer>
  );
}
