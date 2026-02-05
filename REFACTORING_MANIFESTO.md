# 📋 Refactoring Manifesto & Zico Rules

**Project**: FoushWare/elzatona_web  
**Phase**: Refactoring  
**Lead**: Foush (TechLead | Senior Frontend | DevOps)  
**Assistant**: Zico

---

## 🎯 Refactoring Manifesto

**Core Principle**: Improve code quality without breaking functionality

### 1️⃣ Code Quality First

**Standards**:

- ✅ ESLint rules must pass (no warnings)
- ✅ Prettier formatting applied
- ✅ No dead code or unused imports
- ✅ Consistent naming conventions
- ✅ No console.log() or debug statements
- ✅ No commented-out code

**What This Means**:

- Every file must be clean
- No technical debt
- Code is maintainable
- Easy to read and understand

**Zico Helps By**:

```
"commit Clean up: Remove dead code from [component]"
"commit Style: Apply Prettier formatting"
"commit Refactor: Improve naming consistency"
```

---

### 2️⃣ Zero Breaking Changes

**Requirement**: Everything still works exactly the same

**External APIs**:

- ✅ Endpoint URLs don't change
- ✅ Request/response formats stay same
- ✅ Authentication works identically
- ✅ Error handling behaves same

**Database**:

- ✅ Schema remains compatible
- ✅ Migrations are reversible
- ✅ No data loss
- ✅ Queries still work

**UI/UX**:

- ✅ Visual appearance unchanged
- ✅ User interactions same
- ✅ Navigation unaffected
- ✅ Performance improved or same

**What This Means**:

- Users see no difference
- Existing features work
- Old integrations still work
- Can be deployed safely

**Zico Helps By**:

```
"commit Refactor: Simplify database query (behavior unchanged)"
"commit Refactor: Extract component (no UI changes)"
"commit Refactor: Improve error handling (same behavior)"
```

---

### 3️⃣ Performance & Optimization

**Goals**:

- ✅ Smaller JavaScript bundle
- ✅ Faster page load time
- ✅ Better Core Web Vitals (LCP, FID, CLS)
- ✅ Reduced memory usage
- ✅ Optimized render cycles

**Areas to Focus**:

**Bundle Size**:

- Remove unused dependencies
- Tree-shake unused code
- Code split by route
- Lazy load components

**Rendering**:

- Reduce re-renders
- Memoize components
- Optimize dependencies
- Use correct hooks

**Network**:

- Minimize requests
- Compress assets
- Cache effectively
- Optimize images

**Database**:

- Add indexes
- Batch queries
- Cache results
- Remove N+1 queries

**What This Means**:

- App loads faster
- Users see content sooner
- Smooth interactions
- Better mobile experience

**Zico Helps By**:

```
"commit Perf: Add React.memo to expensive component"
"commit Perf: Optimize database queries with indexes"
"commit Perf: Lazy load heavy components"
```

---

### 4️⃣ Type Safety

**Requirement**: Strict TypeScript everywhere

**Standards**:

- ✅ TypeScript strict mode enabled
- ✅ No 'any' types (except absolutes)
- ✅ Proper generic types
- ✅ Discriminated unions for variants
- ✅ Exact type definitions
- ✅ Return types specified
- ✅ All function parameters typed

**Areas to Improve**:

- Migrate from 'any' to specific types
- Add proper generics
- Use type guards
- Define interfaces/types
- Create type utilities

**Common Patterns**:

```typescript
// ❌ Before
const getData = (id) => {
  return fetch(`/api/${id}`).then((r) => r.json());
};

// ✅ After
const getData = (id: string): Promise<UserData> => {
  return fetch(`/api/${id}`).then((r) => r.json());
};
```

**What This Means**:

- IDE catches errors
- Fewer runtime bugs
- Better documentation
- Easier refactoring

**Zico Helps By**:

```
"commit Type: Add proper types to database queries"
"commit Type: Replace 'any' with specific types"
"commit Type: Add generics to utility functions"
```

---

### 5️⃣ Testing Coverage

**Requirements**:

- ✅ Unit tests for all logic
- ✅ Integration tests for features
- ✅ E2E tests for critical flows
- ✅ No regressions
- ✅ Snapshot tests where appropriate
- ✅ Test coverage >80%

**Test Pyramid**:

```
        /\
       /  \  E2E Tests (10%)
      /____\
     /      \
    /        \ Integration Tests (30%)
   /          \
  /____________\
 /              \
/                \ Unit Tests (60%)
/__________________\
```

**Test Types**:

**Unit Tests**:

- Test single functions/components
- Mock dependencies
- Test success & failure cases
- Vitest framework

**Integration Tests**:

- Test feature workflows
- Use real dependencies
- API + Database
- Playwright

**E2E Tests**:

- Test complete user journeys
- Real browser
- Real backend
- Playwright

**What This Means**:

- Bugs caught early
- Safe refactoring
- Confidence in changes
- Easy debugging

**Zico Helps By**:

