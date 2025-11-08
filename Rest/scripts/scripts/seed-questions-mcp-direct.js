const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Technology mappings to category IDs
const categoryMap = {
  HTML: 'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
  CSS: '3bd9c23e-6e43-4234-b741-ef78955a90a0',
  JavaScript: '70970873-3e49-46ec-91e0-2777ff9b9b42',
  React: '36d38588-6d79-4457-b5a9-89eac44e8207',
  'Next.js': '9686f91c-d21e-4b1b-a5b9-9f702a58631e',
  'Design Patterns': '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
  Performance: 'e9377536-8288-44c0-840c-f2c2f0f3d817',
  'Rendering Patterns': '3f42766a-740c-48ee-9cca-e3a023221d77',
  Security: '12d5c7b3-cb41-4238-87e5-1fc5fb6ac42c',
  'System Design': '8a9b2c3d-4e5f-6789-abcd-ef0123456789',
};

// Topic mappings for each technology
const topicMap = {
  HTML: {
    'HTML Basics': 'html-basics-topic-uuid',
    HTML5: 'html5-topic-uuid',
    'Semantic HTML': 'semantic-html-topic-uuid',
    Forms: 'forms-topic-uuid',
    Accessibility: 'accessibility-topic-uuid',
  },
  CSS: {
    'CSS Basics': 'css-basics-topic-uuid',
    Layout: 'layout-topic-uuid',
    'Responsive Design': 'responsive-topic-uuid',
    'CSS Grid': 'css-grid-topic-uuid',
    Flexbox: 'flexbox-topic-uuid',
  },
  JavaScript: {
    'JavaScript Basics': 'js-basics-topic-uuid',
    'ES6+': 'es6-topic-uuid',
    'DOM Manipulation': 'dom-topic-uuid',
    'Async Programming': 'async-topic-uuid',
    Modules: 'modules-topic-uuid',
  },
  React: {
    'React Basics': 'react-basics-topic-uuid',
    Components: 'components-topic-uuid',
    Hooks: 'hooks-topic-uuid',
    'State Management': 'state-topic-uuid',
    Performance: 'react-performance-topic-uuid',
  },
  'Next.js': {
    'Next.js Basics': 'nextjs-basics-topic-uuid',
    Routing: 'routing-topic-uuid',
    'API Routes': 'api-routes-topic-uuid',
    'SSR/SSG': 'ssr-ssg-topic-uuid',
    Deployment: 'deployment-topic-uuid',
  },
  'Design Patterns': {
    'Common Patterns': 'common-patterns-topic-uuid',
    'Factory Pattern': 'factory-pattern-topic-uuid',
    'Observer Pattern': 'observer-pattern-topic-uuid',
    'Singleton Pattern': 'singleton-pattern-topic-uuid',
    'Module Pattern': 'module-pattern-topic-uuid',
  },
  Performance: {
    'Bundle Optimization': 'bundle-optimization-topic-uuid',
    'Code Splitting': 'code-splitting-topic-uuid',
    'Lazy Loading': 'lazy-loading-topic-uuid',
    Caching: 'caching-topic-uuid',
    Monitoring: 'monitoring-topic-uuid',
  },
  'Rendering Patterns': {
    'Server Side Rendering': 'ssr-topic-uuid',
    'Static Site Generation': 'ssg-topic-uuid',
    'Client Side Rendering': 'csr-topic-uuid',
    'Island Architecture': 'island-architecture-topic-uuid',
    'Progressive Enhancement': 'progressive-enhancement-topic-uuid',
  },
  Security: {
    Authentication: 'auth-topic-uuid',
    Authorization: 'authorization-topic-uuid',
    'Data Protection': 'data-protection-topic-uuid',
    'XSS Prevention': 'xss-prevention-topic-uuid',
    'CSRF Protection': 'csrf-protection-topic-uuid',
  },
  'System Design': {
    Scalability: 'scalability-topic-uuid',
    'Load Balancing': 'load-balancing-topic-uuid',
    'Caching Strategies': 'caching-strategies-topic-uuid',
    'Database Design': 'database-design-topic-uuid',
    Microservices: 'microservices-topic-uuid',
  },
};

// Function to determine technology from file path
function getTechnologyFromPath(filePath) {
  const pathParts = filePath.split('/');
  const technologyDir = pathParts[pathParts.length - 2]; // Get the directory name

  // Map directory names to technology names
  const techMapping = {
    html: 'HTML',
    css: 'CSS',
    javascript: 'JavaScript',
    react: 'React',
    nextjs: 'Next.js',
    'design-patterns': 'Design Patterns',
    'performance-patterns': 'Performance',
    'rendering-patterns': 'Rendering Patterns',
    security: 'Security',
    system_design: 'System Design',
  };

  return techMapping[technologyDir] || 'General';
}

