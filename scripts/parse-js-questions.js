const fs = require('fs');
const path = require('path');

// Read the markdown file
const markdownPath = path.join(__dirname, '../References/internal-resoureces-js-questions.md');
const markdownContent = fs.readFileSync(markdownPath, 'utf8');

// Parse questions from markdown
function parseQuestions(content) {
  const questions = [];
  
  // Split by question markers (######)
  const questionSections = content.split(/(?=###### \d+\.)/);
  
  for (let i = 0; i < questionSections.length; i++) {
    const section = questionSections[i];
    
    // Skip if it's not a question section
    if (!section.includes('######')) continue;
    
    const lines = section.split('\n');
    
    // Extract question number
    const questionNumberMatch = section.match(/###### (\d+)\./);
    if (!questionNumberMatch) continue;
    
    const questionNumber = parseInt(questionNumberMatch[1]);
    
    // Extract question text
    let questionText = '';
    let codeBlock = '';
    let options = [];
    let answer = '';
    let explanation = '';
    
    let currentSection = 'question';
    let inCodeBlock = false;
    
    for (let j = 1; j < lines.length; j++) {
      const line = lines[j].trim();
      
      if (line.startsWith('```javascript')) {
        inCodeBlock = true;
        continue;
      }
      
      if (line.startsWith('```') && inCodeBlock) {
        inCodeBlock = false;
        continue;
      }
      
      if (inCodeBlock) {
        codeBlock += line + '\n';
        continue;
      }
      
      if (line.startsWith('- A:') || line.startsWith('- B:') || line.startsWith('- C:') || line.startsWith('- D:') || line.startsWith('- E:')) {
        currentSection = 'options';
        const option = line.replace(/^-\s*[A-E]:\s*/, '').replace(/`/g, '');
        options.push(option);
        continue;
      }
      
      if (line.startsWith('<details>')) {
        currentSection = 'details';
        continue;
      }
      
      if (line.startsWith('#### Answer:')) {
        currentSection = 'answer';
        answer = line.replace('#### Answer:', '').trim();
        continue;
      }
      
      if (line.startsWith('</details>')) {
        break;
      }
      
      if (currentSection === 'question' && line && !line.startsWith('---')) {
        questionText += line + ' ';
      }
      
      if (currentSection === 'details' && line && !line.startsWith('#### Answer:') && !line.startsWith('<p>') && !line.startsWith('</p>')) {
        explanation += line + ' ';
      }
    }
    
    // Clean up text
    questionText = questionText.trim();
    explanation = explanation.trim();
    codeBlock = codeBlock.trim();
    
    // Skip if we don't have enough data
    if (!questionText || options.length === 0 || !answer) continue;
    
    const question = {
      id: questionNumber,
      question: questionText,
      options: options,
      answer: answer,
      explanation: explanation
    };
    
    if (codeBlock) {
      question.code = codeBlock;
    }
    
    questions.push(question);
  }
  
  return questions;
}

// Parse the questions
const questions = parseQuestions(markdownContent);

console.log(`Parsed ${questions.length} questions`);

// Generate TypeScript code
function generateTypeScriptCode(questions) {
  let code = `export interface JavaScriptQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  code?: string;
}

export const javascriptQuestions: JavaScriptQuestion[] = [`;

  questions.forEach((question, index) => {
    code += `\n  {\n`;
    code += `    id: ${question.id},\n`;
    code += `    question: "${question.question.replace(/"/g, '\\"')}",\n`;
    
    if (question.code) {
      code += `    code: \`${question.code.replace(/`/g, '\\`')}\`,\n`;
    }
    
    code += `    options: [\n`;
    question.options.forEach(option => {
      code += `      "${option.replace(/"/g, '\\"')}",\n`;
    });
    code += `    ],\n`;
    code += `    answer: "${question.answer}",\n`;
    code += `    explanation: "${question.explanation.replace(/"/g, '\\"')}"\n`;
    code += `  }`;
    
    if (index < questions.length - 1) {
      code += ',';
    }
  });
  
  code += `\n];

export function getJavaScriptQuestions(): JavaScriptQuestion[] {
  return javascriptQuestions;
}

export function getJavaScriptQuestionById(id: number): JavaScriptQuestion | undefined {
  return javascriptQuestions.find(q => q.id === id);
}`;
  
  return code;
}

// Generate the TypeScript code
const typescriptCode = generateTypeScriptCode(questions);

// Write to file
const outputPath = path.join(__dirname, '../src/lib/javascriptQuestions.ts');
fs.writeFileSync(outputPath, typescriptCode, 'utf8');

console.log(`Generated TypeScript file with ${questions.length} questions at: ${outputPath}`);
console.log('Questions parsed successfully!');
