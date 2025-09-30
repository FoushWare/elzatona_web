#!/usr/bin/env node

/**
 * Direct Learning Path Update Script
 * 
 * Updates learning path question counts directly using Firebase Admin SDK
 */

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase Admin
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID || 'elzatona-web',
  // Add other service account fields if needed
};

if (!global.firebaseAdmin) {
  try {
    initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.projectId
    });
    global.firebaseAdmin = true;
  } catch (error) {
    console.log('Firebase Admin already initialized or using default credentials');
  }
}

const db = getFirestore();

// Category to learning path mapping
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
  'Accessibility': 'frontend-basics',
  'English Learning': 'improve-english',
  'Git & Version Control': 'frontend-basics',
  'Build Tools': 'build-tools-devops'
};

async function updateLearningPathCounts() {
  console.log('🔄 Updating learning path question counts directly...\n');
  
  try {
    // Get all questions
    const questionsSnapshot = await db.collection('unifiedQuestions').get();
    const questions = questionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
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
    const pathsSnapshot = await db.collection('learningPaths').get();
    const learningPaths = pathsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
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
        const pathRef = db.collection('learningPaths').doc(learningPathId);
        await pathRef.update({
          questionCount: count,
          updatedAt: new Date().toISOString()
        });
        
        console.log(`✅ Updated ${learningPath.name}: ${count} questions`);
        updateResults.push({
          id: learningPathId,
          name: learningPath.name,
          questionCount: count,
          success: true
        });
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
      require('path').join(process.cwd(), 'learning-path-direct-update-report.json'),
      JSON.stringify(updateReport, null, 2)
    );
    
    console.log('\n💾 Update report saved to: learning-path-direct-update-report.json');
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
