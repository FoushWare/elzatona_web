#!/usr/bin/env python3
"""
Script to copy all data from zatona-web-testing to zatona-web database.
This script generates SQL migration files for copying data.
"""

import json
import sys
from pathlib import Path

# Read topics from the JSON file
topics_file = Path(__file__).parent.parent / "Rest" / "topics" / "1.json"

if not topics_file.exists():
    print(f"Error: Topics file not found at {topics_file}")
    sys.exit(1)

with open(topics_file, 'r') as f:
    topics = json.load(f)

print(f"Found {len(topics)} topics to insert")

# Generate SQL migration for topics
sql_lines = [
    "-- Migration to copy all topics from testing database",
    "-- Temporarily disable foreign key checks",
    "SET session_replication_role = 'replica';",
    "",
    "-- Insert all topics",
    "INSERT INTO topics (id, name, slug, description, category_id, difficulty, estimated_questions, order_index, is_active, created_at, updated_at)",
    "VALUES"
]

# Generate VALUES for each topic
values = []
for topic in topics:
    # Escape single quotes in strings
    name = topic.get('name', '').replace("'", "''")
    slug = topic.get('slug', '').replace("'", "''")
    description = topic.get('description', '').replace("'", "''")
    category_id = topic.get('categoryId') or topic.get('category_id') or topic.get('category')
    difficulty = topic.get('difficulty', 'beginner')
    estimated_questions = topic.get('estimatedQuestions', 10) or topic.get('estimated_questions', 10) or 10
    order_index = topic.get('orderIndex', 1) or topic.get('order_index', 1) or 1
    is_active = topic.get('is_active', True) if topic.get('is_active') is not None else True
    created_at = topic.get('created_at', 'NOW()')
    updated_at = topic.get('updated_at', 'NOW()')
    
    # Format timestamps
    if isinstance(created_at, str) and created_at != 'NOW()':
        created_at = f"'{created_at}'"
    elif created_at == 'NOW()':
        created_at = 'NOW()'
    else:
        created_at = 'NOW()'
    
    if isinstance(updated_at, str) and updated_at != 'NOW()':
        updated_at = f"'{updated_at}'"
    elif updated_at == 'NOW()':
        updated_at = 'NOW()'
    else:
        updated_at = 'NOW()'
    
    # Handle null difficulty
    if difficulty is None:
        difficulty_str = 'NULL'
    else:
        difficulty_str = f"'{difficulty}'"
    
    value = f"  ('{topic['id']}'::uuid, '{name}', '{slug}', '{description}', '{category_id}'::uuid, {difficulty_str}, {estimated_questions}, {order_index}, {str(is_active).lower()}, {created_at}, {updated_at})"
    values.append(value)

# Join all values with commas
sql_lines.append(",\n".join(values))
sql_lines.append("ON CONFLICT (id) DO NOTHING;")
sql_lines.append("")
sql_lines.append("-- Re-enable foreign key checks")
sql_lines.append("SET session_replication_role = 'origin';")

# Write to migration file
migration_file = Path(__file__).parent.parent / "Rest" / "migrations" / "20251201160000_insert_all_topics.sql"
migration_file.parent.mkdir(parents=True, exist_ok=True)

with open(migration_file, 'w') as f:
    f.write('\n'.join(sql_lines))

print(f"✅ Generated migration file: {migration_file}")
print(f"   Contains {len(topics)} topic INSERT statements")



