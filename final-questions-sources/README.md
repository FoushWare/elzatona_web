# Final Questions Sources

This directory contains all exported questions from the learning platform for deployment to new environments.

## Files

- `master-questions-export.json` - Complete export of all questions
- `*-questions.json` - Questions grouped by category
- `import-questions-to-new-environment.js` - Script to import questions to new environment

## Usage

### Export Questions (Current Environment)
```bash
node scripts/export-questions-for-deployment.js
```

### Import Questions (New Environment)
```bash
# Set target environment URL
export TARGET_BASE_URL=https://your-new-environment.com

# Run import script
node final-questions-sources/import-questions-to-new-environment.js
```

## Question Statistics

- **Total Questions:** 214
- **Categories:** 14
- **Export Date:** 2025-09-30T00:28:57.760Z

## Categories

- **Web Performance:** 5 questions (web-performance-questions.json)
- **TypeScript (Core):** 12 questions (typescript--core--questions.json)
- **Testing Strategies:** 8 questions (testing-strategies-questions.json)
- **System Design:** 8 questions (system-design-questions.json)
- **Security:** 6 questions (security-questions.json)
- **React.js (Core):** 12 questions (react-js--core--questions.json)
- **JavaScript (Core):** 47 questions (javascript--core--questions.json)
- **Git & Version Control:** 6 questions (git---version-control-questions.json)
- **HTML & CSS:** 84 questions (html---css-questions.json)
- **English Learning:** 1 questions (english-learning-questions.json)
- **Deployment & DevOps:** 9 questions (deployment---devops-questions.json)
- **API Design:** 9 questions (api-design-questions.json)
- **CSS & Styling:** 2 questions (css---styling-questions.json)
- **Accessibility:** 5 questions (accessibility-questions.json)

## Notes

- All questions are properly categorized and linked to learning paths
- Questions include proper metadata for topics and difficulty levels
- Import script handles batch processing for large datasets
- Questions are validated before import to ensure data integrity
