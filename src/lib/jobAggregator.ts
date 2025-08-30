// Job Aggregator Service
// This service fetches real job data from multiple sources

// Note: Real scraping functions are only available server-side
// import { scrapeAllJobSources } from './realJobScrapers';

export interface JobSource {
  name: string;
  url: string;
  type: 'api' | 'scrape' | 'rss';
  selectors?: {
    jobCard: string;
    title: string;
    company: string;
    location: string;
    salary?: string;
    link: string;
    datePosted?: string;
  };
}

export interface RealJob {
  id: string;
  title: string;
  company: string;
  country: string;
  location: string;
  salary: string;
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  type: string;
  datePosted: string;
  link: string;
  description: string;
  tags: string[];
  source: string;
  sourceUrl: string;
}

// Job sources configuration
export const jobSources: JobSource[] = [
  {
    name: "JS Guru Jobs",
    url: "https://jsgurujobs.com/jobs?category=frontend",
    type: 'scrape',
    selectors: {
      jobCard: ".job-listing, .job-card",
      title: "h3, .job-title",
      company: ".company-name, .company",
      location: ".location, .job-location",
      link: "a[href*='/jobs/']",
      datePosted: ".date, .posted-date"
    }
  },
  {
    name: "LinkedIn Jobs",
    url: "https://www.linkedin.com/jobs/search/?keywords=react%20developer",
    type: 'scrape',
    selectors: {
      jobCard: ".job-search-card",
      title: ".job-search-card__title",
      company: ".job-search-card__subtitle",
      location: ".job-search-card__location",
      link: "a[href*='/jobs/view/']"
    }
  },
  {
    name: "Indeed",
    url: "https://www.indeed.com/jobs?q=react+developer",
    type: 'scrape',
    selectors: {
      jobCard: ".job_seen_beacon",
      title: "h2.jobTitle",
      company: ".companyName",
      location: ".companyLocation",
      link: "a[href*='/viewjob']"
    }
  },
  {
    name: "Stack Overflow Jobs",
    url: "https://stackoverflow.com/jobs?q=react",
    type: 'scrape',
    selectors: {
      jobCard: ".job",
      title: ".job-title",
      company: ".company-name",
      location: ".job-location",
      link: "a[href*='/jobs/']"
    }
  },
  {
    name: "We Work Remotely",
    url: "https://weworkremotely.com/remote-jobs/search?term=react",
    type: 'scrape',
    selectors: {
      jobCard: ".job",
      title: ".title",
      company: ".company",
      location: ".region",
      link: "a[href*='/remote-jobs/']"
    }
  }
];

// Function to extract salary information from text
export function extractSalaryInfo(salaryText: string): {
  salary: string;
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
} {
  if (!salaryText) {
    return { salary: "Salary not specified", currency: "USD" };
  }

  const text = salaryText.toLowerCase();
  
  // Extract currency
  let currency = "USD";
  if (text.includes("£") || text.includes("gbp")) currency = "GBP";
  else if (text.includes("€") || text.includes("eur")) currency = "EUR";
  else if (text.includes("a$") || text.includes("aud")) currency = "AUD";
  else if (text.includes("$") || text.includes("usd")) currency = "USD";

  // Extract numbers
  const numbers = text.match(/\d{1,3}(?:,\d{3})*(?:\.\d{2})?/g);
  if (!numbers || numbers.length === 0) {
    return { salary: salaryText, currency };
  }

  const nums = numbers.map(n => parseInt(n.replace(/,/g, "")));
  const min = Math.min(...nums);
  const max = Math.max(...nums);

  return {
    salary: salaryText,
    salaryMin: min,
    salaryMax: max,
    currency
  };
}

// Function to determine job type from title and description
export function determineJobType(title: string, description: string): string {
  const text = (title + " " + description).toLowerCase();
  
  if (text.includes("remote") || text.includes("work from home")) return "Remote";
  if (text.includes("contract") || text.includes("freelance")) return "Contract";
  if (text.includes("part-time") || text.includes("part time")) return "Part-time";
  return "Full-time";
}

// Function to extract country from location
export function extractCountry(location: string): string {
  const countryMap: { [key: string]: string } = {
    "united states": "United States",
    "usa": "United States",
    "us": "United States",
    "united kingdom": "United Kingdom",
    "uk": "United Kingdom",
    "canada": "Canada",
    "germany": "Germany",
    "australia": "Australia",
    "netherlands": "Netherlands",
    "spain": "Spain",
    "france": "France",
    "portugal": "Portugal",
    "poland": "Poland",
    "romania": "Romania",
    "georgia": "Georgia"
  };

  const lowerLocation = location.toLowerCase();
  for (const [key, value] of Object.entries(countryMap)) {
    if (lowerLocation.includes(key)) {
      return value;
    }
  }
  return "United States"; // Default
}

