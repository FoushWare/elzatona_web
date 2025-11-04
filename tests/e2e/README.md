# 🧪 End-to-End Testing Guide

## Overview

This guide covers the comprehensive end-to-end testing suite for user learning paths and progress tracking. The E2E tests ensure that all user journeys work correctly across different browsers and devices.

## 🎯 Test Coverage

### User Learning Paths (`user-learning-paths.spec.ts`)

- **Authentication Flow**: Sign up, sign in, session persistence, sign out
- **Learning Path Navigation**: Display paths, select paths, start learning
- **Progress Tracking**: Track progress through sections, save to Firebase
- **Guided vs Free-Style Learning**: Mode switching, progress maintenance
- **Custom Roadmap Creation**: Create, manage, edit, delete custom roadmaps
- **Performance and Error Handling**: Network errors, slow loading, performance metrics
- **Cross-Browser Compatibility**: Chrome, Firefox, Safari, mobile browsers

### Progress Tracking and Analytics (`progress-tracking-analytics.spec.ts`)

- **Progress Persistence**: Across browser sessions, multiple devices
- **Analytics and Reporting**: Dashboard, category breakdown, progress reports
- **Achievement and Badge System**: Milestone badges, achievement progress
- **Performance Metrics**: Time tracking, accuracy, learning velocity
- **Data Consistency and Integrity**: Concurrent updates, corruption handling

### AI Interviewer Integration (`ai-interviewer-integration.spec.ts`)

- **AI Interviewer Setup**: Initialization, camera/microphone permissions
- **Interview Session Management**: Start/end, pause/resume, time limits
- **Question Management**: Learning path integration, adaptive difficulty
- **Real-time Communication**: Video/audio streams, quality changes
- **Learning Path Integration**: Progress sync, personalized recommendations
- **Error Handling and Recovery**: Network issues, service failures, compatibility

## 🚀 Getting Started

### Prerequisites

1. **Node.js** (v18 or higher)
2. **npm** or **yarn**
3. **Development server** running on `http://localhost:3000`

### Installation

```bash
# Install Playwright browsers
npm run test:e2e:install

# Or install manually
npx playwright install
```

### Running Tests

#### Basic Commands

```bash
# Run all E2E tests
npm run test:e2e

# Run tests with UI (interactive mode)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Debug tests step by step
npm run test:e2e:debug
```

#### Browser-Specific Tests

```bash
# Run tests in specific browsers
npm run test:e2e:chromium
npm run test:e2e:firefox
npm run test:e2e:webkit

# Run mobile tests
npm run test:e2e:mobile
```

#### Test Reports

```bash
# View test report
npm run test:e2e:report

# Generate code for new tests
npm run test:e2e:codegen
```

## 📁 Test Structure

```
tests/e2e/
├── user-learning-paths.spec.ts          # Main user journey tests
├── progress-tracking-analytics.spec.ts # Progress and analytics tests
├── ai-interviewer-integration.spec.ts  # AI Interviewer tests
├── global-setup.ts                      # Global test setup
└── global-teardown.ts                   # Global test cleanup
```

## 🔧 Configuration

### Playwright Configuration (`playwright.config.ts`)

- **Browsers**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Base URL**: `http://localhost:3000`
- **Timeouts**: 30s test timeout, 10s expect timeout
- **Artifacts**: Screenshots on failure, videos on failure, traces on retry
- **Global Setup/Teardown**: Database setup, mock data, cleanup

### Test Data

- **Test Users**: Pre-configured test accounts
- **Mock Learning Paths**: Frontend Basics, React Mastery
- **Mock Questions**: HTML, CSS, JavaScript questions
- **Mock Progress**: User progress tracking data

## 🎭 Test Scenarios

### 1. Complete User Journey

```typescript
test('should complete full learning journey', async ({ page }) => {
  // 1. Sign up and authenticate
  // 2. Choose learning mode (guided/free-style)
  // 3. Select learning path
  // 4. Complete questions and track progress
  // 5. View analytics and achievements
  // 6. Create custom roadmap
  // 7. Sync progress across devices
});
```