```
"commit Test: Add unit tests for [function]"
"commit Test: Add integration test for [feature]"
"commit Test: Fix failing E2E tests"
```

---

### 6️⃣ Documentation

**Requirements**:

- ✅ Code comments where needed
- ✅ Complex logic explained
- ✅ API endpoints documented
- ✅ Database schema documented
- ✅ Setup instructions clear
- ✅ Change log updated
- ✅ TypeScript types are self-documenting

**What to Document**:

**Code Comments**:

```typescript
// Complex business logic
// Why decisions were made
// Non-obvious code paths
```

**README**:

- Project overview
- Setup instructions
- How to run locally
- Deployment process

**API Docs**:

- Endpoints
- Request/response formats
- Authentication
- Error codes

**Database**:

- Schema diagram
- Relationships
- Indexes
- Migrations

**What This Means**:

- New devs understand quickly
- Fewer questions needed
- Easier maintenance
- Better onboarding

**Zico Helps By**:

```
"commit Docs: Add comments to complex algorithm"
"commit Docs: Update API documentation"
"commit Docs: Add database schema diagram"
```

---

### 7️⃣ Git Hygiene

**Commit Standards**:

- ✅ One logical change per commit
- ✅ Clear, descriptive messages
- ✅ Follows commit format
- ✅ No merge commits (squash instead)
- ✅ Clean history

**Commit Format**:

```
Type: Description

Examples:
Refactor: Simplify component structure
Perf: Optimize database queries
Type: Add types to utilities
Test: Add unit tests for auth
Docs: Update API documentation
Fix: Resolve TypeScript errors
Style: Apply Prettier formatting
```

**What This Means**:

- Easy to understand history
- Bisecting for bugs is quick
- Reverting is safe
- Clear change log

**Zico Helps By**:

```
"commit Refactor: Extract authentication logic"
"commit Perf: Add indexes to user queries"
"commit Type: Improve API response types"
```

---

### 8️⃣ Code Review & Quality

**PR Requirements**:

- ✅ Clear description
- ✅ Tests passing (all green ✅)
- ✅ Vercel preview working
- ✅ No ESLint warnings
- ✅ TypeScript strict mode satisfied
- ✅ Code review approved
- ✅ Merge conflicts resolved

**Review Checklist**:

```
Code Quality:
☑ Code is clean
☑ Follows conventions
☑ No dead code
☑ Proper error handling

Functionality:
☑ Feature works as intended
☑ No breaking changes
☑ Backwards compatible
☑ Edge cases handled

Testing:
☑ Tests are comprehensive
☑ All tests pass
☑ No regressions
☑ Coverage is adequate

Documentation:
☑ Code is documented
☑ README updated
☑ API docs clear
☑ Commit messages clear
```

**What This Means**:

- High quality codebase
- Few bugs in production
- Easy to maintain
- Team agrees on changes

**Zico Helps By**:

```
"show prs"                 → See what needs review
"pr [number]"              → View PR details
"create pr [description]"  → Submit for review
```

---

## 🎯 Zico's Core Rules

### Rule 1: Always Start from Development

```
✅ Correct:
"checkout development"
"create branch refactor/[name]"

❌ Wrong:
"create branch refactor/[name]" (from wrong branch)
"checkout main"
```

### Rule 2: Feature Branches Always Target Development

```
✅ Correct:
"create pr Refactor: [Description]"
(Auto-targets development branch)

❌ Wrong:
Feature PR targeting main branch
Direct commit to main
```

### Rule 3: Only Release Branches Target Main

```
✅ Correct:
"create branch release/v1.2.0"
"create pr Release: v1.2.0"
(Targets main branch)

❌ Wrong:
Feature branches to main
Releases to development
Multiple main branches
```

### Rule 4: Clear Commit Messages Always

```
✅ Correct:
"commit Refactor: Extract database abstraction"
"commit Perf: Optimize React render cycles"
"commit Type: Add proper types to API"

❌ Wrong:
"commit fix"
"commit changes"
"commit stuff"
```

### Rule 5: Test Before Creating PR

```
✅ Correct:
Tests passing locally
Vercel preview green
Ready for review
Create PR

❌ Wrong:
Create PR before testing
Red tests in PR
Broken preview
Waiting to fix tests
```

### Rule 6: Review Feedback is Required

```
✅ Correct:
"show prs"
Wait for review
Address feedback
Fixes pushed
Then merge

❌ Wrong:
Skip review
Merge without approval
Force push without asking
Ignore feedback
```

### Rule 7: Squash Commits on Merge

```
✅ Correct:
Multiple logical commits
Squash on merge (clean history)
One feature = one commit in main
Clear changelog

❌ Wrong:
Merge commits in history
Tiny commits in main
Messy history
Complex reverting
```

---

## ✅ Refactoring Quality Checklist

For every refactoring task:

