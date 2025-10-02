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

export default function ReactHooksPracticePage() {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);

  const problems: PracticeProblem[] = [
    {
      id: 1,
      title: 'useState Hook',
      description: 'Understanding how useState works for state management',
      code: `function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

// What will happen when the button is clicked?`,
      question: 'What will happen when the button is clicked?',
      options: [
        'The count will increment by 1',
        'The count will stay the same',
        'The component will re-render',
        'Both A and C',
      ],
      correctAnswer: 3,
      explanation:
        'Both A and C are correct. When setCount is called, it updates the state value (count increments by 1) and triggers a re-render of the component to display the new value.',
    },
    {
      id: 2,
      title: 'useEffect Hook',
      description: 'Understanding useEffect for side effects',
      code: `function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  return <div>{user ? user.name : 'Loading...'}</div>;
}

// What does the dependency array [userId] do?`,
      question: 'What does the dependency array [userId] do?',
      options: [
        "Nothing - it's optional",
        'Runs the effect only when userId changes',
        'Runs the effect on every render',
        'Prevents the effect from running',
      ],
      correctAnswer: 1,
      explanation:
        'The dependency array [userId] tells React to run the useEffect only when the userId value changes. This prevents unnecessary API calls when other props or state change.',
    },
    {
      id: 3,
      title: 'Custom Hook',
      description: 'Creating and using custom hooks',
      code: `function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

function App() {
  const { count, increment, decrement } = useCounter(5);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

// What will be the initial count value?`,
      question: 'What will be the initial count value?',
      options: ['0', '5', 'undefined', 'Error'],
      correctAnswer: 1,
      explanation:
        'The initial count value will be 5. The useCounter hook is called with useCounter(5), which sets the initialValue parameter to 5, and useState(initialValue) initializes the state with this value.',
    },
    {
      id: 4,
      title: 'useRef Hook',
      description: 'Using useRef for DOM references and mutable values',
      code: `function FocusInput() {
  const inputRef = useRef(null);
  
  const focusInput = () => {
    inputRef.current.focus();
  };
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

// What happens when the button is clicked?`,
      question: 'What happens when the button is clicked?',
      options: [
        'The input gets focus',
        'The input value changes',
        'The component re-renders',
        'Nothing happens',
      ],
      correctAnswer: 0,
      explanation:
        'When the button is clicked, the input gets focus. useRef creates a mutable reference that persists across re-renders, and inputRef.current points to the actual DOM input element.',
    },
    {
      id: 5,
      title: 'useMemo Hook',
      description: 'Using useMemo for expensive calculations',
      code: `function ExpensiveComponent({ items }) {
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);
  
  return <div>Total: {expensiveValue}</div>;
}

// When will the expensive calculation run?`,
      question: 'When will the expensive calculation run?',
      options: [
        'On every render',
        'Only when items array changes',
        'Only on the first render',
        'Never',
      ],
      correctAnswer: 1,
      explanation:
        'The expensive calculation will only run when the items array changes. useMemo memoizes the result and only recalculates when the dependency (items) changes, preventing unnecessary recalculations on every render.',
    },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextProblem = () => {
    if (selectedAnswer === problems[currentProblem].correctAnswer) {
      setScore(score + 1);
    }

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
      return 'Excellent! You have a strong understanding of React hooks.';
    if (percentage >= 60)
      return 'Good job! You understand the basics of React hooks.';
    if (percentage >= 40) return 'Not bad! Review the concepts and try again.';
    return 'Keep practicing! React hooks can be tricky at first.';
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
                  className="text-blue-600 hover:text-blue-800 font-medium"
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
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Link
                href="/study-plans/one-week-intensive"
                className="text-blue-600 hover:text-blue-800 mb-2 inline-block"
              >
                ← Back to Study Plan
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">
                React Hooks Practice
              </h1>
              <p className="text-gray-600">
                Practice your understanding of React hooks
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
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentProblem + 1) / problems.length) * 100}%`,
              }}
            ></div>
          </div>
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
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
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
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• useState for state management</li>
                <li>• useEffect for side effects</li>
                <li>• useRef for DOM references</li>
                <li>• Custom hooks</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                Practice More
              </h4>
              <div className="space-y-2">
                <Link
                  href="/questions/javascript/closure"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → Closures Practice
                </Link>
                <Link
                  href="/questions/user-interface/layout"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → CSS Layout Practice
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
