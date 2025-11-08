#!/bin/bash

# JavaScript Questions Seeding Script Runner
# This script provides easy commands for managing JavaScript questions seeding

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
    echo "JavaScript Questions Seeding Script Runner"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  transform    Transform JavaScript JSON files to updated schema"
    echo "  seed         Seed all JavaScript questions to Firebase"
    echo "  seed-1-25    Seed JavaScript questions 1-25"
    echo "  seed-26-50   Seed JavaScript questions 26-50"
    echo "  seed-51-75   Seed JavaScript questions 51-75"
    echo "  seed-76-100  Seed JavaScript questions 76-100"
    echo "  seed-101-125 Seed JavaScript questions 101-125"
    echo "  clear        Clear all questions from Firebase (use with caution)"
    echo "  verify       Verify JavaScript questions in Firebase"
    echo "  help         Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 transform    # Transform JSON files"
    echo "  $0 seed         # Seed all JavaScript questions"
    echo "  $0 verify       # Check seeded questions"
}

# Function to transform JavaScript questions
transform_questions() {
    print_status "Transforming JavaScript questions to updated schema..."
    cd "$SCRIPT_DIR"
    
    if [ ! -f "transform-javascript-questions.js" ]; then
        print_error "Transform script not found!"
        exit 1
    fi
    
    node transform-javascript-questions.js
    
    if [ $? -eq 0 ]; then
        print_success "JavaScript questions transformation completed!"
    else
        print_error "Transformation failed!"
        exit 1
    fi
}

# Function to seed all JavaScript questions
seed_all() {
    print_status "Seeding all JavaScript questions to Firebase..."
    cd "$SCRIPT_DIR"
    
    if [ ! -f "seed-all-javascript-questions.js" ]; then
        print_error "Master seeding script not found!"
        exit 1
    fi
    
    node seed-all-javascript-questions.js
    
    if [ $? -eq 0 ]; then
        print_success "All JavaScript questions seeded successfully!"
        print_status "Total: 125 JavaScript questions"
        print_status "Category: JavaScript"
        print_status "Learning Card: Core Technologies"
    else
        print_error "Seeding failed!"
        exit 1
    fi
}

# Function to seed specific range
seed_range() {
    local range=$1
    local script_name="seed-javascript-${range}.js"
    
    print_status "Seeding JavaScript questions ${range}..."
    cd "$SCRIPT_DIR"
    
    if [ ! -f "$script_name" ]; then
        print_error "Seeding script $script_name not found!"
        exit 1
    fi
    
    node "$script_name"
    
    if [ $? -eq 0 ]; then
        print_success "JavaScript questions ${range} seeded successfully!"
    else
        print_error "Seeding ${range} failed!"
        exit 1
    fi
}

# Function to clear questions
clear_questions() {
    print_warning "This will clear ALL questions from Firebase!"
    print_warning "Are you sure you want to continue? (y/N)"
    read -r response
    
    if [[ "$response" =~ ^[Yy]$ ]]; then
        print_status "Clearing all questions from Firebase..."
        cd "$SCRIPT_DIR"
        
        if [ ! -f "clear-questions.js" ]; then
            print_error "Clear script not found!"
            exit 1
        fi
        
        node clear-questions.js
        
        if [ $? -eq 0 ]; then
            print_success "All questions cleared from Firebase!"
        else
            print_error "Failed to clear questions!"
            exit 1
        fi
    else
        print_status "Operation cancelled."
    fi
}

# Function to verify questions
verify_questions() {
    print_status "Verifying JavaScript questions in Firebase..."
    cd "$SCRIPT_DIR"
    
    if [ ! -f "verify-application-state.js" ]; then
        print_error "Verification script not found!"
        exit 1
    fi
    
    node verify-application-state.js
    
    if [ $? -eq 0 ]; then
        print_success "Verification completed!"
    else
        print_error "Verification failed!"
        exit 1
    fi
}

# Main script logic
case "${1:-help}" in
    "transform")
        transform_questions
        ;;
    "seed")
        seed_all
        ;;
    "seed-1-25")
        seed_range "1-25"
        ;;
    "seed-26-50")
        seed_range "26-50"
        ;;
    "seed-51-75")
        seed_range "51-75"
        ;;
    "seed-76-100")
        seed_range "76-100"
        ;;
    "seed-101-125")
        seed_range "101-125"
        ;;
    "clear")
        clear_questions
        ;;
    "verify")
        verify_questions
        ;;
    "help"|"-h"|"--help")
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac
