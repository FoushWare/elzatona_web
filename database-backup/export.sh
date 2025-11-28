#!/bin/bash

# Database Export Script
# Exports Supabase database schema and data for backup

set -e

PROJECT_REF="kiycimlsatwfqxtfprlr"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="$(dirname "$0")"

echo "📦 Starting database export..."
echo ""

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI is not installed."
    echo "   Install it with: npm install -g supabase"
    exit 1
fi

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

echo "🔗 Linking to project..."
supabase link --project-ref "$PROJECT_REF" || {
    echo "⚠️  Project already linked or link failed. Continuing..."
}

echo ""
echo "📋 Exporting schema..."
supabase db dump --schema public -f "$BACKUP_DIR/schema-$TIMESTAMP.sql" || {
    echo "❌ Schema export failed"
    exit 1
}

echo ""
echo "💾 Exporting data..."
supabase db dump --data-only --schema public -f "$BACKUP_DIR/data-$TIMESTAMP.sql" || {
    echo "❌ Data export failed"
    exit 1
}

echo ""
echo "📦 Exporting full backup (schema + data)..."
supabase db dump --schema public -f "$BACKUP_DIR/full-backup-$TIMESTAMP.sql" || {
    echo "❌ Full backup export failed"
    exit 1
}

echo ""
echo "✅ Export complete!"
echo ""
echo "📁 Files created:"
echo "   - schema-$TIMESTAMP.sql"
echo "   - data-$TIMESTAMP.sql"
echo "   - full-backup-$TIMESTAMP.sql"
echo ""
echo "💡 To restore, use:"
echo "   psql <connection-string> < $BACKUP_DIR/schema-$TIMESTAMP.sql"
echo "   psql <connection-string> < $BACKUP_DIR/data-$TIMESTAMP.sql"




