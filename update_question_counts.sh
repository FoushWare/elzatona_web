#!/bin/bash

echo "🔄 Updating question counts for all learning paths..."

# Get all learning paths
LEARNING_PATHS_JSON=$(curl -s "http://localhost:3000/api/questions/learning-paths")
LEARNING_PATHS_DATA=$(echo "$LEARNING_PATHS_JSON" | jq -c '.data[]')

echo "$LEARNING_PATHS_DATA" | while IFS= read -r path_json; do
    PATH_ID=$(echo "$path_json" | jq -r '.id')
    PATH_NAME=$(echo "$path_json" | jq -r '.name')
    
    echo "📝 Processing $PATH_NAME ($PATH_ID)..."
    
    # Get question count for this learning path
    QUESTIONS_JSON=$(curl -s "http://localhost:3000/api/questions/unified?learningPath=${PATH_ID}&isActive=true")
    QUESTION_COUNT=$(echo "$QUESTIONS_JSON" | jq '.data | length')
    
    echo "  Found $QUESTION_COUNT questions"
    
    # Update the learning path with the correct question count
    curl -s -X PUT \
         -H "Content-Type: application/json" \
         -d "{\"questionCount\": $QUESTION_COUNT}" \
         "http://localhost:3000/api/questions/learning-paths/${PATH_ID}" > /dev/null
    
    if [ $? -eq 0 ]; then
        echo "  ✅ Updated $PATH_NAME with $QUESTION_COUNT questions"
    else
        echo "  ❌ Failed to update $PATH_NAME"
    fi
done

echo "✅ Question count update complete!"
