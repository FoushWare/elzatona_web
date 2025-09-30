#!/bin/bash

echo "🔄 Starting question redistribution..."

# Get all question IDs
question_ids=$(curl -s "http://localhost:3000/api/questions/unified" | jq -r '.data[].id')

# Learning paths to distribute to
learning_paths=(
  "frontend-basics"
  "css-mastery" 
  "react-mastery"
  "typescript-essentials"
  "testing-strategies"
  "performance-optimization"
  "security-essentials"
  "api-integration"
  "build-tools-devops"
  "frontend-interview-prep"
)

# Counter for distribution
counter=0
path_index=0

echo "📊 Distributing questions across learning paths..."

# Distribute questions in batches
for question_id in $question_ids; do
  # Skip first 20 questions (keep them in javascript-deep-dive)
  if [ $counter -lt 20 ]; then
    ((counter++))
    continue
  fi
  
  # Get current learning path
  current_path=${learning_paths[$path_index]}
  
  echo "Moving question $question_id to $current_path"
  
  # Update the question's learning path
  curl -s -X PUT "http://localhost:3000/api/questions/unified/$question_id" \
    -H "Content-Type: application/json" \
    -d "{\"learningPath\": \"$current_path\"}" > /dev/null
  
  # Move to next learning path
  ((path_index++))
  if [ $path_index -ge ${#learning_paths[@]} ]; then
    path_index=0
  fi
  
  ((counter++))
  
  # Add small delay to avoid overwhelming the server
  sleep 0.1
done

echo "✅ Redistribution complete!"
echo "📊 Final distribution:"

# Show final distribution
curl -s "http://localhost:3000/api/questions/unified" | \
jq -r '.data | group_by(.learningPath) | map({learningPath: .[0].learningPath, count: length}) | sort_by(.count) | reverse | .[] | "\(.learningPath): \(.count) questions"'
