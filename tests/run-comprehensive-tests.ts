#!/usr/bin/env tsx

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

interface TestResult {
  suite: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  tests: number;
  failures: number;
  errors: string[];
}

interface TestSummary {
  totalSuites: number;
  totalTests: number;
  totalFailures: number;
  totalDuration: number;
  results: TestResult[];
  coverage?: {
    statements: number;
    branches: number;
    functions: number;
    lines: number;
  };
}

class ComprehensiveTestRunner {
  private results: TestResult[] = [];
  private startTime: number = 0;

  async runAllTests(): Promise<TestSummary> {
    console.log('🚀 Starting Comprehensive Test Suite...\n');
    this.startTime = Date.now();

    const testSuites = [
      { name: 'Unit Tests', command: 'npm run test:unit' },
      { name: 'Integration Tests', command: 'npm run test:integration' },
      { name: 'API Tests', command: 'npm run test:api' },
      { name: 'Component Tests', command: 'npm run test:components' },
      { name: 'Hook Tests', command: 'npm run test:hooks' },
      { name: 'Service Tests', command: 'npm run test:services' },
      { name: 'Admin Tests', command: 'npm run test:admin' },
      { name: 'E2E Tests', command: 'npm run test:e2e' },
      { name: 'Performance Tests', command: 'npm run test:performance' },
      { name: 'Accessibility Tests', command: 'npm run test:accessibility' },
    ];

    for (const suite of testSuites) {
      await this.runTestSuite(suite);
    }

    return this.generateSummary();
  }

  private async runTestSuite(suite: {
    name: string;
    command: string;
  }): Promise<void> {
    console.log(`📋 Running ${suite.name}...`);

    try {
      const startTime = Date.now();
      const output = execSync(suite.command, {
        encoding: 'utf8',
        stdio: 'pipe',
        cwd: process.cwd(),
      });
      const duration = Date.now() - startTime;

      // Parse test results from output
      const result = this.parseTestOutput(output, suite.name, duration);
      this.results.push(result);

      console.log(`✅ ${suite.name} completed in ${duration}ms`);
    } catch (error: any) {
      const duration = Date.now() - this.startTime;
      const result: TestResult = {
        suite: suite.name,
        status: 'failed',
        duration,
        tests: 0,
        failures: 1,
        errors: [error.message || 'Unknown error'],
      };
      this.results.push(result);

      console.log(`❌ ${suite.name} failed: ${error.message}`);
    }
  }

  private parseTestOutput(
    output: string,
    suiteName: string,
    duration: number
  ): TestResult {
    // Simple parsing - in a real implementation, you'd use a proper test result parser
    const lines = output.split('\n');
    const testLine = lines.find(
      line => line.includes('Tests:') || line.includes('test')
    );
    const failureLine = lines.find(
      line => line.includes('Failures:') || line.includes('failed')
    );

    const tests = this.extractNumber(testLine, 0);
    const failures = this.extractNumber(failureLine, 0);
    const errors = lines.filter(
      line => line.includes('Error:') || line.includes('FAIL')
    );

    return {
      suite: suiteName,
      status: failures > 0 ? 'failed' : 'passed',
      duration,
      tests,
      failures,
      errors: errors.slice(0, 5), // Limit to first 5 errors
    };
  }

  private extractNumber(
    text: string | undefined,
    defaultValue: number
  ): number {
    if (!text) return defaultValue;
    const match = text.match(/(\d+)/);
    return match ? parseInt(match[1]) : defaultValue;
  }

