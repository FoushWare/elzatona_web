/**
 * Backend Sanitization Utilities
 * Uses xss library to sanitize user inputs in API routes
 */

import { FilterXSS, IFilterXSSOptions } from "xss";

/**
 * XSS filter options - strict configuration
 */
const xssOptions: IFilterXSSOptions = {
  whiteList: {
    // Allow only safe HTML tags
    p: [],
    br: [],
    strong: [],
    em: [],
    u: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    ul: [],
    ol: [],
    li: [],
    a: ["href", "target", "rel"],
    code: [],
    pre: [],
    blockquote: [],
  },
  stripIgnoreTag: true, // Remove tags not in whitelist
  stripIgnoreTagBody: ["script"], // Remove script tag content
  onTagAttr: (tag: string, name: string, value: string) => {
    // Only allow safe attributes
    if (name === "href" && tag === "a") {
      // Validate URLs
      if (value.startsWith("http://") || value.startsWith("https://")) {
        // Escape attribute value manually
        const escaped = value
          .replaceAll("&", "&amp;")
          .replaceAll("\\", "&#x5C;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&#x27;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;");
        return `${name}="${escaped}"`;
      }
      return "";
    }
    if (name === "target" && value === "_blank") {
      return `${name}="${value}"`;
    }
    if (name === "rel" && value === "noopener noreferrer") {
      return `${name}="${value}"`;
    }
    return "";
  },
};

/**
 * Sanitize HTML string on the server
 * @param html - HTML string to sanitize
 * @returns Sanitized HTML string
 */
export function sanitizeHTMLServer(html: string): string {
  if (!html || typeof html !== "string") {
    return "";
  }

  const filter = new FilterXSS(xssOptions);
  return filter.process(html);
}

/**
 * Sanitize plain text (removes all HTML)
 * @param text - Text to sanitize
 * @returns Plain text without HTML
 */
export function sanitizeTextServer(text: string): string {
  if (!text || typeof text !== "string") {
    return "";
  }

  const filter = new FilterXSS({
    whiteList: {},
    stripIgnoreTag: true,
  });

  return filter.process(text);
}

/**
 * Sanitize user input for form fields
 * Removes potentially dangerous characters and HTML
 * @param input - User input string
 * @returns Sanitized string
 */
export function sanitizeInputServer(input: string): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  // Remove null bytes and control characters
  let sanitized = "";
  for (const character of input) {
    const codePoint = character.codePointAt(0) ?? 0;
    if ((codePoint >= 32 && codePoint !== 127) || character === "\n") {
      sanitized += character;
    }
  }

  // Trim whitespace
  sanitized = sanitized.trim();

  // Remove HTML tags
  sanitized = sanitizeTextServer(sanitized);

  return sanitized;
}

function removeControlCharsExceptNewlines(str: string): string {
  let sanitized = "";
  for (const character of str) {
    const codePoint = character.codePointAt(0) ?? 0;
    const isAllowedPrintable = codePoint >= 32 && codePoint !== 127;
    const isAllowedWhitespace =
      character === "\n" || character === "\r" || character === "\t";

    if (isAllowedPrintable || isAllowedWhitespace) {
      sanitized += character;
    }
  }
  return sanitized;
}

function sanitizeObjectField(
  key: string,
  value: unknown,
  preserveNewlinesFields: Set<string>,
  skipSanitizationFields: Set<string>,
): unknown {
  if (typeof value === "string") {
    if (skipSanitizationFields.has(key)) {
      return value;
    }
    if (preserveNewlinesFields.has(key)) {
      return removeControlCharsExceptNewlines(value);
    }
    return sanitizeInputServer(value);
  }

  if (Array.isArray(value)) {
    return value.map((item: unknown) =>
      typeof item === "string" ? sanitizeInputServer(item) : item,
    );
  }

  if (
    value &&
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    value.constructor !== Date
  ) {
    return sanitizeObjectServer(value as Record<string, unknown>);
  }

  return value;
}

/**
 * Sanitize object with string values recursively
 * @param obj - Object to sanitize
 * @returns Sanitized object
 */
export function sanitizeObjectServer<T extends Record<string, unknown>>(
  obj: T,
): T {
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  const sanitized: Record<string, unknown> = { ...obj };

  const preserveNewlinesFields = new Set([
    "content",
    "explanation",
    "description",
    "starter_code",
    "code_template",
  ]);
  const skipSanitizationFields = new Set(["code"]);

  for (const [key, value] of Object.entries(sanitized)) {
    sanitized[key] = sanitizeObjectField(
      key,
      value,
      preserveNewlinesFields,
      skipSanitizationFields,
    );
  }

  return sanitized as T;
}

/**
 * Sanitize specific fields that may contain HTML (like explanations, descriptions)
 * @param html - HTML content to sanitize
 * @returns Sanitized HTML
 */
export function sanitizeRichContent(html: string): string {
  if (!html || typeof html !== "string") {
    return "";
  }

  return sanitizeHTMLServer(html);
}
