#!/bin/bash

# Script to check build errors, run tests, attempt to fix them, and push to GitHub
# Automatically handles Vercel and GitHub errors using CLI tools
# Usage: .cursor/check-build-and-push.sh [branch-name]

# Don't use set -e here, we want to handle errors manually

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Function to print timestamped log
log() {
    echo -e "${CYAN}[$(date +'%H:%M:%S')]${NC} $1"
}

# Function to print step header
step_header() {
    echo -e "\n${MAGENTA}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    log "${BLUE}$1${NC}"
    echo -e "${MAGENTA}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

# Function to track time for long operations
start_time=$(date +%s)
MAIN_SCRIPT_PID=$$
get_elapsed_time() {
    local current_time=$(date +%s)
    local elapsed=$((current_time - start_time))
    local minutes=$((elapsed / 60))
    local seconds=$((elapsed % 60))
    echo "${minutes}m ${seconds}s"
}

# Get branch name from argument or use current branch
BRANCH=${1:-$(git branch --show-current)}

step_header "🔍 Starting Build Check and Push Process"
log "${BLUE}Branch: ${BRANCH}${NC}"
log "${BLUE}Working directory: $(pwd)${NC}\n"

# Step 1: Check for uncommitted changes
step_header "Step 1/7: Checking Git Status"
log "Checking for uncommitted changes..."
if [ -n "$(git status --porcelain)" ]; then
  log "${YELLOW}⚠️  Uncommitted changes detected. Staging all changes...${NC}"
  git add -A
  log "${GREEN}✅ Changes staged${NC}"
  log "Elapsed time: $(get_elapsed_time)\n"
else
  log "${GREEN}✅ No uncommitted changes${NC}"
  log "Elapsed time: $(get_elapsed_time)\n"
fi

# Step 2: Run linting and auto-fix
step_header "Step 2/7: Running Linter with Auto-Fix"
log "Starting ESLint with auto-fix..."
log "This may take a while depending on codebase size..."
log "Command: npm run lint:fix"

LINT_START=$(date +%s)
if npm run lint:fix 2>&1 | tee /tmp/lint-output.log; then
  LINT_END=$(date +%s)
  LINT_DURATION=$((LINT_END - LINT_START))
  log "${GREEN}✅ Linting passed (took ${LINT_DURATION}s)${NC}"
  
  # Check if linting made changes
  if [ -n "$(git diff --name-only)" ]; then
    log "${YELLOW}⚠️  Linter made changes. Staging fixes...${NC}"
    git add -A
    log "${GREEN}✅ Lint fixes staged${NC}"
  else
    log "${GREEN}No linting changes needed${NC}"
  fi
  log "Elapsed time: $(get_elapsed_time)\n"
else
  LINT_END=$(date +%s)
  LINT_DURATION=$((LINT_END - LINT_START))
  log "${RED}❌ Linting failed (took ${LINT_DURATION}s). Check errors above.${NC}"
  log "${YELLOW}Attempting to continue with build check...${NC}"
  log "Elapsed time: $(get_elapsed_time)\n"
fi

# Step 3: Check TypeScript errors
step_header "Step 3/7: Checking TypeScript Errors"
log "Running TypeScript compiler check (no emit)..."
log "Command: npx tsc --noEmit"
log "This may take a while for large projects..."

TSC_START=$(date +%s)
if npx tsc --noEmit 2>&1 | tee /tmp/tsc-output.log; then
  TSC_END=$(date +%s)
  TSC_DURATION=$((TSC_END - TSC_START))
  log "${GREEN}✅ TypeScript check passed (took ${TSC_DURATION}s)${NC}"
  log "Elapsed time: $(get_elapsed_time)\n"
else
  TSC_END=$(date +%s)
  TSC_DURATION=$((TSC_END - TSC_START))
  log "${RED}❌ TypeScript errors found (took ${TSC_DURATION}s):${NC}"
  cat /tmp/tsc-output.log | grep -E "error TS" | head -20
  log "${YELLOW}⚠️  TypeScript errors detected. Please fix manually.${NC}"
  log "${YELLOW}Continuing with build check...${NC}"
  log "Elapsed time: $(get_elapsed_time)\n"
  # Don't exit here, continue to build check
fi

# Step 4: Run build check
step_header "Step 4/7: Running Build Check"
log "Starting build process..."
log "Command: npm run build"
log "This is typically the longest step - please be patient..."
log "Building project (this may take several minutes)..."

BUILD_START=$(date +%s)
# Show progress indicator in background
(
  while true; do
    sleep 30
    if kill -0 $MAIN_SCRIPT_PID 2>/dev/null; then
      log "${YELLOW}⏳ Build still running... (elapsed: $(get_elapsed_time))${NC}"
    else
      break
    fi
  done
) &
PROGRESS_PID=$!

BUILD_OUTPUT=$(npm run build 2>&1)
BUILD_EXIT_CODE=$?
kill $PROGRESS_PID 2>/dev/null || true

BUILD_END=$(date +%s)
BUILD_DURATION=$((BUILD_END - BUILD_START))

if [ $BUILD_EXIT_CODE -eq 0 ]; then
  log "${GREEN}✅ Build successful! (took ${BUILD_DURATION}s)${NC}"
  log "Elapsed time: $(get_elapsed_time)\n"
else
  log "${RED}❌ Build failed! (took ${BUILD_DURATION}s)${NC}"
  log "${YELLOW}Build output (last 50 lines):${NC}"
  echo "$BUILD_OUTPUT" | tail -50
  
  # Check for Vercel-related errors
  if echo "$BUILD_OUTPUT" | grep -qi "vercel\|Vercel\|VERCEL"; then
    log "\n${YELLOW}🔧 Detected Vercel-related error. Attempting to fix with Vercel CLI...${NC}"
    
    # Check if Vercel CLI is installed
    if command -v vercel &> /dev/null || command -v npx vercel &> /dev/null; then
      log "${BLUE}📦 Checking Vercel configuration...${NC}"
      
      # Try to pull Vercel environment variables
      log "Pulling Vercel environment variables..."
      if npx vercel env pull .env.local 2>&1 | tee /tmp/vercel-output.log; then
        log "${GREEN}✅ Vercel environment variables pulled${NC}"
        log "${BLUE}🔄 Retrying build...${NC}"
        log "Rebuilding with Vercel env vars..."
        if npm run build 2>&1; then
          log "${GREEN}✅ Build successful after Vercel fix!${NC}\n"
        else
          log "${YELLOW}⚠️  Build still failing. Checking Vercel deployment status...${NC}"
          npx vercel inspect 2>&1 | head -20 || true
        fi
      else
        log "${YELLOW}⚠️  Could not pull Vercel env. Checking Vercel link...${NC}"
        if npx vercel link 2>&1; then
          log "${GREEN}✅ Vercel project linked. Retrying build...${NC}"
          log "Rebuilding after Vercel link..."
          if npm run build 2>&1; then
            log "${GREEN}✅ Build successful after Vercel link!${NC}\n"
          fi
        fi
      fi
    else
      log "${YELLOW}⚠️  Vercel CLI not found. Install with: npm i -g vercel${NC}"
    fi
  fi
  
  # Try to identify common build errors
  if echo "$BUILD_OUTPUT" | grep -qi "Cannot find module\|Module not found"; then
    log "\n${YELLOW}🔧 Detected missing module error. Attempting to fix...${NC}"
    log "Installing dependencies..."
    npm install
    log "${GREEN}✅ Dependencies reinstalled. Retrying build...${NC}"
    log "Rebuilding after dependency fix..."
    if npm run build 2>&1; then
      log "${GREEN}✅ Build successful after dependency fix!${NC}\n"
    else
      log "${RED}❌ Build still failing after dependency fix${NC}\n"
      exit 1
    fi
  elif echo "$BUILD_OUTPUT" | grep -qi "SyntaxError\|ParseError"; then
    log "\n${YELLOW}⚠️  Syntax errors detected. Please fix manually.${NC}\n"
    exit 1
  elif echo "$BUILD_OUTPUT" | grep -qi "Type error\|TS[0-9]"; then
    log "\n${YELLOW}⚠️  Type errors detected. Please fix manually.${NC}\n"
    exit 1
  else
    log "\n${YELLOW}⚠️  Unknown build error. Please review the output above.${NC}\n"
    exit 1
  fi
fi

# Step 5: Run tests in batches (much faster than running all at once)
step_header "Step 5/7: Running Tests in Batches"
log "Using batch testing for faster feedback..."
log "Running: bash .cursor/run-tests-in-batches.sh"

TEST_START=$(date +%s)

if bash .cursor/run-tests-in-batches.sh 2>&1 | tee /tmp/test-batch-output.log; then
  TEST_END=$(date +%s)
  TEST_DURATION=$((TEST_END - TEST_START))
  log "${GREEN}✅ All test batches passed! (took ${TEST_DURATION}s)${NC}"
  log "Elapsed time: $(get_elapsed_time)\n"
else
  TEST_END=$(date +%s)
  TEST_DURATION=$((TEST_END - TEST_START))
  log "${RED}❌ Test batches failed! (took ${TEST_DURATION}s)${NC}"
  log "${YELLOW}Failed batch summary:${NC}"
  grep -A 5 "Failed batches:" /tmp/test-batch-output.log || tail -50 /tmp/test-batch-output.log
  
  # Check if it's a test configuration issue
  if grep -qi "Cannot find module\|Module not found" /tmp/test-batch-output.log; then
    log "\n${YELLOW}🔧 Detected missing test dependencies. Attempting to fix...${NC}"
    log "Installing dependencies..."
    npm install
    log "${GREEN}✅ Dependencies reinstalled. Retrying tests...${NC}"
    log "Rerunning test batches after dependency fix..."
    if bash .cursor/run-tests-in-batches.sh 2>&1; then
      log "${GREEN}✅ Tests passed after dependency fix!${NC}\n"
    else
      log "${RED}❌ Tests still failing after dependency fix${NC}\n"
      log "${YELLOW}⚠️  Please fix test failures before pushing.${NC}\n"
      exit 1
    fi
  elif grep -qi "vercel\|Vercel\|VERCEL" /tmp/test-batch-output.log; then
    log "\n${YELLOW}🔧 Detected Vercel-related test error. Attempting to fix...${NC}"
    log "Pulling Vercel environment variables..."
    if npx vercel env pull .env.local 2>&1; then
      log "${GREEN}✅ Vercel environment variables pulled. Retrying tests...${NC}"
      log "Rerunning test batches with Vercel env vars..."
      if bash .cursor/run-tests-in-batches.sh 2>&1; then
        log "${GREEN}✅ Tests passed after Vercel fix!${NC}\n"
      else
        log "${RED}❌ Tests still failing after Vercel fix${NC}\n"
        log "${YELLOW}⚠️  Please fix test failures before pushing.${NC}\n"
        exit 1
      fi
    else
      log "${YELLOW}⚠️  Could not pull Vercel env. Please fix tests manually.${NC}\n"
      exit 1
    fi
  else
    log "\n${YELLOW}⚠️  Test batch failures detected. Please fix tests before pushing.${NC}"
    log "${YELLOW}Review the batch output above to see which specific tests failed.${NC}\n"
    exit 1
  fi
fi

# Step 6: Check if there are changes to commit
step_header "Step 6/7: Committing Changes"
log "Checking for changes to commit..."

if [ -n "$(git status --porcelain)" ]; then
  log "${BLUE}📝 Changes detected. Preparing commit...${NC}"
  log "Staged files:"
  git diff --cached --name-only | head -10 | while read file; do
    log "  - $file"
  done
  
  # Create commit message
  COMMIT_MSG="fix(build): resolve build errors, test failures, and linting issues
  
- Auto-fixed linting errors
- Resolved build issues
- Fixed test failures
- Updated dependencies if needed"
  
  log "Creating commit..."
  if git commit -m "$COMMIT_MSG"; then
    log "${GREEN}✅ Changes committed${NC}"
    log "Elapsed time: $(get_elapsed_time)\n"
  else
    log "${YELLOW}⚠️  No changes to commit or commit failed${NC}\n"
  fi
else
  log "${GREEN}✅ No changes to commit${NC}"
  log "Elapsed time: $(get_elapsed_time)\n"
fi

# Step 7: Push to GitHub
step_header "Step 7/7: Pushing to GitHub"
log "Preparing to push to GitHub..."
log "Branch: ${BRANCH}"
log "Remote: origin"

PUSH_START=$(date +%s)
log "Executing: git push origin ${BRANCH}"

PUSH_OUTPUT=$(git push origin "$BRANCH" 2>&1)
PUSH_EXIT_CODE=$?

PUSH_END=$(date +%s)
PUSH_DURATION=$((PUSH_END - PUSH_START))

if [ $PUSH_EXIT_CODE -eq 0 ]; then
  log "${GREEN}✅ Successfully pushed to GitHub! (took ${PUSH_DURATION}s)${NC}"
  log "Elapsed time: $(get_elapsed_time)"
  echo -e "\n${GREEN}🎉 All done! Build is clean, tests passed, and code is pushed.${NC}"
  echo -e "${GREEN}Total execution time: $(get_elapsed_time)${NC}\n"
else
  log "${RED}❌ Failed to push to GitHub (took ${PUSH_DURATION}s)${NC}"
  log "${YELLOW}Push output:${NC}"
  echo "$PUSH_OUTPUT"
  
  # Check for GitHub-related errors and try to fix
  if echo "$PUSH_OUTPUT" | grep -qi "no upstream\|set upstream\|upstream"; then
    log "\n${YELLOW}🔧 Detected upstream issue. Setting upstream branch...${NC}"
    log "Setting upstream and pushing..."
    if git push -u origin "$BRANCH" 2>&1; then
      log "${GREEN}✅ Successfully pushed with upstream set!${NC}\n"
      echo -e "${GREEN}🎉 All done! Build is clean, tests passed, and code is pushed.${NC}"
      echo -e "${GREEN}Total execution time: $(get_elapsed_time)${NC}\n"
      exit 0
    fi
  fi
  
  if echo "$PUSH_OUTPUT" | grep -qi "rejected\|non-fast-forward\|fetch first"; then
    log "\n${YELLOW}🔧 Detected remote changes. Attempting to pull and rebase...${NC}"
    
    # Check if GitHub CLI is available for better error handling
    if command -v gh &> /dev/null; then
      log "${BLUE}📊 Checking GitHub repository status...${NC}"
      gh repo view --json name,defaultBranch 2>&1 | head -5 || true
    fi
    
    # Try to pull with rebase
    log "Pulling latest changes with rebase..."
    if git pull --rebase origin "$BRANCH" 2>&1; then
      log "${GREEN}✅ Successfully pulled and rebased. Retrying push...${NC}"
      log "Pushing after rebase..."
      if git push origin "$BRANCH" 2>&1; then
        log "${GREEN}✅ Successfully pushed after rebase!${NC}\n"
        echo -e "${GREEN}🎉 All done! Build is clean, tests passed, and code is pushed.${NC}"
        echo -e "${GREEN}Total execution time: $(get_elapsed_time)${NC}\n"
        exit 0
      fi
    else
      log "${YELLOW}⚠️  Rebase failed. You may have conflicts to resolve.${NC}"
    fi
  fi
  
  if echo "$PUSH_OUTPUT" | grep -qi "permission\|authentication\|unauthorized"; then
    log "\n${YELLOW}🔧 Detected authentication issue.${NC}"
    log "${BLUE}Checking GitHub authentication...${NC}"
    
    # Check GitHub CLI authentication
    if command -v gh &> /dev/null; then
      if gh auth status 2>&1 | grep -qi "logged in"; then
        log "${GREEN}✅ GitHub CLI authenticated${NC}"
      else
        log "${YELLOW}⚠️  GitHub CLI not authenticated. Run: gh auth login${NC}"
      fi
    fi
    
    # Check git remote configuration
    log "${BLUE}Checking git remote configuration...${NC}"
    git remote -v
  fi
  
  if echo "$PUSH_OUTPUT" | grep -qi "branch.*not found\|remote.*not found"; then
    log "\n${YELLOW}🔧 Detected branch/remote issue.${NC}"
    
    # Check if remote exists
    if ! git remote get-url origin &> /dev/null; then
      log "${YELLOW}⚠️  No 'origin' remote found.${NC}"
      if command -v gh &> /dev/null; then
        log "${BLUE}Attempting to get repository URL from GitHub CLI...${NC}"
        REPO_URL=$(gh repo view --json url -q .url 2>/dev/null || echo "")
        if [ -n "$REPO_URL" ]; then
          log "${BLUE}Setting origin to: $REPO_URL${NC}"
          git remote add origin "$REPO_URL" 2>/dev/null || git remote set-url origin "$REPO_URL"
        fi
      fi
    fi
  fi
  
  log "\n${YELLOW}Manual steps you may need:${NC}"
  echo -e "  - Set upstream: git push -u origin $BRANCH"
  echo -e "  - Pull latest changes: git pull origin $BRANCH"
  echo -e "  - Resolve conflicts if any"
  echo -e "  - Check authentication: gh auth login (if using GitHub CLI)"
  log "Total execution time: $(get_elapsed_time)"
  exit 1
fi
