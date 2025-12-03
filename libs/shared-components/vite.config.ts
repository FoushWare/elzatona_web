/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import path from 'path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/shared-components',
  resolve: {
    alias: [
      {
        find: '@elzatona/shared-contexts',
        replacement: path.resolve(__dirname, '../../libs/shared-contexts/src/index.ts'),
      },
      {
        find: '@elzatona/shared-hooks',
        replacement: path.resolve(__dirname, '../../libs/shared-hooks/src/index.ts'),
      },
      {
        find: '@elzatona/shared-atoms',
        replacement: path.resolve(__dirname, '../../libs/shared-atoms/src/index.ts'),
      },
      {
        find: '@elzatona/shared-types',
        replacement: path.resolve(__dirname, '../../libs/shared-types/src/index.ts'),
      },
    ],
  },
  plugins: [
    nxViteTsPaths(),
    {
      name: 'resolve-alias',
      enforce: 'pre',
      resolveId(id) {
        const aliases: Record<string, string> = {
          '@elzatona/shared-contexts': path.resolve(__dirname, '../../libs/shared-contexts/src/index.ts'),
          '@elzatona/shared-hooks': path.resolve(__dirname, '../../libs/shared-hooks/src/index.ts'),
          '@elzatona/shared-atoms': path.resolve(__dirname, '../../libs/shared-atoms/src/index.ts'),
          '@elzatona/shared-types': path.resolve(__dirname, '../../libs/shared-types/src/index.ts'),
        };
        
        if (aliases[id]) {
          return { id: aliases[id], external: false };
        }
        return null;
      },
    },
  ],
  build: {
    outDir: '../../dist/libs/shared-components',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: 'src/index.ts',
      name: 'shared-components',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@supabase/supabase-js',
        '@radix-ui/react-dialog',
        '@radix-ui/react-tabs',
        'next',
        'next/navigation',
        'lucide-react',
      ],
    },
  },
  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    // Enable Jest compatibility
    // @ts-ignore - vitest types may not include this
    // jest: true,
    alias: {
      '@elzatona/shared-contexts': path.resolve(__dirname, '../../libs/shared-contexts/src/index.ts'),
      '@elzatona/shared-hooks': path.resolve(__dirname, '../../libs/shared-hooks/src/index.ts'),
      '@elzatona/shared-atoms': path.resolve(__dirname, '../../libs/shared-atoms/src/index.ts'),
      '@elzatona/shared-types': path.resolve(__dirname, '../../libs/shared-types/src/index.ts'),
    },
  },
});
