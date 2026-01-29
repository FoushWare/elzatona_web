// Minimal node-fetch shim that delegates to global.fetch so imports of 'node-fetch' use our jest-mock-msw interception.
function nodeFetch(input, init = {}) {
  const url = typeof input === "string" ? input : input?.url || "";
  const method = (init && init.method) || "GET";

  try {
    const pathname = new URL(url, "http://localhost").pathname;
    if (
      pathname.includes("/api/auth/login") &&
      method.toUpperCase() === "POST"
    ) {
      let body = {};
      try {
        if (init && init.body) {
          body =
            typeof init.body === "string" ? JSON.parse(init.body) : init.body;
        }
      } catch (_e) {
        body = {};
      }
      const email = (body && body.email) || "test@example.com";
      return Promise.resolve({
        status: 200,
        ok: true,
        json: async () => ({
          user: { id: "test-user", email },
          token: "fake-token",
        }),
      });
    }

    if (pathname.includes("/api/user") && method.toUpperCase() === "GET") {
      return Promise.resolve({
        status: 200,
        ok: true,
        json: async () => ({
          id: "test-user",
          email: "test@example.com",
          name: "Test User",
        }),
      });
    }
  } catch (err) {
    // ignore
  }

  return Promise.resolve({ status: 501, ok: false, json: async () => null });
}

// Expose default and named exports commonly used by node-fetch
nodeFetch.default = nodeFetch;
nodeFetch.Request =
  global.Request ||
  class Request {
    constructor(input, init = {}) {
      const urlVal = typeof input === "string" ? input : input?.url || "";
      this.method = init.method || "GET";
      this.headers = init.headers || {};
      this.body = init.body;

      // Avoid assigning to `url` if the host object (e.g. NextRequest)
      // already defines a read-only `url` getter. Try to define a safe
      // own property; if that fails, store under `_url` and expose a getter.
      try {
        const desc = Object.getOwnPropertyDescriptor(this, "url");
        if (!desc) {
          Object.defineProperty(this, "url", {
            value: urlVal,
            writable: true,
            configurable: true,
            enumerable: true,
          });
        } else {
          this._url = urlVal;
        }
      } catch (e) {
        this._url = urlVal;
      }
    }

    get url() {
      // Prefer internal `_url` when available, otherwise undefined behavior
      return this._url || undefined;
    }
  };
nodeFetch.Response = global.Response || class Response {};
nodeFetch.Headers = global.Headers || class Headers {};

module.exports = nodeFetch;
module.exports.default = nodeFetch;
