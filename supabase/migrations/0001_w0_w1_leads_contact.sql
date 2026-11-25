-- W0/W1 Migration: Public lead capture & contact messages
-- Auth (profiles) starts in W2; Admin starts in W5.
-- Security posture: RLS enabled with ZERO public policies (default deny for anon and authenticated).
-- Inserts happen exclusively through server Route Handlers using SUPABASE_SERVICE_ROLE_KEY after Zod + Turnstile + rate limiting.

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  phone text,
  name text not null,
  segment text not null check (segment in ('freelancer', 'student', 'small_business', 'other')),
  idea text,
  interview_opt_in boolean not null default false,
  consent_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_lower_idx on public.leads (lower(email));

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  consent_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);

alter table public.leads enable row level security;
alter table public.contact_messages enable row level security;
