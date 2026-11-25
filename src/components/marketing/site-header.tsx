"use client";
import Link from "next/link";
import { useState, useCallback } from "react";
import { brandConfig } from "@/config/brand.config";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV_LINKS = [
  { label: "كيف يعمل", href: "/how-it-works" },
  { label: "المميزات", href: "/features" },
  { label: "الأسعار", href: "/pricing" },
  { label: "الأسئلة الشائعة", href: "/faq" },
  { label: "تواصل معنا", href: "/contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur-sm">
      <nav
        className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3"
        aria-label="التنقل الرئيسي"
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="font-display text-xl font-semibold text-text no-underline"
          aria-label={`${brandConfig.name.ar} — الصفحة الرئيسية`}
        >
          {brandConfig.name.ar}
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-6 md:flex" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-text-muted transition-colors hover:text-text"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button asChild size="sm">
            <Link href="/waitlist">انضم لقائمة الانتظار</Link>
          </Button>
        </div>

        {/* Mobile: theme + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                aria-label="فتح القائمة"
                aria-expanded={open}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M2 5h16M2 10h16M2 15h16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="end" title="القائمة" className="w-72 pt-10">
              <nav aria-label="قائمة الجوال">
                <ul className="flex flex-col gap-1" role="list">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className="block rounded-sm px-3 py-2 text-base font-medium text-text transition-colors hover:bg-surface-muted"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li className="pt-4">
                    <Button asChild className="w-full">
                      <Link href="/waitlist" onClick={closeMenu}>
                        انضم لقائمة الانتظار
                      </Link>
                    </Button>
                  </li>
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
