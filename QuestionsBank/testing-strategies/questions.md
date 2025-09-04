# Testing Strategies - Questions Bank

## Question 1: Testing Pyramid

**Question:** Explain the testing pyramid and different types of tests.

**Answer:**
**1. Testing Pyramid Structure:**

```javascript
// Unit Tests (70%) - Fast, isolated, numerous
// Integration Tests (20%) - Medium speed, test interactions
// E2E Tests (10%) - Slow, full system, few

// Unit Test Example
function calculateTotal(items) {
  return items.reduce((total, item) => total + item.price, 0);
}

describe('calculateTotal', () => {
  test('should calculate total for empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });

  test('should calculate total for single item', () => {
    const items = [{ price: 10 }];
    expect(calculateTotal(items)).toBe(10);
  });

  test('should calculate total for multiple items', () => {
    const items = [{ price: 10 }, { price: 20 }, { price: 30 }];
    expect(calculateTotal(items)).toBe(60);
  });
});
```

**2. Integration Tests:**

```javascript
// Integration test example
describe('User Service Integration', () => {
  let userService;
  let database;

  beforeEach(async () => {
    database = await setupTestDatabase();
    userService = new UserService(database);
  });

  afterEach(async () => {
    await cleanupTestDatabase(database);
  });

  test('should create and retrieve user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
    };

    const user = await userService.createUser(userData);
    expect(user.id).toBeDefined();
    expect(user.name).toBe(userData.name);

    const retrievedUser = await userService.getUser(user.id);
    expect(retrievedUser).toEqual(user);
  });

  test('should handle database errors gracefully', async () => {
    await database.close();

    await expect(userService.createUser({})).rejects.toThrow(
      'Database connection failed'
    );
  });
});
```

**3. End-to-End Tests:**

```javascript
// E2E test example with Playwright
import { test, expect } from '@playwright/test';

test.describe('User Registration Flow', () => {
  test('should register new user successfully', async ({ page }) => {
    await page.goto('/register');

    await page.fill('[data-testid="name"]', 'John Doe');
    await page.fill('[data-testid="email"]', 'john@example.com');
    await page.fill('[data-testid="password"]', 'password123');

    await page.click('[data-testid="submit"]');

    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="welcome-message"]')).toContainText(
      'Welcome, John Doe'
    );
  });

  test('should show validation errors for invalid input', async ({ page }) => {
    await page.goto('/register');

    await page.click('[data-testid="submit"]');

    await expect(page.locator('[data-testid="name-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="password-error"]')).toBeVisible();
  });
});
```

---

## Question 2: Test-Driven Development (TDD)

**Question:** Explain TDD cycle and provide examples.

**Answer:**
**1. TDD Cycle (Red-Green-Refactor):**

```javascript
// RED: Write failing test
describe('User Authentication', () => {
  test('should authenticate user with valid credentials', () => {
    const authService = new AuthService();
    const result = authService.authenticate('user@example.com', 'password123');
    expect(result.success).toBe(true);
    expect(result.token).toBeDefined();
  });
});

// GREEN: Write minimal code to pass
class AuthService {
  authenticate(email, password) {
    // Minimal implementation
    return {
      success: true,
      token: 'fake-token',
    };
  }
}

// REFACTOR: Improve code while keeping tests green
class AuthService {
  constructor(userRepository, tokenService) {
    this.userRepository = userRepository;
    this.tokenService = tokenService;
  }

  async authenticate(email, password) {
    const user = await this.userRepository.findByEmail(email);

    if (!user || !(await this.verifyPassword(password, user.passwordHash))) {
      return { success: false, error: 'Invalid credentials' };
    }

    const token = this.tokenService.generateToken(user);
    return { success: true, token };
  }

  async verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }
}
```

**2. TDD Example - Calculator:**

