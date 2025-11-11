const fs = require('fs');
const path = require('path');

/**
 * Master script to generate additional senior-level questions for all categories
 * Creates batch scripts with 3 questions per batch (todo)
 */

const categories = [
  { name: 'HTML', file: 'html-questions.json', currentCount: 113 },
  { name: 'CSS', file: 'css-questions.json', currentCount: 137 },
  { name: 'JavaScript', file: 'javascript-questions.json', currentCount: 149 },
  { name: 'React', file: 'react-questions.json', currentCount: 0 },
  { name: 'Next.js', file: 'nextjs-questions.json', currentCount: 120 },
  { name: 'Design Patterns', file: 'design-patterns-questions.json', currentCount: 102 },
  { name: 'Performance Patterns', file: 'performance-patterns-questions.json', currentCount: 108 },
  { name: 'Rendering Patterns', file: 'rendering-patterns-questions.json', currentCount: 108 },
  { name: 'Security', file: 'security-questions.json', currentCount: 100 }
];

const questionsDir = path.join(__dirname, '../final-questions-v01');
const batchesBaseDir = path.join(__dirname, 'all-category-batches');

if (!fs.existsSync(batchesBaseDir)) {
  fs.mkdirSync(batchesBaseDir, { recursive: true });
}

function formatCode(content) {
  if (!content) return '';
  content = content.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    code = code.trim().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<pre><code>${code}</code></pre>`;
  });
  content = content.replace(/`([^`\n]+)`/g, (match, code) => {
    if (match.includes('<pre>') || match.includes('<code>')) return match;
    code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<code>${code}</code>`;
  });
  return content;
}

function generateQuestion(id, title, content, category, topic, options, explanation, difficulty = 'intermediate') {
  return {
    id: `${category.toLowerCase().replace(/\s+/g, '-')}-senior-${id}`,
    title: title,
    content: formatCode(content),
    type: 'multiple-choice',
    category: category,
    topic: topic,
    difficulty: difficulty,
    learningCardId: category === 'Security' ? 'system-design' : 'framework-questions',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [category.toLowerCase().replace(/\s+/g, '-'), topic.toLowerCase().replace(/\s+/g, '-'), difficulty],
    explanation: formatCode(explanation),
    points: 15,
    options: options.map((opt, idx) => ({
      id: `o${idx + 1}`,
      text: formatCode(opt.text),
      isCorrect: opt.isCorrect,
      explanation: opt.explanation ? formatCode(opt.explanation) : ''
    })),
    hints: [
      `Review ${category} best practices and advanced patterns`,
      `Consider performance and optimization implications`,
      `Think about edge cases and real-world scenarios`
    ],
    metadata: {}
  };
}

// Generate questions for each category
const allQuestions = {};

// HTML Questions (add 30 more = 10 batches of 3)
allQuestions.HTML = [
  generateQuestion('html-1', 'What is the difference between <code>&lt;article&gt;</code> and <code>&lt;section&gt;</code> in terms of accessibility and SEO?', 'How do these semantic elements differ in their semantic meaning and impact on assistive technologies?', 'HTML', 'HTML5 Semantics', [
    { text: '<article> represents standalone content that can be independently distributed, <section> represents thematic grouping', isCorrect: true },
    { text: 'They are interchangeable and have no semantic difference', isCorrect: false },
    { text: '<section> is always nested inside <article>', isCorrect: false },
    { text: '<article> is only for blog posts', isCorrect: false }
  ], '<article> is for standalone, distributable content. <section> is for thematic grouping. This affects how screen readers and search engines understand content structure.'),
  
  generateQuestion('html-2', 'How does the <code>loading="lazy"</code> attribute on images affect Core Web Vitals?', 'What is the impact of lazy loading images on LCP (Largest Contentful Paint) and CLS (Cumulative Layout Shift)?', 'HTML', 'Performance', [
    { text: 'Lazy loading defers offscreen images, improving initial LCP but may cause CLS if dimensions are not set', isCorrect: true },
    { text: 'Lazy loading always improves all Core Web Vitals', isCorrect: false },
    { text: 'Lazy loading has no impact on Core Web Vitals', isCorrect: false },
    { text: 'Lazy loading only affects FID (First Input Delay)', isCorrect: false }
  ], 'Lazy loading defers offscreen images, improving initial LCP. However, if image dimensions are not set, it can cause CLS when images load. Always set width and height attributes.'),
  
  generateQuestion('html-3', 'What is the purpose of the <code>&lt;template&gt;</code> element and when should you use it?', 'How does the template element differ from hidden divs for client-side templating?', 'HTML', 'HTML5 APIs', [
    { text: '<template> holds inert HTML that can be cloned via JavaScript, not rendered until activated', isCorrect: true },
    { text: '<template> renders content immediately but hides it with CSS', isCorrect: false },
    { text: '<template> is only for server-side rendering', isCorrect: false },
    { text: '<template> is deprecated in HTML5', isCorrect: false }
  ], '<template> holds inert HTML that is not rendered until cloned via JavaScript. Unlike hidden divs, template content is not part of the DOM and does not affect rendering or accessibility.')
];

// CSS Questions (add 30 more = 10 batches of 3)
allQuestions.CSS = [
  generateQuestion('css-1', 'What is the difference between <code>transform</code> and changing <code>left/top</code> properties for animations?', 'Why is transform preferred for animations over position properties?', 'CSS', 'Performance', [
    { text: 'transform uses GPU acceleration and does not trigger layout recalculation, left/top triggers layout and repaint', isCorrect: true },
    { text: 'They are identical in performance', isCorrect: false },
    { text: 'left/top is faster because it uses less CSS', isCorrect: false },
    { text: 'transform only works in modern browsers', isCorrect: false }
  ], 'transform uses GPU compositing and does not trigger layout recalculation. Changing left/top triggers layout, repaint, and composite - much more expensive.'),
  
  generateQuestion('css-2', 'How does <code>content-visibility: auto</code> improve rendering performance?', 'What is the mechanism behind content-visibility optimization?', 'CSS', 'Performance', [
    { text: 'It skips rendering for offscreen content, only rendering when it enters viewport', isCorrect: true },
    { text: 'It hides content with display: none', isCorrect: false },
    { text: 'It only works with flexbox layouts', isCorrect: false },
    { text: 'It reduces file size of CSS', isCorrect: false }
  ], 'content-visibility: auto skips rendering work for offscreen content. The browser only renders when the element enters the viewport, significantly improving initial render performance.'),
  
  generateQuestion('css-3', 'What is the difference between <code>will-change</code> and <code>transform: translateZ(0)</code> for GPU acceleration?', 'How do these techniques differ in triggering hardware acceleration?', 'CSS', 'Performance', [
    { text: 'will-change hints future changes to the browser, translateZ(0) forces a new layer immediately', isCorrect: true },
    { text: 'They are identical', isCorrect: false },
    { text: 'will-change is deprecated', isCorrect: false },
    { text: 'translateZ(0) only works in Chrome', isCorrect: false }
  ], 'will-change is a hint for future changes. translateZ(0) immediately creates a new compositing layer. Use will-change sparingly as it consumes memory.')
];

// JavaScript Questions (add 30 more = 10 batches of 3)
allQuestions.JavaScript = [
  generateQuestion('js-1', 'What is the difference between <code>Promise.all()</code> and <code>Promise.allSettled()</code>?', 'How do these Promise methods handle rejected promises differently?', 'JavaScript', 'Async/Await', [
    { text: 'Promise.all() rejects immediately on first rejection, Promise.allSettled() waits for all promises regardless of outcome', isCorrect: true },
    { text: 'They are identical', isCorrect: false },
    { text: 'Promise.allSettled() rejects on first failure', isCorrect: false },
    { text: 'Promise.all() only works with arrays', isCorrect: false }
  ], 'Promise.all() rejects immediately when any promise rejects. Promise.allSettled() waits for all promises and returns results for both fulfilled and rejected promises.'),
  
  generateQuestion('js-2', 'How does the <code>Proxy</code> object enable reactive programming patterns?', 'What makes Proxy useful for implementing reactivity systems like Vue.js?', 'JavaScript', 'ES6+ Features', [
    { text: 'Proxy intercepts property access/setting, enabling automatic dependency tracking and updates', isCorrect: true },
    { text: 'Proxy only works for arrays', isCorrect: false },
    { text: 'Proxy is synchronous only', isCorrect: false },
    { text: 'Proxy cannot intercept property access', isCorrect: false }
  ], 'Proxy intercepts property access (get) and setting (set), allowing frameworks to track dependencies and automatically trigger updates when properties change.'),
  
  generateQuestion('js-3', 'What is the difference between <code>Object.freeze()</code> and <code>Object.seal()</code>?', 'How do these methods differ in preventing object modifications?', 'JavaScript', 'ES6+ Features', [
    { text: 'freeze() prevents all changes including property values, seal() allows changing values but not adding/removing properties', isCorrect: true },
    { text: 'They are identical', isCorrect: false },
    { text: 'seal() is stricter than freeze()', isCorrect: false },
    { text: 'freeze() only works in strict mode', isCorrect: false }
  ], 'Object.freeze() makes objects immutable - no property changes allowed. Object.seal() allows changing existing property values but prevents adding/removing properties.')
];

// React Questions (add 30 more = 10 batches of 3) - React currently has 0 questions
allQuestions.React = [
  generateQuestion('react-1', 'What is the difference between <code>useMemo</code> and <code>useCallback</code>?', 'When should you use each hook for performance optimization?', 'React', 'Core React', [
    { text: 'useMemo memoizes computed values, useCallback memoizes function references', isCorrect: true },
    { text: 'They are identical', isCorrect: false },
    { text: 'useMemo is for functions, useCallback is for values', isCorrect: false },
    { text: 'useCallback is deprecated', isCorrect: false }
  ], 'useMemo memoizes the result of a computation. useCallback memoizes the function itself. Use useMemo for expensive calculations, useCallback to prevent child re-renders.'),
  
  generateQuestion('react-2', 'How does React Fiber improve rendering performance compared to the old reconciler?', 'What architectural changes enable incremental rendering in Fiber?', 'React', 'Core React', [
    { text: 'Fiber enables incremental rendering by breaking work into chunks and prioritizing updates', isCorrect: true },
    { text: 'Fiber is faster because it uses Web Workers', isCorrect: false },
    { text: 'Fiber only works with hooks', isCorrect: false },
    { text: 'Fiber is a replacement for React DOM', isCorrect: false }
  ], 'Fiber breaks rendering work into small units that can be paused, prioritized, and resumed. This enables incremental rendering and better user experience.'),
  
  generateQuestion('react-3', 'What is the purpose of <code>React.memo</code> and when should you use it?', 'How does React.memo prevent unnecessary re-renders?', 'React', 'Core React', [
    { text: 'React.memo shallowly compares props and skips re-render if props are unchanged', isCorrect: true },
    { text: 'React.memo prevents all re-renders', isCorrect: false },
    { text: 'React.memo only works with class components', isCorrect: false },
    { text: 'React.memo is automatic for all components', isCorrect: false }
  ], 'React.memo performs a shallow comparison of props. If props are unchanged, it skips re-rendering the component, improving performance.')
];

// Next.js Questions (add 30 more = 10 batches of 3)
allQuestions['Next.js'] = [
  generateQuestion('next-1', 'How does Next.js handle code splitting automatically?', 'What is the mechanism behind automatic code splitting in Next.js?', 'Next.js', 'Optimization', [
    { text: 'Next.js splits code by route and component, creating separate chunks loaded on demand', isCorrect: true },
    { text: 'Code splitting must be configured manually', isCorrect: false },
    { text: 'Next.js bundles everything into one file', isCorrect: false },
    { text: 'Code splitting only works in App Router', isCorrect: false }
  ], 'Next.js automatically splits code by route and component. Each route gets its own chunk, and components can be dynamically imported for further splitting.'),
  
  generateQuestion('next-2', 'What is the difference between <code>getStaticPaths</code> with <code>fallback: false</code> vs <code>fallback: true</code>?', 'How do these fallback options affect SSG behavior?', 'Next.js', 'Static Site Generation (SSG)', [
    { text: 'fallback: false pre-renders all paths at build time, fallback: true allows on-demand generation for missing paths', isCorrect: true },
    { text: 'They are identical', isCorrect: false },
    { text: 'fallback: true pre-renders everything', isCorrect: false },
    { text: 'fallback only works in App Router', isCorrect: false }
  ], 'fallback: false means all paths must be pre-rendered at build time. fallback: true allows generating missing paths on-demand, enabling ISR-like behavior.'),
  
  generateQuestion('next-3', 'How does Next.js middleware differ from API routes?', 'When should you use middleware vs API routes?', 'Next.js', 'Middleware', [
    { text: 'Middleware runs before requests reach routes/API, API routes handle specific endpoints', isCorrect: true },
    { text: 'They are identical', isCorrect: false },
    { text: 'Middleware only works in Pages Router', isCorrect: false },
    { text: 'API routes run before middleware', isCorrect: false }
  ], 'Middleware intercepts requests before they reach routes or API endpoints, perfect for auth, redirects, headers. API routes handle specific endpoint logic.')
];

// Design Patterns Questions (add 30 more = 10 batches of 3)
allQuestions['Design Patterns'] = [
  generateQuestion('dp-1', 'What is the difference between Factory Pattern and Abstract Factory Pattern?', 'How do these creational patterns differ in their complexity and use cases?', 'Design Patterns', 'Creational Patterns', [
    { text: 'Factory creates one type of object, Abstract Factory creates families of related objects', isCorrect: true },
    { text: 'They are identical', isCorrect: false },
    { text: 'Abstract Factory is simpler than Factory', isCorrect: false },
    { text: 'Factory only works in JavaScript', isCorrect: false }
  ], 'Factory Pattern creates objects of a single type. Abstract Factory Pattern creates families of related objects, providing an interface for creating groups of objects.'),
  
  generateQuestion('dp-2', 'How does the Observer Pattern enable event-driven architectures?', 'What makes Observer Pattern suitable for decoupled communication?', 'Design Patterns', 'Behavioral Patterns', [
    { text: 'Observer allows objects to subscribe to events and be notified of changes without tight coupling', isCorrect: true },
    { text: 'Observer requires direct references between objects', isCorrect: false },
    { text: 'Observer only works with arrays', isCorrect: false },
    { text: 'Observer is synchronous only', isCorrect: false }
  ], 'Observer Pattern enables one-to-many dependency between objects. When one object changes state, all dependents are notified automatically, enabling loose coupling.'),
  
  generateQuestion('dp-3', 'What is the difference between Adapter Pattern and Decorator Pattern?', 'How do these structural patterns differ in their purpose?', 'Design Patterns', 'Structural Patterns', [
    { text: 'Adapter changes interface to make incompatible classes work together, Decorator adds behavior without changing interface', isCorrect: true },
    { text: 'They are identical', isCorrect: false },
    { text: 'Decorator changes interfaces', isCorrect: false },
    { text: 'Adapter adds new behavior', isCorrect: false }
  ], 'Adapter Pattern makes incompatible interfaces compatible. Decorator Pattern adds new behavior dynamically without changing the original interface.')
];

// Performance Patterns Questions (add 30 more = 10 batches of 3)
allQuestions['Performance Patterns'] = [
  generateQuestion('perf-1', 'What is the PRPL pattern and how does it optimize web performance?', 'How do Push, Render, Pre-cache, and Lazy-load work together?', 'Performance Patterns', 'PRPL Pattern', [
    { text: 'PRPL pushes critical resources, renders initial route, pre-caches remaining routes, lazy-loads as needed', isCorrect: true },
    { text: 'PRPL is a CSS optimization technique', isCorrect: false },
    { text: 'PRPL only works with React', isCorrect: false },
    { text: 'PRPL stands for Performance, Render, Preload, Lazy', isCorrect: false }
  ], 'PRPL: Push critical resources via HTTP/2, Render initial route quickly, Pre-cache remaining routes, Lazy-load routes on demand. Optimizes initial load and navigation.'),
  
  generateQuestion('perf-2', 'How does tree shaking reduce bundle size?', 'What mechanism enables dead code elimination in modern bundlers?', 'Performance Patterns', 'Code Optimization', [
    { text: 'Tree shaking analyzes import/export statements and removes unused code during bundling', isCorrect: true },
    { text: 'Tree shaking removes comments from code', isCorrect: false },
    { text: 'Tree shaking only works with TypeScript', isCorrect: false },
    { text: 'Tree shaking requires manual configuration for each file', isCorrect: false }
  ], 'Tree shaking analyzes ES6 import/export statements. Unused exports are eliminated during bundling, reducing bundle size. Requires ES modules and proper configuration.'),
  
  generateQuestion('perf-3', 'What is the difference between code splitting and lazy loading?', 'How do these optimization techniques differ?', 'Performance Patterns', 'Code Splitting', [
    { text: 'Code splitting divides code into chunks, lazy loading loads chunks on demand', isCorrect: true },
    { text: 'They are identical', isCorrect: false },
    { text: 'Lazy loading splits code automatically', isCorrect: false },
    { text: 'Code splitting only works with dynamic imports', isCorrect: false }
  ], 'Code splitting divides code into separate chunks. Lazy loading loads those chunks on demand (when needed). Code splitting enables lazy loading.')
];

// Rendering Patterns Questions (add 30 more = 10 batches of 3)
allQuestions['Rendering Patterns'] = [
  generateQuestion('rend-1', 'What is the difference between Static Rendering and Server-Side Rendering?', 'How do these rendering strategies differ in when and where HTML is generated?', 'Rendering Patterns', 'Static Rendering', [
    { text: 'Static Rendering generates HTML at build time, SSR generates HTML on each request', isCorrect: true },
    { text: 'They are identical', isCorrect: false },
    { text: 'SSR generates HTML at build time', isCorrect: false },
    { text: 'Static Rendering requires a server', isCorrect: false }
  ], 'Static Rendering pre-generates HTML at build time for fast delivery. SSR generates HTML on each request, enabling dynamic content but slower response times.'),
  
  generateQuestion('rend-2', 'How does Streaming Rendering improve perceived performance?', 'What makes streaming better than waiting for full page render?', 'Rendering Patterns', 'Streaming Rendering', [
    { text: 'Streaming sends HTML incrementally as it renders, allowing progressive page display', isCorrect: true },
    { text: 'Streaming reduces file size', isCorrect: false },
    { text: 'Streaming only works with static content', isCorrect: false },
    { text: 'Streaming requires WebSockets', isCorrect: false }
  ], 'Streaming sends HTML chunks as they are rendered, allowing the browser to display content progressively. Users see content faster than waiting for full page render.'),
  
  generateQuestion('rend-3', 'What is Progressive Hydration and how does it optimize interactivity?', 'How does progressive hydration differ from full hydration?', 'Rendering Patterns', 'Progressive Hydration', [
    { text: 'Progressive Hydration hydrates components incrementally based on priority, reducing initial JS execution', isCorrect: true },
    { text: 'Progressive Hydration hydrates everything at once', isCorrect: false },
    { text: 'Progressive Hydration only works with React', isCorrect: false },
    { text: 'Progressive Hydration prevents interactivity', isCorrect: false }
  ], 'Progressive Hydration hydrates components incrementally, prioritizing above-the-fold content. This reduces initial JavaScript execution and improves Time to Interactive.')
];

// Security Questions (add 30 more = 10 batches of 3)
allQuestions.Security = [
  generateQuestion('sec-1', 'How does Content Security Policy (CSP) prevent XSS attacks?', 'What mechanism does CSP use to block malicious scripts?', 'Security', 'Content Security Policy (CSP)', [
    { text: 'CSP whitelists allowed sources for scripts/styles, blocking inline scripts and unauthorized sources', isCorrect: true },
    { text: 'CSP encrypts all scripts', isCorrect: false },
    { text: 'CSP only works with HTTPS', isCorrect: false },
    { text: 'CSP prevents all JavaScript execution', isCorrect: false }
  ], 'CSP uses a whitelist approach. It specifies allowed sources for scripts, styles, and other resources. Inline scripts and unauthorized sources are blocked, preventing XSS.'),
  
  generateQuestion('sec-2', 'What is the difference between SameSite=Lax and SameSite=Strict for cookies?', 'How do these SameSite values affect CSRF protection?', 'Security', 'CSRF', [
    { text: 'Strict blocks all cross-site requests, Lax allows GET requests from top-level navigation', isCorrect: true },
    { text: 'They are identical', isCorrect: false },
    { text: 'Lax is stricter than Strict', isCorrect: false },
    { text: 'SameSite only works with secure cookies', isCorrect: false }
  ], 'SameSite=Strict blocks all cross-site cookie sending. SameSite=Lax allows cookies on top-level GET requests (like links) but blocks POST requests, balancing security and UX.'),
  
  generateQuestion('sec-3', 'How does Subresource Integrity (SRI) protect against compromised CDN resources?', 'What mechanism does SRI use to verify resource integrity?', 'Security', 'Web Security Fundamentals', [
    { text: 'SRI uses cryptographic hashes to verify that fetched resources match expected content', isCorrect: true },
    { text: 'SRI encrypts CDN resources', isCorrect: false },
    { text: 'SRI only works with JavaScript files', isCorrect: false },
    { text: 'SRI prevents all CDN usage', isCorrect: false }
  ], 'SRI uses integrity attributes with cryptographic hashes. The browser verifies the hash before executing/using the resource. If hash mismatches, the resource is blocked.')
];

// Create batch scripts for each category (3 questions per batch)
let totalBatches = 0;
Object.entries(allQuestions).forEach(([category, questions]) => {
  const categoryDir = path.join(batchesBaseDir, category.toLowerCase().replace(/\s+/g, '-'));
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true });
  }
  
  const categoryInfo = categories.find(c => c.name === category);
  const questionsFile = path.join(questionsDir, categoryInfo.file);
  
  for (let i = 0; i < questions.length; i += 3) {
    const batch = questions.slice(i, i + 3);
    const batchNum = Math.floor(i / 3) + 1;
    const batchFileName = path.join(categoryDir, `batch${batchNum}.js`);
    
    const scriptContent = `const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../../final-questions-v01/${categoryInfo.file}');

const newQuestions = ${JSON.stringify(batch, null, 2)};

// Read existing questions
let existingQuestions = [];
if (fs.existsSync(questionsFile)) {
  existingQuestions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
}

// Add new questions
existingQuestions.push(...newQuestions);

// Write back
fs.writeFileSync(questionsFile, JSON.stringify(existingQuestions, null, 2));

console.log(\`✅ Added \${newQuestions.length} questions for ${category} (Batch ${batchNum})\`);
console.log(\`📝 Total questions: \${existingQuestions.length}\`);
`;
    
    fs.writeFileSync(batchFileName, scriptContent);
    totalBatches++;
  }
});

console.log(`\n✅ Created ${totalBatches} batch scripts`);
console.log(`\n📊 Breakdown by category:`);
Object.entries(allQuestions).forEach(([category, questions]) => {
  const batches = Math.ceil(questions.length / 3);
  console.log(`  ${category}: ${questions.length} questions → ${batches} batches`);
});


