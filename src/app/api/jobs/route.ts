import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

// User agents for different browsers
const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
];

export interface JobSource {
  name: string;
  url: string;
  enabled: boolean;
  category: 'remote' | 'general' | 'tech';
}

export interface RealJob {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship' | 'unknown';
  salary: string;
  description: string;
  tags: string[];
  link: string;
  source: string;
  postedDate?: string;
  scrapedAt: Date;
}

export interface JobFilters {
  sources: string[];
  timeFilter: 'anytime' | '24h' | '7d' | '30d';
  jobType: string[];
  location: string[];
  salary: 'any' | 'entry' | 'mid' | 'senior';
}

// Job sources configuration
export const jobSources: JobSource[] = [
  {
    name: 'JS Guru Jobs',
    url: 'https://jsgurujobs.com',
    enabled: true,
    category: 'tech'
  },
  {
    name: 'We Work Remotely',
    url: 'https://weworkremotely.com',
    enabled: true,
    category: 'remote'
  },
  {
    name: 'Stack Overflow Jobs',
    url: 'https://stackoverflow.com',
    enabled: true,
    category: 'tech'
  },
  {
    name: 'Remote.co',
    url: 'https://remote.co',
    enabled: true,
    category: 'remote'
  },
  {
    name: 'AngelList',
    url: 'https://angel.co',
    enabled: true,
    category: 'tech'
  }
];

async function checkRobotsTxt(url: string): Promise<boolean> {
  try {
    const robotsUrl = new URL('/robots.txt', url).href;
    const response = await axios.get(robotsUrl, { timeout: 5000 });
    const robotsText = response.data.toLowerCase();
    
    // Only block if explicitly disallowed for all user agents
    if (robotsText.includes('user-agent: *') && robotsText.includes('disallow: /')) {
      console.log(`Robots.txt explicitly disallows scraping for ${url}`);
      return false;
    }
    
    // Allow scraping if robots.txt is unclear or doesn't explicitly block
    console.log(`Robots.txt allows scraping for ${url}`);
    return true;
  } catch (error) {
    console.log(`Could not check robots.txt for ${url}:`, error);
    // Assume allowed if we can't check
    return true;
  }
}

function extractSalaryInfo(text: string): string {
  const salaryPatterns = [
    /\$(\d{1,3}(?:,\d{3})*(?:-\d{1,3}(?:,\d{3})*)?)\s*(?:k|K)?/g,
    /(\d{1,3}(?:,\d{3})*(?:-\d{1,3}(?:,\d{3})*)?)\s*(?:USD|usd|dollars?)/g,
    /(\d{1,3}(?:,\d{3})*(?:-\d{1,3}(?:,\d{3})*)?)\s*(?:€|EUR|euros?)/g,
    /(\d{1,3}(?:,\d{3})*(?:-\d{1,3}(?:,\d{3})*)?)\s*(?:£|GBP|pounds?)/g
  ];

  for (const pattern of salaryPatterns) {
    const matches = text.match(pattern);
    if (matches && matches.length > 0) {
      return matches[0];
    }
  }
  return 'Unknown';
}

function determineJobType(text: string): 'full-time' | 'part-time' | 'contract' | 'internship' | 'unknown' {
  const lowerText = text.toLowerCase();
  if (lowerText.includes('full-time') || lowerText.includes('full time')) return 'full-time';
  if (lowerText.includes('part-time') || lowerText.includes('part time')) return 'part-time';
  if (lowerText.includes('contract') || lowerText.includes('freelance')) return 'contract';
  if (lowerText.includes('internship') || lowerText.includes('intern')) return 'internship';
  return 'unknown';
}

function extractCountry(text: string): string {
  const countries = [
    'United States', 'USA', 'US', 'Canada', 'UK', 'United Kingdom', 'Germany', 'France', 'Spain', 'Italy',
    'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Switzerland', 'Austria', 'Belgium', 'Ireland',
    'Australia', 'New Zealand', 'Japan', 'South Korea', 'Singapore', 'India', 'Brazil', 'Mexico', 'Argentina',
    'Chile', 'Colombia', 'Peru', 'Uruguay', 'Paraguay', 'Bolivia', 'Ecuador', 'Venezuela', 'Guyana', 'Suriname',
    'French Guiana', 'Falkland Islands', 'South Georgia', 'Bouvet Island', 'Heard Island', 'McDonald Islands',
    'Antarctica', 'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Azerbaijan',
    'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belize', 'Benin', 'Bhutan', 'Botswana', 'Brunei',
    'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Central African Republic', 'Chad', 'Comoros',
    'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Democratic Republic of the Congo',
    'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'El Salvador', 'Equatorial Guinea', 'Eritrea',
    'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Gabon', 'Gambia', 'Georgia', 'Ghana', 'Grenada', 'Guatemala',
    'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'Indonesia', 'Iran', 'Iraq',
    'Israel', 'Ivory Coast', 'Jamaica', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan',
    'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
    'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania',
    'Mauritius', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
    'Namibia', 'Nauru', 'Nepal', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Oman',
    'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia',
    'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino',
    'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Slovakia',
    'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Sri Lanka', 'Sudan', 'Syria',
    'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
    'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'Uruguay', 'Uzbekistan', 'Vanuatu',
    'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
  ];

  for (const country of countries) {
    if (text.includes(country)) {
      return country;
    }
  }
  return 'Remote';
}

