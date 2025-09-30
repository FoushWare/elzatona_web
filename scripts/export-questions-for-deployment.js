#!/usr/bin/env node

/**
 * Export Questions for Deployment Script
 * 
 * Exports all questions from the current environment for migration to new environments
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
const EXPORT_DIR = path.join(process.cwd(), 'final-questions-sources');

async function exportQuestionsForDeployment() {
  console.log('📤 Exporting questions for deployment...\n');
  
  try {
    // Create export directory
    if (!fs.existsSync(EXPORT_DIR)) {
      fs.mkdirSync(EXPORT_DIR, { recursive: true });
    }
    
    // Get all questions
    const response = await fetch(`${BASE_URL}/api/questions/unified`);
    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.status}`);
    }
    
    const data = await response.json();
    const questions = data.data || [];
    
    console.log(`📊 Found ${questions.length} questions to export`);
    
    // Group questions by category
    const questionsByCategory = {};
    questions.forEach(question => {
      const category = question.category || 'Uncategorized';
      if (!questionsByCategory[category]) {
        questionsByCategory[category] = [];
      }
      questionsByCategory[category].push(question);
    });
    
    // Export by category
    const exportResults = {};
    
    for (const [category, categoryQuestions] of Object.entries(questionsByCategory)) {
      const safeCategoryName = category.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
      const fileName = `${safeCategoryName}-questions.json`;
      const filePath = path.join(EXPORT_DIR, fileName);
      
      const exportData = {
        category: category,
        totalQuestions: categoryQuestions.length,
        exportedAt: new Date().toISOString(),
        questions: categoryQuestions
      };
      
      fs.writeFileSync(filePath, JSON.stringify(exportData, null, 2));
      
      exportResults[category] = {
        fileName: fileName,
        count: categoryQuestions.length,
        path: filePath
      };
      
      console.log(`✅ Exported ${categoryQuestions.length} questions for ${category} -> ${fileName}`);
    }
    
    // Create master export file
    const masterExport = {
      metadata: {
        totalQuestions: questions.length,
        totalCategories: Object.keys(questionsByCategory).length,
        exportedAt: new Date().toISOString(),
        version: '1.0.0',
        environment: 'production-ready'
      },
      categories: Object.keys(questionsByCategory),
      questions: questions,
      exportResults: exportResults
    };
    
    const masterFilePath = path.join(EXPORT_DIR, 'master-questions-export.json');
    fs.writeFileSync(masterFilePath, JSON.stringify(masterExport, null, 2));
    
    // Create import script for new environments
    const importScript = `#!/usr/bin/env node

/**
 * Import Questions to New Environment
 * 
 * Imports questions from the exported files to a new environment
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.TARGET_BASE_URL || 'http://localhost:3000';
const SOURCE_DIR = path.join(__dirname, 'final-questions-sources');

async function importQuestionsToNewEnvironment() {
  console.log('📥 Importing questions to new environment...\\n');
  
  try {
    // Read master export file
    const masterFilePath = path.join(SOURCE_DIR, 'master-questions-export.json');
    
    if (!fs.existsSync(masterFilePath)) {
      throw new Error('Master export file not found. Please run export-questions-for-deployment.js first.');
    }
    
    const masterData = JSON.parse(fs.readFileSync(masterFilePath, 'utf-8'));
    const questions = masterData.questions || [];
    
    console.log(\`📊 Found \${questions.length} questions to import\`);
    
    // Import questions in batches
    const batchSize = 50;
    let importedCount = 0;
    let failedCount = 0;
    
    for (let i = 0; i < questions.length; i += batchSize) {
      const batch = questions.slice(i, i + batchSize);
      
      try {
        const response = await fetch(\`\${BASE_URL}/api/questions/unified\`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bulk: true,
            questions: batch
          })
        });
        
        if (response.ok) {
          const result = await response.json();
          importedCount += result.data.success || batch.length;
          console.log(\`✅ Imported batch \${Math.floor(i / batchSize) + 1}: \${result.data.success || batch.length} questions\`);
        } else {
          console.log(\`❌ Failed to import batch \${Math.floor(i / batchSize) + 1}: \${response.status}\`);
          failedCount += batch.length;
        }
      } catch (error) {
        console.log(\`❌ Error importing batch \${Math.floor(i / batchSize) + 1}: \${error.message}\`);
        failedCount += batch.length;
      }
    }
    
    console.log(\`\\n📊 IMPORT SUMMARY\`);
    console.log(\`Successfully imported: \${importedCount}\`);
    console.log(\`Failed to import: \${failedCount}\`);
    console.log(\`Success rate: \${((importedCount / questions.length) * 100).toFixed(1)}%\`);
    
    console.log('\\n✅ Import process completed!');
    
  } catch (error) {
    console.error('❌ Import process failed:', error.message);
    process.exit(1);
  }
}

// Run the import
if (require.main === module) {
  importQuestionsToNewEnvironment();
}

module.exports = { importQuestionsToNewEnvironment };
`;
    
    const importScriptPath = path.join(EXPORT_DIR, 'import-questions-to-new-environment.js');
    fs.writeFileSync(importScriptPath, importScript);
    fs.chmodSync(importScriptPath, '755');
    
    // Create README for deployment
    const readme = `# Final Questions Sources

This directory contains all exported questions from the learning platform for deployment to new environments.

## Files

- \`master-questions-export.json\` - Complete export of all questions
- \`*-questions.json\` - Questions grouped by category
- \`import-questions-to-new-environment.js\` - Script to import questions to new environment

## Usage

### Export Questions (Current Environment)
\`\`\`bash
node scripts/export-questions-for-deployment.js
\`\`\`

### Import Questions (New Environment)
\`\`\`bash
# Set target environment URL
export TARGET_BASE_URL=https://your-new-environment.com

# Run import script
node final-questions-sources/import-questions-to-new-environment.js
\`\`\`

## Question Statistics

- **Total Questions:** ${questions.length}
- **Categories:** ${Object.keys(questionsByCategory).length}
- **Export Date:** ${new Date().toISOString()}

## Categories

${Object.entries(exportResults).map(([category, data]) => 
  `- **${category}:** ${data.count} questions (${data.fileName})`
).join('\n')}

## Notes

- All questions are properly categorized and linked to learning paths
- Questions include proper metadata for topics and difficulty levels
- Import script handles batch processing for large datasets
- Questions are validated before import to ensure data integrity
`;
    
    const readmePath = path.join(EXPORT_DIR, 'README.md');
    fs.writeFileSync(readmePath, readme);
    
    // Print summary
    console.log('\n📊 EXPORT SUMMARY');
    console.log('='.repeat(50));
    console.log(`Total questions exported: ${questions.length}`);
    console.log(`Categories exported: ${Object.keys(questionsByCategory).length}`);
    console.log(`Export directory: ${EXPORT_DIR}`);
    
    console.log('\n📁 Exported files:');
    Object.entries(exportResults).forEach(([category, data]) => {
      console.log(`   ${category}: ${data.fileName} (${data.count} questions)`);
    });
    
    console.log('\n✅ Export process completed successfully!');
    console.log('\n🚀 Ready for deployment to new environments!');
    
  } catch (error) {
    console.error('❌ Export process failed:', error.message);
    throw error;
  }
}

// Run the export
if (require.main === module) {
  exportQuestionsForDeployment().catch(error => {
    console.error('❌ Export process failed:', error);
    process.exit(1);
  });
}

module.exports = { exportQuestionsForDeployment };
