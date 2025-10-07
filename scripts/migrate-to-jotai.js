#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Mapping of old context imports to new hook imports
const contextToHookMapping = {
  '@/contexts/ThemeContext': '@/hooks/useTheme',
  '@/contexts/LanguageContext': '@/hooks/useLanguage',
  '@/contexts/FirebaseAuthContext': '@/hooks/useAuth',
  '@/contexts/UserPreferencesContext': '@/hooks/useUserPreferences',
  '@/contexts/UserTypeContext': '@/hooks/useUserType',
  '@/contexts/MobileMenuContext': '@/hooks/useMobileMenu',
  '@/contexts/OnboardingContext': '@/hooks/useOnboarding',
  '@/contexts/RTLContext': '@/hooks/useRTL',
  '@/contexts/AuthContext': '@/hooks/useAuth',
  '@/contexts/CookieAuthContext': '@/hooks/useAuth',
};

// Hook name mappings
const hookNameMapping = {
  useTheme: {
    isDarkMode: 'theme === "dark"',
    toggleDarkMode: 'toggleTheme',
    isLoaded: 'isLoading',
  },
  useLanguage: {
    // No changes needed for language hooks
  },
  useAuth: {
    loading: 'loading',
    user: 'user',
    isAuthenticated: 'isAuthenticated',
    signIn: 'signIn',
    signOut: 'signOut',
  },
  useUserPreferences: {
    // No changes needed for user preferences hooks
  },
  useUserType: {
    // No changes needed for user type hooks
  },
  useMobileMenu: {
    isMobileMenuOpen: 'isMobileMenuOpen',
    setIsMobileMenuOpen: 'setIsMobileMenuOpen',
  },
  useOnboarding: {
    isCompleted: 'isCompleted',
    currentStep: 'currentStep',
    totalSteps: 'totalSteps',
    isSkipped: 'isSkipped',
    progress: 'progress',
    nextStep: 'nextStep',
    previousStep: 'previousStep',
    skipOnboarding: 'skipOnboarding',
    completeOnboarding: 'completeOnboarding',
  },
  useRTL: {
    isRTL: 'isRTL',
    toggleDirection: 'toggleRTL',
  },
};

function migrateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;

  // Replace context imports with hook imports
  Object.entries(contextToHookMapping).forEach(([oldImport, newImport]) => {
    const oldImportRegex = new RegExp(
      `import\\s*{[^}]*}\\s*from\\s*['"]${oldImport.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`,
      'g'
    );
    if (oldImportRegex.test(content)) {
      content = content.replace(oldImportRegex, match => {
        // Extract the hook names from the import
        const hookMatch = match.match(/import\s*{([^}]*)}\s*from/);
        if (hookMatch) {
          const hookNames = hookMatch[1].split(',').map(name => name.trim());
          return `import { ${hookNames.join(', ')} } from '${newImport}'`;
        }
        return match;
      });
      hasChanges = true;
    }
  });

  // Replace hook usage patterns
  Object.entries(hookNameMapping).forEach(([hookName, mappings]) => {
    Object.entries(mappings).forEach(([oldProp, newProp]) => {
      // Replace destructured properties
      const destructureRegex = new RegExp(
        `const\\s*{[^}]*\\b${oldProp}\\b[^}]*}\\s*=\\s*${hookName}\\(`,
        'g'
      );
      if (destructureRegex.test(content)) {
        content = content.replace(destructureRegex, match => {
          return match.replace(new RegExp(`\\b${oldProp}\\b`, 'g'), newProp);
        });
        hasChanges = true;
      }

      // Replace direct property access
      const directAccessRegex = new RegExp(`\\b${oldProp}\\b`, 'g');
      if (directAccessRegex.test(content)) {
        content = content.replace(directAccessRegex, newProp);
        hasChanges = true;
      }
    });
  });

  if (hasChanges) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Migrated: ${filePath}`);
    return true;
  }

  return false;
}

function main() {
  console.log('🚀 Starting migration from React Context to Jotai...\n');

  // Find all TypeScript and JavaScript files in src directory
  const files = glob.sync('src/**/*.{ts,tsx,js,jsx}', {
    ignore: [
      'src/contexts/**',
      'src/atoms/**',
      'src/hooks/**',
      'src/providers/**',
      'node_modules/**',
    ],
  });

  let migratedCount = 0;

  files.forEach(file => {
    if (migrateFile(file)) {
      migratedCount++;
    }
  });

  console.log(`\n🎉 Migration complete! Migrated ${migratedCount} files.`);
  console.log('\n📝 Next steps:');
  console.log('1. Review the migrated files for any manual adjustments needed');
  console.log('2. Test the application to ensure all functionality works');
  console.log('3. Remove the old context files from src/contexts/');
  console.log('4. Update any remaining context usage manually');
}

if (require.main === module) {
  main();
}

module.exports = { migrateFile, contextToHookMapping, hookNameMapping };
