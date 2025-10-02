#!/usr/bin/env node

/**
 * 🏗️ Nx Migration Script - GreatFrontendHub
 *
 * This script helps migrate the existing Next.js project to Nx monorepo structure
 * 100% Local-only setup (no cloud services)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting Nx Migration...\n');

// Helper functions
const copyRecursive = (src, dest) => {
  if (!fs.existsSync(src)) return;

  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const files = fs.readdirSync(src);
    files.forEach(file => {
      copyRecursive(path.join(src, file), path.join(dest, file));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

const moveDirectory = (src, dest) => {
  console.log(`📁 Moving ${src} → ${dest}`);
  if (fs.existsSync(src)) {
    copyRecursive(src, dest);
    // Don't remove source yet - we'll do that manually after verification
  }
};

const createFile = (filePath, content) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content);
  console.log(`✅ Created ${filePath}`);
};

// Migration steps
const steps = [
  {
    name: 'Create Web App Structure',
    action: () => {
      // Move main app files to apps/web
      moveDirectory('src/app', 'apps/web/app');
      moveDirectory('public', 'apps/web/public');

      // Copy configuration files
      if (fs.existsSync('next.config.ts')) {
        fs.copyFileSync('next.config.ts', 'apps/web/next.config.ts');
      }
      if (fs.existsSync('tailwind.config.ts')) {
        fs.copyFileSync('tailwind.config.ts', 'apps/web/tailwind.config.ts');
      }
      if (fs.existsSync('postcss.config.js')) {
        fs.copyFileSync('postcss.config.js', 'apps/web/postcss.config.js');
      }

      // Create web app package.json
      const webPackageJson = {
        name: 'web',
        version: '0.0.1',
        private: true,
        dependencies: {
          next: '^15.5.1',
          react: '^18.3.1',
          'react-dom': '^18.3.1',
        },
      };
      createFile(
        'apps/web/package.json',
        JSON.stringify(webPackageJson, null, 2)
      );

      // Create web app tsconfig
      const webTsConfig = {
        extends: '../../tsconfig.base.json',
        compilerOptions: {
          allowJs: true,
          strict: false,
          noEmit: true,
          incremental: true,
          module: 'esnext',
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          strict: false,
          forceConsistentCasingInFileNames: true,
          noFallthroughCasesInSwitch: true,
          moduleResolution: 'node',
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: 'preserve',
          plugins: [{ name: 'next' }],
        },
        include: [
          '**/*.ts',
          '**/*.tsx',
          '**/*.js',
          '**/*.jsx',
          '../../.next/types/**/*.ts',
        ],
        exclude: [
          'node_modules',
          'jest.config.ts',
          '**/*.spec.ts',
          '**/*.test.ts',
        ],
      };
      createFile(
        'apps/web/tsconfig.json',
        JSON.stringify(webTsConfig, null, 2)
      );
    },
  },

  {
    name: 'Extract Admin App',
    action: () => {
      // Move admin-specific pages
      moveDirectory('src/app/admin', 'apps/admin/app/admin');

      // Create admin app structure
      const adminLayoutContent = `import { ReactNode } from 'react';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="admin-root">
          {children}
        </div>
      </body>
    </html>
  );
}`;

      createFile('apps/admin/app/layout.tsx', adminLayoutContent);

      const adminPageContent = `export default function AdminHomePage() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin panel</p>
    </div>
  );
}`;

      createFile('apps/admin/app/page.tsx', adminPageContent);

      // Create admin package.json
      const adminPackageJson = {
        name: 'admin',
        version: '0.0.1',
        private: true,
        dependencies: {
          next: '^15.5.1',
          react: '^18.3.1',
          'react-dom': '^18.3.1',
        },
      };
      createFile(
        'apps/admin/package.json',
        JSON.stringify(adminPackageJson, null, 2)
      );

      // Create admin tsconfig
      const adminTsConfig = {
        extends: '../../tsconfig.base.json',
        compilerOptions: {
          allowJs: true,
          strict: false,
          noEmit: true,
          incremental: true,
          module: 'esnext',
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          strict: false,
          forceConsistentCasingInFileNames: true,
          noFallthroughCasesInSwitch: true,
          moduleResolution: 'node',
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: 'preserve',
          plugins: [{ name: 'next' }],
        },
        include: [
          '**/*.ts',
          '**/*.tsx',
          '**/*.js',
          '**/*.jsx',
          '../../.next/types/**/*.ts',
        ],
        exclude: [
          'node_modules',
          'jest.config.ts',
          '**/*.spec.ts',
          '**/*.test.ts',
        ],
      };
      createFile(
        'apps/admin/tsconfig.json',
        JSON.stringify(adminTsConfig, null, 2)
      );
    },
  },

  {
    name: 'Create Shared Libraries',
    action: () => {
      // Move components to shared UI
      moveDirectory('src/components', 'libs/shared/ui/src/components');

      // Create UI library index
      const uiIndexContent = `// UI Components
export * from './components';

// Re-export common UI patterns
export { default as Button } from './components/ui/button';
export { default as Input } from './components/ui/input';
export { default as Card } from './components/ui/card';
`;
      createFile('libs/shared/ui/src/index.ts', uiIndexContent);

      // Move utilities
      moveDirectory('src/utils', 'libs/shared/utils/src');
      const utilsIndexContent = `export * from './rtl';
// Add other utility exports here
`;
      createFile('libs/shared/utils/src/index.ts', utilsIndexContent);

      // Move types
      moveDirectory('src/types', 'libs/shared/types/src');
      const typesIndexContent = `export * from './index';
// Add other type exports here
`;
      createFile('libs/shared/types/src/index.ts', typesIndexContent);

      // Move contexts
      moveDirectory('src/contexts', 'libs/shared/contexts/src');
      const contextsIndexContent = `export * from './RTLContext';
export * from './ThemeContext';
export * from './FirebaseAuthContext';
// Add other context exports here
`;
      createFile('libs/shared/contexts/src/index.ts', contextsIndexContent);

      // Move hooks
      moveDirectory('src/hooks', 'libs/shared/hooks/src');
      const hooksIndexContent = `// Export all custom hooks
export * from './useUnifiedQuestions';
// Add other hook exports here
`;
      createFile('libs/shared/hooks/src/index.ts', hooksIndexContent);
    },
  },

  {
    name: 'Create Data Libraries',
    action: () => {
      // Move Firebase utilities
      moveDirectory('src/lib', 'libs/data/firebase/src');
      const firebaseIndexContent = `export * from './firebase';
export * from './firebase-server';
export * from './unified-question-schema';
// Add other Firebase exports here
`;
      createFile('libs/data/firebase/src/index.ts', firebaseIndexContent);
    },
  },

  {
    name: 'Update TypeScript Configuration',
    action: () => {
      // Create base tsconfig
      const baseTsConfig = {
        compileOnSave: false,
        compilerOptions: {
          rootDir: '.',
          sourceMap: true,
          declaration: false,
          moduleResolution: 'node',
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
          importHelpers: true,
          target: 'es2015',
          module: 'esnext',
          lib: ['es2020', 'dom'],
          skipLibCheck: true,
          skipDefaultLibCheck: true,
          baseUrl: '.',
          paths: {
            '@elzatona/shared/ui': ['libs/shared/ui/src/index.ts'],
            '@elzatona/shared/utils': ['libs/shared/utils/src/index.ts'],
            '@elzatona/shared/types': ['libs/shared/types/src/index.ts'],
            '@elzatona/shared/contexts': ['libs/shared/contexts/src/index.ts'],
            '@elzatona/shared/hooks': ['libs/shared/hooks/src/index.ts'],
            '@elzatona/data/firebase': ['libs/data/firebase/src/index.ts'],
            '@elzatona/data/api-client': ['libs/data/api-client/src/index.ts'],
            '@elzatona/data/schemas': ['libs/data/schemas/src/index.ts'],
          },
        },
        exclude: ['node_modules', 'tmp'],
      };
      createFile('tsconfig.base.json', JSON.stringify(baseTsConfig, null, 2));
    },
  },
];

// Run migration
async function runMigration() {
  console.log('🎯 Migration Plan:');
  steps.forEach((step, index) => {
    console.log(`${index + 1}. ${step.name}`);
  });
  console.log('');

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    console.log(`\n📋 Step ${i + 1}: ${step.name}`);
    console.log('─'.repeat(50));

    try {
      await step.action();
      console.log(`✅ Completed: ${step.name}`);
    } catch (error) {
      console.error(`❌ Failed: ${step.name}`, error.message);
      process.exit(1);
    }
  }

  console.log('\n🎉 Migration completed successfully!');
  console.log('\n📋 Next Steps:');
  console.log('1. Update import paths in your code');
  console.log('2. Test the web app: nx serve web');
  console.log('3. Test the admin app: nx serve admin');
  console.log('4. Run tests: nx test');
  console.log('5. Build apps: nx build web && nx build admin');
}

// Run if called directly
if (require.main === module) {
  runMigration().catch(console.error);
}

module.exports = { runMigration };
