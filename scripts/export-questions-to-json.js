#!/usr/bin/env node

/**
 * Export all questions from Supabase to JSON file
 * Usage: node scripts/export-questions-to-json.js
 */

const fs = require('fs');
const path = require('path');

// This script will be run via MCP, so we'll use a different approach
// We'll query the database directly via MCP and write the results

console.log('📦 Exporting questions from database...');
console.log('⚠️  This script requires MCP Supabase connection.');
console.log('💡 Run the export via MCP execute_sql tool instead.');

// Instructions for manual export
const instructions = `# Export Questions to JSON

## Method 1: Using MCP (Recommended)

Run this SQL query via MCP to export all questions:

\`\`\`sql
SELECT 
  id,
  title,
  content,
  type,
  difficulty,
  points,
  options,
  correct_answer,
  explanation,
  test_cases,
  hints,
  tags,
  stats,
  metadata,
  category_id,
  learning_card_id,
  topic_id,
  is_active,
  time_limit,
  code_template,
  examples,
  constraints,
  language,
  resources,
  created_at,
  updated_at
FROM questions
WHERE is_active = true
ORDER BY created_at;
\`\`\`

Then format the results as JSON and save to \`Rest/questions-v02/questions.json\`.

## Method 2: Using Supabase CLI

\`\`\`bash
# Export to CSV first
supabase db dump --data-only --schema public -f questions.csv

# Then convert CSV to JSON (requires additional tooling)
\`\`\`

## Method 3: Using pg_dump

\`\`\`bash
pg_dump -h <host> -U postgres -d postgres \\
  --data-only --schema=public \\
  -t questions \\
  --format=custom \\
  -f questions.dump
\`\`\`
`;

fs.writeFileSync(
  path.join(__dirname, '..', 'Rest', 'questions-v02', 'EXPORT_INSTRUCTIONS.md'),
  instructions
);

console.log('✅ Created export instructions at: Rest/questions-v02/EXPORT_INSTRUCTIONS.md');




