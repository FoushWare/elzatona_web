// Minimal node-fetch shim that delegates to global.fetch so imports of 'node-fetch' use our jest-mock-msw interception.
function getRequestMeta(input, init = {}) {
  const url = typeof input === "string" ? input : input?.url || "";
  const pathname = new URL(url, "http://localhost").pathname;
  const method = (init && init.method) || "GET";
  return { pathname, method };
}

function parseRequestBody(init) {
  if (!init || !init.body) return {};

  try {
    return typeof init.body === "string" ? JSON.parse(init.body) : init.body;
  } catch (error_) {
    console.warn("Failed to parse login body in node-fetch mock:", error_);
    return {};
  }
}

function createLoginResponse(body) {
  const email = (body && body.email) || "test@example.com";
  return {
    status: 200,
    ok: true,
    json: async () => ({
      user: { id: "test-user", email },
      token: "fake-token",
    }),
  };
}

function createUserResponse() {
  return {
    status: 200,
    ok: true,
    json: async () => ({
      id: "test-user",
      email: "test@example.com",
      name: "Test User",
    }),
  };
}

function nodeFetch(input, init = {}) {
  try {
    const { pathname, method } = getRequestMeta(input, init);
    if (
      pathname.includes("/api/auth/login") &&
      method.toUpperCase() === "POST"
    ) {
      return Promise.resolve(createLoginResponse(parseRequestBody(init)));
    }

    if (pathname.includes("/api/user") && method.toUpperCase() === "GET") {
      return Promise.resolve(createUserResponse());
    }
  } catch (error) {
    console.warn("Failed to parse URL in node-fetch mock:", error);
  }

  return Promise.resolve({ status: 501, ok: false, json: async () => null });
}

// Expose default and named exports commonly used by node-fetch
nodeFetch.default = nodeFetch;
nodeFetch.Request =
  globalThis.Request ||
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
        if (desc) {
          this._url = urlVal;
        } else {
          Object.defineProperty(this, "url", {
            value: urlVal,
            writable: true,
            configurable: true,
            enumerable: true,
          });
        }
      } catch (error) {
        console.warn(
          "Failed to define request url property in node-fetch mock:",
          error,
        );
        this._url = urlVal;
      }
    }

    get url() {
      // Prefer internal `_url` when available, otherwise undefined behavior
      return this._url || undefined;
    }
  };
nodeFetch.Response =
  globalThis.Response ||
  class Response {
    constructor(body = null, init = {}) {
      this.body = body;
      this.status = init.status || 200;
      this.ok = this.status >= 200 && this.status < 300;
    }

    async json() {
      return this.body;
    }
  };
nodeFetch.Headers =
  globalThis.Headers ||
  class Headers {
    constructor(init = {}) {
      this.init = init;
    }

    get(name) {
      if (!name) return undefined;
      const key = String(name).toLowerCase();
      return this.init?.[key] || this.init?.[name] || undefined;
    }
  };

module.exports = nodeFetch;
module.exports.default = nodeFetch;
