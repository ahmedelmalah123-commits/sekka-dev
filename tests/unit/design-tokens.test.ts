import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { brandConfig, type ThemeTokens } from "@/config/brand.config";
import { contrastRatio } from "@/lib/color-contrast";

function parseCssTokens(cssContent: string, selector: ":root" | ':root[data-theme="dark"]'): Record<string, string> {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = cssContent.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\}`, "m"));
  if (!match?.[1]) {
    throw new Error(`Could not find selector ${selector} in tokens.css`);
  }
  const map: Record<string, string> = {};
  const varRe = /--([a-z-]+)\s*:\s*(#[0-9a-fA-F]{6})\s*;/g;
  for (const m of match[1].matchAll(varRe)) {
    if (m[1] && m[2]) {
      map[m[1]] = m[2].toUpperCase();
    }
  }
  return map;
}

function assertThemeContrast(name: string, tokens: ThemeTokens) {
  const surfaces: Array<[keyof ThemeTokens, string]> = [
    ["bg", tokens.bg],
    ["surface", tokens.surface],
    ["surfaceMuted", tokens.surfaceMuted],
  ];

  // Normal text contrast >= 4.5:1 (WCAG 2.2 AA 1.4.3)
  for (const [surfaceName, surfaceHex] of surfaces) {
    expect(
      contrastRatio(tokens.text, surfaceHex),
      `${name}: text on ${surfaceName}`
    ).toBeGreaterThanOrEqual(4.5);

    expect(
      contrastRatio(tokens.textMuted, surfaceHex),
      `${name}: textMuted on ${surfaceName}`
    ).toBeGreaterThanOrEqual(4.5);

    // Interactive borderStrong >= 3.0:1 (WCAG 2.2 AA 1.4.11)
    expect(
      contrastRatio(tokens.borderStrong, surfaceHex),
      `${name}: borderStrong on ${surfaceName}`
    ).toBeGreaterThanOrEqual(3.0);
  }

  // Primary action text/links on bg & surface >= 4.5:1
  expect(
    contrastRatio(tokens.primary, tokens.bg),
    `${name}: primary on bg`
  ).toBeGreaterThanOrEqual(4.5);
  expect(
    contrastRatio(tokens.primary, tokens.surface),
    `${name}: primary on surface`
  ).toBeGreaterThanOrEqual(4.5);

  // Button label contrast >= 4.5:1
  expect(
    contrastRatio(tokens.primaryContrast, tokens.primary),
    `${name}: primaryContrast on primary`
  ).toBeGreaterThanOrEqual(4.5);
  expect(
    contrastRatio(tokens.primaryContrast, tokens.primaryHover),
    `${name}: primaryContrast on primaryHover`
  ).toBeGreaterThanOrEqual(4.5);

  // Decorative terracotta on bg & surface >= 3.0:1 (large text / graphics only)
  expect(
    contrastRatio(tokens.terracottaDecor, tokens.bg),
    `${name}: terracottaDecor on bg`
  ).toBeGreaterThanOrEqual(3.0);
  expect(
    contrastRatio(tokens.terracottaDecor, tokens.surface),
    `${name}: terracottaDecor on surface`
  ).toBeGreaterThanOrEqual(3.0);

  // Semantic colors on bg & surface >= 4.5:1
  const semantics: Array<[keyof ThemeTokens, string]> = [
    ["success", tokens.success],
    ["warning", tokens.warning],
    ["danger", tokens.danger],
    ["info", tokens.info],
  ];
  for (const [semName, semHex] of semantics) {
    expect(
      contrastRatio(semHex, tokens.bg),
      `${name}: ${semName} on bg`
    ).toBeGreaterThanOrEqual(4.5);
    expect(
      contrastRatio(semHex, tokens.surface),
      `${name}: ${semName} on surface`
    ).toBeGreaterThanOrEqual(4.5);
  }
}

describe("Design tokens & WCAG 2.2 AA contrast", () => {
  it("passes all required contrast pairs in Light theme", () => {
    assertThemeContrast("light", brandConfig.tokens.light);
  });

  it("passes all required contrast pairs in Dark theme", () => {
    assertThemeContrast("dark", brandConfig.tokens.dark);
  });

  it("documents that Light primary text on surfaceMuted is below 4.5:1 and must be avoided", () => {
    const ratio = contrastRatio(
      brandConfig.tokens.light.primary,
      brandConfig.tokens.light.surfaceMuted
    );
    expect(ratio).toBeLessThan(4.5);
  });

  it("keeps tokens.css synchronized 1:1 with brand.config.ts", () => {
    const cssPath = path.resolve(process.cwd(), "src/styles/tokens.css");
    const css = fs.readFileSync(cssPath, "utf8");
    const lightCss = parseCssTokens(css, ":root");
    const darkCss = parseCssTokens(css, ':root[data-theme="dark"]');

    const tokenMapping: Array<[string, keyof ThemeTokens]> = [
      ["bg", "bg"],
      ["surface", "surface"],
      ["surface-muted", "surfaceMuted"],
      ["border", "border"],
      ["border-strong", "borderStrong"],
      ["grid-line", "gridLine"],
      ["text", "text"],
      ["text-muted", "textMuted"],
      ["primary", "primary"],
      ["primary-hover", "primaryHover"],
      ["primary-contrast", "primaryContrast"],
      ["terracotta-decor", "terracottaDecor"],
      ["highlight", "highlight"],
      ["success", "success"],
      ["warning", "warning"],
      ["danger", "danger"],
      ["info", "info"],
    ];

    for (const [cssVar, tsKey] of tokenMapping) {
      expect(lightCss[cssVar]).toBe(brandConfig.tokens.light[tsKey].toUpperCase());
      expect(darkCss[cssVar]).toBe(brandConfig.tokens.dark[tsKey].toUpperCase());
    }
  });
});
