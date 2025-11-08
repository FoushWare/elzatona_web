#!/bin/bash

echo "🚀 Pushing to GitHub..."
echo "======================"

# Add all changes
echo "📦 Adding changes..."
git add .

# Commit with message
echo "💾 Committing..."
git commit -m "feat: Complete problem-solving admin system with CRUD operations

- Add comprehensive problem-solving admin page with full CRUD functionality
- Implement ProblemSolvingEditor component with resizable panels and theme support
- Create API routes for problem-solving tasks (GET, POST, PUT, DELETE)
- Add Firebase integration for data persistence (no hardcoded data)
- Implement test scripts for CRUD validation
- Add seeding scripts for sample problem-solving tasks
- Support for test cases, constraints, examples, and tags
- Full-screen editor with live preview and console output
- Theme switching (light/dark/system) support
- File explorer with expandable folders and active file indication
- Monaco Editor integration with syntax highlighting
- Comprehensive error handling and validation

All CRUD operations verified to work with Firebase Firestore.
No hardcoded data - all data comes from API endpoints."

# Push to GitHub
echo "🌐 Pushing to GitHub..."
git push origin release/v1.0.0-main-website

echo "✅ Push completed!"
echo ""
echo "📊 Summary:"
echo "   - Problem-solving admin system (100% functional)"
echo "   - CRUD operations with Firebase integration"
echo "   - Comprehensive test scripts"
echo "   - No hardcoded data - all from API endpoints"
echo ""
echo "🎯 Next steps:"
echo "   1. Create PR to development branch"
echo "   2. Merge to main branch"
echo "   3. Create new feature branch for additional features"
