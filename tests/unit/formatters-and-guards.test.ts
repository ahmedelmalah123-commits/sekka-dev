import { afterEach, describe, expect, it, vi } from "vitest";
import { brandConfig } from "@/config/brand.config";
import { formatArabicDate, formatEgp, formatNumber } from "@/lib/formatters";
import { isStyleguideEnabled } from "@/lib/styleguide-guard";

describe("Formatters & Brand Config", () => {
  it("formats numbers using Western digits (0-9)", () => {
    expect(formatNumber(12345)).toBe("12,345");
  });

  it("formats EGP currency with unified Arabic suffix", () => {
    expect(formatEgp(500)).toBe("500 ج.م");
  });

  it("formats Gregorian Arabic dates with Western digits", () => {
    const formatted = formatArabicDate("2026-11-25");
    expect(formatted).toContain("2026");
    expect(formatted).toContain("25");
  });

  it("enforces max 3 font weights per family and required brand config fields", () => {
    expect(brandConfig.tokens.typography.maxWeightsPerFamily).toBeLessThanOrEqual(3);
    expect(brandConfig.name.ar).toBeTruthy();
    expect(brandConfig.locale.dir).toBe("rtl");
  });
});

describe("isStyleguideEnabled guard", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns false (404) when VERCEL_ENV is production even if ENABLE_STYLEGUIDE=true", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("ENABLE_STYLEGUIDE", "true");
    expect(isStyleguideEnabled()).toBe(false);
  });

  it("returns true on Vercel Preview", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("NODE_ENV", "production");
    expect(isStyleguideEnabled()).toBe(true);
  });

  it("returns false in plain production build without ENABLE_STYLEGUIDE", () => {
    vi.stubEnv("VERCEL_ENV", "");
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("ENABLE_STYLEGUIDE", "");
    expect(isStyleguideEnabled()).toBe(false);
  });

  it("returns true in non-Vercel production test server when ENABLE_STYLEGUIDE=true", () => {
    vi.stubEnv("VERCEL_ENV", "");
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("ENABLE_STYLEGUIDE", "true");
    expect(isStyleguideEnabled()).toBe(true);
  });
});
