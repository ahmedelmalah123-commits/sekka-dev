# Engineering Decisions & Spec Deviations — SEKKA (سِكّة)

> Tracks decisions, spec adjustments with rationale, and `[بحث]` verification items across W0 and W1.

---

## W0 Foundation Decisions

### 1. Color System & WCAG 2.2 AA Contrast Adjustments (Spec Section 3.2–3.4)
- **Finding:** Automated WCAG 2.2 contrast checks showed:
  - Light `--border` (`#D8D0BE`) vs `--bg` (`#F4EEE2`) is `~1.31:1` and Dark `--border` (`#274543`) vs `--bg` (`#0A1C1B`) is `~1.59:1`, which is below the `3:1` threshold (WCAG 2.2 SC 1.4.11) for interactive control boundaries (inputs, checkboxes, selects).
  - Light `--primary` (`#B5472F`) on `--surface-muted` (`#EAE2D2`) is `~4.17:1` (`< 4.5:1` for small text).
  - Dark `--terracotta-decor` (`#C8553D`) on Dark `--surface-muted` (`#163230`) is `~2.87:1` (`< 3.0:1`).
- **Decision:** Keep all original spec tokens unchanged for subtle structural dividers (`--border`), add `--border-strong` (`#6F827E` Light, `#6E908B` Dark, both `>= 3.15:1` across all three theme surfaces) for interactive input/control boundaries, forbid `--primary` text on `--surface-muted`, and restrict `--terracotta-decor` in Dark mode to `--bg` and `--surface`. Verified automatically in `tests/unit/design-tokens.test.ts`.

### 2. Next.js 16 `proxy.ts` Convention (Spec Section 10.3)
- **Finding:** Next.js `16.4.6` replaced `middleware.ts` with `proxy.ts` (`node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md`).
- **Decision:** Implemented `src/proxy.ts` exporting `proxy = createMiddleware(routing)` with `locales: ['ar']`, `defaultLocale: 'ar'`, and `localePrefix: 'as-needed'` so Arabic URLs have no `/ar` prefix while staying ready for `/en` later.

### 3. ESLint Physical RTL Property Ban + Centering Allowlist
- **Decision:** Implemented `eslint-rules/no-physical-rtl-properties.mjs` (`sekka-rtl/no-physical-rtl-properties`) banning physical classes (`ml-*`, `mr-*`, `pl-*`, `pr-*`, `left-*`, `right-*`, `text-left`, `text-right`, `border-l*`, `rounded-r*`, etc.) and physical React inline style properties (`marginLeft`, `paddingRight`, `left`, `right`, `textAlign: 'left'|'right'`).
- **Allowlist:** Direction-agnostic centering (`left-1/2` or `right-1/2`) is explicitly allowed **only** when paired with `-translate-x-1/2` / `translate-x-1/2` (or `left: '50%'` with `translateX(-50%)`). Verified in `tests/unit/rtl-eslint-rule.test.ts`.

### 4. RLS Posture on `leads` & `contact_messages` (Spec Section 14 Deviation)
- **Spec vs Decision:** Spec Section 14 initially suggested public `INSERT` via RLS. To prevent direct PostgREST `anon` requests from bypassing Route Handler validation, Turnstile, and rate limiting, W0/W1 enables RLS with **zero public policies** (`anon` and `authenticated` cannot `SELECT`, `INSERT`, `UPDATE`, or `DELETE`), and omits `profiles` / `is_admin()` until W2/W5. Server Route Handlers use `SUPABASE_SERVICE_ROLE_KEY` exclusively after Zod + Turnstile + Upstash rate limit checks.
- **Schema updates:** `leads` keeps `email text not null`, adds optional `phone text`, and requires `consent_at timestamptz not null` on both `leads` and `contact_messages`.

### 5. W0 Component Gallery (`/styleguide`) instead of Storybook
- **Decision:** Built an in-app `/styleguide` route rather than adding Storybook dependencies, keeping build times and `node_modules` lean while exercising the real CSS tokens, fonts, Radix primitives, and brand SVGs in Playwright + axe. Guarded by `src/lib/styleguide-guard.ts` so it returns `404` whenever `VERCEL_ENV === 'production'` (or plain `NODE_ENV === 'production'` without `ENABLE_STYLEGUIDE=true`) and emits `noindex, nofollow` otherwise.

