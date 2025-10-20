#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Define the mapping of old imports to new imports
const importMappings = [
  // Contexts
  { from: '@/contexts/AdminAuthContext', to: '@elzatona/shared-contexts' },
  { from: '@/contexts/AuthContext', to: '@elzatona/shared-contexts' },
  { from: '@/contexts/CookieAuthContext', to: '@elzatona/shared-contexts' },
  { from: '@/contexts/LanguageContext', to: '@elzatona/shared-contexts' },
  { from: '@/contexts/MobileMenuContext', to: '@elzatona/shared-contexts' },
  { from: '@/contexts/NotificationContext', to: '@elzatona/shared-contexts' },
  { from: '@/contexts/OnboardingContext', to: '@elzatona/shared-contexts' },
  { from: '@/contexts/ThemeContext', to: '@elzatona/shared-contexts' },
  {
    from: '@/contexts/UserPreferencesContext',
    to: '@elzatona/shared-contexts',
  },
  { from: '@/contexts/UserTypeContext', to: '@elzatona/shared-contexts' },
  { from: '@/contexts/UserTypeContextSafe', to: '@elzatona/shared-contexts' },

  // Hooks
  { from: '@/hooks/useAdminAuth', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/useAudioCollection', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/useAuth', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/useDarkMode', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/useFirebaseQuestions', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/useFlashcardSession', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/useImageOptimization', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/useLanguage', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/useLearningPaths', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/useLearningPathStats', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/useLearningPathStatsDebug', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/useLearningPathStatsSimple', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/useLearningPlans', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/useMobileMenu', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/useNotificationActions', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/useOnboarding', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/usePerformanceMonitoring', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/useProgressTracking', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/useQuestions', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/useRoleBasedAccess', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/useSectorProgress', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/useSecureProgress', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/useTanStackQuery', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/useTranslation', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/useUnifiedQuestions', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/useUserPreferences', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/useUserProgress', to: '@elzatona/shared-hooks' },
  { from: '@/hooks/useUserType', to: '@elzatona/shared-hooks' },

  // Atoms
  { from: '@/atoms/auth', to: '@elzatona/shared-atoms' },
  { from: '@/atoms/language', to: '@elzatona/shared-atoms' },
  { from: '@/atoms/mobileMenu', to: '@elzatona/shared-atoms' },
  { from: '@/atoms/onboarding', to: '@elzatona/shared-atoms' },
  { from: '@/atoms/theme', to: '@elzatona/shared-atoms' },
  { from: '@/atoms/userPreferences', to: '@elzatona/shared-atoms' },
  { from: '@/atoms/userType', to: '@elzatona/shared-atoms' },
  { from: '@/atoms/index', to: '@elzatona/shared-atoms' },

  // Components - we'll handle these with a pattern
  { from: '@/shared/components', to: '@elzatona/shared-components' },
];

function updateImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Update specific imports first
    importMappings.forEach(mapping => {
      const regex = new RegExp(
        `from ['"]${mapping.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`,
        'g'
      );
      if (content.match(regex)) {
        content = content.replace(regex, `from '${mapping.to}'`);
        modified = true;
      }
    });

    // Update shared components imports
    const sharedComponentsRegex =
      /from ['"]@\/shared\/components\/([^'"]+)['"]/g;
    content = content.replace(sharedComponentsRegex, (match, componentPath) => {
      modified = true;
      return `from '@elzatona/shared-components'`;
    });

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
  }
}

function walkDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkDirectory(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      updateImportsInFile(filePath);
    }
  });
}

// Start from the apps/website/src directory
const startDir = path.join(__dirname, '..', 'apps', 'website', 'src');
const libsDir = path.join(__dirname, '..', 'libs');
console.log(`Updating imports in: ${startDir}`);
walkDirectory(startDir);
console.log(`Updating imports in: ${libsDir}`);
walkDirectory(libsDir);
console.log('Import update complete!');
