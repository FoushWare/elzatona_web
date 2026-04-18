import {
  sanitizeObjectServer,
  removeAllHTMLTags,
  sanitizeForLogging,
} from "./sanitize-server";

describe("sanitize-server safe stringification and logging", () => {
  it("safely sanitizes objects for logging", () => {
    const obj = { key: "value", nested: { a: 1 } };
    const result = sanitizeForLogging(obj);
    expect(result).toContain('{"key":"value","nested":{"a":1}}');
  });

  it("handles null and undefined in logging securely", () => {
    expect(sanitizeForLogging(null)).toBe("null");
    expect(sanitizeForLogging(undefined)).toBe("undefined");
  });

  it("removes control characters and newlines for logging", () => {
    const dangerousLog = "line1\nline2\r\tadmin%s";
    const result = sanitizeForLogging(dangerousLog);
    expect(result).not.toContain("\n");
    expect(result).not.toContain("\r");
    // Should have a single space for contiguous whitespace characters
    expect(result).toContain("line1 line2 admin[format-removed]");
  });

  it("truncates long logs", () => {
    const longString = "a".repeat(300);
    const result = sanitizeForLogging(longString);
    expect(result.length).toBeLessThan(300);
    expect(result).toContain("[truncated]");
  });
});

describe("sanitize-server object and HTML sanitization", () => {
  it("sanitizes objects recursively", () => {
    const obj = {
      name: "John <script>alert(1)</script>",
      meta: {
        bio: "<b>Hi</b>",
      },
    };
    const result = sanitizeObjectServer(obj);
    // Should remove the tag, body stripping depends on config
    expect(result.name).toContain("John");
    expect(result.name).not.toContain("<script>");
    expect((result.meta as Record<string, unknown>).bio).toBe("Hi");
  });

  it("preserves newlines for specific fields", () => {
    const obj = {
      content: "line1\nline2",
      description: "desc\ntext",
    };
    const result = sanitizeObjectServer(obj);
    expect(result.content).toBe("line1\nline2");
    expect(result.description).toBe("desc\ntext");
  });

  it("removes all HTML tags comprehensively", () => {
    const dirty = "<div>Test</div><script>alert(1)</script><p>Para</p>";
    expect(removeAllHTMLTags(dirty)).toBe("TestPara");
  });

  it("handles incomplete tags gracefully", () => {
    expect(removeAllHTMLTags("Test <script")).toBe("Test");
  });
});
