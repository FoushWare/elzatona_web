/**
 * Frontend Sanitization Utilities
 * Uses DOMPurify to sanitize HTML content before rendering
 */

import DOMPurify from 'dompurify';

/**
 * Sanitize HTML string for safe rendering
 * @param html - HTML string to sanitize
 * @param options - DOMPurify configuration options
 * @returns Sanitized HTML string
 */
export function sanitizeHTML(
  html: string,
  options?: DOMPurify.Config
): string {
  if (typeof window === 'undefined') {
    // Server-side: return as-is (will be sanitized on client)
    return html;
  }

  const defaultOptions: DOMPurify.Config = {
    ALLOWED_TAGS: [
      'p',
      'br',
      'strong',
      'em',
      'u',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'a',
      'code',
      'pre',
      'blockquote',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
    ...options,
  };

  return DOMPurify.sanitize(html, defaultOptions);
}

/**
 * Sanitize plain text (removes all HTML)
 * @param text - Text to sanitize
 * @returns Plain text without HTML
 */
export function sanitizeText(text: string): string {
  if (typeof window === 'undefined') {
    return text;
  }

  return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
}

/**
 * Sanitize user input for form fields
 * Removes potentially dangerous characters and HTML
 * @param input - User input string
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Remove null bytes and control characters
  let sanitized = input.replace(/[\x00-\x1F\x7F]/g, '');

  // Trim whitespace
  sanitized = sanitized.trim();

  // Remove HTML tags
  sanitized = sanitizeText(sanitized);

  return sanitized;
}

/**
 * Sanitize object with string values recursively
 * @param obj - Object to sanitize
 * @returns Sanitized object
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = { ...obj };

  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeInput(sanitized[key]) as T[typeof key];
    } else if (Array.isArray(sanitized[key])) {
      sanitized[key] = sanitized[key].map((item: any) =>
        typeof item === 'string' ? sanitizeInput(item) : item
      ) as T[typeof key];
    } else if (
      sanitized[key] &&
      typeof sanitized[key] === 'object' &&
      !(sanitized[key] instanceof Date)
    ) {
      sanitized[key] = sanitizeObject(sanitized[key]) as T[typeof key];
    }
  }

  return sanitized;
}

/**
 * React component for safely rendering HTML content
 */
import React from 'react';

interface SafeHTMLProps {
  html: string;
  className?: string;
  options?: DOMPurify.Config;
}

export const SafeHTML: React.FC<SafeHTMLProps> = ({
  html,
  className,
  options,
}) => {
  const sanitized = sanitizeHTML(html, options);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
};






