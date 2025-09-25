#!/bin/bash

# Script to switch between different pre-commit configurations

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_usage() {
    echo "Usage: $0 [fast|standard|full|e2e]"
    echo ""
    echo "Available configurations:"
    echo "  fast      - Fast pre-commit checks (linting + build only)"
    echo "  standard  - Standard pre-commit checks (linting + unit/integration tests + build)"
    echo "  full      - Full pre-commit checks (linting + all tests + build + E2E)"
    echo "  e2e       - E2E pre-commit checks (linting + unit/integration + E2E with auto-resolution + build)"
    echo ""
    echo "Current configuration:"
    if [ -f ".husky/pre-commit" ]; then
        echo "  $(basename $(readlink .husky/pre-commit 2>/dev/null || echo .husky/pre-commit))"
    else
        echo "  None (pre-commit hook not found)"
    fi
}

switch_config() {
    local config="$1"
    local source_file=""
    local description=""
    
    case "$config" in
        "fast")
            source_file=".husky/pre-commit-fast"
            description="FAST pre-commit checks (linting + build only)"
            ;;
        "standard")
            source_file=".husky/pre-commit"
            description="STANDARD pre-commit checks (linting + unit/integration tests + build)"
            ;;
        "full")
            source_file=".husky/pre-commit-full"
            description="FULL pre-commit checks (linting + all tests + build + E2E)"
            ;;
        "e2e")
            source_file=".husky/pre-commit-e2e"
            description="E2E pre-commit checks (linting + unit/integration + E2E with auto-resolution + build)"
            ;;
        *)
            print_usage
            exit 1
            ;;
    esac
    
    if [ ! -f "$source_file" ]; then
        echo -e "${RED}Error:${NC} Source file $source_file not found!"
        exit 1
    fi
    
    # Copy the configuration
    cp "$source_file" ".husky/pre-commit"
    
    # Make it executable
    chmod +x ".husky/pre-commit"
    
    echo -e "${GREEN}✅ Switched to $description${NC}"
    echo -e "${BLUE}💡 You can now commit your changes and the pre-commit hook will run the selected checks.${NC}"
}

# Main execution
if [ $# -eq 0 ]; then
    print_usage
    exit 0
fi

switch_config "$1"