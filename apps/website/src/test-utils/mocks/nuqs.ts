// Mock for nuqs (ESM module) to avoid Jest parsing issues
export const useQueryState = jest.fn(() => [null, jest.fn()]);
export const parseAsString = jest.fn(
  (defaultValue?: string) => defaultValue || "",
);
export const parseAsInteger = jest.fn(
  (defaultValue?: number) => defaultValue || 0,
);
export const parseAsArrayOf = jest.fn(() => [null, jest.fn()]);
export const useQueryStates = jest.fn(() => [
  {} as Record<string, any>,
  jest.fn(),
]);
export const createSearchParamsCache = jest.fn(() => ({}));
export const useQueryStateAdapter = jest.fn(() => [null, jest.fn()]);

// Export default for compatibility
export default {
  useQueryState,
  parseAsString,
  parseAsInteger,
  parseAsArrayOf,
  useQueryStates,
  createSearchParamsCache,
  useQueryStateAdapter,
};
