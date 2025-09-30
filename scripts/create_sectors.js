const fetch = require('node-fetch');

// Define sectors for each learning path
const learningPathSectors = {
  'javascript-deep-dive': [
    { id: 'fundamentals', name: 'JavaScript Fundamentals', order: 1 },
    { id: 'advanced-concepts', name: 'Advanced Concepts', order: 2 },
    { id: 'async-programming', name: 'Async Programming', order: 3 },
    { id: 'object-oriented', name: 'Object-Oriented Programming', order: 4 },
    { id: 'functional-programming', name: 'Functional Programming', order: 5 },
  ],
  'frontend-basics': [
    { id: 'html-semantics', name: 'HTML Semantics', order: 1 },
    { id: 'css-layouts', name: 'CSS Layouts', order: 2 },
    { id: 'javascript-basics', name: 'JavaScript Basics', order: 3 },
    { id: 'responsive-design', name: 'Responsive Design', order: 4 },
  ],
  'css-mastery': [
    { id: 'advanced-css', name: 'Advanced CSS', order: 1 },
    { id: 'flexbox-grid', name: 'Flexbox & Grid', order: 2 },
    { id: 'animations', name: 'Animations & Transitions', order: 3 },
    { id: 'responsive-css', name: 'Responsive CSS', order: 4 },
  ],
  'react-mastery': [
    { id: 'components-props', name: 'Components & Props', order: 1 },
    { id: 'state-management', name: 'State Management', order: 2 },
    { id: 'hooks', name: 'React Hooks', order: 3 },
    { id: 'performance', name: 'Performance Optimization', order: 4 },
  ],
  'typescript-essentials': [
    { id: 'basic-types', name: 'Basic Types', order: 1 },
    { id: 'interfaces', name: 'Interfaces & Types', order: 2 },
    { id: 'generics', name: 'Generics', order: 3 },
    { id: 'advanced-types', name: 'Advanced Types', order: 4 },
  ],
  'testing-strategies': [
    { id: 'unit-testing', name: 'Unit Testing', order: 1 },
    { id: 'integration-testing', name: 'Integration Testing', order: 2 },
    { id: 'e2e-testing', name: 'E2E Testing', order: 3 },
    { id: 'test-automation', name: 'Test Automation', order: 4 },
  ],
  'performance-optimization': [
    { id: 'bundle-optimization', name: 'Bundle Optimization', order: 1 },
    { id: 'runtime-performance', name: 'Runtime Performance', order: 2 },
    { id: 'caching', name: 'Caching Strategies', order: 3 },
    { id: 'web-vitals', name: 'Core Web Vitals', order: 4 },
  ],
  'security-essentials': [
    { id: 'xss-prevention', name: 'XSS Prevention', order: 1 },
    { id: 'csrf-protection', name: 'CSRF Protection', order: 2 },
    { id: 'authentication', name: 'Authentication', order: 3 },
    { id: 'data-validation', name: 'Data Validation', order: 4 },
  ],
  'api-integration': [
    { id: 'rest-apis', name: 'REST APIs', order: 1 },
    { id: 'graphql', name: 'GraphQL', order: 2 },
    { id: 'data-fetching', name: 'Data Fetching', order: 3 },
    { id: 'error-handling', name: 'Error Handling', order: 4 },
  ],
  'build-tools-devops': [
    { id: 'build-tools', name: 'Build Tools', order: 1 },
    { id: 'ci-cd', name: 'CI/CD', order: 2 },
    { id: 'deployment', name: 'Deployment', order: 3 },
    { id: 'monitoring', name: 'Monitoring', order: 4 },
  ],
  'frontend-interview-prep': [
    { id: 'technical-questions', name: 'Technical Questions', order: 1 },
    { id: 'system-design', name: 'System Design', order: 2 },
    { id: 'coding-challenges', name: 'Coding Challenges', order: 3 },
    { id: 'behavioral', name: 'Behavioral Questions', order: 4 },
  ]
};

async function createSectors() {
  try {
    console.log('🔄 Creating sectors for learning paths...\n');
    
    // Get all questions
    const response = await fetch('http://localhost:3000/api/questions/unified');
    const data = await response.json();
    
    if (!data.success) {
      console.error('❌ Error fetching questions:', data.error);
      return;
    }
    
    const questions = data.data;
    console.log(`📊 Found ${questions.length} questions to organize into sectors\n`);
    
    // Group questions by learning path
    const questionsByPath = questions.reduce((acc, question) => {
      const path = question.learningPath;
      if (!acc[path]) acc[path] = [];
      acc[path].push(question);
      return acc;
    }, {});
    
    let totalSectorsCreated = 0;
    let totalQuestionsAssigned = 0;
    
    // Process each learning path
    for (const [pathId, pathQuestions] of Object.entries(questionsByPath)) {
      const sectors = learningPathSectors[pathId];
      
      if (!sectors) {
        console.log(`⚠️  No sectors defined for ${pathId}, skipping...`);
        continue;
      }
      
      console.log(`\n📚 Processing ${pathId} (${pathQuestions.length} questions)`);
      
      // Shuffle questions to distribute randomly
      const shuffledQuestions = [...pathQuestions].sort(() => Math.random() - 0.5);
      
      // Assign questions to sectors (15 questions per sector)
      const questionsPerSector = 15;
      let questionIndex = 0;
      
      for (const sector of sectors) {
        const sectorQuestions = shuffledQuestions.slice(
          questionIndex, 
          questionIndex + questionsPerSector
        );
        
        if (sectorQuestions.length === 0) {
          console.log(`  ⚠️  No questions available for sector: ${sector.name}`);
          continue;
        }
        
        console.log(`  📝 Creating sector: ${sector.name} (${sectorQuestions.length} questions)`);
        
        // Update each question with sector information
        for (const question of sectorQuestions) {
          try {
            const updateResponse = await fetch(`http://localhost:3000/api/questions/unified/${question.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                sector: sector.id,
                sectorName: sector.name,
                sectorOrder: sector.order,
              }),
            });
            
            if (updateResponse.ok) {
              totalQuestionsAssigned++;
            } else {
              console.error(`    ❌ Failed to update question ${question.id}`);
            }
          } catch (error) {
            console.error(`    ❌ Error updating question ${question.id}:`, error.message);
          }
        }
        
        questionIndex += questionsPerSector;
        totalSectorsCreated++;
        
        // Add small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    console.log(`\n🎉 Sector creation complete!`);
    console.log(`✅ Sectors created: ${totalSectorsCreated}`);
    console.log(`✅ Questions assigned: ${totalQuestionsAssigned}`);
    
    // Show final distribution
    console.log('\n📊 Final sector distribution:');
    for (const [pathId, pathQuestions] of Object.entries(questionsByPath)) {
      const sectors = learningPathSectors[pathId];
      if (!sectors) continue;
      
      console.log(`\n${pathId}:`);
      for (const sector of sectors) {
        const sectorQuestions = pathQuestions.filter(q => q.sector === sector.id);
        console.log(`  ${sector.name}: ${sectorQuestions.length} questions`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error during sector creation:', error.message);
  }
}

createSectors();
