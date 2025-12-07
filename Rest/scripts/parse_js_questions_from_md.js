const fs = require('fs');
const path = require('path');

/**
 * Parses JavaScript questions from reference.md and creates batch scripts
 * This script analyzes the markdown structure and prepares question data
 */

const mdFile = path.join(
  __dirname,
  '../final-questions-v01/javascript/reference.md'
);
const mdContent = fs.readFileSync(mdFile, 'utf8');

// Parse questions from markdown
const questionRegex =
  /###### (\d+)\.\s+(.+?)\n\n```javascript\n([\s\S]*?)```\n\n(- A:.*?)\n(- B:.*?)\n(- C:.*?)(?:\n(- D:.*?))?\n\n<details>[\s\S]*?<b>Answer<\/b>[\s\S]*?#### Answer: ([A-D])[\s\S]*?<\/p>[\s\S]*?<\/details>/g;

const questions = [];
let match;

while ((match = questionRegex.exec(mdContent)) !== null) {
  const [
    ,
    num,
    title,
    code,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
  ] = match;

  // Extract explanation
  const explanationMatch = mdContent
    .substring(match.index)
    .match(
      /<details>[\s\S]*?<p>[\s\S]*?#### Answer: [A-D][\s\S]*?<\/p>[\s\S]*?<\/details>/
    );
  let explanation = '';
  if (explanationMatch) {
    explanation = explanationMatch[0]
      .replace(/<details>[\s\S]*?<p>\s*/, '')
      .replace(/\s*<\/p>[\s\S]*?<\/details>/, '')
      .replace(/#### Answer: [A-D]\s*/, '')
      .trim();
  }

  questions.push({
    num: parseInt(num),
    title: title.trim(),
    code: code.trim(),
    options: {
      A: optionA.replace(/^- A:\s*/, '').trim(),
      B: optionB.replace(/^- B:\s*/, '').trim(),
      C: optionC.replace(/^- C:\s*/, '').trim(),
      D: optionD ? optionD.replace(/^- D:\s*/, '').trim() : null,
    },
    correctAnswer,
    explanation,
  });
}

console.log(`📊 Parsed ${questions.length} questions from reference.md`);
console.log(`\nFirst 3 questions:`);
questions.slice(0, 3).forEach(q => {
  console.log(`\n${q.num}. ${q.title}`);
  console.log(`   Code: ${q.code.substring(0, 50)}...`);
  console.log(`   Options: ${Object.keys(q.options).length}`);
  console.log(`   Correct: ${q.correctAnswer}`);
});

// Save parsed data for batch scripts
const parsedDataFile = path.join(
  __dirname,
  '../final-questions-v01/javascript/parsed-questions.json'
);
fs.writeFileSync(parsedDataFile, JSON.stringify(questions, null, 2));
console.log(`\n✅ Saved parsed questions to: ${parsedDataFile}`);
