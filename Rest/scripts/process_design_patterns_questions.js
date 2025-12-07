const fs = require('fs');
const path = require('path');

/**
 * Process design pattern questions from JSON files
 * Converts open-ended to multiple-choice and processes in batches of 3 per topic
 */

const designPatternsDir = path.join(
  __dirname,
  '../../apps/admin/network/data/json/design-patterns'
);
const outputPath = path.join(
  __dirname,
  '../final-questions-v01/design-patterns-questions.json'
);

// Topic mapping - categorize design patterns
const topicMapping = {
  'General Design Patterns': 'Core Patterns',
  'Common Pattern': 'Core Patterns',
  'Factory Pattern': 'Creational Patterns',
  'Singleton Pattern': 'Creational Patterns',
  'Prototype Pattern': 'Creational Patterns',
  'Observer Pattern': 'Behavioral Patterns',
  'Mediator Pattern': 'Behavioral Patterns',
  'Module Pattern': 'Structural Patterns',
  'Proxy Pattern': 'Structural Patterns',
  'Mixin Pattern': 'Structural Patterns',
  'Flyweight Pattern': 'Structural Patterns',
  'Provider Pattern': 'React Patterns',
  'Static Import': 'Performance Patterns',
};

function formatCode(content) {
  // Wrap code blocks in <pre><code> and inline code in <code>
  // First, handle code blocks (```language ... ```)
  content = content.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    (match, lang, code) => {
      code = code.trim();
      code = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return `<pre><code>${code}</code></pre>`;
    }
  );

  // Handle inline code (`code`)
  content = content.replace(/`([^`\n]+)`/g, (match, code) => {
    if (match.includes('<pre>') || match.includes('<code>')) {
      return match;
    }
    code = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<code>${code}</code>`;
  });

  return content;
}

function convertOpenEndedToMultipleChoice(question) {
  // Create multiple-choice options from the explanation and sample answers
  const explanation = question.explanation || '';
  const sampleAnswers = question.sampleAnswers || [];

  // Extract key points from explanation
  const correctAnswer =
    sampleAnswers[0] || explanation.split('.')[0] || 'See explanation above';

  // Create plausible wrong answers
  const wrongAnswers = [
    'This is not correct. Please refer to the explanation.',
    'Incorrect. Review the design pattern concepts.',
    'This is a common misconception. The correct answer is different.',
    "Not quite. Consider the pattern's purpose and implementation.",
  ];

  // Use existing options if available, otherwise create new ones
  let options = [];
  if (question.options && question.options.length > 0) {
    options = question.options.map((opt, idx) => ({
      id: `o${idx + 1}`,
      text: opt.text || opt,
      isCorrect: opt.isCorrect !== undefined ? opt.isCorrect : idx === 0,
      explanation: opt.explanation || (idx === 0 ? explanation : ''),
    }));
  } else {
    options = [
      {
        id: 'o1',
        text: correctAnswer,
        isCorrect: true,
        explanation: explanation,
      },
      ...wrongAnswers.slice(0, 3).map((text, idx) => ({
        id: `o${idx + 2}`,
        text: text,
        isCorrect: false,
        explanation: '',
      })),
    ];
  }

  return {
    ...question,
    type: 'multiple-choice',
    options: options,
  };
}

function processDesignPatterns() {
  const files = fs
    .readdirSync(designPatternsDir)
    .filter(f => f.endsWith('.json'));
  const allQuestions = [];

  console.log(`📁 Found ${files.length} design pattern files`);

  files.forEach(file => {
    const filePath = path.join(designPatternsDir, file);
    try {
      const questions = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      // Extract pattern name from filename (e.g., "factory-pattern.json" -> "Factory Pattern")
      const patternName = file
        .replace('.json', '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      questions.forEach(q => {
        // Filter for intermediate/difficult (for senior developers)
        if (q.difficulty === 'beginner') {
          // Upgrade beginner to intermediate for senior developers
          q.difficulty = 'intermediate';
        }

        // Map topic - use filename pattern name if topic is "General Design Patterns"
        let originalTopic = q.topic || patternName;
        if (originalTopic === 'General Design Patterns') {
          originalTopic = patternName;
        }
        q.topic = topicMapping[originalTopic] || originalTopic;

        // Format code in content and explanation
        q.content = formatCode(q.content || '');
        q.explanation = formatCode(q.explanation || '');

        // Convert open-ended to multiple-choice
        if (q.type === 'open-ended') {
          q = convertOpenEndedToMultipleChoice(q);
        }

        // Ensure proper structure
        q.category = 'Design Patterns';
        q.learningCardId = q.learningCardId || 'system-design';
        q.isActive = true;
        q.createdAt = q.createdAt || new Date().toISOString();
        q.updatedAt = new Date().toISOString();
        q.createdBy = 'admin';
        q.updatedBy = 'admin';
        q.points = q.points || 15;
        q.hints = q.hints || [
          'Review design pattern documentation',
          "Consider the pattern's purpose and use cases",
          'Think about when to apply this pattern',
        ];

        // Update tags
        q.tags = q.tags || [];
        if (!q.tags.includes('design-patterns')) {
          q.tags.unshift('design-patterns');
        }
        if (!q.tags.includes('intermediate') && !q.tags.includes('difficult')) {
          q.tags.push(q.difficulty);
        }

        allQuestions.push(q);
      });

      console.log(`  ✅ Processed ${file}: ${questions.length} questions`);
    } catch (error) {
      console.error(`  ❌ Error processing ${file}:`, error.message);
    }
  });

  console.log(`\n📊 Total questions processed: ${allQuestions.length}`);

  // Group by topic
  const questionsByTopic = {};
  allQuestions.forEach(q => {
    const topic = q.topic;
    if (!questionsByTopic[topic]) {
      questionsByTopic[topic] = [];
    }
    questionsByTopic[topic].push(q);
  });

  console.log('\n📋 Questions by topic:');
  Object.entries(questionsByTopic).forEach(([topic, questions]) => {
    console.log(`  ${topic}: ${questions.length} questions`);
  });

  return allQuestions;
}

// Main execution
try {
  const questions = processDesignPatterns();

  // Write to JSON file
  fs.writeFileSync(outputPath, JSON.stringify(questions, null, 2));

  console.log(`\n✅ Successfully created ${outputPath}`);
  console.log(`📝 Total questions: ${questions.length}`);
} catch (error) {
  console.error('❌ Error processing design patterns:', error);
  process.exit(1);
}
