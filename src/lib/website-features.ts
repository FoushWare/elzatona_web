// Comprehensive feature data across website and admin sections
import React from 'react';
import {
  Code,
  Users,
  FileText,
  Zap,
  Smartphone,
  Brain,
  BarChart3,
  Calendar,
  Target,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

export interface WebsiteFeature {
  id: string;
  title: string;
  description: string;
  category: 'Website' | 'Admin';
  section: string;
  status: 'completed' | 'in-progress' | 'pending';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  url?: string | null;
  icon: React.ComponentType<{ className?: string }>;
  progress?: number;
  estimatedCompletion?: string;
  nextSteps?: string[];
  dependencies?: string[];
  estimatedEffort?: string;

  // Detailed information
  fullStory?: string;
  implementation?: {
    technologies?: string[];
    files?: string[];
    components?: string[];
    apis?: string[];
    database?: string[];
    deployment?: string[];
  };
  features?: string[];
  benefits?: string[];
  challenges?: string[];
  solutions?: string[];
  testing?: string[];
  performance?: string[];
  security?: string[];
  accessibility?: string[];
  futurePlans?: string[];
  relatedFeatures?: string[];
  completionDate?: string;
  lastUpdated?: string;
  contributors?: string[];
  documentation?: string[];
  screenshots?: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export const allWebsiteFeatures: WebsiteFeature[] = [
  // === WEBSITE FEATURES ===
  // Core Learning Features
  {
    id: 'home-page',
    title: 'Home Page',
    description: 'Landing page with hero section and feature overview',
    category: 'Website',
    section: 'Core',
    status: 'completed',
    priority: 'Critical',
    url: '/',
    icon: BookOpen,
    fullStory:
      'The home page serves as the main entry point for our frontend development platform. It was designed to immediately communicate our value proposition and guide users toward the learning paths that best suit their needs. The page features a modern gradient design with animated elements to create an engaging first impression.',
    implementation: {
      technologies: ['Next.js 15', 'React 18', 'TypeScript', 'Tailwind CSS'],
      files: ['src/app/page.tsx', 'src/components/AlzatonaLogo.tsx'],
      components: ['Hero Section', 'Features Grid', 'Call-to-Action Buttons'],
      apis: [],
      database: [],
      deployment: ['Vercel', 'Static Generation'],
    },
    features: [
      'Responsive hero section with animated logo',
      'Gradient background with modern design',
      'Clear call-to-action buttons',
      'Mobile-first responsive design',
      'Dark mode support',
      'Accessibility compliance',
    ],
    benefits: [
      'Immediate value proposition communication',
      'High conversion rate to learning paths',
      'Professional brand presentation',
      'Fast loading performance',
      'SEO optimized structure',
    ],
    challenges: [
      'Balancing visual appeal with performance',
      'Ensuring accessibility across devices',
      'Creating engaging animations without impacting load time',
    ],
    solutions: [
      'Optimized images and lazy loading',
      'CSS-only animations for performance',
      'Comprehensive accessibility testing',
      'Progressive enhancement approach',
    ],
    testing: [
      'Lighthouse audits',
      'Cross-browser testing',
      'Accessibility testing',
      'Performance monitoring',
    ],
    performance: [
      '95+ Lighthouse score',
      'Sub-2s load time',
      'Optimized bundle size',
    ],
    security: ['No sensitive data exposure', 'Secure static hosting'],
    accessibility: [
      'WCAG 2.1 AA compliant',
      'Screen reader friendly',
      'Keyboard navigation',
    ],
    completionDate: 'Dec 2024',
    lastUpdated: 'Dec 2024',
    contributors: ['Development Team'],
    documentation: ['Design System', 'Component Library'],
    demoUrl: '/',
    githubUrl: 'https://github.com/FoushWare/GreatFrontendHub',
  },
  {
    id: 'learning-paths',
    title: 'Learning Paths',
    description: 'Structured learning paths with progress tracking',
    category: 'Website',
    section: 'Core',
    status: 'completed',
    priority: 'Critical',
    url: '/learning-paths',
    icon: Target,
  },
  {
    id: 'questions-system',
    title: 'Questions System',
    description: 'Comprehensive question bank with multiple types',
    category: 'Website',
    section: 'Core',
    status: 'completed',
    priority: 'Critical',
    url: '/questions',
    icon: BookOpen,
  },
  {
    id: 'coding-challenges',
    title: 'Coding Challenges',
    description: 'Interactive coding challenges and exercises',
    category: 'Website',
    section: 'Core',
    status: 'completed',
    priority: 'High',
    url: '/coding',
    icon: Code,
  },
  {
    id: 'dashboard',
    title: 'User Dashboard',
    description: 'Personal dashboard with progress tracking',
    category: 'Website',
    section: 'Core',
    status: 'completed',
    priority: 'High',
    url: '/dashboard',
    icon: BarChart3,
  },
  {
    id: 'flashcards',
    title: 'Flashcards System',
    description: 'Interactive flashcards for learning',
    category: 'Website',
    section: 'Learning',
    status: 'completed',
    priority: 'Medium',
    url: '/flashcards',
    icon: Brain,
  },
  {
    id: 'ai-mock-interview',
    title: 'AI Mock Interview',
    description: 'AI-powered mock interview system',
    category: 'Website',
    section: 'AI Features',
    status: 'completed',
    priority: 'High',
    url: '/ai-mock-interview',
    icon: Users,
    fullStory:
      'The AI Mock Interview system was developed to provide users with realistic interview practice using advanced AI technology. This feature simulates real interview scenarios with intelligent follow-up questions, behavioral assessments, and technical evaluations. It helps users build confidence and improve their interview skills through personalized feedback.',
    implementation: {
      technologies: ['Next.js', 'React', 'TypeScript', 'OpenAI API'],
      files: [
        'src/app/ai-mock-interview/page.tsx',
        'src/components/AIInterview.tsx',
      ],
      components: ['Interview Interface', 'AI Response System'],
      apis: ['OpenAI GPT-4', 'Custom Interview API'],
      database: ['Firebase Firestore'],
      deployment: ['Vercel', 'Serverless Functions'],
    },
    features: [
      'Real-time AI conversation',
      'Interview question generation',
      'Behavioral assessment',
      'Technical evaluation',
      'Progress tracking',
      'Performance analytics',
    ],
    benefits: [
      'Realistic interview practice',
      'Personalized feedback',
      'Confidence building',
      'Skill improvement tracking',
      'Accessible anytime, anywhere',
    ],
    challenges: [
      'Managing AI API costs',
      'Ensuring realistic conversation flow',
      'Handling speech recognition accuracy',
      'Balancing AI responses with human-like interaction',
    ],
    solutions: [
      'Efficient prompt engineering',
      'Context-aware conversation management',
      'Fallback mechanisms for speech errors',
      'Continuous AI model optimization',
    ],
    testing: [
      'AI response quality testing',
      'Speech recognition accuracy',
      'User experience testing',
    ],
    performance: [
      'Sub-3s response time',
      'Optimized API calls',
      'Efficient state management',
    ],
    security: [
      'API key protection',
      'User data privacy',
      'Secure conversation storage',
    ],
    accessibility: [
      'Screen reader support',
      'Keyboard navigation',
      'Voice commands',
    ],
    completionDate: 'Dec 2024',
    lastUpdated: 'Dec 2024',
    contributors: ['AI Development Team'],
    documentation: ['API Documentation', 'User Guide'],
    demoUrl: '/ai-mock-interview',
    githubUrl: 'https://github.com/FoushWare/GreatFrontendHub',
  },
  {
    id: 'chatgpt-integration',
    title: 'ChatGPT Integration',
    description: 'AI chat assistant for learning support',
    category: 'Website',
    section: 'AI Features',
    status: 'completed',
    priority: 'Medium',
    url: null, // Global component
    icon: Brain,
  },
  {
    id: 'progress-tracking',
    title: 'Progress Tracking',
    description: 'User progress analytics and tracking',
    category: 'Website',
    section: 'Analytics',
    status: 'completed',
    priority: 'High',
    url: '/progress',
    icon: BarChart3,
  },
  {
    id: 'authentication',
    title: 'User Authentication',
    description: 'Firebase-based user authentication system',
    category: 'Website',
    section: 'Core',
    status: 'completed',
    priority: 'Critical',
    url: '/auth',
    icon: Users,
  },
  {
    id: 'responsive-design',
    title: 'Responsive Design',
    description: 'Mobile-first responsive design across all pages',
    category: 'Website',
    section: 'UI/UX',
    status: 'completed',
    priority: 'Critical',
    url: null, // Global
    icon: Smartphone,
  },
  {
    id: 'dark-mode',
    title: 'Dark Mode',
    description: 'Theme switching with dark/light mode support',
    category: 'Website',
    section: 'UI/UX',
    status: 'completed',
    priority: 'Medium',
    url: null, // Global
    icon: Zap,
  },
  {
    id: 'navbar-navigation',
    title: 'Navigation System',
    description: 'Responsive navbar with dropdown menus',
    category: 'Website',
    section: 'UI/UX',
    status: 'completed',
    priority: 'Critical',
    url: null, // Global
    icon: Target,
  },

  // Practice & Learning Features
  {
    id: 'practice-questions',
    title: 'Practice Questions',
    description: 'Multiple choice and open-ended practice questions',
    category: 'Website',
    section: 'Practice',
    status: 'completed',
    priority: 'High',
    url: '/practice',
    icon: BookOpen,
  },
  {
    id: 'behavioral-questions',
    title: 'Behavioral Questions',
    description: 'Behavioral interview question practice',
    category: 'Website',
    section: 'Practice',
    status: 'completed',
    priority: 'Medium',
    url: '/questions/behavioral',
    icon: Users,
  },
  {
    id: 'company-specific-questions',
    title: 'Company-Specific Questions',
    description: 'Questions tailored to specific companies',
    category: 'Website',
    section: 'Practice',
    status: 'completed',
    priority: 'Medium',
    url: '/questions/company-specific',
    icon: Target,
  },
  {
    id: 'javascript-questions',
    title: 'JavaScript Questions',
    description: 'JavaScript-specific interview questions',
    category: 'Website',
    section: 'Practice',
    status: 'completed',
    priority: 'High',
    url: '/questions/javascript',
    icon: Code,
  },
  {
    id: 'react-questions',
    title: 'React Questions',
    description: 'React-specific interview questions',
    category: 'Website',
    section: 'Practice',
    status: 'completed',
    priority: 'High',
    url: '/questions/react',
    icon: Code,
  },
  {
    id: 'system-design-questions',
    title: 'System Design Questions',
    description: 'System design interview preparation',
    category: 'Website',
    section: 'Practice',
    status: 'completed',
    priority: 'Medium',
    url: '/questions/system-design',
    icon: Brain,
  },
  {
    id: 'ui-questions',
    title: 'UI/UX Questions',
    description: 'User interface and experience questions',
    category: 'Website',
    section: 'Practice',
    status: 'completed',
    priority: 'Medium',
    url: '/questions/user-interface',
    icon: Smartphone,
  },

  // Advanced Features
  {
    id: 'study-plans',
    title: 'Study Plans',
    description: 'Personalized study plans and schedules',
    category: 'Website',
    section: 'Advanced',
    status: 'completed',
    priority: 'Medium',
    url: '/study-plans',
    icon: Calendar,
  },
  {
    id: 'preparation-guides',
    title: 'Preparation Guides',
    description: 'Comprehensive interview preparation guides',
    category: 'Website',
    section: 'Advanced',
    status: 'completed',
    priority: 'Medium',
    url: '/preparation-guides',
    icon: BookOpen,
  },
  {
    id: 'cheatsheet',
    title: 'Cheatsheet',
    description: 'Quick reference for frontend development',
    category: 'Website',
    section: 'Resources',
    status: 'completed',
    priority: 'Medium',
    url: '/cheatsheet',
    icon: FileText,
  },
  {
    id: 'articles',
    title: 'Articles',
    description: 'Technical articles and tutorials',
    category: 'Website',
    section: 'Resources',
    status: 'completed',
    priority: 'Medium',
    url: '/articles',
    icon: FileText,
  },
  {
    id: 'resources',
    title: 'Resources',
    description: 'Curated learning resources and links',
    category: 'Website',
    section: 'Resources',
    status: 'completed',
    priority: 'Medium',
    url: '/resources',
    icon: BookOpen,
  },
  {
    id: 'jobs',
    title: 'Job Board',
    description: 'Frontend development job listings',
    category: 'Website',
    section: 'Career',
    status: 'completed',
    priority: 'Low',
    url: '/jobs',
    icon: Users,
  },

  // === ADMIN FEATURES ===
  {
    id: 'admin-dashboard',
    title: 'Admin Dashboard',
    description: 'Main admin dashboard with overview',
    category: 'Admin',
    section: 'Core',
    status: 'completed',
    priority: 'Critical',
    url: '/admin/dashboard',
    icon: BarChart3,
  },
  {
    id: 'admin-auth',
    title: 'Admin Authentication',
    description: 'Secure admin login and authentication',
    category: 'Admin',
    section: 'Core',
    status: 'completed',
    priority: 'Critical',
    url: '/admin/login',
    icon: Users,
  },
  {
    id: 'question-management',
    title: 'Question Management',
    description: 'CRUD operations for questions',
    category: 'Admin',
    section: 'Content',
    status: 'completed',
    priority: 'Critical',
    url: '/admin/content/questions',
    icon: BookOpen,
  },
  {
    id: 'unified-questions',
    title: 'Unified Questions System',
    description: 'Unified question management system',
    category: 'Admin',
    section: 'Content',
    status: 'completed',
    priority: 'High',
    url: '/admin/questions/unified',
    icon: BookOpen,
  },
  {
    id: 'content-management',
    title: 'Content Management',
    description: 'General content management interface',
    category: 'Admin',
    section: 'Content',
    status: 'completed',
    priority: 'High',
    url: '/admin/content',
    icon: FileText,
  },
  {
    id: 'learning-resources',
    title: 'Learning Resources Checklist',
    description: 'Manage learning resources and track completion',
    category: 'Admin',
    section: 'Content',
    status: 'completed',
    priority: 'Medium',
    url: '/admin/learning-resources',
    icon: BookOpen,
  },
  {
    id: 'reports',
    title: 'Reports & Analytics',
    description: 'Feature status reports and analytics',
    category: 'Admin',
    section: 'Analytics',
    status: 'completed',
    priority: 'High',
    url: '/admin/reports',
    icon: BarChart3,
  },
  {
    id: 'user-management',
    title: 'User Management',
    description: 'Manage user accounts and permissions',
    category: 'Admin',
    section: 'Users',
    status: 'completed',
    priority: 'Medium',
    url: '/admin/users',
    icon: Users,
  },
  {
    id: 'audio-management',
    title: 'Audio Management',
    description: 'Audio file upload and management',
    category: 'Admin',
    section: 'System',
    status: 'completed',
    priority: 'Low',
    url: '/admin/audio',
    icon: FileText,
  },
  {
    id: 'admin-settings',
    title: 'Admin Settings',
    description: 'System configuration and settings',
    category: 'Admin',
    section: 'System',
    status: 'completed',
    priority: 'Medium',
    url: '/admin/settings',
    icon: Zap,
  },

  // === IN PROGRESS FEATURES ===
  {
    id: 'markdown-testing',
    title: 'Markdown Question Upload Testing',
    description: 'Step-by-step testing of markdown question upload process',
    category: 'Admin',
    section: 'Testing',
    status: 'in-progress',
    priority: 'High',
    progress: 75,
    estimatedCompletion: '1-2 days',
    nextSteps: [
      'Execute upload test',
      'Verify website display',
      'Test AI validation',
    ],
    icon: Code,
  },

  // === PENDING FEATURES ===
  {
    id: 'website-verification',
    title: 'Website Display Verification',
    description:
      'Verify that uploaded questions correctly appear on the website',
    category: 'Admin',
    section: 'Testing',
    status: 'pending',
    priority: 'High',
    dependencies: ['Markdown upload testing completion'],
    estimatedEffort: '2-4 hours',
    icon: ExternalLink,
  },
  {
    id: 'missing-tutorials-page',
    title: 'Create Tutorials Page (/tutorials)',
    description:
      'Missing core learning feature - step-by-step tutorials for HTML, CSS, JavaScript, React',
    category: 'Website',
    section: 'Core',
    status: 'pending',
    priority: 'Critical',
    dependencies: ['Core platform stabilization'],
    estimatedEffort: '2-3 weeks',
    icon: BookOpen,
  },
  {
    id: 'missing-video-courses-page',
    title: 'Create Video Courses Page (/video-courses)',
    description:
      'Missing promised navigation feature - video course catalog with categories and progress tracking',
    category: 'Website',
    section: 'Core',
    status: 'pending',
    priority: 'Critical',
    dependencies: ['Tutorials page completion'],
    estimatedEffort: '3-4 weeks',
    icon: FileText,
  },
  {
    id: 'missing-documentation-page',
    title: 'Create Documentation Page (/documentation)',
    description:
      'Missing reference material - organized documentation by technology with search functionality',
    category: 'Website',
    section: 'Resources',
    status: 'pending',
    priority: 'High',
    dependencies: ['Core content completion'],
    estimatedEffort: '1-2 weeks',
    icon: FileText,
  },
  {
    id: 'missing-coding-exercises-page',
    title: 'Create Coding Exercises Page (/practice/coding-exercises)',
    description:
      'Missing practice feature - interactive coding exercises with real-time feedback',
    category: 'Website',
    section: 'Practice',
    status: 'pending',
    priority: 'High',
    dependencies: ['Core platform stabilization'],
    estimatedEffort: '2-3 weeks',
    icon: Code,
  },
  {
    id: 'missing-projects-page',
    title: 'Create Projects Page (/practice/projects)',
    description:
      'Missing practice feature - hands-on project building with guided tutorials',
    category: 'Website',
    section: 'Practice',
    status: 'pending',
    priority: 'High',
    dependencies: ['Coding exercises completion'],
    estimatedEffort: '3-4 weeks',
    icon: Code,
  },
  {
    id: 'missing-quiz-page',
    title: 'Create Quiz Page (/practice/quiz)',
    description:
      'Missing practice feature - timed quizzes with scoring and progress tracking',
    category: 'Website',
    section: 'Practice',
    status: 'pending',
    priority: 'Medium',
    dependencies: ['Questions system completion'],
    estimatedEffort: '1-2 weeks',
    icon: BookOpen,
  },
  {
    id: 'missing-mock-interviews-page',
    title: 'Create Mock Interviews Page (/mock-interviews)',
    description:
      'Missing practice feature - structured mock interview sessions with feedback',
    category: 'Website',
    section: 'Practice',
    status: 'pending',
    priority: 'Medium',
    dependencies: ['AI mock interview completion'],
    estimatedEffort: '2-3 weeks',
    icon: Users,
  },
  {
    id: 'missing-gamification-page',
    title: 'Create Gamification Page (/gamification)',
    description:
      'Missing engagement feature - points, badges, leaderboards, and achievements',
    category: 'Website',
    section: 'Engagement',
    status: 'pending',
    priority: 'Medium',
    dependencies: ['Core platform completion'],
    estimatedEffort: '2-3 weeks',
    icon: Target,
  },
  {
    id: 'missing-podcasts-page',
    title: 'Create Podcasts Page (/podcasts)',
    description:
      'Missing content feature - curated podcasts and audio content for learning',
    category: 'Website',
    section: 'Content',
    status: 'pending',
    priority: 'Low',
    dependencies: ['Audio management completion'],
    estimatedEffort: '1-2 weeks',
    icon: FileText,
  },
  {
    id: 'missing-blog-page',
    title: 'Create Blog Page (/blog)',
    description:
      'Missing content feature - technical blog with articles and tutorials',
    category: 'Website',
    section: 'Content',
    status: 'pending',
    priority: 'Low',
    dependencies: ['Content management completion'],
    estimatedEffort: '1-2 weeks',
    icon: FileText,
  },
  {
    id: 'missing-system-design-page',
    title: 'Create System Design Page (/system-design)',
    description:
      'Missing advanced feature - comprehensive system design learning materials',
    category: 'Website',
    section: 'Advanced',
    status: 'pending',
    priority: 'Medium',
    dependencies: ['Core platform completion'],
    estimatedEffort: '2-3 weeks',
    icon: Brain,
  },
  {
    id: 'missing-culture-fit-page',
    title: 'Create Culture Fit Page (/culture-fit-interviews)',
    description:
      'Missing interview feature - culture fit interview preparation and practice',
    category: 'Website',
    section: 'Practice',
    status: 'pending',
    priority: 'Low',
    dependencies: ['Mock interviews completion'],
    estimatedEffort: '1-2 weeks',
    icon: Users,
  },
  {
    id: 'missing-authentication-strategies-page',
    title: 'Create Authentication Strategies Page (/authentication-strategies)',
    description:
      'Missing advanced feature - authentication methods and security practices',
    category: 'Website',
    section: 'Advanced',
    status: 'pending',
    priority: 'Low',
    dependencies: ['System design completion'],
    estimatedEffort: '1-2 weeks',
    icon: Users,
  },
  {
    id: 'missing-git-tips-page',
    title: 'Create Git Tips Page (/git-tips)',
    description: 'Missing resource feature - Git best practices and tips',
    category: 'Website',
    section: 'Resources',
    status: 'pending',
    priority: 'Low',
    dependencies: ['Documentation completion'],
    estimatedEffort: '1 week',
    icon: FileText,
  },
  {
    id: 'missing-image-optimization-demo-page',
    title: 'Create Image Optimization Demo Page (/image-optimization-demo)',
    description:
      'Missing demo feature - interactive image optimization examples',
    category: 'Website',
    section: 'Demos',
    status: 'pending',
    priority: 'Low',
    dependencies: ['Core platform completion'],
    estimatedEffort: '1 week',
    icon: Smartphone,
  },
  {
    id: 'missing-firebase-questions-page',
    title: 'Create Firebase Questions Page (/firebase-questions)',
    description:
      'Missing specialized feature - Firebase-specific interview questions',
    category: 'Website',
    section: 'Specialized',
    status: 'pending',
    priority: 'Low',
    dependencies: ['Questions system completion'],
    estimatedEffort: '1 week',
    icon: Code,
  },
  {
    id: 'missing-schedule-interview-page',
    title: 'Create Schedule Interview Page (/schedule-interview)',
    description:
      'Missing utility feature - interview scheduling and calendar integration',
    category: 'Website',
    section: 'Utilities',
    status: 'pending',
    priority: 'Low',
    dependencies: ['Core platform completion'],
    estimatedEffort: '2-3 weeks',
    icon: Calendar,
  },
  {
    id: 'missing-challenges-page',
    title: 'Create Challenges Page (/challenges)',
    description:
      'Missing engagement feature - coding challenges and competitions',
    category: 'Website',
    section: 'Engagement',
    status: 'pending',
    priority: 'Medium',
    dependencies: ['Coding challenges completion'],
    estimatedEffort: '2-3 weeks',
    icon: Target,
  },
  {
    id: 'missing-editor-page',
    title: 'Create Code Editor Page (/editor)',
    description:
      'Missing utility feature - integrated code editor with syntax highlighting',
    category: 'Website',
    section: 'Utilities',
    status: 'pending',
    priority: 'Medium',
    dependencies: ['Core platform completion'],
    estimatedEffort: '2-3 weeks',
    icon: Code,
  },
  {
    id: 'missing-test-pages',
    title: 'Create Test Pages (/test, /test-dark-mode)',
    description:
      'Missing development feature - testing and development utilities',
    category: 'Website',
    section: 'Development',
    status: 'pending',
    priority: 'Low',
    dependencies: ['Core platform completion'],
    estimatedEffort: '1 week',
    icon: Code,
  },
  {
    id: 'missing-chatgpt-test-page',
    title: 'Create ChatGPT Test Page (/chatgpt-test)',
    description:
      'Missing testing feature - ChatGPT integration testing and debugging',
    category: 'Website',
    section: 'Testing',
    status: 'pending',
    priority: 'Low',
    dependencies: ['ChatGPT integration completion'],
    estimatedEffort: '1 week',
    icon: Brain,
  },
];

// Filter features by status
export const completedFeatures = allWebsiteFeatures.filter(
  f => f.status === 'completed'
);
export const inProgressFeatures = allWebsiteFeatures.filter(
  f => f.status === 'in-progress'
);
export const pendingFeatures = allWebsiteFeatures.filter(
  f => f.status === 'pending'
);

// Get features by category
export const websiteFeatures = allWebsiteFeatures.filter(
  f => f.category === 'Website'
);
export const adminFeatures = allWebsiteFeatures.filter(
  f => f.category === 'Admin'
);

// Get features by section
export const getFeaturesBySection = (section: string) =>
  allWebsiteFeatures.filter(f => f.section === section);

// Get statistics
export const getFeatureStats = () => {
  const total = allWebsiteFeatures.length;
  const completed = completedFeatures.length;
  const inProgress = inProgressFeatures.length;
  const pending = pendingFeatures.length;
  const website = websiteFeatures.length;
  const admin = adminFeatures.length;

  return {
    total,
    completed,
    inProgress,
    pending,
    website,
    admin,
    completionRate: Math.round((completed / total) * 100),
  };
};
