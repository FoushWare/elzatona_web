#!/usr/bin/env node

/**
 * Advanced Question Importer
 * 
 * Enhanced question import with better parsing, validation, and error handling
 * Supports multiple formats with intelligent question type detection
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
const QUESTIONS_BANK_DIR = path.join(process.cwd(), 'QuestionsBank');

// Enhanced category mapping
const CATEGORY_MAPPING = {
  'frontend-basics': 'HTML & CSS',
  'javascript-deep-dive': 'JavaScript (Core)',
  'react-mastery': 'React.js (Core)',
  'typescript-essentials': 'TypeScript (Core)',
  'advanced-css': 'CSS & Styling',
  'deployment-devops': 'Deployment & DevOps',
  'api-design': 'API Design',
  'web-performance': 'Web Performance',
  'testing-strategies': 'Testing Strategies',
  'security': 'Security',
  'system-design': 'System Design',
  'accessibility': 'Accessibility',
  'english-learning': 'English Learning',
  'git-version-control': 'Git & Version Control',
  'build-tools': 'Build Tools'
};

// Topic mapping for better organization
const TOPIC_MAPPING = {
  'frontend-basics': ['HTML Fundamentals', 'CSS Basics', 'DOM Manipulation'],
  'javascript-deep-dive': ['Hoisting', 'Closures', 'Event Loop', 'Promises', 'Async/Await'],
  'react-mastery': ['React Hooks', 'State Management', 'Component Lifecycle', 'JSX'],
  'typescript-essentials': ['Types', 'Interfaces', 'Generics', 'Decorators'],
  'advanced-css': ['CSS Grid', 'Flexbox', 'CSS Variables', 'Animations'],
  'deployment-devops': ['Docker', 'CI/CD', 'AWS', 'Build Tools'],
  'api-design': ['REST APIs', 'GraphQL', 'Authentication', 'Rate Limiting'],
  'web-performance': ['Core Web Vitals', 'Optimization', 'Caching', 'Bundle Size'],
  'testing-strategies': ['Unit Testing', 'Integration Testing', 'E2E Testing', 'TDD'],
  'security': ['XSS', 'CSRF', 'Authentication', 'Authorization'],
  'system-design': ['Scalability', 'Load Balancing', 'Database Design', 'Microservices'],
  'accessibility': ['WCAG', 'ARIA', 'Screen Readers', 'Keyboard Navigation'],
  'english-learning': ['Technical Writing', 'Communication', 'Interview Skills'],
  'git-version-control': ['Git Commands', 'Branching', 'Merging', 'Collaboration'],
  'build-tools': ['Webpack', 'Vite', 'Babel', 'ESLint']
};

// Enhanced markdown parser
function parseMarkdownQuestions(filePath, category) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const questions = [];
    
    // More flexible question splitting
    const questionBlocks = content.split(/(?=## Question \d+:|### Question \d+:|## \d+\.|### \d+\.)/i);
    questionBlocks.shift(); // Remove first empty section
    
    questionBlocks.forEach((block, index) => {
      if (!block.trim()) return;
      
      const lines = block.trim().split('\n');
      const firstLine = lines[0]?.trim() || '';
      
      // Extract question number and title
      const titleMatch = firstLine.match(/(?:Question \d+:|Question \d+|Question:|#+\s*\d+\.?)\s*(.+)/i);
      const title = titleMatch ? titleMatch[1].trim() : `Question ${index + 1}`;
      
      // Parse the question content
      let questionContent = '';
      let answerContent = '';
      let explanation = '';
      let options = [];
      let correctAnswer = null;
      let inAnswer = false;
      let inExplanation = false;
      let hasCodeBlock = false;
      let codeBlock = '';
      let difficulty = 'intermediate';
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line.startsWith('**Answer:**') || line.startsWith('**Correct Answer:**')) {
          inAnswer = true;
          inExplanation = false;
          answerContent = line.replace(/\*\*(Answer|Correct Answer):\*\*/i, '').trim();
        } else if (line.startsWith('**Explanation:**') || line.startsWith('**Why:**')) {
          inExplanation = true;
          inAnswer = false;
          explanation = line.replace(/\*\*(Explanation|Why):\*\*/i, '').trim();
        } else if (line.startsWith('**Question:**') || line.startsWith('**Q:**')) {
          inAnswer = false;
          inExplanation = false;
          questionContent = line.replace(/\*\*(Question|Q):\*\*/i, '').trim();
        } else if (line.startsWith('**Difficulty:**') || line.startsWith('**Level:**')) {
          const diffMatch = line.match(/(easy|medium|hard|beginner|intermediate|advanced)/i);
          if (diffMatch) {
            difficulty = diffMatch[1].toLowerCase();
            if (difficulty === 'easy') difficulty = 'beginner';
            if (difficulty === 'medium') difficulty = 'intermediate';
            if (difficulty === 'hard') difficulty = 'advanced';
          }
        } else if (line.startsWith('```')) {
          hasCodeBlock = true;
          if (codeBlock === '') {
            const codeStart = i + 1;
            const codeEnd = lines.findIndex((l, idx) => idx > codeStart && l.startsWith('```'));
            if (codeEnd !== -1) {
              codeBlock = lines.slice(codeStart, codeEnd).join('\n');
            }
          }
        } else if (line.startsWith('---')) {
          // End of question
          break;
        } else if (inExplanation) {
          explanation += '\n' + line;
        } else if (inAnswer) {
          answerContent += '\n' + line;
        } else if (!inAnswer && !inExplanation && line && !line.startsWith('**')) {
          questionContent += '\n' + line;
        }
      }
      
      // Extract multiple choice options
      const optionLines = lines.filter(line => 
        /^[A-D]\)\s/.test(line) || 
        /^[a-d]\)\s/.test(line) ||
        /^[1-4]\.\s/.test(line) ||
        /^[-*]\s/.test(line)
      );
      
      if (optionLines.length >= 2) {
        options = optionLines.map(line => 
          line.replace(/^[A-Da-d]\)\s|^[1-4]\.\s|^[-*]\s/, '').trim()
        );
        
        // Find correct answer
        const answerMatch = answerContent.match(/^[A-Da-d]\)/);
        if (answerMatch) {
          const answerLetter = answerMatch[0].replace(')', '').toUpperCase();
          correctAnswer = answerLetter.charCodeAt(0) - 65; // A=0, B=1, C=2, D=3
        }
      }
      
      // Determine question type
      let questionType = 'conceptual';
      if (hasCodeBlock) {
        questionType = 'code';
      } else if (options.length >= 2) {
        questionType = 'multiple';
      } else if (questionContent.toLowerCase().includes('explain') || 
                 questionContent.toLowerCase().includes('describe') ||
                 questionContent.toLowerCase().includes('what is') ||
                 questionContent.toLowerCase().includes('how does')) {
        questionType = 'conceptual';
      }
      
      if (questionContent.trim() && (answerContent.trim() || explanation.trim())) {
        questions.push({
          id: `imported-${category}-${Date.now()}-${index}`,
          title: title,
          content: questionContent.trim(),
          type: questionType,
          options: options,
          correctAnswer: correctAnswer,
          explanation: explanation.trim() || answerContent.trim(),
          difficulty: difficulty,
          category: CATEGORY_MAPPING[category] || category,
          topics: TOPIC_MAPPING[category] || [category],
          learningPaths: [category],
          source: 'QuestionsBank',
          importedAt: new Date().toISOString(),
          codeBlock: hasCodeBlock ? codeBlock : null
        });
      }
    });
    
    return questions;
  } catch (error) {
    console.error(`Error parsing markdown file ${filePath}:`, error.message);
    return [];
  }
}

