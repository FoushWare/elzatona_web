#!/usr/bin/env bash

# Git Hook Configuration Manager
# Allows easy switching between different Git hook configurations

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Function to show usage
show_usage() {
    echo "Git Hook Configuration Manager"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  standard     - Use standard Git hooks (formatting + linting only)"
    echo "  admin-tests  - Use Git hooks with admin login tests"
    echo "  fast         - Use fast Git hooks (API tests only in pre-commit)"
    echo "  comprehensive - Use comprehensive Git hooks (all tests)"
    echo "  status       - Show current Git hook configuration"
    echo "  help         - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 admin-tests    # Enable admin login tests in Git hooks"
    echo "  $0 fast          # Use fast configuration for quick commits"
    echo "  $0 status        # Check current configuration"
}

# Function to backup current hooks
backup_hooks() {
    print_status "Creating backup of current Git hooks..."
    
    if [ -f ".husky/pre-commit" ]; then
        cp ".husky/pre-commit" ".husky/pre-commit.backup.$(date +%Y%m%d_%H%M%S)"
        print_success "Pre-commit hook backed up"
    fi
    
    if [ -f ".husky/pre-push" ]; then
        cp ".husky/pre-push" ".husky/pre-push.backup.$(date +%Y%m%d_%H%M%S)"
        print_success "Pre-push hook backed up"
    fi
}

# Function to set standard hooks
set_standard_hooks() {
    print_status "Setting up standard Git hooks..."
    
    backup_hooks
    
    # Copy standard hooks
    if [ -f ".husky/pre-commit" ]; then
        print_success "Using existing standard pre-commit hook"
    else
        print_warning "No standard pre-commit hook found"
    fi
    
    if [ -f ".husky/pre-push" ]; then
        print_success "Using existing standard pre-push hook"
    else
        print_warning "No standard pre-push hook found"
    fi
    
    print_success "Standard Git hooks configured"
    print_status "Pre-commit: Formatting + Linting"
    print_status "Pre-push: Build validation (development branches only)"
}

# Function to set admin test hooks
set_admin_test_hooks() {
    print_status "Setting up Git hooks with admin login tests..."
    
    backup_hooks
    
    # Copy admin test hooks
    if [ -f ".husky/pre-commit-with-admin-tests" ]; then
        cp ".husky/pre-commit-with-admin-tests" ".husky/pre-commit"
        print_success "Pre-commit hook with admin tests configured"
    else
        print_error "Admin test pre-commit hook not found"
        exit 1
    fi
    
    if [ -f ".husky/pre-push-with-admin-tests" ]; then
        cp ".husky/pre-push-with-admin-tests" ".husky/pre-push"
        print_success "Pre-push hook with admin tests configured"
    else
        print_error "Admin test pre-push hook not found"
        exit 1
    fi
    
    print_success "Admin test Git hooks configured"
    print_status "Pre-commit: Formatting + Linting + Fast Admin Tests"
    print_status "Pre-push: Build validation + Comprehensive Admin Tests"
}

# Function to set fast hooks
set_fast_hooks() {
    print_status "Setting up fast Git hooks..."
    
    backup_hooks
    
    # Copy fast hooks (same as admin tests but with fast tests)
    if [ -f ".husky/pre-commit-with-admin-tests" ]; then
        cp ".husky/pre-commit-with-admin-tests" ".husky/pre-commit"
        print_success "Fast pre-commit hook configured"
    else
        print_error "Fast pre-commit hook not found"
        exit 1
    fi
    
    if [ -f ".husky/pre-push-with-admin-tests" ]; then
        cp ".husky/pre-push-with-admin-tests" ".husky/pre-push"
        print_success "Fast pre-push hook configured"
    else
        print_error "Fast pre-push hook not found"
        exit 1
    fi
    
    print_success "Fast Git hooks configured"
    print_status "Pre-commit: Formatting + Linting + Fast Admin Tests (API only)"
    print_status "Pre-push: Build validation + Comprehensive Admin Tests"
}

# Function to set comprehensive hooks
set_comprehensive_hooks() {
    print_status "Setting up comprehensive Git hooks..."
    
    backup_hooks
    
    # Copy comprehensive hooks
    if [ -f ".husky/pre-commit-with-admin-tests" ]; then
        cp ".husky/pre-commit-with-admin-tests" ".husky/pre-commit"
        print_success "Comprehensive pre-commit hook configured"
    else
        print_error "Comprehensive pre-commit hook not found"
        exit 1
    fi
    
    if [ -f ".husky/pre-push-with-admin-tests" ]; then
        cp ".husky/pre-push-with-admin-tests" ".husky/pre-push"
        print_success "Comprehensive pre-push hook configured"
    else
        print_error "Comprehensive pre-push hook not found"
        exit 1
    fi
    
    print_success "Comprehensive Git hooks configured"
    print_status "Pre-commit: Formatting + Linting + Fast Admin Tests"
    print_status "Pre-push: Build validation + Comprehensive Admin Tests + Coverage"
}

# Function to show current status
show_status() {
    print_status "Current Git hook configuration:"
    echo ""
    
    if [ -f ".husky/pre-commit" ]; then
        echo "📝 Pre-commit hook:"
        if grep -q "admin-login-api.test.ts" ".husky/pre-commit"; then
            print_success "  ✅ Admin login tests enabled"
        else
            print_warning "  ⚠️  Admin login tests not enabled"
        fi
        
        if grep -q "npm run format" ".husky/pre-commit"; then
            print_success "  ✅ Prettier formatting enabled"
        else
            print_warning "  ⚠️  Prettier formatting not enabled"
        fi
        
        if grep -q "npm run lint" ".husky/pre-commit"; then
            print_success "  ✅ ESLint linting enabled"
        else
            print_warning "  ⚠️  ESLint linting not enabled"
        fi
    else
        print_error "  ❌ No pre-commit hook found"
    fi
    
    echo ""
    
    if [ -f ".husky/pre-push" ]; then
        echo "🚀 Pre-push hook:"
        if grep -q "npm run build" ".husky/pre-push"; then
            print_success "  ✅ Build validation enabled"
        else
            print_warning "  ⚠️  Build validation not enabled"
        fi
        
        if grep -q "test:admin-login" ".husky/pre-push"; then
            print_success "  ✅ Admin login tests enabled"
        else
            print_warning "  ⚠️  Admin login tests not enabled"
        fi
    else
        print_error "  ❌ No pre-push hook found"
    fi
    
    echo ""
    print_status "Available configurations:"
    echo "  • standard      - Basic formatting and linting"
    echo "  • admin-tests    - Includes admin login tests"
    echo "  • fast          - Fast tests for quick commits"
    echo "  • comprehensive - Full test suite with coverage"
}

# Main script logic
case "${1:-help}" in
    "standard")
        set_standard_hooks
        ;;
    "admin-tests")
        set_admin_test_hooks
        ;;
    "fast")
        set_fast_hooks
        ;;
    "comprehensive")
        set_comprehensive_hooks
        ;;
    "status")
        show_status
        ;;
    "help"|"-h"|"--help")
        show_usage
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        show_usage
        exit 1
        ;;
esac
