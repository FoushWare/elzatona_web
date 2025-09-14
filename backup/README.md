# 📁 Question Backup System

This directory contains automatic backups of questions organized by section.

## Structure

```
backup/
├── questions/
│   ├── learning-questions.json
│   ├── practice-questions.json
│   ├── interview-prep-questions.json
│   ├── media-questions.json
│   └── ...
└── README.md
```

## How It Works

1. **Automatic Backup**: When you create a new question in the admin panel, it's automatically backed up to the appropriate section file.

2. **Section Organization**: Questions are organized by their section (learning, practice, interview-prep, etc.).

3. **File Format**: Each backup file contains a JSON array of questions with all their data including:
   - Question text and content
   - Answer options and correct answers
   - Audio file URLs (if any)
   - Metadata (creation date, difficulty, etc.)

4. **Restoration**: You can view and manage backups through the Admin Panel → Backup Management.

## Backup Management

Access the backup management system at `/admin/backup` to:

- View backup statistics
- Browse questions by section
- Delete section backups
- Prepare for restoration to Firebase

## File Naming Convention

- Section names are converted to lowercase
- Special characters are replaced with hyphens
- Format: `{section-name}-questions.json`

Examples:

- `learning` → `learning-questions.json`
- `interview-prep` → `interview-prep-questions.json`
- `system design` → `system-design-questions.json`

## Security Note

These backup files contain all question data and should be treated as sensitive information. They are stored locally and not uploaded to any external services.
