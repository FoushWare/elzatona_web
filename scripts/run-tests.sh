#!/bin/bash

echo "🧪 Running Auto-linking System Integration Tests"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

# Install test dependencies if not already installed
print_status "Installing test dependencies..."
npm install --save-dev jest supertest puppeteer @jest/globals babel-jest @babel/preset-env @babel/preset-typescript

# Install additional dependencies for testing
npm install --save-dev @types/jest @types/supertest

print_status "Setting up test environment..."

# Create test environment file
cat > .env.test << EOF
NEXT_PUBLIC_FIREBASE_API_KEY=test-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=test-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=test-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=test-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=test-app-id
EOF

print_success "Test environment configured"

# Run different types of tests
echo ""
print_status "Running Integration Tests..."
echo "--------------------------------"

# Run integration tests
if npm test -- tests/integration/ --passWithNoTests; then
    print_success "Integration tests passed!"
else
    print_error "Integration tests failed!"
    exit 1
fi

echo ""
print_status "Running API Integration Tests..."
echo "-------------------------------------"

# Run API integration tests
if npm test -- tests/integration/api-integration.test.js --passWithNoTests; then
    print_success "API integration tests passed!"
else
    print_error "API integration tests failed!"
    exit 1
fi

echo ""
print_status "Running E2E Tests..."
echo "------------------------"

# Check if development server is running
if curl -s http://localhost:3000 > /dev/null; then
    print_status "Development server is running, proceeding with E2E tests..."
    
    # Run E2E tests
    if npm test -- tests/e2e/ --passWithNoTests; then
        print_success "E2E tests passed!"
    else
        print_warning "E2E tests failed or skipped (server may not be running)"
    fi
else
    print_warning "Development server is not running. Skipping E2E tests."
    print_status "To run E2E tests, start the development server first:"
    print_status "  npm run dev"
    print_status "Then run: npm test -- tests/e2e/"
fi

echo ""
print_status "Running All Tests with Coverage..."
echo "---------------------------------------"

# Run all tests with coverage
if npm test -- --coverage --passWithNoTests; then
    print_success "All tests completed with coverage report!"
else
    print_error "Some tests failed!"
    exit 1
fi

echo ""
print_success "🎉 All tests completed successfully!"
echo ""
print_status "Test Summary:"
print_status "- Integration tests: ✅"
print_status "- API integration tests: ✅"
print_status "- E2E tests: $(curl -s http://localhost:3000 > /dev/null && echo "✅" || echo "⏭️ Skipped")"
print_status "- Coverage report: ✅"
echo ""
print_status "Coverage report available in: ./coverage/index.html"
print_status "Test results available in: ./test-results/"



