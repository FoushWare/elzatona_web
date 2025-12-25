import "@testing-library/jest-dom";
import { config } from "dotenv";
import { resolve } from "path";
import { existsSync } from "fs";

// Check if we're in CI (GitHub Actions)
const isCI =
  process.env.CI === "true" ||
  process.env.GITHUB_ACTIONS === "true" ||
  !!process.env.TEST_SUPABASE_URL;

// CRITICAL: .env.test.local is REQUIRED for unit/integration tests (local only)
// In CI, environment variables come from GitHub Secrets
const projectRoot = process.cwd();
const testEnvFile = resolve(projectRoot, ".env.test.local");

// In local development, .env.test.local is REQUIRED
if (!isCI) {
  // Check if .env.test.local exists
  if (!existsSync(testEnvFile)) {
    console.error("❌ CRITICAL: .env.test.local file is missing!");
    console.error(`   Location: ${testEnvFile}`);
    console.error("\n📝 To fix:");
    console.error("   1. Copy .env.test.local.example to .env.test.local");
    console.error("   2. Fill in your TEST Supabase project credentials");
    console.error(`   3. File location: ${testEnvFile}\n`);
    throw new Error(
      "Tests require .env.test.local file. Please create it from .env.test.local.example",
    );
  }

  // Load .env.test.local first (REQUIRED)
  const testEnvResult = config({ path: testEnvFile });
  if (testEnvResult.error) {
    console.error("❌ CRITICAL: Failed to load .env.test.local");
    console.error(`   Error: ${testEnvResult.error.message}`);
    throw new Error(
      `Failed to load .env.test.local: ${testEnvResult.error.message}`,
    );
  }
} else {
  // CI: Check that required environment variables are set (from GitHub Secrets)
  const requiredVars = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
  ];
  const missingVars = requiredVars.filter((varName) => !process.env[varName]);
  if (missingVars.length > 0) {
    console.error("❌ CRITICAL: CI environment is missing required variables:");
    console.error(`   ${missingVars.join(", ")}`);
    console.error("\n📝 To fix:");
    console.error("   1. Ensure GitHub Secrets are set in repository settings");
    console.error("   2. Required secrets: TEST_SUPABASE_URL, TEST_SUPABASE_ANON_KEY, TEST_SUPABASE_SERVICE_ROLE_KEY");
    throw new Error(
      `CI environment missing required variables: ${missingVars.join(", ")}`,
    );
  }
}

// Load other env files as fallback (lower priority) - only in local dev
if (!isCI) {
  const envFiles = [
    resolve(projectRoot, ".env.test"), // Test-specific defaults
    resolve(projectRoot, ".env.local"), // Fallback to dev (for backwards compatibility)
  ];

  // Load environment files in priority order
  for (const envFile of envFiles) {
    try {
      config({ path: envFile, override: false }); // Don't override, respect priority
    } catch (_error) {
      // File doesn't exist, that's okay
    }
  }
}

// Validate test database configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const testProjectRefs = [
  "kiycimlsatwfqxtfprlr", // Current test project
  "slfyltsmcivmqfloxpmq", // Old test project 1
  "vopfdukvdhnmzzjkxpnj", // Old test project 2
];
const productionProjectRef = "hpnewqkvpnthpohvxcmq";

const isTestProject = testProjectRefs.some((ref) => supabaseUrl.includes(ref));
const isProdProject = supabaseUrl.includes(productionProjectRef);

if (isProdProject) {
  console.error(
    "❌ CRITICAL ERROR: .env.test.local points to PRODUCTION database!",
  );
  console.error(`   Production project reference detected: ${productionProjectRef}`);
  console.error(`   URL: ${supabaseUrl.substring(0, 50)}...`);
  console.error("   Tests MUST use TEST database only.");
  throw new Error(
    "Tests cannot run against production database. Please update .env.test.local with TEST database credentials.",
  );
}

if (!isTestProject && supabaseUrl && !supabaseUrl.includes("your-")) {
  console.warn(
    "⚠️  WARNING: Supabase URL doesn't match known test project references",
  );
  console.warn(`   URL: ${supabaseUrl.substring(0, 50)}...`);
  console.warn("   Expected one of:", testProjectRefs.join(", "));
}

