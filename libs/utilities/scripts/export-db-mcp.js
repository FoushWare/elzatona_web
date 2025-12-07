#!/usr/bin/env node

/**
 * Database Export via MCP
 * Exports database tables to SQL INSERT statements
 *
 * This script requires MCP Supabase server to be running
 * Run via: node scripts/export-db-mcp.js
 */

const fs = require("fs");
const path = require("path");

// Table export order (respecting foreign key dependencies)
const TABLE_ORDER = [
  "learning_cards",
  "categories",
  "topics",
  "admin_users",
  "admins",
  "card_categories",
  "plan_categories",
  "learning_plans",
  "plan_cards",
  "questions",
  "plan_questions",
  "questions_topics",
  "user_progress",
  "question_attempts",
  "problem_solving_tasks",
  "frontend_tasks",
];

// SQL escape function
function escapeSQL(value) {
  if (value === null || value === undefined) {
    return "NULL";
  }
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }
  if (typeof value === "number") {
    return value.toString();
  }
  if (typeof value === "object") {
    // JSON/JSONB or arrays
    const jsonStr = JSON.stringify(value);
    return `'${jsonStr.replace(/'/g, "''")}'::jsonb`;
  }
  // String - escape single quotes and backslashes
  return `'${String(value).replace(/\\/g, "\\\\").replace(/'/g, "''")}'`;
}

// Generate INSERT SQL from rows
function generateInsertSQL(tableName, rows) {
  if (!rows || rows.length === 0) {
    return `-- Table: ${tableName}\n-- No data (0 rows)\n\n`;
  }

  const columns = Object.keys(rows[0]);
  const columnList = columns.map((col) => `"${col}"`).join(", ");

  let sql = `-- Table: ${tableName}\n-- Rows: ${rows.length}\n\n`;

  // Generate INSERT statements in batches of 50
  const batchSize = 50;
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    sql += `INSERT INTO "${tableName}" (${columnList}) VALUES\n`;

    const values = batch.map((row, idx) => {
      const rowValues = columns.map((col) => escapeSQL(row[col]));
      return `  (${rowValues.join(", ")})`;
    });

    sql += values.join(",\n");
    sql += idx < rows.length - 1 ? ",\n\n" : ";\n\n";
  }

  return sql;
}

// Export instructions
const instructions = `# Database Backup Export

## Usage

This script exports database tables to SQL files that can be used for seeding.

## Export via MCP

Since MCP requires interactive execution, use the following approach:

### Option 1: Use Supabase CLI (Recommended)
\`\`\`bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref kiycimlsatwfqxtfprlr

# Export schema
supabase db dump --schema public -f database-backup/schema.sql

# Export data
supabase db dump --data-only --schema public -f database-backup/data.sql
\`\`\`

### Option 2: Manual Export via MCP Tools
Use the MCP Supabase tools to export each table:

1. For each table in order:
   - Execute: SELECT * FROM table_name;
   - Format as INSERT statements
   - Save to database-backup/data.sql

2. Export schema separately using:
   - supabase db dump --schema-only

## Table Export Order
${TABLE_ORDER.map((t, i) => `${i + 1}. ${t}`).join("\n")}

## Import Instructions

\`\`\`bash
# Import schema first
psql <connection-string> < database-backup/schema.sql

# Then import data
psql <connection-string> < database-backup/data.sql
\`\`\`
`;

// Create output directory and instructions
const outputDir = path.join(__dirname, "..", "database-backup");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(path.join(outputDir, "EXPORT_INSTRUCTIONS.md"), instructions);

console.log("📋 Export instructions created at:");
console.log(`   ${path.join(outputDir, "EXPORT_INSTRUCTIONS.md")}\n`);
console.log("💡 To export data, use Supabase CLI or MCP tools directly.\n");
