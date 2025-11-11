const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/nextjs-questions.json');

const newQuestions = [
  {
    "id": "next-21-40-nextjs-q39",
    "title": "What is EAS in the context of Expo?",
    "content": "EAS (Expo Application Services) is a cloud platform for building, submitting, and updating Expo apps without local Xcode/Android Studio.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Expo",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.794Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "expo",
      "intermediate"
    ],
    "explanation": "EAS Build compiles apps in the cloud; EAS Submit sends them to app stores; EAS Update pushes JS updates over the air.",
    "points": 7,
    "sampleAnswers": [
      "EAS replaces `expo build` with cloud-based builds, enabling custom native code without local setup.",
      "It offers services like build automation, app store submission, and OTA updates with rollback."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "EAS replaces `expo build` with cloud-based builds, enabling custom native code without local setup.",
        "isCorrect": true,
        "explanation": "EAS Build compiles apps in the cloud; EAS Submit sends them to app stores; EAS Update pushes JS updates over the air."
      },
      {
        "id": "o2",
        "text": "This is not correct. Please refer to the explanation.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Incorrect. Review Next.js documentation and concepts.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "This is a common misconception. The correct answer is different.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o5",
        "text": "Not quite. Consider Next.js best practices and architecture.",
        "isCorrect": false,
        "explanation": ""
      }
    ]
  },
  {
    "id": "next-21-40-nextjs-q40",
    "title": "How does Expo differ from standard React Native?",
    "content": "Expo is a framework and platform built on React Native that provides a managed workflow with prebuilt native modules and cloud services.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Expo",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.794Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "expo",
      "intermediate"
    ],
    "explanation": "Expo simplifies development with a curated set of APIs; EAS enables custom native code when needed.",
    "points": 7,
    "options": [
      {
        "id": "a",
        "text": "Expo: managed workflow, prebuilt modules, cloud services; React Native: bare workflow, full native control",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "b",
        "text": "Expo doesn’t support custom native code",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "c",
        "text": "React Native is only for iOS",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "d",
        "text": "Expo is deprecated",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  }
];

// Read existing questions
let existingQuestions = [];
if (fs.existsSync(questionsFile)) {
  existingQuestions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
}

// Add new questions
existingQuestions.push(...newQuestions);

// Write back
fs.writeFileSync(questionsFile, JSON.stringify(existingQuestions, null, 2));

console.log(`✅ Added ${newQuestions.length} questions for Expo (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