// Function to determine topic from filename
function getTopicFromFilename(filename, technology) {
  const baseName = filename.replace('.json', '');

  // Map filenames to topics based on technology
  const topicMappings = {
    HTML: {
      '1-25QA': 'HTML Basics',
      '26-50QA': 'HTML5',
      '51-75QA': 'Semantic HTML',
      '76–100QA': 'Forms',
    },
    CSS: {
      '1-25QA': 'CSS Basics',
      '26-50QA': 'Layout',
      '51-75QA': 'Responsive Design',
      '76–100QA': 'CSS Grid',
    },
    JavaScript: {
      '1-25QA': 'JavaScript Basics',
      '26-50QA': 'ES6+',
      '51-75QA': 'DOM Manipulation',
      '76–100QA': 'Async Programming',
    },
    React: {
      '1-25QA': 'React Basics',
      '26-50QA': 'Components',
      '51-75QA': 'Hooks',
      '76–100QA': 'State Management',
      '101-151QA': 'Performance',
      '152-200QA': 'React Basics',
      '201-251QA': 'Components',
      '252-306QA': 'Hooks',
    },
    'Next.js': {
      'next1-20': 'Next.js Basics',
      'next-21-40': 'Routing',
      'next41-60': 'API Routes',
      'next-61-80': 'SSR/SSG',
    },
    'Design Patterns': {
      'common-pattern': 'Common Patterns',
      'factory-pattern': 'Factory Pattern',
      'observer-pattern': 'Observer Pattern',
      'singleton-pattern': 'Singleton Pattern',
      'module-pattern': 'Module Pattern',
    },
    Performance: {
      'bundle-splitting': 'Bundle Optimization',
      'code-splitting': 'Code Splitting',
      'lazy-loading': 'Lazy Loading',
      caching: 'Caching',
    },
    'Rendering Patterns': {
      rendering: 'Server Side Rendering',
      'rendering-2': 'Static Site Generation',
      'rendering-4': 'Client Side Rendering',
      'island-archeticure': 'Island Architecture',
    },
    Security: {
      'sec-01': 'Authentication',
      'sec-02': 'Authorization',
      'sec-03': 'Data Protection',
      'sec-04': 'XSS Prevention',
    },
    'System Design': {
      'questions-system-design': 'Scalability',
    },
  };

  const techMappings = topicMappings[technology];
  if (techMappings && techMappings[baseName]) {
    return techMappings[baseName];
  }

  // Default fallback
  return `${technology} Basics`;
}

// Function to map question to Supabase schema
function mapQuestionToSchema(question, technology, topic, categoryId) {
  const questionId = uuidv4();

  return {
    id: questionId,
    title: question.question || question.title || 'Untitled Question',
    content: question.question || question.content || '',
    type: 'multiple-choice',
    difficulty: question.difficulty || 'intermediate',
    points: question.points || 2,
    options: question.options || null,
    correct_answer: question.correct_answer || question.answer || null,
    explanation: question.explanation || question.solution || '',
    test_cases: null,
    hints: question.hints || null,
    tags: question.tags || [technology.toLowerCase(), topic.toLowerCase()],
    stats: JSON.stringify({
      views: 0,
      attempts: 0,
      correct_attempts: 0,
      average_time: 0,
    }),
    metadata: JSON.stringify({
      original_id: question.id || questionId,
      original_type: question.type || 'multiple-choice',
      topic: topic,
      subcategory: question.subcategory || '',
      sample_answers: question.sample_answers || [],
      time_limit: question.time_limit || 120,
      related_links: question.related_links || [],
      created_by: 'system',
      updated_by: 'system',
      technology: technology,
    }),
    category_id: categoryId,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

// Function to load questions from JSON files
function loadQuestionsFromFiles() {
  const dataDir = path.join(__dirname, '../apps/admin/network/data/json');
  const questions = [];

  console.log('🔍 Scanning for question files...');

  // Recursively find all JSON files
  function findJsonFiles(dir) {
    const files = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...findJsonFiles(fullPath));
      } else if (item.endsWith('.json')) {
        files.push(fullPath);
      }
    }

    return files;
  }

  const jsonFiles = findJsonFiles(dataDir);
  console.log(`📁 Found ${jsonFiles.length} JSON files`);

  for (const filePath of jsonFiles) {
    try {
      const technology = getTechnologyFromPath(filePath);
      const filename = path.basename(filePath);
      const topic = getTopicFromFilename(filename, technology);
      const categoryId = categoryMap[technology];

      if (!categoryId) {
        console.log(`⚠️  No category mapping for technology: ${technology}`);
        continue;
      }

      const fileContent = fs.readFileSync(filePath, 'utf8');
      const fileData = JSON.parse(fileContent);

      // Handle different JSON structures
      let questionArray = [];
      if (Array.isArray(fileData)) {
        questionArray = fileData;
      } else if (fileData.questions && Array.isArray(fileData.questions)) {
        questionArray = fileData.questions;
      } else if (fileData.data && Array.isArray(fileData.data)) {
        questionArray = fileData.data;
      } else {
        console.log(`⚠️  Unknown JSON structure in ${filePath}`);
        continue;
      }

      console.log(`📄 ${filename}: ${questionArray.length} questions`);

      for (const question of questionArray) {
        const mappedQuestion = mapQuestionToSchema(
          question,
          technology,
          topic,
          categoryId
        );
        questions.push(mappedQuestion);
      }
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  }

  return questions;
}

