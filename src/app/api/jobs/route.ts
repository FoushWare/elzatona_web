import { NextResponse } from 'next/server';
import { RealJob } from '@/lib/jobAggregator';

// Server-side only: Import scraping functions
let scrapeAllJobSources: (() => Promise<RealJob[]>) | null = null;
if (typeof window === 'undefined') {
  try {
    const { scrapeAllJobSources: scraper } = await import('@/lib/realJobScrapers');
    scrapeAllJobSources = scraper;
  } catch (error) {
    console.log('Real scraping not available');
  }
}

interface CacheInfo {
  fromCache: boolean;
  realScraping: boolean;
  scrapedSources?: string;
  error?: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const useRealScraping = searchParams.get('real') === 'true';

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
            scrapedSources: `${jobs.length} jobs from real sources` 
          };
        } else {
          console.log('Real scraping returned no results');
          jobs = [];
          cacheInfo = { 
            fromCache: false, 
            realScraping: true, 
            error: 'Real scraping returned no results' 
          };
        }
      } catch (scrapingError) {
        console.error('Real scraping failed:', scrapingError);
        jobs = [];
        cacheInfo = { 
          fromCache: false, 
          realScraping: false, 
          error: `Scraping error: ${scrapingError instanceof Error ? scrapingError.message : 'Unknown error'}` 
        };
      }
    } else {
      console.log('Real scraping not available or not requested');
      jobs = [];
      cacheInfo = { 
        fromCache: false, 
        realScraping: false, 
        error: 'Real scraping not available' 
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
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch jobs', 
      message: 'Please try again later',
      cache: { 
        fromCache: false, 
        realScraping: false, 
        error: `Critical error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      }
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { useRealScraping = true } = body;

    let jobs: RealJob[];
    let cacheInfo: CacheInfo;

    if (useRealScraping && scrapeAllJobSources) {
      try {
        console.log('Attempting real web scraping via POST...');
        jobs = await scrapeAllJobSources();

        if (jobs && jobs.length > 0) {
          console.log(`Successfully scraped ${jobs.length} jobs via POST`);
          cacheInfo = { 
            fromCache: false, 
            realScraping: true, 
            scrapedSources: `${jobs.length} jobs from real sources` 
          };
        } else {
          console.log('Real scraping returned no results via POST');
          jobs = [];
          cacheInfo = { 
            fromCache: false, 
            realScraping: true, 
            error: 'Real scraping returned no results' 
          };
        }
      } catch (scrapingError) {
        console.error('Real scraping failed via POST:', scrapingError);
        jobs = [];
        cacheInfo = { 
          fromCache: false, 
          realScraping: false, 
          error: `Scraping error: ${scrapingError instanceof Error ? scrapingError.message : 'Unknown error'}` 
        };
      }
    } else {
      console.log('Real scraping not available or not requested via POST');
      jobs = [];
      cacheInfo = { 
        fromCache: false, 
        realScraping: false, 
        error: 'Real scraping not available' 
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
    console.error('Error in POST /api/jobs:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to process request', 
      message: 'Please try again later',
      cache: { 
        fromCache: false, 
        realScraping: false, 
        error: `Critical error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      }
    }, { status: 500 });
  }
}
