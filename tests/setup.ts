// Test setup file for comprehensive testing

// Mock environment variables
process.env.NEXT_PUBLIC_FIREBASE_API_KEY = 'test-api-key';
process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = 'test-project.firebaseapp.com';
process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'test-project';
process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = 'test-project.appspot.com';
process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = '123456789';
process.env.NEXT_PUBLIC_FIREBASE_APP_ID = '1:123456789:web:test';
process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = 'G-TEST123';
process.env.JWT_SECRET = 'test-jwt-secret';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.sessionStorage = sessionStorageMock;

// Mock window.confirm
global.confirm = jest.fn();

// Mock window.alert
global.alert = jest.fn();

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock fetch globally
global.fetch = jest.fn();

// Mock Node.js fs module for file system operations
jest.mock('fs', () => ({
  promises: {
    mkdir: jest.fn().mockResolvedValue(undefined),
    readFile: jest.fn().mockResolvedValue('[]'),
    writeFile: jest.fn().mockResolvedValue(undefined),
    access: jest.fn().mockResolvedValue(undefined),
    readdir: jest.fn().mockResolvedValue([]),
    stat: jest.fn().mockResolvedValue({ isDirectory: () => true }),
    unlink: jest.fn().mockResolvedValue(undefined),
  },
  mkdir: jest.fn().mockImplementation((path, options, callback) => {
    if (callback) callback(null);
  }),
  readFileSync: jest.fn().mockReturnValue('[]'),
  writeFileSync: jest.fn().mockImplementation(() => {}),
  existsSync: jest.fn().mockReturnValue(false),
  readdirSync: jest.fn().mockReturnValue([]),
  statSync: jest.fn().mockReturnValue({ isDirectory: () => true }),
  unlinkSync: jest.fn().mockImplementation(() => {}),
}));

// Mock File constructor
global.File = class File {
  constructor(
    public content: string[],
    public filename: string,
    public options: { type: string }
  ) {
    this.name = filename;
    this.type = options.type;
    this.size = content.join('').length;
  }
  name: string;
  type: string;
  size: number;
} as unknown as {
  name: string;
  type: string;
  size: number;
};

// Mock FormData
global.FormData = class FormData {
  private data = new Map<string, unknown>();

  append(key: string, value: unknown) {
    this.data.set(key, value);
  }

  get(key: string) {
    return this.data.get(key);
  }

  has(key: string) {
    return this.data.has(key);
  }

  delete(key: string) {
    this.data.delete(key);
  }

  forEach(callback: (value: unknown, key: string) => void) {
    this.data.forEach(callback);
  }

  entries() {
    return this.data.entries();
  }

  keys() {
    return this.data.keys();
  }

  values() {
    return this.data.values();
  }
} as unknown as FormData;

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mock-object-url');
global.URL.revokeObjectURL = jest.fn();

// Mock crypto for JWT operations
global.crypto = {
  randomUUID: jest.fn(() => 'mock-uuid'),
} as unknown as Crypto;

// Mock Date.now for consistent timestamps
const mockDate = new Date('2024-01-01T00:00:00Z');
global.Date.now = jest.fn(() => mockDate.getTime());

// Mock performance.now
global.performance = {
  now: jest.fn(() => 0),
} as unknown as Performance;

// Setup test timeout
jest.setTimeout(10000);

// Global test utilities
export const createMockRequest = (url: string, options: RequestInit = {}) => {
  return new Request(url, options);
};

export const createMockResponse = (data: unknown, status = 200) => {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
    text: async () => JSON.stringify(data),
  };
};

export const createMockFile = (
  name: string,
  type: string,
  content = 'test content'
) => {
  return new File([content], name, { type });
};

export const createMockFormData = (data: Record<string, unknown>) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
};

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
  localStorageMock.clear();
  sessionStorageMock.clear();
});
