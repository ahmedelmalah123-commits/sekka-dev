import { RuleTester } from "eslint";
import { describe, it } from "vitest";
import { noPhysicalRtlPropertiesRule } from "../../eslint-rules/no-physical-rtl-properties.mjs";

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2023,
    sourceType: "module",
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
  },
});

describe("sekka-rtl/no-physical-rtl-properties ESLint rule", () => {
  it("enforces logical RTL classes/styles and allows explicit direction-agnostic centering", () => {
    tester.run("no-physical-rtl-properties", noPhysicalRtlPropertiesRule, {
      valid: [
        { code: `<div className="ms-4 me-2 ps-3 pe-6 start-0 end-4 text-start border-s rounded-e-sm" />` },
        { code: `<div className={cn("ms-2", isOpen && "ps-4")} />` },
        { code: `<div className="absolute left-1/2 -translate-x-1/2 top-4" />` },
        { code: `<div className="absolute right-1/2 translate-x-1/2" />` },
        { code: `<div style={{ marginInlineStart: 12, textAlign: "start" }} />` },
        { code: `<div style={{ left: "50%", transform: "translateX(-50%)" }} />` },
      ],
      invalid: [
        {
          code: `<div className="ml-4" />`,
          errors: [{ messageId: "physicalClass" }],
        },
        {
          code: `<div className="md:pr-6" />`,
          errors: [{ messageId: "physicalClass" }],
        },
        {
          code: `<div className="text-right" />`,
          errors: [{ messageId: "physicalClass" }],
        },
        {
          code: `<div className="border-l rounded-r-md" />`,
          errors: [{ messageId: "physicalClass" }, { messageId: "physicalClass" }],
        },
        {
          code: `<div className="left-1/2" />`,
          errors: [{ messageId: "physicalClass" }],
        },
        {
          code: `<div className={cn("mr-2")} />`,
          errors: [{ messageId: "physicalClass" }, { messageId: "physicalClass" }],
        },
        {
          code: `<div style={{ marginLeft: 8 }} />`,
          errors: [{ messageId: "physicalStyleProp" }],
        },
        {
          code: `<div style={{ textAlign: "left" }} />`,
          errors: [{ messageId: "physicalTextAlign" }],
        },
      ],
    });
  });
});