```javascript
// RED: Write failing test
describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('should add two numbers', () => {
    expect(calculator.add(2, 3)).toBe(5);
  });

  test('should subtract two numbers', () => {
    expect(calculator.subtract(5, 3)).toBe(2);
  });

  test('should multiply two numbers', () => {
    expect(calculator.multiply(4, 3)).toBe(12);
  });

  test('should divide two numbers', () => {
    expect(calculator.divide(10, 2)).toBe(5);
  });

  test('should throw error when dividing by zero', () => {
    expect(() => calculator.divide(10, 0)).toThrow('Division by zero');
  });
});

// GREEN: Implement minimal code
class Calculator {
  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  }
}
```

---

## Question 3: Mocking and Stubbing

**Question:** Explain mocking and stubbing techniques in testing.

**Answer:**
**1. Jest Mocking:**

```javascript
// Mock external dependencies
jest.mock('axios');
jest.mock('../services/emailService');

// Mock functions
const mockFn = jest.fn();
mockFn.mockReturnValue('mocked value');
mockFn.mockResolvedValue('async mocked value');
mockFn.mockRejectedValue(new Error('mocked error'));

// Mock modules
jest.mock('../utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
}));

// Mock class methods
const mockUserService = {
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

// Usage in tests
describe('User Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should get user by id', async () => {
    const mockUser = { id: 1, name: 'John Doe' };
    mockUserService.findById.mockResolvedValue(mockUser);

    const result = await userController.getUser(1);

    expect(mockUserService.findById).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockUser);
  });

  test('should handle user not found', async () => {
    mockUserService.findById.mockResolvedValue(null);

    await expect(userController.getUser(999)).rejects.toThrow('User not found');
  });
});
```

**2. Sinon Stubbing:**

```javascript
const sinon = require('sinon');

describe('Payment Service', () => {
  let paymentService;
  let stripeStub;

  beforeEach(() => {
    paymentService = new PaymentService();
    stripeStub = sinon.stub(paymentService.stripe, 'charges');
  });

  afterEach(() => {
    sinon.restore();
  });

  test('should process payment successfully', async () => {
    const mockCharge = {
      id: 'ch_123',
      amount: 2000,
      status: 'succeeded',
    };

    stripeStub.create.resolves(mockCharge);

    const result = await paymentService.processPayment({
      amount: 2000,
      currency: 'usd',
      source: 'tok_visa',
    });

    expect(result.success).toBe(true);
    expect(result.chargeId).toBe('ch_123');
    expect(stripeStub.create).toHaveBeenCalledWith({
      amount: 2000,
      currency: 'usd',
      source: 'tok_visa',
    });
  });

  test('should handle payment failure', async () => {
    stripeStub.create.rejects(new Error('Card declined'));

    await expect(
      paymentService.processPayment({
        amount: 2000,
        currency: 'usd',
        source: 'tok_visa',
      })
    ).rejects.toThrow('Card declined');
  });
});
```

**3. Test Doubles:**

```javascript
// Dummy - placeholder object
const dummyUser = { id: 1, name: 'Test User' };

// Stub - returns predefined responses
const stubUserService = {
  findById: id => Promise.resolve({ id, name: 'Stubbed User' }),
};

// Spy - tracks method calls
const spyLogger = {
  info: jest.fn(),
  error: jest.fn(),
};

// Mock - predefined behavior with verification
const mockEmailService = {
  send: jest.fn().mockResolvedValue(true),
  sendWelcome: jest.fn().mockResolvedValue(true),
};

// Fake - working implementation with limitations
class FakeDatabase {
  constructor() {
    this.data = new Map();
  }

  async save(key, value) {
    this.data.set(key, value);
    return value;
  }

  async find(key) {
    return this.data.get(key);
  }

  async delete(key) {
    return this.data.delete(key);
  }
}

// Usage
describe('User Registration', () => {
  test('should register user and send welcome email', async () => {
    const fakeDb = new FakeDatabase();
    const userService = new UserService(fakeDb, mockEmailService);

    const userData = { name: 'John Doe', email: 'john@example.com' };
    const user = await userService.register(userData);

    expect(user.id).toBeDefined();
    expect(mockEmailService.sendWelcome).toHaveBeenCalledWith(user.email);
  });
});
```

