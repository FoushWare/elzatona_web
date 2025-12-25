/**
 * Helper to create Jest mocks that work in both test and runtime environments
 * In test environments, uses jest.fn()
 * In runtime, provides no-op implementations
 */

export function createMockFn<T extends (...args: any[]) => any>(
  implementation?: T | any,
): T {
  if (typeof jest !== "undefined" && jest.fn) {
    if (implementation) {
      return jest.fn(implementation) as unknown as T;
    }
    return jest.fn() as unknown as T;
  }
  // Runtime fallback - return a no-op function
  if (implementation && typeof implementation === "function") {
    return implementation as T;
  }
  return (() => {}) as T;
}

export function createMockObject<T extends object>(defaultValue: T): T {
  if (typeof jest !== "undefined" && jest.fn) {
    // In test environment, return the object as-is (tests will mock it)
    return defaultValue;
  }
  // In runtime, return the object as-is
  return defaultValue;
}
