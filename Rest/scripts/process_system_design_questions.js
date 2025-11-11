const fs = require('fs');
const path = require('path');

/**
 * Process System Design questions from JSON file
 * Converts open-ended to multiple-choice and generates batch scripts (3 questions per batch)
 */

const sourceFile = path.join(__dirname, '../../apps/admin/network/data/json/system_design/questions-system-design.json');
const outputFile = path.join(__dirname, '../final-questions-v01/system-design-questions.json');
const batchesDir = path.join(__dirname, 'system-design-batches');

if (!fs.existsSync(batchesDir)) {
  fs.mkdirSync(batchesDir, { recursive: true });
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

function convertToMultipleChoice(question, explanation, sampleAnswers = []) {
  // Clean up explanation
  const cleanExplanation = explanation
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/\*\*([^\*]+)\*\*/g, '$1')
    .replace(/\*([^\*]+)\*/g, '$1')
    .trim();

  // Extract key points from explanation
  const keyPoints = cleanExplanation.split(/[.;]/).filter(p => p.trim().length > 20).slice(0, 2);
  
  // Generate options
  const options = [
    {
      id: 'o1',
      text: cleanExplanation.length > 200 ? cleanExplanation.substring(0, 200) + '...' : cleanExplanation,
      isCorrect: true,
      explanation: cleanExplanation
    },
    {
      id: 'o2',
      text: keyPoints[0] || 'This approach focuses on scalability and performance optimization.',
      isCorrect: false,
      explanation: ''
    },
    {
      id: 'o3',
      text: keyPoints[1] || 'This method prioritizes user experience and maintainability.',
      isCorrect: false,
      explanation: ''
    },
    {
      id: 'o4',
      text: 'This is incorrect. Please refer to system design best practices.',
      isCorrect: false,
      explanation: ''
    }
  ];

  return options;
}

// Read source questions
console.log('📖 Reading system design questions...\n');
const sourceQuestions = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
console.log(`✅ Loaded ${sourceQuestions.length} questions from source file\n`);

// Process questions
const processedQuestions = [];
let questionNum = 0;

sourceQuestions.forEach((q, index) => {
  // Skip if already multiple-choice
  if (q.type === 'multiple-choice' && q.options && q.options.length > 0) {
    // Ensure proper format
    const processed = {
      id: q.id || `system-design-${index + 1}`,
      title: q.title,
      content: formatCode(q.content),
      type: 'multiple-choice',
      category: q.category || 'System Design',
      topic: q.topic || 'Frontend System Design',
      difficulty: q.difficulty === 'beginner' ? 'intermediate' : (q.difficulty || 'intermediate'), // Upgrade beginner to intermediate for senior level
      learningCardId: q.learningCardId || 'system-design',
      isActive: true,
      createdAt: q.createdAt || new Date().toISOString(),
      updatedAt: q.updatedAt || new Date().toISOString(),
      createdBy: q.createdBy || 'admin',
      updatedBy: q.updatedBy || 'admin',
      tags: q.tags || ['system-design', 'frontend-system-design', q.difficulty || 'intermediate'],
      explanation: formatCode(q.explanation || ''),
      points: q.points || 15,
      options: q.options.map((opt, idx) => ({
        id: opt.id || `o${idx + 1}`,
        text: formatCode(opt.text),
        isCorrect: opt.isCorrect,
        explanation: opt.explanation ? formatCode(opt.explanation) : ''
      })),
      hints: q.hints || [
        'Consider system design principles and scalability',
        'Think about performance and user experience',
        'Review frontend architecture patterns'
      ],
      metadata: q.metadata || {}
    };
    processedQuestions.push(processed);
  } else if (q.type === 'open-ended') {
    // Convert open-ended to multiple-choice
    questionNum++;
    const options = convertToMultipleChoice(q.title, q.explanation || '', q.sampleAnswers || []);
    
    const processed = {
      id: q.id || `system-design-${index + 1}`,
      title: q.title,
      content: formatCode(q.content),
      type: 'multiple-choice',
      category: q.category || 'System Design',
      topic: q.topic || 'Frontend System Design',
      difficulty: q.difficulty === 'beginner' ? 'intermediate' : (q.difficulty || 'intermediate'),
      learningCardId: q.learningCardId || 'system-design',
      isActive: true,
      createdAt: q.createdAt || new Date().toISOString(),
      updatedAt: q.updatedAt || new Date().toISOString(),
      createdBy: q.createdBy || 'admin',
      updatedBy: q.updatedBy || 'admin',
      tags: q.tags || ['system-design', 'frontend-system-design', q.difficulty || 'intermediate'],
      explanation: formatCode(q.explanation || ''),
      points: q.points || 15,
      options: options,
      hints: q.hints || [
        'Consider system design principles and scalability',
        'Think about performance and user experience',
        'Review frontend architecture patterns'
      ],
      metadata: q.metadata || {}
    };
    processedQuestions.push(processed);
  }
});

