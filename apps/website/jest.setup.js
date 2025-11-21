import '@testing-library/jest-dom';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load test-specific environment variables
// Priority: .env.test.local > .env.test > .env.local > defaults
const projectRoot = process.cwd();
const envFiles = [
  resolve(projectRoot, '.env.test.local'), // Highest priority - test overrides
  resolve(projectRoot, '.env.test'),        // Test-specific defaults
  resolve(projectRoot, '.env.local'),       // Fallback to dev (for backwards compatibility)
];

// Load environment files in priority order
for (const envFile of envFiles) {
  try {
    config({ path: envFile, override: false }); // Don't override, respect priority
  } catch (error) {
    // File doesn't exist, that's okay
  }
}

// FORCE TEST ENVIRONMENT for all tests
// This ensures tests ALWAYS use test database, regardless of other settings
process.env.APP_ENV = 'test';
process.env.NEXT_PUBLIC_APP_ENV = 'test';
process.env.NODE_ENV = 'test';

// Set up environment variables before any module imports
// This ensures supabase-client.ts and other modules have access to these values
// Use test-specific values if available, otherwise fall back to safe defaults
process.env.NEXT_PUBLIC_SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://test.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'test-anon-key';
process.env.SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'test-service-role-key';

// Log which environment is being used (for debugging)
if (process.env.DEBUG_TEST_ENV === 'true') {
  console.log('[Jest Setup] Using Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...');
  console.log('[Jest Setup] Test environment files loaded');
}

// Polyfill for Web APIs needed by Next.js in Node.js test environment
// Next.js requires these globals to be available
if (typeof global.Request === 'undefined') {
  // Use Node.js 18+ built-in fetch API if available
  if (typeof fetch !== 'undefined' && fetch.Request) {
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
        this._url = typeof input === 'string' ? input : input?.url || '';
        this._method = init.method || 'GET';
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
        return JSON.parse(this._body || '{}');
      }
    };

    global.Response = class Response {
      constructor(body, init = {}) {
        this._body = body;
        this._status = init.status || 200;
        this._statusText = init.statusText || 'OK';
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
        if (typeof this._body === 'string') {
          try {
            return JSON.parse(this._body);
          } catch {
            return {};
          }
        }
        // If body is already an object, return it
        if (this._body && typeof this._body === 'object') {
          return this._body;
        }
        return {};
      }
      async text() {
        if (typeof this._body === 'string') {
          return this._body;
        }
        return JSON.stringify(this._body || {});
      }
      static json(body, init = {}) {
        const bodyString = JSON.stringify(body);
        const headers = new global.Headers({
          'Content-Type': 'application/json',
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
