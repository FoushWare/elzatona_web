import { PreparationGuide } from '@/types/preparationGuide';

export const preparationGuides: PreparationGuide[] = [
  {
    id: 'frontend-interview-playbook',
    title: 'Front End Interview Playbook',
    description: 'The definitive guide to front end interviews with end-to-end coverage, tips for all question types, and 500+ practice questions.',
    difficulty: 'all-levels',
    estimatedTime: 40,
    color: 'from-blue-600 to-purple-600',
    icon: '📚',
    sections: [
      {
        title: 'Introduction',
        description: 'Everything you need to know - from types of questions to preparation tactics',
        readingTime: 10,
        topics: ['Interview types', 'Preparation strategies', 'Question categories']
      },
      {
        title: 'Coding Interviews',
        description: 'Front end coding interviews, JavaScript coding, and data structures & algorithms',
        readingTime: 21,
        topics: ['JavaScript coding', 'DSA for frontend', 'Coding best practices']
      },
      {
        title: 'User Interface Interviews',
        description: 'UI coding interviews, cheatsheets, and API design principles',
        readingTime: 34,
        topics: ['UI components', 'Accessibility', 'API design']
      },
      {
        title: 'System Design Interviews',
        description: 'Front end system design interviews with quick start guide',
        readingTime: 2,
        topics: ['System design', 'Architecture', 'Scalability']
      },
      {
        title: 'Quiz Interviews',
        description: 'Quiz-style front end interview questions with 100+ practice questions',
        readingTime: 4,
        topics: ['Technical concepts', 'Best practices', 'Common pitfalls']
      },
      {
        title: 'Resume Preparation',
        description: 'Ultimate guide to front end engineer resumes with writing tips and samples',
        readingTime: 7,
        topics: ['Resume writing', 'Portfolio', 'Best practices']
      }
    ],
    features: [
      '500+ practice questions',
      'End-to-end guide',
      'Tips for all question types',
      'Ex-interviewer insights',
      'Company-specific strategies',
      'Mock interview scenarios'
    ],
    targetSkills: ['Interview Skills', 'Technical Knowledge', 'Problem Solving', 'Communication']
  },
  {
    id: 'gfe75',
    title: 'GFE 75 - Most Important Questions',
    description: 'The smallest list of practice questions that gets you the most mileage in your preparation. Covers the most commonly asked front end interview topics.',
    difficulty: 'intermediate',
    estimatedTime: 2222,
    color: 'from-green-600 to-teal-600',
    icon: '🎯',
    sections: [
      {
        title: 'JavaScript Functions',
        description: 'Core JavaScript implementation questions',
        readingTime: 600,
        topics: ['Debounce', 'Throttle', 'Promise.all', 'Event Emitter', 'Deep Clone', 'Memoize']
      },
      {
        title: 'User Interface Coding',
        description: 'Practical UI component building',
        readingTime: 800,
        topics: ['Todo List', 'Contact Form', 'Tabs', 'Accordion', 'Modal', 'Data Table']
      },
      {
        title: 'System Design',
        description: 'Frontend system design challenges',
        readingTime: 600,
        topics: ['News Feed', 'Autocomplete', 'Image Carousel', 'Chat App', 'Video Streaming']
      },
      {
        title: 'Quiz Questions',
        description: 'Technical concept questions',
        readingTime: 222,
        topics: ['JavaScript fundamentals', 'CSS concepts', 'Browser APIs', 'Performance']
      }
    ],
    features: [
      '75 essential questions',
      'Code in browser',
      'Official solutions',
      'Test cases',
      'Progress tracking',
      'High-frequency topics'
    ],
    targetSkills: ['JavaScript', 'React', 'CSS', 'System Design', 'Problem Solving']
  },
  {
    id: 'blind75',
    title: 'Blind 75 for Front End',
    description: 'The most important front end interview questions to practice, with answers and test cases. Curated by big tech ex-interviewers.',
    difficulty: 'advanced',
    estimatedTime: 1500,
    color: 'from-orange-600 to-red-600',
    icon: '🧠',
    sections: [
      {
        title: 'JavaScript Functions',
        description: 'Advanced JavaScript implementation challenges',
        readingTime: 500,
        topics: ['Array methods', 'Promise utilities', 'DOM manipulation', 'Event handling']
      },
      {
        title: 'UI Components',
        description: 'Complex UI component implementations',
        readingTime: 600,
        topics: ['Advanced forms', 'Complex layouts', 'Interactive components', 'State management']
      },
      {
        title: 'System Design',
        description: 'Frontend system design challenges',
        readingTime: 400,
        topics: ['Component architecture', 'State design', 'Performance optimization', 'Scalability']
      }
    ],
    features: [
      '75 algorithm questions',
      'Data structure mastery',
      'System design patterns',
      'Complexity analysis',
      'Optimization techniques',
      'Real-world applications'
    ],
    targetSkills: ['Algorithms', 'Data Structures', 'System Design', 'Performance', 'Architecture']
  },
  {
    id: 'system-design-playbook',
    title: 'Front End System Design Playbook',
    description: 'Comprehensive guide to frontend system design interviews with architecture patterns, scalability strategies, and real-world case studies.',
    difficulty: 'advanced',
    estimatedTime: 800,
    color: 'from-purple-600 to-pink-600',
    icon: '🏗️',
    sections: [
      {
        title: 'Architecture Fundamentals',
        description: 'Core principles of frontend architecture',
        readingTime: 120,
        topics: ['Component design', 'State management', 'Data flow', 'Module patterns']
      },
      {
        title: 'Scalability Strategies',
        description: 'Building scalable frontend applications',
        readingTime: 180,
        topics: ['Code splitting', 'Lazy loading', 'Caching strategies', 'Performance optimization']
      },
      {
        title: 'Performance Optimization',
        description: 'Techniques for high-performance frontend applications',
        readingTime: 150,
        topics: ['Bundle optimization', 'Rendering optimization', 'Network optimization', 'Memory management']
      },
      {
        title: 'Security Best Practices',
        description: 'Frontend security considerations and implementations',
        readingTime: 100,
        topics: ['XSS prevention', 'CSRF protection', 'Content Security Policy', 'Authentication']
      },
      {
        title: 'Testing Methodologies',
        description: 'Comprehensive testing strategies for frontend applications',
        readingTime: 120,
        topics: ['Unit testing', 'Integration testing', 'E2E testing', 'Performance testing']
      },
      {
        title: 'Case Studies',
        description: 'Real-world system design examples',
        readingTime: 130,
        topics: ['E-commerce platforms', 'Social media apps', 'Content management systems', 'Real-time applications']
      }
    ],
    features: [
      'Architecture patterns',
      'Scalability strategies',
      'Performance optimization',
      'Security best practices',
      'Testing methodologies',
      'Case studies'
    ],
    targetSkills: ['System Design', 'Architecture', 'Performance', 'Security', 'Testing', 'Scalability']
  }
];

export function getPreparationGuideById(id: string): PreparationGuide | undefined {
  return preparationGuides.find(guide => guide.id === id);
}

export function getPreparationGuidesByDifficulty(difficulty: string): PreparationGuide[] {
  return preparationGuides.filter(guide => guide.difficulty === difficulty);
}

export function getFeaturedPreparationGuides(): PreparationGuide[] {
  return preparationGuides.filter(guide => guide.featured);
}