### 2. Progress Persistence

```typescript
test('should persist progress across sessions', async ({ page }) => {
  // 1. Sign in and make progress
  // 2. Close browser (simulate session end)
  // 3. Sign in again
  // 4. Verify progress is restored
});
```

### 3. AI Interviewer Integration

```typescript
test('should integrate AI Interviewer with learning paths', async ({
  page,
}) => {
  // 1. Complete learning path questions
  // 2. Start AI interview with same path
  // 3. Verify adaptive questioning
  // 4. Sync progress back to learning path
});
```

## 🐛 Debugging Tests

### Debug Mode

```bash
# Run specific test in debug mode
npx playwright test user-learning-paths.spec.ts --debug

# Debug specific test by name
npx playwright test --grep "should persist progress" --debug
```

### Visual Debugging

```bash
# Run with UI for visual debugging
npm run test:e2e:ui

# Run in headed mode to see browser
npm run test:e2e:headed
```

### Trace Viewer

```bash
# View detailed test traces
npx playwright show-trace test-results/trace.zip
```

## 📊 Test Reports

### HTML Report

```bash
# Generate and view HTML report
npm run test:e2e:report
```

### JSON Report

```bash
# JSON results available at
test-results/e2e-results.json
```

### JUnit Report

```bash
# JUnit results available at
test-results/e2e-results.xml
```

## 🔍 Test Data Management

### Mock Data Setup

- **Learning Paths**: Pre-defined paths with sectors and questions
- **User Accounts**: Test users with different progress levels
- **Progress Data**: Mock progress tracking data
- **Achievements**: Badge and achievement data

### Data Cleanup

- **Global Setup**: Clears existing data, sets up mock data
- **Global Teardown**: Cleans up test data, generates reports
- **Per-Test**: Each test manages its own data state

## 🚨 Common Issues and Solutions

### 1. Browser Installation Issues

```bash
# Reinstall browsers
npx playwright install --force
```

### 2. Permission Issues

```bash
# Grant camera/microphone permissions
# Tests automatically handle permission prompts
```

### 3. Network Issues

```bash
# Check if dev server is running
curl http://localhost:3000

# Restart dev server if needed
npm run dev
```

### 4. Test Timeouts

```bash
# Increase timeout in playwright.config.ts
timeout: 60 * 1000, // 60 seconds
```

## 📈 Performance Testing

### Load Testing

```typescript
test('should handle multiple concurrent users', async ({ page, context }) => {
  // Create multiple browser contexts
  // Simulate concurrent user sessions
  // Verify system performance
});
```

### Performance Metrics

- **Page Load Time**: < 3 seconds
- **API Response Time**: < 1 second
- **Progress Sync Time**: < 500ms
- **Video Stream Latency**: < 200ms

## 🔄 Continuous Integration

### GitHub Actions

```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run test:e2e:install
      - run: npm run test:e2e
```

### Test Results

- **Screenshots**: On test failures
- **Videos**: On test failures
- **Traces**: On test retries
- **Reports**: HTML, JSON, JUnit formats

## 📚 Best Practices

### 1. Test Organization

- Group related tests in `describe` blocks
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

### 2. Data Management

- Use mock data for consistent testing
- Clean up data between tests
- Avoid dependencies between tests

### 3. Error Handling

- Test both success and failure scenarios
- Verify error messages and recovery
- Test edge cases and boundary conditions

### 4. Performance

- Keep tests fast and focused
- Use appropriate timeouts
- Avoid unnecessary waits

## 🎉 Success Metrics

### Test Coverage Goals

- **User Journeys**: 100% coverage of critical paths
- **Browser Compatibility**: Chrome, Firefox, Safari, Mobile
- **Error Scenarios**: Network, permission, service failures
- **Performance**: Load times, response times, sync times

### Quality Metrics

- **Test Reliability**: > 95% pass rate
- **Test Speed**: < 10 minutes total runtime
- **Coverage**: All user-facing features tested
- **Maintenance**: Easy to update and extend

---

**Test Suite Version**: 1.0.0  
**Last Updated**: December 2024  
**Maintainer**: Development Team
