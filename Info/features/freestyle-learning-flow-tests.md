# 🧪 Free-Style Learning Flow - Test-Driven Development Plan

## 📋 Overview

This document outlines the comprehensive testing strategy for the Free-Style Learning Flow implementation using **Test-Driven Development (TDD)** approach. Tests will be written first to define the expected behavior, then implementation will follow.

## 🎯 Testing Philosophy

### **Why TDD for This Feature?**

1. **Complex Integration**: Multiple components, hooks, and API routes
2. **State Management**: Critical progress tracking and navigation state
3. **User Experience**: Loading states and transitions must be reliable
4. **Firebase Integration**: Dynamic data fetching needs robust error handling
5. **Regression Prevention**: Prevents breaking existing functionality

## 🏗️ Test Structure

### **Test Categories**

```
tests/
├── freestyle-learning/
│   ├── unit/
│   │   ├── components/
│   │   │   ├── LoadingTransition.test.tsx
│   │   │   ├── LearningPathCard.test.tsx
│   │   │   ├── SectorCard.test.tsx
│   │   │   └── SectorQuestionInterface.test.tsx
│   │   ├── hooks/
│   │   │   ├── useLearningPaths.test.tsx
│   │   │   ├── useSectors.test.tsx
│   │   │   └── useSectorProgress.test.tsx
│   │   └── utils/
│   │       ├── SectorProgressManager.test.ts
│   │       └── NavigationUtils.test.ts
│   ├── integration/
│   │   ├── freestyle-navigation-flow.test.tsx
│   │   ├── learning-paths-integration.test.tsx
│   │   └── sector-progress-integration.test.tsx
│   ├── api/
│   │   ├── learning-paths-api.test.ts
│   │   ├── sectors-api.test.ts
│   │   └── questions-api.test.ts
│   └── e2e/
│       ├── freestyle-complete-flow.spec.ts
│       └── sector-practice-flow.spec.ts
```

## 🧪 Test Implementation Plan

### **Phase 1: Core Components Tests (Week 1)**

#### **1.1 LoadingTransition Component**

```typescript
// tests/freestyle-learning/unit/components/LoadingTransition.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { LoadingTransition } from '@/components/LoadingTransition';

describe('LoadingTransition Component', () => {
  test('renders loading message when visible', () => {
    render(
      <LoadingTransition
        isVisible={true}
        message="Loading learning paths..."
      />
    );

    expect(screen.getByText('Loading learning paths...')).toBeInTheDocument();
  });

  test('does not render when not visible', () => {
    render(
      <LoadingTransition
        isVisible={false}
        message="Loading..."
      />
    );

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  test('shows spinner animation', () => {
    render(<LoadingTransition isVisible={true} />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('auto-hides after duration', async () => {
    render(
      <LoadingTransition
        isVisible={true}
        duration={100}
      />
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    }, { timeout: 200 });
  });
});
```

#### **1.2 LearningPathCard Component**

```typescript
// tests/freestyle-learning/unit/components/LearningPathCard.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LearningPathCard } from '@/components/LearningPathCard';

const mockLearningPath = {
  id: 'javascript-deep-dive',
  name: 'JavaScript Deep Dive',
  description: 'Master JavaScript fundamentals and advanced concepts',
  difficulty: 'intermediate',
  questionCount: 45,
  estimatedTime: 180,
  category: 'programming',
  sectors: [
    { id: 'fundamentals', name: 'Fundamentals', questionCount: 8 },
    { id: 'advanced', name: 'Advanced', questionCount: 12 }
  ]
};

describe('LearningPathCard Component', () => {
  test('renders learning path information correctly', () => {
    const onSelect = jest.fn();

    render(
      <LearningPathCard
        learningPath={mockLearningPath}
        onSelect={onSelect}
      />
    );

    expect(screen.getByText('JavaScript Deep Dive')).toBeInTheDocument();
    expect(screen.getByText('Master JavaScript fundamentals and advanced concepts')).toBeInTheDocument();
    expect(screen.getByText('45 questions')).toBeInTheDocument();
    expect(screen.getByText('180 min')).toBeInTheDocument();
    expect(screen.getByText('2 sectors')).toBeInTheDocument();
  });

  test('shows correct difficulty badge', () => {
    const onSelect = jest.fn();

    render(
      <LearningPathCard
        learningPath={mockLearningPath}
        onSelect={onSelect}
      />
    );

    const difficultyBadge = screen.getByText('intermediate');
    expect(difficultyBadge).toHaveClass('bg-yellow-100', 'text-yellow-800');
  });

  test('calls onSelect when start button is clicked', () => {
    const onSelect = jest.fn();

    render(
      <LearningPathCard
        learningPath={mockLearningPath}
        onSelect={onSelect}
      />
    );

    fireEvent.click(screen.getByText('Start Learning Path'));
    expect(onSelect).toHaveBeenCalledWith('javascript-deep-dive');
  });

  test('handles different difficulty levels', () => {
    const onSelect = jest.fn();

    const beginnerPath = { ...mockLearningPath, difficulty: 'beginner' };
    const { rerender } = render(
      <LearningPathCard
        learningPath={beginnerPath}
        onSelect={onSelect}
      />
    );

    expect(screen.getByText('beginner')).toHaveClass('bg-green-100', 'text-green-800');

    const advancedPath = { ...mockLearningPath, difficulty: 'advanced' };
    rerender(
      <LearningPathCard
        learningPath={advancedPath}
        onSelect={onSelect}
      />
    );

    expect(screen.getByText('advanced')).toHaveClass('bg-red-100', 'text-red-800');
  });
});
```

