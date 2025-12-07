const fs = require('fs');
const path = require('path');

/**
 * Fix learningCardId values to match the card structure:
 * - Core Technologies: HTML, CSS, JavaScript → 'core-technologies'
 * - Framework Questions: React, Next.js, Design Patterns → 'framework-questions'
 * - System Design: System Design, Performance Patterns, Rendering Patterns, Security → 'system-design'
 * - Problem Solving: Problem Solving → 'problem-solving'
 * - Frontend Tasks: Frontend Tasks → 'frontend-tasks' (or 'framework-questions' if no separate card)
 */

const cardMapping = {
  HTML: 'core-technologies',
  CSS: 'core-technologies',
  JavaScript: 'core-technologies',
  React: 'framework-questions',
  'Next.js': 'framework-questions',
  'Design Patterns': 'framework-questions', // Based on cardType in categories file
  'Performance Patterns': 'system-design',
  'Rendering Patterns': 'system-design',
  Security: 'system-design',
  'System Design': 'system-design',
  'Frontend Tasks': 'frontend-tasks', // New card type
  'Problem Solving': 'problem-solving',
};

const fileMapping = {
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
  'problem-solving-questions.json': 'Problem Solving',
};

console.log('🔄 Fixing learningCardId values...\n');

let totalUpdated = 0;

Object.entries(fileMapping).forEach(([fileName, category]) => {
  const filePath = path.join(__dirname, '../final-questions-v01', fileName);
  const expectedCardId = cardMapping[category];

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${fileName}`);
    return;
  }

  try {
    const questions = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let updated = 0;

    questions.forEach(q => {
      if (q.learningCardId !== expectedCardId) {
        q.learningCardId = expectedCardId;
        q.updatedAt = new Date().toISOString();
        updated++;
      }
    });

    if (updated > 0) {
      fs.writeFileSync(filePath, JSON.stringify(questions, null, 2));
      console.log(
        `✅ ${category.padEnd(25)} → ${expectedCardId.padEnd(25)} (${updated} questions updated)`
      );
      totalUpdated += updated;
    } else {
      console.log(
        `✓  ${category.padEnd(25)} → ${expectedCardId.padEnd(25)} (already correct)`
      );
    }
  } catch (error) {
    console.log(`❌ Error processing ${fileName}: ${error.message}`);
  }
});

console.log(`\n✅ Total questions updated: ${totalUpdated}`);
console.log('\n📋 Card Structure Summary:');
console.log('  core-technologies: HTML, CSS, JavaScript');
console.log('  framework-questions: React, Next.js, Design Patterns');
console.log(
  '  system-design: System Design, Performance Patterns, Rendering Patterns, Security'
);
console.log('  frontend-tasks: Frontend Tasks');
console.log('  problem-solving: Problem Solving');
