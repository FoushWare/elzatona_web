/**
 * Centralized API Configuration Utility
 *
 * Single source of truth for all API environment-specific configuration.
 * Change APP_ENV in one place, and all APIs automatically use the correct settings.
 *
 * Usage:
 * ```ts
 * import { getApiConfig } from '@/lib/utils/api-config';
 *
 * const config = getApiConfig();
 * // Use config.supabaseUrl, config.headers, etc.
 * ```
 *
 * To switch environments, just set:
 *   APP_ENV=test        → Uses test database and settings
 *   APP_ENV=production  → Uses production database and settings
 */

import {
  getEnvironment,
  isTestEnvironment,
  isProductionEnvironment,
  isDevelopmentEnvironment,
} from "./environment";

export interface ApiConfig {
  // Environment info
  environment: "test" | "production" | "development";
  isTest: boolean;
  isProduction: boolean;
  isDevelopment: boolean;

  // Supabase configuration
  supabaseUrl: string;
  supabaseAnonKey: string;
  supabaseServiceRoleKey: string;

  // API headers
  headers: Record<string, string>;

  // Admin credentials
  adminEmail: string;
  adminPassword: string;

  // Feature flags
  enableDebugLogging: boolean;
  enableTestData: boolean;
  enableCaching: boolean;

  // API endpoints (if needed)
  apiBaseUrl: string;

  // Timeouts and limits
  requestTimeout: number;
  maxRetries: number;
}

/**
 * Get centralized API configuration based on current environment
 *
 * This is the ONLY place you need to import for environment-specific config.
 * All APIs should use this function.
 *
 * @returns Complete API configuration for current environment
 */
export function getApiConfig(): ApiConfig {
  const env = getEnvironment();
  const isTest = isTestEnvironment();
  const isProd = isProductionEnvironment();
  const isDev = isDevelopmentEnvironment();

  // CRITICAL: For test environment, ensure we're using test project
  // If APP_ENV=test but we're seeing production URL, log a warning
  if (isTest) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const _isTestProject =
      supabaseUrl.includes("kiycimlsatwfqxtfprlr") ||
      supabaseUrl.includes("slfyltsmcivmqfloxpmq") ||
      supabaseUrl.includes("vopfdukvdhnmzzjkxpnj");
    const isProdProject = supabaseUrl.includes("hpnewqkvpnthpohvxcmq");

    if (isProdProject) {
      console.error(
        "[API Config] ⚠️  WARNING: APP_ENV=test but using PRODUCTION project!",
      );
      console.error(
        "[API Config] Expected: kiycimlsatwfqxtfprlr (zatona-web-testing)",
      );
      console.error("[API Config] Actual:", supabaseUrl);
      console.error(
        "[API Config] Please restart the dev server after updating .env.test.local",
      );
    }
  }

  // Get Supabase configuration from environment
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  // Extract project reference from URL
  const projectRef =
    supabaseUrl.match(/https?:\/\/([^.]+)\.supabase\.co/)?.[1] || "unknown";

  // Get admin credentials
  // Test/Development: Use ADMIN_EMAIL (or fallback to INITIAL_ADMIN_EMAIL)
  // Production: Use INITIAL_ADMIN_EMAIL
  const adminEmail =
    isTest || isDev
      ? process.env.ADMIN_EMAIL || process.env.INITIAL_ADMIN_EMAIL || ""
      : process.env.INITIAL_ADMIN_EMAIL || "";

  const adminPassword =
    isTest || isDev
      ? process.env.ADMIN_PASSWORD || process.env.INITIAL_ADMIN_PASSWORD || ""
      : process.env.INITIAL_ADMIN_PASSWORD || "";

  // Environment-specific headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Environment": env,
    "X-Project-Ref": projectRef,
  };

  // Add additional headers based on environment
  if (isTest) {
    headers["X-Test-Mode"] = "true";
  }
  if (isDev) {
    headers["X-Dev-Mode"] = "true";
  }

  // Feature flags
  const enableDebugLogging = !isProd; // Enable for test and development
  const enableTestData = isTest || isDev; // Development can use test data
  const enableCaching = isProd; // Only cache in production

  // API configuration
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000");

  // Timeouts and retries (more lenient in test and development)
  const requestTimeout = isTest || isDev ? 30000 : 10000; // 30s for test/dev, 10s for prod
  const maxRetries = isTest || isDev ? 3 : 2;

  return {
    environment: env,
    isTest,
    isProduction: isProd,
    isDevelopment: isDev,
    supabaseUrl,
    supabaseAnonKey,
    supabaseServiceRoleKey,
    headers,
    adminEmail,
    adminPassword,
    enableDebugLogging,
    enableTestData,
    enableCaching,
    apiBaseUrl,
    requestTimeout,
    maxRetries,
  };
}

/**
 * Get Supabase client configuration
 * Use this in your API routes to get the correct Supabase client
 *
 * @returns Supabase client configuration
 */
export function getSupabaseConfig() {
  const config = getApiConfig();

  if (!config.supabaseUrl || !config.supabaseServiceRoleKey) {
    throw new Error(
      `Supabase configuration missing for ${config.environment} environment. ` +
        `Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment variables.`,
    );
  }

  return {
    url: config.supabaseUrl,
    serviceRoleKey: config.supabaseServiceRoleKey,
    anonKey: config.supabaseAnonKey,
    headers: config.headers,
  };
}

/**
 * Get fetch configuration with environment-specific headers
 * Use this for all API calls to ensure correct headers
 *
 * @param additionalHeaders Optional additional headers to merge
 * @returns Fetch configuration object
 */
export function getFetchConfig(additionalHeaders?: Record<string, string>) {
  const config = getApiConfig();

  return {
    headers: {
      ...config.headers,
      ...additionalHeaders,
    },
    timeout: config.requestTimeout,
  };
}

/**
 * Log API configuration (for debugging)
 *
 * @param context Optional context (e.g., API route name)
 */
export function logApiConfig(context?: string): void {
  const config = getApiConfig();
  const prefix = context ? `[${context}]` : "[API Config]";

  console.log(`${prefix} Environment: ${config.environment.toUpperCase()}`);
  console.log(`${prefix} Project: ${config.headers["X-Project-Ref"]}`);
  console.log(`${prefix} Supabase: ${config.supabaseUrl.substring(0, 40)}...`);
  console.log(
    `${prefix} Debug Logging: ${config.enableDebugLogging ? "ON" : "OFF"}`,
  );
  console.log(
    `${prefix} Test Data: ${config.enableTestData ? "ENABLED" : "DISABLED"}`,
  );
}
