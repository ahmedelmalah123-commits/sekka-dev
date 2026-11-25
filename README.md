# سِكّة / SEKKA

Arabic-first (`lang="ar"`, `dir="rtl"`) AI Co-founder SaaS built with Next.js App Router, TypeScript (strict), Tailwind CSS, Radix UI, `next-intl`, and Supabase.

## Prerequisites

- **Node.js** `>= 24.0.0` (LTS recommended)
- **pnpm** `>= 10.0.0`
- **Supabase** remote dev project (`sekka-dev`) locally, or **Supabase CLI + Docker** in Linux CI (`supabase start`)

## Local Setup

1. Install dependencies:

```bash
pnpm install
```

2. Copy `.env.example` to `.env.local` and fill in your environment values (never commit `.env.local` or any secrets):

```bash
cp .env.example .env.local
```

3. Apply Supabase database migrations (`supabase/migrations/`) to your dev project (`sekka-dev`) or reset local stack in CI:

```bash
supabase db push
```

4. Start the development server:

```bash
pnpm dev
```

## Environment Variables (Names Only)

| Variable | Scope | Purpose |
|---|---|---|
| `APP_URL` | Server / Public | Base application URL for canonical metadata and sitemap |
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Supabase anonymous key (never used to read `leads` or `contact_messages`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Supabase service-role key used exclusively by Route Handlers |
| `UPSTASH_REDIS_REST_URL` | Server only | Upstash Redis REST URL for rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Server only | Upstash Redis REST token |
| `TURNSTILE_SITE_KEY` | Server → Client prop | Cloudflare Turnstile site key |
| `TURNSTILE_SECRET_KEY` | Server only | Cloudflare Turnstile secret key |
| `NEXT_PUBLIC_POSTHOG_KEY` | Public | PostHog project key (disabled if unset) |
| `SENTRY_DSN` | Server / Public | Optional error tracking DSN |
| `ENABLE_STYLEGUIDE` | Server only | Set `"true"` in non-production verification builds to inspect `/styleguide` (always 404 when `VERCEL_ENV=production`) |

## Available Scripts

- `pnpm dev` — Run Next.js dev server (`Turbopack`)
- `pnpm build` — Build production bundle
- `pnpm start` — Start production server
- `pnpm lint` — Run ESLint (includes `sekka-rtl/no-physical-rtl-properties`)
- `pnpm typecheck` — Run `tsc --noEmit`
- `pnpm test:unit` — Run Vitest unit tests (tokens/contrast, RTL ESLint rule, formatters, guards)
- `pnpm test:rls` — Run Supabase RLS integration tests (`tests/integration/rls-public-tables.test.ts`)
- `pnpm test:e2e` — Run Playwright E2E + `@axe-core/playwright` accessibility checks (Desktop + Mobile, Light + Dark, RTL)
- `pnpm lhci` — Run Lighthouse CI performance, SEO, and accessibility budget assertions
