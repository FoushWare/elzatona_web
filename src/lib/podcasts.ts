export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  audioUrl?: string;
  duration: string;
  publishDate: string;
  season?: number;
  episode?: number;
  category: string;
  host?: string;
  guest?: string;
  tags: string[];
  thumbnail?: string;
  externalLinks: {
    apple?: string;
    spotify?: string;
    youtube?: string;
    website?: string;
  };
  transcript?: string;
}

export interface PodcastCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const podcastCategories: PodcastCategory[] = [
  {
    id: 'tech-career',
    name: 'Tech Career',
    description: 'Career development and industry insights',
    icon: '💼',
  },
  {
    id: 'frontend',
    name: 'Frontend Development',
    description: 'Web development and frontend technologies',
    icon: '💻',
  },
  {
    id: 'interview-prep',
    name: 'Interview Preparation',
    description: 'Technical and behavioral interview tips',
    icon: '🎯',
  },
  {
    id: 'industry-insights',
    name: 'Industry Insights',
    description: 'Market trends and professional development',
    icon: '📊',
  },
];

export const podcastEpisodes: PodcastEpisode[] = [
  {
    id: 'climbing-pyramid-scheme',
    title: 'Climbing the Pyramid Scheme',
    description:
      'في سوق الـ Tech في مصر، كل الناس بقت "Senior" حتى لو لسه مكمّلينش سنة! العناوين بقت أكبر من الخبرة، والمرتبات ساعات تبقى أوهام زي السراب. في الحلقة دي هنتكلم عن الـ pyramid scheme بتاع الـ titles، ليه التعويضات مش ماشية مع المسميات، وإزاي السلم الوظيفي ساعات بيقفلك الطريق بدل ما يفتحلك.',
    duration: '55 min',
    publishDate: 'August 24, 2024',
    season: 1,
    episode: 76,
    category: 'tech-career',
    host: 'Untyped',
    tags: [
      'career',
      'titles',
      'compensation',
      'egypt',
      'tech-market',
      'senior-roles',
    ],
    externalLinks: {
      apple:
        'https://podcasts.apple.com/us/podcast/climbing-the-pyramid-scheme/id1695379870?i=1000723268743',
      website: 'https://untyped.fm',
    },
    transcript:
      'في سوق الـ Tech في مصر، كل الناس بقت "Senior" حتى لو لسه مكمّلينش سنة! العناوين بقت أكبر من الخبرة، والمرتبات ساعات تبقى أوهام زي السراب. في الحلقة دي هنتكلم عن الـ pyramid scheme بتاع الـ titles، ليه التعويضات مش ماشية مع المسميات، وإزاي السلم الوظيفي ساعات بيقفلك الطريق بدل ما يفتحلك. سواء ماشي في سكة الـ IC أو داخل على Management، هتلاقي إن مش كل هرم بيوصل للقمة.',
  },
  {
    id: 'frontend-interview-tips',
    title: 'Frontend Interview Mastery',
    description:
      'Essential tips and strategies for acing frontend development interviews. Learn about common questions, coding challenges, and how to showcase your skills effectively.',
    duration: '42 min',
    publishDate: 'August 20, 2024',
    season: 1,
    episode: 75,
    category: 'interview-prep',
    host: 'Tech Interview Pro',
    tags: ['frontend', 'interview', 'react', 'javascript', 'coding-challenges'],
    externalLinks: {
      apple: 'https://podcasts.apple.com/us/podcast/frontend-interview-mastery',
      spotify: 'https://open.spotify.com/episode/frontend-interview-mastery',
    },
  },
  {
    id: 'react-best-practices',
    title: 'React Best Practices in 2024',
    description:
      'Deep dive into modern React development patterns, hooks optimization, and performance best practices for building scalable applications.',
    duration: '38 min',
    publishDate: 'August 18, 2024',
    season: 1,
    episode: 74,
    category: 'frontend',
    host: 'React Weekly',
    tags: ['react', 'hooks', 'performance', 'best-practices', '2024'],
    externalLinks: {
      apple: 'https://podcasts.apple.com/us/podcast/react-best-practices-2024',
      youtube: 'https://youtube.com/watch?v=react-best-practices',
    },
  },
  {
    id: 'tech-salary-negotiation',
    title: 'Tech Salary Negotiation Strategies',
    description:
      'Learn how to negotiate your tech salary effectively, understand market rates, and position yourself for better compensation packages.',
    duration: '48 min',
    publishDate: 'August 15, 2024',
    season: 1,
    episode: 73,
    category: 'tech-career',
    host: 'Career Growth Podcast',
    tags: ['salary', 'negotiation', 'career', 'compensation', 'tech-jobs'],
    externalLinks: {
      apple: 'https://podcasts.apple.com/us/podcast/tech-salary-negotiation',
      spotify: 'https://open.spotify.com/episode/tech-salary-negotiation',
    },
  },
  {
    id: 'javascript-deep-dive',
    title: 'JavaScript Deep Dive: Advanced Concepts',
    description:
      'Exploring advanced JavaScript concepts including closures, prototypes, async programming, and modern ES6+ features.',
    duration: '52 min',
    publishDate: 'August 12, 2024',
    season: 1,
    episode: 72,
    category: 'frontend',
    host: 'JS Masters',
    tags: ['javascript', 'closures', 'prototypes', 'async', 'es6'],
    externalLinks: {
      apple: 'https://podcasts.apple.com/us/podcast/javascript-deep-dive',
      youtube: 'https://youtube.com/watch?v=js-deep-dive',
    },
  },
];

export const getPodcastsByCategory = (categoryId: string): PodcastEpisode[] => {
  if (categoryId === 'all') return podcastEpisodes;
  return podcastEpisodes.filter(podcast => podcast.category === categoryId);
};

export const getPodcastById = (id: string): PodcastEpisode | undefined => {
  return podcastEpisodes.find(podcast => podcast.id === id);
};

export const searchPodcasts = (query: string): PodcastEpisode[] => {
  const lowercaseQuery = query.toLowerCase();
  return podcastEpisodes.filter(
    podcast =>
      podcast.title.toLowerCase().includes(lowercaseQuery) ||
      podcast.description.toLowerCase().includes(lowercaseQuery) ||
      podcast.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      podcast.host?.toLowerCase().includes(lowercaseQuery) ||
      podcast.guest?.toLowerCase().includes(lowercaseQuery)
  );
};
