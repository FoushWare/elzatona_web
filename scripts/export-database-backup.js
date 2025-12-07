#!/usr/bin/env node

/**
 * Database Backup Export Script
 * Exports all tables from Supabase to SQL files for local backup and seeding
 *
 * Usage: node scripts/export-database-backup.js
 */

const fs = require("fs");
const path = require("path");

// Table export order (respecting foreign key dependencies)
const TABLE_ORDER = [
  // Foundation tables (no dependencies)
  "learning_cards",
  "categories",
  "topics",
  "admin_users",
  "admins",

  // Dependent tables
  "card_categories",
  "plan_categories",
  "learning_plans",
  "plan_cards",
  "questions",
  "plan_questions",
  "questions_topics",

  // User data tables (can be empty for seeding)
  "user_progress",
  "question_attempts",
  "problem_solving_tasks",
  "frontend_tasks",
];

// SQL template for INSERT statements
function generateInsertSQL(tableName, rows) {
  if (!rows || rows.length === 0) {
    return `-- Table: ${tableName}\n-- No data to export\n\n`;
  }

  // Get column names from first row
  const columns = Object.keys(rows[0]);
  const columnList = columns.map((col) => `"${col}"`).join(", ");

  let sql = `-- Table: ${tableName}\n-- Rows: ${rows.length}\n\n`;

  // Generate INSERT statements in batches of 100
  const batchSize = 100;
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    sql += `INSERT INTO "${tableName}" (${columnList}) VALUES\n`;

    const values = batch.map((row, idx) => {
      const rowValues = columns.map((col) => {
        const value = row[col];
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
          return `'${JSON.stringify(value).replace(/'/g, "''")}'::jsonb`;
        }
        // String - escape single quotes
        return `'${String(value).replace(/'/g, "''")}'`;
      });
      return `  (${rowValues.join(", ")})`;
    });

    sql += values.join(",\n") + ";\n\n";
  }

  return sql;
}

// Main export function
async function exportDatabase() {
  console.log("📦 Starting database export...\n");

  const outputDir = path.join(__dirname, "..", "database-backup");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-")
    .split("T")[0];
  const schemaFile = path.join(outputDir, `schema-${timestamp}.sql`);
  const dataFile = path.join(outputDir, `data-${timestamp}.sql`);
  const combinedFile = path.join(outputDir, `full-backup-${timestamp}.sql`);

  let schemaSQL = `-- Database Schema Export\n`;
  schemaSQL += `-- Generated: ${new Date().toISOString()}\n`;
  schemaSQL += `-- Project: Elzatona Web\n\n`;
  schemaSQL += `-- This file contains the database schema (table structures)\n`;
  schemaSQL += `-- Use this to recreate tables before importing data\n\n`;

  let dataSQL = `-- Database Data Export\n`;
  dataSQL += `-- Generated: ${new Date().toISOString()}\n`;
  dataSQL += `-- Project: Elzatona Web\n\n`;
  dataSQL += `-- This file contains INSERT statements for all tables\n`;
  dataSQL += `-- Run this after creating tables from schema-*.sql\n\n`;
  dataSQL += `-- Disable foreign key checks temporarily (if needed)\n`;
  dataSQL += `-- SET session_replication_role = 'replica';\n\n`;

  console.log("⚠️  Note: This script generates a template.\n");
  console.log("📝 To export actual data, you need to:");
  console.log("   1. Use Supabase CLI: supabase db dump");
  console.log("   2. Or use pg_dump directly");
  console.log("   3. Or run SQL queries via MCP to export data\n");

  // Generate instructions file
  const instructions = `# Database Backup Instructions

## Export Methods

### Method 1: Using Supabase CLI (Recommended)
\`\`\`bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref kiycimlsatwfqxtfprlr

# Export schema
supabase db dump --schema public -f database-backup/schema-export.sql

# Export data
supabase db dump --data-only --schema public -f database-backup/data-export.sql
\`\`\`

### Method 2: Using pg_dump (Direct PostgreSQL)
\`\`\`bash
# Get connection string from Supabase dashboard
# Settings > Database > Connection string

# Export schema
pg_dump -h <host> -U postgres -d postgres \\
  --schema-only --schema=public \\
  -f database-backup/schema-export.sql

# Export data
pg_dump -h <host> -U postgres -d postgres \\
  --data-only --schema=public \\
  -f database-backup/data-export.sql
\`\`\`

### Method 3: Using MCP (Manual Export)
Run SQL queries via MCP to export each table:
\`\`\`sql
-- Example for questions table
SELECT * FROM questions WHERE is_active = true;
\`\`\`

Then format as INSERT statements.

## Import/Seed Instructions

### Using Supabase CLI
\`\`\`bash
# Import schema
supabase db reset --db-url <connection-string> < database-backup/schema-export.sql

# Import data
psql <connection-string> < database-backup/data-export.sql
\`\`\`

### Using psql
\`\`\`bash
# Import schema
psql <connection-string> < database-backup/schema-export.sql

# Import data
psql <connection-string> < database-backup/data-export.sql
\`\`\`

## Table Export Order (for manual export)
${TABLE_ORDER.map((t, i) => `${i + 1}. ${t}`).join("\n")}

## Important Notes
- Always export schema before data
- Respect foreign key dependencies when importing
- Test imports on a development database first
- Backup current database before importing
- Some tables may be empty (user_progress, question_attempts, etc.)
`;

  fs.writeFileSync(
    path.join(outputDir, "EXPORT_INSTRUCTIONS.md"),
    instructions,
  );

  console.log("✅ Created export instructions:");
  console.log(`   ${path.join(outputDir, "EXPORT_INSTRUCTIONS.md")}\n`);
  console.log("📋 Next steps:");
  console.log("   1. Review EXPORT_INSTRUCTIONS.md");
  console.log("   2. Choose an export method");
  console.log("   3. Run the export commands");
  console.log("   4. Verify the backup files\n");
}

// Run export
exportDatabase().catch(console.error);
