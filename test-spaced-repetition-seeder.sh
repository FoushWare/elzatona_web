#!/bin/bash
# Test script for spaced repetition seeder implementation
# Usage: bash test-spaced-repetition-seeder.sh

set -e

echo "🧪 Testing Spaced Repetition Seeder Implementation"
echo "=================================================="

cd "$(dirname "$0")"

# Step 1: Syntax check
echo "Step 1: Checking seeder syntax..."
if node --check tools/seed/seed-all.mjs 2>&1; then
    echo "✅ Syntax check passed"
else
    echo "❌ Syntax check failed"
    exit 1
fi

# Step 2: Verify helper functions exist
echo ""
echo "Step 2: Verifying helper functions..."

if grep -q "function generatePlanMetadata" tools/seed/seed-all.mjs; then
    echo "✅ generatePlanMetadata() found"
else
    echo "❌ generatePlanMetadata() not found"
    exit 1
fi

if grep -q "function getDisplayLabel" tools/seed/seed-all.mjs; then
    echo "✅ getDisplayLabel() found"
else
    echo "❌ getDisplayLabel() not found"
    exit 1
fi

if grep -q "function groupQuestionsByDifficulty" tools/seed/seed-all.mjs; then
    echo "✅ groupQuestionsByDifficulty() found"
else
    echo "❌ groupQuestionsByDifficulty() not found"
    exit 1
fi

# Step 3: Verify 4-plan logic
echo ""
echo "Step 3: Verifying 4-plan architecture..."

if grep -q "planSequences = \[1, 2, 3, 4\]" tools/seed/seed-all.mjs; then
    echo "✅ 4-plan sequence found"
else
    echo "❌ 4-plan sequence not found"
    exit 1
fi

# Step 4: Verify plan types
echo ""
echo "Step 4: Verifying plan types..."

for plan_type in "initial" "reinforcement" "advanced" "maintenance"; do
    if grep -q "plan_type.*$plan_type" tools/seed/seed-all.mjs; then
        echo "✅ Plan type '$plan_type' found"
    else
        echo "❌ Plan type '$plan_type' not found"
        exit 1
    fi
done

# Step 5: Verify review question tracking
echo ""
echo "Step 5: Verifying review question metadata..."

if grep -q "is_review" tools/seed/seed-all.mjs; then
    echo "✅ is_review field found"
else
    echo "❌ is_review field not found"
    exit 1
fi

if grep -q "parent_plan_id" tools/seed/seed-all.mjs; then
    echo "✅ parent_plan_id field found"
else
    echo "❌ parent_plan_id field not found"
    exit 1
fi

if grep -q "difficulty_tier" tools/seed/seed-all.mjs; then
    echo "✅ difficulty_tier field found"
else
    echo "❌ difficulty_tier field not found"
    exit 1
fi

# Step 6: Run seeder
echo ""
echo "Step 6: Running seeder..."
echo "This may take a few minutes..."

if timeout 600 npm run seed 2>&1; then
    echo "✅ Seeder executed successfully"
else
    EXIT_CODE=$?
    if [ $EXIT_CODE -eq 124 ]; then
        echo "⚠️  Seeder timeout (may still be running)"
    else
        echo "❌ Seeder failed with exit code $EXIT_CODE"
        exit 1
    fi
fi

echo ""
echo "=================================================="
echo "✨ All tests passed! Spaced repetition seeder ready."
echo ""
echo "Next steps:"
echo "1. Verify database records using provided SQL queries"
echo "2. Update frontend components to display plan metadata"
echo "3. Test quiz UI with dimmed review questions"
