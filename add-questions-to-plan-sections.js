#!/usr/bin/env node

/**
 * Add Questions to Plan Sections
 * Adds questions to all sections of the 1-day plan for testing
 */

const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';
const PLAN_ID = '1-day-plan';

// Question IDs for each category
const QUESTIONS_BY_CATEGORY = {
  'HTML & CSS': [
    'tVXESylIu0pFZPuRmcDE',
    'cwP3Ir6lr7inU7bVCWMx', 
    'YUXi2vtvFxU4xo78dg3y',
    'VJ6KTRO8h21uHNBpLagF',
    'Iy4hySohbYZqa03uysXc'
  ],
  'JavaScript (Core)': [
    'yy2O9SsfTvVfKOx07A2t',
    'nJ214r0o3UrWL8LZtnTK',
    'acY8WoIOoPvlJEzUBHBr'
  ]
};

// Add questions to a specific section
async function addQuestionsToSection(sectionId, questionIds) {
  try {
    const response = await fetch(`${BASE_URL}/api/guided-learning/plans/${PLAN_ID}/sections/${sectionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questions: questionIds
      })
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error adding questions to section ${sectionId}:`, error);
    return { success: false, error: error.message };
  }
}

// Get plan details to find section IDs
async function getPlanDetails() {
  try {
    const response = await fetch(`${BASE_URL}/api/guided-learning/plans/${PLAN_ID}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting plan details:', error);
    return null;
  }
}

// Main function to add questions to all sections
async function addQuestionsToAllSections() {
  try {
    console.log('🚀 Adding questions to plan sections...');
    
    // Get plan details
    const planData = await getPlanDetails();
    if (!planData || !planData.success) {
      console.error('❌ Failed to get plan details');
      return { success: false, error: 'Failed to get plan details' };
    }
    
    const sections = planData.data.sections;
    console.log(`📋 Found ${sections.length} sections in plan`);
    
    // Add questions to each section
    for (const section of sections) {
      console.log(`\n📝 Processing section: ${section.name} (${section.category})`);
      
      // Get questions for this section's category
      const questionIds = QUESTIONS_BY_CATEGORY[section.category] || [];
      
      if (questionIds.length === 0) {
        console.log(`⚠️  No questions found for category: ${section.category}`);
        continue;
      }
      
      console.log(`   Adding ${questionIds.length} questions: ${questionIds.join(', ')}`);
      
      // Add questions to section
      const result = await addQuestionsToSection(section.id, questionIds);
      
      if (result.success) {
        console.log(`   ✅ Successfully added questions to ${section.name}`);
      } else {
        console.log(`   ❌ Failed to add questions to ${section.name}: ${result.error}`);
      }
    }
    
    // Verify the final state
    console.log('\n🔍 Verifying final plan state...');
    const finalPlanData = await getPlanDetails();
    if (finalPlanData && finalPlanData.success) {
      console.log('\n📊 Final Section Status:');
      finalPlanData.data.sections.forEach(section => {
        console.log(`   ${section.name}: ${section.questionCount || 0} questions`);
      });
    }
    
    console.log('\n🎉 Question assignment completed!');
    return { success: true };
    
  } catch (error) {
    console.error('❌ Error adding questions to sections:', error);
    return { success: false, error: error.message };
  }
}

// Run the script
if (require.main === module) {
  addQuestionsToAllSections().then((result) => {
    if (result.success) {
      console.log('✅ Script completed successfully');
      process.exit(0);
    } else {
      console.log('❌ Script failed:', result.error);
      process.exit(1);
    }
  }).catch(error => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
}

module.exports = { addQuestionsToAllSections };
