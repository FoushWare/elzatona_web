#!/bin/bash

# CSS Questions Seeding Script Runner
# This script provides easy commands for managing CSS questions seeding

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

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

# Function to show help
show_help() {
    echo "CSS Questions Seeding Script Runner"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  seed         Seed all CSS questions to Firebase"
    echo "  clear        Clear all questions from Firebase (use with caution)"
    echo "  verify       Verify the current state of questions in Firebase"
    echo "  help         Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 seed      # Seed all CSS questions"
    echo "  $0 clear     # Clear all questions"
    echo "  $0 verify    # Check current question count"
}

# Function to seed CSS questions
seed_css_questions() {
    print_status "Starting CSS questions seeding..."
    
    if [ ! -f "$SCRIPT_DIR/seed-all-css-questions.js" ]; then
        print_error "Master seeding script not found!"
        exit 1
    fi
    
    cd "$SCRIPT_DIR"
    node seed-all-css-questions.js
    
    if [ $? -eq 0 ]; then
        print_success "CSS questions seeded successfully!"
    else
        print_error "CSS questions seeding failed!"
        exit 1
    fi
}

# Function to clear questions
clear_questions() {
    print_warning "This will clear ALL questions from Firebase!"
    read -p "Are you sure you want to continue? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Clearing questions from Firebase..."
        
        if [ -f "$SCRIPT_DIR/clear-questions.js" ]; then
            cd "$SCRIPT_DIR"
            node clear-questions.js
        else
            print_error "Clear questions script not found!"
            exit 1
        fi
        
        if [ $? -eq 0 ]; then
            print_success "Questions cleared successfully!"
        else
            print_error "Failed to clear questions!"
            exit 1
        fi
    else
        print_status "Operation cancelled."
    fi
}

# Function to verify application state
verify_state() {
    print_status "Verifying application state..."
    
    if [ -f "$SCRIPT_DIR/verify-application-state.js" ]; then
        cd "$SCRIPT_DIR"
        node verify-application-state.js
    else
        print_error "Verify script not found!"
        exit 1
    fi
}

# Main script logic
case "${1:-help}" in
    "seed")
        seed_css_questions
        ;;
    "clear")
        clear_questions
        ;;
    "verify")
        verify_state
        ;;
    "help"|*)
        show_help
        ;;
esac