console.log(`✅ Processed ${processedQuestions.length} questions\n`);

// Generate additional senior-level frontend system design questions
console.log('📝 Generating additional senior-level frontend system design questions...\n');

const seniorQuestions = [
  {
    id: 'system-design-senior-1',
    title: 'How would you design a real-time collaborative editor frontend?',
    content: 'You need to build a collaborative editor like Google Docs where multiple users can edit simultaneously. What frontend architecture would you use?',
    topic: 'Frontend System Design',
    options: [
      { text: 'Use WebSockets for real-time sync, Operational Transform (OT) or CRDTs for conflict resolution, debounce/throttle local changes, and optimistic UI updates', isCorrect: true },
      { text: 'Poll the server every second for updates', isCorrect: false },
      { text: 'Use only localStorage for collaboration', isCorrect: false },
      { text: 'Require users to lock sections before editing', isCorrect: false }
    ],
    explanation: 'WebSockets enable real-time bidirectional communication. OT or CRDTs handle concurrent edits. Debouncing reduces network traffic. Optimistic updates provide instant feedback.'
  },
  {
    id: 'system-design-senior-2',
    title: 'How do you design a frontend caching strategy for a large-scale e-commerce site?',
    content: 'Your e-commerce site has millions of products. How would you implement caching at the frontend level?',
    topic: 'Frontend System Design',
    options: [
      { text: 'Use service workers for offline caching, HTTP cache headers (Cache-Control, ETag), in-memory cache (React Query/SWR), and CDN for static assets', isCorrect: true },
      { text: 'Cache everything in localStorage', isCorrect: false },
      { text: 'No caching - fetch fresh data every time', isCorrect: false },
      { text: 'Use only browser cache', isCorrect: false }
    ],
    explanation: 'Service workers enable offline functionality. HTTP cache headers control browser caching. React Query/SWR provide intelligent request caching. CDN caches static assets globally.'
  },
  {
    id: 'system-design-senior-3',
    title: 'How would you architect a micro-frontend application?',
    content: 'You need to build a large application using micro-frontends. What architecture pattern would you use?',
    topic: 'Frontend System Design',
    options: [
      { text: 'Use Module Federation (Webpack 5), single-spa framework, or iframe-based approach. Implement shared dependencies, independent deployment, and runtime integration', isCorrect: true },
      { text: 'Put everything in one monolithic React app', isCorrect: false },
      { text: 'Use separate domains for each micro-frontend', isCorrect: false },
      { text: 'Micro-frontends are not possible', isCorrect: false }
    ],
    explanation: 'Module Federation enables runtime sharing. Single-spa orchestrates multiple frameworks. Shared dependencies reduce bundle size. Independent deployment enables team autonomy.'
  },
  {
    id: 'system-design-senior-4',
    title: 'How do you design a frontend monitoring and error tracking system?',
    content: 'You need to monitor frontend performance and track errors in production. What approach would you take?',
    topic: 'Frontend System Design',
    options: [
      { text: 'Use error boundaries, Sentry/LogRocket for error tracking, Web Vitals API for performance metrics, custom analytics events, and sampling to reduce overhead', isCorrect: true },
      { text: 'Use only console.log', isCorrect: false },
      { text: 'Track everything without sampling', isCorrect: false },
      { text: 'No monitoring needed', isCorrect: false }
    ],
    explanation: 'Error boundaries catch React errors. Sentry provides error tracking and context. Web Vitals measure Core Web Vitals. Custom events track business metrics. Sampling reduces performance impact.'
  },
  {
    id: 'system-design-senior-5',
    title: 'How would you design a frontend state synchronization system for offline-first apps?',
    content: 'Your app needs to work offline and sync when online. How would you handle state synchronization?',
    topic: 'Frontend System Design',
    options: [
      { text: 'Use IndexedDB for local storage, queue mutations when offline, implement conflict resolution strategy, and use background sync API', isCorrect: true },
      { text: 'Disable app when offline', isCorrect: false },
      { text: 'Use only localStorage', isCorrect: false },
      { text: 'Sync immediately without queuing', isCorrect: false }
    ],
    explanation: 'IndexedDB provides robust local storage. Mutation queue stores offline changes. Conflict resolution handles concurrent edits. Background Sync API syncs when connection restored.'
  },
  {
    id: 'system-design-senior-6',
    title: 'How do you design a frontend feature flag system?',
    content: 'You need to enable/disable features without deploying. How would you implement feature flags?',
    topic: 'Frontend System Design',
    options: [
      { text: 'Use a feature flag service (LaunchDarkly, Split.io), cache flags client-side, implement gradual rollout, and provide fallback defaults', isCorrect: true },
      { text: 'Hardcode feature flags in code', isCorrect: false },
      { text: 'Use only environment variables', isCorrect: false },
      { text: 'Feature flags are not needed', isCorrect: false }
    ],
    explanation: 'Feature flag services enable runtime toggling. Client-side caching reduces latency. Gradual rollout minimizes risk. Fallback defaults ensure app stability.'
  },
  {
    id: 'system-design-senior-7',
    title: 'How would you design a frontend A/B testing infrastructure?',
    content: 'You need to run A/B tests on different UI variations. How would you architect this?',
    topic: 'Frontend System Design',
    options: [
      { text: 'Use A/B testing platform (Optimizely, VWO), implement variant routing, track conversion events, ensure statistical significance, and provide fallback to control', isCorrect: true },
      { text: 'Manually switch between versions', isCorrect: false },
      { text: 'Use only CSS to hide/show variants', isCorrect: false },
      { text: 'A/B testing is not possible in frontend', isCorrect: false }
    ],
    explanation: 'A/B platforms handle variant assignment and analytics. Variant routing shows correct version. Conversion tracking measures success. Statistical significance ensures valid results.'
  },
  {
    id: 'system-design-senior-8',
    title: 'How do you design a frontend asset delivery and optimization system?',
    content: 'Your app has thousands of images and assets. How would you optimize delivery?',
    topic: 'Frontend System Design',
    options: [
      { text: 'Use CDN for global distribution, implement image optimization (WebP, responsive images), lazy loading, code splitting, and asset versioning for cache busting', isCorrect: true },
      { text: 'Serve all assets from main server', isCorrect: false },
      { text: 'Use only PNG format', isCorrect: false },
      { text: 'Load all assets at once', isCorrect: false }
    ],
    explanation: 'CDN reduces latency globally. Image optimization reduces file sizes. Lazy loading improves initial load. Code splitting reduces bundle size. Versioning ensures cache updates.'
  },
  {
    id: 'system-design-senior-9',
    title: 'How would you design a frontend internationalization (i18n) system?',
    content: 'Your app needs to support 50+ languages. How would you architect the i18n system?',
    topic: 'Frontend System Design',
    options: [
      { text: 'Use i18n library (react-i18next), lazy load translation files, implement RTL support, handle pluralization, and provide fallback to default language', isCorrect: true },
      { text: 'Hardcode all translations', isCorrect: false },
      { text: 'Load all languages at once', isCorrect: false },
      { text: 'Use only English', isCorrect: false }
    ],
    explanation: 'i18n libraries handle translation management. Lazy loading reduces initial bundle. RTL support for Arabic/Hebrew. Pluralization handles language rules. Fallback ensures content always displays.'
  },
  {
    id: 'system-design-senior-10',
    title: 'How do you design a frontend search system with autocomplete?',
    content: 'You need to implement search with real-time autocomplete for millions of items. How would you architect this?',
    topic: 'Frontend System Design',
    options: [
      { text: 'Debounce input, use search API with query caching, implement virtual scrolling for results, highlight matches, and provide search suggestions', isCorrect: true },
      { text: 'Search on every keystroke without debouncing', isCorrect: false },
      { text: 'Load all items and filter client-side', isCorrect: false },
      { text: 'No autocomplete needed', isCorrect: false }
    ],
    explanation: 'Debouncing reduces API calls. Query caching improves performance. Virtual scrolling handles large result sets. Highlighting improves UX. Suggestions guide users.'
  },
  {
    id: 'system-design-senior-11',
    title: 'How would you design a frontend data visualization system?',
    content: 'You need to display complex charts and graphs with real-time updates. How would you architect this?',
    topic: 'Frontend System Design',
    options: [
      { text: 'Use visualization library (D3.js, Chart.js), implement WebSocket for real-time updates, use canvas/SVG for rendering, implement data aggregation, and provide responsive charts', isCorrect: true },
      { text: 'Use only HTML tables', isCorrect: false },
      { text: 'Render all data points without aggregation', isCorrect: false },
      { text: 'No real-time updates needed', isCorrect: false }
    ],
    explanation: 'Visualization libraries provide chart components. WebSockets enable real-time updates. Canvas/SVG handle complex rendering. Aggregation improves performance. Responsive design ensures mobile compatibility.'
  },
  {
    id: 'system-design-senior-12',
    title: 'How do you design a frontend authentication and authorization system?',
    content: 'Your app needs secure authentication with role-based access control. How would you implement this?',
    topic: 'Frontend System Design',
    options: [
      { text: 'Use JWT tokens stored in httpOnly cookies, implement refresh token rotation, use route guards for authorization, handle token expiration, and provide secure logout', isCorrect: true },
      { text: 'Store passwords in localStorage', isCorrect: false },
      { text: 'Use only session storage', isCorrect: false },
      { text: 'No authentication needed', isCorrect: false }
    ],
    explanation: 'httpOnly cookies prevent XSS attacks. Refresh tokens enable secure token renewal. Route guards protect pages. Token expiration handling improves security. Secure logout clears all tokens.'
  },
  {
    id: 'system-design-senior-13',
    title: 'How would you design a frontend form validation and submission system?',
    content: 'You have complex forms with nested fields and conditional validation. How would you architect this?',
    topic: 'Frontend System Design',
    options: [
      { text: 'Use form library (React Hook Form, Formik), implement schema validation (Yup, Zod), handle async validation, provide field-level and form-level errors, and implement optimistic submission', isCorrect: true },
      { text: 'Validate only on submit', isCorrect: false },
      { text: 'Use only HTML5 validation', isCorrect: false },
      { text: 'No validation needed', isCorrect: false }
    ],
    explanation: 'Form libraries handle state management. Schema validation ensures data integrity. Async validation checks server-side rules. Field-level errors improve UX. Optimistic submission provides instant feedback.'
  },
  {
    id: 'system-design-senior-14',
    title: 'How do you design a frontend notification system?',
    content: 'Your app needs to show real-time notifications to users. How would you architect this?',
    topic: 'Frontend System Design',
    options: [
      { text: 'Use WebSocket/SSE for real-time delivery, implement notification queue, use browser notifications API, provide notification center, and handle notification persistence', isCorrect: true },
      { text: 'Poll server every second', isCorrect: false },
      { text: 'Show all notifications at once', isCorrect: false },
      { text: 'No notifications needed', isCorrect: false }
    ],
    explanation: 'WebSocket/SSE enable real-time delivery. Notification queue manages display order. Browser API enables system notifications. Notification center provides history. Persistence ensures notifications survive page reloads.'
  },
  {
    id: 'system-design-senior-15',
    title: 'How would you design a frontend analytics and tracking system?',
    content: 'You need to track user behavior and business metrics. How would you implement analytics?',
    topic: 'Frontend System Design',
    options: [
      { text: 'Use analytics platform (Google Analytics, Mixpanel), implement event tracking, use data layer pattern, respect user privacy (GDPR), and batch events to reduce overhead', isCorrect: true },
      { text: 'Track everything without batching', isCorrect: false },
      { text: 'Use only page views', isCorrect: false },
      { text: 'No analytics needed', isCorrect: false }
    ],
    explanation: 'Analytics platforms provide tracking infrastructure. Event tracking captures user actions. Data layer pattern decouples tracking. Privacy compliance is required. Batching reduces network overhead.'
  }
];