#### **1.3 SectorCard Component**

```typescript
// tests/freestyle-learning/unit/components/SectorCard.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SectorCard } from '@/components/SectorCard';

const mockSector = {
  id: 'fundamentals',
  name: 'JavaScript Fundamentals',
  description: 'Variables, functions, and basic concepts',
  questionCount: 8,
  difficulty: 'easy',
  order: 1,
  isActive: true
};

describe('SectorCard Component', () => {
  test('renders sector information correctly', () => {
    const onStart = jest.fn();

    render(
      <SectorCard
        sector={mockSector}
        onStart={onStart}
      />
    );

    expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('Variables, functions, and basic concepts')).toBeInTheDocument();
    expect(screen.getByText('8 questions')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument(); // Order number
  });

  test('shows correct difficulty badge', () => {
    const onStart = jest.fn();

    render(
      <SectorCard
        sector={mockSector}
        onStart={onStart}
      />
    );

    const difficultyBadge = screen.getByText('easy');
    expect(difficultyBadge).toHaveClass('bg-green-100', 'text-green-800');
  });

  test('calls onStart when start button is clicked', () => {
    const onStart = jest.fn();

    render(
      <SectorCard
        sector={mockSector}
        onStart={onStart}
      />
    );

    fireEvent.click(screen.getByText('Start Sector'));
    expect(onStart).toHaveBeenCalledWith('fundamentals');
  });

  test('shows completion state when completed', () => {
    const onStart = jest.fn();

    render(
      <SectorCard
        sector={mockSector}
        onStart={onStart}
        isCompleted={true}
        score={85}
      />
    );

    expect(screen.getByText('85%')).toBeInTheDocument();
    expect(screen.getByText('Review Again')).toBeInTheDocument();
    expect(screen.getByTestId('completion-check')).toBeInTheDocument();
  });

  test('shows correct button text based on completion state', () => {
    const onStart = jest.fn();

    const { rerender } = render(
      <SectorCard
        sector={mockSector}
        onStart={onStart}
        isCompleted={false}
      />
    );

    expect(screen.getByText('Start Sector')).toBeInTheDocument();

    rerender(
      <SectorCard
        sector={mockSector}
        onStart={onStart}
        isCompleted={true}
        score={90}
      />
    );

    expect(screen.getByText('Review Again')).toBeInTheDocument();
  });
});
```

### **Phase 2: Hooks Tests (Week 1-2)**

#### **2.1 useLearningPaths Hook**

```typescript
// tests/freestyle-learning/unit/hooks/useLearningPaths.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { useLearningPaths } from '@/hooks/useLearningPaths';

// Mock fetch
global.fetch = jest.fn();

describe('useLearningPaths Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize with loading state', () => {
    const { result } = renderHook(() => useLearningPaths());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.learningPaths).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  test('should fetch learning paths successfully', async () => {
    const mockLearningPaths = [
      {
        id: 'javascript-deep-dive',
        name: 'JavaScript Deep Dive',
        questionCount: 45,
        difficulty: 'intermediate',
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: mockLearningPaths }),
    });

    const { result } = renderHook(() => useLearningPaths());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.learningPaths).toEqual(mockLearningPaths);
    expect(result.current.error).toBeNull();
  });

  test('should handle fetch error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Network error')
    );

    const { result } = renderHook(() => useLearningPaths());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.learningPaths).toEqual([]);
    expect(result.current.error).toBe('Network error');
  });

  test('should refetch data when refetch is called', async () => {
    const mockLearningPaths = [
      { id: 'test-path', name: 'Test Path', questionCount: 10 },
    ];

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: mockLearningPaths }),
    });

    const { result } = renderHook(() => useLearningPaths());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Call refetch
    result.current.refetch();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });
});
```

