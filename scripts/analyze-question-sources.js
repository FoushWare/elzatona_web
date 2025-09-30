#!/usr/bin/env node

/**
 * Question Sources Analysis Script
 * 
 * Analyzes all question sources in QuestionsBank directory to understand:
 * - Different question formats (MD, JSON, TXT)
 * - Question structures and patterns
 * - Categories and topics covered
 * - Total question count estimation
 */

const fs = require('fs');
const path = require('path');

const QUESTIONS_BANK_DIR = path.join(process.cwd(), 'QuestionsBank');

// Question format analysis
const formatAnalysis = {
  markdown: { count: 0, files: [], totalQuestions: 0 },
  json: { count: 0, files: [], totalQuestions: 0 },
  txt: { count: 0, files: [], totalQuestions: 0 }
};

// Category analysis
const categoryAnalysis = new Map();

// Question type analysis
const questionTypeAnalysis = {
  multipleChoice: 0,
  openEnded: 0,
  codeBased: 0,
  conceptual: 0
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
        } else if (inAnswer) {
          answerContent += '\n' + line;
        } else if (!inAnswer && line.trim() && !line.startsWith('---')) {
          questionContent += '\n' + line;
        }
      }
      
      if (questionContent.trim() && answerContent.trim()) {
        questions.push({
          id: `md-${category}-${index + 1}`,
          title,
          content: questionContent.trim(),
          answer: answerContent.trim(),
          hasCodeBlock,
          type: hasCodeBlock ? 'code-based' : 'conceptual',
          category,
          difficulty: 'intermediate'
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
        id: q.id || `json-${category}-${index + 1}`,
        title: q.question || q.title || `Question ${index + 1}`,
        content: q.question || q.content || '',
        answer: q.explanation || q.answer || '',
        options: q.options || [],
        correctAnswer: q.correctAnswer,
        type: q.options ? 'multiple-choice' : 'conceptual',
        category: q.category || category,
        difficulty: q.difficulty || 'intermediate',
        tags: q.tags || []
      }));
    }
    
    return [];
  } catch (error) {
    console.error(`Error parsing JSON file ${filePath}:`, error.message);
    return [];
  }
}

// Parse text questions
function parseTextQuestions(filePath, category) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const questions = [];
    
    // Simple text parsing - split by double newlines or question numbers
    const questionBlocks = content.split(/\n\s*\n/);
    
    questionBlocks.forEach((block, index) => {
      if (!block.trim()) return;
      
      const lines = block.trim().split('\n');
      const firstLine = lines[0];
      
      // Check if it looks like a question
      if (firstLine.includes('?') || firstLine.includes('Question') || firstLine.match(/^\d+\./)) {
        questions.push({
          id: `txt-${category}-${index + 1}`,
          title: firstLine,
          content: block.trim(),
          answer: '',
          type: 'open-ended',
          category,
          difficulty: 'intermediate'
        });
      }
    });
    
    return questions;
  } catch (error) {
    console.error(`Error parsing text file ${filePath}:`, error.message);
    return [];
  }
}

// Analyze a single file
function analyzeFile(filePath, category) {
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);
  
  let questions = [];
  
  switch (ext) {
    case '.md':
      formatAnalysis.markdown.count++;
      formatAnalysis.markdown.files.push(filePath);
      questions = parseMarkdownQuestions(filePath, category);
      formatAnalysis.markdown.totalQuestions += questions.length;
      break;
      
    case '.json':
      formatAnalysis.json.count++;
      formatAnalysis.json.files.push(filePath);
      questions = parseJsonQuestions(filePath, category);
      formatAnalysis.json.totalQuestions += questions.length;
      break;
      
    case '.txt':
      formatAnalysis.txt.count++;
      formatAnalysis.txt.files.push(filePath);
      questions = parseTextQuestions(filePath, category);
      formatAnalysis.txt.totalQuestions += questions.length;
      break;
  }
  
  // Analyze questions
  questions.forEach(q => {
    // Category analysis
    if (!categoryAnalysis.has(q.category)) {
      categoryAnalysis.set(q.category, { count: 0, questions: [] });
    }
    categoryAnalysis.get(q.category).count++;
    categoryAnalysis.get(q.category).questions.push(q);
    
    // Question type analysis
    if (q.type === 'multiple-choice') {
      questionTypeAnalysis.multipleChoice++;
    } else if (q.type === 'open-ended') {
      questionTypeAnalysis.openEnded++;
    } else if (q.type === 'code-based') {
      questionTypeAnalysis.codeBased++;
    } else if (q.type === 'conceptual') {
      questionTypeAnalysis.conceptual++;
    }
  });
  
  return questions;
}

