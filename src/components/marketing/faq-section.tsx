import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SectionHeader } from "@/components/marketing/section-header";
import { buildFaqPageJsonLd } from "@/lib/seo/json-ld";

export const HOME_FAQS = [
  {
    question: "سِكّة بتساعدني إزاي في تأسيس مشروعي؟",
    answer:
      "سِكّة بيمشي معاك من الفكرة لحد التأسيس. بيسأل الأسئلة الصح، بيبني خطة مخصصة لمشروعك، وبيديك تعليمات واضحة لكل خطوة بشرية بالمصادر الرسمية.",
  },
  {
    question: "المعلومات القانونية موثوقة؟",
    answer:
      "كل محتوى قانوني بيتراجع من فريق متخصص وبيتعرض بمصدره الرسمي وتاريخ آخر مراجعة. لو مفيش معلومة موثقة، الـ AI بيقولك صراحة ويحيلك للجهة الرسمية أو محامي.",
  },
  {
    question: "إيه الفرق بين سِكّة ومحادثة عادية مع ChatGPT؟",
    answer:
      "سِكّة بيحتفظ بكل سياق مشروعك، قراراتك، وتفاصيل الخطة. مش محتاج تعيد الشرح في كل محادثة. كمان بيربط الكلام بمهام وخطوات ومستندات حقيقية.",
  },
  {
    question: "هل ده مجاني؟",
    answer:
      "في خطة مجانية هتبقى كافية للبداية. الخطط المدفوعة بالتفاصيل قريبًا.",
  },
  {
    question: "بياناتي آمنة؟",
    answer:
      "كل مشروع معزول تمامًا. مفيش تدريب على بياناتك من غير موافقتك. التفاصيل في سياسة الخصوصية.",
  },
  {
    question: "إمتى هيبقى متاح؟",
    answer:
      "بنبني النظام دلوقتي. سجّل في قائمة الانتظار وهتبقى من أوائل اللي هيجربوه.",
  },
] as const;

export function FaqSection({ faqs = HOME_FAQS }: { faqs?: typeof HOME_FAQS }) {
  const jsonLd = buildFaqPageJsonLd(
    faqs.map((f) => ({ question: f.question, answer: f.answer })),
  );

  return (
    <section className="py-20" aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-[800px] px-4">
        <SectionHeader
          id="faq-heading"
          label="الأسئلة الشائعة"
          annotation="FIG. 11"
          headingLevel="h2"
          className="mb-12 text-center"
        >
          أسئلة بتتسأل كتير
        </SectionHeader>

        <Accordion type="single" collapsible>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-start text-sm font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-text-muted leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
