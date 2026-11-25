"use client";

import * as React from "react";

export const THEME_STORAGE_KEY = "sekka-theme";

/**
 * Inline head script setting `data-theme` before first paint to prevent light/dark FOUC.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var k='${THEME_STORAGE_KEY}';var s=localStorage.getItem(k);var d=s==='dark'||(s!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=d?'dark':'light';}catch(e){document.documentElement.dataset.theme='light';}})();`;

type Theme = "light" | "dark";

type ThemeToggleProps = {
  lightLabel?: string;
  darkLabel?: string;
  onThemeChange?: (theme: Theme) => void;
  className?: string;
};

function getClientTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getServerTheme(): Theme {
  return "light";
}

function subscribeToTheme(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleSystemChange = (event: MediaQueryListEvent) => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "light" || stored === "dark") return;
    } catch {
      // Ignore storage access errors
    }
    document.documentElement.dataset.theme = event.matches ? "dark" : "light";
    onStoreChange();
  };

  mediaQuery.addEventListener("change", handleSystemChange);
  return () => {
    observer.disconnect();
    mediaQuery.removeEventListener("change", handleSystemChange);
  };
}

export function ThemeToggle({
  lightLabel = "التبديل إلى الوضع الفاتح",
  darkLabel = "التبديل إلى الوضع الداكن",
  onThemeChange,
  className,
}: ThemeToggleProps) {
  const theme = React.useSyncExternalStore(
    subscribeToTheme,
    getClientTheme,
    getServerTheme
  );

  const toggle = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Ignore storage access errors
    }
    onThemeChange?.(nextTheme);
  };

  const label = theme === "dark" ? lightLabel : darkLabel;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={toggle}
      data-testid="theme-toggle"
      className={`inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border-strong bg-transparent text-text transition-colors duration-150 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer ${className ?? ""}`}
    >
      {theme === "dark" ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  );
}
