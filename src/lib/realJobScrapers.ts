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

export async function scrapeJSGuruJobs(): Promise<RealJob[]> {
  const sourceUrl = 'https://jsgurujobs.com/jobs?search=frontend';
  try {
    console.log('Starting JS Guru Jobs scraping...');
    
    if (!(await checkRobotsTxt('https://jsgurujobs.com'))) {
      console.log('JS Guru Jobs robots.txt disallows scraping');
      return [];
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
      timeout: 30000
    });

    console.log('Response received, status:', response.status);
    console.log('Response length:', response.data.length);

    const $ = cheerio.load(response.data);
    const jobs: RealJob[] = [];

    // Find all div.p-6 elements that contain job titles
    const allP6Divs = $('div.p-6');
    console.log(`Total div.p-6 elements: ${allP6Divs.length}`);

    let jobIndex = 0;
    allP6Divs.each((index, element) => {
      try {
        const $el = $(element);
        
        // Extract job title
        const titleElement = $el.find('h3 a').first();
        const title = titleElement.text().trim();
        const jobLink = titleElement.attr('href');
        
        // Only process if this is actually a job (has a title)
        if (!title) return;
        
        console.log(`Processing job ${jobIndex + 1}: ${title}`);
        
        // Extract company name
        const company = $el.find('p.mt-1').text().trim();
        
        // Extract location, job type, and salary from the flex container
        const infoElements = $el.find('div.mt-2.flex span');
        let location = '';
        let jobType = '';
        let salary = '';
        
        infoElements.each((i, infoEl) => {
          const text = $(infoEl).text().trim();
          if (i === 0) location = text; // First span is location
          else if (i === 1) jobType = text; // Second span is job type
          else if (i === 2) salary = text; // Third span is salary
        });
        
        // Extract tags
        const tags: string[] = [];
        $el.find('span.inline-flex').each((i, tagEl) => {
          const tag = $(tagEl).text().trim();
          if (tag) tags.push(tag);
        });
        
        // Extract description
        const description = $el.find('div.mt-4.text-sm').text().trim();

        if (title && company) {
          const jobUrl = jobLink ? new URL(jobLink, 'https://jsgurujobs.com').href : sourceUrl;
          const salaryInfo = extractSalaryInfo(salary);
          const jobTypeEnum = determineJobType(title, jobType);
          const country = extractCountry(location);
          const extractedTags = extractTags(title, description);

          jobs.push({
            id: `jsguru-${jobIndex + 1}`,
            title,
            company,
            country,
            location: location || 'Location not specified',
            salary: salaryInfo.salary,
            salaryMin: salaryInfo.salaryMin,
            salaryMax: salaryInfo.salaryMax,
            currency: salaryInfo.currency,
            type: jobTypeEnum,
            datePosted: new Date().toISOString().split('T')[0], // Use current date as fallback
            link: jobUrl,
            description: description || `${title} at ${company}`,
            tags: [...new Set([...tags, ...extractedTags])], // Combine and deduplicate tags
            source: "JS Guru Jobs",
            sourceUrl
          });
          
          console.log(`Added job: ${title} at ${company}`);
          jobIndex++;
        }
      } catch (error) {
        console.error(`Error parsing job ${index}:`, error);
      }
    });

    console.log(`Successfully scraped ${jobs.length} jobs from JS Guru Jobs`);
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
