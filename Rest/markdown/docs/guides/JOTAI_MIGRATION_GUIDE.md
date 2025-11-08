# 🚀 Jotai Migration Guide

This guide documents the migration from React Context to Jotai for state management in the Elzatona Web project.

## 📋 **Migration Overview**

### **What Changed:**

- ✅ **Replaced React Context** with Jotai atoms
- ✅ **Created atomic state management** for better performance
- ✅ **Reduced prop drilling** with granular state access
- ✅ **Improved developer experience** with better debugging
- ✅ **Maintained backward compatibility** with similar hook APIs

### **Benefits:**

- 🚀 **Better Performance**: Only components using specific atoms re-render
- 🎯 **Granular Updates**: Update specific state without affecting other components
- 🔧 **Better DevTools**: Jotai DevTools for debugging state
- 📦 **Smaller Bundle**: No context provider overhead
- 🧪 **Easier Testing**: Test individual atoms in isolation

## 🏗️ **New Architecture**

### **File Structure:**

```
src/
├── atoms/                 # Jotai atoms (replaces contexts)
│   ├── index.ts          # Export all atoms
│   ├── theme.ts          # Theme state
│   ├── language.ts       # Language & RTL state
│   ├── auth.ts           # Authentication state
│   ├── userPreferences.ts # User preferences
│   ├── mobileMenu.ts     # Mobile menu state
│   ├── onboarding.ts     # Onboarding flow state
│   ├── rtl.ts            # RTL direction state
│   └── userType.ts       # User type state
├── hooks/                # Custom hooks (replaces context hooks)
│   ├── index.ts          # Export all hooks
│   ├── useTheme.ts       # Theme hook
│   ├── useLanguage.ts    # Language hook
│   ├── useAuth.ts        # Auth hook
│   ├── useUserPreferences.ts # User preferences hook
│   ├── useMobileMenu.ts  # Mobile menu hook
│   ├── useOnboarding.ts  # Onboarding hook
│   ├── useRTL.ts         # RTL hook
│   └── useUserType.ts    # User type hook
└── providers/
    └── JotaiProvider.tsx # Single provider (replaces all context providers)
```

## 🔄 **Migration Steps**

### **1. Install Dependencies:**

```bash
npm install jotai
```

### **2. Replace Context Providers:**

**Before (Multiple Context Providers):**

```tsx
<RTLProvider>
  <ThemeProvider>
    <LanguageProvider>
      <FirebaseAuthProvider>
        <UserPreferencesProvider>
          <UserTypeProvider>
            <MobileMenuProvider>
              <OnboardingProvider>
                <ConditionalLayout>{children}</ConditionalLayout>
              </OnboardingProvider>
            </MobileMenuProvider>
          </UserTypeProvider>
        </UserPreferencesProvider>
      </FirebaseAuthProvider>
    </LanguageProvider>
  </ThemeProvider>
</RTLProvider>
```

**After (Single Jotai Provider):**

```tsx
<JotaiProvider>
  <ConditionalLayout>{children}</ConditionalLayout>
</JotaiProvider>
```

### **3. Update Hook Imports:**

**Before:**

```tsx
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/FirebaseAuthContext';
```

**After:**

```tsx
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
```

### **4. Update Hook Usage:**

**Before:**

```tsx
const { isDarkMode, toggleDarkMode, isLoaded } = useTheme();
```

**After:**

```tsx
const { theme, toggleTheme, isLoading } = useTheme();
const isDarkMode = theme === 'dark';
```

## 📚 **Hook API Reference**

### **useTheme Hook:**

```tsx
const { theme, setTheme, isLoading, toggleTheme, themeClass } = useTheme();
```

### **useLanguage Hook:**

```tsx
const { language, setLanguage, isLoading, isRTL, documentDirection } =
  useLanguage();
```

### **useAuth Hook:**

```tsx
const {
  user,
  loading,
  error,
  userProfile,
  isAuthenticated,
  signIn,
  signOut,
  updateUserProfile,
} = useAuth();
```

### **useUserPreferences Hook:**

```tsx
const {
  preferences,
  theme,
  language,
  notifications,
  soundEnabled,
  animationsEnabled,
  fontSize,
  reducedMotion,
  resetPreferences,
} = useUserPreferences();
```

### **useMobileMenu Hook:**

```tsx
const { isMobileMenuOpen, toggleMobileMenu, setIsMobileMenuOpen } =
  useMobileMenu();
```

### **useOnboarding Hook:**

