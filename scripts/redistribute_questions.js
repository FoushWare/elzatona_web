// Using built-in fetch API

async function redistributeQuestions() {
  console.log('🔄 Redistributing questions evenly across all learning paths...');

  try {
    // Get all questions
    console.log('📥 Fetching all questions...');
    const questionsResponse = await fetch('http://localhost:3001/api/questions/unified');
    const questionsData = await questionsResponse.json();
    
    if (!questionsData.success) {
      throw new Error('Failed to fetch questions');
    }

    const questions = questionsData.data;
    console.log(`📊 Total questions: ${questions.length}`);

    // Define learning paths
    const learningPaths = [
      'frontend-basics',
      'css-mastery', 
      'javascript-deep-dive',
      'react-mastery',
      'typescript-essentials',
      'testing-strategies',
      'performance-optimization',
      'security-essentials',
      'frontend-system-design',
      'build-tools-devops',
      'api-integration',
      'ai-tools-frontend',
      'frontend-interview-prep',
      'advanced-frontend-architectures',
      'javascript-practice-interview',
      'javascript-practice',
      'css-practice-layout',
      'css-practice',
      'html-practice',
      'html-practice-semantic',
      'react-practice-advanced',
      'react-practice',
      'comprehensive-interview-prep',
      'improve-english'
    ];

    // Calculate questions per path
    const totalQuestions = questions.length;
    const totalPaths = learningPaths.length;
    const questionsPerPath = Math.floor(totalQuestions / totalPaths);
    const remainder = totalQuestions % totalPaths;

    console.log(`📊 Total learning paths: ${totalPaths}`);
    console.log(`📊 Questions per path: ${questionsPerPath}`);
    console.log(`📊 Remainder: ${remainder}`);

    // Shuffle questions
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    console.log(`🎲 Shuffled ${shuffledQuestions.length} questions`);

    // Distribute questions
    let questionIndex = 0;
    for (let i = 0; i < learningPaths.length; i++) {
      const learningPath = learningPaths[i];
      
      // Calculate how many questions this path should get
      const questionsForThisPath = questionsPerPath + (i < remainder ? 1 : 0);
      
      console.log(`📝 Assigning ${questionsForThisPath} questions to ${learningPath}...`);
      
      // Assign questions to this learning path
      for (let j = 0; j < questionsForThisPath && questionIndex < shuffledQuestions.length; j++) {
        const question = shuffledQuestions[questionIndex];
        
        try {
          // Update the question's learning path
          const updateResponse = await fetch(`http://localhost:3001/api/questions/unified/${question.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              learningPath: learningPath
            })
          });

          if (!updateResponse.ok) {
            console.error(`❌ Failed to update question ${question.id}: ${updateResponse.status}`);
          } else {
            console.log(`  ✅ Updated question ${question.id} to ${learningPath}`);
          }
        } catch (error) {
          console.error(`❌ Error updating question ${question.id}:`, error.message);
        }
        
        questionIndex++;
      }
      
      console.log(`✅ Assigned ${questionsForThisPath} questions to ${learningPath}`);
    }

    console.log('🎉 Question redistribution completed!');
    console.log('📊 Final distribution:');

    // Show final distribution
    for (const learningPath of learningPaths) {
      try {
        const countResponse = await fetch(`http://localhost:3001/api/questions/unified?learningPath=${learningPath}&isActive=true`);
        const countData = await countResponse.json();
        const count = countData.data ? countData.data.length : 0;
        console.log(`  ${learningPath}: ${count} questions`);
      } catch (error) {
        console.log(`  ${learningPath}: Error fetching count`);
      }
    }

  } catch (error) {
    console.error('❌ Error redistributing questions:', error);
  }
}

redistributeQuestions();