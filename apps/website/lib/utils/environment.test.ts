/**
 * Environment Utility Tests
 *
 * Tests for the environment detection utility
 */

import {
  getEnvironment,
  isTestEnvironment,
  isProductionEnvironment,
  isDevelopmentEnvironment as _isDevelopmentEnvironment,
  getSupabaseProjectRef,
  getEnvironmentInfo as _getEnvironmentInfo,
  assertEnvironment,
  getEnvironmentConfig,
} from "./environment";

describe("Environment Utility", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset environment variables before each test
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  describe("getEnvironment", () => {
    it("should detect test environment from NEXT_PUBLIC_APP_ENV", () => {
      process.env.NEXT_PUBLIC_APP_ENV = "test";
      expect(getEnvironment()).toBe("test");
    });

    it("should detect production environment from NEXT_PUBLIC_APP_ENV", () => {
      process.env.NEXT_PUBLIC_APP_ENV = "production";
      expect(getEnvironment()).toBe("production");
    });

    it("should detect test environment from NODE_ENV", () => {
      Object.defineProperty(process.env, "NODE_ENV", {
        value: "test",
        writable: true,
        configurable: true,
      });
      delete process.env.NEXT_PUBLIC_APP_ENV;
      expect(getEnvironment()).toBe("test");
    });

    it("should detect test environment from Supabase URL", () => {
      delete process.env.NEXT_PUBLIC_APP_ENV;
      Object.defineProperty(process.env, "NODE_ENV", {
        value: undefined,
        writable: true,
        configurable: true,
      });
      process.env.NEXT_PUBLIC_SUPABASE_URL =
        "https://vopfdukvdhnmzzjkxpnj.supabase.co";
      expect(getEnvironment()).toBe("test");
    });

    it("should detect production environment from Supabase URL", () => {
      delete process.env.NEXT_PUBLIC_APP_ENV;
      Object.defineProperty(process.env, "NODE_ENV", {
        value: undefined,
        writable: true,
        configurable: true,
      });
      process.env.NEXT_PUBLIC_SUPABASE_URL =
        "https://hpnewqkvpnthpohvxcmq.supabase.co";
      expect(getEnvironment()).toBe("production");
    });

    it("should default to development if no indicators found", () => {
      delete process.env.NEXT_PUBLIC_APP_ENV;
      Object.defineProperty(process.env, "NODE_ENV", {
        value: undefined,
        writable: true,
        configurable: true,
      });
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      expect(getEnvironment()).toBe("development");
    });
  });

  describe("isTestEnvironment", () => {
    it("should return true for test environment", () => {
      process.env.NEXT_PUBLIC_APP_ENV = "test";
      expect(isTestEnvironment()).toBe(true);
    });

    it("should return false for production environment", () => {
      process.env.NEXT_PUBLIC_APP_ENV = "production";
      expect(isTestEnvironment()).toBe(false);
    });
  });

  describe("isProductionEnvironment", () => {
    it("should return true for production environment", () => {
      process.env.NEXT_PUBLIC_APP_ENV = "production";
      expect(isProductionEnvironment()).toBe(true);
    });

    it("should return false for test environment", () => {
      process.env.NEXT_PUBLIC_APP_ENV = "test";
      expect(isProductionEnvironment()).toBe(false);
    });
  });

  describe("getSupabaseProjectRef", () => {
    it("should extract test project reference", () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL =
        "https://vopfdukvdhnmzzjkxpnj.supabase.co";
      expect(getSupabaseProjectRef()).toBe("vopfdukvdhnmzzjkxpnj");
    });

    it("should extract production project reference", () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL =
        "https://hpnewqkvpnthpohvxcmq.supabase.co";
      expect(getSupabaseProjectRef()).toBe("hpnewqkvpnthpohvxcmq");
    });

    it("should return null if URL is not set", () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      expect(getSupabaseProjectRef()).toBeNull();
    });
  });

  describe("assertEnvironment", () => {
    it("should not throw if environment matches", () => {
      process.env.NEXT_PUBLIC_APP_ENV = "test";
      expect(() => assertEnvironment("test")).not.toThrow();
    });

    it("should throw if environment does not match", () => {
      process.env.NEXT_PUBLIC_APP_ENV = "test";
      expect(() => assertEnvironment("production")).toThrow();
    });

    it("should use custom error message", () => {
      process.env.NEXT_PUBLIC_APP_ENV = "test";
      expect(() => {
        assertEnvironment("production", "Custom error message");
      }).toThrow("Custom error message");
    });
  });

  describe("getEnvironmentConfig", () => {
    it("should return test configuration", () => {
      process.env.NEXT_PUBLIC_APP_ENV = "test";
      process.env.NEXT_PUBLIC_SUPABASE_URL =
        "https://vopfdukvdhnmzzjkxpnj.supabase.co";
      process.env.ADMIN_EMAIL = "test@example.com";

      const config = getEnvironmentConfig();
      expect(config.isTest).toBe(true);
      expect(config.environment).toBe("test");
      expect(config.adminEmail).toBe("test@example.com");
    });

    it("should return production configuration", () => {
      process.env.NEXT_PUBLIC_APP_ENV = "production";
      process.env.NEXT_PUBLIC_SUPABASE_URL =
        "https://hpnewqkvpnthpohvxcmq.supabase.co";
      process.env.INITIAL_ADMIN_EMAIL = "admin@example.com";

      const config = getEnvironmentConfig();
      expect(config.isProduction).toBe(true);
      expect(config.environment).toBe("production");
      expect(config.adminEmail).toBe("admin@example.com");
    });
  });
});
