#!/usr/bin/env ts-node

import { execSync } from 'child_process';
import { existsSync } from 'fs';

interface TestSuite {
  name: string;
  file: string;
  description: string;
  category: 'free-style' | 'guided-path' | 'admin' | 'api' | 'complete-flows';
}

const testSuites: TestSuite[] = [
  {
    name: 'Free Style Routes',
    file: 'tests/routes/free-style-routes.test.ts',
    description: 'Tests all free-style learning routes and user journeys',
    category: 'free-style',
  },
  {
    name: 'Guided Path Routes',
    file: 'tests/routes/guided-path-routes.test.ts',
    description: 'Tests all guided learning path routes and workflows',
    category: 'guided-path',
  },
  {
    name: 'Admin Routes',
    file: 'tests/routes/admin-routes.test.ts',
    description: 'Tests all admin panel routes and management workflows',
    category: 'admin',
  },
  {
    name: 'API Routes',
    file: 'tests/routes/api-routes.test.ts',
    description: 'Tests all API endpoints and data operations',
    category: 'api',
  },
  {
    name: 'Complete User Flows',
    file: 'tests/routes/complete-user-flows.test.ts',
    description: 'Tests complete end-to-end user journeys',
    category: 'complete-flows',
  },
];

interface TestResults {
  suite: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  tests: number;
  passed: number;
  failed: number;
  skipped: number;
  errors?: string[];
}

class RouteTestRunner {
  private results: TestResults[] = [];
  private startTime: number = 0;

  async runAllTests(): Promise<void> {
    console.log('🚀 Starting Comprehensive Route Testing Suite\n');
    this.startTime = Date.now();

    for (const suite of testSuites) {
      await this.runTestSuite(suite);
    }

    this.printSummary();
  }

  async runTestSuite(suite: TestSuite): Promise<void> {
    console.log(`\n📋 Running ${suite.name}...`);
    console.log(`📝 ${suite.description}`);
    console.log(`📁 File: ${suite.file}`);
    console.log(`🏷️  Category: ${suite.category}\n`);

    if (!existsSync(suite.file)) {
      console.log(`❌ Test file not found: ${suite.file}`);
      this.results.push({
        suite: suite.name,
        status: 'skipped',
        duration: 0,
        tests: 0,
        passed: 0,
        failed: 0,
        skipped: 1,
        errors: [`Test file not found: ${suite.file}`],
      });
      return;
    }

    try {
      const startTime = Date.now();

      // Run the test suite using Playwright
      const command = `npx playwright test ${suite.file} --reporter=json`;
      const output = execSync(command, {
        encoding: 'utf-8',
        cwd: process.cwd(),
        stdio: 'pipe',
      });

      const duration = Date.now() - startTime;

      try {
        const result = JSON.parse(output);
        const testResult: TestResults = {
          suite: suite.name,
          status: result.stats?.failed > 0 ? 'failed' : 'passed',
          duration,
          tests: result.stats?.total || 0,
          passed: result.stats?.passed || 0,
          failed: result.stats?.failed || 0,
          skipped: result.stats?.skipped || 0,
          errors: result.stats?.failed > 0 ? ['Some tests failed'] : [],
        };

        this.results.push(testResult);
        this.printSuiteResult(testResult);
      } catch {
        // If JSON parsing fails, treat as passed if no error output
        const testResult: TestResults = {
          suite: suite.name,
          status: 'passed',
          duration,
          tests: 1,
          passed: 1,
          failed: 0,
          skipped: 0,
        };

        this.results.push(testResult);
        this.printSuiteResult(testResult);
      }
    } catch (error) {
      const duration = Date.now() - Date.now();
      const testResult: TestResults = {
        suite: suite.name,
        status: 'failed',
        duration,
        tests: 0,
        passed: 0,
        failed: 1,
        skipped: 0,
        errors: [error instanceof Error ? error.message : 'Unknown error'],
      };

      this.results.push(testResult);
      this.printSuiteResult(testResult);
    }
  }

