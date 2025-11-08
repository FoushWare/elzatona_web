import fetch from 'node-fetch';

// Sample Cards data
const sampleCards = [
  {
    name: 'Core Technologies',
    slug: 'core-technologies',
    description:
      'Fundamental web technologies including HTML, CSS, and JavaScript',
    color: '#3B82F6',
    icon: 'code',
    order: 1,
    isActive: true,
  },
  {
    name: 'Framework Questions',
    slug: 'framework-questions',
    description:
      'Modern JavaScript frameworks and libraries like React, Vue, Angular',
    color: '#10B981',
    icon: 'layers',
    order: 2,
    isActive: true,
  },
  {
    name: 'Problem Solving',
    slug: 'problem-solving',
    description: 'Algorithmic thinking and coding challenges',
    color: '#F59E0B',
    icon: 'puzzle',
    order: 3,
    isActive: true,
  },
  {
    name: 'System Design',
    slug: 'system-design',
    description: 'Large-scale system architecture and design patterns',
    color: '#EF4444',
    icon: 'network',
    order: 4,
    isActive: true,
  },
];

// Sample Plans data
const samplePlans = [
  {
    name: 'Frontend Fundamentals',
    slug: 'frontend-fundamentals',
    description: 'Complete beginner to intermediate frontend development path',
    duration: '12 weeks',
    difficulty: 'beginner',
    color: '#3B82F6',
    icon: 'book-open',
    order: 1,
    isActive: true,
    estimatedHours: 120,
    prerequisites: ['Basic computer skills'],
    learningObjectives: [
      'Master HTML5 semantic elements',
      'Build responsive layouts with CSS',
      'Write modern JavaScript (ES6+)',
      'Create interactive web applications',
    ],
  },
  {
    name: 'React Developer Path',
    slug: 'react-developer-path',
    description:
      'Comprehensive React development from basics to advanced patterns',
    duration: '16 weeks',
    difficulty: 'intermediate',
    color: '#61DAFB',
    icon: 'atom',
    order: 2,
    isActive: true,
    estimatedHours: 200,
    prerequisites: ['JavaScript fundamentals', 'HTML/CSS basics'],
    learningObjectives: [
      'Master React components and hooks',
      'Build scalable React applications',
      'Implement state management solutions',
      'Deploy React applications',
    ],
  },
  {
    name: 'Full-Stack Developer',
    slug: 'full-stack-developer',
    description: 'Complete full-stack development with modern technologies',
    duration: '24 weeks',
    difficulty: 'advanced',
    color: '#8B5CF6',
    icon: 'server',
    order: 3,
    isActive: true,
    estimatedHours: 400,
    prerequisites: ['Frontend fundamentals', 'Backend basics'],
    learningObjectives: [
      'Build complete web applications',
      'Implement authentication and authorization',
      'Design and optimize databases',
      'Deploy and scale applications',
    ],
  },
  {
    name: 'System Design Mastery',
    slug: 'system-design-mastery',
    description: 'Advanced system design and architecture patterns',
    duration: '8 weeks',
    difficulty: 'expert',
    color: '#EF4444',
    icon: 'network',
    order: 4,
    isActive: true,
    estimatedHours: 160,
    prerequisites: ['5+ years development experience'],
    learningObjectives: [
      'Design scalable distributed systems',
      'Implement microservices architecture',
      'Optimize system performance',
      'Handle high-traffic applications',
    ],
  },
];

async function seedCardsAndPlans() {
  try {
    console.log('🌱 Starting Cards and Plans seeding...');

    let cardsSuccessCount = 0;
    let cardsErrorCount = 0;
    let plansSuccessCount = 0;
    let plansErrorCount = 0;

    // Seed Cards
    console.log('🃏 Seeding Cards...');
    for (const card of sampleCards) {
      try {
        const response = await fetch('http://localhost:3000/api/cards', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(card),
        });

        if (response.ok) {
          console.log(`✅ Seeded card: ${card.name}`);
          cardsSuccessCount++;
        } else {
          const error = await response.text();
          console.error(`❌ Failed to seed card ${card.name}:`, error);
          cardsErrorCount++;
        }
      } catch (error) {
        console.error(`❌ Error seeding card ${card.name}:`, error);
        cardsErrorCount++;
      }
    }

    // Seed Plans
    console.log('📋 Seeding Plans...');
    for (const plan of samplePlans) {
      try {
        const response = await fetch('http://localhost:3000/api/plans', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(plan),
        });

        if (response.ok) {
          console.log(`✅ Seeded plan: ${plan.name}`);
          plansSuccessCount++;
        } else {
          const error = await response.text();
          console.error(`❌ Failed to seed plan ${plan.name}:`, error);
          plansErrorCount++;
        }
      } catch (error) {
        console.error(`❌ Error seeding plan ${plan.name}:`, error);
        plansErrorCount++;
      }
    }

    console.log(`\n🎉 Cards and Plans seeding completed!`);
    console.log(
      `🃏 Cards - Successfully seeded: ${cardsSuccessCount}, Failed: ${cardsErrorCount}`
    );
    console.log(
      `📋 Plans - Successfully seeded: ${plansSuccessCount}, Failed: ${plansErrorCount}`
    );

    // Verify the seeding
    console.log('\n🔍 Verifying seeded data...');
    try {
      const cardsResponse = await fetch('http://localhost:3000/api/cards');
      const plansResponse = await fetch('http://localhost:3000/api/plans');

      if (cardsResponse.ok) {
        const cardsResult = await cardsResponse.json();
        console.log(`📊 Total cards in database: ${cardsResult.count}`);
      }

      if (plansResponse.ok) {
        const plansResult = await plansResponse.json();
        console.log(`📊 Total plans in database: ${plansResult.count}`);
      }
    } catch (error) {
      console.error('Error verifying data:', error);
    }
  } catch (error) {
    console.error('💥 Error during Cards and Plans seeding:', error);
    process.exit(1);
  }
}

// Run the seeder
seedCardsAndPlans()
  .then(() => {
    console.log('✨ Cards and Plans seeding process completed successfully!');
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Cards and Plans seeding process failed:', error);
    process.exit(1);
  });
