import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("W0 Foundation: RTL, Light/Dark, Motion, & Accessibility", () => {
  test("home shell renders Arabic RTL with zero horizontal overflow", async ({ page }) => {
    await page.goto("/");

    const html = page.locator("html");
    await expect(html).toHaveAttribute("lang", "ar");
    await expect(html).toHaveAttribute("dir", "rtl");

    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(hasOverflow).toBe(false);
  });

  test("theme toggle interaction responds within INP <= 200ms budget", async ({
    page,
  }) => {
    await page.goto("/");

    await page.evaluate(() => {
      (window as unknown as { __maxEventDuration: number }).__maxEventDuration = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const current = (window as unknown as { __maxEventDuration: number })
            .__maxEventDuration;
          if (entry.duration > current) {
            (window as unknown as { __maxEventDuration: number }).__maxEventDuration =
              entry.duration;
          }
        }
      });
      observer.observe({ type: "event", buffered: true });
    });

    await page.getByTestId("theme-toggle").click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.waitForTimeout(50);

    const maxDuration = await page.evaluate(
      () => (window as unknown as { __maxEventDuration: number }).__maxEventDuration
    );
    expect(maxDuration).toBeLessThanOrEqual(200);
  });

  test("styleguide works in Light & Dark RTL with noindex and zero axe violations", async ({
    page,
  }) => {
    await page.goto("/styleguide");

    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/i
    );

    const html = page.locator("html");
    await expect(html).toHaveAttribute("dir", "rtl");

    // Light mode axe audit
    const lightResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(lightResults.violations).toEqual([]);

    const lightOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(lightOverflow).toBe(false);

    // Toggle to Dark mode and verify persistence across reload
    await page.getByTestId("theme-toggle").click();
    await expect(html).toHaveAttribute("data-theme", "dark");

    await page.reload();
    await expect(html).toHaveAttribute("data-theme", "dark");

    const darkResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(darkResults.violations).toEqual([]);

    const darkOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(darkOverflow).toBe(false);
  });

  test("StarConstruction respects prefers-reduced-motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/styleguide");

    const animatedStroke = page.locator(".sekka-construction-stroke").first();
    await expect(animatedStroke).toBeVisible();

    const animationName = await animatedStroke.evaluate(
      (el) => getComputedStyle(el).animationName
    );
    expect(animationName).toBe("none");
  });
});
