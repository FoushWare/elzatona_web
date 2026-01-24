// Lightweight mock of next/server exports used in unit tests.
// Provides `NextRequest` and `NextResponse` compatible with tests that
// construct requests and call route handlers.

class NextHeaders {
  constructor(init = {}) {
    this._map = new Map();
    if (init) {
      Object.entries(init).forEach(([k, v]) =>
        this._map.set(k.toLowerCase(), String(v)),
      );
    }
  }
  get(name) {
    return this._map.get(name.toLowerCase());
  }
  set(name, value) {
    this._map.set(name.toLowerCase(), String(value));
  }
  entries() {
    return this._map.entries();
  }
  [Symbol.iterator]() {
    return this._map.entries();
  }
}

class NextRequest {
  constructor(input, init = {}) {
    this.url = typeof input === "string" ? input : input?.url || "";
    this.method = (init && init.method) || "GET";
    this.headers =
      init && init.headers instanceof NextHeaders
        ? init.headers
        : new NextHeaders(init.headers || {});
    this._body = init && init.body ? init.body : null;
  }
  async json() {
    if (!this._body) return {};
    try {
      return typeof this._body === "string"
        ? JSON.parse(this._body)
        : this._body;
    } catch {
      return {};
    }
  }
}

class NextResponse {
  constructor(body, init = {}) {
    this._body = body;
    this.status = init.status || 200;
    this.headers = new NextHeaders(init.headers || {});
  }
  static json(body, init = {}) {
    return new NextResponse(JSON.stringify(body), {
      ...init,
      headers: { "content-type": "application/json", ...(init.headers || {}) },
    });
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
}

module.exports = {
  NextRequest,
  NextResponse,
  Headers: NextHeaders,
};
