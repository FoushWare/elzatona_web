# Data Directory Structure

This directory contains the local data storage for the learning sections and questions management system.

## Directory Structure

```
data/
├── sections/
│   └── sections.json          # Main sections configuration file
└── questions/
    ├── section_1-questions.json    # Questions for section 1
    ├── section_2-questions.json    # Questions for section 2
    └── ...                         # Questions for other sections
```

## Files Description

### sections/sections.json

Contains the main configuration for all learning sections with the following structure:

```json
[
  {
    "id": "section_1",
    "name": "Frontend Fundamentals",
    "description": "Learn and practice frontend fundamentals",
    "order": 1,
    "isActive": true,
    "questionCount": 0,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### questions/{sectionId}-questions.json

Contains all questions for a specific section with the following structure:

```json
[
  {
    "id": "question_1234567890_abc123",
    "title": "Question Title",
    "content": "Question content...",
    "type": "single",
    "difficulty": "easy",
    "sectionId": "section_1",
    "options": [
      {
        "id": "a",
        "text": "Option A",
        "isCorrect": true
      }
    ],
    "correctAnswers": ["a"],
    "explanation": "Explanation...",
    "audioQuestion": "",
    "audioAnswer": "",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "isActive": true,
    "isComplete": true
  }
]
```

## Features

- **Automatic Creation**: Files are created automatically when sections or questions are added
- **Backup Safe**: All data is stored locally and can be easily backed up
- **Structure Validation**: Questions can be marked as complete or incomplete based on required fields
- **Audio Support**: Audio fields are included but can be empty for later editing
- **Bulk Operations**: Support for bulk question creation with incomplete structures

## Default Sections

The system comes with 20 predefined sections:

1. Frontend Fundamentals
2. Advanced CSS Mastery
3. JavaScript Deep Dive
4. React Mastery
5. TypeScript Essentials
6. Testing Strategies
7. Performance Optimization
8. Security Essentials
9. Frontend System Design
10. Build Tools & DevOps
11. API Integration & Communication
12. AI Tools for Frontend
13. Frontend Interview Prep
14. Advanced Frontend Architectures
15. JavaScript Practice & Interview Prep
16. CSS Practice & Layout Mastery
17. HTML Practice & Semantic Mastery
18. React Practice & Advanced Patterns
19. Comprehensive Interview Preparation
20. Improve Your English

## Question Types

- **Single Choice**: Multiple choice with one correct answer
- **Multiple Choice**: Multiple choice with multiple correct answers

## Difficulty Levels

- **Easy**: Beginner level questions
- **Medium**: Intermediate level questions
- **Hard**: Advanced level questions

## Incomplete Question Handling

Questions can be created with incomplete structures. The `isComplete` field tracks whether all required fields are filled:

- **Complete**: All required fields (title, content, options, correct answers, explanation) are filled
- **Incomplete**: Some required fields are missing and can be edited later

Audio fields (`audioQuestion`, `audioAnswer`) are always optional and can be empty for later editing.
