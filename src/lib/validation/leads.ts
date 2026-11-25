import { z } from "zod";

export const LeadSegmentEnum = z.enum([
  "freelancer",
  "student",
  "small_business",
  "other",
]);
export type LeadSegment = z.infer<typeof LeadSegmentEnum>;

export const LeadSegmentLabels: Record<LeadSegment, string> = {
  freelancer: "فريلانسر / مستقل",
  student: "طالب",
  small_business: "صاحب مشروع صغير",
  other: "غيره",
};

export const leadSchema = z.object({
  name: z
    .string()
    .min(2, "الاسم لازم يكون على الأقل حرفين")
    .max(100, "الاسم طويل جدًا"),
  email: z
    .string()
    .email("البريد الإلكتروني مش صحيح")
    .max(255, "البريد الإلكتروني طويل جدًا"),
  phone: z
    .string()
    .regex(/^(\+?[0-9\s\-()]{7,20})?$/, "رقم الهاتف مش صحيح")
    .optional(),
  segment: LeadSegmentEnum,
  idea: z
    .string()
    .max(1000, "الفكرة طويلة جدًا")
    .optional(),
  interview_opt_in: z.boolean(),
  consent_at: z.string().datetime({ message: "وقت الموافقة مطلوب" }),
  turnstile_token: z.string().min(1, "التحقق من البشر مطلوب"),
});

export type LeadInput = z.infer<typeof leadSchema>;

/** Server-side only: strip the client-only token before DB insert */
export function toLeadRecord(input: LeadInput) {
  return {
    name: input.name,
    email: input.email,
    phone: input.phone === "" ? undefined : input.phone,
    segment: input.segment,
    idea: input.idea === "" ? undefined : input.idea,
    interview_opt_in: input.interview_opt_in,
    consent_at: input.consent_at,
  };
}
