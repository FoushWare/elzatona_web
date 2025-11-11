const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/react-questions.json');

const newQuestions = [
  {
    "id": "react-ft-16",
    "title": "How do you implement real-time updates in a frontend task like a chat app?",
    "content": "You need to show new messages as they arrive. What technology should you use?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "Core React",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:33:22.944Z",
    "updatedAt": "2025-11-11T19:33:22.944Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "frontend-tasks",
      "core-react",
      "intermediate"
    ],
    "explanation": "WebSockets enable bidirectional real-time communication. Socket.io provides React-friendly API. Update component state when messages arrive.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Use WebSockets (Socket.io) or Server-Sent Events for real-time communication, update state when messages arrive",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Poll API every second",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Use only HTTP requests",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Real-time is not possible in React",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [
      "Consider React best practices for component architecture",
      "Think about state management and data flow patterns",
      "Review frontend task implementation patterns"
    ],
    "metadata": {}
  },
  {
    "id": "react-ft-17",
    "title": "How should you handle WebSocket connections in a React frontend task?",
    "content": "You're building a collaborative editor with real-time updates. How do you manage the WebSocket connection?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "Core React",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:33:22.944Z",
    "updatedAt": "2025-11-11T19:33:22.944Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "frontend-tasks",
      "core-react",
      "intermediate"
    ],
    "explanation": "Create connection in useEffect, store in ref to persist across renders, cleanup on unmount. Implement reconnection logic for reliability.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Create WebSocket connection in useEffect, store in useRef, cleanup on unmount, handle reconnection logic",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Create connection in component body",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Use only one global connection for entire app",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "WebSockets don't need cleanup",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [
      "Consider React best practices for component architecture",
      "Think about state management and data flow patterns",
      "Review frontend task implementation patterns"
    ],
    "metadata": {}
  },
  {
    "id": "react-ft-18",
    "title": "How do you prevent memory leaks when using WebSockets in a frontend task?",
    "content": "Your chat component unmounts but WebSocket listeners remain. How do you fix this?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "Core React",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:33:22.944Z",
    "updatedAt": "2025-11-11T19:33:22.944Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "frontend-tasks",
      "core-react",
      "intermediate"
    ],
    "explanation": "Always clean up event listeners and close connections in useEffect cleanup. This prevents memory leaks and stale updates.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Remove event listeners in useEffect cleanup function and close WebSocket connection on unmount",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Leave listeners active",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Use only global listeners",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Memory leaks don't happen with WebSockets",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [
      "Consider React best practices for component architecture",
      "Think about state management and data flow patterns",
      "Review frontend task implementation patterns"
    ],
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

console.log(`✅ Added ${newQuestions.length} frontend task questions (Batch 6)`);
console.log(`📝 Total React questions: ${existingQuestions.length}`);
