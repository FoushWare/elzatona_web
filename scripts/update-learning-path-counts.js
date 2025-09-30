#!/usr/bin/env node

/**
 * Update Learning Path Counts Script
 * 
 * Updates question counts for learning paths based on imported questions
 */

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';

// Mapping from question categories to learning path IDs
const CATEGORY_TO_LEARNING_PATH = {
  'HTML & CSS': 'frontend-basics',
  'JavaScript (Core)': 'javascript-deep-dive',
  'React.js (Core)': 'react-mastery',
  'TypeScript (Core)': 'typescript-essentials',
  'CSS & Styling': 'css-mastery',
  'Deployment & DevOps': 'build-tools-devops',
  'API Design': 'api-integration',
  'Web Performance': 'performance-optimization',
  'Testing Strategies': 'testing-strategies',
  'Security': 'security-essentials',
  'System Design': 'frontend-system-design',
  'Accessibility': 'frontend-basics', // Map to frontend-basics
  'English Learning': 'improve-english',
  'Git & Version Control': 'frontend-basics', // Map to frontend-basics
  'Build Tools': 'build-tools-devops'
};

async function updateLearningPathCounts() {
  console.log('🔄 Updating learning path question counts...\n');
  
  try {
    // Get all questions
    const questionsResponse = await fetch(`${BASE_URL}/api/questions/unified`);
    if (!questionsResponse.ok) {
      throw new Error(`Failed to fetch questions: ${questionsResponse.status}`);
    }
    
    const questionsData = await questionsResponse.json();
    const questions = questionsData.data || [];
    
    console.log(`📊 Found ${questions.length} questions to categorize`);
    
    // Count questions by category
    const categoryCounts = {};
    questions.forEach(question => {
      const category = question.category;
      if (!categoryCounts[category]) {
        categoryCounts[category] = 0;
      }
      categoryCounts[category]++;
    });
    
    console.log('\n📋 Questions by category:');
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} questions`);
    });
    
    // Get all learning paths
    const pathsResponse = await fetch(`${BASE_URL}/api/learning-paths`);
    if (!pathsResponse.ok) {
      throw new Error(`Failed to fetch learning paths: ${pathsResponse.status}`);
    }
    
    const pathsData = await pathsResponse.json();
    const learningPaths = pathsData.data || [];
    
    console.log(`\n📚 Found ${learningPaths.length} learning paths`);
    
    // Update learning path counts
    const updateResults = [];
    
    for (const [category, count] of Object.entries(categoryCounts)) {
      const learningPathId = CATEGORY_TO_LEARNING_PATH[category];
      
      if (!learningPathId) {
        console.log(`⚠️  No learning path mapping for category: ${category}`);
        continue;
      }
      
      // Find the learning path
      const learningPath = learningPaths.find(lp => lp.id === learningPathId);
      
      if (!learningPath) {
        console.log(`⚠️  Learning path not found: ${learningPathId}`);
        continue;
      }
      
      // Update the learning path
      try {
        const updateResponse = await fetch(`${BASE_URL}/api/learning-paths/${learningPathId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            questionCount: count
          })
        });
        
        if (updateResponse.ok) {
          console.log(`✅ Updated ${learningPath.name}: ${count} questions`);
          updateResults.push({
            id: learningPathId,
            name: learningPath.name,
            questionCount: count,
            success: true
          });
        } else {
          console.log(`❌ Failed to update ${learningPath.name}: ${updateResponse.status}`);
          updateResults.push({
            id: learningPathId,
            name: learningPath.name,
            questionCount: count,
            success: false,
            error: `HTTP ${updateResponse.status}`
          });
        }
      } catch (error) {
        console.log(`❌ Error updating ${learningPath.name}: ${error.message}`);
        updateResults.push({
          id: learningPathId,
          name: learningPath.name,
          questionCount: count,
          success: false,
          error: error.message
        });
      }
    }
    
    // Print summary
    console.log('\n📊 UPDATE SUMMARY');
    console.log('='.repeat(50));
    
    const successful = updateResults.filter(r => r.success);
    const failed = updateResults.filter(r => !r.success);
    
    console.log(`Successfully updated: ${successful.length}`);
    console.log(`Failed to update: ${failed.length}`);
    
    if (successful.length > 0) {
      console.log('\n✅ Successfully updated learning paths:');
      successful.forEach(result => {
        console.log(`   ${result.name}: ${result.questionCount} questions`);
      });
    }
    
    if (failed.length > 0) {
      console.log('\n❌ Failed to update learning paths:');
      failed.forEach(result => {
        console.log(`   ${result.name}: ${result.error}`);
      });
    }
    
    // Save update report
    const updateReport = {
      timestamp: new Date().toISOString(),
      totalQuestions: questions.length,
      categoryCounts,
      updateResults,
      summary: {
        successful: successful.length,
        failed: failed.length,
        totalProcessed: updateResults.length
      }
    };
    
    require('fs').writeFileSync(
      require('path').join(process.cwd(), 'learning-path-update-report.json'),
      JSON.stringify(updateReport, null, 2)
    );
    
    console.log('\n💾 Update report saved to: learning-path-update-report.json');
    console.log('\n✅ Learning path counts updated successfully!');
    
  } catch (error) {
    console.error('❌ Error updating learning path counts:', error.message);
    throw error;
  }
}

// Run the update
if (require.main === module) {
  updateLearningPathCounts().catch(error => {
    console.error('❌ Update process failed:', error);
    process.exit(1);
  });
}

module.exports = { updateLearningPathCounts };
