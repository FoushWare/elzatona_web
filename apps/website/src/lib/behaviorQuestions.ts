export interface BehaviorQuestion {
  id: string;
  question: string;
  category: 'behavioral';
  difficulty: 'medium';
  exampleAnswer: string;
  tips: string[];
  followUpQuestions?: string[];
  tags: string[];
}

export const behaviorQuestions: BehaviorQuestion[] = [
  {
    id: 'beh-001',
    question:
      'Tell me about a time you faced a challenge at work and how you handled it.',
    category: 'behavioral',
    difficulty: 'medium',
    exampleAnswer:
      'In a previous project, we often received testing tasks that were not related to our front-end responsibilities. I noticed this and clarified the workflow with the testing team, explaining that those tasks were backend-related. After aligning responsibilities, tasks were properly directed, which improved efficiency and reduced miscommunication.',
    tips: [
      'Use the STAR method: Situation, Task, Action, Result',
      'Focus on your specific actions and the positive outcome',
      'Show problem-solving and communication skills',
      'Demonstrate how you improved the situation',
    ],
    followUpQuestions: [
      'How did you identify that the workflow needed clarification?',
      'What steps did you take to communicate with the testing team?',
      'How did this experience help you in future projects?',
    ],
    tags: ['problem-solving', 'communication', 'workflow', 'teamwork'],
  },
  {
    id: 'beh-002',
    question:
      'Can you describe a time when you had to learn a new technology quickly?',
    category: 'behavioral',
    difficulty: 'medium',
    exampleAnswer:
      'I once had to quickly learn Nx for a project that used a monorepo setup. Since it was my first time with Nx, I went through the official documentation and practiced with examples. Soon after, I integrated it into the project, and it streamlined our workflow significantly.',
    tips: [
      'Show your learning process and methodology',
      'Demonstrate practical application of new knowledge',
      'Highlight the positive impact on the project',
      'Show adaptability and quick learning ability',
    ],
    followUpQuestions: [
      'What resources did you use to learn Nx quickly?',
      'How did you ensure you understood the technology properly?',
      'What challenges did you face during the learning process?',
    ],
    tags: ['learning', 'adaptability', 'technology', 'quick-learning'],
  },
  {
    id: 'beh-003',
    question:
      'Tell me about a time when you had a conflict with a colleague. How did you resolve it?',
    category: 'behavioral',
    difficulty: 'medium',
    exampleAnswer:
      'A colleague wanted to refactor every component in our project all at once, but from a business perspective, we needed to prioritize delivering features first. I suggested writing unit tests upfront to ensure stability and proposed doing the refactor once business stakeholders approved. This way, we delivered features on time, and later the refactor went smoothly with tests catching potential issues.',
    tips: [
      'Focus on collaboration and finding common ground',
      'Show consideration for business priorities',
      'Demonstrate compromise and negotiation skills',
      'Highlight the positive outcome for both parties',
    ],
    followUpQuestions: [
      'How did you approach the conversation with your colleague?',
      "What was your colleague's initial reaction to your suggestion?",
      'How did you ensure the refactor was successful later?',
    ],
    tags: [
      'conflict-resolution',
      'collaboration',
      'business-priorities',
      'compromise',
    ],
  },
  {
    id: 'beh-004',
    question:
      'Tell me about a time when you had to juggle multiple priorities.',
    category: 'behavioral',
    difficulty: 'medium',
    exampleAnswer:
      'In a project, I had multiple urgent requests from different managers. To handle it, I coordinated with my manager to define clear priorities, then focused on the most critical tasks first. By following this structured approach, I met deadlines and ensured nothing was overlooked.',
    tips: [
      'Show your prioritization methodology',
      'Demonstrate communication with stakeholders',
      'Highlight time management and organization skills',
      'Show how you ensured all tasks were completed',
    ],
    followUpQuestions: [
      'How did you determine which tasks were most critical?',
      'What tools or methods did you use to stay organized?',
      'How did you communicate progress to different managers?',
    ],
    tags: [
      'prioritization',
      'time-management',
      'organization',
      'communication',
    ],
  },
  {
    id: 'beh-005',
    question:
      'Can you share an example of when you received constructive criticism?',
    category: 'behavioral',
    difficulty: 'medium',
    exampleAnswer:
      "I once received feedback about a feature I built, where some details weren't clear to the testing team. Instead of taking it negatively, I clarified the situation with them and suggested documenting action points after meetings. This not only resolved the issue but also improved communication for future tasks.",
    tips: [
      'Show openness to feedback and learning',
      'Demonstrate how you acted on the feedback',
      'Highlight improvement and positive change',
      'Show emotional intelligence and maturity',
    ],
    followUpQuestions: [
      'How did you initially react to the feedback?',
      'What specific changes did you make based on the feedback?',
      'How did this experience change your approach to future projects?',
    ],
    tags: ['feedback', 'learning', 'communication', 'improvement'],
  },
  {
    id: 'beh-006',
    question:
      "Can you tell me about a project or accomplishment you're proud of?",
    category: 'behavioral',
    difficulty: 'medium',
    exampleAnswer:
      "I'm proud of building Zatouna, a website that collects JavaScript and React interview preparation resources. The project helps others prepare for interviews while allowing me to deepen my own knowledge. What made it successful was focusing on practical content and making it accessible for others.",
    tips: [
      'Choose a project that shows your skills and passion',
      'Explain the impact and value it provides',
      'Show what made it successful',
      'Demonstrate both technical and soft skills',
    ],
    followUpQuestions: [
      'What challenges did you face while building this project?',
      'How did you ensure the content was practical and useful?',
      'What feedback have you received from users?',
    ],
    tags: ['accomplishment', 'passion', 'impact', 'knowledge-sharing'],
  },
];

export const getBehaviorQuestionsByCategory = (
  category: string
): BehaviorQuestion[] => {
  return behaviorQuestions.filter(q => q.category === category);
};

export const getBehaviorQuestionById = (
  id: string
): BehaviorQuestion | undefined => {
  return behaviorQuestions.find(q => q.id === id);
};