// Format senior questions
seniorQuestions.forEach(q => {
  const processed = {
    id: q.id,
    title: q.title,
    content: formatCode(q.content),
    type: 'multiple-choice',
    category: 'System Design',
    topic: q.topic,
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'senior', 'intermediate'],
    explanation: formatCode(q.explanation),
    points: 15,
    options: q.options.map((opt, idx) => ({
      id: `o${idx + 1}`,
      text: formatCode(opt.text),
      isCorrect: opt.isCorrect,
      explanation: opt.explanation ? formatCode(opt.explanation) : ''
    })),
    hints: [
      'Consider system design principles and scalability',
      'Think about performance and user experience',
      'Review frontend architecture patterns'
    ],
    metadata: {}
  };
  processedQuestions.push(processed);
});

console.log(`✅ Added ${seniorQuestions.length} senior-level questions\n`);
console.log(`📊 Total questions: ${processedQuestions.length}\n`);

// Group by topic
const topics = {};
processedQuestions.forEach(q => {
  topics[q.topic] = (topics[q.topic] || 0) + 1;
});

console.log('📋 Questions by topic:');
Object.entries(topics).sort().forEach(([topic, count]) => {
  console.log(`  ${topic}: ${count} questions`);
});

// Create batch scripts (3 questions per batch)
let batchNum = 1;
for (let i = 0; i < processedQuestions.length; i += 3) {
  const batch = processedQuestions.slice(i, i + 3);
  const batchFileName = path.join(batchesDir, `batch${batchNum}.js`);
  
  const scriptContent = `const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/system-design-questions.json');

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

console.log(\`✅ Added \${newQuestions.length} system design questions (Batch ${batchNum})\`);
console.log(\`📝 Total System Design questions: \${existingQuestions.length}\`);
`;
  
  fs.writeFileSync(batchFileName, scriptContent);
  batchNum++;
}

