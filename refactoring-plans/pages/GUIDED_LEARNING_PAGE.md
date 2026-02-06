# Guided Learning Page - Refactoring Plan

**Tech Lead:** Zico (claude-opus-4.5)  
**Implementer:** GPT-4.1  
**Priority:** CRITICAL  
**Current Size:** 1025 lines  
**Target Size:** <500 lines (page) + extracted components  

---

## 1. Current State Analysis

### File Information
- **Location:** `/apps/website/src/app/features/guided-learning/page.tsx`
- **Lines:** 1025
- **Status:** Needs refactoring (exceeds 500-line page limit by 2x)

### Current Issues

1. **Monolithic Component** (1025 lines)
   - Single file doing authentication, data fetching, state management, and rendering
   - Multiple inline components (Active Plan view, Plan Selection view)
   - Complex conditional rendering with early returns

2. **Auth Logic Scattered** (Lines 58-200)
   - 150+ lines checking auth from multiple sources (AuthContext, localStorage, sessionStorage)
   - Polling interval for auth changes
   - Duplicated auth checking logic

3. **State Management Chaos**
   - 15+ useState hooks
   - Multiple useEffect hooks with complex dependencies
   - No separation of concerns

4. **Inline Helper Functions**
   - `getDayNumberFromName`, `getQuestionsRangeLabel`, `getDaysRangeLabel`
   - `getGradeColor`, `getGradeText`
   - `generateDailyGoals`

5. **Inline UI Components**
   - Active plan view (~200 lines)
   - Plan card rendering (~150 lines)
   - Stats display
   - Sign-in CTA banner

6. **No Type Separation**
   - `LearningPlan` interface defined inline
   - `DailyGoal` interface defined inline

7. **No Tests**
   - Zero test coverage
   - Complex logic untested

---

## 2. Target Architecture

### Component Hierarchy (Atomic Design)

```
GuidedLearningPage (Page - <500 lines)
├── GuidedLearningLayout (Template)
│   ├── GuidedLearningHeader (Organism)
│   │   ├── AnimatedIcon (Atom)
│   │   ├── PageTitle (Atom)
│   │   └── QuickStats (Molecule)
│   │
│   ├── SignInCTABanner (Molecule) [conditional]
│   │
│   ├── ActivePlanView (Organism) [conditional]
│   │   ├── PlanOverviewCard (Molecule)
│   │   ├── PlanProgressGrid (Molecule)
│   │   ├── DailyGoalsGrid (Organism)
│   │   │   └── DailyGoalCard (Molecule)
│   │   └── PlanActionButtons (Molecule)
│   │
│   ├── PlanSelectionView (Organism) [default]
│   │   ├── CompletionStats (Molecule) [conditional]
│   │   ├── PlanCardsGrid (Organism)
│   │   │   └── LearningPlanCard (Molecule)
│   │   └── WhyGuidedLearning (Molecule)
│   │
│   └── LoadingState (Molecule) / ErrorState (Molecule)
```

### File Structure

```
apps/website/src/app/features/guided-learning/
├── page.tsx                          # Main page (<200 lines)
├── types/
│   └── guided-learning.types.ts      # LearningPlan, DailyGoal, etc.
├── hooks/
│   ├── useGuidedLearningAuth.ts      # Consolidated auth logic
│   ├── useGuidedLearningPlans.ts     # Plans fetching & filtering
│   ├── useActivePlan.ts              # Active plan state management
│   └── useCompletedPlans.ts          # Completed plans & grades
├── utils/
│   ├── plan-helpers.ts               # getDayNumber, getGradeColor, etc.
│   └── daily-goals.ts                # generateDailyGoals
└── components/
    ├── GuidedLearningHeader.tsx      # Page header with stats
    ├── SignInCTABanner.tsx           # Auth encouragement banner
    ├── ActivePlanView.tsx            # When user has active plan
    ├── PlanSelectionView.tsx         # Plan selection grid
    ├── LearningPlanCard.tsx          # Individual plan card
    ├── DailyGoalCard.tsx             # Daily goal item
    ├── LoadingState.tsx              # Loading spinner
    └── ErrorState.tsx                # Error display
```

