# Job Aggregator Implementation Guide

## Overview

This document outlines how to implement real job aggregation from multiple sources as specified in the PRD. The current implementation uses enhanced mock data, but this guide shows how to integrate real web scraping.

## Current Implementation

### Real Job Sources

Based on the PRD and user requirements, we're targeting these job sources:

#### **Primary Sources:**
- **JS Guru Jobs**: https://jsgurujobs.com/jobs?category=frontend
- **LinkedIn Jobs**: https://www.linkedin.com/jobs/search/?keywords=react%20developer
- **Indeed**: https://www.indeed.com/jobs?q=react+developer
- **Stack Overflow Jobs**: https://stackoverflow.com/jobs?q=react
- **We Work Remotely**: https://weworkremotely.com/remote-jobs/search?term=react

#### **Additional Sources:**
- **Glassdoor**: https://www.glassdoor.com/Job/react-developer-jobs-SRCH_KO0,14.htm
- **AngelList**: https://angel.co/jobs?query=react%20developer
- **HackerRank Jobs**: https://www.hackerrank.com/jobs/search?q=react
- **RemoteOK**: https://remoteok.io/remote-react-jobs
- **ReactJobs.io**: https://reactjobs.io/

## Implementation Strategy

### 1. Web Scraping Setup

#### **Required Dependencies:**
```bash
npm install puppeteer cheerio axios node-cron
```

#### **Environment Variables:**
```env
# Add to .env.local
FIRECRAWL_API_KEY=your_firecrawl_api_key
SCRAPING_INTERVAL=3600000  # 1 hour in milliseconds
RATE_LIMIT_DELAY=2000      # 2 seconds between requests
```

### 2. Real Scraping Implementation

#### **Update `src/lib/jobAggregator.ts`:**

```typescript
import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import axios from 'axios';

// Real scraping function
export async function scrapeJSGuruJobs(): Promise<RealJob[]> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto('https://jsgurujobs.com/jobs?category=frontend', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    const jobs = await page.evaluate(() => {
      const jobElements = document.querySelectorAll('.job-listing, .job-card');
      const jobs: any[] = [];

      jobElements.forEach((element) => {
        const title = element.querySelector('h3, .job-title')?.textContent?.trim();
        const company = element.querySelector('.company-name, .company')?.textContent?.trim();
        const location = element.querySelector('.location, .job-location')?.textContent?.trim();
        const link = element.querySelector('a[href*="/jobs/"]')?.getAttribute('href');
        const datePosted = element.querySelector('.date, .posted-date')?.textContent?.trim();

        if (title && company && link) {
          jobs.push({
            title,
            company,
            location: location || 'Location not specified',
            link: `https://jsgurujobs.com${link}`,
            datePosted: datePosted || new Date().toISOString().split('T')[0],
            source: 'JS Guru Jobs',
            sourceUrl: 'https://jsgurujobs.com/jobs?category=frontend'
          });
        }
      });

      return jobs;
    });

    return jobs.map(job => ({
      id: `jsguru-${Date.now()}-${Math.random()}`,
      ...job,
      salary: job.salary || 'Competitive salary',
      salaryMin: undefined,
      salaryMax: undefined,
      currency: 'USD',
      type: determineJobType(job.title, job.description || ''),
      description: job.description || 'Job description not available',
      tags: extractTags(job.title, job.description || ''),
      country: extractCountry(job.location)
    }));

  } finally {
    await browser.close();
  }
}

// Similar functions for other sources...
export async function scrapeLinkedInJobs(): Promise<RealJob[]> {
  // Implementation for LinkedIn scraping
}

export async function scrapeIndeedJobs(): Promise<RealJob[]> {
  // Implementation for Indeed scraping
}

// Main function to fetch from all sources
export async function fetchRealJobs(): Promise<RealJob[]> {
  const allJobs: RealJob[] = [];
  
  try {
    // Scrape from multiple sources in parallel
    const [jsGuruJobs, linkedInJobs, indeedJobs, stackOverflowJobs, weWorkRemotelyJobs] = await Promise.allSettled([
      scrapeJSGuruJobs(),
      scrapeLinkedInJobs(),
      scrapeIndeedJobs(),
      scrapeStackOverflowJobs(),
      scrapeWeWorkRemotelyJobs()
    ]);

    // Add successful results
    if (jsGuruJobs.status === 'fulfilled') allJobs.push(...jsGuruJobs.value);
    if (linkedInJobs.status === 'fulfilled') allJobs.push(...linkedInJobs.value);
    if (indeedJobs.status === 'fulfilled') allJobs.push(...indeedJobs.value);
    if (stackOverflowJobs.status === 'fulfilled') allJobs.push(...stackOverflowJobs.value);
    if (weWorkRemotelyJobs.status === 'fulfilled') allJobs.push(...weWorkRemotelyJobs.value);

    // Remove duplicates based on title and company
    const uniqueJobs = allJobs.filter((job, index, self) =>
      index === self.findIndex(j => 
        j.title === job.title && j.company === job.company
      )
    );

    return uniqueJobs;
  } catch (error) {
    console.error('Error fetching real jobs:', error);
    // Fallback to enhanced mock data
    return getEnhancedMockJobs();
  }
}
```

### 3. Scheduled Job Refresh

#### **Create `src/lib/jobScheduler.ts`:**

```typescript
import cron from 'node-cron';
import { fetchRealJobs } from './jobAggregator';

