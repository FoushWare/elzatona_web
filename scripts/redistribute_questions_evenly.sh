#!/bin/bash

# Script to redistribute questions evenly across all learning paths
# This will take all 155 questions and distribute them across all learning paths

echo "🔄 Redistributing questions evenly across all learning paths..."

# Get all questions
echo "📥 Fetching all questions..."
QUESTIONS_RESPONSE=$(curl -s "http://localhost:3001/api/questions/unified")
QUESTIONS_DATA=$(echo "$QUESTIONS_RESPONSE" | jq '.data')

# Define learning paths (excluding the ones that already have questions)
LEARNING_PATHS=(
  "frontend-basics"
  "css-mastery" 
  "javascript-deep-dive"
  "react-mastery"
  "typescript-essentials"
  "testing-strategies"
  "performance-optimization"
  "security-essentials"
  "frontend-system-design"
  "build-tools-devops"
  "api-integration"
  "ai-tools-frontend"
  "frontend-interview-prep"
  "advanced-frontend-architectures"
  "javascript-practice-interview"
  "javascript-practice"
  "css-practice-layout"
  "css-practice"
  "html-practice"
  "html-practice-semantic"
  "react-practice-advanced"
  "react-practice"
  "comprehensive-interview-prep"
  "improve-english"
)

# Calculate questions per path
TOTAL_QUESTIONS=$(echo "$QUESTIONS_DATA" | jq 'length')
TOTAL_PATHS=${#LEARNING_PATHS[@]}
QUESTIONS_PER_PATH=$((TOTAL_QUESTIONS / TOTAL_PATHS))
REMAINDER=$((TOTAL_QUESTIONS % TOTAL_PATHS))

echo "📊 Total questions: $TOTAL_QUESTIONS"
echo "📊 Total learning paths: $TOTAL_PATHS"
echo "📊 Questions per path: $QUESTIONS_PER_PATH"
echo "📊 Remainder: $REMAINDER"

# Get all question IDs
QUESTION_IDS=$(echo "$QUESTIONS_DATA" | jq -r '.[].id')

# Convert to array
readarray -t QUESTION_IDS_ARRAY <<< "$QUESTION_IDS"

# Shuffle the questions
shuffled_questions=($(printf '%s\n' "${QUESTION_IDS_ARRAY[@]}" | shuf))

echo "🎲 Shuffled ${#shuffled_questions[@]} questions"

# Distribute questions
question_index=0
for i in "${!LEARNING_PATHS[@]}"; do
  learning_path="${LEARNING_PATHS[$i]}"
  
  # Calculate how many questions this path should get
  questions_for_this_path=$QUESTIONS_PER_PATH
  if [ $i -lt $REMAINDER ]; then
    questions_for_this_path=$((QUESTIONS_PER_PATH + 1))
  fi
  
  echo "📝 Assigning $questions_for_this_path questions to $learning_path..."
  
  # Assign questions to this learning path
  for ((j=0; j<questions_for_this_path; j++)); do
    if [ $question_index -lt ${#shuffled_questions[@]} ]; then
      question_id="${shuffled_questions[$question_index]}"
      
      # Update the question's learning path
      echo "  🔄 Updating question $question_id to $learning_path..."
      curl -s -X PUT "http://localhost:3001/api/questions/unified/$question_id" \
        -H "Content-Type: application/json" \
        -d "{\"learningPath\": \"$learning_path\"}" > /dev/null
      
      question_index=$((question_index + 1))
    fi
  done
  
  echo "✅ Assigned $questions_for_this_path questions to $learning_path"
done

echo "🎉 Question redistribution completed!"
echo "📊 Final distribution:"

# Show final distribution
for learning_path in "${LEARNING_PATHS[@]}"; do
  count=$(curl -s "http://localhost:3001/api/questions/unified?learningPath=$learning_path&isActive=true" | jq '.data | length')
  echo "  $learning_path: $count questions"
done
