const fs = require('fs');
const path = require('path');

/**
 * Updates topics.json based on questions in html-questions.json
 * This script should be run whenever questions are added or modified
 */
function updateTopics() {
  const htmlQuestionsPath = path.join(
    __dirname,
    '../final-questions-v01/html-questions.json'
  );
  const cssQuestionsPath = path.join(
    __dirname,
    '../final-questions-v01/css-questions.json'
  );
  const jsQuestionsPath = path.join(
    __dirname,
    '../final-questions-v01/javascript-questions.json'
  );
  const reactQuestionsPath = path.join(
    __dirname,
    '../final-questions-v01/react-questions.json'
  );
  const designPatternsQuestionsPath = path.join(
    __dirname,
    '../final-questions-v01/design-patterns-questions.json'
  );
  const topicsPath = path.join(
    __dirname,
    '../final-questions-v01/topics/topics.json'
  );

  // Read all question files
  const questions = [];

  if (fs.existsSync(htmlQuestionsPath)) {
    const htmlQuestions = JSON.parse(
      fs.readFileSync(htmlQuestionsPath, 'utf8')
    );
    questions.push(...htmlQuestions);
  }

  if (fs.existsSync(cssQuestionsPath)) {
    const cssQuestions = JSON.parse(fs.readFileSync(cssQuestionsPath, 'utf8'));
    questions.push(...cssQuestions);
  }

  if (fs.existsSync(jsQuestionsPath)) {
    const jsQuestions = JSON.parse(fs.readFileSync(jsQuestionsPath, 'utf8'));
    questions.push(...jsQuestions);
  }

  if (fs.existsSync(reactQuestionsPath)) {
    const reactQuestions = JSON.parse(
      fs.readFileSync(reactQuestionsPath, 'utf8')
    );
    questions.push(...reactQuestions);
  }

  if (fs.existsSync(designPatternsQuestionsPath)) {
    const designPatternsQuestions = JSON.parse(
      fs.readFileSync(designPatternsQuestionsPath, 'utf8')
    );
    questions.push(...designPatternsQuestions);
  }

  if (
    fs.existsSync(
      path.join(__dirname, '../final-questions-v01/nextjs-questions.json')
    )
  ) {
    const nextjsQuestions = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, '../final-questions-v01/nextjs-questions.json'),
        'utf8'
      )
    );
    questions.push(...nextjsQuestions);
  }

  if (
    fs.existsSync(
      path.join(
        __dirname,
        '../final-questions-v01/performance-patterns-questions.json'
      )
    )
  ) {
    const performancePatternsQuestions = JSON.parse(
      fs.readFileSync(
        path.join(
          __dirname,
          '../final-questions-v01/performance-patterns-questions.json'
        ),
        'utf8'
      )
    );
    questions.push(...performancePatternsQuestions);
  }

  if (
    fs.existsSync(
      path.join(
        __dirname,
        '../final-questions-v01/rendering-patterns-questions.json'
      )
    )
  ) {
    const renderingPatternsQuestions = JSON.parse(
      fs.readFileSync(
        path.join(
          __dirname,
          '../final-questions-v01/rendering-patterns-questions.json'
        ),
        'utf8'
      )
    );
    questions.push(...renderingPatternsQuestions);
  }

  if (
    fs.existsSync(
      path.join(__dirname, '../final-questions-v01/security-questions.json')
    )
  ) {
    const securityQuestions = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, '../final-questions-v01/security-questions.json'),
        'utf8'
      )
    );
    questions.push(...securityQuestions);
  }

  if (
    fs.existsSync(
      path.join(
        __dirname,
        '../final-questions-v01/system-design-questions.json'
      )
    )
  ) {
    const systemDesignQuestions = JSON.parse(
      fs.readFileSync(
        path.join(
          __dirname,
          '../final-questions-v01/system-design-questions.json'
        ),
        'utf8'
      )
    );
    questions.push(...systemDesignQuestions);
  }

  if (
    fs.existsSync(
      path.join(
        __dirname,
        '../final-questions-v01/frontend-tasks-questions.json'
      )
    )
  ) {
    const frontendTasksQuestions = JSON.parse(
      fs.readFileSync(
        path.join(
          __dirname,
          '../final-questions-v01/frontend-tasks-questions.json'
        ),
        'utf8'
      )
    );
    questions.push(...frontendTasksQuestions);
  }

  if (
    fs.existsSync(
      path.join(
        __dirname,
        '../final-questions-v01/problem-solving-questions.json'
      )
    )
  ) {
    const problemSolvingQuestions = JSON.parse(
      fs.readFileSync(
        path.join(
          __dirname,
          '../final-questions-v01/problem-solving-questions.json'
        ),
        'utf8'
      )
    );
    questions.push(...problemSolvingQuestions);
  }

  if (questions.length === 0) {
    console.error(`❌ No question files found`);
    process.exit(1);
  }

  // Read existing topics or create new structure
  let topics = {
    categories: {},
    metadata: {
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
      totalCategories: 0,
      totalTopics: 0,
      totalQuestions: 0,
    },
  };

  if (fs.existsSync(topicsPath)) {
    const existingTopics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));
    // Preserve descriptions but reset counts
    Object.keys(existingTopics.categories || {}).forEach(catName => {
      const cat = existingTopics.categories[catName];
      if (!topics.categories[catName]) {
        topics.categories[catName] = {
          name: cat.name || catName,
          description: cat.description || `${catName} questions and concepts`,
          topics: {},
          totalQuestions: 0,
          lastUpdated: new Date().toISOString(),
        };
      }
      // Preserve topic descriptions but reset counts
      Object.keys(cat.topics || {}).forEach(topicName => {
        const topic = cat.topics[topicName];
        if (!topics.categories[catName].topics[topicName]) {
          topics.categories[catName].topics[topicName] = {
            name: topic.name || topicName,
            description: topic.description || `${topicName} related questions`,
            count: 0,
            difficulties: {},
            questionTypes: {}, // Always reset to empty object
          };
        } else {
          // Reset counts and questionTypes even if topic exists
          topics.categories[catName].topics[topicName].count = 0;
          topics.categories[catName].topics[topicName].difficulties = {};
          topics.categories[catName].topics[topicName].questionTypes = {};
        }
      });
    });
  }

  // Process questions and build topics structure (reset counts first)
  questions.forEach(question => {
    const category = question.category || 'Unknown';
    const topicName = question.topic || 'Unknown';
    const difficulty = question.difficulty || 'unknown';
    // Ensure questionType is always a string
    let questionType = question.type || 'unknown';
    if (typeof questionType !== 'string') {
      // Handle arrays or objects that might have been incorrectly stored
      if (Array.isArray(questionType)) {
        questionType = questionType[0] || 'unknown';
      } else if (typeof questionType === 'object') {
        questionType = 'unknown';
      } else {
        questionType = String(questionType);
      }
    }

    // Initialize category if it doesn't exist
    if (!topics.categories[category]) {
      topics.categories[category] = {
        name: category,
        description: `${category} questions and concepts`,
        topics: {},
        totalQuestions: 0,
        lastUpdated: new Date().toISOString(),
      };
    }

    // Initialize topic if it doesn't exist
    if (!topics.categories[category].topics[topicName]) {
      topics.categories[category].topics[topicName] = {
        name: topicName,
        description: `${topicName} related questions`,
        count: 0,
        difficulties: {},
        questionTypes: {},
      };
    }

    const topic = topics.categories[category].topics[topicName];

    // Update counts
    topic.count++;
    topics.categories[category].totalQuestions++;

    // Update difficulty distribution
    if (!topic.difficulties[difficulty]) {
      topic.difficulties[difficulty] = 0;
    }
    topic.difficulties[difficulty]++;

    // Update question type distribution
    if (!topic.questionTypes[questionType]) {
      topic.questionTypes[questionType] = 0;
    }
    topic.questionTypes[questionType]++;

    // Update last updated timestamp
    topic.lastUpdated = new Date().toISOString();
    topics.categories[category].lastUpdated = new Date().toISOString();
  });

  // Calculate metadata
  topics.metadata.totalCategories = Object.keys(topics.categories).length;
  topics.metadata.totalTopics = Object.values(topics.categories).reduce(
    (sum, cat) => sum + Object.keys(cat.topics).length,
    0
  );
  topics.metadata.totalQuestions = questions.length;
  topics.metadata.lastUpdated = new Date().toISOString();

  // Write updated topics file
  fs.writeFileSync(topicsPath, JSON.stringify(topics, null, 2));

  console.log('✅ Topics updated successfully!');
  console.log(`   Categories: ${topics.metadata.totalCategories}`);
  console.log(`   Topics: ${topics.metadata.totalTopics}`);
  console.log(`   Total Questions: ${topics.metadata.totalQuestions}`);
  console.log(`\n📊 Categories:`);
  Object.entries(topics.categories).forEach(([catName, cat]) => {
    console.log(
      `   ${catName}: ${cat.totalQuestions} questions, ${Object.keys(cat.topics).length} topics`
    );
  });
}

// Run the update
updateTopics();