// Validate required variables are not placeholders (local dev only)
if (!isCI) {
  const requiredVars = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
  ];

  const missingVars = requiredVars.filter(
    (varName) =>
      !process.env[varName] ||
      process.env[varName]?.includes("your-") ||
      process.env[varName]?.includes("placeholder"),
  );

  if (missingVars.length > 0) {
    console.error(
      "❌ .env.test.local has placeholder values for:",
      missingVars.join(", "),
    );
    console.error("   Please update .env.test.local with real test database credentials.");
    throw new Error(
      `.env.test.local has placeholder values. Please update: ${missingVars.join(", ")}`,
    );
  }
}

// FORCE TEST ENVIRONMENT for all tests
// This ensures tests ALWAYS use test database, regardless of other settings
process.env.APP_ENV = "test";
process.env.NEXT_PUBLIC_APP_ENV = "test";
// Only set NODE_ENV if not in build context
// Use Object.defineProperty to bypass read-only restriction in JavaScript
if (process.env.NODE_ENV !== "production" && !process.env.NEXT_PHASE) {
  if (!process.env.NODE_ENV) {
    try {
      Object.defineProperty(process.env, "NODE_ENV", {
        value: "test",
        writable: true,
        configurable: true,
      });
    } catch {
      // If defineProperty fails, try direct assignment (works in some environments)

      process.env.NODE_ENV = "test";
    }
  }
}

// Set up environment variables before any module imports
// This ensures supabase-client.ts and other modules have access to these values
// Use test-specific values if available, otherwise fall back to safe defaults
process.env.NEXT_PUBLIC_SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://test.supabase.co";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "test-anon-key";
process.env.SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || "test-service-role-key";

// Log which environment is being used (for debugging)
if (process.env.DEBUG_TEST_ENV === "true") {
  console.log(
    "[Jest Setup] Using Supabase URL:",
    process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + "...",
  );
  console.log("[Jest Setup] Test environment files loaded");
}

// Polyfill for Web APIs needed by Next.js in Node.js test environment
// Next.js requires these globals to be available
if (global.Request === undefined) {
  // Use Node.js 18+ built-in fetch API if available
  if (fetch?.Request) {
    global.Request = fetch.Request;
    global.Response = fetch.Response;
    global.Headers = fetch.Headers;
  } else {
    // Fallback: Create minimal polyfills
    global.Headers = class Headers {
      constructor(init = {}) {
        this._headers = {};
        if (init) {
          Object.entries(init).forEach(([key, value]) => {
            this._headers[key.toLowerCase()] = value;
          });
        }
      }
      get(name) {
        return this._headers[name.toLowerCase()];
      }
      set(name, value) {
        this._headers[name.toLowerCase()] = value;
      }
      has(name) {
        return name.toLowerCase() in this._headers;
      }
      entries() {
        return Object.entries(this._headers)[Symbol.iterator]();
      }
      *[Symbol.iterator]() {
        for (const [key, value] of Object.entries(this._headers)) {
          yield [key, value];
        }
      }
    };

    global.Request = class Request {
      constructor(input, init = {}) {
        this._url = typeof input === "string" ? input : input?.url || "";
        this._method = init.method || "GET";
        this._headers = new global.Headers(init.headers);
        this._body = init.body;
      }
      get url() {
        return this._url;
      }
      get method() {
        return this._method;
      }
      get headers() {
        return this._headers;
      }
      async json() {
        return JSON.parse(this._body || "{}");
      }
    };

    global.Response = class Response {
      constructor(body, init = {}) {
        this._body = body;
        this._status = init.status || 200;
        this._statusText = init.statusText || "OK";
        this._headers = new global.Headers(init.headers);
        this._ok = this._status >= 200 && this._status < 300;
      }
      get status() {
        return this._status;
      }
      get statusText() {
        return this._statusText;
      }
      get headers() {
        return this._headers;
      }
      get ok() {
        return this._ok;
      }
      async json() {
        if (typeof this._body === "string") {
          try {
            return JSON.parse(this._body);
          } catch {
            return {};
          }
        }
        // If body is already an object, return it
        if (this._body && typeof this._body === "object") {
          return this._body;
        }
        return {};
      }
      async text() {
        if (typeof this._body === "string") {
          return this._body;
        }
        return JSON.stringify(this._body || {});
      }
      static json(body, init = {}) {
        const bodyString = JSON.stringify(body);
        const headers = new global.Headers({
          "Content-Type": "application/json",
          ...init.headers,
        });
        const response = new global.Response(bodyString, {
          ...init,
          headers,
        });
        // Ensure _body is set for NextResponse compatibility
        response._body = bodyString;
        return response;
      }
    };
  }
}
