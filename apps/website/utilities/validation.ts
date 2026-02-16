/**
 * Input Validation Schemas using Zod
 * Validates and sanitizes user inputs before processing
 */

import { z } from "zod";
import { sanitizeInputServer } from "./sanitize-server";

/**
 * Common validation schemas
 */

// Email validation
export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .refine((val) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val), {
    message: "Invalid email format",
  })
  .transform((val) => sanitizeInputServer(val.toLowerCase().trim()));

// Password validation
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be less than 128 characters")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    "Password must contain at least one lowercase letter, one uppercase letter, and one number",
  );

// Name validation
export const nameSchema = z
  .string()
  .min(1, "Name is required")
  .max(100, "Name must be less than 100 characters")
  .transform((val) => sanitizeInputServer(val));

// Title validation
export const titleSchema = z
  .string()
  .min(1, "Title is required")
  .max(500, "Title must be less than 500 characters")
  .transform((val) => sanitizeInputServer(val));

// Description/Content validation
export const contentSchema = z
  .string()
  .min(1, "Content is required")
  .max(10000, "Content must be less than 10000 characters")
  .transform((val) => sanitizeInputServer(val));

// URL validation
export const urlSchema = z
  .string()
  .refine((val) => {
    try {
      new URL(val);
      return true;
    } catch {
      return false;
    }
  }, { message: "Invalid URL format" })
  .transform((val) => sanitizeInputServer(val));

// ID validation (UUID or string ID)
export const idSchema = z
  .string()
  .min(1, "ID is required")
  .max(100, "ID must be less than 100 characters")
  .transform((val) => sanitizeInputServer(val));

// Question validation schema
// Based on actual database schema: category_id and topic_id are nullable (optional)
export const questionSchema = z
  .object({
    title: titleSchema, // Required in DB (NOT NULL)
    content: contentSchema, // Required in DB (NOT NULL) - using contentSchema which requires min 1 char
    code: z
      .union([
        z.string().max(50000, "Code must be less than 50000 characters"),
        z.null(),
        z.undefined(),
        z.literal(""),
      ])
      .optional()
      .nullable()
      .transform((val) => {
        // CRITICAL: Always preserve the code field value, even if it's empty/null
        // Don't sanitize code field here - it will be handled separately in the API route
        // to preserve newlines and formatting
        // Return the value as-is (including null/empty string) - don't convert to undefined
        return val === undefined ? null : val;
      }), // Optional code field for formatted display
    type: z
      .union([
        z.enum(["multiple-choice", "true-false", "code", "mcq"]),
        z.undefined(),
      ])
      .optional()
      .default("multiple-choice"), // Required in DB, default to 'multiple-choice'
    category: z.string().min(1).optional(), // Optional - used for lookup if category_id not provided
    category_id: z
      .union([
        z.string().refine((val) => {
          return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);
        }, { message: "Invalid category ID format" }),
        z.literal(""),
        z.undefined(),
        z.null(),
      ])
      .optional(), // Optional in DB (nullable)
    topic: z.string().optional(), // Optional - used for lookup if topic_id not provided
    topic_id: z
      .union([
        z.string().refine((val) => {
          return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);
        }, { message: "Invalid topic ID format" }),
        z.literal(""),
        z.undefined(),
        z.null(),
      ])
      .optional(), // Optional in DB (nullable)
    difficulty: z
      .enum(["beginner", "intermediate", "advanced"])
      .optional()
      .transform((val) => {
        // DB constraint: 'beginner', 'intermediate', 'advanced' (nullable)
        // Map "difficult" to "advanced" if somehow it gets through
        if (val && (val as string) === "difficult") {
          return "advanced";
        }
        return val;
      }),
    explanation: z
      .string()
      .max(5000, "Explanation must be less than 5000 characters")
      .optional()
      .nullable()
      .transform((val) => {
        if (!val || val === null || val === "") return undefined;
        return sanitizeInputServer(val);
      }),
    points: z.number().int().min(1).max(100).optional().default(1), // DB default is 1
    is_active: z.boolean().optional().default(true),
    isActive: z.boolean().optional().default(true), // Accept both camelCase and snake_case
    timeLimit: z.number().int().min(0).max(3600).optional(), // Accept camelCase (in seconds, max 1 hour)
    time_limit: z.number().int().min(0).max(3600).optional(), // Accept snake_case (in seconds, max 1 hour)
    learningCardId: z
      .union([
        z.string().refine((val) => {
          // UUID v4 regex
          return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val) || val.length > 0;
        }, { message: "Invalid learning card ID format" }),
        z.literal(""),
        z.undefined(),
        z.null(),
      ])
      .optional(),
    learning_card_id: z
      .union([
        z.string().refine((val) => {
          return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val) || val.length > 0;
        }, { message: "Invalid learning card ID format" }),
        z.literal(""),
        z.undefined(),
        z.null(),
      ])
      .optional(),
    tags: z.array(z.string()).optional(),
    hints: z.array(z.string()).optional(),
    metadata: z.any().optional().nullable(), // Accept any object structure for metadata
    options: z
      .union([
        z.array(
          z.object({
            id: z.string(),
            text: z
              .string()
              .min(1, "Option text is required")
              .transform((val) => sanitizeInputServer(val)),
            isCorrect: z.boolean(),
            explanation: z
              .string()
              .optional()
              .transform((val) => (val ? sanitizeInputServer(val) : undefined)),
          }),
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
          return val.filter(
            (item) => item && typeof item === "object" && item.id && item.text,
          );
        } catch (e) {
          console.warn("Error filtering options array:", e);
          return undefined;
        }
      }),
  })
  .catchall(z.any()); // Allow extra fields that we'll filter out later
