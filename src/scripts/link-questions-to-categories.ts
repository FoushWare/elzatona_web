// Script to link questions to categories and topics
import {
  db,
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
} from '../lib/firebase-server';

interface Question {
  id: string;
  title: string;
  content: string;
  category?: string;
  topic?: string;
  [key: string]: any;
}

// Category and topic mapping based on question content analysis
const categoryTopicMapping = {
  'javascript-core': {
    hoisting: [
      'hoist',
      'hoisting',
      'var',
      'let',
      'const',
      'function declaration',
      'variable declaration',
      'temporal dead zone',
      'undefined',
      'reference error',
    ],
    closures: [
      'closure',
      'closures',
      'lexical scope',
      'inner function',
      'outer function',
      'scope chain',
      'private variable',
      'encapsulation',
    ],
    'this-keyword': [
      'this',
      'this keyword',
      'context',
      'binding',
      'call',
      'apply',
      'bind',
      'arrow function',
      'method',
      'object method',
    ],
    prototypes: [
      'prototype',
      'prototypes',
      'inheritance',
      'prototype chain',
      'constructor',
      'new keyword',
      'instance',
      'class',
      'extends',
    ],
    'event-loop': [
      'event loop',
      'asynchronous',
      'callback',
      'setTimeout',
      'setInterval',
      'promise',
      'microtask',
      'macrotask',
      'queue',
      'stack',
    ],
    promises: [
      'promise',
      'promises',
      'async',
      'await',
      'then',
      'catch',
      'finally',
      'resolve',
      'reject',
      'async/await',
      'fetch',
      'axios',
    ],
    'variables-scopes': [
      'scope',
      'scopes',
      'global',
      'local',
      'block scope',
      'function scope',
      'var',
      'let',
      'const',
      'shadowing',
      'scope chain',
    ],
    'execution-context': [
      'execution context',
      'call stack',
      'execution',
      'context',
      'stack',
      'heap',
      'memory',
      'variable environment',
      'lexical environment',
    ],
    'type-coercion': [
      'type coercion',
      'type conversion',
      '==',
      '===',
      'equality',
      'strict equality',
      'loose equality',
      'truthy',
      'falsy',
      'boolean conversion',
    ],
    'error-handling': [
      'error',
      'errors',
      'try',
      'catch',
      'throw',
      'exception',
      'error handling',
      'finally',
      'custom error',
      'error object',
    ],
  },
  html: {
    'semantic-html': [
      'semantic',
      'html5',
      'header',
      'nav',
      'main',
      'section',
      'article',
      'aside',
      'footer',
      'semantic elements',
      'meaningful html',
    ],
    'forms-validation': [
      'form',
      'forms',
      'input',
      'validation',
      'required',
      'pattern',
      'type',
      'submit',
      'reset',
      'form validation',
      'html5 validation',
    ],
    accessibility: [
      'accessibility',
      'aria',
      'screen reader',
      'alt',
      'title',
      'role',
      'tabindex',
      'keyboard',
      'wcag',
      'accessible',
    ],
    'seo-basics': [
      'seo',
      'meta',
      'title',
      'description',
      'keywords',
      'headings',
      'h1',
      'h2',
      'h3',
      'alt text',
      'search engine',
      'optimization',
    ],
  },
  css: {
    'selectors-specificity': [
      'selector',
      'selectors',
      'specificity',
      'css selector',
      'id',
      'class',
      'attribute',
      'pseudo',
      'cascade',
      'inheritance',
    ],
    'box-model': [
      'box model',
      'margin',
      'padding',
      'border',
      'content',
      'width',
      'height',
      'box-sizing',
      'border-box',
      'content-box',
    ],
    flexbox: [
      'flexbox',
      'flex',
      'flex-direction',
      'justify-content',
      'align-items',
      'flex-wrap',
      'flex-grow',
      'flex-shrink',
      'flex-basis',
    ],
    'grid-layout': [
      'grid',
      'css grid',
      'grid-template',
      'grid-area',
      'grid-column',
      'grid-row',
      'fr',
      'repeat',
      'grid gap',
      'grid lines',
    ],
    'responsive-design': [
      'responsive',
      'media query',
      'mobile',
      'tablet',
      'desktop',
      'breakpoint',
      'viewport',
      'mobile-first',
      'responsive design',
    ],
  },
  react: {
    'jsx-rendering': [
      'jsx',
      'rendering',
      'react',
      'component',
      'render',
      'jsx syntax',
      'virtual dom',
      'react element',
      'createElement',
    ],
    components: [
      'component',
      'components',
      'functional component',
      'class component',
      'props',
      'state',
      'react component',
      'component lifecycle',
    ],
    'props-state': [
      'props',
      'state',
      'setState',
      'useState',
      'prop drilling',
      'state management',
      'lifting state',
      'controlled component',
      'uncontrolled component',
    ],
    hooks: [
      'hooks',
      'useState',
      'useEffect',
      'useContext',
      'useReducer',
      'custom hook',
      'useMemo',
      'useCallback',
      'react hooks',
    ],
    'virtual-dom': [
      'virtual dom',
      'reconciliation',
      'diffing',
      'react fiber',
      'render',
      'update',
      'patch',
      'virtual dom tree',
    ],
  },
  performance: {
    'bundle-optimization': [
      'bundle',
      'webpack',
      'optimization',
      'tree shaking',
      'code splitting',
      'lazy loading',
      'bundle size',
      'chunk',
      'module',
    ],
    'code-splitting': [
      'code splitting',
      'lazy loading',
      'dynamic import',
      'chunk',
      'bundle splitting',
      'route-based splitting',
      'component splitting',
    ],
    'web-vitals': [
      'web vitals',
      'lcp',
      'fid',
      'cls',
      'performance',
      'lighthouse',
      'core web vitals',
      'performance metrics',
      'loading performance',
    ],
  },
};

