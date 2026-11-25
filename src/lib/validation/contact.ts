import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "الاسم لازم يكون على الأقل حرفين")
    .max(100, "الاسم طويل جدًا"),
  email: z
    .string()
    .email("البريد الإلكتروني مش صحيح")
    .max(255, "البريد الإلكتروني طويل جدًا"),
  subject: z
    .string()
    .min(3, "الموضوع لازم يكون على الأقل 3 حروف")
    .max(200, "الموضوع طويل جدًا"),
  message: z
    .string()
    .min(10, "الرسالة قصيرة جدًا")
    .max(3000, "الرسالة طويلة جدًا"),
  consent_at: z.string().datetime({ message: "وقت الموافقة مطلوب" }),
  turnstile_token: z.string().min(1, "التحقق من البشر مطلوب"),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Server-side only: strip the client-only token before DB insert */
export function toContactRecord(input: ContactInput) {
  return {
    name: input.name,
    email: input.email,
    subject: input.subject,
    message: input.message,
    consent_at: input.consent_at,
  };
}