```tsx
const {
  isCompleted,
  currentStep,
  totalSteps,
  isSkipped,
  progress,
  nextStep,
  previousStep,
  skipOnboarding,
  completeOnboarding,
  resetOnboarding,
} = useOnboarding();
```

### **useRTL Hook:**

```tsx
const { isRTL, setIsRTL, toggleRTL, setRTL, directionClass, textAlign } =
  useRTL();
```

### **useUserType Hook:**

```tsx
const {
  currentUserType,
  isUserTypeSelected,
  preferences,
  setUserType,
  updatePreferences,
  resetUserType,
  shouldShowAdvancedFeatures,
  canAccessAdminFeatures,
  defaultStudyMode,
} = useUserType();
```

## 🛠️ **Migration Script**

Run the migration script to automatically update most files:

```bash
node scripts/migrate-to-jotai.js
```

**Note:** The script handles most common patterns, but you may need to manually review and adjust some files.

## 🧪 **Testing the Migration**

### **1. Check for Build Errors:**

```bash
npm run build
```

### **2. Test Key Functionality:**

- ✅ Theme switching (light/dark mode)
- ✅ Language switching (English/Arabic)
- ✅ RTL direction changes
- ✅ Mobile menu toggle
- ✅ User authentication
- ✅ Onboarding flow
- ✅ User preferences

### **3. Verify State Persistence:**

- ✅ Theme preference persists across page reloads
- ✅ Language preference persists across page reloads
- ✅ User preferences persist across page reloads

## 🐛 **Common Issues & Solutions**

### **Issue 1: Hook not found**

**Error:** `Module not found: Can't resolve '@/hooks/useTheme'`
**Solution:** Ensure the hook file exists and is properly exported

### **Issue 2: Property does not exist**

**Error:** `Property 'isDarkMode' does not exist`
**Solution:** Update to use the new hook API (e.g., `theme === 'dark'`)

### **Issue 3: State not persisting**

**Error:** State resets on page reload
**Solution:** Ensure using `atomWithStorage` for persistent state

### **Issue 4: Multiple re-renders**

**Error:** Components re-render unnecessarily
**Solution:** Use specific atoms instead of the entire state object

## 🎯 **Best Practices**

### **1. Use Specific Atoms:**

```tsx
// ❌ Don't use the entire state
const { preferences } = useUserPreferences();
const theme = preferences.theme;

// ✅ Use specific atoms
const { theme } = useUserPreferences();
```

### **2. Use Computed Atoms:**

```tsx
// ✅ Use computed atoms for derived state
const isDarkMode = useAtomValue(
  useMemo(() => atom(get => get(themeAtom) === 'dark'), [])
);
```

### **3. Use Atom Families for Lists:**

```tsx
// ✅ Use atomFamily for dynamic lists
const itemAtom = atomFamily((id: string) =>
  atom({ id, name: '', completed: false })
);
```

### **4. Use Write-Only Atoms:**

```tsx
// ✅ Use write-only atoms for actions
const incrementAtom = atom(null, (get, set) => {
  set(countAtom, get(countAtom) + 1);
});
```

## 📈 **Performance Benefits**

### **Before (Context):**

- All consumers re-render when any context value changes
- Prop drilling through multiple provider layers
- Context provider overhead

### **After (Jotai):**

- Only components using specific atoms re-render
- Direct atom access without prop drilling
- Minimal provider overhead

## 🔧 **DevTools Integration**

### **Install Jotai DevTools:**

```bash
npm install jotai-devtools
```

### **Setup DevTools:**

```tsx
import { DevTools } from 'jotai-devtools';

function App() {
  return (
    <JotaiProvider>
      <DevTools />
      <YourApp />
    </JotaiProvider>
  );
}
```

## 🎉 **Migration Complete!**

After successful migration:

1. ✅ All contexts replaced with Jotai atoms
2. ✅ All context hooks replaced with Jotai hooks
3. ✅ Single provider instead of multiple context providers
4. ✅ Better performance and developer experience
5. ✅ Maintained backward compatibility

## 📝 **Next Steps**

1. **Remove old context files** from `src/contexts/`
2. **Update documentation** to reflect new architecture
3. **Add Jotai DevTools** for better debugging
4. **Consider atom families** for dynamic state
5. **Add unit tests** for individual atoms

---

**Migration Status:** ✅ **Complete**
**Performance Impact:** 🚀 **Improved**
**Developer Experience:** 🎯 **Enhanced**
