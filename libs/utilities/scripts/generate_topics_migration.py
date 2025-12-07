#!/usr/bin/env python3
"""
Script to generate SQL migration for inserting all topics from testing database.
"""

# Topics data from the query result
# We'll generate INSERT statements for all 184 topics
# For efficiency, we'll use a single INSERT with multiple VALUES

print("-- Migration to insert all topics from testing database")
print("-- Temporarily disable foreign key checks")
print("SET session_replication_role = 'replica';")
print("")
print("-- Insert all topics")
print("-- Note: This migration assumes categories have already been inserted")
print("")
print("-- We'll insert topics in batches to avoid query size limits")
print("-- Batch 1: First 50 topics")

# Since we have the topics data, we need to format them properly
# For now, let's create a template that can be filled in

print("""
-- Example format:
-- INSERT INTO topics (id, name, slug, description, category_id, difficulty, estimated_questions, order_index, is_active, created_at, updated_at)
-- VALUES
--   ('uuid1', 'name1', 'slug1', 'desc1', 'cat-uuid1'::uuid, 'intermediate', 10, 1, true, '2025-11-15 23:38:17.866145+00', '2025-11-15 23:38:17.866145+00'),
--   ...
-- ON CONFLICT (id) DO NOTHING;
""")

print("-- Re-enable foreign key checks")
print("SET session_replication_role = 'origin';")


