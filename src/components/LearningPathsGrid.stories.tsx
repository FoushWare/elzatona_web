import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LearningPathsGrid } from './LearningPathsGrid';
import { LearningPath } from './LearningPathCard';

const meta: Meta<typeof LearningPathsGrid> = {
  title: 'Components/LearningPathsGrid',
  component: LearningPathsGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A grid component that displays learning path cards with filtering and empty state handling.',
      },
    },
  },
  argTypes: {
    paths: {
      control: 'object',
      description: 'Array of learning path objects',
    },
    collapsedCards: {
      control: 'object',
      description: 'Set of collapsed card IDs',
    },
    onToggleCard: {
      action: 'toggleCard',
      description: 'Callback when a card is toggled',
    },
    onClearFilters: {
      action: 'clearFilters',
      description: 'Callback when filters are cleared',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const samplePaths: LearningPath[] = [
  {
    id: 'frontend-basics',
    title: 'Frontend Basics',
    description:
      'Learn HTML, CSS, and JavaScript fundamentals. This comprehensive path covers everything from basic markup to modern JavaScript features.',
    difficulty: 'beginner',
    estimatedTime: 40,
    questionCount: 25,
    resources: ['resource1', 'resource2', 'resource3'],
    targetSkills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    prerequisites: ['Basic computer skills', 'Text editor knowledge'],
  },
  {
    id: 'react-mastery',
    title: 'React Mastery',
    description:
      'Master React development with hooks, context, performance optimization, and advanced patterns. Build scalable applications with modern React practices.',
    difficulty: 'intermediate',
    estimatedTime: 60,
    questionCount: 40,
    resources: ['resource4', 'resource5'],
    targetSkills: ['React', 'Hooks', 'Context API', 'State Management'],
    prerequisites: ['JavaScript ES6+', 'HTML/CSS'],
  },
  {
    id: 'advanced-css',
    title: 'Advanced CSS Mastery',
    description:
      'Advanced CSS techniques and modern layouts including Grid, Flexbox, animations, and responsive design patterns.',
    difficulty: 'advanced',
    estimatedTime: 30,
    questionCount: 20,
    resources: ['resource6', 'resource7', 'resource8'],
    targetSkills: ['CSS Grid', 'Flexbox', 'Animations', 'Custom Properties'],
  },
];

const manyPaths: LearningPath[] = Array.from({ length: 8 }, (_, i) => ({
  id: `path-${i + 1}`,
  title: `Learning Path ${i + 1}`,
  description: `Description for learning path ${i + 1}. This is a comprehensive learning journey.`,
  difficulty: ['beginner', 'intermediate', 'advanced'][i % 3] as
    | 'beginner'
    | 'intermediate'
    | 'advanced',
  estimatedTime: 20 + i * 10,
  questionCount: 15 + i * 5,
  resources: [`resource${i + 1}a`, `resource${i + 1}b`],
  targetSkills: [`Skill ${i + 1}A`, `Skill ${i + 1}B`, `Skill ${i + 1}C`],
}));

export const Default: Story = {
  args: {
    paths: samplePaths,
    collapsedCards: new Set([
      'frontend-basics',
      'react-mastery',
      'advanced-css',
    ]),
  },
};

export const SomeExpanded: Story = {
  args: {
    paths: samplePaths,
    collapsedCards: new Set(['frontend-basics']), // Only frontend-basics collapsed
  },
};

export const AllExpanded: Story = {
  args: {
    paths: samplePaths,
    collapsedCards: new Set(), // All expanded
  },
};

export const ManyPaths: Story = {
  args: {
    paths: manyPaths,
    collapsedCards: new Set(manyPaths.map(p => p.id)),
  },
};

export const EmptyState: Story = {
  args: {
    paths: [],
    collapsedCards: new Set(),
  },
};

export const SinglePath: Story = {
  args: {
    paths: [samplePaths[0]],
    collapsedCards: new Set(['frontend-basics']),
  },
};

export const LongTitles: Story = {
  args: {
    paths: [
      {
        ...samplePaths[0],
        title:
          'Advanced Frontend Development with Modern JavaScript and React Ecosystem',
      },
      {
        ...samplePaths[1],
        title:
          'Comprehensive Backend Development with Node.js, Express, and Database Management',
      },
    ],
    collapsedCards: new Set(),
  },
};

export const LongDescriptions: Story = {
  args: {
    paths: [
      {
        ...samplePaths[0],
        description:
          'This is an extremely comprehensive learning path that covers all aspects of modern frontend development. You will learn HTML5 semantic elements, advanced CSS techniques including Grid and Flexbox, modern JavaScript features like ES6+, async/await, modules, and much more. The path also includes React fundamentals, state management, routing, testing, and deployment strategies.',
      },
    ],
    collapsedCards: new Set(),
  },
};
