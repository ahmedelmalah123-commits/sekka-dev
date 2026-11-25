import { describe, expect, it, vi, beforeEach } from "vitest";

const captureMock = vi.fn();
const initMock = vi.fn();
const optInMock = vi.fn();
const optOutMock = vi.fn();

vi.mock("posthog-js", () => ({
  default: {
    init: initMock,
    capture: captureMock,
    opt_in_capturing: optInMock,
    opt_out_capturing: optOutMock,
    has_opted_out_capturing: () => false,
  },
}));

describe("analytics wrapper", () => {
  beforeEach(() => {
    vi.resetModules();
    captureMock.mockClear();
    initMock.mockClear();
    delete process.env["NEXT_PUBLIC_POSTHOG_KEY"];
  });

  it("is a complete no-op when NEXT_PUBLIC_POSTHOG_KEY is unset", async () => {
    const analytics = await import("@/lib/analytics");
    analytics.initAnalytics();
    analytics.trackPageView("/");
    analytics.trackWaitlistSubmit("freelancer", true);
    analytics.trackInterviewOptIn();
    analytics.trackThemeToggled("dark");

    expect(initMock).not.toHaveBeenCalled();
    expect(captureMock).not.toHaveBeenCalled();
  });

  it("sends only non-PII properties when key is configured and initialized", async () => {
    process.env["NEXT_PUBLIC_POSTHOG_KEY"] = "phc_test_key";
    // Ensure window is defined in unit test environment
    if (typeof window === "undefined") {
      Object.defineProperty(globalThis, "window", { value: {}, writable: true });
    }
    const analytics = await import("@/lib/analytics");
    analytics.initAnalytics();
    await new Promise((r) => setTimeout(r, 20));
    expect(initMock).toHaveBeenCalledTimes(1);

    analytics.trackWaitlistSubmit("small_business", true);
    expect(captureMock).toHaveBeenCalledWith("waitlist_submit", {
      segment: "small_business",
      has_idea: true,
    });
  });
});
