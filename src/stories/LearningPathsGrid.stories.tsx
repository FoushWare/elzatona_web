import type { Meta, StoryObj } from '@storybook/nextjs';
import { LearningPathsGrid } from '@/components/LearningPathsGrid';

const meta: Meta<typeof LearningPathsGrid> = {
  title: 'Components/LearningPathsGrid',
  component: LearningPathsGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A grid component that displays multiple learning path cards in a responsive layout.',
      },
    },
  },
  argTypes: {
    paths: {
      description: 'Array of learning path objects',
      control: 'object',
    },
    collapsedCards: {
      description: 'Set of collapsed card IDs',
      control: 'object',
    },
    onToggleCard: {
      description: 'Callback function when a card is toggled',
      action: 'card-toggled',
    },
    cardRefs: {
      description: 'Ref object for card elements',
      control: 'object',
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockLearningPaths = [
  {
    id: 'frontend-basics',
    name: 'Frontend Basics',
    title: 'Frontend Basics',
    description: 'Learn HTML, CSS, and JavaScript fundamentals',
    difficulty: 'beginner' as const,
    estimatedTime: 40,
    questionCount: 25,
    icon: 'book-open',
    color: 'blue',
    order: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    resources: [
      {
        id: 'resource1',
        title: 'HTML Tutorial',
        url: 'https://example.com/html',
        type: 'documentation',
      },
    ],
    targetSkills: ['HTML', 'CSS', 'JavaScript'],
    prerequisites: ['Basic computer skills'],
  },
  {
    id: 'react-mastery',
    name: 'React Mastery',
    title: 'React Mastery',
    description: 'Master React development with hooks and patterns',
    difficulty: 'intermediate' as const,
    estimatedTime: 60,
    questionCount: 30,
    icon: 'code',
    color: 'purple',
    order: 2,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    resources: [
      {
        id: 'resource2',
        title: 'React Guide',
        url: 'https://example.com/react',
        type: 'tutorial',
      },
    ],
    targetSkills: ['React', 'Hooks', 'State Management'],
    prerequisites: ['JavaScript ES6+'],
  },
  {
    id: 'advanced-css',
    name: 'Advanced CSS Mastery',
    title: 'Advanced CSS Mastery',
    description: 'Advanced CSS techniques and modern layouts',
    difficulty: 'advanced' as const,
    estimatedTime: 30,
    questionCount: 20,
    icon: 'palette',
    color: 'green',
    order: 3,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    resources: [
      {
        id: 'resource3',
        title: 'CSS Grid Guide',
        url: 'https://example.com/css-grid',
        type: 'documentation',
      },
    ],
    targetSkills: ['CSS Grid', 'Flexbox', 'Animations'],
    prerequisites: ['CSS Basics'],
  },
];

export const Default: Story = {
  args: {
    paths: mockLearningPaths,
    collapsedCards: new Set([
      'frontend-basics',
      'react-mastery',
      'advanced-css',
    ]),
    onToggleCard: () => {},
    cardRefs: { current: {} },
  },
};

export const AllExpanded: Story = {
  args: {
    paths: mockLearningPaths,
    collapsedCards: new Set(),
    onToggleCard: () => {},
    cardRefs: { current: {} },
  },
};

export const MixedStates: Story = {
  args: {
    paths: mockLearningPaths,
    collapsedCards: new Set(['frontend-basics']), // Only first card collapsed
    onToggleCard: () => {},
    cardRefs: { current: {} },
  },
};

export const SingleCard: Story = {
  args: {
    paths: [mockLearningPaths[0]],
    collapsedCards: new Set(),
    onToggleCard: () => {},
    cardRefs: { current: {} },
  },
};

export const ManyCards: Story = {
  args: {
    paths: Array(6)
      .fill(null)
      .map((_, index) => {
        const basePath = { ...mockLearningPaths[0] };
        return {
          ...basePath,
          id: `path-${index}`,
          title: `Learning Path ${index + 1}`,
          description: `Description for learning path ${index + 1}`,
          difficulty: ['beginner', 'intermediate', 'advanced'][index % 3] as
            | 'beginner'
            | 'intermediate'
            | 'advanced',
          estimatedTime: 20 + index * 10,
          questionCount: 10 + index * 5,
        };
      }),
    collapsedCards: new Set(),
    onToggleCard: () => {},
    cardRefs: { current: {} },
  },
};

export const EmptyState: Story = {
  args: {
    paths: [],
    collapsedCards: new Set(),
    onToggleCard: () => {},
    cardRefs: { current: {} },
  },
};

export const CustomClassName: Story = {
  args: {
    paths: mockLearningPaths,
    collapsedCards: new Set(),
    onToggleCard: () => {},
    cardRefs: { current: {} },
    className: 'custom-grid-class',
  },
};

export const LongTitles: Story = {
  args: {
    paths: mockLearningPaths.map((path, index) => ({
      ...path,
      title: `Very Long Learning Path Title ${index + 1} That Might Cause Layout Issues`,
      description: `This is a very long description for learning path ${index + 1} that might cause layout issues if not handled properly.`,
    })),
    collapsedCards: new Set(),
    onToggleCard: () => {},
    cardRefs: { current: {} },
  },
};

export const DifferentDifficulties: Story = {
  args: {
    paths: [
      { ...mockLearningPaths[0], difficulty: 'beginner' as const },
      { ...mockLearningPaths[1], difficulty: 'intermediate' as const },
      { ...mockLearningPaths[2], difficulty: 'advanced' as const },
    ],
    collapsedCards: new Set(),
    onToggleCard: () => {},
    cardRefs: { current: {} },
  },
};

export const Interactive: Story = {
  args: {
    paths: mockLearningPaths,
    collapsedCards: new Set([
      'frontend-basics',
      'react-mastery',
      'advanced-css',
    ]),
    onToggleCard: () => {},
    cardRefs: { current: {} },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Click on card headers to toggle between collapsed and expanded states. The grid layout will adjust automatically.',
      },
    },
  },
};
