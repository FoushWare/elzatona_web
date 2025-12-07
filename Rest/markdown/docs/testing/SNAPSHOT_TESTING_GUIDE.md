# Snapshot Testing Guide

**Date**: 2025-11-09  
**Status**: ⏳ **Not Currently Implemented**  
**Purpose**: Guide for adding snapshot testing to the test suite

---

## 📋 Current Status

### **Snapshot Testing: Not Implemented**

Current tests use **React Testing Library assertions**:

- `toBeInTheDocument()`
- `toHaveTextContent()`
- `toHaveClass()`
- `toHaveAttribute()`
- etc.

**No snapshot tests** (`toMatchSnapshot()`) are currently in the codebase.

---

## 🎯 What is Snapshot Testing?

Snapshot testing captures the rendered output of a component and saves it to a file. On subsequent test runs, Jest compares the rendered output against the saved snapshot.

### **Benefits:**

- ✅ Catches unintended UI changes
- ✅ Quick to write (one line)
- ✅ Good for regression testing
- ✅ Documents component output

### **Drawbacks:**

- ⚠️ Snapshots can be large and hard to review
- ⚠️ Can break easily with intentional changes
- ⚠️ May not catch logic errors
- ⚠️ Requires maintenance when UI changes

---

## 🔧 How to Add Snapshot Testing

### **Option 1: Add to Existing Tests**

Add snapshot assertions to existing test files:

```typescript
// Example: apps/website/src/app/page.test.tsx
describe('G-UT-001: Homepage Renders', () => {
  it('should match snapshot', () => {
    const { container } = render(<HomePage />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
```

### **Option 2: Create Dedicated Snapshot Tests**

Create separate snapshot test files:

```typescript
// Example: apps/website/src/app/page.snapshot.test.tsx
import { render } from '@testing-library/react';
import HomePage from './page';

describe('Homepage Snapshot Tests', () => {
  it('should match homepage snapshot', () => {
    const { container } = render(<HomePage />);
    expect(container).toMatchSnapshot();
  });
});
```

### **Option 3: Inline Snapshots**

Use inline snapshots (snapshot stored in test file):

```typescript
it('should match inline snapshot', () => {
  const { container } = render(<HomePage />);
  expect(container.firstChild).toMatchInlineSnapshot();
});
```

---

## 📝 Recommended Snapshot Test Strategy

### **What to Snapshot:**

✅ **Good Candidates:**

- Static components (headers, footers, navigation)
- Form layouts
- Card components
- Error messages
- Loading states
- Empty states

❌ **Avoid Snapshot Testing:**

- Components with timestamps
- Components with random data
- Components with dates
- Components with user-specific data
- Highly dynamic components

---

## 🚀 Implementation Plan

### **Phase 1: Shared Components (Recommended Start)**

Add snapshots to shared components first:

1. **Navigation Component** (`libs/shared-components/src/lib/common/Navigation.test.tsx`)

   ```typescript
   it('should match navigation snapshot', () => {
     const { container } = render(<Navigation />);
     expect(container).toMatchSnapshot();
   });
   ```

2. **Question Card Component** (`apps/website/src/components/QuestionDisplay.test.tsx`)

   ```typescript
   it('should match question card snapshot', () => {
     const { container } = render(<QuestionDisplay question={mockQuestion} />);
     expect(container).toMatchSnapshot();
   });
   ```

3. **Progress Tracker Component** (`libs/shared-components/src/lib/common/ProgressTracker.test.tsx`)
   ```typescript
   it('should match progress tracker snapshot', () => {
     const { container } = render(<ProgressTracker />);
     expect(container).toMatchSnapshot();
   });
   ```

### **Phase 2: Page Components**

Add snapshots to key pages:

1. **Homepage** (`apps/website/src/app/page.test.tsx`)
2. **Get Started Page** (`apps/website/src/app/get-started/page.test.tsx`)
3. **Admin Login** (`apps/website/src/app/admin/login/page.test.tsx`)
4. **Admin Dashboard** (`apps/website/src/app/admin/dashboard/page.test.tsx`)

### **Phase 3: Component States**

Add snapshots for different states:

1. **Loading States**

   ```typescript
   it('should match loading state snapshot', () => {
     const { container } = render(<Component isLoading={true} />);
     expect(container).toMatchSnapshot();
   });
   ```

2. **Error States**

   ```typescript
   it('should match error state snapshot', () => {
     const { container } = render(<Component error="Error message" />);
     expect(container).toMatchSnapshot();
   });
   ```

3. **Empty States**
   ```typescript
   it('should match empty state snapshot', () => {
     const { container } = render(<Component data={[]} />);
     expect(container).toMatchSnapshot();
   });
   ```

---

## 📁 Snapshot File Structure

When you add snapshot tests, Jest will create snapshot files:

```
apps/website/src/app/
├── page.test.tsx
├── __snapshots__/
│   └── page.test.tsx.snap
├── get-started/
│   ├── page.test.tsx
│   └── __snapshots__/
│       └── page.test.tsx.snap
```