// Enhanced JSON parser
function parseJsonQuestions(filePath, category) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);
    
    let questions = [];
    
    if (data.questions && Array.isArray(data.questions)) {
      questions = data.questions;
    } else if (Array.isArray(data)) {
      questions = data;
    }
    
    return questions.map((q, index) => ({
      id: q.id || `imported-${category}-${Date.now()}-${index}`,
      title: q.question || q.title || `Question ${index + 1}`,
      content: q.question || q.content || '',
      type: q.type || (q.options ? 'multiple' : 'conceptual'),
      options: q.options || [],
      correctAnswer: q.correctAnswer,
      explanation: q.explanation || q.answer || '',
      difficulty: q.difficulty || 'intermediate',
      category: CATEGORY_MAPPING[q.category] || CATEGORY_MAPPING[category] || category,
      topics: TOPIC_MAPPING[category] || [category],
      learningPaths: [category],
      source: 'QuestionsBank',
      importedAt: new Date().toISOString()
    }));
  } catch (error) {
    console.error(`Error parsing JSON file ${filePath}:`, error.message);
    return [];
  }
}

// Validate question before import
function validateQuestion(question) {
  const errors = [];
  
  if (!question.title || question.title.trim().length === 0) {
    errors.push('Title is required');
  }
  
  if (!question.content || question.content.trim().length === 0) {
    errors.push('Content is required');
  }
  
  if (!question.explanation || question.explanation.trim().length === 0) {
    errors.push('Explanation is required');
  }
  
  if (question.type === 'multiple' && (!question.options || question.options.length < 2)) {
    errors.push('Multiple choice questions must have at least 2 options');
  }
  
  if (question.type === 'multiple' && (question.correctAnswer === null || question.correctAnswer === undefined)) {
    errors.push('Multiple choice questions must have a correct answer');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

// Import questions with validation
async function importQuestions(questions, category) {
  if (questions.length === 0) {
    console.log(`No questions to import for ${category}`);
    return { success: 0, errors: [] };
  }
  
  console.log(`\n📤 Importing ${questions.length} questions for ${category}...`);
  
  // Validate questions
  const validQuestions = [];
  const validationErrors = [];
  
  questions.forEach((question, index) => {
    const validation = validateQuestion(question);
    if (validation.isValid) {
      validQuestions.push(question);
    } else {
      validationErrors.push({
        index: index,
        id: question.id,
        errors: validation.errors
      });
    }
  });
  
  if (validationErrors.length > 0) {
    console.log(`⚠️  ${validationErrors.length} questions failed validation:`);
    validationErrors.forEach(error => {
      console.log(`   - ${error.id}: ${error.errors.join(', ')}`);
    });
  }
  
  if (validQuestions.length === 0) {
    console.log('❌ No valid questions to import');
    return { success: 0, errors: validationErrors };
  }
  
  try {
    const response = await fetch(`${BASE_URL}/api/questions/unified`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bulk: true,
        questions: validQuestions
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log(`✅ Successfully imported ${result.data.success} questions`);
    
    return {
      success: result.data.success,
      errors: [...validationErrors, ...(result.data.errors || [])]
    };
  } catch (error) {
    console.error('❌ Error importing questions:', error.message);
    return { success: 0, errors: [{ error: error.message }] };
  }
}

// Main import function
async function importAllQuestions() {
  console.log('🚀 Starting Advanced Question Import Process...\n');
  
  if (!fs.existsSync(QUESTIONS_BANK_DIR)) {
    console.error('❌ QuestionsBank directory not found!');
    return;
  }
  
  const categories = fs.readdirSync(QUESTIONS_BANK_DIR);
  const importStats = {
    total: 0,
    successful: 0,
    failed: 0,
    categories: {},
    errors: []
  };
  
  console.log(`📁 Found ${categories.length} categories to process\n`);
  
  // Process each category
  for (const category of categories) {
    if (category.startsWith('.')) continue;
    
    const categoryPath = path.join(QUESTIONS_BANK_DIR, category);
    
    if (!fs.statSync(categoryPath).isDirectory()) continue;
    
    console.log(`📂 Processing category: ${category}`);
    
    const files = fs.readdirSync(categoryPath);
    const questionFiles = files.filter(file => 
      file.endsWith('.md') || file.endsWith('.json')
    );
    
    let categoryQuestions = [];
    
    for (const file of questionFiles) {
      const filePath = path.join(categoryPath, file);
      const ext = path.extname(file).toLowerCase();
      
      let questions = [];
      
      if (ext === '.md') {
        questions = parseMarkdownQuestions(filePath, category);
      } else if (ext === '.json') {
        questions = parseJsonQuestions(filePath, category);
      }
      
      categoryQuestions.push(...questions);
      console.log(`   ✅ ${file}: ${questions.length} questions`);
    }
    
    if (categoryQuestions.length > 0) {
      const result = await importQuestions(categoryQuestions, category);
      
      importStats.categories[category] = {
        total: categoryQuestions.length,
        successful: result.success,
        failed: result.errors.length
      };
      
      importStats.total += categoryQuestions.length;
      importStats.successful += result.success;
      importStats.failed += result.errors.length;
      importStats.errors.push(...result.errors);
      
      console.log(`   📊 Category ${category}: ${result.success}/${categoryQuestions.length} imported\n`);
    } else {
      console.log(`   ⚠️  No questions found in ${category}\n`);
    }
  }
  
  // Print final statistics
  console.log('📊 IMPORT SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total questions processed: ${importStats.total}`);
  console.log(`Successfully imported: ${importStats.successful}`);
  console.log(`Failed to import: ${importStats.failed}`);
  console.log(`Success rate: ${((importStats.successful / importStats.total) * 100).toFixed(1)}%`);
  
  console.log('\n📋 PER CATEGORY BREAKDOWN:');
  Object.entries(importStats.categories).forEach(([category, stats]) => {
    console.log(`${category}: ${stats.successful}/${stats.total} (${((stats.successful / stats.total) * 100).toFixed(1)}%)`);
  });
  
  // Save detailed import report
  const importReport = {
    timestamp: new Date().toISOString(),
    stats: importStats,
    categories: Object.keys(importStats.categories),
    errors: importStats.errors
  };
  
  fs.writeFileSync(
    path.join(process.cwd(), 'advanced-question-import-report.json'),
    JSON.stringify(importReport, null, 2)
  );
  
  console.log('\n💾 Detailed import report saved to: advanced-question-import-report.json');
  console.log('\n✅ Advanced import process completed!');
}

// Run the import
if (require.main === module) {
  importAllQuestions().catch(error => {
    console.error('❌ Import process failed:', error);
    process.exit(1);
  });
}

module.exports = { importAllQuestions, parseMarkdownQuestions, parseJsonQuestions, validateQuestion };
