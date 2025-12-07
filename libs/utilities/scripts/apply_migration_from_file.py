#!/usr/bin/env python3
"""
Script to apply a migration file to Supabase using the Supabase Python client.
This script reads a SQL migration file and executes it.
"""

import os
import sys
from supabase import create_client, Client

def apply_migration(project_id: str, migration_file: str):
    """Apply a migration file to Supabase"""
    
    # Get Supabase credentials from environment
    supabase_url = os.getenv('SUPABASE_URL')
    supabase_key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
    
    if not supabase_url or not supabase_key:
        print("❌ Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in environment")
        sys.exit(1)
    
    # Create Supabase client
    supabase: Client = create_client(supabase_url, supabase_key)
    
    # Read migration file
    with open(migration_file, 'r') as f:
        sql_content = f.read()
    
    # Execute the migration
    try:
        result = supabase.rpc('exec_sql', {'sql': sql_content}).execute()
        print(f"✅ Migration applied successfully!")
    except Exception as e:
        print(f"❌ Error applying migration: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 apply_migration_from_file.py <project_id> <migration_file>")
        sys.exit(1)
    
    project_id = sys.argv[1]
    migration_file = sys.argv[2]
    
    apply_migration(project_id, migration_file)


