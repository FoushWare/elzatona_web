const fetch = require('node-fetch');

async function extractQuestions() {
  try {
    const response = await fetch('http://localhost:3000/api/questions/unified?learningPath=javascript-deep-dive&isActive=true');
    const data = await response.json();
    
    if (!data.success) {
      console.error('Error fetching questions:', data.error);
      return;
    }
    
    console.log(`\n=== JAVASCRIPT DEEP DIVE QUESTIONS (${data.data.length} total) ===\n`);
    
    data.data.forEach((question, index) => {
      console.log(`\n--- QUESTION ${index + 1} (ID: ${question.id}) ---`);
      console.log(`Question: ${question.content || question.title || question.question}`);
      console.log(`Category: ${question.category || question.subcategory || 'General'}`);
      console.log(`Difficulty: ${question.difficulty || 'medium'}`);
      console.log(`\nOptions:`);
      
      question.options?.forEach((option, optIndex) => {
        const letter = String.fromCharCode(65 + optIndex); // A, B, C, D
        const correct = option.isCorrect ? ' ✓' : '';
        console.log(`  ${letter}: ${option.text}${correct}`);
      });
      
      const correctAnswer = question.options?.find(opt => opt.isCorrect);
      if (correctAnswer) {
        console.log(`\nCorrect Answer: ${correctAnswer.text}`);
      }
      
      console.log(`\nExplanation: ${question.explanation || 'No explanation available.'}`);
      console.log(`\n${'='.repeat(80)}`);
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

extractQuestions();
