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
 * Helper function to sanitize a single field value
 * Reduces cognitive complexity of sanitizeObjectServer
 */
function sanitizeFieldValue(
  value: unknown,
  key: string,
  skipSanitizationFields: Set<string>,
  preserveNewlinesFields: Set<string>,
): unknown {
  // For code field, skip sanitization entirely - we'll use CSP protection instead
  if (skipSanitizationFields.has(key)) {
    // Don't sanitize code field at all - preserve it exactly as-is
    // CSP (Content Security Policy) will protect against XSS attacks
    return value;
  }

  if (typeof value === "string") {
    // For content and other rich text fields, preserve newlines - don't use sanitizeInputServer
    if (preserveNewlinesFields.has(key)) {
      // Only remove dangerous control characters, but preserve newlines and tabs
      return value
        .replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, "") // Remove control chars except \n (0x0A), \r (0x0D), \t (0x09)
        .replace(/\x00/g, ""); // Remove null bytes
    }
    // For other string fields, use standard sanitization
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
    !Array.isArray(value)
  ) {
    // Check if it's a Date using a type guard
    const valueObj = value as Record<string, unknown>;
    const isDate =
      valueObj && typeof valueObj === "object" && valueObj.constructor === Date;
    if (isDate) {
      return value;
    }
    return sanitizeObjectServer(valueObj);
  }

  // For other types (numbers, booleans, null, etc.), copy as-is
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

  const sanitized = { ...obj };

  // Fields that should preserve newlines and special characters (code, content, etc.)
  const preserveNewlinesFields = new Set([
    "content",
    "explanation",
    "description",
    "starter_code",
    "code_template",
  ]);

  // Fields that should be completely skipped from sanitization (will use CSP protection instead)
  // These fields are preserved exactly as-is without any modification
  const skipSanitizationFields = new Set(["code"]);

  // Validate all keys before processing to prevent remote property injection
  const validKeys = Object.keys(sanitized).filter((key) => {
    // Only allow alphanumeric characters, underscores, and hyphens in keys
    // This prevents injection of dangerous property names like __proto__, constructor, etc.
    return /^[a-zA-Z0-9_-]+$/.test(key);
  });

  // Create a new object with only valid keys
  const validatedObject = {} as T;
  for (const key of validKeys) {
    const value = sanitized[key];
    (validatedObject as Record<string, unknown>)[key] = sanitizeFieldValue(
      value,
      key,
      skipSanitizationFields,
      preserveNewlinesFields,
    );
  }

  return validatedObject;
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

/**
 * Completely remove all HTML tags including incomplete ones
 * This is a comprehensive function that handles edge cases like <script, <iframe, etc.
 * @param text - Text that may contain HTML tags
 * @returns Plain text with all HTML tags removed
 */
export function removeAllHTMLTags(text: string): string {
  if (!text || typeof text !== "string") {
    return "";
  }

  let cleaned = text;
  let prevLength = -1;
  let iterations = 0;
  const maxIterations = 10;

  // Multi-pass approach to catch all variations and incomplete tags
  while (iterations < maxIterations && cleaned.length !== prevLength) {
    prevLength = cleaned.length;
    iterations++;

    // Remove complete HTML tags: <tag> or <tag attr="value">
    // Also catches incomplete tags like <script (without closing >)
    cleaned = cleaned.replace(/<[^>]*>?/g, "");

    // Remove incomplete tags at the end of string: <script, <iframe, etc.
    cleaned = cleaned.replace(/<[^>]*$/g, "");

    // Aggressively remove any <script pattern (even incomplete) - multiple passes
    // This catches: <script, <SCRIPT, <Script, <script>, <script src=, etc.
    cleaned = cleaned.replace(/<script[^>]*>?/gi, "");
    cleaned = cleaned.replace(/<script/gi, ""); // Catch incomplete <script without >
    cleaned = cleaned.replace(/script>/gi, ""); // Catch broken script> artifacts

    // Remove dangerous tag patterns (case-insensitive, even if incomplete)
    // These patterns catch tags even if they're broken or incomplete
    const dangerousPatterns = [
      /<script[^>]*/gi,
      /<iframe[^>]*/gi,
      /<object[^>]*/gi,
      /<embed[^>]*/gi,
      /<form[^>]*/gi,
      /<input[^>]*/gi,
      /<button[^>]*/gi,
      /<link[^>]*/gi,
      /<meta[^>]*/gi,
      /<style[^>]*/gi,
      /<svg[^>]*/gi,
      /<math[^>]*/gi,
    ];

    for (const pattern of dangerousPatterns) {
      cleaned = cleaned.replace(pattern, "");
    }

    // Remove any remaining < characters that might be part of incomplete tags
    // This catches cases like "text<script" where the tag is incomplete
    cleaned = cleaned.replace(/<[^<]*$/g, "");

    // Handle broken tag artifacts (like "script>", "iframe>", etc.)
    cleaned = cleaned.replace(
      /\b(script|iframe|object|embed|form|input|button|link|meta|style|svg|math)\s*>/gi,
      "",
    );

    // Remove any remaining orphaned > characters that don't have matching <
    // But be careful not to remove legitimate > characters in text
    // Only remove > if it appears to be part of a broken tag
    cleaned = cleaned.replace(/(\w+)\s*>\s*(\w+)/g, "$1 $2");
    cleaned = cleaned.replace(/(\w+)\s*>/g, "$1");
  }

  return cleaned.trim();
}

/**
 * Sanitize a value for safe logging (prevents log injection)
 * Removes control characters, newlines, and other dangerous characters
 * @param value - Value to sanitize for logging
 * @returns Sanitized value safe for logging
 */
export function sanitizeForLogging(value: unknown): string {
  if (value === null || value === undefined) {
    return String(value);
  }

  let sanitized = String(value);

  // Remove control characters (including newlines, carriage returns, etc.)
  sanitized = sanitized.replace(/[\x00-\x1F\x7F-\x9F]/g, "");

  // Limit length to prevent log flooding
  const maxLength = 200;
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength) + "... [truncated]";
  }

  return sanitized;
}
