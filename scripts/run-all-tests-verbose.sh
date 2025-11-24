#!/bin/bash

# Complete Test Suite Execution Script (Verbose Mode)
# Shows full output for debugging

echo "🧪 Starting Complete Test Suite Execution (Verbose Mode)..."
echo "=========================================="
echo ""

# Task 2: Admin Login
echo ""
echo "📋 Task 2: Admin Login"
echo "----------------------"
echo "🧪 Running Unit Tests..."
npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx
echo ""
echo "🔗 Running Integration Tests..."
npm run test:integration -- apps/website/src/app/admin/login/page.integration.test.tsx
echo ""
echo "🌐 Running E2E Tests..."
npm run test:e2e:headed -- tests/e2e/admin/admin-login.spec.ts

# Task 3: Admin Dashboard
echo ""
echo "📋 Task 3: Admin Dashboard"
echo "--------------------------"
echo "🧪 Running Unit Tests..."
npm run test:unit -- apps/website/src/app/admin/dashboard/page.test.tsx
echo ""
echo "🔗 Running Integration Tests..."
npm run test:integration -- apps/website/src/app/admin/dashboard/page.integration.test.tsx
echo ""
echo "🌐 Running E2E Tests..."
npm run test:e2e:headed -- tests/e2e/admin/admin-dashboard.spec.ts

# Task 1: Question Management
echo ""
echo "📋 Task 1: Question Management"
echo "--------------------------------"
echo "🧪 Running Unit Tests..."
npm run test:unit -- apps/website/src/app/admin/content/questions/page.test.tsx
echo ""
echo "🔗 Running Integration Tests..."
npm run test:integration -- apps/website/src/app/admin/content/questions/page.integration.test.tsx
echo ""
echo "🌐 Running E2E Tests (all suites)..."
npm run test:e2e:admin:questions

# Task G-006: Guided Practice
echo ""
echo "📋 Task G-006: Guided Practice"
echo "------------------------------"
echo "🧪 Running Unit Tests..."
npm run test:unit -- apps/website/src/app/guided-practice/page.test.tsx
echo ""
echo "🔗 Running Integration Tests..."
npm run test:integration -- apps/website/src/app/guided-practice/page.integration.test.tsx
echo ""
echo "🌐 Running E2E Tests..."
npm run test:e2e:headed -- tests/e2e/guided-flow/guided-practice-localStorage.spec.ts

echo ""
echo "✅ All Tests Complete!"
echo "=========================================="

