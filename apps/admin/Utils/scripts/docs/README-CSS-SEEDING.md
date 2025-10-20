# CSS Questions Seeding Documentation

## Overview

This document provides comprehensive instructions for seeding CSS questions into the Firebase database. The CSS questions have been transformed to conform to the `UnifiedQuestion` schema and are ready for seeding.

## Files Structure

### Source Data Files

- **Location**: `data/json/css/`
- **Total Files**: 5 JSON files
- **Total Questions**: 100 questions (20 questions per file)
- **File Range**: `css-1.json`, `css21–40.json`, `css-16-80.json`, `css-41-60.json`, `css-81–100.json`

### Seeding Scripts

- **Individual Scripts**: `apps/admin/Utils/scripts/seed-css-XX-YY.js` (5 files)
- **Master Script**: `apps/admin/Utils/scripts/seed-all-css-questions.js`
- **Shell Runner**: `apps/admin/Utils/scripts/seed-css-questions.sh`
- **Clear Script**: `apps/admin/Utils/scripts/clear-questions.js`

## Question Schema

All CSS questions have been transformed to the `UnifiedQuestion` schema:

```typescript
interface UnifiedQuestion {
  id: string; // Format: css-XX-YY-qN
  title: string; // Question title
  content: string; // Question content
  type: 'multiple-choice' | 'open-ended' | 'true-false' | 'code';
  category: 'CSS'; // Always 'CSS'
  topic: string; // CSS topic (e.g., 'CSS Selectors', 'Flexbox')
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  learningCardId: 'core-technologies'; // Always 'core-technologies'
  isActive: boolean; // Always true
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  createdBy: string; // Always 'admin'
  updatedBy: string; // Always 'admin'
  tags: string[]; // CSS-related tags
  explanation?: string; // Answer explanation
  points: number; // Always 10
  options?: {
    // For multiple-choice questions
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
  sampleAnswers?: string[]; // For open-ended questions
  hints?: string[]; // Additional hints
  metadata?: object; // Additional metadata
}
```

## CSS Topics Covered

The CSS questions cover the following topics:

1. **CSS Selectors** - Basic and advanced selectors
2. **CSS Box Model** - Margin, padding, border, content
3. **CSS Layout** - Display, position, float
4. **Flexbox** - Flex container and items
5. **CSS Grid** - Grid layout system
6. **CSS Transitions** - Smooth property changes
7. **CSS Animations** - Keyframe animations
8. **CSS Transforms** - 2D and 3D transforms
9. **CSS Media Queries** - Responsive design
10. **CSS Variables** - Custom properties
11. **CSS Preprocessors** - Sass, Less, Stylus
12. **CSS Architecture** - BEM, SMACSS, OOCSS
13. **CSS Performance** - Optimization techniques
14. **CSS Accessibility** - ARIA, focus management
15. **CSS Frameworks** - Bootstrap, Tailwind, etc.

## Usage Instructions

### Prerequisites

1. **Node.js**: Ensure Node.js is installed
2. **Firebase Configuration**: Firebase config should be properly set up
3. **Dependencies**: All required packages should be installed

### Quick Start

#### 1. Clear Existing Questions (Optional)

```bash
./scripts/seed-css-questions.sh clear
```

#### 2. Seed All CSS Questions

```bash
./scripts/seed-css-questions.sh seed-all
```

#### 3. Seed Specific Range

```bash
# Seed questions 1-20
./scripts/seed-css-questions.sh seed-01-20

# Seed questions 21-40
./scripts/seed-css-questions.sh seed-21-40

# Seed questions 2181-2200
./scripts/seed-css-questions.sh seed-2181-2200
```

### Manual Execution

#### Using Node.js Directly

```bash
# Clear questions
node scripts/clear-questions.js

# Seed all questions
node scripts/seed-all-css-questions.js

# Seed specific range
node scripts/seed-css-01-20.js
```

#### Using Individual Scripts

```bash
# Seed specific files
node scripts/seed-css-01-20.js
node scripts/seed-css-21-40.js
node scripts/seed-css-41-60.js
# ... and so on
```

## File Statistics

| File Name       | Questions | Topics Covered                             |
| --------------- | --------- | ------------------------------------------ |
| css-1.json      | 20        | CSS Fundamentals, Selectors, Box Model     |
| css21–40.json   | 20        | Layout, Display, Position                  |
| css-16-80.json  | 20        | Flexbox, Grid, Transitions                 |
| css-41-60.json  | 20        | Animations, Transforms, Media Queries      |
| css-81–100.json | 20        | CSS Variables, Preprocessors, Architecture |

## Verification

After seeding, verify the data integrity:

### 1. Check Question Count

```bash
node scripts/verify-application-state.js
```

### 2. Verify in Admin Panel

- Visit: `http://localhost:3000/admin/content/questions`
- Filter by category: "CSS"
- Verify all 100 questions are present

### 3. Check Learning Card Integration

- Visit: `http://localhost:3000/admin/content-management`
- Verify "Core Technologies" card shows 100 questions
- Check topic distribution

## Troubleshooting

### Common Issues

1. **Firebase Connection Error**
   - Verify Firebase configuration
   - Check network connectivity
   - Ensure Firebase project is active

2. **Permission Denied**
   - Verify Firebase service account permissions
   - Check Firestore security rules

3. **Script Execution Error**
   - Ensure Node.js is installed
   - Check file permissions
   - Verify script syntax

4. **Data Duplication**
   - Clear existing questions before seeding
   - Check for duplicate IDs

### Error Messages

- **"Firebase: Error (auth/network-request-failed)"**: Network connectivity issue
- **"Firebase: Error (permission-denied)"**: Insufficient permissions
- **"SyntaxError: Unexpected token"**: JSON parsing error
- **"ReferenceError: process is not defined"**: Node.js environment issue

## Performance Considerations

- **Batch Operations**: All seeding uses Firebase batch operations for efficiency
- **Memory Usage**: Scripts process 20 questions at a time to manage memory
- **Network Optimization**: Parallel operations where possible
- **Error Handling**: Comprehensive error handling and rollback capabilities

## Maintenance

### Regular Tasks

1. **Data Validation**: Periodically verify question integrity
2. **Schema Updates**: Update scripts when schema changes
3. **Performance Monitoring**: Monitor seeding performance
4. **Error Logging**: Review and address seeding errors

### Updates

1. **New Questions**: Add new CSS questions to appropriate files
2. **Schema Changes**: Update transformation scripts
3. **Script Improvements**: Enhance seeding scripts as needed

## Support

For issues or questions:

1. Check this documentation first
2. Review error logs
3. Verify Firebase configuration
4. Test with small batches first
5. Contact development team if needed

---

**Last Updated**: December 2024  
**Version**: 1.0  
**Total Questions**: 100 CSS questions across 5 files
