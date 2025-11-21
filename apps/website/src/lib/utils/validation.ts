/**
 * Input Validation Schemas using Zod
 * Validates and sanitizes user inputs before processing
 */

import { z } from 'zod';
import { sanitizeInputServer } from './sanitize-server';

/**
 * Common validation schemas
 */

// Email validation
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Invalid email format')
  .transform((val) => sanitizeInputServer(val.toLowerCase().trim()));

// Password validation
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be less than 128 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain at least one lowercase letter, one uppercase letter, and one number'
  );

// Name validation
export const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .max(100, 'Name must be less than 100 characters')
  .transform((val) => sanitizeInputServer(val));

// Title validation
export const titleSchema = z
  .string()
  .min(1, 'Title is required')
  .max(500, 'Title must be less than 500 characters')
  .transform((val) => sanitizeInputServer(val));

// Description/Content validation
export const contentSchema = z
  .string()
  .min(1, 'Content is required')
  .max(10000, 'Content must be less than 10000 characters')
  .transform((val) => sanitizeInputServer(val));

// URL validation
export const urlSchema = z
  .string()
  .url('Invalid URL format')
  .transform((val) => sanitizeInputServer(val));

// ID validation (UUID or string ID)
export const idSchema = z
  .string()
  .min(1, 'ID is required')
  .max(100, 'ID must be less than 100 characters')
  .transform((val) => sanitizeInputServer(val));

// Question validation schema
export const questionSchema = z.object({
  title: titleSchema,
  content: z.string().max(10000, 'Content must be less than 10000 characters').optional().transform((val) => val ? sanitizeInputServer(val) : undefined),
  type: z.enum(['multiple-choice', 'open-ended', 'true-false', 'code', 'multiple-select']).optional(),
  category: z.string().min(1, 'Category is required'),
  topic: z.string().optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced', 'difficult']).transform((val) => {
    // Map "difficult" to "advanced" to match database constraint
    if (val === 'difficult') {
      return 'advanced';
    }
    return val;
  }),
  explanation: z.string().max(5000, 'Explanation must be less than 5000 characters').optional().transform((val) => val ? sanitizeInputServer(val) : undefined),
  points: z.number().int().min(1).max(100).optional().default(10),
  is_active: z.boolean().optional().default(true),
  isActive: z.boolean().optional().default(true), // Accept both camelCase and snake_case
  timeLimit: z.number().int().min(0).max(3600).optional(), // Accept camelCase (in seconds, max 1 hour)
  time_limit: z.number().int().min(0).max(3600).optional(), // Accept snake_case (in seconds, max 1 hour)
  learningCardId: z.union([
    z.string().uuid('Invalid learning card ID format'),
    z.string().min(1), // Allow non-UUID identifiers like "core-technologies"
    z.literal(''),
    z.undefined(),
    z.null(),
  ]).optional(),
  learning_card_id: z.union([
    z.string().uuid('Invalid learning card ID format'),
    z.string().min(1), // Allow non-UUID identifiers like "core-technologies"
    z.literal(''),
    z.undefined(),
    z.null(),
  ]).optional(),
  tags: z.array(z.string()).optional(),
  hints: z.array(z.string()).optional(),
  metadata: z.record(z.unknown()).optional(),
  options: z
    .union([
      z.array(
        z.object({
          id: z.string(),
          text: z.string().min(1, 'Option text is required').transform((val) => sanitizeInputServer(val)),
          isCorrect: z.boolean(),
          explanation: z.string().optional().transform((val) => val ? sanitizeInputServer(val) : undefined),
        })
      ),
      z.string().transform(() => undefined), // If options is a string (invalid), transform to undefined
      z.undefined(),
      z.null(),
    ])
    .optional()
    .transform((val) => {
      // Ensure we return undefined if val is not a valid array
      // This prevents "Cannot read properties of undefined (reading '0')" errors
      if (!val || !Array.isArray(val) || val.length === 0) {
        return undefined;
      }
      // Validate that all array elements are valid objects
      try {
        return val.filter((item) => item && typeof item === 'object' && item.id && item.text);
      } catch (e) {
        console.warn('Error filtering options array:', e);
        return undefined;
      }
    }),
}).passthrough(); // Allow extra fields that we'll filter out later

