const fs = require('fs');
const path = require('path');

/**
 * This script prepares SQL INSERT statements for seeding questions via MCP
 * It normalizes questions and generates SQL that can be executed via mcp_supabase_execute_sql
 */

const PROJECT_ID = 'kiycimlsatwfqxtfprlr';
const BATCH_SIZE = 50;

// Category name mapping
const categoryNameMap = {
  'html-questions.json': 'HTML',
  'css-questions.json': 'CSS',
  'javascript-questions.json': 'JavaScript',
  'react-questions.json': 'React',
  'nextjs-questions.json': 'Next.js',
  'design-patterns-questions.json': 'Design Patterns',
  'performance-patterns-questions.json': 'Performance Patterns',
  'rendering-patterns-questions.json': 'Rendering Patterns',
  'security-questions.json': 'Security',
  'system-design-questions.json': 'System Design',
  'frontend-tasks-questions.json': 'Frontend Tasks',
  'problem-solving-questions.json': 'Problem Solving'
};

// Category IDs (from MCP query)
const categoryIds = {
  'HTML': '3083f50b-8a47-48a0-b100-6172cd184d04',
  'CSS': 'c66e9e94-32e0-4dea-8594-4931251fa59d',
  'JavaScript': 'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
  'React': '1d54dd10-68fe-4ea9-874e-c960930e0402',
  'Next.js': 'b6018602-d9ad-445d-ae97-8d1351b5ed10',
  'Design Patterns': '7384b45b-c779-49c3-b9e9-ef335a7cccfa',
  'Performance Patterns': '85e21817-b2b0-4cd8-8623-8264bdd228d2',
  'Rendering Patterns': 'e66965de-3197-4e60-b774-25958009d094',
  'Security': 'e41ed4a2-738e-487f-8d1e-4e7df90ec478',
  'System Design': '40599335-648e-452f-91c6-36c1bcfd390c',
  'Frontend Tasks': 'a43fb92d-d623-4777-af1f-e1793764eb0f',
  'Problem Solving': 'fb536a4d-ce0f-4e78-93a9-5df27918b4b0'
};

// Topic mapping (simplified - will use first topic in category as fallback)
const topicMap = {
  'HTML': { 'Basics': '096e44e0-d3a5-4263-81ae-afebd3b70833' },
  'CSS': { 'Basics': '18dd4733-a53b-4962-8884-402d4a92b5aa' },
  'JavaScript': { 'Basics': '6640aee8-5a40-4166-8a8f-051f547e3e30' },
  'React': { 'Core React': 'd9e02bfd-4293-42de-a9a8-65eeb7c61e32', 'Miscellaneous': 'f0d3f46a-4b24-4565-b20f-1fa1fd34639a' },
  'Next.js': { 'Basics': 'b39959a9-02c4-461f-9589-583894f1a652' }
};

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeSql(text) {
  if (text === null || text === undefined) return 'NULL';
  return `'${String(text).replace(/'/g, "''").replace(/\\/g, '\\\\')}'`;
}