```
BEFORE STARTING:
[ ] Create branch from development
[ ] Branch name: refactor/[feature]
[ ] Understand current behavior
[ ] Identify improvements needed
[ ] Plan testing approach

DURING REFACTORING:
[ ] One logical change per commit
[ ] Clear commit messages
[ ] Tests pass locally
[ ] No console errors
[ ] TypeScript strict mode
[ ] ESLint passes
[ ] Code is documented

BEFORE PR:
[ ] All tests passing
[ ] Vercel preview green
[ ] No TypeScript errors
[ ] No ESLint warnings
[ ] Code formatted (Prettier)
[ ] Behavior unchanged
[ ] Ready for review

PR SUBMISSION:
[ ] PR description clear
[ ] Target: development branch
[ ] Tests attached
[ ] Documentation complete
[ ] Wait for approval

POST-APPROVAL:
[ ] Address feedback
[ ] Re-test changes
[ ] Verify Vercel preview
[ ] Squash commits
[ ] Merge to development
[ ] Delete feature branch

AFTER MERGE:
[ ] Development stable
[ ] Move to next task
[ ] Update progress tracking
[ ] Continue refactoring
```

---

## 📊 Refactoring Areas (Priority Order)

Based on your side project:

**Phase 1: Database Abstraction** (High Impact)

```
Branch: refactor/database-abstraction
Goals:
- Decouple from Supabase
- Add abstraction layer
- Better type safety
- Easier testing

Zico Commands:
"create branch refactor/database-abstraction"
"commit Refactor: Add database abstraction layer"
"commit Type: Improve query types"
"commit Test: Add database tests"
"push"
"create pr Refactor: Database abstraction improvements"
```

**Phase 2: Component Structure** (Medium Impact)

```
Branch: refactor/component-structure
Goals:
- Better organization
- Reduced prop drilling
- Cleaner composition
- Easier reuse

Zico Commands:
"create branch refactor/component-structure"
"commit Refactor: Extract shared components"
"commit Refactor: Improve component props"
"push"
"create pr Refactor: Component structure improvements"
```

**Phase 3: API Routes** (High Value)

```
Branch: refactor/api-routes
Goals:
- Consistent naming
- Better error handling
- Proper validation
- Type safety

Zico Commands:
"create branch refactor/api-routes"
"commit Refactor: Standardize API routes"
"commit Type: Add API request/response types"
"commit Test: Add API endpoint tests"
"push"
"create pr Refactor: API route improvements"
```

**Phase 4: Type Safety** (Foundational)

```
Branch: refactor/type-safety
Goals:
- Remove 'any' types
- Strict generics
- Better interfaces
- Full coverage

Zico Commands:
"create branch refactor/type-safety"
"commit Type: Replace any types with specific types"
"commit Type: Add generics to utilities"
"push"
"create pr Refactor: Type safety improvements"
```

**Phase 5: Performance** (User Facing)

```
Branch: refactor/performance
Goals:
- Faster loading
- Better metrics
- Optimized renders
- Smaller bundle

Zico Commands:
"create branch refactor/performance"
"commit Perf: Optimize React components"
"commit Perf: Add code splitting"
"commit Perf: Optimize images"
"push"
"create pr Refactor: Performance improvements"
```

---

## 🚀 How to Use With Zico

**When Starting Refactoring Task**:

```
"I'm working on database abstraction refactoring.
Create branch: refactor/database-abstraction"

Zico: ✅ Branch created

"I've improved the type safety and added tests."

Zico: Ready to commit when you are.

"commit Refactor: Add database abstraction layer with proper types"

Zico: ✅ Committed

"push"

Zico: ✅ Pushed to origin

"create pr Refactor: Database abstraction - improves type safety and testability"

Zico: ✅ PR created targeting development branch
```

---

## ✨ Success Looks Like

After refactoring phase:

```
✅ All branches merged to development
✅ Development branch stable and tested
✅ All PRs reviewed and approved
✅ Code quality improved significantly
✅ TypeScript strict mode satisfied
✅ Test coverage >80%
✅ Performance metrics improved
✅ Bundle size reduced
✅ Ready for release
✅ Ready for new features/issues

Then:
Release branch created
Release PR to main
Deployed to Vercel
Start new issues/features phase
```

---

## 📞 When in Doubt

Ask Zico:

```
"What branch am I on?"
"show commits" (see recent work)
"show prs" (see pending reviews)
"show issues" (see refactoring tasks)
"status" (verify everything works)
```

---

## 🎯 Your Refactoring Success Metric

```
Foush's Side Project Refactoring:
✅ Code Quality: Excellent
✅ Type Safety: Complete
✅ Performance: Optimized
✅ Test Coverage: >80%
✅ Ready for: Production + New Features

Timeline: Refactoring → Release → New Features
Deployment: Vercel (Auto-deploy from main)
```

---

**Manifesto Created**: February 5, 2026  
**For**: Foush (TechLead | Senior Frontend | DevOps)  
**Assistant**: Zico  
**Project**: FoushWare/elzatona_web  
**Current Phase**: Refactoring with Purpose  
**Goal**: Build the Best Version of Your Project