function extractTags(text: string): string[] {
  const commonTags = [
    'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby',
    'Go', 'Rust', 'Swift', 'Kotlin', 'Scala', 'Haskell', 'Clojure', 'Elixir', 'Erlang', 'F#',
    'Angular', 'Vue.js', 'Svelte', 'Next.js', 'Nuxt.js', 'Gatsby', 'Remix', 'Astro', 'Solid',
    'Express', 'FastAPI', 'Django', 'Flask', 'Spring', 'ASP.NET', 'Laravel', 'Rails', 'Sinatra',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'Cassandra', 'DynamoDB', 'Firebase',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Jenkins', 'GitLab CI',
    'GitHub Actions', 'CircleCI', 'Travis CI', 'Jest', 'Cypress', 'Playwright', 'Selenium', 'Mocha',
    'Chai', 'Vitest', 'Testing Library', 'Storybook', 'Webpack', 'Vite', 'Rollup', 'Parcel', 'Babel',
    'ESLint', 'Prettier', 'Husky', 'Lint-staged', 'Commitlint', 'Semantic Release', 'GraphQL', 'REST',
    'gRPC', 'WebSocket', 'Socket.io', 'Puppeteer', 'Cheerio', 'Axios', 'Fetch', 'jQuery', 'Lodash',
    'Moment.js', 'Day.js', 'date-fns', 'Ramda', 'Immutable.js', 'Redux', 'Zustand', 'Jotai', 'Recoil',
    'React Query', 'SWR', 'Apollo Client', 'URQL', 'Tailwind CSS', 'Bootstrap', 'Material-UI', 'Ant Design',
    'Chakra UI', 'Mantine', 'Headless UI', 'Radix UI', 'Framer Motion', 'React Spring', 'Lottie',
    'Three.js', 'D3.js', 'Chart.js', 'Recharts', 'Victory', 'Nivo', 'Puppeteer', 'Playwright', 'Cypress',
    'Selenium', 'Jest', 'Vitest', 'Testing Library', 'Storybook', 'Webpack', 'Vite', 'Rollup', 'Parcel',
    'Babel', 'ESLint', 'Prettier', 'Husky', 'Lint-staged', 'Commitlint', 'Semantic Release', 'GraphQL',
    'REST', 'gRPC', 'WebSocket', 'Socket.io', 'Puppeteer', 'Cheerio', 'Axios', 'Fetch', 'jQuery', 'Lodash'
  ];

  const foundTags: string[] = [];
  const lowerText = text.toLowerCase();

  for (const tag of commonTags) {
    if (lowerText.includes(tag.toLowerCase())) {
      foundTags.push(tag);
    }
  }

  return foundTags.slice(0, 10); // Limit to 10 tags
}

