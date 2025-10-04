import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./setup.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../apps/admin'),
      '@elzatona/shared/ui': path.resolve(__dirname, '../../libs/shared/ui/src'),
      '@elzatona/shared/types': path.resolve(__dirname, '../../libs/shared/types/src'),
      '@elzatona/shared/contexts': path.resolve(__dirname, '../../libs/shared/contexts'),
      '@elzatona/shared/hooks': path.resolve(__dirname, '../../libs/shared/hooks'),
      '@elzatona/data/firebase': path.resolve(__dirname, '../../libs/data/firebase/src'),
    },
  },
});
