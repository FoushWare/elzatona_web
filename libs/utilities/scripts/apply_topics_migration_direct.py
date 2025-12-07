#!/usr/bin/env python3
"""
Script to apply the topics migration file directly using Supabase Management API.
This reads the migration file and applies it via the Supabase API.
"""

import os
import sys
import requests
import json

def apply_migration_via_api():
    """Apply migration using Supabase Management API"""
    
    # Get credentials from environment
    supabase_url = os.getenv('SUPABASE_URL')
    supabase_service_key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
    project_id = 'hpnewqkvpnthpohvxcmq'
    
    if not supabase_url or not supabase_service_key:
        print("❌ Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set")
        sys.exit(1)
    
    migration_file = 'Rest/migrations/20251201160000_insert_all_topics.sql'
    
    if not os.path.exists(migration_file):
        print(f"❌ Error: Migration file not found: {migration_file}")
        sys.exit(1)
    
    # Read the migration file
    with open(migration_file, 'r') as f:
        sql_content = f.read()
    
    print(f"✅ Read migration file ({len(sql_content)} characters)")
    
    # Use Supabase Management API to apply migration
    # Note: This requires the Management API endpoint
    print("⚠️  Note: This script would use Supabase Management API")
    print("   For now, we'll use MCP tools instead")
    
    return sql_content

if __name__ == '__main__':
    sql = apply_migration_via_api()
    print(f"\n✅ Migration file ready (length: {len(sql)} chars)")


