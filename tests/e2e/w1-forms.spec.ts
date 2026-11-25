import { test, expect } from "@playwright/test";

test.describe("W1 Waitlist & Contact Forms", () => {
  test("Waitlist form validates required fields and completes submission + interview opt-in", async ({
    page,
  }) => {
    await page.route("**/api/leads", async (route) => {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.route("**/api/leads/interview", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto("/waitlist");

    await page.getByLabel(/الاسم/).fill("أحمد الملاح");
    await page.getByLabel(/البريد الإلكتروني/).fill("ahmed@example.com");

    await page.getByLabel(/أنت مين/).selectOption("freelancer");

    await page.getByLabel(/إيه الفكرة اللي عندك/).fill("منصة للمؤسسين");
    await page.getByRole("checkbox").check();

    await page.getByRole("button", { name: "انضم لقائمة الانتظار" }).click();

    await expect(page.getByText("تم التسجيل!")).toBeVisible();
    await expect(page.getByText("ينفع نكلمك 15 دقيقة؟")).toBeVisible();

    await page.getByRole("button", { name: "أيوه، ينفع" }).click();
    await expect(page.getByText("تم! هنتواصل معاك قريبًا.")).toBeVisible();
  });

  test("Contact form submits successfully", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto("/contact");

    await page.getByLabel(/الاسم/).fill("سارة علي");
    await page.getByLabel(/البريد الإلكتروني/).fill("sara@example.com");
    await page.getByLabel(/الموضوع/).fill("استفسار عن الحاضنات");
    await page
      .getByLabel(/رسالتك/)
      .fill("عايزين نعرف تفاصيل أكثر عن باقة الحاضنات والمسرّعات.");
    await page.getByRole("checkbox").check();

    await page.getByRole("button", { name: "أرسل الرسالة" }).click();
    await expect(page.getByText("وصلت رسالتك!")).toBeVisible();
  });
});