---

## 3. Detailed Extraction Plan

### Phase 1: Types & Utils (No UI Changes)

#### 3.1.1 Create Types File

**File:** `types/guided-learning.types.ts`

```typescript
export interface LearningPlanSection {
  id: string;
  name: string;
  questions: number;
  weight: number;
}

export interface LearningPlan {
  id: string;
  name: string;
  duration: number;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  totalQuestions: number;
  dailyQuestions: number;
  sections: LearningPlanSection[];
  features: string[];
  estimatedTime: string;
  isRecommended: boolean;
}

export interface DailyGoal {
  day: number;
  date: string;
  questions: number;
  sections: string[];
  completed: boolean;
  progress: number;
}

export interface PlanGrade {
  planId: string;
  percentage: number;
  completedAt: string;
}

export type GradeLevel = 'A+' | 'A' | 'B+' | 'B' | 'C';

export interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; email?: string } | null;
  isLoading: boolean;
}
```

#### 3.1.2 Create Utils

**File:** `utils/plan-helpers.ts`

```typescript
import { GradeLevel } from '../types/guided-learning.types';

export function getDayNumberFromName(planName: string): number {
  const match = planName?.match(/(\d+)-Day/);
  return match ? parseInt(match[1], 10) : NaN;
}

export function getGradeColor(percentage: number): string {
  if (percentage >= 90) return 'border-yellow-500 dark:border-yellow-400 ring-4 ring-yellow-200 dark:ring-yellow-800 bg-yellow-50/50 dark:bg-yellow-900/20';
  if (percentage >= 80) return 'border-green-500 dark:border-green-400 ring-4 ring-green-200 dark:ring-green-800 bg-green-50/50 dark:bg-green-900/20';
  if (percentage >= 70) return 'border-blue-500 dark:border-blue-400 ring-4 ring-blue-200 dark:ring-blue-800 bg-blue-50/50 dark:bg-blue-900/20';
  if (percentage >= 60) return 'border-orange-500 dark:border-orange-400 ring-4 ring-orange-200 dark:ring-orange-800 bg-orange-50/50 dark:bg-orange-900/20';
  return 'border-red-500 dark:border-red-400 ring-4 ring-red-200 dark:ring-red-800 bg-red-50/50 dark:bg-red-900/20';
}

export function getGradeText(percentage: number): string {
  if (percentage >= 90) return 'A+ (Excellent!)';
  if (percentage >= 80) return 'A (Great!)';
  if (percentage >= 70) return 'B+ (Good!)';
  if (percentage >= 60) return 'B (Not bad!)';
  return 'C (Keep practicing!)';
}

export function getGradeLevel(percentage: number): GradeLevel {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  return 'C';
}

export function filterDayBasedPlans<T extends { name: string }>(plans: T[]): T[] {
  const dayBasedPattern = /^\d+-(Day|Days) Plan$/i;
  return plans
    .filter(plan => dayBasedPattern.test(plan.name))
    .sort((a, b) => getDayNumberFromName(a.name) - getDayNumberFromName(b.name));
}

export function getQuestionsRange(plans: { totalQuestions?: number }[]): string {
  const nums = plans
    .map(p => p.totalQuestions)
    .filter((n): n is number => typeof n === 'number' && !isNaN(n));
  
  if (nums.length >= 1) {
    return `${Math.min(...nums)}-${Math.max(...nums)}`;
  }
  return '100-400';
}

export function getDaysRange(plans: { duration?: number; name: string }[]): string {
  const durations = plans
    .map(p => (typeof p.duration === 'number' && !isNaN(p.duration)) 
      ? p.duration 
      : getDayNumberFromName(p.name))
    .filter((n): n is number => typeof n === 'number' && !isNaN(n));
  
  if (durations.length >= 1) {
    return `${Math.min(...durations)}-${Math.max(...durations)}`;
  }
  return '1-7';
}
```

