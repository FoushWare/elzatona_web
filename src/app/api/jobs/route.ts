import { NextResponse } from 'next/server';
import { fetchRealJobs, RealJob } from '@/lib/jobAggregator';

// Server-side only: Import scraping functions
let scrapeAllJobSources: (() => Promise<RealJob[]>) | null = null;
if (typeof window === 'undefined') {
  // Only import on server-side
  try {
    const { scrapeAllJobSources: scraper } = await import('@/lib/realJobScrapers');
    scrapeAllJobSources = scraper;
  } catch (error) {
    console.log('Real scraping not available, using enhanced mock data');
  }
}

interface CacheInfo {
  fromCache: boolean;
  realScraping: boolean;
  scrapedSources?: string;
  fallback?: boolean;
  enhancedMock?: boolean;
  error?: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const useRealScraping = searchParams.get('real') === 'true';
    const forceRefresh = searchParams.get('refresh') === 'true';
    
    let jobs: RealJob[];
    let cacheInfo: CacheInfo;

    if (useRealScraping && scrapeAllJobSources) {
      try {
        console.log('Attempting real web scraping...');
        jobs = await scrapeAllJobSources();
        
        if (jobs && jobs.length > 0) {
          console.log(`Successfully scraped ${jobs.length} jobs`);
          cacheInfo = {
            fromCache: false,
            realScraping: true,
            scrapedSources: `${jobs.length} jobs from multiple sources`
          };
        } else {
          console.log('Real scraping returned empty results, falling back to enhanced mock data');
          jobs = await fetchRealJobs(false);
          cacheInfo = {
            fromCache: false,
            realScraping: false,
            fallback: true,
            error: 'Real scraping returned no results'
          };
        }
      } catch (scrapingError) {
        console.error('Real scraping failed, falling back to enhanced mock data:', scrapingError);
        jobs = await fetchRealJobs(false);
        cacheInfo = {
          fromCache: false,
          realScraping: false,
          fallback: true,
          error: `Scraping error: ${scrapingError instanceof Error ? scrapingError.message : 'Unknown error'}`
        };
      }
    } else {
      // Use enhanced mock data
      console.log('Using enhanced mock job data');
      jobs = await fetchRealJobs(false);
      cacheInfo = {
        fromCache: false,
        realScraping: false,
        enhancedMock: true
      };
    }
    
    // Ensure we always have jobs
    if (!jobs || jobs.length === 0) {
      console.log('No jobs available, using fallback mock data');
      jobs = await fetchRealJobs(false);
      cacheInfo = {
        fromCache: false,
        realScraping: false,
        fallback: true,
        error: 'No jobs available from any source'
      };
    }
    
    return NextResponse.json({
      success: true,
      data: jobs,
      count: jobs.length,
      realScraping: useRealScraping && scrapeAllJobSources && cacheInfo.realScraping,
      cache: cacheInfo,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    
    // Return fallback data even on error
    try {
      const fallbackJobs = await fetchRealJobs(false);
      return NextResponse.json({
        success: true,
        data: fallbackJobs,
        count: fallbackJobs.length,
        realScraping: false,
        cache: {
          fromCache: false,
          realScraping: false,
          fallback: true,
          error: `API error: ${error instanceof Error ? error.message : 'Unknown error'}`
        },
        timestamp: new Date().toISOString()
      });
    } catch (fallbackError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch jobs',
          message: 'Please try again later',
          cache: {
            fromCache: false,
            realScraping: false,
            fallback: false,
            error: `Critical error: ${error instanceof Error ? error.message : 'Unknown error'}`
          }
        },
        { status: 500 }
      );
    }
  }
}

// Optional: Add POST method for filtering
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { filters, useRealScraping = false, forceRefresh = false } = body;
    
    let jobs: RealJob[];

    if (useRealScraping && scrapeAllJobSources) {
      try {
        jobs = await scrapeAllJobSources();
        if (!jobs || jobs.length === 0) {
          console.log('Real scraping returned no results, using enhanced mock data');
          jobs = await fetchRealJobs(false);
        }
      } catch (error) {
        console.error('Real scraping failed, using enhanced mock data:', error);
        jobs = await fetchRealJobs(false);
      }
    } else {
      jobs = await fetchRealJobs(false);
    }
    
    // Ensure we have jobs
    if (!jobs || jobs.length === 0) {
      jobs = await fetchRealJobs(false);
    }
    
    // Apply filters if provided
    if (filters) {
      if (filters.country && filters.country !== 'All Countries') {
        jobs = jobs.filter((job: RealJob) => job.country === filters.country);
      }
      
      if (filters.type && filters.type !== 'All Types') {
        jobs = jobs.filter((job: RealJob) => job.type === filters.type);
      }
      
      if (filters.source && filters.source !== 'All Sources') {
        jobs = jobs.filter((job: RealJob) => job.source === filters.source);
      }
      
      if (filters.search) {
        const query = filters.search.toLowerCase();
        jobs = jobs.filter((job: RealJob) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.tags.some((tag: string) => tag.toLowerCase().includes(query))
        );
      }
    }
    
    return NextResponse.json({
      success: true,
      data: jobs,
      count: jobs.length,
      filters: filters || {},
      realScraping: useRealScraping && scrapeAllJobSources,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error filtering jobs:', error);
    
    // Return fallback data even on error
    try {
      const fallbackJobs = await fetchRealJobs(false);
      return NextResponse.json({
        success: true,
        data: fallbackJobs,
        count: fallbackJobs.length,
        filters: {},
        realScraping: false,
        error: `Filtering error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toISOString()
      });
    } catch (fallbackError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to filter jobs',
          message: 'Please try again later'
        },
        { status: 500 }
      );
    }
  }
}
