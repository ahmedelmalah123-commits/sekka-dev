"use client";
import { useEffect, useCallback, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { initAnalytics, grantConsent, revokeConsent } from "@/lib/analytics";

const CONSENT_STORAGE_KEY = "sekka_analytics_consent";
const CONSENT_EVENT = "sekka:consent-change";

function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): "granted" | "denied" | "unset" {
  const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
  if (saved === "granted" || saved === "denied") return saved;
  return "unset";
}

function getServerSnapshot(): "granted" | "denied" | "unset" {
  // Hide on SSR to avoid hydration mismatch
  return "granted";
}

export function ConsentBanner() {
  const key = process.env["NEXT_PUBLIC_POSTHOG_KEY"];
  const consentState = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    if (!key) return;
    if (consentState === "granted") {
      initAnalytics();
      grantConsent();
    }
  }, [key, consentState]);

  const handleAccept = useCallback(() => {
    localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
    initAnalytics();
    grantConsent();
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }, []);

  const handleDecline = useCallback(() => {
    localStorage.setItem(CONSENT_STORAGE_KEY, "denied");
    revokeConsent();
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }, []);

  if (!key || consentState !== "unset") return null;

  return (
    <aside
      role="region"
      aria-label="إعدادات الخصوصية والتحليلات"
      className="fixed bottom-4 inset-x-4 z-50 mx-auto max-w-xl rounded-sm border border-border bg-surface p-4 shadow-sm"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-text-muted leading-relaxed">
          نستخدم تحليلات محدودة بدون إرسال أي نصوص أو بيانات شخصية لتحسين تجربتك.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <Button size="sm" variant="outline" onClick={handleDecline}>
            رفض
          </Button>
          <Button size="sm" onClick={handleAccept}>
            موافق
          </Button>
        </div>
      </div>
    </aside>
  );
}