**File:** `utils/daily-goals.ts`

```typescript
import { LearningPlan, DailyGoal } from '../types/guided-learning.types';

export function generateDailyGoals(plan: LearningPlan): DailyGoal[] {
  const goals: DailyGoal[] = [];
  const today = new Date();

  for (let day = 1; day <= plan.duration; day++) {
    const date = new Date(today);
    date.setDate(today.getDate() + day - 1);

    goals.push({
      day,
      date: date.toLocaleDateString(),
      questions: plan.dailyQuestions,
      sections: plan.sections.map(s => s.name),
      completed: false,
      progress: 0,
    });
  }

  return goals;
}
```

---

### Phase 2: Custom Hooks

#### 3.2.1 Auth Hook

**File:** `hooks/useGuidedLearningAuth.ts`

Extract the 150+ lines of auth checking into a single reusable hook:

```typescript
import { useState, useEffect } from 'react';
import { useAuth } from '@elzatona/contexts';
import { AuthState } from '../types/guided-learning.types';

const AUTH_STORAGE_KEYS = [
  'navbar-auth-state',
  'auth',
  'auth-state',
  'authentication',
  'isAuthenticated',
  'authStatus',
  'authState',
  'user-auth',
  'session-auth',
];

function checkStorageAuth(): boolean {
  if (typeof window === 'undefined') return false;

  // Check sessionStorage
  for (const key of AUTH_STORAGE_KEYS) {
    const value = sessionStorage.getItem(key);
    if (value) {
      try {
        const parsed = JSON.parse(value);
        if (parsed?.isAuthenticated === true) return true;
      } catch {
        if (value === 'true') return true;
      }
    }
  }

  // Check localStorage
  if (localStorage.getItem('isAuthenticated') === 'true') return true;

  // Check auth token + user
  const authToken = localStorage.getItem('auth-token');
  const storedUser = localStorage.getItem('frontend-koddev-user');
  if (authToken && storedUser) {
    try {
      const userData = JSON.parse(storedUser);
      if (userData.id) return true;
    } catch {
      // Invalid JSON
    }
  }

  return false;
}

export function useGuidedLearningAuth(): AuthState {
  const { user, isAuthenticated: contextAuth } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (contextAuth && user) {
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      const storageAuth = checkStorageAuth();
      setIsAuthenticated(storageAuth);
      setIsLoading(false);
    };

    checkAuth();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key && (AUTH_STORAGE_KEYS.includes(e.key) || e.key === 'auth-token')) {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth-state-changed', checkAuth);

    // Poll interval (reduced from 1s to 5s for performance)
    const interval = setInterval(checkAuth, 5000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-state-changed', checkAuth);
      clearInterval(interval);
    };
  }, [contextAuth, user]);

  return {
    isAuthenticated,
    user: user ?? null,
    isLoading,
  };
}
```

#### 3.2.2 Plans Hook

**File:** `hooks/useGuidedLearningPlans.ts`

```typescript
import { useState, useEffect, useMemo } from 'react';
import { LearningPlan } from '../types/guided-learning.types';
import { filterDayBasedPlans, getQuestionsRange, getDaysRange } from '../utils/plan-helpers';

interface UsePlansResult {
  plans: LearningPlan[];
  allPlans: LearningPlan[];
  isLoading: boolean;
  error: string | null;
  questionsRange: string;
  daysRange: string;
}

export function useGuidedLearningPlans(): UsePlansResult {
  const [allPlans, setAllPlans] = useState<LearningPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/guided-learning/plans', {
          cache: 'no-store',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`Failed to load plans (${response.status})`);
        }

        const data = await response.json();
        
        if (data.success && Array.isArray(data.data)) {
          setAllPlans(data.data);
        } else if (Array.isArray(data)) {
          setAllPlans(data);
        } else {
          setAllPlans([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setAllPlans([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPlans();
  }, []);

  const plans = useMemo(() => filterDayBasedPlans(allPlans), [allPlans]);
  const questionsRange = useMemo(() => getQuestionsRange(plans), [plans]);
  const daysRange = useMemo(() => getDaysRange(plans), [plans]);

  return { plans, allPlans, isLoading, error, questionsRange, daysRange };
}
```

