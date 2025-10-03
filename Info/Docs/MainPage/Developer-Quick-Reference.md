# Developer Quick Reference - Main Route

## 🚀 **Quick Start**

### **Main Route File**

```bash
apps/web/app/page.tsx
```

### **Key Dependencies**

```typescript
// Contexts
import { useUserType } from '@/contexts/UserTypeContext';

// Hooks
import { useHomepageAnimations } from '@/hooks/useHomepageAnimations';
import { usePersonalizedContent } from '@/hooks/usePersonalizedContent';

// Components
import { HeroSection } from '@/components/home/HeroSection';
import { QuickActionsSection } from '@/components/home/QuickActionsSection';
// ... more components
```

## 🎯 **Key Concepts**

### **1. User Types**

```typescript
type UserType = 'guided' | 'self-directed' | null;
```

### **2. Animation States**

```typescript
const { showAnimation, isClient, showTour } = useHomepageAnimations();
```

### **3. Personalized Content**

```typescript
const { hasActivePlan, activePlan, personalizedContent } =
  usePersonalizedContent(userType);
```

## 🔧 **Common Tasks**

### **Adding a New Section**

1. Create component in `libs/shared/ui/src/components/home/`
2. Add to main page.tsx
3. Update types in `libs/shared/types/homepage.ts`

### **Modifying Animations**

1. Edit `libs/shared/utils/animations.ts`
2. Update `useHomepageAnimations` hook
3. Apply to components using `AnimatedElement`

### **Adding User Type Logic**

1. Update `usePersonalizedContent` hook
2. Add new content variations
3. Update TypeScript types

## 📁 **File Locations**

```
libs/shared/
├── types/homepage.ts           # TypeScript types
├── hooks/
│   ├── useHomepageAnimations.ts
│   └── usePersonalizedContent.ts
├── utils/animations.ts         # Animation utilities
└── ui/src/components/home/     # Homepage components
    ├── HeroSection.tsx
    ├── QuickActionsSection.tsx
    ├── UserContentSection.tsx
    ├── CallToActionSection.tsx
    └── AnimatedBackground.tsx
```

## 🎨 **Styling Guidelines**

### **Tailwind Classes**

```typescript
// Main container
className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"

// Animation classes
className={`transition-all duration-1000 delay-700 ${
  showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
}`}
```

### **RTL Support**

```typescript
import { useRTL } from '@/contexts/RTLContext';
import { rtlClass } from '@/utils/rtl';

// Usage
className={rtlClass(isRTL, 'space-x-reverse space-x-2', 'space-x-2')}
```

## 🚀 **Performance Tips**

### **Memoization**

```typescript
// Component memoization
const HomePage = memo(function HomePage() { ... });

// Expensive calculations
const shouldShowUserContent = useMemo(() => !!userType, [userType]);
```

### **Conditional Rendering**

```typescript
// Only render when needed
{shouldShowUserContent && <UserContentSection />}
{shouldShowCTA && <CallToActionSection />}
```

## 🐛 **Common Issues**

### **1. Hydration Mismatch**

```typescript
// Solution: Use isClient check
const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
}, []);
```

### **2. Animation Not Working**

```typescript
// Check: showAnimation and isClient states
const animationConfig = useMemo(
  () => ({ showAnimation, isClient }),
  [showAnimation, isClient]
);
```

### **3. TypeScript Errors**

```typescript
// Check: Import paths and type definitions
import { UserType } from '@/types/homepage';
```

## 📊 **Debugging**

### **Console Logs**

```typescript
console.log('User Type:', userType);
console.log('Show Animation:', showAnimation);
console.log('Personalized Content:', personalizedContent);
```

### **React DevTools**

- Check component props
- Monitor re-renders
- Inspect context values

## 🔄 **State Flow**

```
User Type Context
    ↓
usePersonalizedContent
    ↓
Personalized Content
    ↓
Component Rendering
    ↓
User Experience
```

## 📝 **Best Practices**

1. **Always use TypeScript types**
2. **Memoize expensive calculations**
3. **Use conditional rendering**
4. **Test RTL support**
5. **Optimize animations**
6. **Handle loading states**
7. **Validate user input**

---

This quick reference should help you navigate and work with the main route efficiently!
