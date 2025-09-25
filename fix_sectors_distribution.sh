#!/bin/bash

echo "🔄 Fixing sector distribution to ensure 15 questions per sector..."

# Get all questions grouped by learning path
curl -s "http://localhost:3000/api/questions/unified" | jq -r '.data | group_by(.learningPath) | .[] | "\(.[0].learningPath)|\(length)"' | while IFS='|' read -r learning_path total_count; do
  if [ -z "$learning_path" ] || [ "$learning_path" = "null" ]; then
    continue
  fi
  
  echo "Processing $learning_path with $total_count questions"
  
  # Get all questions for this path
  questions=$(curl -s "http://localhost:3000/api/questions/unified" | jq -r ".data[] | select(.learningPath == \"$learning_path\") | .id")
  question_array=($questions)
  total_questions=${#question_array[@]}
  
  if [ $total_questions -eq 0 ]; then
    echo "  No questions found for $learning_path"
    continue
  fi
  
  # Define sectors based on learning path
  case "$learning_path" in
    "javascript-deep-dive")
      sectors=(
        "fundamentals:JavaScript Fundamentals:1"
        "advanced-concepts:Advanced Concepts:2"
        "async-programming:Async Programming:3"
        "object-oriented:Object-Oriented Programming:4"
        "functional-programming:Functional Programming:5"
      )
      ;;
    "frontend-basics")
      sectors=(
        "html-semantics:HTML Semantics:1"
        "css-layouts:CSS Layouts:2"
        "javascript-basics:JavaScript Basics:3"
        "responsive-design:Responsive Design:4"
      )
      ;;
    "css-mastery")
      sectors=(
        "advanced-css:Advanced CSS:1"
        "flexbox-grid:Flexbox & Grid:2"
        "animations:Animations & Transitions:3"
        "responsive-css:Responsive CSS:4"
      )
      ;;
    "react-mastery")
      sectors=(
        "components-props:Components & Props:1"
        "state-management:State Management:2"
        "hooks:React Hooks:3"
        "performance:Performance Optimization:4"
      )
      ;;
    *)
      # For other paths, create a single sector
      sectors=(
        "fundamentals:Fundamentals:1"
      )
      ;;
  esac
  
  # Calculate questions per sector (aim for 15, but distribute evenly if not enough)
  questions_per_sector=15
  if [ $total_questions -lt 15 ]; then
    questions_per_sector=$total_questions
  fi
  
  # Distribute questions evenly across sectors
  current_index=0
  sector_count=0
  
  for sector_info in "${sectors[@]}"; do
    IFS=':' read -r sector_id sector_name sector_order <<< "$sector_info"
    
    # Calculate how many questions this sector should get
    remaining_questions=$((total_questions - current_index))
    remaining_sectors=$((${#sectors[@]} - sector_count))
    
    if [ $remaining_sectors -gt 0 ]; then
      sector_questions=$((remaining_questions / remaining_sectors))
      if [ $sector_questions -gt $questions_per_sector ]; then
        sector_questions=$questions_per_sector
      fi
    else
      sector_questions=$remaining_questions
    fi
    
    echo "  Creating sector: $sector_name ($sector_questions questions)"
    
    # Assign questions to this sector
    for ((i=0; i<sector_questions && current_index<total_questions; i++)); do
      question_id="${question_array[$current_index]}"
      
      if [ -n "$question_id" ] && [ "$question_id" != "null" ]; then
        echo "    Assigning question $question_id to $sector_name"
        
        # Update the question with sector information
        curl -s -X PUT "http://localhost:3000/api/questions/unified/$question_id" \
          -H "Content-Type: application/json" \
          -d "{\"sector\": \"$sector_id\", \"sectorName\": \"$sector_name\", \"sectorOrder\": $sector_order}" > /dev/null
        
        # Small delay to avoid overwhelming the server
        sleep 0.01
      fi
      
      ((current_index++))
    done
    
    ((sector_count++))
  done
  
  echo "  ✅ Completed $learning_path"
  echo ""
done

echo "✅ Sector distribution fix complete!"
echo "📊 Checking final distribution..."

# Show final distribution
curl -s "http://localhost:3000/api/questions/unified" | jq -r '.data | group_by(.learningPath) | .[] | "\(.[0].learningPath):" as $path | group_by(.sector) | .[] | "  \(.[0].sectorName // "Unknown"): \(length) questions"' | sort
