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
          .replace(/&/g, "&amp;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#x27;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
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
  let sanitized = input.replace(/[\x00-\x1F\x7F]/g, "");

  // Trim whitespace
  sanitized = sanitized.trim();

  // Remove HTML tags
  sanitized = sanitizeTextServer(sanitized);

  return sanitized;
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

  const sanitized = { ...obj };

  // Fields that should preserve newlines and special characters (code, content, etc.)
  const preserveNewlinesFields = [
    "content",
    "explanation",
    "description",
    "starter_code",
    "code_template",
  ];

  // Fields that should be completely skipped from sanitization (will use CSP protection instead)
  // These fields are preserved exactly as-is without any modification
  const skipSanitizationFields = ["code"];

  for (const key in sanitized) {
    if (typeof sanitized[key] === "string") {
      // For code field, skip sanitization entirely - we'll use CSP protection instead
      if (skipSanitizationFields.includes(key)) {
        // Don't sanitize code field at all - preserve it exactly as-is
        // CSP (Content Security Policy) will protect against XSS attacks
        // The field is already in sanitized object, just don't modify it
        continue; // Skip processing this field - leave it as-is
      }
      // For content and other rich text fields, preserve newlines - don't use sanitizeInputServer
      else if (preserveNewlinesFields.includes(key)) {
        // Only remove dangerous control characters, but preserve newlines and tabs
        let content = sanitized[key];
        content = content
          .replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, "") // Remove control chars except \n (0x0A), \r (0x0D), \t (0x09)
          .replace(/\x00/g, ""); // Remove null bytes
        sanitized[key] = content as T[typeof key];
      } else {
        // For other string fields, use standard sanitization
        sanitized[key] = sanitizeInputServer(sanitized[key]) as T[typeof key];
      }
    } else if (Array.isArray(sanitized[key])) {
      sanitized[key] = sanitized[key].map((item: unknown) =>
        typeof item === "string" ? sanitizeInputServer(item) : item,
      ) as T[typeof key];
    } else if (
      sanitized[key] &&
      typeof sanitized[key] === "object" &&
      sanitized[key] !== null &&
      !Array.isArray(sanitized[key])
    ) {
      // Check if it's a Date using a type guard
      const value = sanitized[key] as Record<string, unknown>;
      const isDate =
        value && typeof value === "object" && value.constructor === Date;
      if (!isDate) {
        sanitized[key] = sanitizeObjectServer(sanitized[key]) as T[typeof key];
      }
    }
  }

  return sanitized;
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
