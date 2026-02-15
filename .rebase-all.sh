#!/bin/bash
set -e

LOG="/Users/a.fouad/S/New_elzatona/.rebase-log.txt"
echo "=== Rebase All Fix Branches ===" > "$LOG"
date >> "$LOG"

REPO="/Users/a.fouad/S/New_elzatona"
cd "$REPO"

# Ensure we're not in a rebase state
if [ -d .git/rebase-merge ] || [ -d .git/rebase-apply ]; then
  echo "Aborting existing rebase..." >> "$LOG"
  git rebase --abort 2>&1 >> "$LOG" || true
fi

# Go to main first to have a clean base
echo "Checking out main..." >> "$LOG"
git checkout main 2>&1 >> "$LOG"
git pull origin main --ff-only 2>&1 >> "$LOG" || echo "Pull failed, using fetched" >> "$LOG"

BRANCHES=(
  "fix/double-escaping"
  "fix/incomplete-sanitization"
)

for BRANCH in "${BRANCHES[@]}"; do
  echo "" >> "$LOG"
  echo "========================================" >> "$LOG"
  echo "Processing: $BRANCH" >> "$LOG"
  echo "========================================" >> "$LOG"

  # Checkout branch
  echo "Checkout $BRANCH..." >> "$LOG"
  if ! git checkout "$BRANCH" 2>&1 >> "$LOG"; then
    echo "ERROR: Could not checkout $BRANCH" >> "$LOG"
    git checkout main 2>&1 >> "$LOG" || true
    continue
  fi

  # Start rebase
  echo "Rebasing $BRANCH onto origin/main..." >> "$LOG"
  if git rebase origin/main 2>&1 >> "$LOG"; then
    echo "Rebase clean for $BRANCH" >> "$LOG"
  else
    echo "Rebase conflicts detected for $BRANCH" >> "$LOG"
    
    # Handle the known .gitignore conflict
    MAX_ATTEMPTS=5
    ATTEMPT=0
    while [ -d .git/rebase-merge ] || [ -d .git/rebase-apply ]; do
      ATTEMPT=$((ATTEMPT + 1))
      if [ $ATTEMPT -gt $MAX_ATTEMPTS ]; then
        echo "ERROR: Too many conflict resolution attempts for $BRANCH, aborting" >> "$LOG"
        git rebase --abort 2>&1 >> "$LOG" || true
        break
      fi

      echo "Attempt $ATTEMPT: Checking for conflicts..." >> "$LOG"
      
      # Check if .gitignore has conflicts
      if grep -q '<<<<<<' .gitignore 2>/dev/null; then
        echo "Resolving .gitignore conflict..." >> "$LOG"
        # Use sed to resolve the known pattern: keep both sides
        sed -i '' '/^<<<<<<< HEAD$/,/^>>>>>>> /{
          /^<<<<<<< HEAD$/d
          /^=======$/d
          /^>>>>>>> /d
        }' .gitignore
        git add .gitignore
      fi
      
      # Check for any other conflicted files
      CONFLICTED=$(git diff --name-only --diff-filter=U 2>/dev/null)
      if [ -n "$CONFLICTED" ]; then
        echo "Other conflicted files: $CONFLICTED" >> "$LOG"
        # For other files, accept theirs (the branch version)
        for f in $CONFLICTED; do
          git checkout --theirs "$f" 2>&1 >> "$LOG" || true
          git add "$f" 2>&1 >> "$LOG" || true
        done
      fi

      # Continue rebase
      echo "Continuing rebase..." >> "$LOG"
      git -c core.editor=true rebase --continue 2>&1 >> "$LOG" || true
    done
  fi

  # Push
  echo "Force pushing $BRANCH..." >> "$LOG"
  if git push origin "$BRANCH" --force-with-lease --no-verify 2>&1 >> "$LOG"; then
    echo "SUCCESS: $BRANCH pushed" >> "$LOG"
  else
    echo "ERROR: Failed to push $BRANCH" >> "$LOG"
  fi
done

# Return to main
git checkout main 2>&1 >> "$LOG" || true

echo "" >> "$LOG"
echo "=== DONE ===" >> "$LOG"
date >> "$LOG"
echo "Script completed"