---

## Question 4: Test Coverage and Quality

**Question:** Explain test coverage metrics and quality practices.

**Answer:**
**1. Coverage Metrics:**

```javascript
// Jest coverage configuration
// jest.config.js
module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/**/*.spec.{js,jsx}',
    '!src/index.js',
  ],
};

// Coverage types
// Line Coverage - percentage of lines executed
// Branch Coverage - percentage of branches taken
// Function Coverage - percentage of functions called
// Statement Coverage - percentage of statements executed
```

**2. Test Quality Metrics:**

```javascript
// Test quality indicators
class TestQualityMetrics {
  constructor() {
    this.metrics = {
      testCount: 0,
      passingTests: 0,
      failingTests: 0,
      skippedTests: 0,
      executionTime: 0,
      coverage: {
        lines: 0,
        branches: 0,
        functions: 0,
        statements: 0,
      },
    };
  }

  calculateTestQuality() {
    const passRate = this.metrics.passingTests / this.metrics.testCount;
    const avgExecutionTime =
      this.metrics.executionTime / this.metrics.testCount;
    const coverageScore = this.calculateCoverageScore();

    return {
      passRate,
      avgExecutionTime,
      coverageScore,
      qualityScore: this.calculateOverallQuality(passRate, coverageScore),
    };
  }

  calculateCoverageScore() {
    const { lines, branches, functions, statements } = this.metrics.coverage;
    return (lines + branches + functions + statements) / 4;
  }

  calculateOverallQuality(passRate, coverageScore) {
    return (passRate * 0.6 + coverageScore * 0.4) * 100;
  }
}
```

**3. Test Organization:**

```javascript
// Test structure
describe('User Service', () => {
  describe('User Creation', () => {
    test('should create user with valid data', () => {
      // Test implementation
    });

    test('should validate required fields', () => {
      // Test implementation
    });

    test('should handle duplicate email', () => {
      // Test implementation
    });
  });

  describe('User Authentication', () => {
    test('should authenticate with valid credentials', () => {
      // Test implementation
    });

    test('should reject invalid credentials', () => {
      // Test implementation
    });

    test('should handle locked accounts', () => {
      // Test implementation
    });
  });
});

// Test data factories
class UserFactory {
  static create(overrides = {}) {
    return {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      ...overrides,
    };
  }

  static createMany(count, overrides = {}) {
    return Array.from({ length: count }, (_, index) =>
      this.create({ id: index + 1, ...overrides })
    );
  }
}

// Test utilities
class TestUtils {
  static async waitFor(condition, timeout = 5000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      if (await condition()) {
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw new Error('Condition not met within timeout');
  }

  static mockDate(date) {
    const mockDate = new Date(date);
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    return mockDate;
  }
}
```

---

## Question 5: Performance Testing

**Question:** Explain performance testing strategies and tools.

**Answer:**
**1. Load Testing:**

```javascript
// Using Artillery for load testing
// artillery-config.yml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 10
    - duration: 120
      arrivalRate: 20
    - duration: 60
      arrivalRate: 10

scenarios:
  - name: "User API Load Test"
    weight: 100
    flow:
      - get:
          url: "/api/users"
      - post:
          url: "/api/users"
          json:
            name: "Load Test User"
            email: "loadtest@example.com"

// Using k6 for load testing
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '5m', target: 200 },
    { duration: '2m', target: 0 },
  ],
};

export default function() {
  let response = http.get('http://localhost:3000/api/users');
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1);
}
```

**2. Stress Testing:**