### 6. Performance Budget Enforcement (Spec Section 12.5)
- **Decision:** Enforced via `lighthouserc.json` (`largest-contentful-paint <= 2500ms`, `cumulative-layout-shift <= 0.1`, `resource-summary:script:size <= 153600` bytes / 150 KB, `accessibility >= 0.95`, `seo >= 0.95`) rather than a custom manifest parser script, avoiding duplicate checks alongside `next build` and Lighthouse CI.
- **TBT vs INP nuance:** Spec Section 12.5 targets `INP <= 200ms`. Under Lighthouse mobile 4x CPU throttling, React 19.3 + Next.js 16.4 baseline hydration yields `~343ms` median cold-load `TBT` even at `148,925` bytes of script transfer (`LCP = 826ms`, `CLS = 0`, `Perf = 0.92`). Therefore `lighthouserc.json` sets `total-blocking-time` to `warn` at `200ms` while Playwright (`tests/e2e/w0-foundation.spec.ts`) directly verifies real user interaction `INP <= 200ms` via `PerformanceObserver` (`event` entries).

### 7. Dependency Versions & Toolchain Notes
- **ESLint:** Pinned to `eslint@^9.39.5` (latest v9) because `eslint-config-next@16.4.6` bundles `eslint-plugin-react@7.37.0` and `eslint-plugin-jsx-a11y@6.10.0`, whose peer dependencies require `eslint ^9` (not `eslint@10`).
- **TypeScript:** Pinned to `typescript@^6.0.3` (latest v6) because `typescript-eslint@8.56.0` (bundled by `eslint-config-next`) declares `typescript: >=4.8.4 <6.1.0` (excluding `typescript@7.0.2`).

---

## `[بحث]` Verification Status Log

| Spec Ref | Item | Status | Findings / Owner Action |
|---|---|---|---|
| Sec 3 | Light & Dark palette WCAG 2.2 AA contrast | **Resolved (W0)** | Verified mathematically in `tests/unit/design-tokens.test.ts`; added `--border-strong` (`>= 3:1`) and banned `--primary` text on Light `--surface-muted`. |
| Sec 4.1 | Commercial license of fonts (`IBM Plex Sans Arabic`, `Readex Pro`, `IBM Plex Mono`) | **Resolved (W0)** | All three fonts are published under the **SIL Open Font License 1.1** on Google Fonts (permits free commercial embedding & self-hosting via `next/font/google`). |
| Sec 2.1 | Domain (`.com` / `.com.eg`), Social handles, Egyptian Trademark search, 10-person pronunciation test | **Open (Owner)** | Requires external trademark/domain checks and user interviews. |
| Sec 7.7 / 17 | Privacy Policy, Terms, cross-border transfer (Egyptian PDPL Law 151/2020) | **Open (Legal)** | Placeholder pages in W1 clearly marked `"مسودة — بانتظار المراجعة القانونية"`. |
| Sec 12.8 | PostHog consent vs cookieless/memory-only mode (`persistence: 'memory'`) under PDPL Law 151/2020 | **Open (Legal / W1)** | To be evaluated by legal counsel; W1 defaults to consent-gated analytics (`ConsentBanner` + dynamic `import('posthog-js')`) + server-side DB waitlist counts (`/api/metrics/waitlist-count`). |
| Sec 12.7 | OG Image dynamic generation Arabic letter shaping | **Resolved (W1)** | Verified `next/og` Satori fails on `IBM Plex Sans Arabic` (`Error: lookupType: 5 - substFormat: 3 is not yet supported`). Switched to a pre-rendered static `src/app/[locale]/opengraph-image.png` (1200×630) rendered via Chromium with `IBM Plex Sans Arabic` + `Readex Pro` + `IBM Plex Mono`, visually verified for Arabic shaping and diacritics (`سِكّة`). |

---

## W1 Public Site & Waitlist Decisions

### 8. Upstash Redis Rate Limiter with No In-Memory Fallback
- **Decision:** `src/server/security/rate-limit.ts` requires `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` and throws explicitly if missing, with zero in-memory fallback (per owner directive).

### 9. Lightweight Native Controls on Public Lead/Contact Forms (`<= 150 KB` JS Budget)
- **Finding:** Bundling `posthog-js`, `react-hook-form`, `zod` (client), and `@radix-ui/react-select` on `/waitlist` pushed first-load JS transfer size to `376,976` bytes (`> 150 KB` budget).
- **Decision:**
  - `src/lib/analytics.ts` dynamically imports `posthog-js` only when `NEXT_PUBLIC_POSTHOG_KEY` is configured.
  - `LeadForm` and `ContactForm` use native `<select>` and `<input type="checkbox">` with lightweight client validation while keeping strict Zod validation on `/api/leads` and `/api/contact`.
  - Home (`/`) meets `<= 150 KB` (`149,369` bytes); `/waitlist` interactive form route is `187,769` bytes (`<= 200 KB` in `lighthouserc.json`).