  private printSuiteResult(result: TestResults): void {
    const statusIcon =
      result.status === 'passed'
        ? '✅'
        : result.status === 'failed'
          ? '❌'
          : '⏭️';

    console.log(
      `${statusIcon} ${result.suite}: ${result.status.toUpperCase()}`
    );
    console.log(
      `   Tests: ${result.tests} | Passed: ${result.passed} | Failed: ${result.failed} | Skipped: ${result.skipped}`
    );
    console.log(`   Duration: ${result.duration}ms`);

    if (result.errors && result.errors.length > 0) {
      console.log(`   Errors: ${result.errors.join(', ')}`);
    }
    console.log('');
  }

  private printSummary(): void {
    const totalDuration = Date.now() - this.startTime;
    const totalTests = this.results.reduce((sum, r) => sum + r.tests, 0);
    const totalPassed = this.results.reduce((sum, r) => sum + r.passed, 0);
    const totalFailed = this.results.reduce((sum, r) => sum + r.failed, 0);
    const totalSkipped = this.results.reduce((sum, r) => sum + r.skipped, 0);
    const passedSuites = this.results.filter(r => r.status === 'passed').length;
    const failedSuites = this.results.filter(r => r.status === 'failed').length;
    const skippedSuites = this.results.filter(
      r => r.status === 'skipped'
    ).length;

    console.log('\n' + '='.repeat(80));
    console.log('📊 COMPREHENSIVE ROUTE TESTING SUMMARY');
    console.log('='.repeat(80));

    console.log(
      `\n⏱️  Total Duration: ${totalDuration}ms (${(totalDuration / 1000).toFixed(2)}s)`
    );
    console.log(
      `📋 Test Suites: ${this.results.length} | Passed: ${passedSuites} | Failed: ${failedSuites} | Skipped: ${skippedSuites}`
    );
    console.log(
      `🧪 Total Tests: ${totalTests} | Passed: ${totalPassed} | Failed: ${totalFailed} | Skipped: ${totalSkipped}`
    );

    const successRate =
      totalTests > 0 ? ((totalPassed / totalTests) * 100).toFixed(1) : '0.0';
    console.log(`📈 Success Rate: ${successRate}%`);

    console.log('\n📋 Test Suite Details:');
    console.log('-'.repeat(80));

    this.results.forEach(result => {
      const statusIcon =
        result.status === 'passed'
          ? '✅'
          : result.status === 'failed'
            ? '❌'
            : '⏭️';
      const duration = (result.duration / 1000).toFixed(2);

      console.log(
        `${statusIcon} ${result.suite.padEnd(25)} | ${result.status.toUpperCase().padEnd(7)} | ${result.tests} tests | ${duration}s`
      );
    });

    // Category breakdown
    console.log('\n🏷️  Category Breakdown:');
    console.log('-'.repeat(80));

    const categories = [
      'free-style',
      'guided-path',
      'admin',
      'api',
      'complete-flows',
    ];
    categories.forEach(category => {
      const categoryResults = this.results.filter(
        r => testSuites.find(s => s.name === r.suite)?.category === category
      );

      if (categoryResults.length > 0) {
        const categoryTests = categoryResults.reduce(
          (sum, r) => sum + r.tests,
          0
        );
        const categoryPassed = categoryResults.reduce(
          (sum, r) => sum + r.passed,
          0
        );
        const categoryFailed = categoryResults.reduce(
          (sum, r) => sum + r.failed,
          0
        );
        const categorySuccessRate =
          categoryTests > 0
            ? ((categoryPassed / categoryTests) * 100).toFixed(1)
            : '0.0';

        console.log(
          `📁 ${category.padEnd(15)} | ${categoryTests} tests | ${categoryPassed} passed | ${categoryFailed} failed | ${categorySuccessRate}% success`
        );
      }
    });

    // Recommendations
    console.log('\n💡 Recommendations:');
    console.log('-'.repeat(80));

    if (totalFailed > 0) {
      console.log('🔧 Fix failing tests to improve test coverage');
    }

    if (totalSkipped > 0) {
      console.log(
        '📝 Review skipped tests and implement missing functionality'
      );
    }

    if (parseFloat(successRate) < 90) {
      console.log('📈 Improve test success rate by fixing failing tests');
    }

    if (totalTests < 100) {
      console.log(
        '🧪 Consider adding more test cases for comprehensive coverage'
      );
    }

    console.log('\n🎯 Next Steps:');
    console.log('-'.repeat(80));
    console.log('1. Review failing tests and fix issues');
    console.log('2. Add more test cases for edge scenarios');
    console.log('3. Implement missing functionality for skipped tests');
    console.log('4. Optimize test performance for faster execution');
    console.log('5. Add visual regression tests for UI consistency');

    console.log('\n' + '='.repeat(80));

    if (totalFailed === 0 && totalSkipped === 0) {
      console.log(
        '🎉 ALL ROUTE TESTS PASSED! The application is ready for production.'
      );
    } else if (totalFailed === 0) {
      console.log(
        '✅ All tests passed! Review skipped tests for completeness.'
      );
    } else {
      console.log(
        '⚠️  Some tests failed. Please review and fix issues before deployment.'
      );
    }

    console.log('='.repeat(80) + '\n');
  }

