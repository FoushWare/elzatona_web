import type { Meta, StoryObj } from '@storybook/nextjs';
import { LearningPathCard } from '@/components/LearningPathCard';

const meta: Meta<typeof LearningPathCard> = {
  title: 'Components/LearningPathCard',
  component: LearningPathCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A card component that displays learning path information with expand/collapse functionality.',
      },
    },
  },
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
      description: 'Callback function when card is toggled',
      action: 'toggled',
    },
    cardRef: {
      description: 'Ref callback for the card element',
      action: 'ref-called',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultLearningPath = {
  id: 'frontend-basics',
  title: 'Frontend Basics',
  description: 'Learn HTML, CSS, and JavaScript fundamentals',
  difficulty: 'beginner' as const,
  estimatedTime: 40,
  questionCount: 25,
  resources: [
    {
      id: 'resource1',
      title: 'HTML Tutorial',
      url: 'https://example.com/html',
      type: 'documentation',
    },
    {
      id: 'resource2',
      title: 'CSS Guide',
      url: 'https://example.com/css',
      type: 'tutorial',
    },
  ],
  targetSkills: ['HTML', 'CSS', 'JavaScript'],
  prerequisites: ['Basic computer skills'],
};

export const Default: Story = {
  args: {
    path: defaultLearningPath,
    isCollapsed: true,
    onToggle: () => {},
    cardRef: () => {},
  },
};

export const Expanded: Story = {
  args: {
    path: defaultLearningPath,
    isCollapsed: false,
    onToggle: () => {},
    cardRef: () => {},
  },
};

export const Intermediate: Story = {
  args: {
    path: {
      ...defaultLearningPath,
      id: 'react-mastery',
      title: 'React Mastery',
      description: 'Master React development with hooks and patterns',
      difficulty: 'intermediate' as const,
      estimatedTime: 60,
      questionCount: 30,
      resources: [
        {
          id: 'resource3',
          title: 'React Guide',
          url: 'https://example.com/react',
          type: 'tutorial',
        },
      ],
      targetSkills: ['React', 'Hooks', 'State Management'],
      prerequisites: ['JavaScript ES6+'],
    },
    isCollapsed: false,
    onToggle: () => {},
    cardRef: () => {},
  },
};

export const Advanced: Story = {
  args: {
    path: {
      ...defaultLearningPath,
      id: 'advanced-css',
      title: 'Advanced CSS Mastery',
      description: 'Advanced CSS techniques and modern layouts',
      difficulty: 'advanced' as const,
      estimatedTime: 30,
      questionCount: 20,
      resources: [
        {
          id: 'resource4',
          title: 'CSS Grid Guide',
          url: 'https://example.com/css-grid',
          type: 'documentation',
        },
      ],
      targetSkills: ['CSS Grid', 'Flexbox', 'Animations'],
      prerequisites: ['CSS Basics'],
    },
    isCollapsed: false,
    onToggle: () => {},
    cardRef: () => {},
  },
};

export const NoQuestions: Story = {
  args: {
    path: {
      ...defaultLearningPath,
      questionCount: 0,
    },
    isCollapsed: false,
    onToggle: () => {},
    cardRef: () => {},
  },
};

export const LongContent: Story = {
  args: {
    path: {
      ...defaultLearningPath,
      title: 'Very Long Learning Path Title That Might Cause Layout Issues',
      description:
        'This is a very long description that might cause layout issues if not handled properly and should wrap correctly to maintain good readability.',
      targetSkills: [
        'HTML',
        'CSS',
        'JavaScript',
        'React',
        'Vue',
        'Angular',
        'TypeScript',
        'Node.js',
        'Express',
        'MongoDB',
      ],
      prerequisites: [
        'Basic computer skills',
        'Internet connection',
        'Text editor',
        'Browser',
        'Patience',
        'Dedication',
      ],
    },
    isCollapsed: false,
    onToggle: () => {},
    cardRef: () => {},
  },
};

export const MinimalData: Story = {
  args: {
    path: {
      id: 'minimal-path',
      title: 'Minimal Path',
      description: 'A path with minimal data',
      difficulty: 'beginner' as const,
      estimatedTime: 10,
      questionCount: 5,
      resources: [],
      targetSkills: [],
      prerequisites: [],
    },
    isCollapsed: false,
    onToggle: () => {},
    cardRef: () => {},
  },
};

export const Interactive: Story = {
  args: {
    path: defaultLearningPath,
    isCollapsed: true,
    onToggle: () => {},
    cardRef: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          'Click on the card header to toggle between collapsed and expanded states.',
      },
    },
  },
};
