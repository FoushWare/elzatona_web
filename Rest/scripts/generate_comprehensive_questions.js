const fs = require('fs');
const path = require('path');

/**
 * Generate comprehensive senior-level questions for all categories
 * 30 questions per category = 10 batches of 3 questions each
 */

const categories = [
  {
    name: 'HTML',
    file: 'html-questions.json',
    topics: [
      'HTML5 Semantics',
      'Performance',
      'HTML5 APIs',
      'Accessibility',
      'SEO',
      'Forms',
      'Media',
    ],
  },
  {
    name: 'CSS',
    file: 'css-questions.json',
    topics: [
      'Performance',
      'Layout',
      'Animations',
      'Responsive',
      'Architecture',
      'Preprocessors',
      'Basics',
    ],
  },
  {
    name: 'JavaScript',
    file: 'javascript-questions.json',
    topics: [
      'Async/Await',
      'ES6+ Features',
      'Data Structures',
      'This Binding',
      'Classes',
      'Prototypes',
      'Generators',
      'Modules',
    ],
  },
  {
    name: 'React',
    file: 'react-questions.json',
    topics: [
      'Core React',
      'React Router',
      'React Testing',
      'React Redux',
      'Libraries & Integration',
      'Miscellaneous',
    ],
  },
  {
    name: 'Next.js',
    file: 'nextjs-questions.json',
    topics: [
      'Optimization',
      'Rendering',
      'Server Components',
      'Middleware',
      'Configuration',
      'Deployment',
      'Caching',
    ],
  },
  {
    name: 'Design Patterns',
    file: 'design-patterns-questions.json',
    topics: [
      'Creational Patterns',
      'Structural Patterns',
      'Behavioral Patterns',
      'React Patterns',
      'Core Patterns',
    ],
  },
  {
    name: 'Performance Patterns',
    file: 'performance-patterns-questions.json',
    topics: [
      'PRPL Pattern',
      'Code Splitting',
      'Lazy Loading',
      'Code Optimization',
      'Resource Hints',
    ],
  },
  {
    name: 'Rendering Patterns',
    file: 'rendering-patterns-questions.json',
    topics: [
      'Static Rendering',
      'Server-Side Rendering',
      'Client-Side Rendering',
      'Streaming Rendering',
      'Progressive Hydration',
    ],
  },
  {
    name: 'Security',
    file: 'security-questions.json',
    topics: [
      'XSS',
      'CSRF',
      'Web Security Fundamentals',
      'Content Security Policy (CSP)',
      'Session Management',
      'Authentication & Authorization',
    ],
  },
];

const questionsDir = path.join(__dirname, '../final-questions-v01');
const batchesBaseDir = path.join(__dirname, 'comprehensive-batches');

if (!fs.existsSync(batchesBaseDir)) {
  fs.mkdirSync(batchesBaseDir, { recursive: true });
}

function formatCode(content) {
  if (!content) return '';
  content = content.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    (match, lang, code) => {
      code = code
        .trim()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return `<pre><code>${code}</code></pre>`;
    }
  );
  content = content.replace(/`([^`\n]+)`/g, (match, code) => {
    if (match.includes('<pre>') || match.includes('<code>')) return match;
    code = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<code>${code}</code>`;
  });
  return content;
}

function generateQuestion(
  id,
  title,
  content,
  category,
  topic,
  options,
  explanation,
  difficulty = 'intermediate'
) {
  return {
    id: `${category.toLowerCase().replace(/\s+/g, '-')}-comp-${id}`,
    title: title,
    content: formatCode(content),
    type: 'multiple-choice',
    category: category,
    topic: topic,
    difficulty: difficulty,
    learningCardId:
      category === 'Security' ? 'system-design' : 'framework-questions',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      category.toLowerCase().replace(/\s+/g, '-'),
      topic.toLowerCase().replace(/\s+/g, '-'),
      difficulty,
    ],
    explanation: formatCode(explanation),
    points: 15,
    options: options.map((opt, idx) => ({
      id: `o${idx + 1}`,
      text: formatCode(opt.text),
      isCorrect: opt.isCorrect,
      explanation: opt.explanation ? formatCode(opt.explanation) : '',
    })),
    hints: [
      `Review ${category} best practices and advanced patterns`,
      `Consider performance and optimization implications`,
      `Think about edge cases and real-world scenarios`,
    ],
    metadata: {},
  };
}

