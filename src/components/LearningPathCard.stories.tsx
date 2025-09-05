import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LearningPathCard } from './LearningPathCard';

const meta: Meta<typeof LearningPathCard> = {
  title: 'Components/LearningPathCard',
  component: LearningPathCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A collapsible card component for displaying learning path information including title, description, difficulty, skills, prerequisites, and resources.',
      },
    },
  },
  argTypes: {
    path: {
      control: 'object',
      description: 'Learning path data object',
    },
    isCollapsed: {
      control: 'boolean',
      description: 'Whether the card is collapsed',
    },
    onToggle: {
      action: 'toggle',
      description: 'Callback when card is toggled',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const samplePath = {
  id: 'frontend-basics',
  title: 'Frontend Basics',
  description:
    'Learn the fundamentals of frontend development including HTML, CSS, and JavaScript. This comprehensive path covers everything from basic markup to modern JavaScript features.',
  difficulty: 'beginner' as const,
  estimatedTime: 40,
  questionCount: 25,
  targetSkills: [
    'HTML',
    'CSS',
    'JavaScript',
    'Responsive Design',
    'DOM Manipulation',
  ],
  prerequisites: ['Basic computer skills', 'Text editor knowledge'],
  resources: ['html-basics', 'css-fundamentals', 'javascript-intro'],
};

const advancedPath = {
  id: 'react-mastery',
  title: 'React Mastery',
  description:
    'Master React development with hooks, context, performance optimization, and advanced patterns. Build scalable applications with modern React practices.',
  difficulty: 'advanced' as const,
  estimatedTime: 80,
  questionCount: 50,
  targetSkills: [
    'React Hooks',
    'Context API',
    'Performance Optimization',
    'Testing',
    'State Management',
  ],
  prerequisites: ['JavaScript ES6+', 'HTML/CSS', 'Basic React knowledge'],
  resources: ['react-official-docs', 'advanced-react-patterns'],
};

const minimalPath = {
  id: 'css-fundamentals',
  title: 'CSS Fundamentals',
  description: 'Learn CSS basics and styling techniques.',
  difficulty: 'beginner' as const,
  estimatedTime: 20,
  questionCount: 15,
  targetSkills: ['CSS Selectors', 'Box Model', 'Flexbox'],
  prerequisites: [],
  resources: [],
};

export const Default: Story = {
  args: {
    path: samplePath,
    isCollapsed: true,
  },
};

export const Expanded: Story = {
  args: {
    path: samplePath,
    isCollapsed: false,
  },
};

export const AdvancedPath: Story = {
  args: {
    path: advancedPath,
    isCollapsed: true,
  },
};

export const AdvancedPathExpanded: Story = {
  args: {
    path: advancedPath,
    isCollapsed: false,
  },
};

export const MinimalPath: Story = {
  args: {
    path: minimalPath,
    isCollapsed: true,
  },
};

export const MinimalPathExpanded: Story = {
  args: {
    path: minimalPath,
    isCollapsed: false,
  },
};

export const LongTitle: Story = {
  args: {
    path: {
      ...samplePath,
      title:
        'Advanced Frontend Development with Modern JavaScript and React Ecosystem',
    },
    isCollapsed: true,
  },
};

export const LongDescription: Story = {
  args: {
    path: {
      ...samplePath,
      description:
        'This is an extremely comprehensive learning path that covers all aspects of modern frontend development. You will learn HTML5 semantic elements, advanced CSS techniques including Grid and Flexbox, modern JavaScript features like ES6+, async/await, modules, and much more. The path also includes React fundamentals, state management, routing, testing, and deployment strategies.',
    },
    isCollapsed: false,
  },
};

export const ManySkills: Story = {
  args: {
    path: {
      ...samplePath,
      targetSkills: [
        'HTML5',
        'CSS3',
        'JavaScript ES6+',
        'React',
        'Vue.js',
        'Angular',
        'TypeScript',
        'Node.js',
        'Express',
        'MongoDB',
        'PostgreSQL',
        'Docker',
        'Kubernetes',
        'AWS',
        'Testing',
        'CI/CD',
      ],
    },
    isCollapsed: false,
  },
};

export const ManyPrerequisites: Story = {
  args: {
    path: {
      ...samplePath,
      prerequisites: [
        'Basic computer skills',
        'Text editor knowledge',
        'Command line basics',
        'Git fundamentals',
        'Basic programming concepts',
        'Web browser understanding',
      ],
    },
    isCollapsed: false,
  },
};

export const ManyResources: Story = {
  args: {
    path: {
      ...samplePath,
      resources: [
        'html-basics',
        'css-fundamentals',
        'javascript-intro',
        'frontend-best-practices',
        'responsive-design-patterns',
      ],
    },
    isCollapsed: false,
  },
};
