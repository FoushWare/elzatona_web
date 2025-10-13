import fetch from 'node-fetch';

// Sample questions data - simplified version
const sampleQuestions = [
  {
    title: 'What is React?',
    content:
      'React (aka React.js or ReactJS) is an **open-source front-end JavaScript library** for building user interfaces, particularly web applications.',
    type: 'open-ended',
    cardType: 'Framework Questions',
    category: 'React',
    categoryId: 'cat-react',
    categorySlug: 'react',
    topic: 'React Basics',
    topicId: 'react-basics',
    topicSlug: 'react-basics',
    difficulty: 'beginner',
    tags: ['react', 'library', 'ui', 'components', 'frontend'],
    estimatedTime: 5,
  },
  {
    title: 'What are React Components?',
    content:
      'React components are **reusable pieces of UI** that can be composed together to build complex user interfaces.',
    type: 'open-ended',
    cardType: 'Framework Questions',
    category: 'React',
    categoryId: 'cat-react',
    categorySlug: 'react',
    topic: 'Components',
    topicId: 'react-components',
    topicSlug: 'components',
    difficulty: 'beginner',
    tags: ['react', 'components', 'props', 'state', 'jsx'],
    estimatedTime: 7,
  },
  {
    title: 'What is JavaScript?',
    content:
      'JavaScript is a **high-level, interpreted programming language** that is one of the core technologies of the World Wide Web.',
    type: 'open-ended',
    cardType: 'Core Technologies',
    category: 'JavaScript',
    categoryId: 'cat-javascript',
    categorySlug: 'javascript',
    topic: 'JavaScript Basics',
    topicId: 'js-basics',
    topicSlug: 'basics',
    difficulty: 'beginner',
    tags: ['javascript', 'programming', 'web', 'language', 'frontend'],
    estimatedTime: 8,
  },
  {
    title: 'What are JavaScript Functions?',
    content:
      'Functions in JavaScript are **reusable blocks of code** that perform a specific task.',
    type: 'open-ended',
    cardType: 'Core Technologies',
    category: 'JavaScript',
    categoryId: 'cat-javascript',
    categorySlug: 'javascript',
    topic: 'Functions',
    topicId: 'js-functions',
    topicSlug: 'functions',
    difficulty: 'beginner',
    tags: [
      'javascript',
      'functions',
      'arrow-functions',
      'parameters',
      'return',
    ],
    estimatedTime: 7,
  },
  {
    title: 'What is CSS?',
    content:
      'CSS (Cascading Style Sheets) is a **stylesheet language** used to describe the presentation of a document written in HTML.',
    type: 'open-ended',
    cardType: 'Core Technologies',
    category: 'CSS',
    categoryId: 'cat-css',
    categorySlug: 'css',
    topic: 'CSS Basics',
    topicId: 'css-basics',
    topicSlug: 'basics',
    difficulty: 'beginner',
    tags: ['css', 'styling', 'web', 'presentation', 'frontend'],
    estimatedTime: 6,
  },
  {
    title: 'What is HTML?',
    content:
      'HTML (HyperText Markup Language) is the **standard markup language** for creating web pages and web applications.',
    type: 'open-ended',
    cardType: 'Core Technologies',
    category: 'HTML',
    categoryId: 'cat-html',
    categorySlug: 'html',
    topic: 'HTML Basics',
    topicId: 'html-basics',
    topicSlug: 'basics',
    difficulty: 'beginner',
    tags: ['html', 'markup', 'web', 'structure', 'semantic'],
    estimatedTime: 5,
  },
  {
    title: 'What is Next.js?',
    content:
      'Next.js is a **React framework** that provides additional features and optimizations for building production-ready React applications.',
    type: 'open-ended',
    cardType: 'Framework Questions',
    category: 'Next.js',
    categoryId: 'cat-nextjs',
    categorySlug: 'nextjs',
    topic: 'Next.js Basics',
    topicId: 'nextjs-basics',
    topicSlug: 'basics',
    difficulty: 'beginner',
    tags: ['nextjs', 'react', 'framework', 'ssr', 'ssg'],
    estimatedTime: 10,
  },
  {
    title: 'What is Frontend System Design?',
    content:
      'Frontend System Design involves **architecting scalable, maintainable, and performant frontend applications**.',
    type: 'open-ended',
    cardType: 'System Design',
    category: 'System Design',
    categoryId: 'cat-system-design',
    categorySlug: 'system-design',
    topic: 'Frontend Architecture',
    topicId: 'sd-architecture',
    topicSlug: 'architecture',
    difficulty: 'intermediate',
    tags: [
      'system-design',
      'architecture',
      'frontend',
      'scalability',
      'performance',
    ],
    estimatedTime: 15,
  },
];

async function seedQuestionsViaAPI() {
  try {
    console.log('🌱 Starting questions seeding via API...');

    let successCount = 0;
    let errorCount = 0;

    for (const question of sampleQuestions) {
      try {
        const response = await fetch('http://localhost:3000/api/questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(question),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(`✅ Seeded question: ${question.title}`);
          successCount++;
        } else {
          const error = await response.text();
          console.error(`❌ Failed to seed question ${question.title}:`, error);
          errorCount++;
        }
      } catch (error) {
        console.error(`❌ Error seeding question ${question.title}:`, error);
        errorCount++;
      }
    }

    console.log(`\n🎉 Questions seeding completed!`);
    console.log(`✅ Successfully seeded: ${successCount} questions`);
    console.log(`❌ Failed to seed: ${errorCount} questions`);

    // Verify the seeding
    console.log('\n🔍 Verifying seeded questions...');
    try {
      const verifyResponse = await fetch('http://localhost:3000/api/questions');
      if (verifyResponse.ok) {
        const result = await verifyResponse.json();
        console.log(`📊 Total questions in database: ${result.count}`);
      }
    } catch (error) {
      console.error('Error verifying questions:', error);
    }
  } catch (error) {
    console.error('💥 Error during questions seeding:', error);
    process.exit(1);
  }
}

// Run the seeder
seedQuestionsViaAPI()
  .then(() => {
    console.log('✨ Questions seeding process completed successfully!');
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Questions seeding process failed:', error);
    process.exit(1);
  });
