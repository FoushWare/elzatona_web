export interface SeniorInterviewQuestion {
  id: string;
  category: string;
  question: string;
  answer: string;
  explanation: string;
  codeExample?: string;
  visualExplanation?: string;
  keyPoints: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export const seniorInterviewQuestions: SeniorInterviewQuestion[] = [
  {
    id: 'webpack-basics',
    category: 'Webpack & Tooling',
    question:
      'Can you tell me about your experience using Webpack? What is it used for?',
    answer:
      'Webpack is a module bundler. It takes multiple JavaScript files and bundles them into a single file, which is necessary because browsers used to require a <script> tag for each file. Webpack parses files based on imports/exports, bundles them together, and applies optimizations.',
    explanation:
      'Webpack solves the fundamental problem of module management in browsers. Before bundlers, you had to manually manage script tags and their order. Webpack creates a dependency graph from your entry point, follows all imports, and generates optimized bundles.',
    codeExample: `// Entry point: src/index.js
import React from 'react';
import './styles.css';
import logo from './logo.png';

// Webpack processes this and creates:
// - A dependency graph
// - Optimized bundles
// - Asset transformations`,
    visualExplanation:
      'Webpack creates a dependency tree starting from your entry point, following all import statements to understand what needs to be bundled together.',
    keyPoints: [
      'Module bundling for browser compatibility',
      'Dependency graph creation',
      'Asset optimization and transformation',
      'Code splitting and lazy loading',
      'Development server with hot reloading',
    ],
    difficulty: 'medium',
    tags: ['webpack', 'bundling', 'modules', 'build-tools'],
  },
  {
    id: 'tree-shaking',
    category: 'Webpack & Tooling',
    question: 'What is tree shaking in Webpack?',
    answer:
      'Tree shaking eliminates unused code from the final bundle. It works with ES6 static imports but not with CommonJS require, since those are evaluated dynamically at runtime.',
    explanation:
      "Tree shaking is a dead code elimination technique that removes unused exports from your bundle. It relies on ES6's static module structure where imports/exports are determined at build time.",
    codeExample: `// ✅ Tree shaking works with ES6 imports
import { useState, useEffect } from 'react'; // Only useState is used

// ❌ Tree shaking doesn't work with CommonJS
const { useState, useEffect } = require('react');

// ✅ Named imports enable better tree shaking
import { map, filter } from 'lodash';`,
    visualExplanation:
      'Tree shaking analyzes your code to identify and remove unused functions, variables, and modules, resulting in smaller bundle sizes.',
    keyPoints: [
      'Dead code elimination',
      'Requires ES6 static imports',
      'Reduces bundle size significantly',
      'Enabled by default in Webpack 5',
      'Works best with named imports',
    ],
    difficulty: 'medium',
    tags: ['webpack', 'tree-shaking', 'optimization', 'bundle-size'],
  },
  {
    id: 'dependency-graph',
    category: 'Webpack & Tooling',
    question: 'What is a dependency graph in Webpack?',
    answer:
      "It's the structure Webpack builds starting from an entry point, following all imports, and mapping relationships between modules. It's used to determine what code should be bundled, optimized, or dropped.",
    explanation:
      "The dependency graph is Webpack's internal representation of how all your modules relate to each other. Starting from your entry point, Webpack recursively follows all import statements to build a complete map of dependencies. This graph is used for bundling decisions, optimization strategies, and code splitting.",
    codeExample: `// Entry: src/index.js
import App from './App';
import './styles.css';

// App.js
import Header from './shared/components/Header';
import Main from './shared/components/Main';

// Header.js
import Logo from './Logo';
import Navigation from './Navigation';

// Dependency Graph:
// index.js → App.js → Header.js → Logo.js, Navigation.js
// index.js → App.js → Main.js
// index.js → styles.css`,
    visualExplanation:
      'Webpack creates a tree-like structure showing how modules depend on each other, enabling intelligent bundling and optimization decisions.',
    keyPoints: [
      'Maps module relationships',
      'Enables intelligent bundling',
      'Supports code splitting decisions',
      'Optimization analysis',
      'Circular dependency detection',
    ],
    difficulty: 'easy',
    tags: ['webpack', 'dependencies', 'modules', 'bundling'],
  },
  {
    id: 'css-in-js-basics',
    category: 'CSS-in-JS',
    question: 'What is CSS-in-JS? Can you give examples of its use cases?',
    answer:
      'CSS-in-JS allows writing CSS directly in JavaScript files. It makes it easy to apply dynamic styles that react to state changes, like toggling colors when clicking a button. Tools like styled-components handle generating classes and injecting them at runtime.',
    explanation:
      'CSS-in-JS libraries like styled-components, emotion, and styled-jsx allow you to write CSS as JavaScript objects or template literals. This approach provides scoped styling, dynamic theming, and better integration with component state. The CSS is generated at runtime and injected into the DOM.',
    codeExample: `// styled-components example
import styled from 'styled-components';

const Button = styled.button\`
  background: \${props => props.primary ? 'blue' : 'white'};
  color: \${props => props.primary ? 'white' : 'black'};
  padding: 10px 20px;
  border: 2px solid blue;
  border-radius: 4px;
\`;

// Usage with dynamic styling
function App() {
  const [isPrimary, setIsPrimary] = useState(false);
  
  return (
    <Button primary={isPrimary} onClick={() => setIsPrimary(!isPrimary)}>
      Toggle Style
    </Button>
  );
}`,
    visualExplanation:
      'CSS-in-JS generates unique class names and injects styles dynamically, enabling component-scoped styling and theme integration.',
    keyPoints: [
      'Scoped styling by default',
      'Dynamic theming support',
      'Component state integration',
      'Runtime CSS generation',
      'Better developer experience',
    ],
    difficulty: 'medium',
    tags: ['css-in-js', 'styled-components', 'styling', 'react'],
  },
  {
    id: 'pure-component',
    category: 'React – Components & Hooks',
    question: 'What is a Pure Component in React?',
    answer:
      'A Pure Component skips re-renders by shallow comparing props. This was useful with class components, but with hooks, React already optimizes re-renders.',
    explanation:
      "PureComponent is a class component that implements shouldComponentUpdate with a shallow comparison of props and state. It prevents unnecessary re-renders when props haven't changed. However, with modern React and hooks, the React team has optimized re-rendering behavior, making PureComponent less necessary.",
    codeExample: `// Class component with PureComponent
import React, { PureComponent } from 'react';

class UserProfile extends PureComponent {
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <p>{this.props.email}</p>
      </div>
    );
  }
}

// Functional component with React.memo (equivalent)
import React, { memo } from 'react';

const UserProfile = memo(({ name, email }) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>{email}</p>
    </div>
  );
});`,
    visualExplanation:
      'PureComponent performs shallow comparison of props and state to determine if a re-render is necessary, improving performance by avoiding unnecessary updates.',
    keyPoints: [
      'Shallow prop comparison',
      'Automatic shouldComponentUpdate',
      'Performance optimization',
      'Less necessary with modern React',
      'React.memo for functional components',
    ],
    difficulty: 'medium',
    tags: ['react', 'pure-component', 'performance', 'optimization'],
  },
  {
    id: 'error-boundary',
    category: 'React – Components & Hooks',
    question: 'What is an Error Boundary in React?',
    answer:
      'An Error Boundary catches errors in child components and prevents the entire app from breaking. It shows a fallback UI instead of a blank/broken screen.',
    explanation:
      'Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree. They prevent the entire app from crashing and allow you to display a fallback UI. Error Boundaries only catch errors in the component tree below them, not in the boundary itself.',
    codeExample: `// Error Boundary Component
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error caught:', error, errorInfo);
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}`,
    visualExplanation:
      'Error Boundaries act as a safety net, catching errors in child components and displaying fallback UI instead of crashing the entire application.',
    keyPoints: [
      'Catches JavaScript errors',
      'Prevents app crashes',
      'Shows fallback UI',
      'Only catches errors in children',
      'Error reporting integration',
    ],
    difficulty: 'medium',
    tags: ['react', 'error-boundary', 'error-handling', 'fallback-ui'],
  },
  {
    id: 'testing-strategy',
    category: 'Testing',
    question:
      'How would you approach testing a React app with no existing tests?',
    answer:
      'Add end-to-end (E2E) tests to cover features. Write unit tests for reusable components. Use integration tests for critical flows like login or payments. Avoid meaningless unit tests just for coverage.',
    explanation:
      'When starting testing from scratch, focus on high-impact tests first. E2E tests ensure features work for users, unit tests verify reusable components, and integration tests cover critical user journeys. Quality over quantity - meaningful tests that catch real issues are better than high coverage with useless tests.',
    codeExample: `// E2E Test (Cypress)
describe('User Authentication', () => {
  it('should allow user to login', () => {
    cy.visit('/login');
    cy.get('[data-testid=email]').type('user@example.com');
    cy.get('[data-testid=password]').type('password123');
    cy.get('[data-testid=login-button]').click();
    cy.url().should('include', '/dashboard');
  });
});

// Unit Test (React Testing Library)
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('button calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});`,
    visualExplanation:
      'Testing strategy should focus on high-impact areas: E2E tests for user features, unit tests for reusable components, and integration tests for critical flows.',
    keyPoints: [
      'Start with E2E tests',
      'Unit test reusable components',
      'Integration tests for critical flows',
      'Quality over coverage',
      'Focus on user value',
    ],
    difficulty: 'medium',
    tags: ['testing', 'e2e', 'unit-tests', 'integration-tests', 'cypress'],
  },
  {
    id: 'fcp-explanation',
    category: 'Web Performance',
    question: 'What is FCP (First Contentful Paint)?',
    answer:
      "It's the time from navigation until the first content (text/image) is rendered on screen.",
    explanation:
      "FCP is a key web performance metric that measures when the first piece of content becomes visible to the user. This could be text, images, or other visual elements. It's a critical metric because it indicates when users can start consuming content, making it a key indicator of perceived performance.",
    codeExample: `// Performance monitoring
// Using Performance API
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.name === 'first-contentful-paint') {
      console.log('FCP:', entry.startTime);
      // Send to analytics
      analytics.track('FCP', entry.startTime);
    }
  }
});

observer.observe({ entryTypes: ['paint'] });`,
    visualExplanation:
      'FCP measures when the first visual content appears on screen, indicating when users can start consuming your content.',
    keyPoints: [
      'First visual content appears',
      'Key user experience metric',
      'Target: < 1.8 seconds',
      'Measurable with Performance API',
      'Critical for perceived performance',
    ],
    difficulty: 'easy',
    tags: ['performance', 'fcp', 'web-vitals', 'user-experience'],
  },
  {
    id: 'webpack-loaders',
    category: 'Webpack & Tooling',
    question: 'What are Webpack loaders and how do they work?',
    answer:
      "Loaders transform files before they're added to the bundle. For example, babel-loader transforms ES6+ JavaScript to ES5, and css-loader processes CSS files.",
    explanation:
      'Webpack loaders are transformations that are applied to the source code of a module. They allow you to preprocess files as you import or load them. Loaders can transform files from a different language (like TypeScript) to JavaScript, or inline images as data URLs. They work in a chain, from right to left.',
    codeExample: `// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\\.(png|jpg|gif)$/,
        use: 'file-loader'
      }
    ]
  }
};`,
    visualExplanation:
      'Loaders transform source files through a pipeline, converting them into modules that can be consumed by your application.',
    keyPoints: [
      'Transform source files',
      'Work in chains (right to left)',
      'Handle different file types',
      'Enable preprocessing',
      'Essential for modern development',
    ],
    difficulty: 'medium',
    tags: ['webpack', 'loaders', 'babel', 'css', 'transformation'],
  },
  {
    id: 'css-modules',
    category: 'CSS-in-JS',
    question: 'What are CSS Modules and how do they solve styling problems?',
    answer:
      'CSS Modules generate unique class names to avoid conflicts. They provide local scoping for CSS classes, preventing global namespace pollution.',
    explanation:
      "CSS Modules are a way to make CSS classes locally scoped by default. They generate unique class names at build time, ensuring that styles don't conflict between components. This solves the problem of CSS global scope and makes styling more predictable and maintainable.",
    codeExample: `// Button.module.css
.button {
  background: blue;
  color: white;
  padding: 10px 20px;
}

.primary {
  background: darkblue;
}

// Button.jsx
import styles from './Button.module.css';

function Button({ primary, children }) {
  return (
    <button className={\`\${styles.button} \${primary ? styles.primary : ''}\`}>
      {children}
    </button>
  );
}

// Generated HTML
<button class="_Button_button_abc123 _Button_primary_def456">
  Click me
</button>`,
    visualExplanation:
      'CSS Modules generate unique class names to prevent conflicts, providing component-scoped styling without global namespace pollution.',
    keyPoints: [
      'Local scoping by default',
      'Unique class name generation',
      'Prevents style conflicts',
      'Build-time transformation',
      'Better maintainability',
    ],
    difficulty: 'medium',
    tags: ['css-modules', 'scoping', 'styling', 'build-tools'],
  },
  {
    id: 'react-context',
    category: 'React – State Management',
    question: 'When would you use React Context vs Redux?',
    answer:
      "Use Context for simple state that doesn't change often (like themes, user info). Use Redux for complex state with frequent updates, especially when you need dev tools and middleware.",
    explanation:
      "React Context is built into React and great for passing data through the component tree without prop drilling. It's perfect for static data like themes, user authentication, or language preferences. Redux is better for complex applications with frequent state updates, when you need powerful dev tools, middleware, or complex state logic.",
    codeExample: `// React Context Example
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Usage
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
    </ThemeProvider>
  );
}`,
    visualExplanation:
      'Context provides a way to share data between components without explicitly passing props through every level, while Redux offers more powerful state management for complex applications.',
    keyPoints: [
      'Context for simple, static data',
      'Redux for complex, dynamic state',
      'Context built into React',
      'Redux has powerful dev tools',
      'Choose based on complexity',
    ],
    difficulty: 'medium',
    tags: ['react', 'context', 'redux', 'state-management', 'prop-drilling'],
  },
  {
    id: 'custom-hooks',
    category: 'React – Components & Hooks',
    question: 'How do you create a custom hook? Give an example.',
    answer:
      "Custom hooks are functions that start with 'use' and can call other hooks. They help extract component logic into reusable functions.",
    explanation:
      "Custom hooks allow you to extract component logic into reusable functions. They must start with 'use' and can call other hooks. This helps avoid code duplication and makes components more focused on rendering.",
    codeExample: `// Custom hook for API calls
import { useState, useEffect } from 'react';

function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage in component
function UserProfile({ userId }) {
  const { data: user, loading, error } = useApi(\`/api/users/\${userId}\`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}`,
    visualExplanation:
      'Custom hooks encapsulate reusable logic, making components cleaner and promoting code reuse across your application.',
    keyPoints: [
      "Must start with 'use'",
      'Can call other hooks',
      'Extract reusable logic',
      'Improve code organization',
      "Follow React's rules of hooks",
    ],
    difficulty: 'medium',
    tags: ['react', 'custom-hooks', 'code-reuse', 'logic-extraction'],
  },
  {
    id: 'testing-library',
    category: 'Testing',
    question:
      'What is React Testing Library and why is it preferred over Enzyme?',
    answer:
      "React Testing Library focuses on testing behavior from a user's perspective, while Enzyme tests implementation details. RTL encourages better testing practices.",
    explanation:
      'React Testing Library is built on top of DOM Testing Library and provides utilities for testing React components. It encourages testing your components the way users would interact with them, rather than testing implementation details. This leads to more maintainable tests and better user experience.',
    codeExample: `// React Testing Library Example
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

test('submits form with user data', async () => {
  const handleSubmit = jest.fn();
  render(<LoginForm onSubmit={handleSubmit} />);

  // Get elements by their accessible roles
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /sign in/i });

  // Simulate user interactions
  await userEvent.type(emailInput, 'user@example.com');
  await userEvent.type(passwordInput, 'password123');
  await userEvent.click(submitButton);

  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'user@example.com',
    password: 'password123'
  });
});`,
    visualExplanation:
      'React Testing Library focuses on user behavior and accessibility, making tests more resilient to implementation changes and ensuring better user experience.',
    keyPoints: [
      'User-centric testing',
      'Accessibility-focused',
      'Resilient to refactoring',
      'Encourages good practices',
      'Better than testing implementation',
    ],
    difficulty: 'medium',
    tags: [
      'testing',
      'react-testing-library',
      'enzyme',
      'user-experience',
      'accessibility',
    ],
  },
  {
    id: 'lighthouse',
    category: 'Web Performance',
    question: 'What is Lighthouse and what metrics does it measure?',
    answer:
      'Lighthouse is a tool that audits web pages for performance, accessibility, SEO, and best practices. It measures metrics like FCP, LCP, CLS, and TTI.',
    explanation:
      'Lighthouse is an open-source, automated tool for improving the quality of web pages. It audits for performance, accessibility, progressive web apps, SEO, and more. It provides specific metrics and suggestions for improvement, making it an essential tool for web performance optimization.',
    codeExample: `// Lighthouse CI Configuration
// .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};`,
    visualExplanation:
      'Lighthouse provides comprehensive audits covering performance, accessibility, SEO, and best practices, with actionable recommendations for improvement.',
    keyPoints: [
      'Performance auditing',
      'Accessibility testing',
      'SEO optimization',
      'Progressive Web App support',
      'Actionable recommendations',
    ],
    difficulty: 'easy',
    tags: ['lighthouse', 'performance', 'accessibility', 'seo', 'auditing'],
  },
];

export const getQuestionsByCategory = () => {
  const categories: Record<string, SeniorInterviewQuestion[]> = {};
  seniorInterviewQuestions.forEach(question => {
    if (!categories[question.category]) {
      categories[question.category] = [];
    }
    categories[question.category].push(question);
  });
  return categories;
};

export const getQuestionById = (id: string) => {
  return seniorInterviewQuestions.find(q => q.id === id);
};
