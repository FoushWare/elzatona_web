# System Design Questions Seeding Documentation

## Overview

This document provides comprehensive instructions for seeding System Design questions into the Firebase database. The system design questions cover frontend system design topics including architecture, performance, data flow, and scalability.

## Files Structure

```
scripts/
├── transform-system-design-questions.js    # Transformation script
├── seed-system-design-questions.ts        # TypeScript seeding script
├── seed-system-design-questions.js        # JavaScript seeding script
└── seed-system-design-questions.sh        # Shell script runner

data/json/system_design/
└── questions-system-design.json           # System Design questions data
```

## Question Statistics

- **Total Questions**: 160 system design questions
- **Categories**: System Design
- **Topics Covered**:
  - Frontend System Design
  - Architecture
  - Performance
  - Data Flow
  - Scalability
  - State Management
  - Caching
  - Security
  - Monitoring
  - Testing

## Question Types

- **Multiple Choice**: Questions with multiple correct answers
- **Open-ended**: Questions requiring detailed explanations
- **True/False**: Binary choice questions

## Difficulty Levels

- **Beginner**: Basic system design concepts
- **Intermediate**: Moderate complexity system design topics
- **Advanced**: Complex system design scenarios

## Usage Instructions

### Prerequisites

1. Ensure Firebase service account key is available in `firebase-service-account.json`
2. Install required dependencies:
   ```bash
   npm install firebase-admin dotenv
   ```

### Step 1: Transform Questions (Already Done)

The questions have been transformed to match the `UnifiedQuestion` schema:

```bash
# This step is already completed
node scripts/transform-system-design-questions.js
```

**Transformation Changes:**

- Updated `id` format to `system-design-q1`, `system-design-q2`, etc.
- Set `category` to "System Design"
- Set `learningCardId` to "system-design"
- Added required fields: `createdBy`, `updatedBy`, `points`, `hints`, `metadata`
- Updated `tags` array with system design specific tags
- Mapped difficulty levels to standardized format

### Step 2: Clear Existing Questions (Optional)

If you want to start fresh:

```bash
# Using shell script
./scripts/seed-system-design-questions.sh clear

# Or using TypeScript directly
npx ts-node scripts/clear-questions.ts
```

### Step 3: Seed System Design Questions

```bash
# Using shell script (recommended)
./scripts/seed-system-design-questions.sh seed

# Or using JavaScript directly
node scripts/seed-system-design-questions.js

# Or using TypeScript
npx ts-node scripts/seed-system-design-questions.ts
```

## Sample Questions

### Multiple Choice Example

```json
{
  "id": "system-design-q1",
  "title": "What are the different approaches for pagination in frontend?",
  "content": "Compare offset-based pagination, cursor-based pagination, and infinite scrolling. Which approach is better for large datasets?",
  "type": "multiple-choice",
  "category": "System Design",
  "topic": "Frontend System Design",
  "difficulty": "intermediate",
  "learningCardId": "system-design",
  "options": [
    {
      "id": "o1",
      "text": "Offset-based pagination",
      "isCorrect": true,
      "explanation": ""
    },
    {
      "id": "o2",
      "text": "Cursor-based pagination",
      "isCorrect": true,
      "explanation": ""
    },
    {
      "id": "o3",
      "text": "Infinite scrolling",
      "isCorrect": true,
      "explanation": ""
    },
    {
      "id": "o4",
      "text": "Randomized pagination",
      "isCorrect": false,
      "explanation": ""
    }
  ]
}
```

### Open-ended Example

```json
{
  "id": "system-design-q2",
  "title": "What is a signed URL for images?",
  "content": "Explain how signed URLs are used for secure and performant image delivery in frontend applications.",
  "type": "open-ended",
  "category": "System Design",
  "topic": "Frontend System Design",
  "difficulty": "beginner",
  "learningCardId": "system-design",
  "explanation": "Signed URLs provide secure, time-limited access to private resources without requiring authentication on each request."
}
```

## Verification

After seeding, verify the questions are properly loaded:

1. **Check Firebase Console**: Navigate to Firestore and verify questions are in the `questions` collection
2. **Check Admin Panel**: Visit `/admin/content/questions` and verify system design questions appear
3. **Check Learning Cards**: Verify questions are properly assigned to the "system-design" learning card
4. **Test Search**: Search for "system design" or specific topics to verify questions are discoverable

## Troubleshooting

### Common Issues

1. **Firebase Connection Error**:
   - Verify `firebase-service-account.json` exists and contains valid credentials
   - Check Firebase project configuration

2. **Permission Denied**:
   - Ensure Firebase service account has proper Firestore permissions
   - Verify the service account key is valid and not expired

3. **Import Errors**:
   - Ensure all dependencies are installed: `npm install firebase-admin dotenv`
   - Check Node.js version compatibility

4. **JSON Parsing Errors**:
   - Verify the JSON file is valid: `node -e "console.log(JSON.parse(require('fs').readFileSync('data/json/system_design/questions-system-design.json', 'utf8')).length)"`
   - Check for syntax errors in the JSON file

### Debug Commands

```bash
# Check JSON validity
node -e "console.log('Valid JSON with', JSON.parse(require('fs').readFileSync('data/json/system_design/questions-system-design.json', 'utf8')).length, 'questions')"

# Test Firebase connection
npx ts-node scripts/test-firebase-connection.ts

# Check specific question
node -e "const data = JSON.parse(require('fs').readFileSync('data/json/system_design/questions-system-design.json', 'utf8')); console.log(JSON.stringify(data[0], null, 2))"
```

## Integration with Learning System

The system design questions are integrated with the learning system as follows:

1. **Learning Card Assignment**: All questions are assigned to the "system-design" learning card
2. **Guided Learning Plans**: Questions can be included in guided learning plans
3. **Freestyle Learning**: Questions are available in freestyle learning mode
4. **Admin Management**: Questions can be managed through the admin panel

## Performance Considerations

- **Batch Operations**: Questions are seeded using Firebase batch operations for efficiency
- **Memory Usage**: The script processes questions in batches to avoid memory issues
- **Error Handling**: Comprehensive error handling ensures partial failures don't corrupt data

## Future Enhancements

1. **Additional Topics**: Add more system design topics as needed
2. **Difficulty Distribution**: Adjust difficulty distribution based on user feedback
3. **Question Validation**: Add automated validation for question quality
4. **Analytics Integration**: Track question performance and user engagement

## Support

For issues or questions regarding system design question seeding:

1. Check this documentation first
2. Review the troubleshooting section
3. Verify Firebase configuration and permissions
4. Test with a small subset of questions first

---

**Last Updated**: January 2025  
**Version**: 1.0  
**Total Questions**: 160 System Design Questions
