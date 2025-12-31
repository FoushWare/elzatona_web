// Pre-setup file that runs before all other Jest setup
// This ensures mocks are applied before any module imports

// CRITICAL: Add Web API polyfills FIRST before any other imports
// Next.js requires these globals to be available during module loading
if (global.Request === undefined) {
  // Create minimal polyfills for Node.js environment
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

// Mock the contexts module at the earliest possible moment
jest.mock("@elzatona/contexts", () => {
  const React = require("react");

  return {
    AdminAuthProvider: ({ children }) => children,
    useAdminAuth: jest.fn(() => ({
      isAuthenticated: false,
      isLoading: false,
      login: jest.fn(),
      logout: jest.fn(),
      user: null,
      error: null,
    })),
    AdminAuthContext: React.createContext(undefined),
    AuthContext: React.createContext(undefined),
    useAuth: jest.fn(() => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      signOut: jest.fn(),
    })),
    LanguageContext: React.createContext(undefined),
    useLanguage: jest.fn(() => ({ language: "en", setLanguage: jest.fn() })),
    MobileMenuContext: React.createContext(undefined),
    useMobileMenu: jest.fn(() => ({ setIsMobileMenuOpen: jest.fn() })),
    NotificationContext: React.createContext(undefined),
    useNotifications: jest.fn(() => ({
      notifications: [],
      unreadCount: 0,
      isLoading: false,
      error: null,
      markAsRead: jest.fn(),
      markAllAsRead: jest.fn(),
      refreshNotifications: jest.fn(),
    })),
    NotificationProvider: ({ children }) => children,
    ThemeContext: React.createContext(undefined),
    useTheme: jest.fn(() => ({ isDarkMode: false, toggleDarkMode: jest.fn() })),
    ThemeProvider: ({ children }) => children,
    UserPreferencesContext: React.createContext(undefined),
    useUserPreferences: jest.fn(() => ({})),
    UserTypeContextSafe: React.createContext(undefined),
    useUserType: jest.fn(() => ({
      userType: "guided",
      setUserType: jest.fn(),
    })),
  };
});