// Note: category_id and topic_id are optional in the database schema (nullable)
// No refinement needed - both can be null/undefined

// User registration schema
export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
  role: z.enum(["user", "admin"]).default("user"),
});

// User login schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

// Category schema
export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100)
    .transform((val) => sanitizeInputServer(val)),
  description: z
    .string()
    .max(1000)
    .optional()
    .transform((val) => (val ? sanitizeInputServer(val) : undefined)),
  slug: z
    .string()
    .max(100)
    .optional()
    .transform((val) => (val ? sanitizeInputServer(val) : undefined)),
});

// Topic schema
export const topicSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100)
    .transform((val) => sanitizeInputServer(val)),
  description: z
    .string()
    .max(1000)
    .optional()
    .transform((val) => (val ? sanitizeInputServer(val) : undefined)),
  slug: z
    .string()
    .max(100)
    .optional()
    .transform((val) => (val ? sanitizeInputServer(val) : undefined)),
  categoryId: idSchema,
});

// Learning card schema
export const learningCardSchema = z.object({
  title: titleSchema,
  description: z
    .string()
    .max(1000)
    .optional()
    .transform((val) => (val ? sanitizeInputServer(val) : undefined)),
  type: z
    .string()
    .max(50)
    .transform((val) => sanitizeInputServer(val)),
});

// Plan schema
export const planSchema = z.object({
  name: titleSchema,
  description: z
    .string()
    .max(2000)
    .optional()
    .transform((val) => (val ? sanitizeInputServer(val) : undefined)),
});

/**
 * Clean up data object by normalizing arrays and removing invalid fields
 */
function cleanupDataObject(dataObj: Record<string, unknown>): void {
  cleanupOptions(dataObj);
  cleanupCategories(dataObj);
  cleanupTopics(dataObj);
  cleanupMetadata(dataObj);
}

/**
 * Clean up options field
 */
function cleanupOptions(dataObj: Record<string, unknown>): void {
  if (dataObj.options !== undefined && dataObj.options !== null) {
    if (typeof dataObj.options === "string" || !Array.isArray(dataObj.options) || (Array.isArray(dataObj.options) && dataObj.options.length === 0)) {
      delete dataObj.options;
    }
  }
}

/**
 * Clean up categories field
 */
function cleanupCategories(dataObj: Record<string, unknown>): void {
  if (dataObj.categories && Array.isArray(dataObj.categories)) {
    if (dataObj.categories.length > 0 && dataObj.categories[0]) {
      dataObj.category = dataObj.categories[0]?.name || dataObj.categories[0]?.title || dataObj.category || "";
    }
    delete dataObj.categories;
  }
}

/**
 * Clean up topics field
 */
function cleanupTopics(dataObj: Record<string, unknown>): void {
  if (dataObj.topics && Array.isArray(dataObj.topics)) {
    if (dataObj.topics.length > 0 && dataObj.topics[0]) {
      dataObj.topic = dataObj.topics[0]?.name || dataObj.topics[0]?.title || dataObj.topic || "";
    }
    delete dataObj.topics;
  }
}

/**
 * Clean up metadata field
 */
function cleanupMetadata(dataObj: Record<string, unknown>): void {
  if (dataObj.metadata !== undefined && dataObj.metadata !== null) {
    if (typeof dataObj.metadata !== "object" || Array.isArray(dataObj.metadata)) {
      delete dataObj.metadata;
    }
  }
}

/**
 * Extract error message and path from ZodError
 */
function extractZodErrorDetails(error: z.ZodError): { message: string; path: string } {
  const issues = error.issues || [];
  if (issues.length === 0) {
    return { message: "Validation failed", path: "root" };
  }

  const primaryIssue = issues[0];
  const errorPath = primaryIssue?.path && primaryIssue.path.length > 0 ? primaryIssue.path.join(".") : "root";
  const errorMessage = primaryIssue?.message || "Validation failed";

  if (issues.length > 1) {
    console.warn("Multiple validation errors:", issues.map((e) => ({
      path: e.path?.join(".") || "root",
      message: e.message,
      code: e.code
    })));
  }

  return { message: errorMessage, path: errorPath };
}

/**
 * Validate and sanitize data using a schema
 * @param schema - Zod schema
 * @param data - Data to validate
 * @returns Validated and sanitized data
 */
export function validateAndSanitize<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): { success: true; data: T } | { success: false; error: string } {
  try {
    if (!schema || typeof schema !== "object" || !("_def" in schema)) {
      return { success: false, error: "Validation error: Invalid schema" };
    }

    if (data && typeof data === "object" && !Array.isArray(data)) {
      cleanupDataObject(data as Record<string, unknown>);
    }

    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const { message, path } = extractZodErrorDetails(error);
      return { success: false, error: `${message} (field: ${path})` };
    }

    if (error instanceof Error) {
      return { success: false, error: `Validation error: ${error.message}` };
    }

    return { success: false, error: `Validation failed: ${typeof error === "string" ? error : "Unknown error"}` };
  }
}