// Function to analyze question content and determine category/topic
function analyzeQuestion(question: Question): {
  category: string;
  topic: string;
} {
  const content = `${question.title} ${question.content}`.toLowerCase();

  // Check each category and topic for keyword matches
  for (const [categoryId, topics] of Object.entries(categoryTopicMapping)) {
    for (const [topicId, keywords] of Object.entries(topics)) {
      const matchCount = keywords.filter(keyword =>
        content.includes(keyword.toLowerCase())
      ).length;

      if (matchCount > 0) {
        return { category: categoryId, topic: topicId };
      }
    }
  }

  // Default fallback
  return { category: 'javascript-core', topic: 'variables-scopes' };
}

// Function to update questions with categories and topics
async function linkQuestionsToCategories() {
  try {
    console.log('🔍 Fetching questions from Firebase...');

    if (!db) {
      throw new Error('Database not initialized');
    }

    // Get all questions from unifiedQuestions collection
    const questionsRef = collection(db, 'unifiedQuestions');
    const snapshot = await getDocs(questionsRef);

    console.log(`📊 Found ${snapshot.docs.length} questions`);

    let updatedCount = 0;
    const categoryStats: { [key: string]: number } = {};
    const topicStats: { [key: string]: number } = {};

    for (const docSnapshot of snapshot.docs) {
      const question = {
        id: docSnapshot.id,
        ...docSnapshot.data(),
      } as Question;

      // Skip if already has category and topic
      if (question.category && question.topic) {
        console.log(
          `⏭️  Skipping question ${question.id} - already categorized`
        );
        continue;
      }

      // Analyze question content
      const { category, topic } = analyzeQuestion(question);

      // Update question in Firebase
      const questionRef = doc(db, 'unifiedQuestions', question.id);
      await updateDoc(questionRef, {
        category,
        topic,
        updatedAt: new Date().toISOString(),
      });

      // Update stats
      categoryStats[category] = (categoryStats[category] || 0) + 1;
      topicStats[topic] = (topicStats[topic] || 0) + 1;
      updatedCount++;

      console.log(
        `✅ Updated question "${question.title}" -> ${category}/${topic}`
      );
    }

    console.log('\n📈 Summary:');
    console.log(`Total questions updated: ${updatedCount}`);
    console.log('\n📊 Category distribution:');
    Object.entries(categoryStats).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} questions`);
    });

    console.log('\n🏷️  Topic distribution:');
    Object.entries(topicStats).forEach(([topic, count]) => {
      console.log(`  ${topic}: ${count} questions`);
    });
  } catch (error) {
    console.error('❌ Error linking questions to categories:', error);
  }
}

// Run the script
if (require.main === module) {
  linkQuestionsToCategories()
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

export { linkQuestionsToCategories };
