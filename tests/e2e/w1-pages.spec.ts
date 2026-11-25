import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const MARKETING_ROUTES = [
  { path: "/", titlePart: "سِكّة" },
  { path: "/how-it-works", titlePart: "كيف يعمل" },
  { path: "/features", titlePart: "المميزات" },
  { path: "/pricing", titlePart: "الأسعار" },
  { path: "/faq", titlePart: "الأسئلة الشائعة" },
  { path: "/contact", titlePart: "تواصل معنا" },
  { path: "/waitlist", titlePart: "قائمة الانتظار" },
  { path: "/terms", titlePart: "الشروط والأحكام" },
  { path: "/privacy", titlePart: "سياسة الخصوصية" },
];

test.describe("W1 Public Marketing Pages", () => {
  for (const route of MARKETING_ROUTES) {
    test(`${route.path} renders RTL Arabic cleanly with zero axe violations`, async ({
      page,
    }) => {
      await page.goto(route.path);

      const html = page.locator("html");
      await expect(html).toHaveAttribute("lang", "ar");
      await expect(html).toHaveAttribute("dir", "rtl");
      await expect(page).toHaveTitle(new RegExp(route.titlePart));

      // No horizontal overflow
      const hasOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      expect(hasOverflow).toBe(false);

      // Axe WCAG 2.2 AA check
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }

  test("Legal draft pages (/terms and /privacy) emit noindex", async ({
    page,
  }) => {
    for (const path of ["/terms", "/privacy"]) {
      await page.goto(path);
      const robots = await page
        .locator('meta[name="robots"]')
        .getAttribute("content");
      expect(robots).toContain("noindex");
    }
  });

  test("Pricing page contains zero numeric prices", async ({ page }) => {
    await page.goto("/pricing");
    const mainText = await page.locator("main").innerText();
    expect(mainText).not.toMatch(/ج\.م|\$|USD|EGP/i);
  });

  test("Navigation has no dead links (all header/footer links return 200)", async ({
    page,
    request,
  }) => {
    await page.goto("/");
    const hrefs = await page.evaluate(() => {
      const anchors = Array.from(
        document.querySelectorAll("header a[href], footer a[href]"),
      );
      return Array.from(
        new Set(
          anchors
            .map((a) => a.getAttribute("href"))
            .filter((h): h is string => !!h && h.startsWith("/")),
        ),
      );
    });

    for (const href of hrefs) {
      const res = await request.get(href);
      expect(res.status(), `Link ${href} failed`).toBe(200);
    }
  });
});
