import * as cheerio from 'cheerio';
import axios from 'axios';
import { RealJob, extractSalaryInfo, determineJobType, extractCountry, extractTags } from './jobAggregator';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
];

async function checkRobotsTxt(url: string): Promise<boolean> {
  try {
    const robotsUrl = new URL('/robots.txt', url).href;
    const response = await axios.get(robotsUrl, { timeout: 5000 });
    const robotsText = response.data.toLowerCase();
    
    // Check if scraping is disallowed
    if (robotsText.includes('disallow: /') || robotsText.includes('user-agent: *')) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(`Could not check robots.txt for ${url}:`, error);
    return true; // Assume allowed if we can't check
  }
}

export async function scrapeJSGuruJobs(): Promise<RealJob[]> {
  const sourceUrl = 'https://jsgurujobs.com/jobs?category=frontend';
  try {
    if (!(await checkRobotsTxt('https://jsgurujobs.com'))) {
      console.log('JS Guru Jobs robots.txt disallows scraping');
      return [];
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
      timeout: 30000
    });

    const $ = cheerio.load(response.data);
    const jobs: RealJob[] = [];

    // Try different selectors for job listings
    const jobSelectors = [
      '.job-listing',
      '.job-card',
      '.job-item',
      '[data-testid="job-listing"]',
      '.job'
    ];

    let jobElements: cheerio.Cheerio<cheerio.Element> | null = null;
    for (const selector of jobSelectors) {
      jobElements = $(selector);
      if (jobElements.length > 0) {
        console.log(`Found ${jobElements.length} jobs using selector: ${selector}`);
        break;
      }
    }

    if (!jobElements || jobElements.length === 0) {
      console.log('No job elements found on JS Guru Jobs');
      return [];
    }

    jobElements.each((index, element) => {
      try {
        const $el = $(element);
        
        const title = $el.find('h3, .job-title, .title').first().text().trim();
        const company = $el.find('.company-name, .company, .employer').first().text().trim();
        const location = $el.find('.location, .job-location, .region').first().text().trim();
        const salary = $el.find('.salary, .compensation').first().text().trim();
        const link = $el.find('a[href*="/jobs/"]').first().attr('href');
        const datePosted = $el.find('.date, .posted-date, .time').first().text().trim();

        if (title && company) {
          const jobUrl = link ? new URL(link, sourceUrl).href : sourceUrl;
          const salaryInfo = extractSalaryInfo(salary);
          const jobType = determineJobType(title, '');
          const country = extractCountry(location);
          const tags = extractTags(title, '');

          jobs.push({
            id: `jsguru-${index + 1}`,
            title,
            company,
            country,
            location: location || 'Location not specified',
            salary: salaryInfo.salary,
            salaryMin: salaryInfo.salaryMin,
            salaryMax: salaryInfo.salaryMax,
            currency: salaryInfo.currency,
            type: jobType,
            datePosted: datePosted || new Date().toISOString().split('T')[0],
            link: jobUrl,
            description: `${title} at ${company}`,
            tags,
            source: "JS Guru Jobs",
            sourceUrl
          });
        }
      } catch (error) {
        console.error(`Error parsing job ${index}:`, error);
      }
    });

    console.log(`Scraped ${jobs.length} jobs from JS Guru Jobs`);
    return jobs;
  } catch (error) {
    console.error('Error scraping JS Guru Jobs:', error);
    return [];
  }
}

// Simplified scrapers for other job boards (return empty arrays due to anti-scraping measures)
export async function scrapeLinkedInJobs(): Promise<RealJob[]> {
  console.log('LinkedIn scraping not implemented due to anti-scraping measures');
  return [];
}

export async function scrapeIndeedJobs(): Promise<RealJob[]> {
  console.log('Indeed scraping not implemented due to anti-scraping measures');
  return [];
}

export async function scrapeStackOverflowJobs(): Promise<RealJob[]> {
  console.log('Stack Overflow scraping not implemented due to anti-scraping measures');
  return [];
}

export async function scrapeWeWorkRemotelyJobs(): Promise<RealJob[]> {
  console.log('We Work Remotely scraping not implemented due to anti-scraping measures');
  return [];
}

export async function scrapeAllJobSources(): Promise<RealJob[]> {
  console.log('Starting job scraping from all sources...');
  try {
    const jsGuruJobs = await scrapeJSGuruJobs();
    const allJobs: RealJob[] = [];
    
    if (jsGuruJobs.length > 0) {
      allJobs.push(...jsGuruJobs);
      console.log(`Added ${jsGuruJobs.length} jobs from JS Guru Jobs`);
    }

    // Remove mock jobs - only return real scraped jobs
    console.log(`Total real jobs found: ${allJobs.length}`);
    return allJobs;
  } catch (error) {
    console.error('Error in scrapeAllJobSources:', error);
    return [];
  }
}

export async function getJobDetails(jobUrl: string): Promise<string> {
  try {
    const response = await axios.get(jobUrl, {
      headers: {
        'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)],
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      timeout: 30000
    });

    const $ = cheerio.load(response.data);
    
    // Try to extract job description
    const descriptionSelectors = [
      '.job-description',
      '.description',
      '.content',
      '.job-details',
      '[data-testid="job-description"]'
    ];

    for (const selector of descriptionSelectors) {
      const description = $(selector).first().text().trim();
      if (description) {
        return description.substring(0, 500) + (description.length > 500 ? '...' : '');
      }
    }

    return 'Job description not available';
  } catch (error) {
    console.error('Error fetching job details:', error);
    return 'Job description not available';
  }
}