// JS Guru Jobs scraper
async function scrapeJSGuruJobs(): Promise<RealJob[]> {
  const jobs: RealJob[] = [];
  const sourceUrl = 'https://jsgurujobs.com/jobs?search=frontend';
  
  try {
    console.log('Starting JS Guru Jobs scraping...');
    
    // Check robots.txt
    const canScrape = await checkRobotsTxt('https://jsgurujobs.com');
    if (!canScrape) {
      console.log('JS Guru Jobs robots.txt disallows scraping');
      return jobs;
    }

    console.log('Fetching JS Guru Jobs page...');
    const response = await axios.get(sourceUrl, {
      headers: {
        'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)],
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      timeout: 10000
    });

    console.log(`Response received, status: ${response.status}`);
    console.log(`Response length: ${response.data.length}`);

    const $ = cheerio.load(response.data);
    
    // Find the jobs container
    const jobsContainer = $('.bg-white.shadow-sm.rounded-lg.divide-y.divide-gray-200');
    const jobElements = jobsContainer.find('div.p-6');
    
    console.log(`Total div.p-6 elements: ${jobElements.length}`);

    jobElements.each((index, element) => {
      try {
        const $job = $(element);
        
        // Skip if this is not a job listing (e.g., search form)
        const titleElement = $job.find('h3 a');
        if (!titleElement.length) return;
        
        const title = titleElement.text().trim();
        const link = titleElement.attr('href') || '';
        const company = $job.find('p.mt-1').text().trim();
        
        const locationJobTypeSalary = $job.find('div.mt-2.flex span').map((_, el) => $(el).text().trim()).get();
        const location = locationJobTypeSalary[0] || 'Remote';
        const jobType = determineJobType(locationJobTypeSalary.join(' '));
        const salary = extractSalaryInfo(locationJobTypeSalary.join(' '));
        
        const tags = $job.find('span.inline-flex').map((_, el) => $(el).text().trim()).get();
        const description = $job.find('div.mt-4.text-sm').text().trim();
        
        const fullLink = link.startsWith('http') ? link : `https://jsgurujobs.com${link}`;
        
        const job: RealJob = {
          id: `jsguru-${index}`,
          title,
          company,
          location: extractCountry(location),
          jobType,
          salary,
          description,
          tags: [...tags, ...extractTags(description)],
          link: fullLink,
          source: 'JS Guru Jobs',
          scrapedAt: new Date()
        };
        
        jobs.push(job);
        console.log(`Added job: ${title} at ${company}`);
      } catch (error) {
        console.log(`Error processing job ${index}:`, error);
      }
    });

    console.log(`Successfully scraped ${jobs.length} jobs from JS Guru Jobs`);
  } catch (error) {
    console.log('Error scraping JS Guru Jobs:', error);
  }
  
  return jobs;
}

// We Work Remotely scraper
async function scrapeWeWorkRemotely(): Promise<RealJob[]> {
  const jobs: RealJob[] = [];
  const sourceUrl = 'https://weworkremotely.com/categories/remote-programming-jobs';
  
  try {
    console.log('Starting We Work Remotely scraping...');
    
    const canScrape = await checkRobotsTxt('https://weworkremotely.com');
    if (!canScrape) {
      console.log('We Work Remotely robots.txt disallows scraping');
      return jobs;
    }

    const response = await axios.get(sourceUrl, {
      headers: {
        'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)],
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);
    
    // Find job listings
    const jobElements = $('.job-list-item');
    
    jobElements.each((index, element) => {
      try {
        const $job = $(element);
        
        const title = $job.find('.title').text().trim();
        const company = $job.find('.company').text().trim();
        const location = $job.find('.region').text().trim();
        const link = $job.find('a').attr('href') || '';
        const description = $job.find('.description').text().trim();
        
        const fullLink = link.startsWith('http') ? link : `https://weworkremotely.com${link}`;
        
        const job: RealJob = {
          id: `wwr-${index}`,
          title,
          company,
          location: extractCountry(location),
          jobType: determineJobType(description),
          salary: extractSalaryInfo(description),
          description,
          tags: extractTags(description),
          link: fullLink,
          source: 'We Work Remotely',
          scrapedAt: new Date()
        };
        
        jobs.push(job);
      } catch (error) {
        console.log(`Error processing We Work Remotely job ${index}:`, error);
      }
    });

    console.log(`Successfully scraped ${jobs.length} jobs from We Work Remotely`);
  } catch (error) {
    console.log('Error scraping We Work Remotely:', error);
  }
  
  return jobs;
}

// Stack Overflow Jobs scraper
async function scrapeStackOverflowJobs(): Promise<RealJob[]> {
  const jobs: RealJob[] = [];
  const sourceUrl = 'https://stackoverflow.com/jobs?q=frontend&l=remote';
  
  try {
    console.log('Starting Stack Overflow Jobs scraping...');
    
    const canScrape = await checkRobotsTxt('https://stackoverflow.com');
    if (!canScrape) {
      console.log('Stack Overflow robots.txt disallows scraping');
      return jobs;
    }

    const response = await axios.get(sourceUrl, {
      headers: {
        'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)],
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);
    
    // Find job listings
    const jobElements = $('.job-result');
    
    jobElements.each((index, element) => {
      try {
        const $job = $(element);
        
        const title = $job.find('.job-title').text().trim();
        const company = $job.find('.company-name').text().trim();
        const location = $job.find('.job-location').text().trim();
        const link = $job.find('a').attr('href') || '';
        const description = $job.find('.job-description').text().trim();
        
        const fullLink = link.startsWith('http') ? link : `https://stackoverflow.com${link}`;
        
        const job: RealJob = {
          id: `so-${index}`,
          title,
          company,
          location: extractCountry(location),
          jobType: determineJobType(description),
          salary: extractSalaryInfo(description),
          description,
          tags: extractTags(description),
          link: fullLink,
          source: 'Stack Overflow Jobs',
          scrapedAt: new Date()
        };
        
        jobs.push(job);
      } catch (error) {
        console.log(`Error processing Stack Overflow job ${index}:`, error);
      }
    });

    console.log(`Successfully scraped ${jobs.length} jobs from Stack Overflow Jobs`);
  } catch (error) {
    console.log('Error scraping Stack Overflow Jobs:', error);
  }
  
  return jobs;
}

// Remote.co scraper
async function scrapeRemoteCo(): Promise<RealJob[]> {
  const jobs: RealJob[] = [];
  const sourceUrl = 'https://remote.co/remote-jobs/developer/';
  
  try {
    console.log('Starting Remote.co scraping...');
    
    const canScrape = await checkRobotsTxt('https://remote.co');
    if (!canScrape) {
      console.log('Remote.co robots.txt disallows scraping');
      return jobs;
    }

    const response = await axios.get(sourceUrl, {
      headers: {
        'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)],
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);
    
    // Find job listings
    const jobElements = $('.job_listing');
    
    jobElements.each((index, element) => {
      try {
        const $job = $(element);
        
        const title = $job.find('.job_title').text().trim();
        const company = $job.find('.company_name').text().trim();
        const location = $job.find('.job_location').text().trim();
        const link = $job.find('a').attr('href') || '';
        const description = $job.find('.job_description').text().trim();
        
        const fullLink = link.startsWith('http') ? link : `https://remote.co${link}`;
        
        const job: RealJob = {
          id: `remote-${index}`,
          title,
          company,
          location: extractCountry(location),
          jobType: determineJobType(description),
          salary: extractSalaryInfo(description),
          description,
          tags: extractTags(description),
          link: fullLink,
          source: 'Remote.co',
          scrapedAt: new Date()
        };
        
        jobs.push(job);
      } catch (error) {
        console.log(`Error processing Remote.co job ${index}:`, error);
      }
    });

    console.log(`Successfully scraped ${jobs.length} jobs from Remote.co`);
  } catch (error) {
    console.log('Error scraping Remote.co:', error);
  }
  
  return jobs;
}

// AngelList scraper
async function scrapeAngelList(): Promise<RealJob[]> {
  const jobs: RealJob[] = [];
  const sourceUrl = 'https://angel.co/jobs?job_types[]=full-time&keywords=frontend';
  
  try {
    console.log('Starting AngelList scraping...');
    
    const canScrape = await checkRobotsTxt('https://angel.co');
    if (!canScrape) {
      console.log('AngelList robots.txt disallows scraping');
      return jobs;
    }

    const response = await axios.get(sourceUrl, {
      headers: {
        'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)],
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);
    
    // Find job listings
    const jobElements = $('.job-listing');
    
    jobElements.each((index, element) => {
      try {
        const $job = $(element);
        
        const title = $job.find('.job-title').text().trim();
        const company = $job.find('.company-name').text().trim();
        const location = $job.find('.job-location').text().trim();
        const link = $job.find('a').attr('href') || '';
        const description = $job.find('.job-description').text().trim();
        
        const fullLink = link.startsWith('http') ? link : `https://angel.co${link}`;
        
        const job: RealJob = {
          id: `angel-${index}`,
          title,
          company,
          location: extractCountry(location),
          jobType: determineJobType(description),
          salary: extractSalaryInfo(description),
          description,
          tags: extractTags(description),
          link: fullLink,
          source: 'AngelList',
          scrapedAt: new Date()
        };
        
        jobs.push(job);
      } catch (error) {
        console.log(`Error processing AngelList job ${index}:`, error);
      }
    });

    console.log(`Successfully scraped ${jobs.length} jobs from AngelList`);
  } catch (error) {
    console.log('Error scraping AngelList:', error);
  }
  
  return jobs;
}

// Main scraping function
async function scrapeAllJobSources(filters?: JobFilters): Promise<RealJob[]> {
  const allJobs: RealJob[] = [];
  
  console.log('Starting job scraping from all sources...');
  
  // Get enabled sources based on filters
  const enabledSources = jobSources.filter(source => 
    source.enabled && (!filters?.sources.length || filters.sources.includes(source.name))
  );
  
  console.log(`Scraping from ${enabledSources.length} enabled sources:`, enabledSources.map(s => s.name));
  
  // Scrape from each enabled source
  const scrapingPromises = enabledSources.map(async (source) => {
    switch (source.name) {
      case 'JS Guru Jobs':
        return await scrapeJSGuruJobs();
      case 'We Work Remotely':
        return await scrapeWeWorkRemotely();
      case 'Stack Overflow Jobs':
        return await scrapeStackOverflowJobs();
      case 'Remote.co':
        return await scrapeRemoteCo();
      case 'AngelList':
        return await scrapeAngelList();
      default:
        return [];
    }
  });
  
  const results = await Promise.allSettled(scrapingPromises);
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      const jobs = result.value;
      allJobs.push(...jobs);
      console.log(`Added ${jobs.length} jobs from ${enabledSources[index].name}`);
    } else {
      console.log(`Failed to scrape from ${enabledSources[index].name}:`, result.reason);
    }
  });
  
  console.log(`Total real jobs found: ${allJobs.length}`);
  
  // Apply time filter if specified
  if (filters?.timeFilter && filters.timeFilter !== 'anytime') {
    const now = new Date();
    const timeFilterMap = {
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000
    };
    
    const cutoffTime = now.getTime() - timeFilterMap[filters.timeFilter];
    const filteredJobs = allJobs.filter(job => job.scrapedAt.getTime() >= cutoffTime);
    
    console.log(`Applied time filter ${filters.timeFilter}: ${allJobs.length} -> ${filteredJobs.length} jobs`);
    return filteredJobs;
  }
  
  return allJobs;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const useRealScraping = searchParams.get('real') === 'true';
    
    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;
    
    if (useRealScraping) {
      console.log('Attempting real web scraping...');
      
      // Parse filters from query parameters
      const filters: JobFilters = {
        sources: searchParams.get('sources')?.split(',') || [],
        timeFilter: (searchParams.get('timeFilter') as 'anytime' | '24h' | '7d' | '30d') || 'anytime',
        jobType: searchParams.get('jobType')?.split(',') || [],
        location: searchParams.get('location')?.split(',') || [],
        salary: (searchParams.get('salary') as 'any' | 'entry' | 'mid' | 'senior') || 'any'
      };
      
      const allJobs = await scrapeAllJobSources(filters);
      
      if (allJobs.length === 0) {
        console.log('Real scraping returned no results');
        return NextResponse.json({
          success: false,
          message: 'No jobs found',
          count: 0,
          data: [],
          pagination: {
            page,
            limit,
            total: 0,
            totalPages: 0,
            hasNext: false,
            hasPrev: false
          },
          sources: jobSources.map(s => ({ name: s.name, enabled: s.enabled }))
        });
      }
      
      // Apply pagination
      const paginatedJobs = allJobs.slice(offset, offset + limit);
      const totalPages = Math.ceil(allJobs.length / limit);
      
      console.log(`Successfully scraped ${allJobs.length} jobs, returning ${paginatedJobs.length} for page ${page}`);
      
      return NextResponse.json({
        success: true,
        message: 'Jobs scraped successfully',
        count: allJobs.length,
        data: paginatedJobs,
        pagination: {
          page,
          limit,
          total: allJobs.length,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        },
        sources: jobSources.map(s => ({ name: s.name, enabled: s.enabled })),
        filters
      });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Please specify real=true to get real jobs',
      count: 0,
      data: [],
      pagination: {
        page,
        limit,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false
      },
      sources: jobSources.map(s => ({ name: s.name, enabled: s.enabled }))
    });
    
  } catch (error) {
    console.error('Error in jobs API:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      count: 0,
      data: [],
      pagination: {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false
      },
      sources: jobSources.map(s => ({ name: s.name, enabled: s.enabled }))
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { filters } = body;
    
    console.log('POST request with filters:', filters);
    
    const jobs = await scrapeAllJobSources(filters);
    
    return NextResponse.json({
      success: true,
      message: 'Jobs scraped successfully',
      count: jobs.length,
      data: jobs,
      sources: jobSources.map(s => ({ name: s.name, enabled: s.enabled })),
      filters
    });
    
  } catch (error) {
    console.error('Error in jobs POST API:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      count: 0,
      data: [],
      sources: jobSources.map(s => ({ name: s.name, enabled: s.enabled }))
    }, { status: 500 });
  }
}