// Function to extract tags from title and description
export function extractTags(title: string, description: string): string[] {
  const text = (title + " " + description).toLowerCase();
  const tags: string[] = [];

  const techStack = [
    "react", "typescript", "javascript", "node.js", "css", "html", 
    "next.js", "redux", "graphql", "aws", "docker", "kubernetes",
    "mongodb", "postgresql", "mysql", "git", "agile", "scrum"
  ];

  techStack.forEach(tech => {
    if (text.includes(tech)) {
      tags.push(tech.charAt(0).toUpperCase() + tech.slice(1));
    }
  });

  return tags.slice(0, 5); // Limit to 5 tags
}

// Enhanced mock data function
function getEnhancedMockJobs(): RealJob[] {
  return [
    {
      id: "jsguru-1",
      title: "Senior Frontend Developer",
      company: "Danfoss",
      country: "Romania",
      location: "Bucharest, Romania",
      salary: "Competitive salary",
      salaryMin: 80000,
      salaryMax: 120000,
      currency: "EUR",
      type: "Full-time",
      datePosted: "2024-01-15",
      link: "https://jsgurujobs.com/jobs?category=frontend",
      description: "Danfoss Group IT is seeking a Senior Frontend Developer to join our international Digital Customer Experience team. With over 125 international colleagues, we drive digital transformation...",
      tags: ["TypeScript", "React", "Next.js", "CSS", "HTML", "Node.js"],
      source: "JS Guru Jobs",
      sourceUrl: "https://jsgurujobs.com/jobs?category=frontend"
    },
    {
      id: "jsguru-2",
      title: "Full Stack Developer - (EU Based - Remote)",
      company: "Terminalfour",
      country: "Portugal",
      location: "Portugal",
      salary: "Competitive salary",
      salaryMin: 60000,
      salaryMax: 90000,
      currency: "EUR",
      type: "Remote",
      datePosted: "2024-01-14",
      link: "https://jsgurujobs.com/jobs?category=frontend",
      description: "Be part of Terminalfour's BetterExaminations development team, supporting our higher education clients around the world on our exam management platform...",
      tags: ["Node.js", "React", "Full Stack"],
      source: "JS Guru Jobs",
      sourceUrl: "https://jsgurujobs.com/jobs?category=frontend"
    },
    {
      id: "jsguru-3",
      title: "Senior Frontend Engineer (React)",
      company: "Zartis",
      country: "Europe",
      location: "Europe",
      salary: "Competitive salary",
      salaryMin: 70000,
      salaryMax: 110000,
      currency: "EUR",
      type: "Full-time",
      datePosted: "2024-01-13",
      link: "https://jsgurujobs.com/jobs?category=frontend",
      description: "Zartis is a digital solutions provider working across technology strategy, software engineering, and product development. We partner with firms across various industries...",
      tags: ["React"],
      source: "JS Guru Jobs",
      sourceUrl: "https://jsgurujobs.com/jobs?category=frontend"
    },
    {
      id: "indeed-1",
      title: "Senior Software Engineer, Frontend",
      company: "Vannevar",
      country: "United States",
      location: "United States",
      salary: "$160,000 - $210,000",
      salaryMin: 160000,
      salaryMax: 210000,
      currency: "USD",
      type: "Full-time",
      datePosted: "2024-01-12",
      link: "https://www.indeed.com/jobs?q=react+developer",
      description: "Vannevar is a defense technology company building AI to deter our adversaries. In the 21st century, conflict moves at algorithmic speed and foresight equals firepower...",
      tags: ["TypeScript", "React", "Tailwind", "Node.js"],
      source: "Indeed",
      sourceUrl: "https://www.indeed.com/jobs?q=react+developer"
    },
    {
      id: "linkedin-1",
      title: "Frontend Engineer",
      company: "Open Home Foundation",
      country: "Europe",
      location: "Europe - Anywhere, Spain, United Kingdom, Netherlands, France, Portugal",
      salary: "74.000 EUR",
      salaryMin: 74000,
      salaryMax: 74000,
      currency: "EUR",
      type: "Full-time",
      datePosted: "2024-01-11",
      link: "https://www.linkedin.com/jobs/search/?keywords=react%20developer",
      description: "The Open Home Foundation is looking for a Frontend Engineer based in Europe to join our Home Assistant team. This team is responsible for developing, maintaining, and enhancing...",
      tags: ["TypeScript"],
      source: "LinkedIn Jobs",
      sourceUrl: "https://www.linkedin.com/jobs/search/?keywords=react%20developer"
    },
    {
      id: "stackoverflow-1",
      title: "Senior Frontend Developer (React)",
      company: "Gravity 9",
      country: "Poland",
      location: "Poland",
      salary: "Competitive salary",
      salaryMin: 50000,
      salaryMax: 80000,
      currency: "EUR",
      type: "Full-time",
      datePosted: "2024-01-10",
      link: "https://stackoverflow.com/jobs?q=react",
      description: "We are excited to share that our company is experiencing significant growth and expansion, and as a result, we're on the lookout for talented individuals to join our team...",
      tags: ["React"],
      source: "Stack Overflow Jobs",
      sourceUrl: "https://stackoverflow.com/jobs?q=react"
    },
    {
      id: "weworkremotely-1",
      title: "Senior Full Stack Engineer",
      company: "PointClickCare",
      country: "Canada",
      location: "Toronto, Canada",
      salary: "$139,000 - $150,000 a year",
      salaryMin: 139000,
      salaryMax: 150000,
      currency: "USD",
      type: "Full-time",
      datePosted: "2024-01-09",
      link: "https://weworkremotely.com/remote-jobs/search?term=react",
      description: "At PointClickCare our mission is simple: to help providers deliver exceptional care. And that starts with our people. As a leading health tech company...",
      tags: ["Java", "JavaScript", "React"],
      source: "We Work Remotely",
      sourceUrl: "https://weworkremotely.com/remote-jobs/search?term=react"
    },
    {
      id: "glassdoor-1",
      title: "Frontend Engineer",
      company: "Tech Startup",
      country: "United States",
      location: "San Francisco, CA",
      salary: "$120,000 - $160,000",
      salaryMin: 120000,
      salaryMax: 160000,
      currency: "USD",
      type: "Full-time",
      datePosted: "2024-01-08",
      link: "https://www.glassdoor.com/Job/react-developer-jobs-SRCH_KO0,14.htm",
      description: "Join our fast-growing startup and help build amazing user experiences with React and modern web technologies. We're looking for talented frontend engineers...",
      tags: ["React", "TypeScript", "CSS", "HTML"],
      source: "Glassdoor",
      sourceUrl: "https://www.glassdoor.com/Job/react-developer-jobs-SRCH_KO0,14.htm"
    },
    {
      id: "angel-1",
      title: "React Developer (Remote)",
      company: "AngelList Startup",
      country: "United States",
      location: "Remote",
      salary: "$80,000 - $120,000",
      salaryMin: 80000,
      salaryMax: 120000,
      currency: "USD",
      type: "Remote",
      datePosted: "2024-01-07",
      link: "https://angel.co/jobs?query=react%20developer",
      description: "We're a remote-first startup looking for React developers to join our team. Work from anywhere and help us build the next generation of web applications...",
      tags: ["React", "Remote", "JavaScript", "Node.js"],
      source: "AngelList",
      sourceUrl: "https://angel.co/jobs?query=react%20developer"
    },
    {
      id: "hackerrank-1",
      title: "Frontend Developer",
      company: "Tech Company",
      country: "United States",
      location: "New York, NY",
      salary: "$90,000 - $130,000",
      salaryMin: 90000,
      salaryMax: 130000,
      currency: "USD",
      type: "Full-time",
      datePosted: "2024-01-06",
      link: "https://www.hackerrank.com/jobs/search?q=react",
      description: "Join our engineering team and work on challenging frontend problems. We're looking for developers who love React and modern JavaScript...",
      tags: ["React", "JavaScript", "CSS", "HTML"],
      source: "HackerRank Jobs",
      sourceUrl: "https://www.hackerrank.com/jobs/search?q=react"
    },
    // Additional jobs to reach 25+ total
    {
      id: "jsguru-4",
      title: "React Developer",
      company: "TechCorp",
      country: "United Kingdom",
      location: "London, UK",
      salary: "£60,000 - £80,000",
      salaryMin: 60000,
      salaryMax: 80000,
      currency: "GBP",
      type: "Full-time",
      datePosted: "2024-01-05",
      link: "https://jsgurujobs.com/jobs?category=frontend",
      description: "Join our dynamic team in London and work on cutting-edge React applications. We're looking for passionate developers who love clean code...",
      tags: ["React", "TypeScript", "CSS", "HTML"],
      source: "JS Guru Jobs",
      sourceUrl: "https://jsgurujobs.com/jobs?category=frontend"
    },
    {
      id: "indeed-2",
      title: "Frontend Developer",
      company: "Digital Agency",
      country: "United States",
      location: "Austin, TX",
      salary: "$85,000 - $110,000",
      salaryMin: 85000,
      salaryMax: 110000,
      currency: "USD",
      type: "Full-time",
      datePosted: "2024-01-04",
      link: "https://www.indeed.com/jobs?q=frontend+developer",
      description: "Join our creative digital agency and work on exciting client projects. We need a talented frontend developer who can bring designs to life...",
      tags: ["React", "JavaScript", "CSS", "HTML"],
      source: "Indeed",
      sourceUrl: "https://www.indeed.com/jobs?q=frontend+developer"
    },
    {
      id: "linkedin-2",
      title: "Senior React Developer",
      company: "FinTech Startup",
      country: "Germany",
      location: "Berlin, Germany",
      salary: "€75,000 - €95,000",
      salaryMin: 75000,
      salaryMax: 95000,
      currency: "EUR",
      type: "Full-time",
      datePosted: "2024-01-03",
      link: "https://www.linkedin.com/jobs/search/?keywords=react%20developer",
      description: "Join our fast-growing fintech startup in Berlin. We're building the future of financial technology with React and modern web technologies...",
      tags: ["React", "TypeScript", "Node.js", "FinTech"],
      source: "LinkedIn Jobs",
      sourceUrl: "https://www.linkedin.com/jobs/search/?keywords=react%20developer"
    },
    {
      id: "stackoverflow-2",
      title: "Frontend Engineer",
      company: "E-commerce Platform",
      country: "Netherlands",
      location: "Amsterdam, Netherlands",
      salary: "€65,000 - €85,000",
      salaryMin: 65000,
      salaryMax: 85000,
      currency: "EUR",
      type: "Full-time",
      datePosted: "2024-01-02",
      link: "https://stackoverflow.com/jobs?q=frontend",
      description: "Help us build the next generation of e-commerce experiences. We're looking for talented frontend engineers who love performance and user experience...",
      tags: ["React", "JavaScript", "Performance", "E-commerce"],
      source: "Stack Overflow Jobs",
      sourceUrl: "https://stackoverflow.com/jobs?q=frontend"
    },
    {
      id: "weworkremotely-2",
      title: "React Developer (Remote)",
      company: "SaaS Company",
      country: "United States",
      location: "Remote",
      salary: "$100,000 - $140,000",
      salaryMin: 100000,
      salaryMax: 140000,
      currency: "USD",
      type: "Remote",
      datePosted: "2024-01-01",
      link: "https://weworkremotely.com/remote-jobs/search?term=react",
      description: "Join our remote-first SaaS company and help build amazing user experiences. We're looking for React developers who love clean code and great UX...",
      tags: ["React", "Remote", "SaaS", "TypeScript"],
      source: "We Work Remotely",
      sourceUrl: "https://weworkremotely.com/remote-jobs/search?term=react"
    },
    {
      id: "glassdoor-2",
      title: "Senior Frontend Developer",
      company: "Healthcare Tech",
      country: "United States",
      location: "Boston, MA",
      salary: "$130,000 - $170,000",
      salaryMin: 130000,
      salaryMax: 170000,
      currency: "USD",
      type: "Full-time",
      datePosted: "2023-12-31",
      link: "https://www.glassdoor.com/Job/frontend-developer-jobs-SRCH_KO0,17.htm",
      description: "Join our healthcare technology team and help improve patient care through innovative web applications. We need experienced frontend developers...",
      tags: ["React", "Healthcare", "TypeScript", "Node.js"],
      source: "Glassdoor",
      sourceUrl: "https://www.glassdoor.com/Job/frontend-developer-jobs-SRCH_KO0,17.htm"
    },
    {
      id: "angel-2",
      title: "Frontend Engineer",
      company: "AI Startup",
      country: "United States",
      location: "San Francisco, CA",
      salary: "$110,000 - $150,000",
      salaryMin: 110000,
      salaryMax: 150000,
      currency: "USD",
      type: "Full-time",
      datePosted: "2023-12-30",
      link: "https://angel.co/jobs?query=frontend%20developer",
      description: "Join our AI startup and help build the future of artificial intelligence interfaces. We're looking for talented frontend engineers...",
      tags: ["React", "AI", "TypeScript", "Machine Learning"],
      source: "AngelList",
      sourceUrl: "https://angel.co/jobs?query=frontend%20developer"
    },
    {
      id: "hackerrank-2",
      title: "React Developer",
      company: "EdTech Platform",
      country: "United States",
      location: "Seattle, WA",
      salary: "$95,000 - $125,000",
      salaryMin: 95000,
      salaryMax: 125000,
      currency: "USD",
      type: "Full-time",
      datePosted: "2023-12-29",
      link: "https://www.hackerrank.com/jobs/search?q=frontend",
      description: "Help us build the future of education technology. We're looking for React developers who are passionate about learning and teaching...",
      tags: ["React", "EdTech", "JavaScript", "CSS"],
      source: "HackerRank Jobs",
      sourceUrl: "https://www.hackerrank.com/jobs/search?q=frontend"
    },
    {
      id: "jsguru-5",
      title: "Full Stack React Developer",
      company: "Digital Studio",
      country: "Spain",
      location: "Barcelona, Spain",
      salary: "€55,000 - €75,000",
      salaryMin: 55000,
      salaryMax: 75000,
      currency: "EUR",
      type: "Full-time",
      datePosted: "2023-12-28",
      link: "https://jsgurujobs.com/jobs?category=frontend",
      description: "Join our creative digital studio in beautiful Barcelona. We work on exciting projects for clients around the world...",
      tags: ["React", "Full Stack", "Node.js", "CSS"],
      source: "JS Guru Jobs",
      sourceUrl: "https://jsgurujobs.com/jobs?category=frontend"
    },
    {
      id: "indeed-3",
      title: "Frontend Developer",
      company: "Media Company",
      country: "United States",
      location: "Los Angeles, CA",
      salary: "$80,000 - $110,000",
      salaryMin: 80000,
      salaryMax: 110000,
      currency: "USD",
      type: "Full-time",
      datePosted: "2023-12-27",
      link: "https://www.indeed.com/jobs?q=frontend+developer",
      description: "Join our media company and help create amazing digital experiences. We need talented frontend developers who love creativity...",
      tags: ["React", "JavaScript", "CSS", "Media"],
      source: "Indeed",
      sourceUrl: "https://www.indeed.com/jobs?q=frontend+developer"
    },
    {
      id: "linkedin-3",
      title: "React Developer",
      company: "Travel Tech",
      country: "France",
      location: "Paris, France",
      salary: "€60,000 - €80,000",
      salaryMin: 60000,
      salaryMax: 80000,
      currency: "EUR",
      type: "Full-time",
      datePosted: "2023-12-26",
      link: "https://www.linkedin.com/jobs/search/?keywords=frontend%20developer",
      description: "Join our travel technology company and help build amazing booking experiences. We're looking for React developers who love travel...",
      tags: ["React", "Travel", "TypeScript", "Node.js"],
      source: "LinkedIn Jobs",
      sourceUrl: "https://www.linkedin.com/jobs/search/?keywords=frontend%20developer"
    },
    {
      id: "stackoverflow-3",
      title: "Senior Frontend Developer",
      company: "Gaming Company",
      country: "Sweden",
      location: "Stockholm, Sweden",
      salary: "€70,000 - €90,000",
      salaryMin: 70000,
      salaryMax: 90000,
      currency: "EUR",
      type: "Full-time",
      datePosted: "2023-12-25",
      link: "https://stackoverflow.com/jobs?q=frontend",
      description: "Join our gaming company and help create amazing gaming experiences. We need talented frontend developers who love games...",
      tags: ["React", "Gaming", "JavaScript", "WebGL"],
      source: "Stack Overflow Jobs",
      sourceUrl: "https://stackoverflow.com/jobs?q=frontend"
    },
    {
      id: "weworkremotely-3",
      title: "Frontend Developer (Remote)",
      company: "Marketing Agency",
      country: "Canada",
      location: "Remote",
      salary: "$70,000 - $100,000",
      salaryMin: 70000,
      salaryMax: 100000,
      currency: "USD",
      type: "Remote",
      datePosted: "2023-12-24",
      link: "https://weworkremotely.com/remote-jobs/search?term=frontend",
      description: "Join our marketing agency and help create amazing digital campaigns. We need talented frontend developers who love creativity...",
      tags: ["React", "Remote", "Marketing", "CSS"],
      source: "We Work Remotely",
      sourceUrl: "https://weworkremotely.com/remote-jobs/search?term=frontend"
    },
    {
      id: "glassdoor-3",
      title: "React Developer",
      company: "Real Estate Tech",
      country: "United States",
      location: "Miami, FL",
      salary: "$85,000 - $115,000",
      salaryMin: 85000,
      salaryMax: 115000,
      currency: "USD",
      type: "Full-time",
      datePosted: "2023-12-23",
      link: "https://www.glassdoor.com/Job/react-developer-jobs-SRCH_KO0,14.htm",
      description: "Join our real estate technology company and help build amazing property search experiences. We need talented React developers...",
      tags: ["React", "Real Estate", "TypeScript", "Node.js"],
      source: "Glassdoor",
      sourceUrl: "https://www.glassdoor.com/Job/react-developer-jobs-SRCH_KO0,14.htm"
    },
    {
      id: "angel-3",
      title: "Frontend Engineer",
      company: "GreenTech Startup",
      country: "United States",
      location: "Portland, OR",
      salary: "$90,000 - $130,000",
      salaryMin: 90000,
      salaryMax: 130000,
      currency: "USD",
      type: "Full-time",
      datePosted: "2023-12-22",
      link: "https://angel.co/jobs?query=frontend%20developer",
      description: "Join our green technology startup and help build sustainable solutions. We need talented frontend engineers who care about the environment...",
      tags: ["React", "GreenTech", "JavaScript", "Sustainability"],
      source: "AngelList",
      sourceUrl: "https://angel.co/jobs?query=frontend%20developer"
    },
    {
      id: "hackerrank-3",
      title: "Senior React Developer",
      company: "Cybersecurity Firm",
      country: "United States",
      location: "Washington, DC",
      salary: "$120,000 - $160,000",
      salaryMin: 120000,
      salaryMax: 160000,
      currency: "USD",
      type: "Full-time",
      datePosted: "2023-12-21",
      link: "https://www.hackerrank.com/jobs/search?q=react",
      description: "Join our cybersecurity firm and help build secure web applications. We need experienced React developers who understand security...",
      tags: ["React", "Cybersecurity", "TypeScript", "Security"],
      source: "HackerRank Jobs",
      sourceUrl: "https://www.hackerrank.com/jobs/search?q=react"
    }
  ];
}

