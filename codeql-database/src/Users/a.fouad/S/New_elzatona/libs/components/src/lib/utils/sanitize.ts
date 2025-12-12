/**
 * Sanitization Utilities for Shared Components
 * Uses DOMPurify to sanitize HTML content before rendering
 */

import DOMPurify from "dompurify";

/**
 * Sanitize plain text (removes all HTML)
 * @param text - Text to sanitize
 * @returns Plain text without HTML
 */
export function sanitizeText(text: string): string {
  if (typeof globalThis.window === "undefined") {
    // Server-side: return as-is (will be sanitized on client)
    return text;
  }

  // Use DOMPurify to remove all HTML tags and attributes
  return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
}
