const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/react-questions.json'
);

const newQuestions = [
  {
    id: 'react-ft-13',
    title: 'How should you handle form validation in a frontend task?',
    content:
      'You need to build a registration form with validation. What approach is best?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'Core React',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:33:22.944Z',
    updatedAt: '2025-11-11T19:33:22.944Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'frontend-tasks', 'core-react', 'intermediate'],
    explanation:
      'Controlled components with validation provide better UX. Libraries like React Hook Form handle validation, errors, and performance automatically.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Use controlled components with validation logic, or libraries like React Hook Form or Formik for complex forms',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Use only HTML5 validation attributes',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Validate only on submit',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'No validation needed',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [
      'Consider React best practices for component architecture',
      'Think about state management and data flow patterns',
      'Review frontend task implementation patterns',
    ],
    metadata: {},
  },
  {
    id: 'react-ft-14',
    title:
      'What is the difference between controlled and uncontrolled components in forms?',
    content:
      'When building a form in a frontend task, which approach should you use?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'Core React',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:33:22.944Z',
    updatedAt: '2025-11-11T19:33:22.944Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'frontend-tasks', 'core-react', 'intermediate'],
    explanation:
      'Controlled components give React full control over form state, enabling validation and integration. Uncontrolled uses DOM refs for less React overhead.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Controlled: React controls form state via state. Uncontrolled: DOM handles form state via refs. Use controlled for React integration.',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'They are identical',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Controlled components are deprecated',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Uncontrolled is always better',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [
      'Consider React best practices for component architecture',
      'Think about state management and data flow patterns',
      'Review frontend task implementation patterns',
    ],
    metadata: {},
  },
  {
    id: 'react-ft-15',
    title: 'How do you handle file uploads in a frontend task?',
    content:
      'You need to allow users to upload profile pictures. How should you implement this?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'Core React',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:33:22.944Z',
    updatedAt: '2025-11-11T19:33:22.944Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'frontend-tasks', 'core-react', 'intermediate'],
    explanation:
      'Use file input, File API for preview/validation, FormData for upload. Validate type, size, and show user feedback during upload.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Use input type="file", handle File API, show preview, validate file type/size, and upload via FormData to API',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Use only drag-and-drop',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Store files in localStorage',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'File uploads are not possible in React',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [
      'Consider React best practices for component architecture',
      'Think about state management and data flow patterns',
      'Review frontend task implementation patterns',
    ],
    metadata: {},
  },
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

console.log(
  `✅ Added ${newQuestions.length} frontend task questions (Batch 5)`
);
console.log(`📝 Total React questions: ${existingQuestions.length}`);
