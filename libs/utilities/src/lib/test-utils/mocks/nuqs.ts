// Mock for nuqs (ESM module) to avoid Jest parsing issues
// Only use jest.fn() in test environments, otherwise provide no-op implementations
import { createMockFn } from "./jest-helper";

const noOpFn = () => {};
const noOpState = [null, noOpFn] as const;

export const useQueryState = createMockFn(() => noOpState);
export const parseAsString = createMockFn(
  (defaultValue?: string) => defaultValue || "",
);
export const parseAsInteger = createMockFn(
  (defaultValue?: number) => defaultValue || 0,
);
export const parseAsArrayOf = createMockFn(() => noOpState);
export const useQueryStates = createMockFn(() => [
  {} as Record<string, any>,
  noOpFn,
]);
export const createSearchParamsCache = createMockFn(() => ({}));
export const useQueryStateAdapter = createMockFn(() => noOpState);

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
