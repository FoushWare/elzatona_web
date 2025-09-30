#!/usr/bin/env node

/**
 * Clear Existing Questions Script
 * 
 * Clears all existing questions from the unified questions collection
 * before importing new ones from QuestionsBank
 */

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';

async function clearAllQuestions() {
  console.log('🗑️  Clearing existing questions...\n');
  
  try {
    // First, get all existing questions to get their IDs
    const response = await fetch(`${BASE_URL}/api/questions/unified`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const questions = data.data || [];
    
    console.log(`📊 Found ${questions.length} existing questions to clear`);
    
    if (questions.length === 0) {
      console.log('✅ No questions to clear');
      return;
    }
    
    // Delete questions in batches
    const batchSize = 50;
    let deletedCount = 0;
    
    for (let i = 0; i < questions.length; i += batchSize) {
      const batch = questions.slice(i, i + batchSize);
      const deletePromises = batch.map(question => 
        fetch(`${BASE_URL}/api/questions/unified/${question.id}`, {
          method: 'DELETE'
        })
      );
      
      const results = await Promise.allSettled(deletePromises);
      
      const successful = results.filter(result => 
        result.status === 'fulfilled' && result.value.ok
      ).length;
      
      deletedCount += successful;
      console.log(`   ✅ Deleted batch ${Math.floor(i / batchSize) + 1}: ${successful}/${batch.length} questions`);
    }
    
    console.log(`\n🎉 Successfully cleared ${deletedCount} questions`);
    
  } catch (error) {
    console.error('❌ Error clearing questions:', error.message);
    throw error;
  }
}

// Run the clear operation
if (require.main === module) {
  clearAllQuestions().catch(error => {
    console.error('❌ Clear process failed:', error);
    process.exit(1);
  });
}

module.exports = { clearAllQuestions };