**Note**: Snapshot files should be **committed to Git** so the team can review changes.

---

## 🔄 Updating Snapshots

### **When UI Changes Intentionally:**

```bash
# Update all snapshots
npm run test:unit -- --updateSnapshot

# Update specific test snapshots
npm run test:unit -- apps/website/src/app/page.test.tsx --updateSnapshot
```

### **Review Changes:**

```bash
# Run tests to see snapshot differences
npm run test:unit

# Review the diff in the test output
# If changes are correct, update snapshots
npm run test:unit -- --updateSnapshot
```

---

## ⚙️ Jest Configuration

Current `jest.config.js` already supports snapshots (no changes needed):

```javascript
// Snapshot serializers are included by default in Jest
// No additional configuration needed
```

### **Optional: Custom Snapshot Serializer**

If you want prettier snapshots, you can add:

```javascript
// jest.config.js
module.exports = {
  // ... existing config
  snapshotSerializers: ['@emotion/jest/serializer'], // If using Emotion
};
```

---

## 📊 Snapshot Test Examples

### **Example 1: Component Snapshot**

```typescript
import { render } from '@testing-library/react';
import Navigation from './Navigation';

describe('Navigation Snapshot Tests', () => {
  it('should match snapshot', () => {
    const { container } = render(<Navigation />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should match snapshot with dark mode', () => {
    const { container } = render(<Navigation theme="dark" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
```

### **Example 2: Inline Snapshot**

```typescript
it('should match inline snapshot', () => {
  const { container } = render(<HomePage />);
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <h1>Welcome</h1>
      <button>Get Started</button>
    </div>
  `);
});
```

### **Example 3: Multiple States**

```typescript
describe('Component Snapshots', () => {
  it('should match default state snapshot', () => {
    const { container } = render(<Component />);
    expect(container).toMatchSnapshot('default-state');
  });

  it('should match loading state snapshot', () => {
    const { container } = render(<Component isLoading />);
    expect(container).toMatchSnapshot('loading-state');
  });

  it('should match error state snapshot', () => {
    const { container } = render(<Component error="Error" />);
    expect(container).toMatchSnapshot('error-state');
  });
});
```

---

## 🎯 Recommended Approach

### **Hybrid Strategy (Recommended):**

1. **Use Snapshot Tests For:**
   - Static UI components
   - Layout components
   - Error/loading/empty states
   - Form layouts

2. **Use Assertion Tests For:**
   - User interactions
   - Business logic
   - API calls
   - State changes
   - Dynamic content

### **Example Hybrid Test:**

```typescript
describe('Homepage Tests', () => {
  // Snapshot test for UI structure
  it('should match homepage snapshot', () => {
    const { container } = render(<HomePage />);
    expect(container.firstChild).toMatchSnapshot();
  });

  // Assertion tests for functionality
  it('should have Get Started button', () => {
    render(<HomePage />);
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('should navigate on button click', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByText('Get Started'));
    expect(mockPush).toHaveBeenCalledWith('/get-started');
  });
});
```

---

## ✅ Implementation Checklist

If you want to add snapshot testing:

- [ ] Decide on snapshot strategy (dedicated files vs. mixed)
- [ ] Add snapshot tests to shared components
- [ ] Add snapshot tests to key pages
- [ ] Add snapshot tests for different states
- [ ] Update `.gitignore` if needed (snapshots should be committed)
- [ ] Document snapshot update process
- [ ] Add snapshot update to CI/CD if needed
- [ ] Train team on snapshot maintenance

---

## 🚨 Important Notes

### **Snapshot Maintenance:**

1. **Review snapshot changes carefully** - Don't blindly accept all changes
2. **Update snapshots intentionally** - Only when UI changes are intentional
3. **Keep snapshots focused** - Don't snapshot entire pages (too large)
4. **Commit snapshot files** - They should be in version control

### **When to Update Snapshots:**

✅ **Update when:**

- UI changes are intentional
- Component refactoring changes output
- Design updates are applied

❌ **Don't update when:**

- Tests are failing due to bugs
- Logic errors are causing failures
- Random data is causing differences

---

## 📚 Resources

- **Jest Snapshot Testing**: https://jestjs.io/docs/snapshot-testing
- **React Testing Library**: https://testing-library.com/docs/react-testing-library/intro
- **Best Practices**: https://kentcdodds.com/blog/effective-snapshot-testing

---

## 💡 Recommendation

**Current Status**: Snapshot testing is **NOT implemented**

**Recommendation**:

- **For MVP/Production**: Current assertion-based tests are **sufficient**
- **For Comprehensive Coverage**: Add snapshot tests to **shared components** first
- **For Complete Coverage**: Add snapshots to **all components** (requires maintenance)

**Decision**: Would you like me to:

1. ✅ Add snapshot tests to shared components (3 components)
2. ✅ Add snapshot tests to all 21 tasks
3. ✅ Keep current assertion-based tests (recommended for now)

---

**Last Updated**: 2025-11-09  
**Status**: Guide Created - Awaiting Decision  
**Ready for**: Implementation if requested