// Main function
async function main() {
  console.log('🌱 Starting Legitimate Questions Seeding with MCP...');

  try {
    // Load all questions
    const questions = loadQuestionsFromFiles();
    console.log(`📊 Total questions loaded: ${questions.length}`);

    if (questions.length === 0) {
      console.log('❌ No questions found to seed');
      return;
    }

    // Group questions by technology for better organization
    const questionsByTech = {};
    for (const question of questions) {
      const tech = question.metadata
        ? JSON.parse(question.metadata).technology
        : 'General';
      if (!questionsByTech[tech]) {
        questionsByTech[tech] = [];
      }
      questionsByTech[tech].push(question);
    }

    console.log('\n📋 Questions by Technology:');
    for (const [tech, techQuestions] of Object.entries(questionsByTech)) {
      console.log(`  ${tech}: ${techQuestions.length} questions`);
    }

    // Generate SQL for manual execution
    const sqlFile = path.join(__dirname, 'legitimate-questions-seed.sql');
    let sqlContent = '-- Legitimate Questions Seeding SQL\n';
    sqlContent +=
      '-- Generated for manual execution in Supabase SQL Editor\n\n';

    // Clear existing questions first
    sqlContent += '-- Clear existing questions\n';
    sqlContent += 'DELETE FROM questions;\n\n';

    // Insert questions in batches
    const batchSize = 50;
    let batchNumber = 1;

    for (let i = 0; i < questions.length; i += batchSize) {
      const batch = questions.slice(i, i + batchSize);

      sqlContent += `-- Batch ${batchNumber}: Questions ${i + 1}-${Math.min(i + batchSize, questions.length)}\n`;
      sqlContent +=
        'INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES\n';

      const values = batch.map(q => {
        const options = q.options
          ? `'${JSON.stringify(q.options).replace(/'/g, "''")}'`
          : 'NULL';
        const correctAnswer = q.correct_answer
          ? `'${q.correct_answer.replace(/'/g, "''")}'`
          : 'NULL';
        const explanation = q.explanation
          ? `'${q.explanation.replace(/'/g, "''")}'`
          : 'NULL';
        const hints = q.hints
          ? `'${JSON.stringify(q.hints).replace(/'/g, "''")}'`
          : 'ARRAY[]::text[]';
        const tags =
          q.tags && q.tags.length > 0
            ? `ARRAY[${q.tags.map(tag => `'${tag.replace(/'/g, "''")}'`).join(',')}]`
            : 'ARRAY[]::text[]';
        const stats = q.stats
          ? `'${q.stats.replace(/'/g, "''")}'`
          : '\'{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}\'';
        const metadata = q.metadata
          ? `'${q.metadata.replace(/'/g, "''")}'`
          : "'{}'";

        return `('${q.id}', '${(q.title || '').replace(/'/g, "''")}', '${(q.content || '').replace(/'/g, "''")}', '${q.type}', '${q.difficulty}', ${q.points}, ${options}, ${correctAnswer}, ${explanation}, NULL, ${hints}, ${tags}, ${stats}, ${metadata}, '${q.category_id}', ${q.is_active}, '${q.created_at}', '${q.updated_at}')`;
      });

      sqlContent += values.join(',\n') + ';\n\n';
      batchNumber++;
    }

    // Write SQL file
    fs.writeFileSync(sqlFile, sqlContent);
    console.log(`✅ SQL file generated: ${sqlFile}`);
    console.log(`📊 Total questions prepared: ${questions.length}`);
    console.log(`📦 Total batches: ${batchNumber - 1}`);

    console.log('\n🎉 Legitimate Questions Seeding Preparation Completed!');
    console.log('\n📋 Next Steps:');
    console.log('1. Execute the generated SQL file in Supabase SQL Editor');
    console.log('2. Verify the questions are properly seeded');
    console.log('3. Test the admin questions page');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  }
}

// Run the script
main();
