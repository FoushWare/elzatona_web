// Minimal setup for Jest runs to avoid recursive setup complexity.
// Provides minimal Web API shims and a small `vi` shim mapped to Jest.
if (typeof global.Headers === "undefined") {
  global.Headers = class Headers {
    constructor(init = {}) {
      this._map = {};
      Object.entries(init || {}).forEach(
        ([k, v]) => (this._map[k.toLowerCase()] = String(v)),
      );
    }
    get(name) {
      return this._map[name.toLowerCase()];
    }
    set(name, value) {
      this._map[name.toLowerCase()] = String(value);
    }
    entries() {
      return Object.entries(this._map)[Symbol.iterator]();
    }
    [Symbol.iterator]() {
      return this.entries();
    }
  };
}

if (typeof global.Request === "undefined") {
  global.Request = class Request {
    constructor(input, init = {}) {
      this._url = typeof input === "string" ? input : input?.url || "";
      this.method = init.method || "GET";
      this.headers = new global.Headers(init.headers || {});
      this._body = init.body;
    }
    get url() {
      return this._url;
    }
    async json() {
      return this._body
        ? typeof this._body === "string"
          ? JSON.parse(this._body)
          : this._body
        : {};
    }
  };
}

if (typeof global.Response === "undefined") {
  global.Response = class Response {
    constructor(body, init = {}) {
      this._body = body;
      this.status = init.status || 200;
      this.headers = new global.Headers(init.headers || {});
    }
    async json() {
      if (typeof this._body === "string") {
        try {
          return JSON.parse(this._body);
        } catch {
          return {};
        }
      }
      return this._body;
    }
  };
}

if (typeof global.vi === "undefined") {
  global.vi = {
    fn: (...args) => jest.fn(...args),
    mock: (m, f) => {
      if (typeof jest !== "undefined" && jest.mock) jest.mock(m, f);
    },
    clearAllMocks: () =>
      jest.clearAllMocks ? jest.clearAllMocks() : undefined,
  };
}
