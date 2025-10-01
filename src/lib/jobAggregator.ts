// Job Aggregator Service
// This service fetches real job data from multiple sources

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
    name: 'JS Guru Jobs',
    url: 'https://jsgurujobs.com/jobs?category=frontend',
    type: 'scrape',
    selectors: {
      jobCard: '.job-listing, .job-card',
      title: 'h3, .job-title',
      company: '.company-name, .company',
      location: '.location, .job-location',
      link: "a[href*='/jobs/']",
      datePosted: '.date, .posted-date',
    },
  },
  {
    name: 'LinkedIn Jobs',
    url: 'https://www.linkedin.com/jobs/search/?keywords=react%20developer',
    type: 'scrape',
    selectors: {
      jobCard: '.job-search-card',
      title: '.job-search-card__title',
      company: '.job-search-card__subtitle',
      location: '.job-search-card__location',
      link: "a[href*='/jobs/view/']",
    },
  },
  {
    name: 'Indeed',
    url: 'https://www.indeed.com/jobs?q=react+developer',
    type: 'scrape',
    selectors: {
      jobCard: '.job_seen_beacon',
      title: 'h2.jobTitle',
      company: '.companyName',
      location: '.companyLocation',
      link: "a[href*='/viewjob']",
    },
  },
  {
    name: 'Stack Overflow Jobs',
    url: 'https://stackoverflow.com/jobs?q=react',
    type: 'scrape',
    selectors: {
      jobCard: '.job',
      title: '.job-title',
      company: '.company-name',
      location: '.job-location',
      link: "a[href*='/jobs/']",
    },
  },
  {
    name: 'We Work Remotely',
    url: 'https://weworkremotely.com/remote-jobs/search?term=react',
    type: 'scrape',
    selectors: {
      jobCard: '.job',
      title: '.title',
      company: '.company',
      location: '.region',
      link: "a[href*='/remote-jobs/']",
    },
  },
];

// Function to extract salary information from text
export function extractSalaryInfo(salaryText: string): {
  salary: string;
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
} {
  if (!salaryText) {
    return { salary: 'Salary not specified', currency: 'USD' };
  }

  const text = salaryText.toLowerCase();

  // Extract currency
  let currency = 'USD';
  if (text.includes('£') || text.includes('gbp')) currency = 'GBP';
  else if (text.includes('€') || text.includes('eur')) currency = 'EUR';
  else if (text.includes('a$') || text.includes('aud')) currency = 'AUD';
  else if (text.includes('$') || text.includes('usd')) currency = 'USD';

  // Extract numbers
  const numbers = text.match(/\d{1,3}(?:,\d{3})*(?:\.\d{2})?/g);
  if (!numbers || numbers.length === 0) {
    return { salary: salaryText, currency };
  }

  const nums = numbers.map(n => parseInt(n.replace(/,/g, '')));
  const min = Math.min(...nums);
  const max = Math.max(...nums);

  return {
    salary: salaryText,
    salaryMin: min,
    salaryMax: max,
    currency,
  };
}

// Function to determine job type from title and description
export function determineJobType(title: string, description: string): string {
  const text = (title + ' ' + description).toLowerCase();

  if (text.includes('remote') || text.includes('work from home'))
    return 'Remote';
  if (text.includes('contract') || text.includes('freelance'))
    return 'Contract';
  if (text.includes('part-time') || text.includes('part time'))
    return 'Part-time';
  return 'Full-time';
}

// Function to extract country from location
export function extractCountry(location: string): string {
  const countryMap: { [key: string]: string } = {
    'united states': 'United States',
    usa: 'United States',
    us: 'United States',
    'united kingdom': 'United Kingdom',
    uk: 'United Kingdom',
    canada: 'Canada',
    germany: 'Germany',
    australia: 'Australia',
    netherlands: 'Netherlands',
    spain: 'Spain',
    france: 'France',
    portugal: 'Portugal',
    poland: 'Poland',
    romania: 'Romania',
    georgia: 'Georgia',
  };

  const lowerLocation = location.toLowerCase();
  for (const [key, value] of Object.entries(countryMap)) {
    if (lowerLocation.includes(key)) {
      return value;
    }
  }
  return 'United States'; // Default
}

// Function to extract tags from title and description
export function extractTags(title: string, description: string): string[] {
  const text = (title + ' ' + description).toLowerCase();
  const tags: string[] = [];

  const techStack = [
    'react',
    'typescript',
    'javascript',
    'node.js',
    'css',
    'html',
    'next.js',
    'redux',
    'graphql',
    'aws',
    'docker',
    'kubernetes',
    'mongodb',
    'postgresql',
    'mysql',
    'git',
    'agile',
    'scrum',
  ];

  techStack.forEach(tech => {
    if (text.includes(tech)) {
      tags.push(tech.charAt(0).toUpperCase() + tech.slice(1));
    }
  });

  return tags.slice(0, 5); // Limit to 5 tags
}

// Main function to fetch real jobs only
export async function fetchRealJobs(): Promise<RealJob[]> {
  try {
    console.log('Fetching real jobs from API...');
    const response = await fetch('/api/jobs?real=true');
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.data.length > 0) {
        console.log(
          `Successfully fetched ${data.data.length} real jobs from API`
        );
        return data.data;
      }
    }
    console.log('No real jobs available');
    return [];
  } catch (error) {
    console.error('Error fetching real jobs:', error);
    return [];
  }
}

// Function to refresh jobs
export async function refreshJobs(): Promise<RealJob[]> {
  console.log('Refreshing job listings...');
  return await fetchRealJobs();
}

// Function to get jobs by source
export async function getJobsBySource(source: string): Promise<RealJob[]> {
  const allJobs = await fetchRealJobs();
  return allJobs.filter(job => job.source === source);
}

// Function to get jobs by country
export async function getJobsByCountry(country: string): Promise<RealJob[]> {
  const allJobs = await fetchRealJobs();
  return allJobs.filter(job => job.country === country);
}

// Function to get jobs by type
export async function getJobsByType(type: string): Promise<RealJob[]> {
  const allJobs = await fetchRealJobs();
  return allJobs.filter(job => job.type === type);
}
