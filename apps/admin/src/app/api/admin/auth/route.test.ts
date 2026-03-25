/**
 * Integration tests for Admin Auth API
 * @vitest-environment node
 */

import path from "node:path";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock repositories first
const { mockUserRepo } = vi.hoisted(() => ({
  mockUserRepo: {
    findAdminByEmail: vi.fn(),
  },
}));

// Mock the entire database module using the alias defined in vitest.config.ts
vi.mock("database", () => ({
  getRepositoryFactory: vi.fn(() => ({
    getUserRepository: () => mockUserRepo,
    getQuestionRepository: () => ({}),
    getLearningCardRepository: () => ({}),
    getPlanRepository: () => ({}),
  })),
  resetRepositoryFactory: vi.fn(),
}));

import {
  getRepositoryFactory,
  resetRepositoryFactory,
} from "@elzatona/database";

// Mock other dependencies
vi.mock("@elzatona/utilities/server", () => ({
  authRateLimiter: {
    check: vi.fn(() =>
      Promise.resolve({
        success: true,
        remaining: 10,
        reset: Date.now() + 60000,
      }),
    ),
  },
}));

vi.mock("bcryptjs", () => ({
  compare: vi.fn().mockResolvedValue(true),
  default: {
    compare: vi.fn().mockResolvedValue(true),
  },
}));

vi.mock("jsonwebtoken", () => ({
  sign: vi.fn(() => "mock-token"),
  verify: vi.fn(),
  default: {
    sign: vi.fn(() => "mock-token"),
    verify: vi.fn(),
  },
}));

describe("Admin Auth API", () => {
  let POST: any;
  let GET: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    process.env["JWT_SECRET"] = "test-secret";

    // Dynamically import route after mocks are established
    const route = await import("./route");
    POST = route.POST;
  });

  describe("POST /api/admin/auth (Login)", () => {
    it("should return 400 if email or password missing", async () => {
      const { NextRequest } = await import("next/server");
      const request = new NextRequest("https://example.com/api/admin/auth", {
        method: "POST",
        body: JSON.stringify({}),
      });

      const response = await POST(request);
      expect(response.status).toBe(400);
    });

    it("should return 401 if admin not found", async () => {
      const { NextRequest } = await import("next/server");
      mockUserRepo.findAdminByEmail.mockResolvedValue(null);

      const request = new NextRequest("https://example.com/api/admin/auth", {
        method: "POST",
        body: JSON.stringify({
          email: "wrong@admin.com",
          password: "test-password-123", // NOSONAR
        }),
      });

      const response = await POST(request);
      expect(response.status).toBe(401);
      const data = await response.json();
      expect(data.error).toBe("Invalid email or password");
    });

    it("should return 401 if password incorrect", async () => {
      const { NextRequest } = await import("next/server");
      mockUserRepo.findAdminByEmail.mockResolvedValue({
        id: "1",
        email: "admin@test.com",
        passwordHash: "test-hash-123", // NOSONAR
        isActive: true,
      });
      const bcrypt = await import("bcryptjs");
      vi.mocked(bcrypt.compare).mockResolvedValue(false as never);
      if (bcrypt.default?.compare) {
        vi.mocked(bcrypt.default.compare).mockResolvedValue(false as never);
      }

      const request = new NextRequest("https://example.com/api/admin/auth", {
        method: "POST",
        body: JSON.stringify({
          email: "admin@test.com",
          password: "test-wrong-123", // NOSONAR
        }),
      });

      const response = await POST(request);

      const data = await response.json();
      if (response.status !== 401) {
        console.log(data);
      }

      expect(response.status).toBe(401);
    });

    it("should return success and token on valid credentials", async () => {
      const { NextRequest } = await import("next/server");
      mockUserRepo.findAdminByEmail.mockResolvedValue({
        id: "admin-123",
        email: "admin@test.com",
        passwordHash: "test-hash-456", // NOSONAR
        isActive: true,
        role: "super_admin",
        name: "Super Admin",
      });
      const bcrypt = await import("bcryptjs");
      vi.mocked(bcrypt.compare).mockResolvedValue(true as never);
      if (bcrypt.default?.compare) {
        vi.mocked(bcrypt.default.compare).mockResolvedValue(true as never);
      }

      const request = new NextRequest("https://example.com/api/admin/auth", {
        method: "POST",
        body: JSON.stringify({
          email: "admin@test.com",
          password: "test-password-456", // NOSONAR
        }),
      });

      const response = await POST(request);
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
      expect(data.admin.id).toBe("admin-123");
    });
  });
});
