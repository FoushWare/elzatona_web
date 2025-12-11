#!/usr/bin/env python3
"""
Generate INSERT statements for all topics.
"""

# Read topics from the JSON file or use the data directly
# For now, we'll create a template that inserts all topics

sql = """-- Migration to insert all topics from testing database
-- Temporarily disable foreign key checks
SET session_replication_role = 'replica';

-- Insert all topics in batches
-- Batch 1: First 100 topics
INSERT INTO topics (id, name, slug, description, category_id, difficulty, estimated_questions, order_index, is_active, created_at, updated_at)
VALUES
"""

# We need to format the topics data properly
# Since we have 184 topics, we'll split them into batches

print("Generating migration file...")
print("Note: This will create INSERT statements for all 184 topics")

# The actual topic data would need to be formatted here
# For now, let's create a placeholder that shows the structure