  private generateSummary(): TestSummary {
    const totalSuites = this.results.length;
    const totalTests = this.results.reduce(
      (sum, result) => sum + result.tests,
      0
    );
    const totalFailures = this.results.reduce(
      (sum, result) => sum + result.failures,
      0
    );
    const totalDuration = Date.now() - this.startTime;

    // Try to get coverage information
    let coverage;
    try {
      const coveragePath = path.join(
        process.cwd(),
        'coverage',
        'coverage-summary.json'
      );
      if (fs.existsSync(coveragePath)) {
        const coverageData = JSON.parse(fs.readFileSync(coveragePath, 'utf8'));
        coverage = coverageData.total;
      }
    } catch (error) {
      // Coverage not available
    }

    return {
      totalSuites,
      totalTests,
      totalFailures,
      totalDuration,
      results: this.results,
      coverage,
    };
  }

  generateReport(summary: TestSummary): void {
    const report = `
# 🧪 Comprehensive Test Report

## 📊 Summary
- **Total Test Suites**: ${summary.totalSuites}
- **Total Tests**: ${summary.totalTests}
- **Total Failures**: ${summary.totalFailures}
- **Total Duration**: ${summary.totalDuration}ms
- **Success Rate**: ${(((summary.totalTests - summary.totalFailures) / summary.totalTests) * 100).toFixed(2)}%

## 📋 Test Suite Results

${summary.results
  .map(
    result => `
### ${result.suite}
- **Status**: ${result.status === 'passed' ? '✅ Passed' : '❌ Failed'}
- **Duration**: ${result.duration}ms
- **Tests**: ${result.tests}
- **Failures**: ${result.failures}
${result.errors.length > 0 ? `- **Errors**: ${result.errors.join(', ')}` : ''}
`
  )
  .join('')}

## 🎯 Coverage Report
${
  summary.coverage
    ? `
- **Statements**: ${summary.coverage.statements}%
- **Branches**: ${summary.coverage.branches}%
- **Functions**: ${summary.coverage.functions}%
- **Lines**: ${summary.coverage.lines}%
`
    : 'Coverage information not available'
}

## 🚀 Test Categories

### Unit Tests
- Component unit tests
- Hook unit tests
- Service unit tests
- Utility function tests

### Integration Tests
- API integration tests
- Database integration tests
- Component integration tests
- Authentication flow tests

### End-to-End Tests
- User journey tests
- Admin panel tests
- Learning paths flow tests
- Question management tests

### Performance Tests
- Page load performance
- API response times
- Memory usage tests
- Core Web Vitals tests

### Accessibility Tests
- WCAG compliance tests
- Screen reader compatibility
- Keyboard navigation tests
- Color contrast tests

## 🔧 Test Commands

\`\`\`bash
# Run all tests
npm run test:all

# Run specific test categories
npm run test:unit
npm run test:integration
npm run test:e2e
npm run test:performance
npm run test:accessibility

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch
\`\`\`

## 📁 Test Structure

\`\`\`
tests/
├── api/                    # API route tests
├── unit/                   # Unit tests
│   ├── components/         # Component tests
│   ├── hooks/             # Hook tests
│   └── services/          # Service tests
├── integration/            # Integration tests
├── e2e/                   # End-to-end tests
├── performance/           # Performance tests
├── accessibility/         # Accessibility tests
└── admin/                 # Admin-specific tests
\`\`\`

## 🎉 Conclusion

${
  summary.totalFailures === 0
    ? '🎉 All tests passed successfully! The application is ready for production.'
    : `⚠️ ${summary.totalFailures} test(s) failed. Please review and fix the failing tests.`
}

Generated on: ${new Date().toISOString()}
    `;

    // Write report to file
    const reportPath = path.join(process.cwd(), 'test-report.md');
    fs.writeFileSync(reportPath, report);

    console.log('\n📄 Test report generated: test-report.md');
    console.log(report);
  }
}

// Main execution
async function main() {
  const runner = new ComprehensiveTestRunner();

  try {
    const summary = await runner.runAllTests();
    runner.generateReport(summary);

    // Exit with appropriate code
    process.exit(summary.totalFailures > 0 ? 1 : 0);
  } catch (error) {
    console.error('❌ Test runner failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { ComprehensiveTestRunner };
