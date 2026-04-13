#!/bin/bash
cd /Users/a.fouad/S/New_elzatona
npx vitest run apps/website/src/app/lib/frontend-task-validator.test.ts --coverage --coverage.provider=v8 --coverage.reporter=text-summary --coverage.reporter=lcov 2>&1 | tee /tmp/coverage-test-output.txt
echo "Test completed. Exit code: $?"