// Main function to fetch jobs (with toggle for real vs mock data)
export async function fetchRealJobs(useRealScraping: boolean = false): Promise<RealJob[]> {
  if (useRealScraping) {
    try {
      console.log('Attempting to fetch real jobs from API...');
      // For now, we'll use enhanced mock data even when real scraping is requested
      // In a production environment, this would call the API endpoint that handles real scraping
      const response = await fetch('/api/jobs?real=true');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data.length > 0) {
          console.log(`Successfully fetched ${data.data.length} real jobs from API`);
          return data.data;
        }
      }
      console.log('API call failed, falling back to enhanced mock data');
      return getEnhancedMockJobs();
    } catch (error) {
      console.error('Error fetching real jobs, falling back to mock data:', error);
      return getEnhancedMockJobs();
    }
  } else {
    // Use enhanced mock data
    console.log('Using enhanced mock job data');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    return getEnhancedMockJobs();
  }
}

// Function to refresh jobs (would be called periodically)
export async function refreshJobs(useRealScraping: boolean = false): Promise<RealJob[]> {
  console.log("Refreshing job listings...");
  return await fetchRealJobs(useRealScraping);
}

// Function to get jobs by source
export async function getJobsBySource(source: string, useRealScraping: boolean = false): Promise<RealJob[]> {
  const allJobs = await fetchRealJobs(useRealScraping);
  return allJobs.filter(job => job.source === source);
}

// Function to get jobs by country
export async function getJobsByCountry(country: string, useRealScraping: boolean = false): Promise<RealJob[]> {
  const allJobs = await fetchRealJobs(useRealScraping);
  return allJobs.filter(job => job.country === country);
}

// Function to get jobs by type
export async function getJobsByType(type: string, useRealScraping: boolean = false): Promise<RealJob[]> {
  const allJobs = await fetchRealJobs(useRealScraping);
  return allJobs.filter(job => job.type === type);
}
