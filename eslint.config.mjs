import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Ignore patterns must be separate config objects in flat config
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      ".nx/**",
      "out/**",
      "build/**",
      "dist/**",
      "coverage/**",
      "*.min.js",
      ".out/**",
      ".env*",
      "*.log",
      ".vscode/**",
      ".idea/**",
      "__pycache__/**",
      "*.pyc",
      ".rpt2_cache/**",
      ".rts2_cache_cjs/**",
      ".rts2_cache_es/**",
      ".rts2_cache_umd/**",
      ".jest-cache/**",
      "next-env.d.ts",
      "tests/scripts/**", // Test utility scripts use CommonJS
      "scripts/**", // Build/utility scripts use CommonJS
      "scripts-backup/**", // Backup scripts use CommonJS
      "setup/**", // Setup scripts use CommonJS
      "docs/api/**", // API documentation scripts use CommonJS
      "libs/utilities/scripts/**", // Utility scripts use CommonJS or ES modules
      "verify-oauth-config.js", // Utility script uses CommonJS
      "setup-oauth-providers.js", // Utility script uses CommonJS
      "fix-imports.js", // Utility script uses CommonJS
      "**/jest.config.js", // Jest config files use CommonJS (all locations)
      "jest.preset.js", // Jest preset uses CommonJS
      "apps/admin/src/app/admin/login/page.tsx", // Has build artifact issues - ignore for now
      "apps/admin/.next/**", // Generated Next.js types
      "apps/website/.next/**", // Generated Next.js types
      "**/.next/**", // All generated Next.js files
      "**/.next/types/**", // Generated Next.js type definitions
      "**/.next/types/routes.d.ts", // Generated Next.js route types
      // Legacy Node.js scripts in Rest/ directory (use require() - valid for Node.js)
      "Rest/**", // All files in Rest/ directory use CommonJS (legacy scripts)
      ".cursor/**", // Cursor IDE scripts use CommonJS
      "codeql-database/**", // CodeQL generated database files
      "tools/**", // Tool scripts (gitignored, may use CommonJS)
    ],
  },
  {
    // Configure Next.js app directory pages rule
    rules: {
      "@next/next/no-html-link-for-pages": ["error", "apps/website/src/app"],
      // Allow variables prefixed with _ to be unused (common pattern for intentionally unused vars)
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      // Disable triple-slash-reference for generated Next.js files
      "@typescript-eslint/triple-slash-reference": "off",
      // Allow any types (warn instead of error to not block builds)
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Override Next.js defaults AFTER extends to ensure our rules take precedence
    rules: {
      // Treat no-explicit-any as warning instead of error
      "@typescript-eslint/no-explicit-any": "warn",
      // Disable triple-slash-reference completely
      "@typescript-eslint/triple-slash-reference": "off",
      // Allow unescaped entities (warnings only)
      "react/no-unescaped-entities": "warn",
    },
  },
  {
    // Allow @ts-nocheck in storybook and test files
    files: ["**/*.stories.tsx", "**/*.test.tsx", "**/*.test.ts"],
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
  {
    // Allow CommonJS requires and runtime helpers in test/setup and script files
    files: [
      "**/tests/**",
      "**/tests/**/*.js",
      "**/jest*.js",
      "tests/**",
      "scripts/**",
      "**/test-utils/**",
    ],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

export default eslintConfig;
