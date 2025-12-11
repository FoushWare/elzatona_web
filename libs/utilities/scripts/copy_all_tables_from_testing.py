#!/usr/bin/env python3
"""
Script to generate a migration that copies all tables and data from testing database to main database.
This script uses the Supabase MCP to fetch data and generate SQL migration.
"""

import json
import sys
from datetime import datetime

def escape_sql_string(value):
    """Escape a string for SQL insertion"""
    if value is None:
        return 'NULL'
    if isinstance(value, (dict, list)):
        return f"'{json.dumps(value).replace("'", "''")}'::jsonb"
    return f"'{str(value).replace("'", "''")}'"

def format_array(value):
    """Format an array for SQL"""
    if value is None:
        return 'NULL'
    if isinstance(value, list):
        return f"ARRAY{json.dumps(value)}"
    return 'NULL'

def format_jsonb(value):
    """Format a JSONB value for SQL"""
    if value is None:
        return 'NULL'
    return f"'{json.dumps(value).replace("'", "''")}'::jsonb"

def generate_migration():
    """Generate the migration SQL"""
    
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    migration_name = f"20251201{timestamp}_recreate_all_tables_from_testing"
    
    sql_lines = [
        "-- Migration to recreate all tables and copy data from testing database",
        "-- Temporarily disable foreign key checks",
        "SET session_replication_role = 'replica';",
        "",
        "-- Note: This migration assumes tables have already been dropped",
        "-- If tables exist, they should be dropped first",
        "",
    ]
    
    # Add CREATE TABLE statements based on the schema we know
    # This is a simplified version - in production, you'd want to generate these dynamically
    
    sql_lines.append("-- Create learning_cards table")
    sql_lines.append("""
CREATE TABLE IF NOT EXISTS learning_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR NOT NULL,
    type VARCHAR NOT NULL CHECK (type IN ('core-technologies', 'framework-questions', 'problem-solving', 'system-design')),
    description TEXT,
    color VARCHAR,
    icon VARCHAR,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
""")
    
    # Continue with other tables...
    # For now, let's create a note that this needs to be completed
    sql_lines.append("-- TODO: Add CREATE TABLE statements for all other tables")
    sql_lines.append("-- TODO: Add INSERT statements for all data")
    
    sql_lines.append("")
    sql_lines.append("SET session_replication_role = 'origin';")
    
    migration_content = "\n".join(sql_lines)
    
    # Write to file
    output_file = f"Rest/migrations/{migration_name}.sql"
    with open(output_file, 'w') as f:
        f.write(migration_content)
    
    print(f"✅ Generated migration file: {output_file}")
    print("⚠️  Note: This is a template. You need to:")
    print("   1. Add CREATE TABLE statements for all tables")
    print("   2. Add INSERT statements for all data")
    print("   3. Use the Supabase MCP tools to get the actual schema and data")

if __name__ == "__main__":
    generate_migration()


