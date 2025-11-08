#!/bin/bash

# Fix all Supabase imports in shared-contexts
cd /Users/a.fouad/SideProjects/Elzatona-web/libs/shared-contexts/src/lib/

# List of files to fix
files=(
  "UserTypeContextSafe.tsx"
  "OnboardingContext.tsx"
  "UserTypeContext.tsx"
  "NotificationContext.tsx"
  "UserPreferencesContext.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Fixing $file..."
    
    # Create backup
    cp "$file" "$file.backup"
    
    # Replace the Supabase import section
    sed -i '' 's/import { createClient } from '\''@supabase\/supabase-js'\'';//' "$file"
    sed -i '' 's/const supabaseUrl = process\.env\.NEXT_PUBLIC_SUPABASE_URL!;//' "$file"
    sed -i '' 's/const supabaseServiceRoleKey = process\.env\.SUPABASE_SERVICE_ROLE_KEY!;//' "$file"
    sed -i '' 's/const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);//' "$file"
    
    # Add the conditional Supabase client creation
    sed -i '' '/^'\''use client'\'';/a\
\
// Only create Supabase client if environment variables are available\
let supabase: any = null;\
if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {\
  const { createClient } = require('\''@supabase/supabase-js'\'');\
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;\
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;\
  supabase = createClient(supabaseUrl, supabaseServiceRoleKey);\
}' "$file"
    
    echo "Fixed $file"
  fi
done

echo "All files fixed!"

