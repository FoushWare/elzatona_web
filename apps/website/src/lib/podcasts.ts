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

// Podcast show data structure
export interface PodcastShow {
  id: string;
  title: string;
  description: string;
  host: string;
  episodeCount: number;
  category: string;
  thumbnail?: string;
  externalLinks: {
    apple?: string;
    spotify?: string;
    youtube?: string;
    website?: string;
  };
  tags: string[];
  language: string;
  lastUpdated: string;
}

export const podcastShows: PodcastShow[] = [
  {
    id: 'untyped',
    title: 'Untyped',
    description:
      'نصف ساعه اسبوعيا من الهبد في مجال الفرونت ايند والجافاسكربت بالعربي',
    host: 'Abdelrahman Awad',
    episodeCount: 78,
    category: 'frontend',
    thumbnail:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/59/b8/b5/59b8b58d-ab22-865e-5d71-e6a5a8ecebb2/mza_15365345260162822881.jpg/600x600bb.webp', // Real Untyped podcast artwork from Apple Podcasts
    externalLinks: {
      apple: 'https://podcasts.apple.com/us/podcast/untyped/id1695379870',
      website: 'https://untyped.fm',
    },
    tags: [
      'frontend',
      'javascript',
      'arabic',
      'tech-career',
      'programming',
      'web-development',
    ],
    language: 'Arabic',
    lastUpdated: 'January 2025',
  },
];

export const getPodcastsByCategory = (categoryId: string): PodcastShow[] => {
  if (categoryId === 'all') return podcastShows;
  return podcastShows.filter(podcast => podcast.category === categoryId);
};

export const getPodcastById = (id: string): PodcastShow | undefined => {
  return podcastShows.find(podcast => podcast.id === id);
};

export const searchPodcasts = (query: string): PodcastShow[] => {
  const lowercaseQuery = query.toLowerCase();
  return podcastShows.filter(
    podcast =>
      podcast.title.toLowerCase().includes(lowercaseQuery) ||
      podcast.description.toLowerCase().includes(lowercaseQuery) ||
      podcast.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      podcast.host?.toLowerCase().includes(lowercaseQuery)
  );
};
