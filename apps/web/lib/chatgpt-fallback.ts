// Fallback responses for when ChatGPT API is unavailable
export const FALLBACK_RESPONSES = {
  // General frontend topics
  html: [
    'HTML5 introduced semantic elements like `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>`. These make your code more readable and accessible.',
    'Use semantic HTML for better SEO and accessibility. Instead of `<div class="header">`, use `<header>`.',
    'HTML forms should always include proper labels, validation attributes, and ARIA labels for accessibility.',
  ],
  css: [
    'CSS Grid and Flexbox are powerful layout systems. Use Grid for 2D layouts and Flexbox for 1D layouts.',
    'CSS Custom Properties (variables) allow you to create reusable values: `--primary-color: #007bff;`',
    'Media queries enable responsive design: `@media (max-width: 768px) { /* mobile styles */ }`',
    'CSS animations and transitions can be created with `@keyframes` and `transition` properties.',
  ],
  javascript: [
    'Modern JavaScript features include arrow functions, destructuring, template literals, and async/await.',
    'Closures allow functions to access variables from their outer scope even after the outer function has returned.',
    'Promises and async/await make handling asynchronous operations much cleaner than callbacks.',
    'Event delegation is a technique where you attach one event listener to a parent element instead of multiple listeners to child elements.',
  ],
  react: [
    'React hooks like useState, useEffect, and useContext allow functional components to have state and side effects.',
    'The Virtual DOM is a lightweight copy of the real DOM that React uses to optimize updates.',
    'Props are read-only and flow down from parent to child, while state is internal and can be changed.',
    'React.memo and useMemo can optimize performance by preventing unnecessary re-renders.',
  ],
  performance: [
    'Lazy loading images and components can significantly improve initial page load times.',
    'Code splitting with dynamic imports reduces bundle size by loading code only when needed.',
    'Use the Performance API to measure and optimize your application performance.',
    'Minimize DOM manipulation and use efficient selectors for better performance.',
  ],
  interview: [
    'Common frontend interview topics include: DOM manipulation, event handling, async programming, and framework-specific questions.',
    'Be prepared to discuss trade-offs between different approaches and explain your reasoning.',
    'Practice coding challenges on platforms like LeetCode, HackerRank, or Frontend Mentor.',
    'Understand the fundamentals deeply - frameworks come and go, but core web technologies remain.',
  ],
};

// Get a relevant fallback response based on user input
export function getFallbackResponse(userInput: string): string {
  const input = userInput.toLowerCase();

  // Check for specific common questions first
  if (
    input.includes('center') &&
    (input.includes('div') || input.includes('element'))
  ) {
    return 'You can center a div using CSS Flexbox: `display: flex; justify-content: center; align-items: center;` or CSS Grid: `display: grid; place-items: center;`. Flexbox is great for single-axis centering, while Grid is perfect for both horizontal and vertical centering.';
  }
  if (
    input.includes('let') &&
    input.includes('const') &&
    input.includes('var')
  ) {
    return '`var` is function-scoped and hoisted, `let` is block-scoped and not hoisted, `const` is block-scoped, not hoisted, and cannot be reassigned. Use `const` by default, `let` when you need to reassign, and avoid `var`.';
  }
  if (input.includes('virtual dom') || input.includes('virtualdom')) {
    return 'The Virtual DOM is a lightweight copy of the real DOM that React uses to optimize updates. It compares the virtual DOM with the real DOM and only updates what changed, making React very efficient.';
  }
  if (input.includes('optimize') || input.includes('performance')) {
    return 'Use lazy loading, code splitting, minimize DOM manipulation, optimize images, use efficient CSS selectors, and implement proper caching strategies. The Performance API can help measure improvements.';
  }

  // Check for specific topics
  if (
    input.includes('html') ||
    input.includes('semantic') ||
    input.includes('tag')
  ) {
    return getRandomResponse('html');
  }
  if (
    input.includes('css') ||
    input.includes('styling') ||
    input.includes('layout') ||
    input.includes('grid') ||
    input.includes('flexbox')
  ) {
    return getRandomResponse('css');
  }
  if (
    input.includes('javascript') ||
    input.includes('js') ||
    input.includes('function') ||
    input.includes('async') ||
    input.includes('promise')
  ) {
    return getRandomResponse('javascript');
  }
  if (
    input.includes('react') ||
    input.includes('component') ||
    input.includes('hook')
  ) {
    return getRandomResponse('react');
  }
  if (
    input.includes('performance') ||
    input.includes('optimization') ||
    input.includes('speed') ||
    input.includes('fast')
  ) {
    return getRandomResponse('performance');
  }
  if (
    input.includes('interview') ||
    input.includes('question') ||
    input.includes('preparation') ||
    input.includes('job')
  ) {
    return getRandomResponse('interview');
  }

  // Default helpful response
  return `I'd be happy to help you with frontend development! I can assist with:

• **HTML & Semantic Markup** - Best practices, accessibility, and modern standards
• **CSS & Layout** - Grid, Flexbox, animations, and responsive design
• **JavaScript** - ES6+ features, async programming, and DOM manipulation
• **React** - Hooks, components, state management, and performance
• **Performance** - Optimization techniques, lazy loading, and best practices
• **Interview Prep** - Common questions, coding challenges, and tips

What specific topic would you like to learn about? I can provide detailed explanations, code examples, and practical tips! 🚀`;
}

function getRandomResponse(category: keyof typeof FALLBACK_RESPONSES): string {
  const responses = FALLBACK_RESPONSES[category];
  return responses[Math.floor(Math.random() * responses.length)];
}

// Additional helpful responses for common questions
export const COMMON_QUESTIONS = {
  'how to center a div':
    'You can center a div using CSS Flexbox: `display: flex; justify-content: center; align-items: center;` or CSS Grid: `display: grid; place-items: center;`.',
  'difference between let const var':
    '`var` is function-scoped and hoisted, `let` is block-scoped and not hoisted, `const` is block-scoped, not hoisted, and cannot be reassigned.',
  'what is virtual dom':
    'The Virtual DOM is a lightweight copy of the real DOM that React uses to optimize updates. It compares the virtual DOM with the real DOM and only updates what changed.',
  'how to optimize performance':
    'Use lazy loading, code splitting, minimize DOM manipulation, optimize images, use efficient CSS selectors, and implement proper caching strategies.',
};
