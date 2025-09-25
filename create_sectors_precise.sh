#!/bin/bash

echo "🔄 Creating precise sectors with 15 questions each..."

# Get all questions grouped by learning path
curl -s "http://localhost:3000/api/questions/unified" | jq -r '.data | group_by(.learningPath) | .[] | "\(.[0].learningPath)|\(length)|\(.[] | .id)"' | while IFS='|' read -r learning_path total_count question_id; do
  if [ -z "$learning_path" ] || [ "$learning_path" = "null" ]; then
    continue
  fi
  
  # Define sectors for each learning path
  case "$learning_path" in
    "javascript-deep-dive")
      # Get all questions for this path
      questions=$(curl -s "http://localhost:3000/api/questions/unified" | jq -r ".data[] | select(.learningPath == \"$learning_path\") | .id")
      question_array=($questions)
      total_questions=${#question_array[@]}
      
      echo "Processing $learning_path with $total_questions questions"
      
      # Define sectors with 15 questions each
      sectors=(
        "fundamentals:JavaScript Fundamentals:1"
        "advanced-concepts:Advanced Concepts:2"
        "async-programming:Async Programming:3"
        "object-oriented:Object-Oriented Programming:4"
        "functional-programming:Functional Programming:5"
      )
      
      # Distribute questions evenly across sectors
      questions_per_sector=15
      current_index=0
      
      for sector_info in "${sectors[@]}"; do
        IFS=':' read -r sector_id sector_name sector_order <<< "$sector_info"
        
        echo "  Creating sector: $sector_name"
        
        # Take 15 questions for this sector
        for ((i=0; i<questions_per_sector && current_index<total_questions; i++)); do
          question_id="${question_array[$current_index]}"
          
          if [ -n "$question_id" ] && [ "$question_id" != "null" ]; then
            echo "    Assigning question $question_id to $sector_name"
            
            # Update the question with sector information
            curl -s -X PUT "http://localhost:3000/api/questions/unified/$question_id" \
              -H "Content-Type: application/json" \
              -d "{\"sector\": \"$sector_id\", \"sectorName\": \"$sector_name\", \"sectorOrder\": $sector_order}" > /dev/null
            
            # Small delay to avoid overwhelming the server
            sleep 0.02
          fi
          
          ((current_index++))
        done
      done
      ;;
      
    "frontend-basics")
      questions=$(curl -s "http://localhost:3000/api/questions/unified" | jq -r ".data[] | select(.learningPath == \"$learning_path\") | .id")
      question_array=($questions)
      total_questions=${#question_array[@]}
      
      echo "Processing $learning_path with $total_questions questions"
      
      sectors=(
        "html-semantics:HTML Semantics:1"
        "css-layouts:CSS Layouts:2"
        "javascript-basics:JavaScript Basics:3"
        "responsive-design:Responsive Design:4"
      )
      
      questions_per_sector=15
      current_index=0
      
      for sector_info in "${sectors[@]}"; do
        IFS=':' read -r sector_id sector_name sector_order <<< "$sector_info"
        
        echo "  Creating sector: $sector_name"
        
        for ((i=0; i<questions_per_sector && current_index<total_questions; i++)); do
          question_id="${question_array[$current_index]}"
          
          if [ -n "$question_id" ] && [ "$question_id" != "null" ]; then
            echo "    Assigning question $question_id to $sector_name"
            
            curl -s -X PUT "http://localhost:3000/api/questions/unified/$question_id" \
              -H "Content-Type: application/json" \
              -d "{\"sector\": \"$sector_id\", \"sectorName\": \"$sector_name\", \"sectorOrder\": $sector_order}" > /dev/null
            
            sleep 0.02
          fi
          
          ((current_index++))
        done
      done
      ;;
      
    "css-mastery")
      questions=$(curl -s "http://localhost:3000/api/questions/unified" | jq -r ".data[] | select(.learningPath == \"$learning_path\") | .id")
      question_array=($questions)
      total_questions=${#question_array[@]}
      
      echo "Processing $learning_path with $total_questions questions"
      
      sectors=(
        "advanced-css:Advanced CSS:1"
        "flexbox-grid:Flexbox & Grid:2"
        "animations:Animations & Transitions:3"
        "responsive-css:Responsive CSS:4"
      )
      
      questions_per_sector=15
      current_index=0
      
      for sector_info in "${sectors[@]}"; do
        IFS=':' read -r sector_id sector_name sector_order <<< "$sector_info"
        
        echo "  Creating sector: $sector_name"
        
        for ((i=0; i<questions_per_sector && current_index<total_questions; i++)); do
          question_id="${question_array[$current_index]}"
          
          if [ -n "$question_id" ] && [ "$question_id" != "null" ]; then
            echo "    Assigning question $question_id to $sector_name"
            
            curl -s -X PUT "http://localhost:3000/api/questions/unified/$question_id" \
              -H "Content-Type: application/json" \
              -d "{\"sector\": \"$sector_id\", \"sectorName\": \"$sector_name\", \"sectorOrder\": $sector_order}" > /dev/null
            
            sleep 0.02
          fi
          
          ((current_index++))
        done
      done
      ;;
      
    "react-mastery")
      questions=$(curl -s "http://localhost:3000/api/questions/unified" | jq -r ".data[] | select(.learningPath == \"$learning_path\") | .id")
      question_array=($questions)
      total_questions=${#question_array[@]}
      
      echo "Processing $learning_path with $total_questions questions"
      
      sectors=(
        "components-props:Components & Props:1"
        "state-management:State Management:2"
        "hooks:React Hooks:3"
        "performance:Performance Optimization:4"
      )
      
      questions_per_sector=15
      current_index=0
      
      for sector_info in "${sectors[@]}"; do
        IFS=':' read -r sector_id sector_name sector_order <<< "$sector_info"
        
        echo "  Creating sector: $sector_name"
        
        for ((i=0; i<questions_per_sector && current_index<total_questions; i++)); do
          question_id="${question_array[$current_index]}"
          
          if [ -n "$question_id" ] && [ "$question_id" != "null" ]; then
            echo "    Assigning question $question_id to $sector_name"
            
            curl -s -X PUT "http://localhost:3000/api/questions/unified/$question_id" \
              -H "Content-Type: application/json" \
              -d "{\"sector\": \"$sector_id\", \"sectorName\": \"$sector_name\", \"sectorOrder\": $sector_order}" > /dev/null
            
            sleep 0.02
          fi
          
          ((current_index++))
        done
      done
      ;;
      
    *)
      # Default sector for other learning paths
      questions=$(curl -s "http://localhost:3000/api/questions/unified" | jq -r ".data[] | select(.learningPath == \"$learning_path\") | .id")
      question_array=($questions)
      total_questions=${#question_array[@]}
      
      echo "Processing $learning_path with $total_questions questions (default sector)"
      
      # Create a single sector for other paths
      sector_id="fundamentals"
      sector_name="Fundamentals"
      sector_order="1"
      
      echo "  Creating sector: $sector_name"
      
      for question_id in "${question_array[@]}"; do
        if [ -n "$question_id" ] && [ "$question_id" != "null" ]; then
          echo "    Assigning question $question_id to $sector_name"
          
          curl -s -X PUT "http://localhost:3000/api/questions/unified/$question_id" \
            -H "Content-Type: application/json" \
            -d "{\"sector\": \"$sector_id\", \"sectorName\": \"$sector_name\", \"sectorOrder\": $sector_order}" > /dev/null
          
          sleep 0.02
        fi
      done
      ;;
  esac
done

echo "✅ Precise sector assignment complete!"
echo "📊 Checking final distribution..."

# Show final distribution
curl -s "http://localhost:3000/api/questions/unified" | jq -r '.data | group_by(.learningPath) | .[] | "\(.[0].learningPath):" as $path | group_by(.sector) | .[] | "  \(.[0].sectorName // "Unknown"): \(length) questions"' | sort
