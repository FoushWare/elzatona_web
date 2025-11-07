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
      'jest.config.js', // Jest config uses CommonJS
      'jest.preset.js', // Jest preset uses CommonJS
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
];

export default eslintConfig;
