#!/usr/bin/env python3
"""
Script to copy missing topics from testing database to main database.
This script fetches all topics from testing database and inserts only those that don't exist in main.
"""

import os
import sys
import json

# This script will be used to generate SQL for missing topics
# We'll use MCP to execute the queries

print("This script identifies missing topics and generates INSERT statements")
print("The actual copying will be done via Supabase MCP tools")