#### 3.2.3 Active Plan Hook

**File:** `hooks/useActivePlan.ts`

```typescript
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { LearningPlan, DailyGoal } from '../types/guided-learning.types';
import { generateDailyGoals } from '../utils/daily-goals';

interface UseActivePlanResult {
  currentPlan: LearningPlan | null;
  dailyGoals: DailyGoal[];
  currentDay: number;
  resumePlan: () => void;
  resetPlan: () => void;
}

export function useActivePlan(isAuthenticated: boolean): UseActivePlanResult {
  const router = useRouter();
  const [currentPlan, setCurrentPlan] = useState<LearningPlan | null>(null);
  const [dailyGoals, setDailyGoals] = useState<DailyGoal[]>([]);
  const [currentDay, setCurrentDay] = useState(1);

  useEffect(() => {
    if (!isAuthenticated || typeof window === 'undefined') return;

    const stored = localStorage.getItem('active-guided-plan');
    if (stored) {
      try {
        const plan = JSON.parse(stored) as LearningPlan;
        setCurrentPlan(plan);
        setDailyGoals(generateDailyGoals(plan));
      } catch {
        localStorage.removeItem('active-guided-plan');
      }
    }
  }, [isAuthenticated]);

  const resumePlan = useCallback(() => {
    if (currentPlan) {
      router.push(`/guided-practice?plan=${currentPlan.id}`);
    }
  }, [currentPlan, router]);

  const resetPlan = useCallback(() => {
    localStorage.removeItem('active-guided-plan');
    localStorage.removeItem('plan-start-date');
    setCurrentPlan(null);
    setDailyGoals([]);
    setCurrentDay(1);
  }, []);

  return { currentPlan, dailyGoals, currentDay, resumePlan, resetPlan };
}
```

#### 3.2.4 Completed Plans Hook

**File:** `hooks/useCompletedPlans.ts`

```typescript
import { useState, useEffect } from 'react';

interface UseCompletedPlansResult {
  completedPlans: Set<string>;
  planGrades: Map<string, number>;
}

export function useCompletedPlans(): UseCompletedPlansResult {
  const [completedPlans, setCompletedPlans] = useState<Set<string>>(new Set());
  const [planGrades, setPlanGrades] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const completedData = localStorage.getItem('completed-guided-plans');
    if (completedData) {
      try {
        setCompletedPlans(new Set(JSON.parse(completedData)));
      } catch {
        // Invalid data
      }
    }

    const gradesData = localStorage.getItem('plan-grades');
    if (gradesData) {
      try {
        setPlanGrades(new Map(Object.entries(JSON.parse(gradesData))));
      } catch {
        // Invalid data
      }
    }
  }, []);

  return { completedPlans, planGrades };
}
```

---

### Phase 3: UI Components

#### 3.3.1 Loading State

**File:** `components/LoadingState.tsx` (~30 lines)

```typescript
import { Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="col-span-full text-center py-16">
      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
        <Loader2 className="w-10 h-10 animate-spin text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Loading Learning Plans
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Fetching your personalized learning options...
      </p>
    </div>
  );
}
```

#### 3.3.2 Error State

**File:** `components/ErrorState.tsx` (~20 lines)

```typescript
interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="col-span-full text-center py-8">
      <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded">
        <strong>Error:</strong> {message}
      </div>
    </div>
  );
}
```

#### 3.3.3 SignInCTABanner