```javascript
// Stress test configuration
const stressTestConfig = {
  target: 'http://localhost:3000',
  phases: [
    { duration: '2m', arrivalRate: 1 },
    { duration: '5m', arrivalRate: 5 },
    { duration: '2m', arrivalRate: 10 },
    { duration: '5m', arrivalRate: 15 },
    { duration: '2m', arrivalRate: 20 },
    { duration: '5m', arrivalRate: 25 },
    { duration: '2m', arrivalRate: 30 },
    { duration: '5m', arrivalRate: 35 },
    { duration: '2m', arrivalRate: 40 },
    { duration: '5m', arrivalRate: 45 },
    { duration: '2m', arrivalRate: 50 },
  ],
};

// Performance monitoring
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      responseTime: [],
      throughput: [],
      errorRate: [],
      memoryUsage: [],
      cpuUsage: [],
    };
  }

  recordResponseTime(time) {
    this.metrics.responseTime.push(time);
  }

  recordThroughput(requests) {
    this.metrics.throughput.push(requests);
  }

  recordErrorRate(errors, total) {
    this.metrics.errorRate.push(errors / total);
  }

  getStats() {
    return {
      avgResponseTime: this.calculateAverage(this.metrics.responseTime),
      maxResponseTime: Math.max(...this.metrics.responseTime),
      minResponseTime: Math.min(...this.metrics.responseTime),
      avgThroughput: this.calculateAverage(this.metrics.throughput),
      avgErrorRate: this.calculateAverage(this.metrics.errorRate),
    };
  }

  calculateAverage(array) {
    return array.reduce((sum, value) => sum + value, 0) / array.length;
  }
}
```

**3. Benchmark Testing:**

```javascript
// Benchmark testing with benchmark.js
const Benchmark = require('benchmark');

const suite = new Benchmark.Suite();

// Test different implementations
suite
  .add('Array.map', function () {
    const arr = [1, 2, 3, 4, 5];
    return arr.map(x => x * 2);
  })
  .add('for loop', function () {
    const arr = [1, 2, 3, 4, 5];
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      result.push(arr[i] * 2);
    }
    return result;
  })
  .add('for...of loop', function () {
    const arr = [1, 2, 3, 4, 5];
    const result = [];
    for (const item of arr) {
      result.push(item * 2);
    }
    return result;
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });

// Memory usage testing
class MemoryTest {
  static measureMemoryUsage(fn) {
    const startMemory = process.memoryUsage();
    const result = fn();
    const endMemory = process.memoryUsage();

    return {
      result,
      memoryDelta: {
        rss: endMemory.rss - startMemory.rss,
        heapUsed: endMemory.heapUsed - startMemory.heapUsed,
        heapTotal: endMemory.heapTotal - startMemory.heapTotal,
        external: endMemory.external - startMemory.external,
      },
    };
  }

  static async measureAsyncMemoryUsage(asyncFn) {
    const startMemory = process.memoryUsage();
    const result = await asyncFn();
    const endMemory = process.memoryUsage();

    return {
      result,
      memoryDelta: {
        rss: endMemory.rss - startMemory.rss,
        heapUsed: endMemory.heapUsed - startMemory.heapUsed,
        heapTotal: endMemory.heapTotal - startMemory.heapTotal,
        external: endMemory.external - startMemory.external,
      },
    };
  }
}
```

---

## Question 6: Test Automation and CI/CD

**Question:** Explain test automation in CI/CD pipelines.

**Answer:**
**1. GitHub Actions CI/CD:**

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]

    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run unit tests
        run: npm run test:unit

      - name: Run integration tests
        run: npm run test:integration
        env:
          DATABASE_URL: ${{ secrets.TEST_DATABASE_URL }}

      - name: Generate coverage report
        run: npm run test:coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info

      - name: Run E2E tests
        run: npm run test:e2e
        env:
          BASE_URL: http://localhost:3000

      - name: Build application
        run: npm run build

      - name: Deploy to staging
        if: github.ref == 'refs/heads/develop'
        run: npm run deploy:staging
        env:
          DEPLOY_TOKEN: ${{ secrets.STAGING_DEPLOY_TOKEN }}

      - name: Deploy to production
        if: github.ref == 'refs/heads/main'
        run: npm run deploy:production
        env:
          DEPLOY_TOKEN: ${{ secrets.PRODUCTION_DEPLOY_TOKEN }}
