"use client";
import { useState, useCallback, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type State = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "subject" | "message" | "consent", string>>;

export function ContactForm({ turnstileSiteKey }: { turnstileSiteKey: string }) {
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
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
      if (subject.trim().length < 3) nextErrors.subject = "الموضوع لازم يكون على الأقل 3 حروف";
      if (message.trim().length < 10) nextErrors.message = "الرسالة قصيرة جدًا";
      if (!consented) nextErrors.consent = "الموافقة مطلوبة";

      if (Object.keys(nextErrors).length > 0) {
        setFieldErrors(nextErrors);
        return;
      }

      setFieldErrors({});
      setState("submitting");
      setErrorMsg("");

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            subject: subject.trim(),
            message: message.trim(),
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

        setState("success");
      } catch {
        setState("error");
        setErrorMsg("حصلت مشكلة من عندنا. جرّب تاني بعد شوية.");
      }
    },
    [name, email, subject, message, consented],
  );

  if (state === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-sm border border-border bg-surface p-8 text-center"
      >
        <span className="text-4xl" aria-hidden="true">✓</span>
        <h2 className="mt-4 font-display text-xl font-semibold text-text">
          وصلت رسالتك!
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          هنرد عليك في أقرب وقت.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5"
      noValidate
      aria-label="نموذج التواصل"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="contact-name">
            الاسم <span aria-hidden="true" className="text-danger">*</span>
          </Label>
          <Input
            id="contact-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "contact-name-err" : undefined}
            autoComplete="name"
          />
          {fieldErrors.name && (
            <p id="contact-name-err" role="alert" className="text-xs text-danger">
              {fieldErrors.name}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="contact-email">
            البريد الإلكتروني <span aria-hidden="true" className="text-danger">*</span>
          </Label>
          <Input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "contact-email-err" : undefined}
            dir="ltr"
            autoComplete="email"
          />
          {fieldErrors.email && (
            <p id="contact-email-err" role="alert" className="text-xs text-danger">
              {fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact-subject">
          الموضوع <span aria-hidden="true" className="text-danger">*</span>
        </Label>
        <Input
          id="contact-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          aria-invalid={!!fieldErrors.subject}
        />
        {fieldErrors.subject && (
          <p role="alert" className="text-xs text-danger">{fieldErrors.subject}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact-message">
          رسالتك <span aria-hidden="true" className="text-danger">*</span>
        </Label>
        <Textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={!!fieldErrors.message}
          rows={5}
        />
        {fieldErrors.message && (
          <p role="alert" className="text-xs text-danger">{fieldErrors.message}</p>
        )}
      </div>

      <div className="flex items-start gap-3">
        <input
          id="contact-consent"
          type="checkbox"
          checked={consented}
          onChange={(e) => setConsented(e.target.checked)}
          aria-required="true"
          className="mt-1 h-4 w-4 shrink-0 rounded-sm border border-border-strong accent-primary cursor-pointer"
        />
        <Label htmlFor="contact-consent" className="text-sm leading-relaxed cursor-pointer">
          أوافق على معالجة رسالتي للرد عليها.{" "}
          <a href="/privacy" className="underline" target="_blank" rel="noopener">
            سياسة الخصوصية
          </a>
          .
        </Label>
      </div>
      {fieldErrors.consent && (
        <p role="alert" className="text-xs text-danger -mt-3">{fieldErrors.consent}</p>
      )}

      {state === "error" && (
        <div role="alert" className="rounded-sm border border-danger/40 bg-danger/10 p-3 text-sm text-danger">
          {errorMsg}
        </div>
      )}

      <Button
        type="submit"
        disabled={state === "submitting" || !consented}
        className="w-full sm:w-auto"
      >
        {state === "submitting" ? "جاري الإرسال..." : "أرسل الرسالة"}
      </Button>
    </form>
  );
}