// Question templates for each category (30 questions each)
const questionTemplates = {
  HTML: [
    {
      id: 1,
      topic: 'HTML5 Semantics',
      title:
        'What is the difference between <code>&lt;article&gt;</code> and <code>&lt;section&gt;</code> in terms of accessibility and SEO?',
      content:
        'How do these semantic elements differ in their semantic meaning and impact on assistive technologies?',
      options: [
        {
          text: '<article> represents standalone content that can be independently distributed, <section> represents thematic grouping',
          isCorrect: true,
        },
        {
          text: 'They are interchangeable and have no semantic difference',
          isCorrect: false,
        },
        {
          text: '<section> is always nested inside <article>',
          isCorrect: false,
        },
        { text: '<article> is only for blog posts', isCorrect: false },
      ],
      explanation:
        '<article> is for standalone, distributable content. <section> is for thematic grouping. This affects how screen readers and search engines understand content structure.',
    },
    {
      id: 2,
      topic: 'Performance',
      title:
        'How does the <code>loading="lazy"</code> attribute on images affect Core Web Vitals?',
      content:
        'What is the impact of lazy loading images on LCP (Largest Contentful Paint) and CLS (Cumulative Layout Shift)?',
      options: [
        {
          text: 'Lazy loading defers offscreen images, improving initial LCP but may cause CLS if dimensions are not set',
          isCorrect: true,
        },
        {
          text: 'Lazy loading always improves all Core Web Vitals',
          isCorrect: false,
        },
        {
          text: 'Lazy loading has no impact on Core Web Vitals',
          isCorrect: false,
        },
        {
          text: 'Lazy loading only affects FID (First Input Delay)',
          isCorrect: false,
        },
      ],
      explanation:
        'Lazy loading defers offscreen images, improving initial LCP. However, if image dimensions are not set, it can cause CLS when images load. Always set width and height attributes.',
    },
    {
      id: 3,
      topic: 'HTML5 APIs',
      title:
        'What is the purpose of the <code>&lt;template&gt;</code> element and when should you use it?',
      content:
        'How does the template element differ from hidden divs for client-side templating?',
      options: [
        {
          text: '<template> holds inert HTML that can be cloned via JavaScript, not rendered until activated',
          isCorrect: true,
        },
        {
          text: '<template> renders content immediately but hides it with CSS',
          isCorrect: false,
        },
        {
          text: '<template> is only for server-side rendering',
          isCorrect: false,
        },
        { text: '<template> is deprecated in HTML5', isCorrect: false },
      ],
      explanation:
        '<template> holds inert HTML that is not rendered until cloned via JavaScript. Unlike hidden divs, template content is not part of the DOM and does not affect rendering or accessibility.',
    },
    // Add 27 more HTML questions here...
  ],
  // Add templates for other categories...
};

// For now, let's create a script that generates questions programmatically
// We'll create 30 questions per category with varied topics

console.log('🚀 Generating comprehensive questions for all categories...\n');

// Read existing questions to get current counts
const existingCounts = {};
categories.forEach(cat => {
  const filePath = path.join(questionsDir, cat.file);
  if (fs.existsSync(filePath)) {
    const questions = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    existingCounts[cat.name] = questions.length;
  } else {
    existingCounts[cat.name] = 0;
  }
});

console.log('📊 Current question counts:');
Object.entries(existingCounts).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count} questions`);
});

console.log(
  '\n✅ This script will generate 30 questions per category (10 batches of 3)'
);
console.log(
  '📝 Due to the large volume, questions will be generated in batches'
);
console.log('\n💡 Run the batch scripts to add questions incrementally\n');

// Create a master runner script
const masterScript = `const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const categories = ${JSON.stringify(categories.map(c => c.name))};
const batchesBaseDir = path.join(__dirname, 'comprehensive-batches');

console.log('🚀 Running comprehensive question batches...\\n');

categories.forEach(category => {
  const categoryDir = path.join(batchesBaseDir, category.toLowerCase().replace(/\\s+/g, '-'));
  if (!fs.existsSync(categoryDir)) {
    console.log(\`⚠️  No batches found for \${category}\`);
    return;
  }
  
  const batches = fs.readdirSync(categoryDir)
    .filter(f => f.endsWith('.js'))
    .sort();
  
  console.log(\`\\n📦 \${category}: Running \${batches.length} batches...\`);
  
  batches.forEach((batchFile, index) => {
    const batchPath = path.join(categoryDir, batchFile);
    try {
      process.stdout.write(\`  [\${index + 1}/\${batches.length}] \${batchFile}... \`);
      execSync(\`node "\${batchPath}"\`, { stdio: 'pipe', cwd: __dirname });
      process.stdout.write('✅\\n');
    } catch (error) {
      process.stdout.write('❌\\n');
      console.error(\`    Error: \${error.message}\`);
    }
  });
});

console.log('\\n✅ All batches completed!\\n');
`;

fs.writeFileSync(path.join(batchesBaseDir, 'run_all_batches.js'), masterScript);

console.log(
  `✅ Created master runner script at: ${path.join(batchesBaseDir, 'run_all_batches.js')}`
);
console.log('\n📝 Next steps:');
console.log(
  '   1. Generate question batches (this requires expanding the question templates)'
);
console.log(
  '   2. Run: node Rest/scripts/comprehensive-batches/run_all_batches.js'
);
