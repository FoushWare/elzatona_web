import { NextResponse } from 'next/server';
import { fetchRealJobs } from '@/lib/jobAggregator';

export async function GET() {
  try {
    const jobs = await fetchRealJobs();
    
    return NextResponse.json({
      success: true,
      data: jobs,
      count: jobs.length,
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

// Optional: Add POST method for filtering
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { filters } = body;
    
    let jobs = await fetchRealJobs();
    
    // Apply filters if provided
    if (filters) {
      if (filters.country && filters.country !== 'All Countries') {
        jobs = jobs.filter(job => job.country === filters.country);
      }
      
      if (filters.type && filters.type !== 'All Types') {
        jobs = jobs.filter(job => job.type === filters.type);
      }
      
      if (filters.source && filters.source !== 'All Sources') {
        jobs = jobs.filter(job => job.source === filters.source);
      }
      
      if (filters.search) {
        const query = filters.search.toLowerCase();
        jobs = jobs.filter(job =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
    }
    
    return NextResponse.json({
      success: true,
      data: jobs,
      count: jobs.length,
      filters: filters || {},
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error filtering jobs:', error);
    
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
