'use client';

import { useState } from 'react';

interface Question {
  question: string;
  code?: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: string;
  explanation: string;
}

const systemDesignQuestions: Question[] = [
  {
    question: 'What is the primary purpose of a micro-frontend architecture?',
    code: `
// Micro-frontend integration example
const MicroFrontend = ({ name, host, history }) => {
  useEffect(() => {
    const scriptId = \`micro-frontend-script-\${name}\`;
    
    if (document.getElementById(scriptId)) {
      renderMicroFrontend();
      return;
    }
    
    fetch(\`\${host}/asset-manifest.json\`)
      .then(res => res.json())
      .then(manifest => {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = \`\${host}\${manifest.files['main.js']}\`;
        script.onload = renderMicroFrontend;
        document.head.appendChild(script);
      });
  }, []);
};`,
    options: {
      A: 'To reduce the complexity of individual components',
      B: 'To enable independent development and deployment of frontend features',
      C: 'To improve the performance of single-page applications',
      D: 'To reduce the bundle size of the main application',
    },
    correctAnswer: 'B',
    explanation:
      'Micro-frontend architecture allows teams to develop, test, and deploy frontend features independently. This enables better scalability, team autonomy, and technology diversity across different parts of the application.',
  },
  {
    question:
      'Which pattern is most effective for managing state in large-scale React applications?',
    code: `
// State management patterns
// 1. Context + useReducer
const AppContext = createContext();

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// 2. Redux Toolkit
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    posts: postsSlice.reducer,
  },
});`,
    options: {
      A: 'Using only local component state with useState',
      B: 'Implementing a centralized state management solution like Redux or Zustand',
      C: 'Passing props down through multiple component levels',
      D: 'Using global variables to store application state',
    },
    correctAnswer: 'B',
    explanation:
      'For large-scale applications, centralized state management solutions like Redux, Zustand, or Context + useReducer provide predictable state updates, better debugging capabilities, and easier testing compared to prop drilling or local state.',
  },
  {
    question:
      'What is the main benefit of implementing a Design System in frontend architecture?',
    code: `
// Design System component example
const Button = ({ variant = 'primary', size = 'medium', children, ...props }) => {
  const baseClasses = 'font-medium rounded-lg transition-colors';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };
  
  return (
    <button 
      className={\`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]}\`}
      {...props}
    >
      {children}
    </button>
  );
};`,
    options: {
      A: 'To reduce the number of CSS files needed',
      B: 'To ensure consistency, reusability, and maintainability across the application',
      C: 'To improve the performance of component rendering',
      D: 'To automatically generate documentation for all components',
    },
    correctAnswer: 'B',
    explanation:
      'Design Systems provide a centralized collection of reusable components, guidelines, and patterns that ensure consistency across the application, improve developer productivity, and make maintenance easier.',
  },
  {
    question:
      'Which approach is most effective for handling API calls in a scalable frontend application?',
    code: `
// API layer abstraction
class ApiClient {
  constructor(baseURL, options = {}) {
    this.baseURL = baseURL;
    this.defaultOptions = options;
  }
  
  async request(endpoint, options = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`;
    const config = {
      ...this.defaultOptions,
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...this.defaultOptions.headers,
        ...options.headers,
      },
    };
    
    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
}`,
    options: {
      A: 'Making direct fetch calls in every component',
      B: 'Creating an abstracted API layer with error handling and retry logic',
      C: 'Using only third-party libraries for all API calls',
      D: 'Storing all API responses in localStorage',
    },
    correctAnswer: 'B',
    explanation:
      'An abstracted API layer provides centralized error handling, request/response transformation, authentication, retry logic, and caching. This makes the codebase more maintainable and provides consistent behavior across the application.',
  },
  {
    question:
      'What is the primary advantage of implementing Server-Side Rendering (SSR) in a frontend application?',
    code: `
// Next.js SSR example
export async function getServerSideProps(context) {
  const { params } = context;
  
  try {
    const response = await fetch(\`https://api.example.com/posts/\${params.id}\`);
    const post = await response.json();
    
    return {
      props: {
        post,
        timestamp: new Date().toISOString(),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default function Post({ post, timestamp }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <small>Rendered at: {timestamp}</small>
    </div>
  );
}`,
    options: {
      A: 'To reduce the amount of JavaScript needed on the client',
      B: 'To improve SEO, initial page load performance, and social media sharing',
      C: 'To eliminate the need for client-side routing',
      D: 'To reduce server costs by serving static files',
    },
    correctAnswer: 'B',
    explanation:
      'SSR improves SEO by providing fully rendered HTML to search engines, enhances initial page load performance by reducing the time to first meaningful paint, and ensures proper content is available for social media crawlers.',
  },
];

export default function SystemDesignPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentQuestion = systemDesignQuestions[currentQuestionIndex];
  const totalQuestions = systemDesignQuestions.length;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === currentQuestion.correctAnswer);
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
    setShowAnswer(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          System Design & Architecture
        </h1>
        <p className="text-muted-foreground text-lg">
          Advanced frontend concepts including system design, architecture
          patterns, scalability, and enterprise-level frontend development.
          Essential for senior and lead developers.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%
            Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            {currentQuestion.question}
          </h2>

          {currentQuestion.code && (
            <div className="bg-gray-900 text-green-400 p-4 rounded-md mb-4 overflow-x-auto">
              <pre className="text-sm">
                <code>{currentQuestion.code}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Answer Options */}
        <div className="space-y-3 mb-6">
          {Object.entries(currentQuestion.options).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleAnswerSelect(key)}
              disabled={showAnswer}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                selectedAnswer === key
                  ? isCorrect
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : 'bg-red-100 border-red-500 text-red-800'
                  : showAnswer && key === currentQuestion.correctAnswer
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : 'bg-background border-border hover:bg-muted'
              } ${showAnswer ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <span className="font-medium mr-2">{key}.</span>
              {value}
            </button>
          ))}
        </div>

        {/* Answer Explanation */}
        {showAnswer && (
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
              {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
            </h3>
            <p className="text-indigo-700 dark:text-indigo-300">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === totalQuestions - 1}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {/* Question Navigation */}
      <div className="bg-card rounded-lg shadow-sm border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Question Navigation
        </h3>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {systemDesignQuestions.map((_, index) => (
            <button
              key={index}
              onClick={() => handleQuestionSelect(index)}
              className={`p-2 text-sm rounded-md transition-colors ${
                index === currentQuestionIndex
                  ? 'bg-indigo-600 text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Video Tutorial Section */}
      <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
        <h3 className="text-xl font-semibold mb-2">
          📹 Video Tutorial Available
        </h3>
        <p className="mb-4 opacity-90">
          Watch our comprehensive tutorial covering advanced frontend concepts
          including system design, architecture patterns, and enterprise-level
          development for these practice questions.
        </p>
        <a
          href="https://www.youtube.com/watch?v=ILaXhmTraQ4"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-white text-indigo-600 rounded-md hover:bg-gray-100 transition-colors"
        >
          Watch Tutorial
        </a>
      </div>
    </div>
  );
}
