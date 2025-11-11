const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/react-questions.json');

const newQuestions = [
  {
    "id": "react-ft-25",
    "title": "How do you ensure accessibility in a frontend task?",
    "content": "Your dashboard needs to be accessible to screen readers. What should you implement?",
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
    "explanation": "Use semantic HTML (nav, main, article), ARIA labels for complex widgets, keyboard navigation, focus management, and proper heading hierarchy.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Use semantic HTML, ARIA attributes where needed, keyboard navigation, focus management, and test with screen readers",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Use only div elements",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Accessibility is automatic in React",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Only add alt text to images",
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
    "id": "react-ft-26",
    "title": "How should you handle focus management in a modal frontend task?",
    "content": "You have a modal dialog. How do you manage focus for accessibility?",
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
    "explanation": "Trap focus within modal (prevent tabbing outside), return focus to trigger element on close, use refs and focus() API.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Trap focus within modal when open, return focus to trigger when closed, use useRef and useEffect for focus management",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Let focus go anywhere",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Disable focus entirely",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Focus management is not needed",
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
    "id": "react-ft-27",
    "title": "How do you implement keyboard shortcuts in a frontend task?",
    "content": "You want Ctrl+K to open search. How should you implement this?",
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
    "explanation": "Add keydown listener in useEffect, check event.key and event.ctrlKey/event.metaKey, handle shortcut, cleanup listener on unmount.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Use useEffect with keydown event listener, check for modifier keys (Ctrl/Cmd), cleanup on unmount",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Use only onClick handlers",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Keyboard shortcuts are not possible",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Use only HTML5 keyboard attributes",
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

console.log(`✅ Added ${newQuestions.length} frontend task questions (Batch 9)`);
console.log(`📝 Total React questions: ${existingQuestions.length}`);
