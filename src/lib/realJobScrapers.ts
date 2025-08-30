import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import axios from 'axios';
import { RealJob, extractSalaryInfo, determineJobType, extractCountry, extractTags } from './jobAggregator';

// Utility function for delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// User agents for rotation
const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15'
];

// Check robots.txt before scraping
async function checkRobotsTxt(url: string): Promise<boolean> {
  try {
    const robotsUrl = new URL('/robots.txt', url).href;
    const response = await axios.get(robotsUrl, { timeout: 5000 });
    return !response.data.includes('Disallow: /jobs');
  } catch {
    return true; // Default to allowing if robots.txt is not accessible
  }
}

// JS Guru Jobs Scraper
export async function scrapeJSGuruJobs(): Promise<RealJob[]> {
  const sourceUrl = 'https://jsgurujobs.com/jobs?category=frontend';
  
  try {
    // Check robots.txt
    if (!(await checkRobotsTxt('https://jsgurujobs.com'))) {
      console.log('JS Guru Jobs robots.txt disallows scraping');
      return [];
    }

    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Set random user agent
    await page.setUserAgent(userAgents[Math.floor(Math.random() * userAgents.length)]);
    
    // Add delay to respect rate limits
    await delay(2000);

    await page.goto(sourceUrl, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    const jobs = await page.evaluate(() => {
      const jobElements = document.querySelectorAll('.job-listing, .job-card, [class*="job"]');
      const jobs: any[] = [];

      jobElements.forEach((element) => {
        const title = element.querySelector('h3, .job-title, [class*="title"]')?.textContent?.trim();
        const company = element.querySelector('.company-name, .company, [class*="company"]')?.textContent?.trim();
        const location = element.querySelector('.location, .job-location, [class*="location"]')?.textContent?.trim();
        const link = element.querySelector('a[href*="/jobs/"], a[href*="job"]')?.getAttribute('href');
        const datePosted = element.querySelector('.date, .posted-date, [class*="date"]')?.textContent?.trim();
        const salary = element.querySelector('.salary, [class*="salary"]')?.textContent?.trim();

        if (title && company && link) {
          jobs.push({
            title,
            company,
            location: location || 'Location not specified',
            link: link.startsWith('http') ? link : `https://jsgurujobs.com${link}`,
            datePosted: datePosted || new Date().toISOString().split('T')[0],
            salary: salary || 'Competitive salary',
            source: 'JS Guru Jobs',
            sourceUrl
          });
        }
      });

      return jobs;
    });

    await browser.close();

    return jobs.map(job => ({
      id: `jsguru-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...job,
      salaryMin: undefined,
      salaryMax: undefined,
      currency: 'USD',
      type: determineJobType(job.title, job.description || ''),
      description: job.description || 'Job description not available',
      tags: extractTags(job.title, job.description || ''),
      country: extractCountry(job.location)
    }));

  } catch (error) {
    console.error('Error scraping JS Guru Jobs:', error);
    return [];
  }
}

// LinkedIn Jobs Scraper
export async function scrapeLinkedInJobs(): Promise<RealJob[]> {
  const sourceUrl = 'https://www.linkedin.com/jobs/search/?keywords=react%20developer';
  
  try {
    if (!(await checkRobotsTxt('https://www.linkedin.com'))) {
      console.log('LinkedIn robots.txt disallows scraping');
      return [];
    }

    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    await page.setUserAgent(userAgents[Math.floor(Math.random() * userAgents.length)]);
    await delay(3000);

    await page.goto(sourceUrl, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    const jobs = await page.evaluate(() => {
      const jobElements = document.querySelectorAll('.job-search-card, [class*="job-card"]');
      const jobs: any[] = [];

      jobElements.forEach((element) => {
        const title = element.querySelector('.job-search-card__title, [class*="title"]')?.textContent?.trim();
        const company = element.querySelector('.job-search-card__subtitle, [class*="company"]')?.textContent?.trim();
        const location = element.querySelector('.job-search-card__location, [class*="location"]')?.textContent?.trim();
        const link = element.querySelector('a[href*="/jobs/view/"], a[href*="job"]')?.getAttribute('href');
        const datePosted = element.querySelector('.job-search-card__listdate, [class*="date"]')?.textContent?.trim();

        if (title && company && link) {
          jobs.push({
            title,
            company,
            location: location || 'Location not specified',
            link: link.startsWith('http') ? link : `https://www.linkedin.com${link}`,
            datePosted: datePosted || new Date().toISOString().split('T')[0],
            salary: 'Competitive salary',
            source: 'LinkedIn Jobs',
            sourceUrl
          });
        }
      });

      return jobs;
    });

    await browser.close();

    return jobs.map(job => ({
      id: `linkedin-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...job,
      salaryMin: undefined,
      salaryMax: undefined,
      currency: 'USD',
      type: determineJobType(job.title, job.description || ''),
      description: job.description || 'Job description not available',
      tags: extractTags(job.title, job.description || ''),
      country: extractCountry(job.location)
    }));

  } catch (error) {
    console.error('Error scraping LinkedIn Jobs:', error);
    return [];
  }
}

// Indeed Jobs Scraper
export async function scrapeIndeedJobs(): Promise<RealJob[]> {
  const sourceUrl = 'https://www.indeed.com/jobs?q=react+developer';
  
  try {
    if (!(await checkRobotsTxt('https://www.indeed.com'))) {
      console.log('Indeed robots.txt disallows scraping');
      return [];
    }

    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    await page.setUserAgent(userAgents[Math.floor(Math.random() * userAgents.length)]);
    await delay(3000);

    await page.goto(sourceUrl, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    const jobs = await page.evaluate(() => {
      const jobElements = document.querySelectorAll('.job_seen_beacon, [class*="job"]');
      const jobs: any[] = [];

      jobElements.forEach((element) => {
        const title = element.querySelector('h2.jobTitle, [class*="title"]')?.textContent?.trim();
        const company = element.querySelector('.companyName, [class*="company"]')?.textContent?.trim();
        const location = element.querySelector('.companyLocation, [class*="location"]')?.textContent?.trim();
        const link = element.querySelector('a[href*="/viewjob"], a[href*="job"]')?.getAttribute('href');
        const salary = element.querySelector('.salary-snippet, [class*="salary"]')?.textContent?.trim();

        if (title && company && link) {
          jobs.push({
            title,
            company,
            location: location || 'Location not specified',
            link: link.startsWith('http') ? link : `https://www.indeed.com${link}`,
            datePosted: new Date().toISOString().split('T')[0],
            salary: salary || 'Competitive salary',
            source: 'Indeed',
            sourceUrl
          });
        }
      });

      return jobs;
    });

    await browser.close();

    return jobs.map(job => ({
      id: `indeed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...job,
      salaryMin: undefined,
      salaryMax: undefined,
      currency: 'USD',
      type: determineJobType(job.title, job.description || ''),
      description: job.description || 'Job description not available',
      tags: extractTags(job.title, job.description || ''),
      country: extractCountry(job.location)
    }));

  } catch (error) {
    console.error('Error scraping Indeed Jobs:', error);
    return [];
  }
}

// Stack Overflow Jobs Scraper
export async function scrapeStackOverflowJobs(): Promise<RealJob[]> {
  const sourceUrl = 'https://stackoverflow.com/jobs?q=react';
  
  try {
    if (!(await checkRobotsTxt('https://stackoverflow.com'))) {
      console.log('Stack Overflow robots.txt disallows scraping');
      return [];
    }

    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    await page.setUserAgent(userAgents[Math.floor(Math.random() * userAgents.length)]);
    await delay(2000);

    await page.goto(sourceUrl, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    const jobs = await page.evaluate(() => {
      const jobElements = document.querySelectorAll('.job, [class*="job"]');
      const jobs: any[] = [];

      jobElements.forEach((element) => {
        const title = element.querySelector('.job-title, [class*="title"]')?.textContent?.trim();
        const company = element.querySelector('.company-name, [class*="company"]')?.textContent?.trim();
        const location = element.querySelector('.job-location, [class*="location"]')?.textContent?.trim();
        const link = element.querySelector('a[href*="/jobs/"], a[href*="job"]')?.getAttribute('href');
        const salary = element.querySelector('.salary, [class*="salary"]')?.textContent?.trim();

        if (title && company && link) {
          jobs.push({
            title,
            company,
            location: location || 'Location not specified',
            link: link.startsWith('http') ? link : `https://stackoverflow.com${link}`,
            datePosted: new Date().toISOString().split('T')[0],
            salary: salary || 'Competitive salary',
            source: 'Stack Overflow Jobs',
            sourceUrl
          });
        }
      });

      return jobs;
    });

    await browser.close();

    return jobs.map(job => ({
      id: `stackoverflow-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...job,
      salaryMin: undefined,
      salaryMax: undefined,
      currency: 'USD',
      type: determineJobType(job.title, job.description || ''),
      description: job.description || 'Job description not available',
      tags: extractTags(job.title, job.description || ''),
      country: extractCountry(job.location)
    }));

  } catch (error) {
    console.error('Error scraping Stack Overflow Jobs:', error);
    return [];
  }
}

// We Work Remotely Scraper
export async function scrapeWeWorkRemotelyJobs(): Promise<RealJob[]> {
  const sourceUrl = 'https://weworkremotely.com/remote-jobs/search?term=react';
  
  try {
    if (!(await checkRobotsTxt('https://weworkremotely.com'))) {
      console.log('We Work Remotely robots.txt disallows scraping');
      return [];
    }

    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    await page.setUserAgent(userAgents[Math.floor(Math.random() * userAgents.length)]);
    await delay(2000);

    await page.goto(sourceUrl, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    const jobs = await page.evaluate(() => {
      const jobElements = document.querySelectorAll('.job, [class*="job"]');
      const jobs: any[] = [];

      jobElements.forEach((element) => {
        const title = element.querySelector('.title, [class*="title"]')?.textContent?.trim();
        const company = element.querySelector('.company, [class*="company"]')?.textContent?.trim();
        const location = element.querySelector('.region, [class*="location"]')?.textContent?.trim();
        const link = element.querySelector('a[href*="/remote-jobs/"], a[href*="job"]')?.getAttribute('href');
        const salary = element.querySelector('.salary, [class*="salary"]')?.textContent?.trim();

        if (title && company && link) {
          jobs.push({
            title,
            company,
            location: location || 'Remote',
            link: link.startsWith('http') ? link : `https://weworkremotely.com${link}`,
            datePosted: new Date().toISOString().split('T')[0],
            salary: salary || 'Competitive salary',
            source: 'We Work Remotely',
            sourceUrl
          });
        }
      });

      return jobs;
    });

    await browser.close();

    return jobs.map(job => ({
      id: `weworkremotely-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...job,
      salaryMin: undefined,
      salaryMax: undefined,
      currency: 'USD',
      type: 'Remote', // We Work Remotely jobs are typically remote
      description: job.description || 'Job description not available',
      tags: extractTags(job.title, job.description || ''),
      country: extractCountry(job.location)
    }));

  } catch (error) {
    console.error('Error scraping We Work Remotely Jobs:', error);
    return [];
  }
}

// Main function to scrape from all sources
export async function scrapeAllJobSources(): Promise<RealJob[]> {
  console.log('Starting job scraping from all sources...');
  
  try {
    // Scrape from multiple sources in parallel with error handling
    const [jsGuruJobs, linkedInJobs, indeedJobs, stackOverflowJobs, weWorkRemotelyJobs] = await Promise.allSettled([
      scrapeJSGuruJobs(),
      scrapeLinkedInJobs(),
      scrapeIndeedJobs(),
      scrapeStackOverflowJobs(),
      scrapeWeWorkRemotelyJobs()
    ]);

    const allJobs: RealJob[] = [];

    // Add successful results
    if (jsGuruJobs.status === 'fulfilled') {
      console.log(`JS Guru Jobs: ${jsGuruJobs.value.length} jobs found`);
      allJobs.push(...jsGuruJobs.value);
    } else {
      console.error('JS Guru Jobs scraping failed:', jsGuruJobs.reason);
    }

    if (linkedInJobs.status === 'fulfilled') {
      console.log(`LinkedIn Jobs: ${linkedInJobs.value.length} jobs found`);
      allJobs.push(...linkedInJobs.value);
    } else {
      console.error('LinkedIn Jobs scraping failed:', linkedInJobs.reason);
    }

    if (indeedJobs.status === 'fulfilled') {
      console.log(`Indeed Jobs: ${indeedJobs.value.length} jobs found`);
      allJobs.push(...indeedJobs.value);
    } else {
      console.error('Indeed Jobs scraping failed:', indeedJobs.reason);
    }

    if (stackOverflowJobs.status === 'fulfilled') {
      console.log(`Stack Overflow Jobs: ${stackOverflowJobs.value.length} jobs found`);
      allJobs.push(...stackOverflowJobs.value);
    } else {
      console.error('Stack Overflow Jobs scraping failed:', stackOverflowJobs.reason);
    }

    if (weWorkRemotelyJobs.status === 'fulfilled') {
      console.log(`We Work Remotely Jobs: ${weWorkRemotelyJobs.value.length} jobs found`);
      allJobs.push(...weWorkRemotelyJobs.value);
    } else {
      console.error('We Work Remotely Jobs scraping failed:', weWorkRemotelyJobs.reason);
    }

    // Remove duplicates based on title and company
    const uniqueJobs = allJobs.filter((job, index, self) =>
      index === self.findIndex(j => 
        j.title.toLowerCase() === job.title.toLowerCase() && 
        j.company.toLowerCase() === job.company.toLowerCase()
      )
    );

    console.log(`Total unique jobs found: ${uniqueJobs.length}`);
    return uniqueJobs;

  } catch (error) {
    console.error('Error in scrapeAllJobSources:', error);
    return [];
  }
}

// Function to get job details (description) for a specific job
export async function getJobDetails(jobUrl: string): Promise<string> {
  try {
    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    await page.setUserAgent(userAgents[Math.floor(Math.random() * userAgents.length)]);
    await delay(2000);

    await page.goto(jobUrl, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    const description = await page.evaluate(() => {
      const descElement = document.querySelector('.job-description, .description, [class*="description"]');
      return descElement?.textContent?.trim() || 'Job description not available';
    });

    await browser.close();
    return description;

  } catch (error) {
    console.error('Error getting job details:', error);
    return 'Job description not available';
  }
}
