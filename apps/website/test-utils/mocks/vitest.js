// CommonJS mock for the 'vitest' package when tests accidentally import it
const globalObj = globalThis;

module.exports = {
  // Provide basic testing globals mapped to Jest equivalents if available
  describe: globalThis.describe || (() => {}),
  it: globalThis.it || globalThis.test || (() => {}),
  test: globalThis.test || globalThis.it || (() => {}),
  expect: globalThis.expect || (() => {}),
  // lifecycle helpers
  beforeEach: globalThis.beforeEach || (() => {}),
  afterEach: globalThis.afterEach || (() => {}),
  beforeAll: globalThis.beforeAll || (() => {}),
  afterAll: globalThis.afterAll || (() => {}),
  // expose jest-compatible vi methods mapped to jest where possible
  vi: {
    mock: (moduleName, factory) => {
      // delegate to jest.mock if available
      if (typeof globalObj.jest?.mock === "function") {
        globalObj.jest.mock(moduleName, factory);
      }
    },
    fn: (impl) =>
      typeof globalObj.jest?.fn === "function"
        ? globalObj.jest.fn(impl)
        : () => {},
    spyOn: (obj, method) =>
      typeof globalObj.jest?.spyOn === "function"
        ? globalObj.jest.spyOn(obj, method)
        : { mockImplementation: () => {} },
    clearAllMocks: () =>
      globalObj.jest?.clearAllMocks
        ? globalObj.jest.clearAllMocks()
        : undefined,
    resetAllMocks: () =>
      globalObj.jest?.resetAllMocks
        ? globalObj.jest.resetAllMocks()
        : undefined,
    // Map vitest.mocked to jest.mocked where available (Jest 29+)
    mocked: (v) =>
      typeof globalObj.jest?.mocked === "function"
        ? globalObj.jest.mocked(v)
        : v,
    // Utility helpers commonly used in Vitest tests
    isMockFunction: (fn) =>
      typeof globalObj.jest?.isMockFunction === "function"
        ? globalObj.jest.isMockFunction(fn)
        : false,
    mockReturnValue: (mock, v) => {
      if (mock && typeof mock.mockReturnValue === "function")
        return mock.mockReturnValue(v);
      if (mock && typeof mock.mockResolvedValue === "function")
        return mock.mockResolvedValue(v);
      return undefined;
    },
    mockResolvedValue: (mock, v) => {
      if (mock && typeof mock.mockResolvedValue === "function")
        return mock.mockResolvedValue(v);
      return undefined;
    },
  },
};
