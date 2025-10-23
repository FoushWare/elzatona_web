import { createAdapter } from 'nuqs/adapters/next';

export const adapter = createAdapter({
  // Next.js specific configuration
  shallow: false,
});