// Cache for jobs
let cachedJobs: RealJob[] = [];
let lastFetchTime: Date | null = null;

export function initializeJobScheduler() {
  // Refresh jobs every hour
  cron.schedule('0 * * * *', async () => {
    console.log('Scheduled job refresh started...');
    try {
      const newJobs = await fetchRealJobs();
      cachedJobs = newJobs;
      lastFetchTime = new Date();
      console.log(`Job refresh completed. ${newJobs.length} jobs loaded.`);
    } catch (error) {
      console.error('Scheduled job refresh failed:', error);
    }
  });

  // Initial fetch
  fetchRealJobs().then(jobs => {
    cachedJobs = jobs;
    lastFetchTime = new Date();
  });
}

export function getCachedJobs(): RealJob[] {
  return cachedJobs;
}

export function getLastFetchTime(): Date | null {
  return lastFetchTime;
}
```

### 4. API Integration

#### **Update `src/app/api/jobs/route.ts`:**

```typescript
import { NextResponse } from 'next/server';
import { getCachedJobs, getLastFetchTime } from '@/lib/jobScheduler';

export async function GET() {
  try {
    const jobs = getCachedJobs();
    const lastFetch = getLastFetchTime();
    
    return NextResponse.json({
      success: true,
      data: jobs,
      count: jobs.length,
      lastUpdated: lastFetch?.toISOString(),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch jobs',
        message: 'Please try again later'
      },
      { status: 500 }
    );
  }
}
```

### 5. Frontend Integration

#### **Update `src/app/jobs/page.tsx`:**

```typescript
// Replace the useEffect with API call
useEffect(() => {
  const loadJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/jobs');
      const result = await response.json();
      
      if (result.success) {
        setJobs(result.data);
        setError(null);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setError("Failed to load jobs. Please try again later.");
      console.error("Error loading jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  loadJobs();
}, []);
```

## Compliance and Best Practices

### 1. Rate Limiting
```typescript
// Add delays between requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Use in scraping functions
await delay(2000); // 2 second delay
```

### 2. Error Handling
```typescript
// Robust error handling for each source
try {
  const jobs = await scrapeSource();
  return jobs;
} catch (error) {
  console.error(`Failed to scrape ${sourceName}:`, error);
  return []; // Return empty array instead of failing completely
}
```

### 3. User Agent Rotation
```typescript
const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
  // Add more user agents
];

await page.setUserAgent(userAgents[Math.floor(Math.random() * userAgents.length)]);
```

### 4. Respect Robots.txt
```typescript
// Check robots.txt before scraping
async function checkRobotsTxt(url: string): Promise<boolean> {
  try {
    const robotsUrl = new URL('/robots.txt', url).href;
    const response = await axios.get(robotsUrl);
    // Parse robots.txt and check if scraping is allowed
    return !response.data.includes('Disallow: /jobs');
  } catch {
    return true; // Default to allowing if robots.txt is not accessible
  }
}
```

## Deployment Considerations

### 1. Serverless Functions
For Vercel deployment, use serverless functions with longer timeouts:

```typescript
// vercel.json
{
  "functions": {
    "src/app/api/jobs/route.ts": {
      "maxDuration": 60
    }
  }
}
```

### 2. Database Storage
Consider storing scraped jobs in a database:

```typescript
// Example with Prisma
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function storeJobs(jobs: RealJob[]) {
  for (const job of jobs) {
    await prisma.job.upsert({
      where: { externalId: job.id },
      update: job,
      create: job
    });
  }
}
```

### 3. Monitoring
Add monitoring for scraping health:

```typescript
// Track scraping success rates
const scrapingMetrics = {
  jsGuruJobs: { success: 0, failure: 0 },
  linkedInJobs: { success: 0, failure: 0 },
  // ... other sources
};
```

## Testing

### 1. Unit Tests
```typescript
// __tests__/jobAggregator.test.ts
import { extractSalaryInfo, determineJobType, extractCountry } from '@/lib/jobAggregator';

describe('Job Aggregator', () => {
  test('extractSalaryInfo should parse salary correctly', () => {
    const result = extractSalaryInfo('$100,000 - $150,000');
    expect(result.salaryMin).toBe(100000);
    expect(result.salaryMax).toBe(150000);
    expect(result.currency).toBe('USD');
  });
});
```

### 2. Integration Tests
```typescript
// Test API endpoints
describe('Jobs API', () => {
  test('GET /api/jobs should return jobs', async () => {
    const response = await fetch('/api/jobs');
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
  });
});
```

## Next Steps

1. **Implement real scraping functions** for each job source
2. **Add database storage** for job persistence
3. **Set up monitoring** and alerting
4. **Implement caching** with Redis or similar
5. **Add job deduplication** logic
6. **Create admin dashboard** for managing job sources
7. **Add job application tracking** features

## Legal Considerations

- **Respect robots.txt** files
- **Implement rate limiting** to avoid overwhelming servers
- **Check terms of service** for each job site
- **Consider using official APIs** where available
- **Add proper attribution** to job sources
- **Implement data retention policies**

This implementation provides a solid foundation for real job aggregation while maintaining compliance and scalability.
