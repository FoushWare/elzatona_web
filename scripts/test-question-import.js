#!/usr/bin/env node

/**
 * Test Question Import Script
 * 
 * Tests the question import process with a small sample before full import
 */

const { parseMarkdownQuestions, parseJsonQuestions, validateQuestion } = require('./advanced-question-importer');

// Test with a small sample
function testQuestionImport() {
  console.log('🧪 Testing Question Import Process...\n');
  
  // Test markdown parsing
  console.log('📝 Testing Markdown Parser...');
  const testMdPath = 'QuestionsBank/javascript-deep-dive/questions.md';
  const mdQuestions = parseMarkdownQuestions(testMdPath, 'javascript-deep-dive');
  console.log(`   ✅ Parsed ${mdQuestions.length} questions from markdown`);
  
  if (mdQuestions.length > 0) {
    console.log('   📋 Sample question:');
    console.log(`      Title: ${mdQuestions[0].title}`);
    console.log(`      Type: ${mdQuestions[0].type}`);
    console.log(`      Category: ${mdQuestions[0].category}`);
    console.log(`      Topics: ${mdQuestions[0].topics.join(', ')}`);
    console.log(`      Has Code: ${mdQuestions[0].codeBlock ? 'Yes' : 'No'}`);
  }
  
  // Test JSON parsing
  console.log('\n📄 Testing JSON Parser...');
  const testJsonPath = 'QuestionsBank/deployment-devops/pnpm-questions.json';
  const jsonQuestions = parseJsonQuestions(testJsonPath, 'deployment-devops');
  console.log(`   ✅ Parsed ${jsonQuestions.length} questions from JSON`);
  
  if (jsonQuestions.length > 0) {
    console.log('   📋 Sample question:');
    console.log(`      Title: ${jsonQuestions[0].title}`);
    console.log(`      Type: ${jsonQuestions[0].type}`);
    console.log(`      Category: ${jsonQuestions[0].category}`);
    console.log(`      Options: ${jsonQuestions[0].options.length}`);
  }
  
  // Test validation
  console.log('\n✅ Testing Question Validation...');
  const testQuestions = [...mdQuestions.slice(0, 3), ...jsonQuestions.slice(0, 2)];
  
  testQuestions.forEach((question, index) => {
    const validation = validateQuestion(question);
    console.log(`   Question ${index + 1}: ${validation.isValid ? '✅ Valid' : '❌ Invalid'}`);
    if (!validation.isValid) {
      console.log(`      Errors: ${validation.errors.join(', ')}`);
    }
  });
  
  // Summary
  console.log('\n📊 Test Summary:');
  console.log(`   Markdown questions: ${mdQuestions.length}`);
  console.log(`   JSON questions: ${jsonQuestions.length}`);
  console.log(`   Total test questions: ${testQuestions.length}`);
  console.log(`   Valid questions: ${testQuestions.filter(q => validateQuestion(q).isValid).length}`);
  
  console.log('\n✅ Test completed successfully!');
}

// Run the test
testQuestionImport();
