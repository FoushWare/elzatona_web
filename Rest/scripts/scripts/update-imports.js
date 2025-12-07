#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Define the mapping of old imports to new imports
const importMappings = [
  // Contexts
  { from: '@/contexts/AdminAuthContext', to: '@elzatona/contexts' },
  { from: '@/contexts/AuthContext', to: '@elzatona/contexts' },
  { from: '@/contexts/CookieAuthContext', to: '@elzatona/contexts' },
  { from: '@/contexts/LanguageContext', to: '@elzatona/contexts' },
  { from: '@/contexts/MobileMenuContext', to: '@elzatona/contexts' },
  { from: '@/contexts/NotificationContext', to: '@elzatona/contexts' },
  { from: '@/contexts/OnboardingContext', to: '@elzatona/contexts' },
  { from: '@/contexts/ThemeContext', to: '@elzatona/contexts' },
  {
    from: '@/contexts/UserPreferencesContext',
    to: '@elzatona/contexts',
  },
  { from: '@/contexts/UserTypeContext', to: '@elzatona/contexts' },
  { from: '@/contexts/UserTypeContextSafe', to: '@elzatona/contexts' },

  // Hooks
  { from: '@/hooks/useAdminAuth', to: '@elzatona/hooks' },
  { from: '@/hooks/useAudioCollection', to: '@elzatona/hooks' },
  { from: '@/hooks/useAuth', to: '@elzatona/hooks' },
  { from: '@/hooks/useDarkMode', to: '@elzatona/hooks' },
  { from: '@/hooks/useFirebaseQuestions', to: '@elzatona/hooks' },
  { from: '@/hooks/useFlashcardSession', to: '@elzatona/hooks' },
  { from: '@/hooks/useImageOptimization', to: '@elzatona/hooks' },
  { from: '@/hooks/useLanguage', to: '@elzatona/hooks' },
  { from: '@/hooks/useLearningPaths', to: '@elzatona/hooks' },
  { from: '@/hooks/useLearningPathStats', to: '@elzatona/hooks' },
  { from: '@/hooks/useLearningPathStatsDebug', to: '@elzatona/hooks' },
  { from: '@/hooks/useLearningPathStatsSimple', to: '@elzatona/hooks' },
  { from: '@/hooks/useLearningPlans', to: '@elzatona/hooks' },
  { from: '@/hooks/useMobileMenu', to: '@elzatona/hooks' },
  { from: '@/hooks/useNotificationActions', to: '@elzatona/hooks' },
  { from: '@/hooks/useOnboarding', to: '@elzatona/hooks' },
  { from: '@/hooks/usePerformanceMonitoring', to: '@elzatona/hooks' },
  { from: '@/hooks/useProgressTracking', to: '@elzatona/hooks' },
  { from: '@/hooks/useQuestions', to: '@elzatona/hooks' },
  { from: '@/hooks/useRoleBasedAccess', to: '@elzatona/hooks' },
  { from: '@/hooks/useSectorProgress', to: '@elzatona/hooks' },
  { from: '@/hooks/useSecureProgress', to: '@elzatona/hooks' },
  { from: '@/hooks/useTanStackQuery', to: '@elzatona/hooks' },
  { from: '@/hooks/useTranslation', to: '@elzatona/hooks' },
  { from: '@/hooks/useUnifiedQuestions', to: '@elzatona/hooks' },
  { from: '@/hooks/useUserPreferences', to: '@elzatona/hooks' },
  { from: '@/hooks/useUserProgress', to: '@elzatona/hooks' },
  { from: '@/hooks/useUserType', to: '@elzatona/hooks' },

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
  { from: '@/shared/components', to: '@elzatona/components' },
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
      return `from '@elzatona/components'`;
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
