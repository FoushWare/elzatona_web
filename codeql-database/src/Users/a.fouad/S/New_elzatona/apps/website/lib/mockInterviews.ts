export interface MockInterviewVideo {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  company?: string;
  role?: string;
  interviewer?: string;
  interviewee?: string;
  tags: string[];
  thumbnail?: string;
}

export interface VideoCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const videoCategories: VideoCategory[] = [
  {
    id: "frontend",
    name: "Frontend Development",
    description: "React, JavaScript, CSS, HTML interviews",
    icon: "💻",
  },
  {
    id: "system-design",
    name: "System Design",
    description: "Architecture and system design interviews",
    icon: "🏗️",
  },
  {
    id: "behavioral",
    name: "Behavioral",
    description: "Soft skills and behavioral questions",
    icon: "🤝",
  },
  {
    id: "algorithms",
    name: "Algorithms & Data Structures",
    description: "Coding challenges and problem solving",
    icon: "🧮",
  },
  {
    id: "fullstack",
    name: "Full Stack",
    description: "Full stack development interviews",
    icon: "⚡",
  },
];

export const mockInterviewVideos: MockInterviewVideo[] = [
  {
    id: "turing-interview-1",
    title: "Turing Frontend Developer Interview",
    description:
      "Complete frontend developer interview process at Turing, covering React, JavaScript fundamentals, and system design.",
    youtubeId: "6qERg1Yt1QQ",
    duration: "45:30",
    difficulty: "Intermediate",
    category: "frontend",
    company: "Turing",
    role: "Frontend Developer",
    interviewer: "Turing Team",
    tags: ["React", "JavaScript", "Frontend", "Interview", "Turing"],
    thumbnail: "https://img.youtube.com/vi/6qERg1Yt1QQ/maxresdefault.jpg",
  },
  {
    id: "system-design-interview",
    title: "System Design Interview - Building a URL Shortener",
    description:
      "Learn how to approach system design interviews with a real example of designing a URL shortener service.",
    youtubeId: "gnkrDse9QKc",
    duration: "38:15",
    difficulty: "Advanced",
    category: "system-design",
    company: "Tech Company",
    role: "Senior Software Engineer",
    tags: ["System Design", "Architecture", "Scalability", "Interview"],
    thumbnail: "https://img.youtube.com/vi/gnkrDse9QKc/maxresdefault.jpg",
  },
  {
    id: "react-interview-playlist",
    title: "React Interview Questions Playlist",
    description:
      "Comprehensive playlist covering React interview questions, hooks, state management, and best practices.",
    youtubeId: "PLyS0ae3XTiIHj0tUGW6R6cUH7vgooPxSE",
    duration: "2:30:00",
    difficulty: "Intermediate",
    category: "frontend",
    company: "Various",
    role: "React Developer",
    tags: ["React", "Hooks", "State Management", "Interview Questions"],
    thumbnail:
      "https://img.youtube.com/vi/PLyS0ae3XTiIHj0tUGW6R6cUH7vgooPxSE/maxresdefault.jpg",
  },
  {
    id: "javascript-fundamentals",
    title: "JavaScript Fundamentals Interview",
    description:
      "Deep dive into JavaScript fundamentals including closures, prototypes, async programming, and ES6+ features.",
    youtubeId: "6qERg1Yt1QQ",
    duration: "52:20",
    difficulty: "Intermediate",
    category: "frontend",
    company: "Startup",
    role: "JavaScript Developer",
    tags: ["JavaScript", "Closures", "Prototypes", "Async", "ES6"],
    thumbnail: "https://img.youtube.com/vi/6qERg1Yt1QQ/maxresdefault.jpg",
  },
  {
    id: "css-interview",
    title: "CSS & Styling Interview",
    description:
      "CSS interview covering flexbox, grid, responsive design, and modern CSS features.",
    youtubeId: "gnkrDse9QKc",
    duration: "35:45",
    difficulty: "Beginner",
    category: "frontend",
    company: "Design Agency",
    role: "Frontend Developer",
    tags: ["CSS", "Flexbox", "Grid", "Responsive Design", "Styling"],
    thumbnail: "https://img.youtube.com/vi/gnkrDse9QKc/maxresdefault.jpg",
  },
  {
    id: "behavioral-interview",
    title: "Behavioral Interview Questions",
    description:
      "Common behavioral interview questions and how to structure your answers using the STAR method.",
    youtubeId: "6qERg1Yt1QQ",
    duration: "28:30",
    difficulty: "Beginner",
    category: "behavioral",
    company: "Tech Company",
    role: "Software Developer",
    tags: ["Behavioral", "STAR Method", "Soft Skills", "Communication"],
    thumbnail: "https://img.youtube.com/vi/6qERg1Yt1QQ/maxresdefault.jpg",
  },
  {
    id: "algorithms-interview",
    title: "Algorithm Interview - Two Sum Problem",
    description:
      "Step-by-step walkthrough of solving the Two Sum problem in a technical interview setting.",
    youtubeId: "gnkrDse9QKc",
    duration: "25:15",
    difficulty: "Beginner",
    category: "algorithms",
    company: "FAANG",
    role: "Software Engineer",
    tags: ["Algorithms", "Data Structures", "Problem Solving", "Coding"],
    thumbnail: "https://img.youtube.com/vi/gnkrDse9QKc/maxresdefault.jpg",
  },
  {
    id: "fullstack-interview",
    title: "Full Stack Developer Interview",
    description:
      "Complete full stack interview covering frontend, backend, database design, and deployment.",
    youtubeId: "6qERg1Yt1QQ",
    duration: "1:15:30",
    difficulty: "Advanced",
    category: "fullstack",
    company: "Tech Startup",
    role: "Full Stack Developer",
    tags: ["Full Stack", "Frontend", "Backend", "Database", "Deployment"],
    thumbnail: "https://img.youtube.com/vi/6qERg1Yt1QQ/maxresdefault.jpg",
  },
];

export const getVideosByCategory = (
  categoryId: string,
): MockInterviewVideo[] => {
  return mockInterviewVideos.filter((video) => video.category === categoryId);
};

export const getVideoById = (id: string): MockInterviewVideo | undefined => {
  return mockInterviewVideos.find((video) => video.id === id);
};

export const searchVideos = (query: string): MockInterviewVideo[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockInterviewVideos.filter(
    (video) =>
      video.title.toLowerCase().includes(lowercaseQuery) ||
      video.description.toLowerCase().includes(lowercaseQuery) ||
      video.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      video.company?.toLowerCase().includes(lowercaseQuery) ||
      video.role?.toLowerCase().includes(lowercaseQuery),
  );
};
