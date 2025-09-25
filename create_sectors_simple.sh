#!/bin/bash

echo "🔄 Creating sectors for learning paths..."

# Get all questions and organize them into sectors
curl -s "http://localhost:3000/api/questions/unified" | jq -r '.data[] | "\(.id)|\(.learningPath)|\(.content // .title // .question)"' | while IFS='|' read -r question_id learning_path question_content; do
  # Determine sector based on learning path and question content
  sector=""
  sector_name=""
  sector_order=""
  
  case "$learning_path" in
    "javascript-deep-dive")
      # Simple distribution based on question ID hash
      hash=$(echo "$question_id" | md5sum | cut -c1-2)
      hash_num=$((16#$hash))
      if [ $hash_num -lt 51 ]; then
        sector="fundamentals"
        sector_name="JavaScript Fundamentals"
        sector_order="1"
      elif [ $hash_num -lt 102 ]; then
        sector="advanced-concepts"
        sector_name="Advanced Concepts"
        sector_order="2"
      elif [ $hash_num -lt 153 ]; then
        sector="async-programming"
        sector_name="Async Programming"
        sector_order="3"
      elif [ $hash_num -lt 204 ]; then
        sector="object-oriented"
        sector_name="Object-Oriented Programming"
        sector_order="4"
      else
        sector="functional-programming"
        sector_name="Functional Programming"
        sector_order="5"
      fi
      ;;
    "frontend-basics")
      hash=$(echo "$question_id" | md5sum | cut -c1-2)
      hash_num=$((16#$hash))
      if [ $hash_num -lt 64 ]; then
        sector="html-semantics"
        sector_name="HTML Semantics"
        sector_order="1"
      elif [ $hash_num -lt 128 ]; then
        sector="css-layouts"
        sector_name="CSS Layouts"
        sector_order="2"
      elif [ $hash_num -lt 192 ]; then
        sector="javascript-basics"
        sector_name="JavaScript Basics"
        sector_order="3"
      else
        sector="responsive-design"
        sector_name="Responsive Design"
        sector_order="4"
      fi
      ;;
    "css-mastery")
      hash=$(echo "$question_id" | md5sum | cut -c1-2)
      hash_num=$((16#$hash))
      if [ $hash_num -lt 64 ]; then
        sector="advanced-css"
        sector_name="Advanced CSS"
        sector_order="1"
      elif [ $hash_num -lt 128 ]; then
        sector="flexbox-grid"
        sector_name="Flexbox & Grid"
        sector_order="2"
      elif [ $hash_num -lt 192 ]; then
        sector="animations"
        sector_name="Animations & Transitions"
        sector_order="3"
      else
        sector="responsive-css"
        sector_name="Responsive CSS"
        sector_order="4"
      fi
      ;;
    "react-mastery")
      hash=$(echo "$question_id" | md5sum | cut -c1-2)
      hash_num=$((16#$hash))
      if [ $hash_num -lt 64 ]; then
        sector="components-props"
        sector_name="Components & Props"
        sector_order="1"
      elif [ $hash_num -lt 128 ]; then
        sector="state-management"
        sector_name="State Management"
        sector_order="2"
      elif [ $hash_num -lt 192 ]; then
        sector="hooks"
        sector_name="React Hooks"
        sector_order="3"
      else
        sector="performance"
        sector_name="Performance Optimization"
        sector_order="4"
      fi
      ;;
    *)
      # Default sector for other learning paths
      sector="fundamentals"
      sector_name="Fundamentals"
      sector_order="1"
      ;;
  esac
  
  if [ -n "$sector" ]; then
    echo "Assigning question $question_id to sector: $sector_name"
    
    # Update the question with sector information
    curl -s -X PUT "http://localhost:3000/api/questions/unified/$question_id" \
      -H "Content-Type: application/json" \
      -d "{\"sector\": \"$sector\", \"sectorName\": \"$sector_name\", \"sectorOrder\": $sector_order}" > /dev/null
    
    # Small delay to avoid overwhelming the server
    sleep 0.05
  fi
done

echo "✅ Sector assignment complete!"
echo "📊 Checking final distribution..."

# Show final distribution
curl -s "http://localhost:3000/api/questions/unified" | jq -r '.data | group_by(.learningPath) | .[] | "\(.[0].learningPath):" as $path | group_by(.sector) | .[] | "  \(.[0].sectorName // "Unknown"): \(length) questions"' | sort
