const fs = require('fs');
const path = require('path');

/**
 * Parse React questions from reference.md and convert to JSON format
 * Processes questions in batches of 3 per topic
 */

const referencePath = path.join(
  __dirname,
  '../final-questions-v01/react/reference.md'
);
const outputPath = path.join(
  __dirname,
  '../final-questions-v01/react-questions.json'
);

// Topic mapping from section headers to topic names
const topicMapping = {
  'Core React': 'Core React',
  'React Router': 'React Router',
  'React Internationalization': 'React Internationalization',
  'React Testing': 'React Testing',
  'React Redux': 'React Redux',
  'React Native': 'React Native',
  'React supported libraries & Integration': 'Libraries & Integration',
  Miscellaneous: 'Miscellaneous',
};

function formatCode(content) {
  // Wrap code blocks in <pre><code> and inline code in <code>
  // First, handle code blocks (```language ... ```)
  content = content.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    (match, lang, code) => {
      // Clean up the code
      code = code.trim();
      // Escape HTML entities
      code = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return `<pre><code>${code}</code></pre>`;
    }
  );

  // Handle inline code (`code`)
  content = content.replace(/`([^`\n]+)`/g, (match, code) => {
    // Don't wrap if already inside <pre><code>
    if (match.includes('<pre>') || match.includes('<code>')) {
      return match;
    }
    // Escape HTML entities
    code = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<code>${code}</code>`;
  });

  return content;
}

function parseQuestions() {
  const content = fs.readFileSync(referencePath, 'utf8');
  const questions = [];

  // Split by section headers (##)
  const sections = content.split(/^##\s+/m);

  let currentTopic = 'Core React';
  let questionCounter = 1;

  sections.forEach((section, sectionIndex) => {
    // Skip first section (header/intro)
    if (sectionIndex === 0) return;

    // Extract section title
    const lines = section.split('\n');
    const sectionTitle = lines[0].trim();

    // Map section to topic
    if (topicMapping[sectionTitle]) {
      currentTopic = topicMapping[sectionTitle];
    }

    // Skip "Old Q&A" and "Disclaimer" sections
    if (
      sectionTitle.includes('Old Q&A') ||
      sectionTitle.includes('Disclaimer')
    ) {
      return;
    }

    // Extract questions (numbered items like "1. ### Question Title")
    const questionPattern = /^\d+\.\s+###\s+(.+?)$/gm;
    let match;

    while ((match = questionPattern.exec(section)) !== null) {
      const questionTitle = match[1].trim();
      const questionStart = match.index + match[0].length;

      // Find the end of this question (next question or end of section)
      let questionEnd = section.length;
      const nextMatch = questionPattern.exec(section);
      if (nextMatch) {
        questionEnd = nextMatch.index;
        questionPattern.lastIndex = match.index + match[0].length; // Reset for next iteration
      }

      const questionContent = section
        .substring(questionStart, questionEnd)
        .trim();

      // Clean up content
      let cleanedContent = questionContent
        .replace(/\[⬆ Back to Top\]\([^)]+\)/g, '') // Remove back to top links
        .replace(/^\s*<details>[\s\S]*?<\/details>/gm, '') // Remove details sections for now
        .trim();

      // Format code
      cleanedContent = formatCode(cleanedContent);

      // Create question object
      const question = {
        id: `react-${String(questionCounter).padStart(3, '0')}`,
        title: questionTitle,
        content: cleanedContent,
        type: 'multiple-choice', // Default, will be updated if needed
        category: 'React',
        topic: currentTopic,
        difficulty: 'intermediate', // Default for senior developers
        learningCardId: 'core-technologies',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'admin',
        updatedBy: 'admin',
        tags: [
          'react',
          currentTopic.toLowerCase().replace(/\s+/g, '-'),
          'intermediate',
        ],
        explanation:
          cleanedContent.substring(0, 500) +
          (cleanedContent.length > 500 ? '...' : ''),
        points: 15,
        options: [
          {
            id: 'o1',
            text: 'See explanation above',
            isCorrect: true,
            explanation:
              'This is a conceptual question. Please refer to the explanation provided.',
          },
        ],
        hints: [
          'Review React documentation',
          'Consider best practices',
          'Think about component lifecycle and state management',
        ],
        metadata: {},
      };

      questions.push(question);
      questionCounter++;
    }
  });

  console.log(`✅ Parsed ${questions.length} React questions`);
  console.log(
    `📊 Topics: ${[...new Set(questions.map(q => q.topic))].join(', ')}`
  );

  return questions;
}

// Main execution
try {
  const questions = parseQuestions();

  // Write to JSON file
  fs.writeFileSync(outputPath, JSON.stringify(questions, null, 2));

  console.log(`\n✅ Successfully created ${outputPath}`);
  console.log(`📝 Total questions: ${questions.length}`);

  // Show breakdown by topic
  const topicCounts = {};
  questions.forEach(q => {
    topicCounts[q.topic] = (topicCounts[q.topic] || 0) + 1;
  });

  console.log('\n📊 Questions by topic:');
  Object.entries(topicCounts).forEach(([topic, count]) => {
    console.log(`   ${topic}: ${count} questions`);
  });
} catch (error) {
  console.error('❌ Error parsing React questions:', error);
  process.exit(1);
}
