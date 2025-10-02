#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔄 Unifying Apps for Single Domain Deployment...\n');

const projectRoot = process.cwd();
const webAppPath = path.join(projectRoot, 'apps/web');
const adminAppPath = path.join(projectRoot, 'apps/admin');

// Helper function to copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`   ⚠️  Source directory ${src} does not exist, skipping...`);
    return;
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`   📄 Copied: ${entry.name}`);
    }
  }
}

console.log('📋 Step 1: Moving Admin Pages to Web App');
console.log('──────────────────────────────────────────────────');

// Move admin pages to web app under /admin route
const adminPagesSource = path.join(adminAppPath, 'app/admin');
const adminPagesDestination = path.join(webAppPath, 'app/admin');

if (fs.existsSync(adminPagesSource)) {
  console.log('📁 Moving admin pages...');
  copyDir(adminPagesSource, adminPagesDestination);
  console.log('✅ Admin pages moved successfully!');
} else {
  console.log('ℹ️  Admin pages already in web app or not found');
}

console.log('');

console.log('📋 Step 2: Update Admin Layout');
console.log('──────────────────────────────────────────────────');

// Create admin layout if it doesn't exist
const adminLayoutPath = path.join(webAppPath, 'app/admin/layout.tsx');
const adminLayoutContent = `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - GreatFrontendHub',
  description: 'Admin dashboard for managing content and users',
  robots: 'noindex, nofollow', // Prevent indexing of admin pages
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      <div className="admin-container">
        {children}
      </div>
    </div>
  );
}
`;

if (!fs.existsSync(adminLayoutPath)) {
  fs.writeFileSync(adminLayoutPath, adminLayoutContent);
  console.log('✅ Created admin layout.tsx');
} else {
  console.log('ℹ️  Admin layout already exists');
}

console.log('');

console.log('📋 Step 3: Update Package.json Scripts');
console.log('──────────────────────────────────────────────────');

// Update package.json to reflect unified deployment
const packageJsonPath = path.join(projectRoot, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Update scripts for unified deployment
packageJson.scripts = {
  ...packageJson.scripts,
  dev: 'nx serve web',
  'dev:unified': 'nx serve web',
  build: 'nx build web',
  'build:unified': 'nx build web',
  start: 'nx serve web --prod',
  deploy: 'vercel --prod',
  'deploy:unified': 'vercel --prod --local-config vercel.unified.json',
};

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('✅ Updated package.json scripts');

console.log('');

console.log('📋 Step 4: Create Deployment Configuration');
console.log('──────────────────────────────────────────────────');

// Copy unified configurations
const unifiedNextConfig = path.join(
  projectRoot,
  'apps/web/next.config.unified.ts'
);
const targetNextConfig = path.join(projectRoot, 'apps/web/next.config.ts');

if (fs.existsSync(unifiedNextConfig)) {
  fs.copyFileSync(unifiedNextConfig, targetNextConfig);
  console.log('✅ Updated Next.js configuration for unified deployment');
}

const unifiedVercelConfig = path.join(projectRoot, 'vercel.unified.json');
const targetVercelConfig = path.join(projectRoot, 'vercel.json');

if (fs.existsSync(unifiedVercelConfig)) {
  fs.copyFileSync(unifiedVercelConfig, targetVercelConfig);
  console.log('✅ Updated Vercel configuration for unified deployment');
}

console.log('');

console.log('📋 Step 5: Update Git Hooks for Unified Build');
console.log('──────────────────────────────────────────────────');

// Update pre-push hook to only build web app (which now includes admin)
const prePushPath = path.join(projectRoot, '.husky/pre-push');
if (fs.existsSync(prePushPath)) {
  let prePushContent = fs.readFileSync(prePushPath, 'utf8');

  // Replace any references to building admin separately
  prePushContent = prePushContent.replace(
    /npx nx build admin/g,
    '# Admin now included in web build'
  );
  prePushContent = prePushContent.replace(
    /apps\/admin\/\.next/g,
    '# Admin .next now in apps/web/.next'
  );

  fs.writeFileSync(prePushPath, prePushContent);
  console.log('✅ Updated git hooks for unified deployment');
}

console.log('');

console.log('🎉 Unification Complete!');
console.log('');
console.log('📊 Summary:');
console.log('   ✅ Admin pages moved to /admin route in web app');
console.log('   ✅ Package.json scripts updated');
console.log('   ✅ Next.js configuration updated for single domain');
console.log('   ✅ Vercel configuration updated for unified deployment');
console.log('   ✅ Git hooks updated');
console.log('');
console.log('🚀 Next Steps:');
console.log('   1. Test locally: npm run dev:unified');
console.log('   2. Build and test: npm run build:unified');
console.log('   3. Deploy: npm run deploy:unified');
console.log('');
console.log('🌐 Your apps will be available at:');
console.log('   📱 Main Website: https://elzatona-web.com/');
console.log('   🔧 Admin Dashboard: https://elzatona-web.com/admin');
console.log('   🔌 API Routes: https://elzatona-web.com/api/*');
console.log('');
