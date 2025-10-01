'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PracticeProblem {
  id: number;
  title: string;
  description: string;
  code: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function ReactStateManagementPage() {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);

  const problems: PracticeProblem[] = [
    {
      id: 1,
      title: 'useState Hook Basics',
      description: 'Understanding how useState works with primitive values',
      code: `function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setCount(count + 1);
    setCount(count + 1);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}`,
      question: 'What happens when the button is clicked?',
      options: [
        'Count increases by 1',
        'Count increases by 2',
        'Count stays the same',
        'Error occurs',
      ],
      correctAnswer: 0,
      explanation:
        'Even though setCount is called twice, React batches state updates. The second setCount uses the same count value (0), so the final result is 1, not 2.',
    },
    {
      id: 2,
      title: 'State Updates with Functions',
      description: 'Understanding functional state updates',
      code: `function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}`,
      question: 'What happens when the button is clicked?',
      options: [
        'Count increases by 1',
        'Count increases by 2',
        'Count stays the same',
        'Error occurs',
      ],
      correctAnswer: 1,
      explanation:
        'Using functional updates (prev => prev + 1) ensures each update is based on the previous state, so the count increases by 2.',
    },
    {
      id: 3,
      title: 'Object State Updates',
      description: 'Understanding how to update object state correctly',
      code: `function UserProfile() {
  const [user, setUser] = useState({ name: 'John', age: 25 });
  
  const updateAge = () => {
    user.age = 26; // Direct mutation
    setUser(user);
  };
  
  return (
    <div>
      <p>Name: {user.name}, Age: {user.age}</p>
      <button onClick={updateAge}>Update Age</button>
    </div>
  );
}`,
      question: 'What happens when the button is clicked?',
      options: [
        'Age updates to 26',
        'Age stays 25',
        'Component re-renders',
        'Error occurs',
      ],
      correctAnswer: 1,
      explanation:
        "Directly mutating the state object doesn't trigger a re-render. React needs a new object reference to detect state changes.",
    },
    {
      id: 4,
      title: 'useContext Hook',
      description: 'Understanding React Context for state sharing',
      code: `const ThemeContext = React.createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={theme}>
      <Header />
      <button onClick={() => setTheme('dark')}>
        Toggle Theme
      </button>
    </ThemeContext.Provider>
  );
}

function Header() {
  const theme = useContext(ThemeContext);
  return <h1>Current theme: {theme}</h1>;
}`,
      question: 'What happens when the button is clicked?',
      options: [
        "Header shows 'light'",
        "Header shows 'dark'",
        'Nothing changes',
        'Error occurs',
      ],
      correctAnswer: 1,
      explanation:
        "When setTheme is called, the Provider's value changes, and all components consuming the context (like Header) re-render with the new value.",
    },
    {
      id: 5,
      title: 'useReducer Hook',
      description: 'Understanding useReducer for complex state logic',
      code: `const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}`,
      question: 'What is the advantage of using useReducer over useState?',
      options: [
        'Better performance',
        'Simpler syntax',
        'Easier to manage complex state logic',
        'More hooks available',
      ],
      correctAnswer: 2,
      explanation:
        'useReducer is better for managing complex state logic with multiple sub-values or when the next state depends on the previous one.',
    },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answerIndex);
      if (answerIndex === problems[currentProblem].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextProblem = () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(currentProblem + 1);
      setSelectedAnswer(null);
    } else {
      setPracticeCompleted(true);
    }
  };

  const handleRetakePractice = () => {
    setCurrentProblem(0);
    setSelectedAnswer(null);
    setScore(0);
    setPracticeCompleted(false);
  };

  const getScorePercentage = () => {
    return Math.round((score / problems.length) * 100);
  };

  const getScoreMessage = () => {
    const percentage = getScorePercentage();
    if (percentage >= 80)
      return 'Excellent! You have a strong understanding of React state management.';
    if (percentage >= 60)
      return 'Good job! You understand the basics of React state management.';
    if (percentage >= 40) return 'Not bad! Review the concepts and try again.';
    return 'Keep practicing! State management can be complex at first.';
  };

  if (practiceCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Practice Complete!
            </h1>

            <div className="mb-8">
              <div className="text-6xl font-bold text-blue-600 mb-2">
                {score}/{problems.length}
              </div>
              <div className="text-2xl font-semibold text-gray-700 mb-2">
                {getScorePercentage()}%
              </div>
              <p className="text-gray-600">{getScoreMessage()}</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleRetakePractice}
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Retake Practice
              </button>
              <div>
                <Link
                  href="/study-plans/one-week-intensive"
                  className="text-blue-600 hover:text-blue-800"
                >
                  ← Back to Study Plan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentP = problems[currentProblem];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <Link
              href="/study-plans/one-week-intensive"
              className="text-blue-600 hover:text-blue-800 mb-2 inline-block"
            >
              ← Back to Study Plan
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              React State Management Practice
            </h1>
            <p className="text-gray-600">
              Practice your understanding of React state management
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {currentProblem + 1}/{problems.length}
            </div>
            <div className="text-sm text-gray-500">Problem</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentProblem + 1) / problems.length) * 100}%`,
            }}
          ></div>
        </div>

        {/* Problem */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {currentP.title}
            </h2>
            <p className="text-gray-600 mb-4">{currentP.description}</p>

            <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6 overflow-x-auto">
              <pre className="text-sm">{currentP.code}</pre>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Question:</h3>
              <p className="text-blue-800">{currentP.question}</p>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentP.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  selectedAnswer === index
                    ? selectedAnswer === currentP.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                      selectedAnswer === index
                        ? selectedAnswer === currentP.correctAnswer
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-red-500 bg-red-500 text-white'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedAnswer === index &&
                      (selectedAnswer === currentP.correctAnswer ? '✓' : '✗')}
                  </div>
                  <span className="text-gray-900">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Explanation */}
          {selectedAnswer !== null && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Explanation</h3>
              <p className="text-blue-800">{currentP.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {selectedAnswer !== null && (
            <div className="text-center">
              <button
                onClick={handleNextProblem}
                className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                {currentProblem < problems.length - 1
                  ? 'Next Problem'
                  : 'Finish Practice'}
              </button>
            </div>
          )}
        </div>

        {/* Study Resources */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Study Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Key Concepts</h4>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">• useState Hook</div>
                <div className="text-sm text-gray-600">• State Updates</div>
                <div className="text-sm text-gray-600">• useContext Hook</div>
                <div className="text-sm text-gray-600">• useReducer Hook</div>
                <div className="text-sm text-gray-600">
                  • State Immutability
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                Practice More
              </h4>
              <div className="space-y-2">
                <Link
                  href="/questions/react/hooks"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → React Hooks Practice
                </Link>
                <Link
                  href="/questions/javascript/promises"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → Promises Practice
                </Link>
                <Link
                  href="/questions/javascript/closure"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → Closures Practice
                </Link>
                <Link
                  href="/internal-resources"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → Internal Resources
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