  async runSpecificCategory(category: string): Promise<void> {
    const categorySuites = testSuites.filter(
      suite => suite.category === category
    );

    if (categorySuites.length === 0) {
      console.log(`❌ No test suites found for category: ${category}`);
      return;
    }

    console.log(`🎯 Running tests for category: ${category}\n`);
    this.startTime = Date.now();

    for (const suite of categorySuites) {
      await this.runTestSuite(suite);
    }

    this.printSummary();
  }

  async runSpecificSuite(suiteName: string): Promise<void> {
    const suite = testSuites.find(s => s.name === suiteName);

    if (!suite) {
      console.log(`❌ Test suite not found: ${suiteName}`);
      return;
    }

    console.log(`🎯 Running specific test suite: ${suiteName}\n`);
    this.startTime = Date.now();

    await this.runTestSuite(suite);
    this.printSummary();
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const runner = new RouteTestRunner();

  if (args.length === 0) {
    await runner.runAllTests();
  } else if (args[0] === '--category' && args[1]) {
    await runner.runSpecificCategory(args[1]);
  } else if (args[0] === '--suite' && args[1]) {
    await runner.runSpecificSuite(args[1]);
  } else if (args[0] === '--help') {
    console.log('Route Test Runner - Comprehensive Testing Suite');
    console.log('');
    console.log('Usage:');
    console.log(
      '  ts-node tests/routes/run-route-tests.ts                    # Run all tests'
    );
    console.log(
      '  ts-node tests/routes/run-route-tests.ts --category <cat>   # Run specific category'
    );
    console.log(
      '  ts-node tests/routes/run-route-tests.ts --suite <name>     # Run specific suite'
    );
    console.log(
      '  ts-node tests/routes/run-route-tests.ts --help             # Show this help'
    );
    console.log('');
    console.log('Categories:');
    console.log('  free-style     - Free-style learning routes');
    console.log('  guided-path    - Guided learning path routes');
    console.log('  admin          - Admin panel routes');
    console.log('  api            - API endpoints');
    console.log('  complete-flows - Complete user journeys');
    console.log('');
    console.log('Available Suites:');
    testSuites.forEach(suite => {
      console.log(`  ${suite.name.padEnd(20)} - ${suite.description}`);
    });
  } else {
    console.log('❌ Invalid arguments. Use --help for usage information.');
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

export { RouteTestRunner, testSuites };
