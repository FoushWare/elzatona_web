import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Ignore patterns must be separate config objects in flat config
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      '.nx/**',
      'out/**',
      'build/**',
      'dist/**',
      'next-env.d.ts',
      'tests/scripts/**', // Test utility scripts use CommonJS
      'scripts/**', // Build/utility scripts use CommonJS
      'scripts-backup/**', // Backup scripts use CommonJS
      'setup/**', // Setup scripts use CommonJS
      'docs/api/**', // API documentation scripts use CommonJS
      'verify-oauth-config.js', // Utility script uses CommonJS
      'setup-oauth-providers.js', // Utility script uses CommonJS
      'fix-imports.js', // Utility script uses CommonJS
      '**/jest.config.js', // Jest config files use CommonJS (all locations)
      'jest.preset.js', // Jest preset uses CommonJS
      'apps/admin/src/app/admin/login/page.tsx', // Has build artifact issues - ignore for now
      'apps/admin/.next/**', // Generated Next.js types
      'apps/website/.next/**', // Generated Next.js types
      '**/.next/types/**', // Generated Next.js type definitions
    ],
  },
  {
    // Configure Next.js app directory pages rule
    rules: {
      '@next/next/no-html-link-for-pages': ['error', 'apps/website/src/app'],
    },
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
];

export default eslintConfig;