#### **2.2 useSectors Hook**

```typescript
// tests/freestyle-learning/unit/hooks/useSectors.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { useSectors } from '@/hooks/useSectors';

global.fetch = jest.fn();

describe('useSectors Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should not fetch when pathId is empty', () => {
    renderHook(() => useSectors(''));

    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('should fetch sectors for given pathId', async () => {
    const mockSectors = [
      {
        id: 'fundamentals',
        name: 'Fundamentals',
        questionCount: 8,
        difficulty: 'easy',
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: mockSectors }),
    });

    const { result } = renderHook(() => useSectors('javascript-deep-dive'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.sectors).toEqual(mockSectors);
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/sectors/javascript-deep-dive'
    );
  });

  test('should handle API error response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: false, error: 'Failed to fetch sectors' }),
    });

    const { result } = renderHook(() => useSectors('javascript-deep-dive'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.sectors).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch sectors');
  });
});
```

#### **2.3 useSectorProgress Hook**

```typescript
// tests/freestyle-learning/unit/hooks/useSectorProgress.test.tsx
import { renderHook, act } from '@testing-library/react';
import { useSectorProgress } from '@/hooks/useSectorProgress';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('useSectorProgress Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  test('should initialize with empty progress', () => {
    const { result } = renderHook(() => useSectorProgress());

    expect(result.current.progress).toEqual({});
    expect(result.current.getSectorProgress('test-sector')).toBeNull();
  });

  test('should load progress from localStorage', () => {
    const mockProgress = {
      'sector-1': {
        sectorId: 'sector-1',
        pathId: 'path-1',
        isCompleted: true,
        score: 85,
        completedAt: '2024-01-01T00:00:00Z',
        timeSpent: 30,
      },
    };

    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockProgress));

    const { result } = renderHook(() => useSectorProgress());

    expect(result.current.progress).toEqual(mockProgress);
    expect(result.current.getSectorProgress('sector-1')).toEqual(
      mockProgress['sector-1']
    );
  });

  test('should save progress to localStorage', () => {
    const { result } = renderHook(() => useSectorProgress());

    const newProgress = {
      sectorId: 'sector-1',
      pathId: 'path-1',
      isCompleted: true,
      score: 90,
      completedAt: '2024-01-01T00:00:00Z',
      timeSpent: 25,
    };

    act(() => {
      result.current.saveProgress(newProgress);
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'sector-progress',
      JSON.stringify({ 'sector-1': newProgress })
    );
  });

  test('should clear progress', () => {
    const { result } = renderHook(() => useSectorProgress());

    act(() => {
      result.current.clearProgress();
    });

    expect(localStorageMock.removeItem).toHaveBeenCalledWith('sector-progress');
  });
});
```

### **Phase 3: API Tests (Week 2)**

#### **3.1 Learning Paths API**

```typescript
// tests/freestyle-learning/api/learning-paths-api.test.ts
import { NextRequest } from 'next/server';
import { GET } from '@/app/api/learning-paths/route';

// Mock Firebase
jest.mock('@/lib/firebase', () => ({
  db: {},
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
}));

describe('/api/learning-paths', () => {
  test('should return learning paths successfully', async () => {
    const mockLearningPaths = [
      {
        id: 'javascript-deep-dive',
        name: 'JavaScript Deep Dive',
        questionCount: 45,
        difficulty: 'intermediate',
      },
    ];

    // Mock Firebase response
    const mockQuerySnapshot = {
      forEach: jest.fn(callback => {
        mockLearningPaths.forEach(callback);
      }),
    };

    const { collection, query, where, getDocs } = require('@/lib/firebase');
    getDocs.mockResolvedValue(mockQuerySnapshot);

    const request = new NextRequest('http://localhost:3000/api/learning-paths');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toEqual(mockLearningPaths);
  });

  test('should handle Firebase error', async () => {
    const { getDocs } = require('@/lib/firebase');
    getDocs.mockRejectedValue(new Error('Firebase error'));

    const request = new NextRequest('http://localhost:3000/api/learning-paths');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.success).toBe(false);
    expect(data.error).toBe('Failed to fetch learning paths');
  });
});
```

