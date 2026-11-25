const PHYSICAL_CLASS_PATTERNS = [
  /^-?(?:ml|mr|pl|pr|left|right|scroll-ml|scroll-mr|scroll-pl|scroll-pr)-/,
  /^inset-(?:l|r)-/,
  /^text-(?:left|right)$/,
  /^border-(?:l|r)(?:-|$)/,
  /^rounded-(?:l|r|tl|tr|bl|br)(?:-|$)/,
  /^float-(?:left|right)$/,
  /^clear-(?:left|right)$/,
  /^origin-(?:left|right|top-left|top-right|bottom-left|bottom-right)$/,
];

const PHYSICAL_STYLE_PROPS = new Set([
  "marginLeft",
  "marginRight",
  "paddingLeft",
  "paddingRight",
  "left",
  "right",
  "borderLeft",
  "borderRight",
  "borderLeftWidth",
  "borderRightWidth",
  "borderLeftColor",
  "borderRightColor",
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius",
]);

/**
 * Explicit allowlist for direction-agnostic centering utilities (e.g. `left-1/2 -translate-x-1/2`).
 * Documented in docs/decisions.md per spec Section 5.2 & W0 requirements.
 */
const DIRECTION_AGNOSTIC_CENTERING_TOKENS = new Set(["left-1/2", "right-1/2"]);
const TRANSLATE_CENTER_RE = /(?:^|:)-?translate-x-1\/2$/;

const CLASS_HELPER_NAMES = new Set(["cn", "clsx", "cva", "twMerge"]);

function stripVariantPrefixes(token) {
  let current = token.trim();
  while (current.includes(":")) {
    const bracketDepth = (current.match(/\[/g) || []).length;
    const colonIndex = current.indexOf(":");
    const openBracketIndex = current.indexOf("[");
    if (bracketDepth > 0 && openBracketIndex !== -1 && openBracketIndex < colonIndex) {
      break;
    }
    current = current.slice(colonIndex + 1);
  }
  return current.replace(/^!/, "");
}

function isAllowedDirectionAgnosticToken(baseToken, allTokens) {
  if (!DIRECTION_AGNOSTIC_CENTERING_TOKENS.has(baseToken)) {
    return false;
  }
  return allTokens.some((candidate) => TRANSLATE_CENTER_RE.test(candidate));
}

function findPhysicalClasses(classString) {
  const tokens = classString.split(/\s+/).filter(Boolean);
  const violations = [];
  for (const rawToken of tokens) {
    const baseToken = stripVariantPrefixes(rawToken);
    if (isAllowedDirectionAgnosticToken(baseToken, tokens)) {
      continue;
    }
    if (PHYSICAL_CLASS_PATTERNS.some((pattern) => pattern.test(baseToken))) {
      violations.push(rawToken);
    }
  }
  return violations;
}

function collectClassStrings(node, out = []) {
  if (!node) return out;
  if (node.type === "Literal" && typeof node.value === "string") {
    out.push({ node, value: node.value });
  } else if (node.type === "TemplateLiteral") {
    const combined = node.quasis.map((q) => q.value.cooked ?? "").join(" ");
    out.push({ node, value: combined });
    for (const expr of node.expressions) {
      collectClassStrings(expr, out);
    }
  } else if (node.type === "ConditionalExpression") {
    collectClassStrings(node.consequent, out);
    collectClassStrings(node.alternate, out);
  } else if (node.type === "LogicalExpression") {
    collectClassStrings(node.left, out);
    collectClassStrings(node.right, out);
  } else if (node.type === "ArrayExpression") {
    for (const element of node.elements) {
      collectClassStrings(element, out);
    }
  } else if (node.type === "ObjectExpression") {
    for (const prop of node.properties) {
      if (prop.type === "Property" && prop.key.type === "Literal" && typeof prop.key.value === "string") {
        out.push({ node: prop.key, value: prop.key.value });
      }
    }
  } else if (node.type === "CallExpression") {
    for (const arg of node.arguments) {
      collectClassStrings(arg, out);
    }
  }
  return out;
}

export const noPhysicalRtlPropertiesRule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Ban physical directional CSS/Tailwind properties in favor of RTL-safe logical properties (ms-*, me-*, ps-*, pe-*, start-*, end-*, text-start).",
    },
    schema: [],
    messages: {
      physicalClass:
        "Physical directional class '{{token}}' is banned for RTL safety. Use logical properties (ms-*, me-*, ps-*, pe-*, start-*, end-*, text-start, border-s, rounded-s). Direction-agnostic centering requires left-1/2 paired with -translate-x-1/2.",
      physicalStyleProp:
        "Physical inline style property '{{prop}}' is banned for RTL safety. Use CSS logical properties (marginInlineStart, paddingInlineStart, insetInlineStart, textAlign: 'start').",
      physicalTextAlign:
        "Physical textAlign '{{value}}' is banned for RTL safety. Use 'start' or 'end' instead.",
    },
  },
  create(context) {
    function reportClassViolations(entries) {
      for (const entry of entries) {
        const violations = findPhysicalClasses(entry.value);
        for (const token of violations) {
          context.report({
            node: entry.node,
            messageId: "physicalClass",
            data: { token },
          });
        }
      }
    }

    return {
      JSXAttribute(node) {
        if (node.name.type !== "JSXIdentifier") return;
        const attrName = node.name.name;

        if (attrName === "className" || attrName === "class") {
          if (!node.value) return;
          if (node.value.type === "Literal" && typeof node.value.value === "string") {
            reportClassViolations([{ node: node.value, value: node.value.value }]);
          } else if (node.value.type === "JSXExpressionContainer") {
            reportClassViolations(collectClassStrings(node.value.expression));
          }
          return;
        }

        if (
          attrName === "style" &&
          node.value?.type === "JSXExpressionContainer" &&
          node.value.expression.type === "ObjectExpression"
        ) {
          const props = node.value.expression.properties.filter((p) => p.type === "Property");
          const propMap = new Map(
            props
              .filter((p) => p.key.type === "Identifier")
              .map((p) => [p.key.name, p])
          );

          for (const prop of props) {
            if (prop.key.type !== "Identifier") continue;
            const propName = prop.key.name;

            if (propName === "left") {
              const leftIsHalf =
                prop.value.type === "Literal" && prop.value.value === "50%";
              const transformNode = propMap.get("transform");
              const transformCenters =
                transformNode?.value.type === "Literal" &&
                typeof transformNode.value.value === "string" &&
                transformNode.value.value.includes("translateX(-50%)");
              if (leftIsHalf && transformCenters) {
                continue;
              }
            }

            if (PHYSICAL_STYLE_PROPS.has(propName)) {
              context.report({
                node: prop.key,
                messageId: "physicalStyleProp",
                data: { prop: propName },
              });
            }

            if (
              propName === "textAlign" &&
              prop.value.type === "Literal" &&
              (prop.value.value === "left" || prop.value.value === "right")
            ) {
              context.report({
                node: prop.value,
                messageId: "physicalTextAlign",
                data: { value: prop.value.value },
              });
            }
          }
        }
      },
      CallExpression(node) {
        if (
          node.callee.type === "Identifier" &&
          CLASS_HELPER_NAMES.has(node.callee.name)
        ) {
          reportClassViolations(collectClassStrings(node));
        }
      },
    };
  },
};

export const sekkaRtlPlugin = {
  rules: {
    "no-physical-rtl-properties": noPhysicalRtlPropertiesRule,
  },
};
