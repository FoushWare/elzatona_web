#!/bin/bash
set -e

# Switch to 004-frontend-task-detail branch
git checkout 004-frontend-task-detail

# Merge 005-admin-app-separation (type consolidation changes)
git merge 005-admin-app-separation --no-edit

# Push to remote
git push origin 004-frontend-task-detail

echo "✅ Merge and push complete!"
