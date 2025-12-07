const fs = require('fs');
const path = require('path');

/**
 * Move frontend task questions from React category to Frontend Tasks category
 */

const reactQuestionsFile = path.join(
  __dirname,
  '../final-questions-v01/react-questions.json'
);
const frontendTasksFile = path.join(
  __dirname,
  '../final-questions-v01/frontend-tasks-questions.json'
);

console.log('🔄 Moving frontend task questions to separate category...\n');

// Read React questions
const reactQuestions = JSON.parse(fs.readFileSync(reactQuestionsFile, 'utf8'));

// Separate frontend task questions
const frontendTaskQuestions = [];
const remainingReactQuestions = [];

reactQuestions.forEach(q => {
  if (q.id.startsWith('react-ft-')) {
    // Update category and topic
    const updated = {
      ...q,
      id: q.id.replace('react-ft-', 'frontend-task-'), // Change ID prefix
      category: 'Frontend Tasks',
      topic: q.topic || 'Frontend Tasks', // Keep topic or set default
      tags: q.tags
        ? q.tags.map(tag => (tag === 'react' ? 'frontend-tasks' : tag))
        : ['frontend-tasks'],
      updatedAt: new Date().toISOString(),
    };
    frontendTaskQuestions.push(updated);
  } else {
    remainingReactQuestions.push(q);
  }
});

console.log(`📊 Found ${frontendTaskQuestions.length} frontend task questions`);
console.log(
  `📊 Remaining React questions: ${remainingReactQuestions.length}\n`
);

// Write updated React questions (without frontend tasks)
fs.writeFileSync(
  reactQuestionsFile,
  JSON.stringify(remainingReactQuestions, null, 2)
);
console.log(`✅ Updated React questions file (removed frontend tasks)\n`);

// Write frontend tasks questions to new file
fs.writeFileSync(
  frontendTasksFile,
  JSON.stringify(frontendTaskQuestions, null, 2)
);
console.log(
  `✅ Created frontend-tasks-questions.json with ${frontendTaskQuestions.length} questions\n`
);

// Verify
const verifyReact = JSON.parse(fs.readFileSync(reactQuestionsFile, 'utf8'));
const verifyFT = JSON.parse(fs.readFileSync(frontendTasksFile, 'utf8'));

console.log('✅ Verification:');
console.log(`  React questions: ${verifyReact.length}`);
console.log(`  Frontend Tasks questions: ${verifyFT.length}`);
console.log(`  Total: ${verifyReact.length + verifyFT.length}`);

// Show breakdown by topic
const topics = {};
verifyFT.forEach(q => {
  topics[q.topic] = (topics[q.topic] || 0) + 1;
});

console.log('\n📋 Frontend Tasks questions by topic:');
Object.entries(topics)
  .sort()
  .forEach(([topic, count]) => {
    console.log(`  ${topic}: ${count} questions`);
  });

console.log('\n✅ Frontend task questions moved successfully!');
