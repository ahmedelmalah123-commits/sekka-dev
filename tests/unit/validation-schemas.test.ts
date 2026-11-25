import { describe, expect, it } from "vitest";
import { leadSchema, toLeadRecord } from "@/lib/validation/leads";
import { contactSchema, toContactRecord } from "@/lib/validation/contact";

describe("leadSchema", () => {
  const validPayload = {
    name: "أحمد الملاح",
    email: "ahmed@example.com",
    phone: "+201000000000",
    segment: "freelancer" as const,
    idea: "منصة لمساعدة المؤسسين",
    interview_opt_in: false,
    consent_at: "2026-11-25T10:00:00.000Z",
    turnstile_token: "test-token",
  };

  it("accepts a valid lead payload and strips turnstile_token", () => {
    const parsed = leadSchema.parse(validPayload);
    const record = toLeadRecord(parsed);
    expect(record.email).toBe("ahmed@example.com");
    expect(record.segment).toBe("freelancer");
    expect("turnstile_token" in record).toBe(false);
  });

  it("allows optional phone and idea to be empty strings (normalized in toLeadRecord)", () => {
    const parsed = leadSchema.parse({
      ...validPayload,
      phone: "",
      idea: "",
    });
    const record = toLeadRecord(parsed);
    expect(record.phone).toBeUndefined();
    expect(record.idea).toBeUndefined();
  });

  it("rejects missing consent_at", () => {
    const res = leadSchema.safeParse({
      ...validPayload,
      consent_at: "",
    });
    expect(res.success).toBe(false);
  });

  it("rejects invalid email and unknown segment", () => {
    const res = leadSchema.safeParse({
      ...validPayload,
      email: "not-an-email",
      segment: "enterprise",
    });
    expect(res.success).toBe(false);
  });
});

describe("contactSchema", () => {
  const validContact = {
    name: "سارة علي",
    email: "sara@example.com",
    subject: "استفسار عن الباقات",
    message: "عايزين نعرف تفاصيل أكثر عن باقة الحاضنات.",
    consent_at: "2026-11-25T10:00:00.000Z",
    turnstile_token: "test-token",
  };

  it("accepts a valid contact payload and strips turnstile_token", () => {
    const parsed = contactSchema.parse(validContact);
    const record = toContactRecord(parsed);
    expect(record.subject).toBe("استفسار عن الباقات");
    expect("turnstile_token" in record).toBe(false);
  });

  it("rejects short message and missing consent_at", () => {
    const res = contactSchema.safeParse({
      ...validContact,
      message: "قصيرة",
      consent_at: "invalid-date",
    });
    expect(res.success).toBe(false);
  });
});