```

**2. Test Pipeline Configuration:**

```javascript
// package.json scripts
{
  "scripts": {
    "test": "jest",
    "test:unit": "jest --testPathPattern=unit",
    "test:integration": "jest --testPathPattern=integration",
    "test:e2e": "playwright test",
    "test:coverage": "jest --coverage",
    "test:watch": "jest --watch",
    "test:ci": "jest --ci --coverage --watchAll=false",
    "lint": "eslint src --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint src --ext .js,.jsx,.ts,.tsx --fix",
    "type-check": "tsc --noEmit",
    "build": "next build",
    "deploy:staging": "vercel --target staging",
    "deploy:production": "vercel --target production"
  }
}

// Jest configuration
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/*.(test|spec).+(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']
};
```

**3. Test Quality Gates:**

```javascript
// Quality gate configuration
class QualityGate {
  constructor() {
    this.thresholds = {
      coverage: {
        lines: 80,
        branches: 80,
        functions: 80,
        statements: 80,
      },
      performance: {
        maxResponseTime: 500,
        maxMemoryUsage: 100 * 1024 * 1024, // 100MB
        maxCpuUsage: 80,
      },
      security: {
        maxVulnerabilities: 0,
        maxHighSeverity: 0,
      },
    };
  }

  async checkCoverage(coverageReport) {
    const { lines, branches, functions, statements } = coverageReport;

    if (lines < this.thresholds.coverage.lines) {
      throw new Error(
        `Line coverage ${lines}% is below threshold ${this.thresholds.coverage.lines}%`
      );
    }

    if (branches < this.thresholds.coverage.branches) {
      throw new Error(
        `Branch coverage ${branches}% is below threshold ${this.thresholds.coverage.branches}%`
      );
    }

    if (functions < this.thresholds.coverage.functions) {
      throw new Error(
        `Function coverage ${functions}% is below threshold ${this.thresholds.coverage.functions}%`
      );
    }

    if (statements < this.thresholds.coverage.statements) {
      throw new Error(
        `Statement coverage ${statements}% is below threshold ${this.thresholds.coverage.statements}%`
      );
    }

    return true;
  }

  async checkPerformance(performanceReport) {
    const { responseTime, memoryUsage, cpuUsage } = performanceReport;

    if (responseTime > this.thresholds.performance.maxResponseTime) {
      throw new Error(
        `Response time ${responseTime}ms exceeds threshold ${this.thresholds.performance.maxResponseTime}ms`
      );
    }

    if (memoryUsage > this.thresholds.performance.maxMemoryUsage) {
      throw new Error(
        `Memory usage ${memoryUsage} bytes exceeds threshold ${this.thresholds.performance.maxMemoryUsage} bytes`
      );
    }

    if (cpuUsage > this.thresholds.performance.maxCpuUsage) {
      throw new Error(
        `CPU usage ${cpuUsage}% exceeds threshold ${this.thresholds.performance.maxCpuUsage}%`
      );
    }

    return true;
  }

  async checkSecurity(securityReport) {
    const { vulnerabilities, highSeverity } = securityReport;

    if (vulnerabilities > this.thresholds.security.maxVulnerabilities) {
      throw new Error(
        `Vulnerabilities ${vulnerabilities} exceed threshold ${this.thresholds.security.maxVulnerabilities}`
      );
    }

    if (highSeverity > this.thresholds.security.maxHighSeverity) {
      throw new Error(
        `High severity vulnerabilities ${highSeverity} exceed threshold ${this.thresholds.security.maxHighSeverity}`
      );
    }

    return true;
  }
}
```
