export interface CompanyQuestion {
  id: string;
  question: string;
  answer: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  tags?: string[];
}

export interface CompanySection {
  id: string;
  name: string;
  description: string;
  questions: CompanyQuestion[];
  logo?: string;
  website?: string;
}

export const companySections: CompanySection[] = [
  {
    id: 'dualentry',
    name: 'DualEntry',
    description:
      'AI-powered accounting platform revolutionizing traditional systems',
    logo: '🤖',
    website: 'https://dualentry.com',
    questions: [
      {
        id: 'de-001',
        question: "What excites you about DualEntry's mission?",
        answer:
          "I'm really excited about DualEntry's mission to revolutionize accounting with AI. Traditional systems are outdated and cumbersome, but DualEntry is starting from scratch with modern technology. I like the focus on automation and speed—it aligns with my passion for building products that save people time and create real business value.",
        category: 'Mission & Vision',
        difficulty: 'easy',
        tags: ['mission', 'excitement', 'AI', 'accounting'],
      },
      {
        id: 'de-002',
        question:
          'How do you feel about working in a fast-paced startup environment?',
        answer:
          'I thrive in fast-paced environments. In my past projects, I often worked under tight deadlines and shifting priorities. I stay organized, communicate clearly with my team, and break down large tasks into smaller milestones. I enjoy the challenge because it pushes me to grow and deliver results faster.',
        category: 'Work Environment',
        difficulty: 'medium',
        tags: ['startup', 'fast-paced', 'time-management', 'teamwork'],
      },
      {
        id: 'de-003',
        question:
          'DualEntry emphasizes velocity (fast feature delivery). How do you balance speed with code quality?',
        answer:
          "I believe speed and quality don't have to be opposites. I use practices like writing unit tests, setting up automated checks, and doing peer reviews to keep quality high without slowing delivery. For example, in a recent project, we implemented CI/CD pipelines so we could release multiple times a day with confidence.",
        category: 'Technical Skills',
        difficulty: 'medium',
        tags: ['velocity', 'code-quality', 'CI/CD', 'best-practices'],
      },
      {
        id: 'de-004',
        question:
          "What do you think about DualEntry's product and its competition?",
        answer:
          "I see huge potential. Legacy systems like Oracle NetSuite and Microsoft Dynamics are powerful but slow to innovate. DualEntry's advantage is starting fresh with AI and modern UX. Features like AI reconciliation and conversational interfaces are game changers. If we keep listening to customers and iterating fast, DualEntry can take significant market share.",
        category: 'Product Knowledge',
        difficulty: 'medium',
        tags: ['product', 'competition', 'market-analysis', 'innovation'],
      },
      {
        id: 'de-005',
        question:
          'How do you approach learning complex domains like accounting?',
        answer:
          'I approach it step by step—first understanding the core concepts, then connecting them to practical examples. I use documentation, internal resources, and direct collaboration with domain experts. In fact, I enjoy learning new domains because it helps me design better user experiences and technical solutions.',
        category: 'Learning & Growth',
        difficulty: 'medium',
        tags: [
          'learning',
          'domain-knowledge',
          'collaboration',
          'problem-solving',
        ],
      },
      {
        id: 'de-006',
        question:
          'DualEntry expects engineers to deploy to production on Day 1. How do you feel about that?',
        answer:
          'I like that approach—it builds momentum and confidence early. I usually set up my local environment quickly, ask clarifying questions, and focus on small, high-impact contributions in the beginning. I believe shipping early and often is the best way to learn a new codebase and start delivering value.',
        category: 'Onboarding',
        difficulty: 'easy',
        tags: ['deployment', 'onboarding', 'confidence', 'value-delivery'],
      },
      {
        id: 'de-007',
        question:
          'DualEntry is global, with core collaboration hours between Europe and New York. How do you handle remote teamwork across time zones?',
        answer:
          "I've worked with distributed teams before, and I find that clear communication and documentation are essential. I make sure to be available during overlap hours for real-time collaboration and use async tools like Slack, Notion, or GitHub to keep progress transparent. This way, no matter the time zone, the team stays aligned.",
        category: 'Remote Work',
        difficulty: 'medium',
        tags: ['remote-work', 'time-zones', 'communication', 'collaboration'],
      },
    ],
  },
];
