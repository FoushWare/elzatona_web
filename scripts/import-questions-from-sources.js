#!/usr/bin/env node

/**
 * Question Import Script
 * 
 * Imports questions from QuestionsBank directory into the unified questions system
 * Supports multiple formats: Markdown, JSON, and Text files
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
const QUESTIONS_BANK_DIR = path.join(process.cwd(), 'QuestionsBank');

// Category mapping from QuestionsBank to unified system
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

// Learning path mapping
const LEARNING_PATH_MAPPING = {
  'frontend-basics': 'frontend-basics',
  'javascript-deep-dive': 'javascript-deep-dive',
  'react-mastery': 'react-mastery',
  'typescript-essentials': 'typescript-essentials',
  'advanced-css': 'css-mastery',
  'deployment-devops': 'deployment-devops',
  'api-design': 'api-design',
  'web-performance': 'web-performance',
  'testing-strategies': 'testing-strategies',
  'security': 'security',
  'system-design': 'system-design',
  'accessibility': 'accessibility',
  'english-learning': 'english-learning',
  'git-version-control': 'git-version-control',
  'build-tools': 'deployment-devops'
};

// Parse markdown questions
function parseMarkdownQuestions(filePath, category) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const questions = [];
    
    // Split by question separators
    const questionBlocks = content.split(/^## Question \d+:/m);
    questionBlocks.shift(); // Remove first empty section
    
    questionBlocks.forEach((block, index) => {
      if (!block.trim()) return;
      
      const lines = block.trim().split('\n');
      const title = lines[0]?.trim() || `Question ${index + 1}`;
      
      // Extract question content
      let questionContent = '';
      let answerContent = '';
      let inAnswer = false;
      let hasCodeBlock = false;
      let codeBlock = '';
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('**Answer:**')) {
          inAnswer = true;
          answerContent = line.replace('**Answer:**', '').trim();
        } else if (line.startsWith('**Question:**')) {
          inAnswer = false;
          questionContent = line.replace('**Question:**', '').trim();
        } else if (line.startsWith('```')) {
          hasCodeBlock = true;
          if (codeBlock === '') {
            codeBlock = lines.slice(i + 1).join('\n').split('```')[0];
          }
        } else if (inAnswer) {
          answerContent += '\n' + line;
        } else if (!inAnswer && line.trim() && !line.startsWith('---')) {
          questionContent += '\n' + line;
        }
      }
      
      if (questionContent.trim() && answerContent.trim()) {
        // Determine question type
        let questionType = 'conceptual';
        let options = [];
        let correctAnswer = null;
        
        if (hasCodeBlock) {
          questionType = 'code';
        }
        
        // Check if it's multiple choice (look for A), B), C), D) patterns)
        const optionPattern = /^[A-D]\)\s/;
        const optionLines = lines.filter(line => optionPattern.test(line));
        
        if (optionLines.length >= 2) {
          questionType = 'multiple';
          options = optionLines.map(line => line.replace(/^[A-D]\)\s/, ''));
          
          // Try to find correct answer in the answer section
          const answerMatch = answerContent.match(/^[A-D]\)/);
          if (answerMatch) {
            const answerLetter = answerMatch[0].replace(')', '');
            correctAnswer = answerLetter.charCodeAt(0) - 65; // A=0, B=1, C=2, D=3
          }
        }
        
        questions.push({
          id: `imported-${category}-${Date.now()}-${index}`,
          title: title,
          content: questionContent.trim(),
          type: questionType,
          options: options,
          correctAnswer: correctAnswer,
          explanation: answerContent.trim(),
          difficulty: 'intermediate',
          category: CATEGORY_MAPPING[category] || category,
          topics: [category],
          learningPaths: [LEARNING_PATH_MAPPING[category] || category],
          source: 'QuestionsBank',
          importedAt: new Date().toISOString()
        });
      }
    });
    
    return questions;
  } catch (error) {
    console.error(`Error parsing markdown file ${filePath}:`, error.message);
    return [];
  }
}

// Parse JSON questions
function parseJsonQuestions(filePath, category) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);
    
    if (data.questions && Array.isArray(data.questions)) {
      return data.questions.map((q, index) => ({
        id: q.id || `imported-${category}-${Date.now()}-${index}`,
        title: q.question || q.title || `Question ${index + 1}`,
        content: q.question || q.content || '',
        type: q.options ? 'multiple' : 'conceptual',
        options: q.options || [],
        correctAnswer: q.correctAnswer,
        explanation: q.explanation || q.answer || '',
        difficulty: q.difficulty || 'intermediate',
        category: CATEGORY_MAPPING[q.category] || CATEGORY_MAPPING[category] || category,
        topics: [category],
        learningPaths: [LEARNING_PATH_MAPPING[category] || category],
        source: 'QuestionsBank',
        importedAt: new Date().toISOString()
      }));
    }
    
    return [];
  } catch (error) {
    console.error(`Error parsing JSON file ${filePath}:`, error.message);
    return [];
  }
}

// Import questions to the unified system
async function importQuestions(questions) {
  if (questions.length === 0) {
    console.log('No questions to import');
    return;
  }
  
  console.log(`\n📤 Importing ${questions.length} questions...`);
  
  try {
    const response = await fetch(`${BASE_URL}/api/questions/unified`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bulk: true,
        questions: questions
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log(`✅ Successfully imported ${result.data.success} questions`);
    
    if (result.data.errors && result.data.errors.length > 0) {
      console.log(`⚠️  ${result.data.errors.length} questions failed to import:`);
      result.data.errors.forEach(error => {
        console.log(`   - ${error.id}: ${error.error}`);
      });
    }
    
    return result;
  } catch (error) {
    console.error('❌ Error importing questions:', error.message);
    throw error;
  }
}

// Main import function
async function importAllQuestions() {
  console.log('🚀 Starting Question Import Process...\n');
  
  if (!fs.existsSync(QUESTIONS_BANK_DIR)) {
    console.error('❌ QuestionsBank directory not found!');
    return;
  }
  
  const categories = fs.readdirSync(QUESTIONS_BANK_DIR);
  const allQuestions = [];
  const importStats = {
    total: 0,
    successful: 0,
    failed: 0,
    categories: {}
  };
  
  console.log(`📁 Found ${categories.length} categories to process\n`);
  
  // Process each category
  for (const category of categories) {
    if (category.startsWith('.')) continue; // Skip hidden files
    
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
      try {
        const result = await importQuestions(categoryQuestions);
        allQuestions.push(...categoryQuestions);
        
        importStats.categories[category] = {
          total: categoryQuestions.length,
          successful: result.data.success,
          failed: result.data.errors ? result.data.errors.length : 0
        };
        
        importStats.total += categoryQuestions.length;
        importStats.successful += result.data.success;
        importStats.failed += result.data.errors ? result.data.errors.length : 0;
        
        console.log(`   📊 Category ${category}: ${result.data.success}/${categoryQuestions.length} imported\n`);
      } catch (error) {
        console.error(`   ❌ Failed to import questions for ${category}:`, error.message);
        importStats.categories[category] = {
          total: categoryQuestions.length,
          successful: 0,
          failed: categoryQuestions.length
        };
        importStats.total += categoryQuestions.length;
        importStats.failed += categoryQuestions.length;
      }
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
  
  // Save import report
  const importReport = {
    timestamp: new Date().toISOString(),
    stats: importStats,
    categories: Object.keys(importStats.categories),
    totalQuestions: allQuestions.length
  };
  
  fs.writeFileSync(
    path.join(process.cwd(), 'question-import-report.json'),
    JSON.stringify(importReport, null, 2)
  );
  
  console.log('\n💾 Import report saved to: question-import-report.json');
  console.log('\n✅ Import process completed!');
}

// Run the import
if (require.main === module) {
  importAllQuestions().catch(error => {
    console.error('❌ Import process failed:', error);
    process.exit(1);
  });
}

module.exports = { importAllQuestions, parseMarkdownQuestions, parseJsonQuestions };
