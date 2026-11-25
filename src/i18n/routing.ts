import { defineRouting } from "next-intl/routing";
import { brandConfig } from "@/config/brand.config";

export const routing = defineRouting({
  locales: brandConfig.locale.supported,
  defaultLocale: brandConfig.locale.default,
  localePrefix: "as-needed",
});
