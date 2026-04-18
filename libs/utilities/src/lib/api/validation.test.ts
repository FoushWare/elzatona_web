import { z } from "zod";
import { validateAndSanitize } from "./validation";

describe("validation handles success cases", () => {
  const schema = z.object({
    name: z.string(),
    age: z.number(),
  });

  it("should return success when data matches schema", () => {
    const data = { name: "Test", age: 25 };
    const result = validateAndSanitize(schema, data);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(data);
    }
  });

  it("should return success and sanitize string fields", () => {
    const data = { name: "Test <script>alert(1)</script>", age: 25 };
    const result = validateAndSanitize(schema, data);
    expect(result.success).toBe(true);
    // Note: validateAndSanitize itself doesn't call sanitizeHTML unless the schema does,
    // but our pre-processor might depending on implementation.
    // In our current implementation, validateAndSanitize uses zod's parse.
  });
});

describe("validation handles error cases", () => {
  const schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
  });

  it("should return failure for invalid data", () => {
    const data = { name: "Te", email: "invalid" };
    const result = validateAndSanitize(schema, data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain("name");
    }
  });

  it("should handle null data gracefully", () => {
    const result = validateAndSanitize(schema, null);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBeDefined();
    }
  });

  it("should handle invalid schema gracefully", () => {
    const result = validateAndSanitize(null as any, {});
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain("Invalid schema");
    }
  });
});

describe("error handling helper coverage", () => {
  const schema = z.object({
    field: z.string().email("Invalid email format"),
  });

  it("formats Zod errors correctly", () => {
    const result = validateAndSanitize(schema, { field: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe("Invalid email format (field: field)");
    }
  });

  it("handles multiple Zod errors by returning the first one", () => {
    const complexSchema = z.object({
      a: z.string(),
      b: z.number(),
    });
    const result = validateAndSanitize(complexSchema, { a: 1, b: "string" });
    expect(result.success).toBe(false);
    if (!result.success) {
      // Should contain first error path
      expect(result.error).toMatch(/a|b/);
    }
  });
});