#### **3.2 Sectors API**

```typescript
// tests/freestyle-learning/api/sectors-api.test.ts
import { NextRequest } from 'next/server';
import { GET } from '@/app/api/sectors/[pathId]/route';

describe('/api/sectors/[pathId]', () => {
  test('should return sectors for given pathId', async () => {
    const mockSectors = [
      {
        id: 'fundamentals',
        name: 'JavaScript Fundamentals',
        questionCount: 8,
        difficulty: 'easy',
      },
    ];

    // Mock the getSectorsByLearningPath function
    const mockGetSectorsByLearningPath = jest
      .fn()
      .mockResolvedValue(mockSectors);
    jest.doMock('@/lib/sectors-service', () => ({
      getSectorsByLearningPath: mockGetSectorsByLearningPath,
    }));

    const request = new NextRequest(
      'http://localhost:3000/api/sectors/javascript-deep-dive'
    );
    const response = await GET(request, {
      params: Promise.resolve({ pathId: 'javascript-deep-dive' }),
    });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toEqual(mockSectors);
    expect(mockGetSectorsByLearningPath).toHaveBeenCalledWith(
      'javascript-deep-dive'
    );
  });

  test('should handle missing pathId', async () => {
    const request = new NextRequest('http://localhost:3000/api/sectors/');
    const response = await GET(request, {
      params: Promise.resolve({ pathId: '' }),
    });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Learning path ID is required');
  });
});
```

### **Phase 4: Integration Tests (Week 2-3)**

#### **4.1 Free-Style Navigation Flow**

```typescript
// tests/freestyle-learning/integration/freestyle-navigation-flow.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import GetStartedPage from '@/app/get-started/page';
import BrowsePracticeQuestionsPage from '@/app/browse-practice-questions/page';

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush
  })
}));

// Mock hooks
jest.mock('@/hooks/useLearningPaths', () => ({
  useLearningPaths: () => ({
    learningPaths: [
      { id: 'js-path', name: 'JavaScript Path', questionCount: 45 }
    ],
    isLoading: false,
    error: null
  })
}));

describe('Free-Style Navigation Flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should navigate from get-started to browse-practice-questions', async () => {
    render(<GetStartedPage />);

    // Select self-directed option
    fireEvent.click(screen.getByText('I\'m self-directed'));

    // Should show loading state
    expect(screen.getByTestId('loading-transition')).toBeInTheDocument();

    // Wait for navigation
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/browse-practice-questions');
    });
  });

  test('should navigate from browse-practice-questions to learning-paths', async () => {
    render(<BrowsePracticeQuestionsPage />);

    // Click on practice interview questions
    fireEvent.click(screen.getByText('Practice Interview Questions'));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/learning-paths');
    });
  });

  test('should show loading state during navigation', async () => {
    render(<GetStartedPage />);

    fireEvent.click(screen.getByText('I\'m self-directed'));

    // Should show loading animation
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
```

### **Phase 5: End-to-End Tests (Week 3-4)**

#### **5.1 Complete Free-Style Flow**

```typescript
// tests/freestyle-learning/e2e/freestyle-complete-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Free-Style Learning Flow', () => {
  test('complete user journey from landing to sector practice', async ({
    page,
  }) => {
    // Start at get-started page
    await page.goto('/get-started');

    // Should see selection options without popup
    await expect(page.getByText('I need guidance')).toBeVisible();
    await expect(page.getByText("I'm self-directed")).toBeVisible();

    // Select self-directed
    await page.click("text=I'm self-directed");

    // Should show loading state
    await expect(page.getByTestId('loading-transition')).toBeVisible();

    // Wait for navigation to browse-practice-questions
    await page.waitForURL('/browse-practice-questions');

    // Click on practice interview questions
    await page.click('text=Practice Interview Questions');

    // Should navigate to learning-paths
    await page.waitForURL('/learning-paths');

    // Should see learning paths loaded from Firebase
    await expect(page.getByText('JavaScript Deep Dive')).toBeVisible();
    await expect(page.getByText('45 questions')).toBeVisible();

    // Click on a learning path
    await page.click('text=Start Learning Path');

    // Should navigate to sectors page
    await page.waitForURL('/sectors/javascript-deep-dive');

    // Should see sector cards
    await expect(page.getByText('JavaScript Fundamentals')).toBeVisible();
    await expect(page.getByText('8 questions')).toBeVisible();

    // Click on a sector
    await page.click('text=Start Sector');

    // Should navigate to questions page
    await page.waitForURL('/questions/javascript-deep-dive/fundamentals');

    // Should see question interface
    await expect(page.getByText('Question 1 of 8')).toBeVisible();
  });

  test('sector progress tracking', async ({ page }) => {
    // Navigate to sectors page
    await page.goto('/sectors/javascript-deep-dive');

    // Complete a sector
    await page.click('text=Start Sector');
    await page.waitForURL('/questions/javascript-deep-dive/fundamentals');

    // Answer questions (simplified)
    for (let i = 0; i < 3; i++) {
      await page.click('[data-testid="option-0"]'); // Select first option
      await page.click('text=Next Question');
    }

    // Complete sector
    await page.click('text=Complete Sector');

    // Should show completion screen
    await expect(page.getByText('Sector Completed!')).toBeVisible();
    await expect(page.getByText('Score:')).toBeVisible();

    // Navigate back to sectors
    await page.click('text=Back to Sectors');
    await page.waitForURL('/sectors/javascript-deep-dive');

    // Should show completed state
    await expect(page.getByText('Review Again')).toBeVisible();
    await expect(page.getByTestId('completion-check')).toBeVisible();
  });
});
```

