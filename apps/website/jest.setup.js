import "@testing-library/jest-dom";
import { config } from "dotenv";
import { resolve } from "path";
import { existsSync } from "fs";

// Provide a minimal `vi` shim when running under Jest so tests written for
// Vitest that reference `vi` don't immediately crash. This maps common
// `vi` helpers to their Jest equivalents when possible.
if (typeof global.vi === "undefined") {
  global.vi = {
    fn: (...args) => jest.fn(...args),
    mock: (moduleName, factory, options) => {
      try {
        // If moduleName is a relative path, resolve it relative to the caller file
        if (typeof moduleName === "string" && (moduleName.startsWith(".") || moduleName.startsWith("/"))) {
          const err = new Error();
          const stack = (err.stack || "").split("\n");
          // Find first stack entry outside this setup file
          let callerPath = null;
          for (const line of stack) {
            if (!line.includes(__filename) && !line.includes("jest.setup.js")) {
              const m = line.match(/\((.*):\d+:\d+\)$/) || line.match(/at (.*):\d+:\d+$/);
              if (m && m[1]) {
                callerPath = m[1];
                break;
              }
            }
          }
          const { resolve, dirname } = require("path");
          const base = callerPath ? dirname(callerPath) : process.cwd();
          try {
            // Prefer require.resolve with paths to accurately resolve relative imports
            const abs = require.resolve(moduleName, { paths: [base] });
            return jest.mock(abs, factory, options);
          } catch (e) {
            // Fallback to path.resolve if require.resolve fails
            const resolved = resolve(base, moduleName);
            try {
              return jest.mock(resolved, factory, options);
            } catch (err2) {
              // If this is a well-known workspace module (e.g. api-config), try canonical paths
              try {
                const { existsSync } = require("fs");
                const candidates = [
                  resolve(process.cwd(), "apps/website/src/app/lib/api-config.ts"),
                  resolve(process.cwd(), "apps/website/utilities/api-config.ts"),
                  resolve(process.cwd(), "apps/website/lib/utils/api-config.ts"),
                ];
                for (const c of candidates) {
                  if (existsSync(c)) {
                    return jest.mock(c, factory, options);
                  }
                }
              } catch (_err) {
                // ignore
              }
              // Last resort: call jest.mock with the original moduleName
            }
          }
        }
      } catch (e) {
        // Fallback to direct jest.mock if anything goes wrong
      }
      return jest.mock(moduleName, factory, options);
    },
    resetModules: () => jest.resetModules(),
    spyOn: (obj, methodName) => jest.spyOn(obj, methodName),
    clearAllMocks: () => jest.clearAllMocks(),
    restoreAllMocks: () =>
      jest.restoreAllMocks ? jest.restoreAllMocks() : undefined,
  };
}

  // Note: `next/server` mocking is handled via moduleNameMapper and
  // by providing an explicit test-utils mock where tests opt-in.
  // Avoid calling `jest.mock()` here to prevent recursive require issues.

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
    console.error(
      "   2. Required secrets: TEST_SUPABASE_URL, TEST_SUPABASE_ANON_KEY, TEST_SUPABASE_SERVICE_ROLE_KEY",
    );
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
  console.error(
    `   Production project reference detected: ${productionProjectRef}`,
  );
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
// Allow bypass when running in ephemeral CI or when explicitly requested
// via `JEST_SKIP_ENV_CHECK=true` or `SKIP_ENV_CHECK=true` (useful for
// running UI/unit tests that don't need a live Supabase project).
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

  const skipEnvCheck =
    process.env.JEST_SKIP_ENV_CHECK === "true" ||
    process.env.SKIP_ENV_CHECK === "true";

  if (missingVars.length > 0) {
    if (skipEnvCheck) {
      console.warn(
        "⚠️ Skipping .env.test.local placeholder validation because JEST_SKIP_ENV_CHECK or SKIP_ENV_CHECK is set. Missing:",
        missingVars.join(", "),
      );
      // Set safe defaults when validation is skipped
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project-url')) {
        process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://localhost:54321';
      }
      if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('your-anon-key')) {
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';
      }
      if (!process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY.includes('your-service-role-key')) {
        process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key';
      }
    } else {
      console.error(
        "❌ .env.test.local has placeholder values for:",
        missingVars.join(", "),
      );
      console.error(
        "   Please update .env.test.local with real test database credentials.",
      );
      throw new Error(
        `.env.test.local has placeholder values. Please update: ${missingVars.join(", ")}`,
      );
    }
  }
}

// FORCE TEST ENVIRONMENT defaults for tests
// Only set defaults when variables are not already provided by tests
process.env.APP_ENV = process.env.APP_ENV || "test";
process.env.NEXT_PUBLIC_APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || "test";
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
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "REDACTED_TEST_KEY";
process.env.SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || "REDACTED_TEST_KEY";

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
  try {
    let fetchAPI = undefined;
    if (typeof global !== "undefined" && global.fetch && global.fetch.Request) {
      fetchAPI = global.fetch;
    } else if (
      typeof globalThis !== "undefined" &&
      globalThis.fetch &&
      globalThis.fetch.Request
    ) {
      fetchAPI = globalThis.fetch;
    }

    if (fetchAPI && fetchAPI.Request) {

// Ensure `fetch` is available globally. Prefer existing global fetch, otherwise try node-fetch.
if (typeof global.fetch === "undefined") {
  try {
    // node-fetch v2 supports require
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const nodeFetch = require("node-fetch");
    if (nodeFetch) {
      global.fetch = nodeFetch;
    }
  } catch (_err) {
    // Last resort: a minimal fetch shim that uses the Response polyfill above.
    global.fetch = async (input, init = {}) => {
      const url = typeof input === "string" ? input : input?.url || "";
      const body = init && init.body ? init.body : null;
      return new global.Response(body || null, { status: 200 });
    };
  }
}
      global.Request = fetchAPI.Request;
      global.Response = fetchAPI.Response;
      global.Headers = fetchAPI.Headers;
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
          response._body = bodyString;
          return response;
        }
      };
    }
  } catch (_e) {
    // If detection fails, provide minimal polyfills
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
        response._body = bodyString;
        return response;
      }
    };
  }
}

// Make `window.location` configurable for tests that redefine it.
try {
  // Remove existing non-configurable property if possible
  try {
    // eslint-disable-next-line no-undef
    delete window.location;
  } catch (_) {
    // ignore
  }

  Object.defineProperty(window, "location", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: {
      href: "",
    },
  });
} catch (_) {
  // If we can't redefine, tests that attempt to redefine may still fail; continue gracefully
}
