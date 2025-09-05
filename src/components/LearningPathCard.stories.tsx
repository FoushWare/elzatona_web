import type { Meta, StoryObj } from '@storybook/nextjs';
import { LearningPathCard } from './LearningPathCard';

const meta: Meta<typeof LearningPathCard> = {
  title: 'Components/Learning Path Card',
  component: LearningPathCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A collapsible card component that displays learning path information with accordion functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    path: {
      description: 'The learning path data object',
      control: 'object',
    },
    isCollapsed: {
      description: 'Whether the card is collapsed or expanded',
      control: 'boolean',
    },
    onToggle: {
      description: 'Callback function when the card is toggled',
      action: 'toggled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockLearningPath = {
  id: 'frontend-basics',
  title: 'Frontend Basics',
  description:
    'Learn HTML, CSS, and JavaScript fundamentals to build modern web applications. This comprehensive path covers everything from basic markup to advanced styling and interactive functionality.',
  difficulty: 'beginner' as const,
  estimatedHours: 20,
  questionCount: 116,
  category: 'frontend',
  skills: [
    'HTML',
    'CSS',
    'JavaScript',
    'DOM Manipulation',
    'Responsive Design',
  ],
  prerequisites: [],
  resources: [
    {
      title: 'MDN Web Docs',
      url: 'https://developer.mozilla.org',
      type: 'documentation' as const,
    },
    {
      title: 'FreeCodeCamp',
      url: 'https://freecodecamp.org',
      type: 'course' as const,
    },
  ],
};

export const Collapsed: Story = {
  args: {
    path: mockLearningPath,
    isCollapsed: true,
    onToggle: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          'The default collapsed state showing only the header with title, question count, and arrow.',
      },
    },
  },
};

export const Expanded: Story = {
  args: {
    path: mockLearningPath,
    isCollapsed: false,
    onToggle: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          'The expanded state showing all learning path details including description, skills, and action buttons.',
      },
    },
  },
};

export const IntermediateLevel: Story = {
  args: {
    path: {
      ...mockLearningPath,
      id: 'react-mastery',
      title: 'React Mastery',
      description:
        'Master React development with hooks, context, and advanced patterns. Learn to build scalable and maintainable React applications.',
      difficulty: 'intermediate' as const,
      estimatedHours: 30,
      questionCount: 85,
      skills: ['React', 'Hooks', 'Context API', 'State Management', 'Testing'],
      prerequisites: ['frontend-basics'],
    },
    isCollapsed: false,
    onToggle: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          'An intermediate level learning path with more advanced content and prerequisites.',
      },
    },
  },
};

export const AdvancedLevel: Story = {
  args: {
    path: {
      ...mockLearningPath,
      id: 'system-design',
      title: 'System Design',
      description:
        'Learn to design large-scale distributed systems. Cover scalability, reliability, and performance optimization for enterprise applications.',
      difficulty: 'advanced' as const,
      estimatedHours: 40,
      questionCount: 65,
      skills: [
        'System Architecture',
        'Scalability',
        'Load Balancing',
        'Caching',
        'Microservices',
      ],
      prerequisites: ['react-mastery', 'backend-basics'],
    },
    isCollapsed: false,
    onToggle: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          'An advanced level learning path with complex topics and multiple prerequisites.',
      },
    },
  },
};

export const WithManySkills: Story = {
  args: {
    path: {
      ...mockLearningPath,
      skills: [
        'HTML',
        'CSS',
        'JavaScript',
        'DOM Manipulation',
        'Responsive Design',
        'Accessibility',
        'Performance Optimization',
        'Browser APIs',
        'ES6+ Features',
        'Async Programming',
        'Error Handling',
        'Debugging',
      ],
    },
    isCollapsed: false,
    onToggle: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          'A learning path with many skills to test the layout and wrapping behavior.',
      },
    },
  },
};

export const WithManyResources: Story = {
  args: {
    path: {
      ...mockLearningPath,
      resources: [
        {
          title: 'MDN Web Docs',
          url: 'https://developer.mozilla.org',
          type: 'documentation' as const,
        },
        {
          title: 'FreeCodeCamp',
          url: 'https://freecodecamp.org',
          type: 'course' as const,
        },
        {
          title: 'Codecademy',
          url: 'https://codecademy.com',
          type: 'course' as const,
        },
        {
          title: 'W3Schools',
          url: 'https://w3schools.com',
          type: 'documentation' as const,
        },
        {
          title: 'CSS-Tricks',
          url: 'https://css-tricks.com',
          type: 'blog' as const,
        },
        {
          title: 'JavaScript.info',
          url: 'https://javascript.info',
          type: 'tutorial' as const,
        },
      ],
    },
    isCollapsed: false,
    onToggle: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          'A learning path with many resources to test the resource list layout.',
      },
    },
  },
};