console.log(`\n✅ Created ${batchNum - 1} batch scripts in ${batchesDir}`);

// Create master runner script
const masterRunner = `const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const batchesDir = __dirname;
const batches = fs.readdirSync(batchesDir)
  .filter(f => f.startsWith('batch') && f.endsWith('.js'))
  .sort((a, b) => parseInt(a.match(/\\d+/)?.[0] || 0) - parseInt(b.match(/\\d+/)?.[0] || 0));

console.log(\`🚀 Running \${batches.length} system design question batches...\\n\`);

let successCount = 0;
let errorCount = 0;

batches.forEach((batchFile, index) => {
  const batchPath = path.join(batchesDir, batchFile);
  try {
    process.stdout.write(\`[\${index + 1}/\${batches.length}] \${batchFile}... \`);
    execSync(\`node "\${batchPath}"\`, { stdio: 'pipe', cwd: __dirname });
    process.stdout.write('✅\\n');
    successCount++;
  } catch (error) {
    process.stdout.write('❌\\n');
    errorCount++;
  }
  
  if ((index + 1) % 5 === 0) {
    console.log(\`\\n📊 Progress: \${index + 1}/\${batches.length} batches\\n\`);
  }
});

console.log(\`\\n✅ All batches completed! \${successCount} success, \${errorCount} errors\`);
`;

fs.writeFileSync(path.join(batchesDir, 'run_all_batches.js'), masterRunner);
console.log(`✅ Created master runner: ${path.join(batchesDir, 'run_all_batches.js')}\n`);

