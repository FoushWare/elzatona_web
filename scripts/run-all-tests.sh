#!/bin/bash

# Comprehensive Test Runner for Frontend KodDev
# This script runs all types of tests: unit, integration, E2E, and Storybook

set -e

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

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to run tests with error handling
run_test() {
    local test_name="$1"
    local test_command="$2"
    
    print_status "Running $test_name..."
    
    if eval "$test_command"; then
        print_success "$test_name completed successfully"
        return 0
    else
        print_error "$test_name failed"
        return 1
    fi
}

# Main test execution function
main() {
    print_status "Starting comprehensive test suite for Frontend KodDev"
    echo "=================================================="
    
    local failed_tests=()
    local total_tests=0
    
    # Check prerequisites
    print_status "Checking prerequisites..."
    
    if ! command_exists npm; then
        print_error "npm is not installed. Please install Node.js and npm."
        exit 1
    fi
    
    if ! command_exists npx; then
        print_error "npx is not available. Please update Node.js."
        exit 1
    fi
    
    print_success "Prerequisites check passed"
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        print_status "Installing dependencies..."
        npm install
    fi
    
    # 1. Unit Tests
    print_status "Starting Unit Tests..."
    echo "----------------------------------------"
    
    if run_test "Unit Tests" "npm run test:unit"; then
        print_success "Unit tests passed"
    else
        failed_tests+=("Unit Tests")
    fi
    total_tests=$((total_tests + 1))
    
    # 2. Integration Tests
    print_status "Starting Integration Tests..."
    echo "----------------------------------------"
    
    if run_test "Integration Tests" "npm run test:integration"; then
        print_success "Integration tests passed"
    else
        failed_tests+=("Integration Tests")
    fi
    total_tests=$((total_tests + 1))
    
    # 3. E2E Tests
    print_status "Starting E2E Tests..."
    echo "----------------------------------------"
    
    # Check if Playwright is installed
    if ! command_exists npx playwright; then
        print_warning "Playwright not found. Installing Playwright..."
        npx playwright install
    fi
    
    if run_test "E2E Tests" "npm run test:e2e"; then
        print_success "E2E tests passed"
    else
        failed_tests+=("E2E Tests")
    fi
    total_tests=$((total_tests + 1))
    
    # 4. Storybook Tests
    print_status "Starting Storybook Tests..."
    echo "----------------------------------------"
    
    if run_test "Storybook Tests" "npm run test:storybook"; then
        print_success "Storybook tests passed"
    else
        failed_tests+=("Storybook Tests")
    fi
    total_tests=$((total_tests + 1))
    
    # 5. Linting
    print_status "Running Linting..."
    echo "----------------------------------------"
    
    if run_test "ESLint" "npm run lint"; then
        print_success "Linting passed"
    else
        failed_tests+=("ESLint")
    fi
    total_tests=$((total_tests + 1))
    
    # 6. Type Checking
    print_status "Running Type Checking..."
    echo "----------------------------------------"
    
    if run_test "TypeScript Check" "npm run type-check"; then
        print_success "Type checking passed"
    else
        failed_tests+=("TypeScript Check")
    fi
    total_tests=$((total_tests + 1))
    
    # 7. Build Test
    print_status "Testing Build..."
    echo "----------------------------------------"
    
    if run_test "Build Test" "npm run build"; then
        print_success "Build test passed"
    else
        failed_tests+=("Build Test")
    fi
    total_tests=$((total_tests + 1))
    
    # Summary
    echo "=================================================="
    print_status "Test Suite Summary"
    echo "=================================================="
    
    local passed_tests=$((total_tests - ${#failed_tests[@]}))
    
    print_status "Total Tests: $total_tests"
    print_success "Passed: $passed_tests"
    
    if [ ${#failed_tests[@]} -gt 0 ]; then
        print_error "Failed: ${#failed_tests[@]}"
        print_error "Failed Tests:"
        for test in "${failed_tests[@]}"; do
            print_error "  - $test"
        done
        echo ""
        print_error "Some tests failed. Please check the output above for details."
        exit 1
    else
        print_success "All tests passed! 🎉"
        echo ""
        print_status "Test coverage and reports:"
        print_status "  - Unit test coverage: coverage/lcov-report/index.html"
        print_status "  - E2E test report: playwright-report/index.html"
        print_status "  - Storybook: npm run storybook"
        exit 0
    fi
}

# Function to run specific test types
run_specific() {
    case "$1" in
        "unit")
            print_status "Running Unit Tests only..."
            npm run test:unit
            ;;
        "integration")
            print_status "Running Integration Tests only..."
            npm run test:integration
            ;;
        "e2e")
            print_status "Running E2E Tests only..."
            npm run test:e2e
            ;;
        "storybook")
            print_status "Running Storybook Tests only..."
            npm run test:storybook
            ;;
        "lint")
            print_status "Running Linting only..."
            npm run lint
            ;;
        "type-check")
            print_status "Running Type Checking only..."
            npm run type-check
            ;;
        "build")
            print_status "Running Build Test only..."
            npm run build
            ;;
        *)
            print_error "Unknown test type: $1"
            print_status "Available options: unit, integration, e2e, storybook, lint, type-check, build"
            exit 1
            ;;
    esac
}

# Help function
show_help() {
    echo "Frontend KodDev Test Runner"
    echo ""
    echo "Usage: $0 [OPTION]"
    echo ""
    echo "Options:"
    echo "  (no option)    Run all tests"
    echo "  unit           Run unit tests only"
    echo "  integration    Run integration tests only"
    echo "  e2e            Run E2E tests only"
    echo "  storybook      Run Storybook tests only"
    echo "  lint           Run linting only"
    echo "  type-check     Run TypeScript checking only"
    echo "  build          Run build test only"
    echo "  help           Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                 # Run all tests"
    echo "  $0 unit           # Run only unit tests"
    echo "  $0 e2e            # Run only E2E tests"
}

# Parse command line arguments
case "${1:-}" in
    "help"|"-h"|"--help")
        show_help
        exit 0
        ;;
    "")
        main
        ;;
    *)
        run_specific "$1"
        ;;
esac
