"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { BlueprintGrid } from "@/components/brand/blueprint-grid";
import { DimensionLabel } from "@/components/brand/dimension-label";
import { RegistrationMarks } from "@/components/brand/registration-marks";
import { StarConstruction } from "@/components/brand/star-construction";
import { TitleBlock } from "@/components/brand/title-block";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Bdi } from "@/components/ui/bdi";
import { Button, IconButton } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { brandConfig } from "@/config/brand.config";
import { formatArabicDate, formatEgp, formatNumber } from "@/lib/formatters";

export function StyleguideShowcase() {
  const [agreed, setAgreed] = React.useState(false);
  const [segment, setSegment] = React.useState("freelancer");

  return (
    <div className="space-y-12">
      {/* Header bar */}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div className="space-y-1">
          <DimensionLabel code="W0 / GALLERY" label="RTL · Light · Dark" />
          <h1 className="text-3xl font-semibold text-text">
            معرض مكونات {brandConfig.name.ar} (<Bdi>{brandConfig.name.en}</Bdi>)
          </h1>
          <p className="text-sm text-text-muted">
            فحص عملي لكل مكونات الأساس والهوية في <Bdi>RTL</Bdi> والمظهرين الفاتح والداكن.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <IconButton aria-label="فتح قائمة الاختبار" variant="outline">
                <Menu className="h-4 w-4" aria-hidden="true" />
              </IconButton>
            </SheetTrigger>
            <SheetContent title="قائمة معاينة RTL">
              <nav aria-label="معاينة الروابط" className="flex flex-col gap-3">
                <span className="text-sm font-medium text-text">الرئيسية</span>
                <span className="text-sm text-text-muted">كيف يعمل</span>
                <span className="text-sm text-text-muted">المميزات</span>
                <span className="text-sm text-text-muted">قائمة الانتظار</span>
              </nav>
            </SheetContent>
          </Sheet>
          <ThemeToggle />
        </div>
      </header>

      {/* Brand components */}
      <section className="space-y-6">
        <DimensionLabel code="SEC. 01" label="مكونات الهوية (Blueprint × Arabic Geometric)" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-sm border border-border bg-bg p-6">
            <BlueprintGrid />
            <div className="relative flex flex-col items-center gap-4 py-4">
              <RegistrationMarks className="bg-surface/95 p-6 border border-border">
                <StarConstruction size={160} label="نجمة سِكّة الثمانية بخطوط الإنشاء" />
              </RegistrationMarks>
              <div className="flex items-center gap-3">
                <StarConstruction size={28} variant="mark" animated={false} />
                <span className="text-sm font-medium text-text">
                  علامة الـ <Bdi>AI</Bdi> المبسطة
                </span>
              </div>
            </div>
          </div>

          <TitleBlock
            code="FIG. 08"
            title="نموذج بطاقة قانونية (مسودة)"
            status="draft"
            source="مسودة توضيحية — بانتظار المراجعة"
            reviewedAt={formatArabicDate("2026-11-25")}
            version="v0.1"
          >
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-text-muted">مثال تنسيق أرقام</dt>
                <dd className="font-medium text-text tabular-nums">
                  {formatNumber(1500)} مستخدم
                </dd>
              </div>
              <div>
                <dt className="text-text-muted">مثال عملة</dt>
                <dd className="font-medium text-text tabular-nums">
                  {formatEgp(250)} (مثال تنسيق فقط)
                </dd>
              </div>
            </dl>
          </TitleBlock>
        </div>
      </section>

      {/* Typography & Tokens */}
      <section className="space-y-6">
        <DimensionLabel code="SEC. 02" label="النصوص والباليت (Tile and Terracotta)" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3 rounded-sm border border-border bg-surface p-6">
            <p className="text-4xl font-semibold text-text">عنوان كبير للتجربة</p>
            <p className="text-2xl font-semibold text-terracotta-decor">
              عنوان فرعي بلون التيراكوتا الزخرفي
            </p>
            <p className="text-base text-text">
              نص أساسي بخط <Bdi>IBM Plex Sans Arabic</Bdi> يوضح القراءة المريحة في{" "}
              <Bdi>RTL</Bdi> بدون تباعد حروف.
            </p>
            <p className="font-mono text-xs text-text-muted tabular-nums">
              <Bdi>FIG. 01 · 01 / 06 · 2026-11-25</Bdi>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-sm border border-border bg-surface p-6 sm:grid-cols-3">
            <div className="space-y-1">
              <div className="h-10 rounded-sm border border-border bg-bg" />
              <p className="font-mono text-xs text-text-muted"><Bdi>--bg</Bdi></p>
            </div>
            <div className="space-y-1">
              <div className="h-10 rounded-sm border border-border bg-surface-muted" />
              <p className="font-mono text-xs text-text-muted"><Bdi>--surface-muted</Bdi></p>
            </div>
            <div className="space-y-1">
              <div className="h-10 rounded-sm bg-primary" />
              <p className="font-mono text-xs text-text-muted"><Bdi>--primary</Bdi></p>
            </div>
            <div className="space-y-1">
              <div className="h-10 rounded-sm bg-terracotta-decor" />
              <p className="font-mono text-xs text-text-muted"><Bdi>--terracotta-decor</Bdi></p>
            </div>
            <div className="space-y-1">
              <div className="h-10 rounded-sm bg-highlight" />
              <p className="font-mono text-xs text-text-muted"><Bdi>--highlight</Bdi></p>
            </div>
            <div className="space-y-1">
              <div className="h-10 rounded-sm border border-border-strong bg-surface" />
              <p className="font-mono text-xs text-text-muted"><Bdi>--border-strong</Bdi></p>
            </div>
          </div>
        </div>
      </section>

      {/* Base Controls & Form Primitives */}
      <section className="space-y-6">
        <DimensionLabel code="SEC. 03" label="المكونات الأساسية (Buttons · Inputs · Select · Checkbox)" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 rounded-sm border border-border bg-surface p-6">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">إجراء أساسي</Button>
              <Button variant="secondary">إجراء ثانوي</Button>
              <Button variant="outline">حدود واضحة</Button>
              <Button variant="ghost">زر شفاف</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="neutral">افتراضي</Badge>
              <Badge variant="highlight">تمييز AI</Badge>
              <Badge variant="success">معتمد</Badge>
              <Badge variant="warning">بانتظار المراجعة</Badge>
              <Badge variant="danger">خطأ</Badge>
            </div>
            <Alert variant="info" title="تنبيه إرشادي">
              المعنى لا يعتمد على اللون وحده؛ كل حالة مصحوبة بأيقونة ونص عربي واضح.
            </Alert>
          </div>

          <form
            className="space-y-4 rounded-sm border border-border bg-surface p-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-1.5">
              <Label htmlFor="sg-name">الاسم</Label>
              <Input id="sg-name" placeholder="مثال: أحمد محمد" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="sg-segment">نوع المستخدم</Label>
              <Select dir="rtl" value={segment} onValueChange={setSegment}>
                <SelectTrigger id="sg-segment">
                  <SelectValue placeholder="اختر التخصص" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="freelancer">مستقل (<Bdi>Freelancer</Bdi>)</SelectItem>
                  <SelectItem value="student">طالب</SelectItem>
                  <SelectItem value="small_business">صاحب مشروع صغير</SelectItem>
                  <SelectItem value="other">غير ذلك</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="sg-idea">فكرتك</Label>
              <Textarea id="sg-idea" placeholder="احكيلنا فكرة مشروعك باختصار..." />
            </div>

            <div className="flex items-start gap-2.5">
              <Checkbox
                id="sg-consent"
                checked={agreed}
                onCheckedChange={(v) => setAgreed(v === true)}
              />
              <Label htmlFor="sg-consent" className="leading-relaxed">
                أوافق على حفظ بياناتي للتواصل بخصوص الإطلاق المبكر.
              </Label>
            </div>
          </form>
        </div>
      </section>

      {/* Tabs & Accordion */}
      <section className="space-y-6">
        <DimensionLabel code="SEC. 04" label="التبويبات والأسئلة (Tabs · Accordion)" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-sm border border-border bg-surface p-6">
            <Tabs defaultValue="decisions">
              <TabsList>
                <TabsTrigger value="decisions">القرارات</TabsTrigger>
                <TabsTrigger value="documents">المستندات</TabsTrigger>
                <TabsTrigger value="tasks">المهام</TabsTrigger>
              </TabsList>
              <TabsContent value="decisions">
                <p className="text-sm text-text-muted">
                  سجل القرارات يحتفظ بالسبب والتاريخ وأي قرار يلغي ما قبله.
                </p>
              </TabsContent>
              <TabsContent value="documents">
                <p className="text-sm text-text-muted">
                  مكتبة مستندات المشروع مع تتبع النسخ والتعديلات.
                </p>
              </TabsContent>
              <TabsContent value="tasks">
                <p className="text-sm text-text-muted">
                  تمييز واضح بين المهام التي ينفذها الذكاء الاصطناعي والمهام البشرية.
                </p>
              </TabsContent>
            </Tabs>
          </div>

          <div className="rounded-sm border border-border bg-surface px-6 py-2">
            <Accordion type="single" collapsible>
              <AccordionItem value="q1">
                <AccordionTrigger>إزاي بتشتغل ألوان سِكّة في الوضعين؟</AccordionTrigger>
                <AccordionContent>
                  الوضع الفاتح والداكن مبنيان بمتغيرات CSS محققة التباين، مع فصل واضح بين لون الفعل الأساسي ولون الزخرفة.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>هل يدعم التطبيق الاتجاه من اليمين لليسار بالكامل؟</AccordionTrigger>
                <AccordionContent>
                  نعم، الواجهة مبنية بخصائص CSS المنطقية فقط وتُختبر على الجوال وسطح المكتب.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}
