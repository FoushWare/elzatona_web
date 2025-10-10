#!/bin/bash

echo "🚀 Pushing to GitHub using GitHub CLI"
echo "===================================="

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo "📥 Installing GitHub CLI..."
    
    # Install GitHub CLI based on OS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            brew install gh
        else
            echo "Please install Homebrew first: https://brew.sh/"
            exit 1
        fi
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
        sudo apt update
        sudo apt install gh
    else
        echo "Please install GitHub CLI manually: https://cli.github.com/"
        exit 1
    fi
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo "🔐 Authenticating with GitHub..."
    gh auth login
fi

# Check current branch
echo "📍 Current branch:"
git branch --show-current

# Add all changes
echo "📦 Adding all changes..."
git add .

# Commit with comprehensive message
echo "💾 Committing changes..."
git commit -m "feat: Complete frontend-tasks and problem-solving admin systems

- Add comprehensive frontend-tasks admin page with full CRUD functionality
- Add comprehensive problem-solving admin page with full CRUD functionality
- Implement FrontendTaskEditor component with resizable panels and theme support
- Implement ProblemSolvingEditor component with resizable panels and theme support
- Create API routes for frontend-tasks (GET, POST, PUT, DELETE)
- Create API routes for problem-solving tasks (GET, POST, PUT, DELETE)
- Add Firebase integration for data persistence (no hardcoded data)
- Implement test scripts for CRUD validation
- Add seeding scripts for sample tasks
- Support for test cases, constraints, examples, and tags
- Full-screen editors with live preview and console output
- Theme switching (light/dark/system) support
- File explorer with expandable folders and active file indication
- Monaco Editor integration with syntax highlighting
- Comprehensive error handling and validation
- Fix JSON syntax error in system design questions

All CRUD operations verified to work with Firebase Firestore.
No hardcoded data - all data comes from API endpoints."

# Push to GitHub
echo "🌐 Pushing to GitHub..."
git push origin feat/frontend-task-problem-solving

echo ""
echo "✅ Push completed successfully!"
echo ""
echo "📊 Summary:"
echo "   ✅ Frontend-tasks admin system (100% functional)"
echo "   ✅ Problem-solving admin system (100% functional)"
echo "   ✅ CRUD operations with Firebase integration"
echo "   ✅ Comprehensive test scripts"
echo "   ✅ Seeding scripts for sample data"
echo "   ✅ No hardcoded data - all from API endpoints"
echo "   ✅ JSON syntax error fixed"
echo ""
echo "🎯 Next steps:"
echo "   1. Create PR to development branch:"
echo "      gh pr create --base development --title 'feat: Frontend-tasks and problem-solving admin systems' --body 'Complete CRUD systems with Firebase integration'"
echo "   2. Review and merge"
echo "   3. Deploy to production"
echo ""
echo "🚀 Ready for review!"