function normalizeQuestion(question, index, categoryName) {
  // Check if already in standard format
  if (question.id && question.title && question.content !== undefined && question.type) {
    return question;
  }
  
  // Check if in parsed format
  if (question.num !== undefined && question.title) {
    let content = question.explanation || question.title;
    if (question.code) {
      const codeHtml = `<pre><code>${escapeHtml(question.code)}</code></pre>`;
      content = question.explanation ? `${codeHtml}\n\n${question.explanation}` : codeHtml;
    }
    
    let options = null;
    if (question.options && typeof question.options === 'object') {
      if (question.options.A || question.options.B) {
        options = Object.entries(question.options).map(([key, text], idx) => ({
          id: `o${idx + 1}`,
          text: String(text),
          isCorrect: key === question.correctAnswer,
          explanation: ''
        }));
      } else if (Array.isArray(question.options)) {
        options = question.options;
      }
    }
    
    return {
      id: question.id || `${categoryName.toLowerCase().replace(/\s+/g, '-')}-${String(index + 1).padStart(3, '0')}-${question.num || index + 1}`,
      title: question.title,
      content: content || question.title,
      type: options ? 'multiple-choice' : 'open-ended',
      category: categoryName,
      topic: question.topic || question.section || null,
      difficulty: question.difficulty || 'intermediate',
      learningCardId: question.learningCardId || null,
      isActive: question.isActive !== false,
      explanation: question.explanation || '',
      points: question.points || 10,
      options: options,
      hints: question.hints || [],
      tags: question.tags || [categoryName.toLowerCase()],
      metadata: {
        ...(question.metadata || {}),
        source: question.metadata?.source || 'parsed',
        originalNum: question.num || index + 1
      }
    };
  }
  
  // Unknown format - minimal conversion
  return {
    id: question.id || `${categoryName.toLowerCase().replace(/\s+/g, '-')}-${String(index + 1).padStart(3, '0')}`,
    title: question.title || `Question ${index + 1}`,
    content: question.content || question.explanation || question.title || '',
    type: question.type || (question.options ? 'multiple-choice' : 'open-ended'),
    category: categoryName,
    topic: question.topic || null,
    difficulty: question.difficulty || 'intermediate',
    learningCardId: question.learningCardId || null,
    isActive: question.isActive !== false,
    explanation: question.explanation || '',
    points: question.points || 10,
    options: question.options || null,
    hints: question.hints || [],
    tags: question.tags || [categoryName.toLowerCase()],
    metadata: question.metadata || {}
  };
}

function discoverQuestionFiles() {
  const questionsDir = path.join(__dirname, '../final-questions-v01');
  const questionFiles = [];
  const excludeFiles = ['topics.json', 'reference.md'];
  const excludeDirs = ['topics', 'javascript', 'react'];
  
  function scanDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && !excludeDirs.includes(entry.name)) {
        scanDirectory(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('-questions.json') && !excludeFiles.includes(entry.name)) {
        const categoryName = categoryNameMap[entry.name] || entry.name.replace(/-questions\.json$/, '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        questionFiles.push({ categoryName, fileName: entry.name, filePath: fullPath });
      }
    }
  }
  
  scanDirectory(questionsDir);
  return questionFiles;
}

function generateInsertSQL(questions, categoryId, topicId, learningCardId) {
  if (questions.length === 0) return '';
  
  const values = questions.map(q => {
    const now = new Date().toISOString();
    const metadata = JSON.stringify(q.metadata || {});
    const options = q.options ? JSON.stringify(q.options) : null;
    const hints = Array.isArray(q.hints) ? q.hints : (q.hints ? [q.hints] : []);
    const tags = Array.isArray(q.tags) ? q.tags : (q.tags ? [q.tags] : []);
    const difficulty = q.difficulty === 'easy' ? 'beginner' : 
                      q.difficulty === 'medium' ? 'intermediate' :
                      q.difficulty === 'hard' ? 'advanced' :
                      q.difficulty || 'intermediate';
    
    // Get correct answer from options if available
    let correctAnswer = q.answer || q.correctAnswer || '';
    if (q.options && Array.isArray(q.options)) {
      const correctOption = q.options.find(opt => opt.isCorrect);
      if (correctOption) {
        correctAnswer = correctOption.text || correctOption.explanation || '';
      }
    } else if (q.options && typeof q.options === 'object') {
      // Handle object format like { A: 'text', B: 'text' } with correctAnswer: 'A'
      if (q.correctAnswer && q.options[q.correctAnswer]) {
        correctAnswer = q.options[q.correctAnswer];
      }
    }
    
    // Format arrays for PostgreSQL
    const hintsArray = hints.length > 0 
      ? `ARRAY[${hints.map(h => escapeSql(String(h))).join(', ')}]`
      : 'ARRAY[]::text[]';
    const tagsArray = tags.length > 0
      ? `ARRAY[${tags.map(t => escapeSql(String(t))).join(', ')}]`
      : 'ARRAY[]::text[]';
    
    return `(
      gen_random_uuid(),
      ${escapeSql(q.title)},
      ${escapeSql(q.content || q.title)},
      ${escapeSql(q.type || 'open-ended')},
      ${escapeSql(difficulty)},
      ${q.points || 10},
      ${options ? escapeSql(options) : 'NULL'},
      ${escapeSql(correctAnswer)},
      ${escapeSql(q.explanation || '')},
      ${q.test_cases ? escapeSql(JSON.stringify(q.test_cases)) : 'NULL'},
      ${hintsArray},
      ${tagsArray},
      ${escapeSql(metadata)},
      ${q.stats ? escapeSql(JSON.stringify(q.stats)) : 'NULL'},
      ${escapeSql(categoryId)},
      ${learningCardId ? escapeSql(learningCardId) : 'NULL'},
      ${q.isActive !== false},
      ${escapeSql(now)},
      ${escapeSql(now)},
      ${topicId ? escapeSql(topicId) : 'NULL'},
      ${q.time_limit || 300}
    )`;
  }).join(',\n    ');
  
  return `INSERT INTO questions (
    id, title, content, type, difficulty, points, options, correct_answer, 
    explanation, test_cases, hints, tags, metadata, stats, category_id, 
    learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
  ) VALUES ${values};`;
}

