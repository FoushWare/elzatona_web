// Minimal mock for nuqs module used by some components in tests
export const createNuq = (..._args: unknown[]) => ({
  execute: async () => ({ data: [] }),
});
const nuqsMock = { createNuq };
export default nuqsMock;
