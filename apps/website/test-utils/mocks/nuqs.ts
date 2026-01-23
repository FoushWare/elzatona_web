// Minimal mock for nuqs module used by some components in tests
export const createNuq = (..._args: any[]) => ({ execute: async () => ({ data: [] }) });
export default {
  createNuq,
};
