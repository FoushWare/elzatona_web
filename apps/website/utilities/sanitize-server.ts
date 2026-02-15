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
          .replaceAll('&', '&amp;')
          .replaceAll('"', '&quot;')
          .replaceAll("'", '&#x27;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;');
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
  let sanitized = input.replaceAll(/[\x00-\x1F\x7F]/g, ""); // Remove control characters
  // Removed explicit control character replacement; regex covers all control chars
  sanitized = sanitized.replaceAll("\x1F", "");
  sanitized = sanitized.replaceAll("\x1D", "");
  sanitized = sanitized.replaceAll("\x1C", "");
  sanitized = sanitized.replaceAll("\x1B", "");
  sanitized = sanitized.replaceAll("\x1A", "");
  sanitized = sanitized.replaceAll("\x19", "");
  sanitized = sanitized.replaceAll("\x18", "");
  sanitized = sanitized.replaceAll("\x1F", "");
  sanitized = sanitized.replaceAll("\x1D", "");
  sanitized = sanitized.replaceAll("\x1C", "");
  sanitized = sanitized.replaceAll("\x1B", "");
  sanitized = sanitized.replaceAll("\x1A", "");
  sanitized = sanitized.replaceAll("\x19", "");
  sanitized = sanitized.replaceAll("\x18", "");

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

  const preserveNewlinesFields = new Set([
    "content",
    "explanation",
    "description",
    "starter_code",
    "code_template",
  ]);
  const skipSanitizationFields = new Set(["code"]);

  function removeControlCharsExceptNewlines(str: string): string {
    return str.replaceAll(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, "");
  }

  Object.entries(sanitized).forEach(([key, value]) => {
    if (typeof value === "string") {
      if (skipSanitizationFields.has(key)) {
        return;
      }
      if (preserveNewlinesFields.has(key)) {
        sanitized[key] = removeControlCharsExceptNewlines(value) as T[typeof key];
      } else {
        sanitized[key] = sanitizeInputServer(value) as T[typeof key];
      }
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item: unknown) =>
        typeof item === "string" ? sanitizeInputServer(item) : item,
      ) as T[typeof key];
    } else if (
      value &&
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      const isDate = value.constructor === Date;
      if (!isDate) {
        sanitized[key] = sanitizeObjectServer(value as Record<string, unknown>) as T[typeof key];
      }
    }
  });

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
