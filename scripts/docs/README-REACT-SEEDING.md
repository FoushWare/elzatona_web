# React Questions Seeding Scripts

This directory contains scripts to clear existing questions from Firebase and seed React questions from the updated JSON files.

## 📁 Available Scripts

### 🗑️ Clear Scripts

- **`clear-questions.ts`** - Removes all questions from the Firebase 'questions' collection

### 🌱 Individual Seeding Scripts

- **`seed-react-1-25.ts`** - Seeds React questions 1-25
- **`seed-react-26-50.ts`** - Seeds React questions 26-50
- **`seed-react-51-75.ts`** - Seeds React questions 51-75
- **`seed-react-76-100.ts`** - Seeds React questions 76-100
- **`seed-react-101-151.ts`** - Seeds React questions 101-151
- **`seed-react-152-200.ts`** - Seeds React questions 152-200
- **`seed-react-201-251.ts`** - Seeds React questions 201-251
- **`seed-react-252-306.ts`** - Seeds React questions 252-306

### 🚀 Master Scripts

- **`seed-all-react-questions.ts`** - Runs all seeding scripts in sequence
- **`seed-react-questions.sh`** - Shell script runner for easy execution

## 🛠️ Usage

### Method 1: Using the Shell Script Runner (Recommended)

```bash
# Clear all questions
./scripts/seed-react-questions.sh clear

# Seed all React questions (1-306)
./scripts/seed-react-questions.sh seed-all

# Seed specific ranges
./scripts/seed-react-questions.sh seed-1-25
./scripts/seed-react-questions.sh seed-26-50
./scripts/seed-react-questions.sh seed-51-75
./scripts/seed-react-questions.sh seed-76-100
./scripts/seed-react-questions.sh seed-101-151
./scripts/seed-react-questions.sh seed-152-200
./scripts/seed-react-questions.sh seed-201-251
./scripts/seed-react-questions.sh seed-252-306
```

### Method 2: Using TypeScript Directly

```bash
# Clear all questions
npx ts-node scripts/clear-questions.ts

# Seed all React questions
npx ts-node scripts/seed-all-react-questions.ts

# Seed individual ranges
npx ts-node scripts/seed-react-1-25.ts
npx ts-node scripts/seed-react-26-50.ts
# ... etc
```

## 📊 Question Statistics

| File             | Questions | Range     | Status             |
| ---------------- | --------- | --------- | ------------------ |
| `1-25QA.json`    | 25        | 1-25      | ✅ Updated         |
| `26-50QA.json`   | 25        | 26-50     | ✅ Updated         |
| `51-75QA.json`   | 25        | 51-75     | ✅ Updated         |
| `76-100QA.json`  | 25        | 76-100    | ✅ Updated         |
| `101-151QA.json` | 51        | 101-151   | ✅ Updated         |
| `152-200QA.json` | 49        | 152-200   | ✅ Updated         |
| `201-251QA.json` | 51        | 201-251   | ✅ Updated         |
| `252-306QA.json` | 55        | 252-306   | ✅ Updated         |
| **Total**        | **306**   | **1-306** | **✅ All Updated** |

## 🔄 Schema Updates Applied

All React question files have been updated to match the `UnifiedQuestion` schema:

- ✅ **Replaced**: `"learningPath": "React Developer Path"`
- ✅ **With**: `"learningCardId": "framework-questions"`
- ✅ **All questions** now properly assigned to the "Framework Questions" learning card
- ✅ **Schema compliance** verified across all files

## 🎯 Learning Card Integration

All React questions are now integrated with the learning card system:

- **Learning Card**: `framework-questions`
- **Category**: `React`
- **Topics**: Various React topics (Components, Hooks, State, etc.)
- **Difficulty**: `beginner`, `intermediate`, `advanced`
- **Types**: `multiple-choice`, `open-ended`, `true-false`, `code`

## ⚠️ Prerequisites

1. **Environment Variables**: Ensure your `.env` file contains Firebase configuration:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

2. **Dependencies**: Ensure required packages are installed:

   ```bash
   npm install firebase dotenv
   ```

3. **Firebase Project**: Ensure your Firebase project is properly configured and accessible

## 🔍 Verification

After seeding, verify the questions are properly loaded:

1. **Admin Interface**: Visit `/admin/content/questions` to see all seeded questions
2. **API Endpoint**: Test `/api/questions/unified` to verify data structure
3. **Learning Cards**: Check that questions appear under the "Framework Questions" card
4. **Search & Filter**: Test search and filtering functionality

## 🚨 Important Notes

- **Backup**: Always backup your data before running clear scripts
- **Sequential**: Run scripts in order for proper question numbering
- **Environment**: Ensure you're running against the correct Firebase environment
- **Permissions**: Verify Firebase security rules allow question creation

## 🐛 Troubleshooting

### Common Issues:

1. **Firebase Connection Error**: Check environment variables and Firebase configuration
2. **Permission Denied**: Verify Firebase security rules allow write operations
3. **File Not Found**: Ensure JSON files exist in `data/json/React/` directory
4. **Schema Validation**: Verify JSON files match `UnifiedQuestion` schema

### Debug Commands:

```bash
# Test Firebase connection
npx ts-node scripts/test-firebase-connection.ts

# Check existing data
npx ts-node scripts/list-existing-data.ts

# Verify JSON files
node -e "console.log(JSON.parse(require('fs').readFileSync('data/json/React/1-25QA.json', 'utf8')).length)"
```

## 📈 Performance

- **Batch Processing**: Scripts process questions in parallel for better performance
- **Error Handling**: Individual question failures don't stop the entire process
- **Progress Tracking**: Detailed logging shows progress for each question
- **Memory Efficient**: Questions are processed in batches to avoid memory issues

---

**Total Questions**: 306 React questions ready for seeding! 🎉