async function main() {
  const questionFiles = discoverQuestionFiles();
  console.log(`\n🔍 Discovered ${questionFiles.length} question files\n`);
  
  let totalProcessed = 0;
  const sqlBatches = [];
  
  for (const fileInfo of questionFiles) {
    const { categoryName, fileName, filePath } = fileInfo;
    
    if (!fs.existsSync(filePath)) {
      console.log(`  ⚠️  File not found: ${fileName}`);
      continue;
    }
    
    console.log(`📖 Processing ${categoryName} (${fileName})...`);
    
    try {
      let questions = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      if (!questions || (Array.isArray(questions) && questions.length === 0)) {
        console.log(`  ⚠️  File is empty, skipping...`);
        continue;
      }
      
      if (!Array.isArray(questions)) {
        console.log(`  ⚠️  File does not contain an array, skipping...`);
        continue;
      }
      
      // Normalize questions
      questions = questions.map((q, index) => normalizeQuestion(q, index, categoryName));
      
      const categoryId = categoryIds[categoryName];
      if (!categoryId) {
        console.log(`  ⚠️  Category ID not found: ${categoryName}`);
        continue;
      }
      
      // Get topic ID (simplified - use first topic in category or null)
      let topicId = null;
      if (questions[0]?.topic && topicMap[categoryName]?.[questions[0].topic]) {
        topicId = topicMap[categoryName][questions[0].topic];
      } else if (topicMap[categoryName]) {
        // Use first available topic as fallback
        topicId = Object.values(topicMap[categoryName])[0] || null;
      }
      
      const learningCardId = null; // Will be set to null for now
      
      // Generate SQL in batches
      for (let i = 0; i < questions.length; i += BATCH_SIZE) {
        const batch = questions.slice(i, i + BATCH_SIZE);
        const sql = generateInsertSQL(batch, categoryId, topicId, learningCardId);
        sqlBatches.push({
          category: categoryName,
          batchNum: Math.floor(i / BATCH_SIZE) + 1,
          count: batch.length,
          sql
        });
      }
      
      totalProcessed += questions.length;
      console.log(`  ✅ Processed ${questions.length} questions`);
    } catch (error) {
      console.error(`  ❌ Error processing ${categoryName}:`, error.message);
    }
  }
  
  console.log(`\n📊 Total: ${totalProcessed} questions in ${sqlBatches.length} batches\n`);
  console.log('📝 SQL batches ready for execution via MCP\n');
  console.log('To execute, use mcp_supabase_execute_sql with project_id: kiycimlsatwfqxtfprlr\n');
  
  // Save SQL to file for reference
  const sqlFile = path.join(__dirname, '../seed-questions-mcp.sql');
  const allSQL = sqlBatches.map(b => `-- ${b.category} - Batch ${b.batchNum} (${b.count} questions)\n${b.sql}\n`).join('\n');
  fs.writeFileSync(sqlFile, allSQL, 'utf8');
  console.log(`💾 SQL saved to: ${sqlFile}`);
  console.log(`\n⚠️  Note: Execute SQL batches via MCP tools, not directly in database\n`);
}

main().catch(console.error);