// Main analysis function
function analyzeQuestionSources() {
  console.log('🔍 Analyzing Question Sources...\n');
  
  if (!fs.existsSync(QUESTIONS_BANK_DIR)) {
    console.error('❌ QuestionsBank directory not found!');
    return;
  }
  
  const categories = fs.readdirSync(QUESTIONS_BANK_DIR);
  const allQuestions = [];
  
  console.log('📁 Found categories:', categories.length);
  console.log('Categories:', categories.join(', '));
  console.log('\n' + '='.repeat(60) + '\n');
  
  // Analyze each category
  categories.forEach(category => {
    const categoryPath = path.join(QUESTIONS_BANK_DIR, category);
    
    if (!fs.statSync(categoryPath).isDirectory()) return;
    
    console.log(`📂 Analyzing category: ${category}`);
    
    const files = fs.readdirSync(categoryPath);
    const questionFiles = files.filter(file => 
      file.endsWith('.md') || file.endsWith('.json') || file.endsWith('.txt')
    );
    
    console.log(`   Found ${questionFiles.length} question files:`, questionFiles.join(', '));
    
    questionFiles.forEach(file => {
      const filePath = path.join(categoryPath, file);
      const questions = analyzeFile(filePath, category);
      allQuestions.push(...questions);
      console.log(`   ✅ ${file}: ${questions.length} questions`);
    });
    
    console.log('');
  });
  
  // Generate report
  console.log('📊 ANALYSIS REPORT');
  console.log('='.repeat(60));
  
  console.log('\n📈 FORMAT BREAKDOWN:');
  console.log(`Markdown files: ${formatAnalysis.markdown.count} (${formatAnalysis.markdown.totalQuestions} questions)`);
  console.log(`JSON files: ${formatAnalysis.json.count} (${formatAnalysis.json.totalQuestions} questions)`);
  console.log(`Text files: ${formatAnalysis.txt.count} (${formatAnalysis.txt.totalQuestions} questions)`);
  
  console.log('\n📚 CATEGORY BREAKDOWN:');
  const sortedCategories = Array.from(categoryAnalysis.entries())
    .sort((a, b) => b[1].count - a[1].count);
  
  sortedCategories.forEach(([category, data]) => {
    console.log(`${category}: ${data.count} questions`);
  });
  
  console.log('\n🎯 QUESTION TYPE BREAKDOWN:');
  console.log(`Multiple Choice: ${questionTypeAnalysis.multipleChoice}`);
  console.log(`Open Ended: ${questionTypeAnalysis.openEnded}`);
  console.log(`Code Based: ${questionTypeAnalysis.codeBased}`);
  console.log(`Conceptual: ${questionTypeAnalysis.conceptual}`);
  
  console.log('\n📊 TOTAL SUMMARY:');
  console.log(`Total Questions: ${allQuestions.length}`);
  console.log(`Total Categories: ${categoryAnalysis.size}`);
  console.log(`Total Files: ${formatAnalysis.markdown.count + formatAnalysis.json.count + formatAnalysis.txt.count}`);
  
  // Save detailed analysis
  const analysisReport = {
    summary: {
      totalQuestions: allQuestions.length,
      totalCategories: categoryAnalysis.size,
      totalFiles: formatAnalysis.markdown.count + formatAnalysis.json.count + formatAnalysis.txt.count
    },
    formatBreakdown: formatAnalysis,
    categoryBreakdown: Object.fromEntries(categoryAnalysis),
    questionTypeBreakdown: questionTypeAnalysis,
    allQuestions: allQuestions.slice(0, 10) // Sample of first 10 questions
  };
  
  fs.writeFileSync(
    path.join(process.cwd(), 'question-sources-analysis.json'),
    JSON.stringify(analysisReport, null, 2)
  );
  
  console.log('\n💾 Detailed analysis saved to: question-sources-analysis.json');
  console.log('\n✅ Analysis complete!');
}

// Run analysis
analyzeQuestionSources();