## 🚀 Implementation Timeline

### **Week 1: Core Components & Hooks**

- [ ] Write tests for LoadingTransition component
- [ ] Write tests for LearningPathCard component
- [ ] Write tests for SectorCard component
- [ ] Write tests for useLearningPaths hook
- [ ] Write tests for useSectors hook
- [ ] Write tests for useSectorProgress hook
- [ ] Implement components and hooks to pass tests

### **Week 2: API Routes & Integration**

- [ ] Write tests for learning-paths API
- [ ] Write tests for sectors API
- [ ] Write tests for questions API
- [ ] Write integration tests for navigation flow
- [ ] Implement API routes to pass tests
- [ ] Implement integration features

### **Week 3: End-to-End & Polish**

- [ ] Write E2E tests for complete flow
- [ ] Write E2E tests for progress tracking
- [ ] Implement remaining features to pass E2E tests
- [ ] Performance optimization
- [ ] Error handling improvements

### **Week 4: Testing & Documentation**

- [ ] Run full test suite
- [ ] Fix any failing tests
- [ ] Update documentation
- [ ] Code review and refactoring

## 📊 Test Coverage Goals

### **Unit Tests**

- **Components**: 95%+ coverage
- **Hooks**: 100% coverage
- **Utils**: 100% coverage

### **Integration Tests**

- **Navigation Flow**: 100% coverage
- **API Integration**: 100% coverage
- **State Management**: 100% coverage

### **End-to-End Tests**

- **Complete User Journey**: 100% coverage
- **Error Scenarios**: 80% coverage
- **Edge Cases**: 70% coverage

## 🎯 Success Metrics

### **Test Quality**

- **All Tests Pass**: 100% pass rate
- **Fast Execution**: < 30 seconds for full suite
- **Reliable**: No flaky tests
- **Maintainable**: Clear, readable test code

### **Code Quality**

- **Coverage**: 90%+ overall coverage
- **Performance**: < 2s page load times
- **Accessibility**: WCAG AA compliance
- **Error Handling**: Graceful error recovery

## 🔧 Test Configuration

### **Jest Configuration Updates**

```javascript
// jest.config.js additions
module.exports = {
  // ... existing config
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.test.ts',
    '**/tests/**/*.test.tsx',
    '**/tests/freestyle-learning/**/*.test.{js,ts,tsx}', // New pattern
  ],
  collectCoverageFrom: [
    'src/**/*.{js,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,ts,tsx}',
    '!src/**/*.test.{js,ts,tsx}',
    'src/components/LoadingTransition.tsx', // Specific files
    'src/hooks/useLearningPaths.ts',
    'src/hooks/useSectors.ts',
  ],
};
```

### **Playwright Configuration**

```typescript
// playwright.config.ts additions
export default defineConfig({
  // ... existing config
  projects: [
    {
      name: 'freestyle-learning',
      testMatch: 'tests/freestyle-learning/e2e/**/*.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

## 📝 Conclusion

This TDD approach ensures that:

1. **Quality**: Every feature is thoroughly tested before implementation
2. **Reliability**: Robust error handling and edge case coverage
3. **Maintainability**: Clear test documentation and patterns
4. **Confidence**: Safe refactoring and feature additions
5. **Documentation**: Tests serve as living documentation

The test-first approach will result in a more robust, reliable, and maintainable free-style learning flow implementation.
