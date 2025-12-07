#!/usr/bin/env python3
"""
Script to apply the topics migration file to Supabase.
This reads the migration file and executes it using the Supabase Management API.
"""

import os
import sys
import subprocess

def apply_migration_file():
    """Apply the topics migration file using psql or Supabase CLI"""
    
    migration_file = 'Rest/migrations/20251201160000_insert_all_topics.sql'
    
    if not os.path.exists(migration_file):
        print(f"❌ Error: Migration file not found: {migration_file}")
        sys.exit(1)
    
    # Read the migration file
    with open(migration_file, 'r') as f:
        sql_content = f.read()
    
    print(f"✅ Read migration file ({len(sql_content)} characters)")
    print(f"📝 File contains {sql_content.count('VALUES')} INSERT statements")
    
    # Check if we can use psql
    # For now, just print the SQL so it can be executed manually or via MCP
    print("\n⚠️  Note: This script reads the migration file.")
    print("   The SQL needs to be executed via Supabase MCP tools.")
    print(f"   File location: {os.path.abspath(migration_file)}")
    
    # Return the SQL content for use
    return sql_content

if __name__ == '__main__':
    sql = apply_migration_file()
    print(f"\n✅ Migration file ready (length: {len(sql)} chars)")


