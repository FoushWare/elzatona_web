#!/bin/bash

echo "🔄 Triggering question count updates for all learning paths..."

# Get all learning paths
LEARNING_PATHS_JSON=$(curl -s "http://localhost:3000/api/questions/learning-paths")
LEARNING_PATHS_DATA=$(echo "$LEARNING_PATHS_JSON" | jq -c '.data[]')

echo "$LEARNING_PATHS_DATA" | while IFS= read -r path_json; do
    PATH_ID=$(echo "$path_json" | jq -r '.id')
    PATH_NAME=$(echo "$path_json" | jq -r '.name')
    
    echo "📝 Triggering update for $PATH_NAME ($PATH_ID)..."
    
    # Get question count for this learning path
    QUESTIONS_JSON=$(curl -s "http://localhost:3000/api/questions/unified?learningPath=${PATH_ID}&isActive=true")
    QUESTION_COUNT=$(echo "$QUESTIONS_JSON" | jq '.data | length')
    
    echo "  Found $QUESTION_COUNT questions"
    
    # Trigger a question update to force the count update
    # We'll create a dummy question and then delete it to trigger the update
    DUMMY_QUESTION='{
        "title": "Dummy Question for Count Update",
        "content": "This is a temporary question to trigger count update",
        "type": "single",
        "category": "System",
        "learningPath": "'$PATH_ID'",
        "difficulty": "easy",
        "options": [
            {"id": "a", "text": "Option A", "isCorrect": true},
            {"id": "b", "text": "Option B", "isCorrect": false}
        ],
        "correctAnswers": ["a"],
        "explanation": "This is a dummy question",
        "points": 1,
        "timeLimit": 30,
        "isActive": false
    }'
    
    # Create dummy question
    CREATE_RESPONSE=$(curl -s -X POST \
         -H "Content-Type: application/json" \
         -d "$DUMMY_QUESTION" \
         "http://localhost:3000/api/questions/unified")
    
    DUMMY_ID=$(echo "$CREATE_RESPONSE" | jq -r '.data.id // empty')
    
    if [ ! -z "$DUMMY_ID" ]; then
        # Delete the dummy question
        curl -s -X DELETE "http://localhost:3000/api/questions/unified?id=$DUMMY_ID" > /dev/null
        echo "  ✅ Triggered count update for $PATH_NAME"
    else
        echo "  ❌ Failed to trigger count update for $PATH_NAME"
    fi
done

echo "✅ Question count update trigger complete!"
