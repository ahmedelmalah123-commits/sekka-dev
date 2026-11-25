"use client";
/**
 * Consent-gated PostHog analytics wrapper.
 * - Dynamically imports posthog-js ONLY when NEXT_PUBLIC_POSTHOG_KEY is set,
 *   keeping it out of the initial JS bundle when disabled.
 * - No free-text user content (idea text, messages) is ever sent.
 * - Consent must be granted before any event fires (see ConsentBanner).
 *
 * [بحث] PostHog cookieless/memory-only mode: needs legal review under
 * Egyptian Personal Data Protection Law (Law 151/2020) before switching
 * the default. See docs/decisions.md item [بحث]-002.
 */

type PostHogLike = {
  init: (key: string, options: Record<string, unknown>) => void;
  opt_in_capturing: () => void;
  opt_out_capturing: () => void;
  has_opted_out_capturing: () => boolean;
  capture: (event: string, properties?: Record<string, unknown>) => void;
  debug: () => void;
};

let _ph: PostHogLike | null = null;
let _initializing: Promise<void> | null = null;

export function initAnalytics(): void {
  const key = process.env["NEXT_PUBLIC_POSTHOG_KEY"];
  if (!key || typeof window === "undefined" || _ph || _initializing) return;

  _initializing = import("posthog-js")
    .then((mod) => {
      const ph = mod.default as unknown as PostHogLike;
      ph.init(key, {
        api_host: "https://app.posthog.com",
        capture_pageview: false,
        capture_pageleave: false,
        persistence: "memory",
        autocapture: false,
        disable_session_recording: true,
        loaded: (instance: PostHogLike) => {
          if (process.env.NODE_ENV === "development") {
            instance.debug();
          }
        },
      });
      _ph = ph;
    })
    .catch(() => {
      _initializing = null;
    });
}

export function grantConsent(): void {
  _ph?.opt_in_capturing();
}

export function revokeConsent(): void {
  _ph?.opt_out_capturing();
}

export function hasConsent(): boolean {
  if (!_ph || typeof window === "undefined") return false;
  return !_ph.has_opted_out_capturing();
}

export function trackPageView(path: string, referrer?: string): void {
  _ph?.capture("page_view", { path, referrer });
}

export function trackCtaClick(location: string, label: string): void {
  _ph?.capture("cta_click", { location, label });
}

export function trackWaitlistView(): void {
  _ph?.capture("waitlist_view");
}

export function trackWaitlistSubmit(segment: string, has_idea: boolean): void {
  _ph?.capture("waitlist_submit", { segment, has_idea });
}

export function trackInterviewOptIn(): void {
  _ph?.capture("interview_opt_in");
}

export function trackThemeToggled(theme: "light" | "dark"): void {
  _ph?.capture("theme_toggled", { theme });
}
