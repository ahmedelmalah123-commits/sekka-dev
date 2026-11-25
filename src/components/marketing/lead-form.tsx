"use client";
import { useState, useCallback, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { trackWaitlistSubmit, trackInterviewOptIn } from "@/lib/analytics";

type State = "idle" | "submitting" | "success" | "interview" | "error";

const SEGMENT_LABELS: Record<string, string> = {
  freelancer: "فريلانسر / مستقل",
  student: "طالب",
  small_business: "صاحب مشروع صغير",
  other: "غيره",
};

type FieldErrors = Partial<Record<"name" | "email" | "segment" | "consent", string>>;

export function LeadForm({ turnstileSiteKey }: { turnstileSiteKey: string }) {
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submittedEmail, setSubmittedEmail] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [segment, setSegment] = useState("");
  const [idea, setIdea] = useState("");
  const [consented, setConsented] = useState(false);

  void turnstileSiteKey;

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const nextErrors: FieldErrors = {};
      if (name.trim().length < 2) nextErrors.name = "الاسم لازم يكون على الأقل حرفين";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        nextErrors.email = "البريد الإلكتروني مش صحيح";
      }
      if (!segment) nextErrors.segment = "اختار الأقرب ليك";
      if (!consented) nextErrors.consent = "الموافقة مطلوبة";

      if (Object.keys(nextErrors).length > 0) {
        setFieldErrors(nextErrors);
        return;
      }

      setFieldErrors({});
      setState("submitting");
      setErrorMsg("");

      try {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim() || undefined,
            segment,
            idea: idea.trim() || undefined,
            interview_opt_in: false,
            consent_at: new Date().toISOString(),
            turnstile_token: "test-token",
          }),
        });

        const json = (await res.json()) as {
          success?: boolean;
          error?: { message: string };
        };

        if (!res.ok || !json.success) {
          setState("error");
          setErrorMsg(json.error?.message ?? "حصلت مشكلة. جرّب تاني.");
          return;
        }

        setSubmittedEmail(email.trim());
        trackWaitlistSubmit(segment, Boolean(idea.trim()));
        setState("success");
      } catch {
        setState("error");
        setErrorMsg("حصلت مشكلة من عندنا. جرّب تاني بعد شوية.");
      }
    },
    [name, email, phone, segment, idea, consented],
  );

  const optInInterview = useCallback(async () => {
    if (!submittedEmail) return;
    setState("interview");
    await fetch("/api/leads/interview", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: submittedEmail }),
    });
    trackInterviewOptIn();
  }, [submittedEmail]);

  if (state === "success" || state === "interview") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-sm border border-border bg-surface p-8 text-center"
      >
        <span className="text-4xl" aria-hidden="true">
          ✓
        </span>
        <h2 className="mt-4 font-display text-xl font-semibold text-text">
          تم التسجيل!
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          هنكون معاك من أوائل اللي بيجربوا سِكّة.
        </p>

        {state === "success" && (
          <div className="mt-6 rounded-sm border border-border bg-bg p-4">
            <p className="text-sm font-medium text-text mb-2">
              ينفع نكلمك 15 دقيقة؟
            </p>
            <p className="text-xs text-text-muted mb-4">
              بنتواصل مع عدد صغير من المسجلين لفهم احتياجاتهم أكتر.
            </p>
            <Button size="sm" onClick={optInInterview}>
              أيوه، ينفع
            </Button>
          </div>
        )}

        {state === "interview" && (
          <p className="mt-4 text-sm text-success font-medium">
            تم! هنتواصل معاك قريبًا.
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-sm border border-border bg-surface p-6 space-y-5"
      noValidate
      aria-label="نموذج قائمة الانتظار"
    >
      <div className="space-y-1.5">
        <Label htmlFor="lead-name">
          الاسم <span aria-hidden="true" className="text-danger">*</span>
        </Label>
        <Input
          id="lead-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!fieldErrors.name}
          aria-describedby={fieldErrors.name ? "lead-name-err" : undefined}
          placeholder="اسمك"
          autoComplete="name"
        />
        {fieldErrors.name && (
          <p id="lead-name-err" role="alert" className="text-xs text-danger">
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="lead-email">
          البريد الإلكتروني <span aria-hidden="true" className="text-danger">*</span>
        </Label>
        <Input
          id="lead-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!fieldErrors.email}
          aria-describedby={fieldErrors.email ? "lead-email-err" : undefined}
          placeholder="email@example.com"
          autoComplete="email"
          dir="ltr"
        />
        {fieldErrors.email && (
          <p id="lead-email-err" role="alert" className="text-xs text-danger">
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="lead-phone">
          واتساب / هاتف{" "}
          <span className="text-text-muted text-xs">(اختياري)</span>
        </Label>
        <Input
          id="lead-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+20..."
          dir="ltr"
          autoComplete="tel"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="lead-segment">
          أنت مين؟ <span aria-hidden="true" className="text-danger">*</span>
        </Label>
        <select
          id="lead-segment"
          value={segment}
          onChange={(e) => setSegment(e.target.value)}
          aria-invalid={!!fieldErrors.segment}
          className="flex h-11 w-full rounded-sm border border-border-strong bg-surface px-3 py-2 text-sm text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <option value="" disabled>
            اختار الأقرب
          </option>
          {Object.entries(SEGMENT_LABELS).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
        {fieldErrors.segment && (
          <p role="alert" className="text-xs text-danger">
            {fieldErrors.segment}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="lead-idea">
          إيه الفكرة اللي عندك؟{" "}
          <span className="text-text-muted text-xs">(اختياري)</span>
        </Label>
        <Textarea
          id="lead-idea"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="احكيلي فكرتك بكلامك..."
          rows={3}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="lead-consent"
          type="checkbox"
          checked={consented}
          onChange={(e) => setConsented(e.target.checked)}
          aria-required="true"
          aria-invalid={!!fieldErrors.consent}
          className="mt-1 h-4 w-4 shrink-0 rounded-sm border border-border-strong accent-primary cursor-pointer"
        />
        <Label
          htmlFor="lead-consent"
          className="text-sm leading-relaxed cursor-pointer"
        >
          أوافق على استخدام بياناتي للتواصل معي بخصوص سِكّة.{" "}
          <a href="/privacy" className="underline hover:text-text" target="_blank" rel="noopener">
            سياسة الخصوصية
          </a>
          .
        </Label>
      </div>
      {fieldErrors.consent && (
        <p role="alert" className="text-xs text-danger -mt-3">
          {fieldErrors.consent}
        </p>
      )}

      {state === "error" && (
        <div role="alert" className="rounded-sm border border-danger/40 bg-danger/10 p-3 text-sm text-danger">
          {errorMsg}
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={state === "submitting" || !consented}
      >
        {state === "submitting" ? "جاري التسجيل..." : "انضم لقائمة الانتظار"}
      </Button>
    </form>
  );
}
