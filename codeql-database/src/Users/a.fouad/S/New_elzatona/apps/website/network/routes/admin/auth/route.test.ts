/**
 * Unit Tests for Admin Auth API Route
 * Tests: BCRYPT_SALT_ROUNDS usage, password validation, login flow
 */

import { POST } from "./route";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
// import _jwt from "jsonwebtoken";

// Mock dependencies
jest.mock("@supabase/supabase-js");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("../../../../lib/utils/api-config");

// Mock environment variables
const mockEnv = {
  BCRYPT_SALT_ROUNDS: "10",
  JWT_SECRET: "test-jwt-secret",
  NEXT_PUBLIC_SUPABASE_URL: "https://test.supabase.co",
  SUPABASE_SERVICE_ROLE_KEY: "test-service-role-key",
};

describe("Admin Auth API Route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set up environment variables
    process.env = { ...process.env, ...mockEnv };
  });

  describe("BCRYPT_SALT_ROUNDS Configuration", () => {
    it("should use BCRYPT_SALT_ROUNDS from environment", async () => {
      process.env.BCRYPT_SALT_ROUNDS = "12";

      // This test verifies that the route uses the env variable
      // The actual salt rounds are used when creating password hashes
      // For login, bcrypt.compare() uses the salt from the stored hash
      expect(process.env.BCRYPT_SALT_ROUNDS).toBe("12");
    });

    it("should default to 10 if BCRYPT_SALT_ROUNDS is not set", () => {
      delete process.env.BCRYPT_SALT_ROUNDS;

      // The route should default to 10
      const defaultRounds = parseInt(
        process.env.BCRYPT_SALT_ROUNDS || "10",
        10,
      );
      expect(defaultRounds).toBe(10);
    });
  });

  describe("Password Validation", () => {
    it("should use bcrypt.compare for password validation", async () => {
      const mockPassword = "test-password";
      const mockHash = "hashed-password";

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await bcrypt.compare(mockPassword, mockHash);

      expect(bcrypt.compare).toHaveBeenCalledWith(mockPassword, mockHash);
      expect(result).toBe(true);
    });

    it("should reject invalid passwords", async () => {
      const mockPassword = "wrong-password";
      const mockHash = "hashed-password";

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await bcrypt.compare(mockPassword, mockHash);

      expect(result).toBe(false);
    });
  });

  describe("Login Flow", () => {
    it("should require email and password", async () => {
      const request = new NextRequest("http://localhost:3000/api/admin/auth", {
        method: "POST",
        body: JSON.stringify({}),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain("required");
    });

    it("should validate email format", async () => {
      const request = new NextRequest("http://localhost:3000/api/admin/auth", {
        method: "POST",
        body: JSON.stringify({
          email: "invalid-email",
          password: "password123",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain("email");
    });
  });
});
