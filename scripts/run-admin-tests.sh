#!/bin/bash

# This script runs all admin-related tests (unit, integration, api, e2e).
# It ensures the Next.js server is running for E2E tests.

echo "🚀 Starting comprehensive admin tests..."

# Run the TypeScript test runner
tsx tests/admin/run-admin-tests.ts

# Check the exit code of the tsx command
if [ $? -eq 0 ]; then
  echo "🎉 All admin tests completed successfully!"
else
  echo "❌ Some admin tests failed."
  exit 1
fi