// User registration schema
export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
  role: z.enum(['user', 'admin']).default('user'),
});

// User login schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

// Category schema
export const categorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100).transform((val) => sanitizeInputServer(val)),
  description: z.string().max(1000).optional().transform((val) => val ? sanitizeInputServer(val) : undefined),
  slug: z.string().max(100).optional().transform((val) => val ? sanitizeInputServer(val) : undefined),
});

// Topic schema
export const topicSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100).transform((val) => sanitizeInputServer(val)),
  description: z.string().max(1000).optional().transform((val) => val ? sanitizeInputServer(val) : undefined),
  slug: z.string().max(100).optional().transform((val) => val ? sanitizeInputServer(val) : undefined),
  categoryId: idSchema,
});

// Learning card schema
export const learningCardSchema = z.object({
  title: titleSchema,
  description: z.string().max(1000).optional().transform((val) => val ? sanitizeInputServer(val) : undefined),
  type: z.string().max(50).transform((val) => sanitizeInputServer(val)),
});

// Plan schema
export const planSchema = z.object({
  name: titleSchema,
  description: z.string().max(2000).optional().transform((val) => val ? sanitizeInputServer(val) : undefined),
});

/**
 * Validate and sanitize data using a schema
 * @param schema - Zod schema
 * @param data - Data to validate
 * @returns Validated and sanitized data
 */
export function validateAndSanitize<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string } {
  try {
    // Pre-validate data structure to prevent "Cannot read properties of undefined" errors
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      const dataObj = data as any;
      
      // Ensure options is either undefined, null, or a valid array
      if (dataObj.options !== undefined && dataObj.options !== null) {
        if (typeof dataObj.options === 'string') {
          // Invalid: options is a string, remove it
          delete dataObj.options;
        } else if (!Array.isArray(dataObj.options)) {
          // Invalid: options is not an array, remove it
          delete dataObj.options;
        } else if (Array.isArray(dataObj.options) && dataObj.options.length === 0) {
          // Empty array, remove it for optional field
          delete dataObj.options;
        }
      }
      
      // Ensure categories is not an array (should be a string name or undefined)
      if (dataObj.categories && Array.isArray(dataObj.categories)) {
        // If categories is an array, extract the first one's name or use empty string
        if (dataObj.categories.length > 0 && dataObj.categories[0]) {
          dataObj.category = dataObj.categories[0]?.name || dataObj.categories[0]?.title || dataObj.category || '';
        }
        delete dataObj.categories; // Remove array, use category name instead
      }
      
      // Ensure topics is not an array (should be a string name or undefined)
      if (dataObj.topics && Array.isArray(dataObj.topics)) {
        // If topics is an array, extract the first one's name or use empty string
        if (dataObj.topics.length > 0 && dataObj.topics[0]) {
          dataObj.topic = dataObj.topics[0]?.name || dataObj.topics[0]?.title || dataObj.topic || '';
        }
        delete dataObj.topics; // Remove array, use topic name instead
      }
    }
    
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Safely access error.errors array
      const errors = error.errors || [];
      if (errors.length === 0) {
        return { success: false, error: 'Validation failed: Unknown error' };
      }
      
      const firstError = errors[0];
      const errorPath = firstError?.path && firstError.path.length > 0 
        ? firstError.path.join('.') 
        : 'root';
      const errorMessage = firstError?.message || 'Validation failed';
      
      // Log all errors for debugging
      if (errors.length > 1) {
        console.warn(`⚠️ Multiple validation errors for question:`, errors.map(e => ({
          path: e.path?.join('.') || 'root',
          message: e.message,
        })));
      }
      
      return {
        success: false,
        error: `${errorMessage} (field: ${errorPath})`,
      };
    }
    // Handle non-Zod errors (like "Cannot read properties of undefined")
    if (error instanceof Error) {
      console.error('Validation error (non-Zod):', error);
      return {
        success: false,
        error: `Validation error: ${error.message}`,
      };
    }
    return { success: false, error: 'Validation failed: Unknown error' };
  }
}


