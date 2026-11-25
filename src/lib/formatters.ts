import { brandConfig } from "@/config/brand.config";

const numberFormatter = new Intl.NumberFormat(brandConfig.locale.numberFormatLocale);

const decimalFormatter = new Intl.NumberFormat(brandConfig.locale.numberFormatLocale, {
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat(brandConfig.locale.numberFormatLocale, {
  year: "numeric",
  month: "long",
  day: "numeric",
  calendar: "gregory",
});

/**
 * Formats integers using Western digits (0-9) per spec Section 4.3.
 */
export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

/**
 * Formats currency in Egyptian Pounds using unified "ج.م" suffix and Western digits.
 */
export function formatEgp(amount: number): string {
  return `${decimalFormatter.format(amount)} ${brandConfig.locale.currency.symbolAr}`;
}

/**
 * Formats Gregorian dates in Arabic with Western digits.
 */
export function formatArabicDate(date: Date | string): string {
  const parsed = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid date value: ${String(date)}`);
  }
  return dateFormatter.format(parsed);
}