**File:** `components/SignInCTABanner.tsx` (~80 lines)

Extract the sign-in encouragement banner (lines 692-753).

#### 3.3.4 GuidedLearningHeader

**File:** `components/GuidedLearningHeader.tsx` (~100 lines)

Extract the header section with animated icon and quick stats (lines 614-691).

#### 3.3.5 LearningPlanCard

**File:** `components/LearningPlanCard.tsx` (~120 lines)

Extract single plan card rendering (lines 809-920).

#### 3.3.6 ActivePlanView

**File:** `components/ActivePlanView.tsx` (~180 lines)

Extract the entire active plan conditional view (lines 468-612).

#### 3.3.7 PlanSelectionView

**File:** `components/PlanSelectionView.tsx` (~150 lines)

Compose: Header + SignInCTA + CompletionStats + PlanCardsGrid + WhySection.

---

## 4. Implementation Order

### Step 1: Types & Utils (2 hours)
- [ ] Create `types/guided-learning.types.ts`
- [ ] Create `utils/plan-helpers.ts`
- [ ] Create `utils/daily-goals.ts`
- [ ] Verify existing functionality unchanged

### Step 2: Custom Hooks (3 hours)
- [ ] Create `hooks/useGuidedLearningAuth.ts`
- [ ] Create `hooks/useGuidedLearningPlans.ts`
- [ ] Create `hooks/useActivePlan.ts`
- [ ] Create `hooks/useCompletedPlans.ts`
- [ ] Replace inline logic with hooks

### Step 3: Extract Components (4 hours)
- [ ] Create `components/LoadingState.tsx`
- [ ] Create `components/ErrorState.tsx`
- [ ] Create `components/SignInCTABanner.tsx`
- [ ] Create `components/GuidedLearningHeader.tsx`
- [ ] Create `components/LearningPlanCard.tsx`
- [ ] Create `components/DailyGoalCard.tsx`
- [ ] Create `components/ActivePlanView.tsx`
- [ ] Create `components/PlanSelectionView.tsx`

### Step 4: Refactor Main Page (2 hours)
- [ ] Import all hooks and components
- [ ] Simplify page to composition only
- [ ] Verify all functionality intact
- [ ] Target: <200 lines

### Step 5: Add Tests (3 hours)
- [ ] Unit tests for utils
- [ ] Unit tests for hooks
- [ ] Component tests for key components
- [ ] Integration test for page

---

## 5. Success Metrics

| Metric | Before | Target |
|--------|--------|--------|
| Page lines | 1025 | <200 |
| Component files | 1 | 10+ |
| Hook files | 0 | 4 |
| Test coverage | 0% | >80% |
| TypeScript strict | Partial | Full |
| Auth logic location | Inline | Hook |

---

## 6. Testing Strategy

### Unit Tests
- `plan-helpers.test.ts`: All helper functions
- `daily-goals.test.ts`: Goal generation
- `useGuidedLearningAuth.test.ts`: Auth state logic
- `useGuidedLearningPlans.test.ts`: API fetching

### Component Tests
- `LearningPlanCard.test.tsx`: Renders correctly, handles clicks
- `ActivePlanView.test.tsx`: Shows plan details, buttons work
- `SignInCTABanner.test.tsx`: Shows/hides based on auth

### Integration Tests
- Full page render with mocked API
- Auth flow (authenticated vs not)
- Plan selection and navigation

---

## 7. Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Breaking auth flow | Keep auth logic identical, just move it |
| API changes | Mock API in tests, verify contract |
| Visual regression | Manual visual comparison per component |
| Performance regression | Benchmark before/after |

---

## 8. Rollback Plan

Each phase is independently deployable. If issues arise:
1. Revert the specific phase commit
2. Keep previous phases intact
3. Debug and re-attempt

---

**Next:** Implementer (GPT-4.1) should execute Phase 1 first, commit, then proceed to Phase 2.
