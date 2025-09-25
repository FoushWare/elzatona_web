#!/bin/bash

echo "=== JAVASCRIPT DEEP DIVE QUESTIONS (155 total) ==="
echo ""

# Get all questions and format them properly
curl -s "http://localhost:3000/api/questions/unified?learningPath=javascript-deep-dive&isActive=true" | \
jq -r '.data[] | 
"--- QUESTION " + (.id) + " ---
Question: " + (.content // .title // .question) + "
Category: " + (.category // .subcategory // "General") + "
Difficulty: " + (.difficulty // "medium") + "

Options:" + 
(.options | map("\n  " + .id + ": " + .text + (if .isCorrect then " ✓" else "" end)) | join("")) + "

Correct Answer: " + (.options[] | select(.isCorrect == true) | .text) + "
Explanation: " + (.explanation // "No explanation available") + "

" + ("="*80) + "\n"'
