#!/bin/bash
# Quick push to GitHub

cd /Users/a.fouad/SideProjects/Elzatona-all/Elzatona-web

echo "=== Staging Changes ==="
git add -A
git status --short | head -10

echo ""
echo "=== Committing ==="
git commit -m "chore: update build-check-and-push with security audit

- Fixed step numbering to 8 steps total
- Added Step 7: Security Audit (secrets, .env files, npm audit)
- Updated documentation
- Removed duplicate /gh command
- Added helper scripts for execution" 2>&1

echo ""
echo "=== Pushing to GitHub ==="
BRANCH=$(git branch --show-current)
git push origin "$BRANCH" 2>&1 || git push -u origin "$BRANCH" 2>&1

echo ""
echo "=== Status ==="
git log --oneline -1
echo ""
git log origin/"$BRANCH"..HEAD --oneline || echo "✅ All commits pushed to GitHub"

