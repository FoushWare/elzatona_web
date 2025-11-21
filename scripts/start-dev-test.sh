#!/bin/bash

# Start dev server with test environment
# This script ensures .env.test.local is loaded BEFORE Next.js starts

# Load .env.test.local first
if [ -f .env.test.local ]; then
  export $(cat .env.test.local | grep -v '^#' | xargs)
  echo "✅ Loaded .env.test.local"
fi

# Set test environment variables
export APP_ENV=test
export NEXT_PUBLIC_APP_ENV=test
export NODE_ENV=development

# Start the dev server
exec npm run dev:light

