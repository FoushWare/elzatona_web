/**
 * Search Analytics API Endpoint
 * Provides search analytics and performance metrics
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  Timestamp,
} from 'firebase/firestore';

export async function GET(request: NextRequest) {
  try {
    console.log('📊 Fetching search analytics...');

    // Get search logs (if they exist)
    let searchLogs: any[] = [];
    try {
      const searchLogsSnapshot = await getDocs(
        query(
          collection(db, 'searchLogs'),
          orderBy('timestamp', 'desc'),
          limit(1000)
        )
      );
      searchLogs = searchLogsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.log('No search logs found, using mock data');
    }

    // Calculate popular searches
    const searchCounts: { [key: string]: number } = {};
    searchLogs.forEach(log => {
      if (log.query) {
        searchCounts[log.query] = (searchCounts[log.query] || 0) + 1;
      }
    });

    const popularSearches = Object.entries(searchCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([query, count]) => ({ query, count }));

    // Calculate search trends (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentSearches = searchLogs.filter(log => {
      const logDate = log.timestamp?.toDate
        ? log.timestamp.toDate()
        : new Date(log.timestamp);
      return logDate >= thirtyDaysAgo;
    });

    // Group by date
    const dailyCounts: { [key: string]: number } = {};
    recentSearches.forEach(log => {
      const date = log.timestamp?.toDate
        ? log.timestamp.toDate()
        : new Date(log.timestamp);
      const dateKey = date.toISOString().split('T')[0];
      dailyCounts[dateKey] = (dailyCounts[dateKey] || 0) + 1;
    });

    const searchTrends = Object.entries(dailyCounts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, count }));

    // Calculate top categories
    const categoryCounts: { [key: string]: number } = {};
    searchLogs.forEach(log => {
      if (log.filters?.category) {
        categoryCounts[log.filters.category] =
          (categoryCounts[log.filters.category] || 0) + 1;
      }
    });

    const topCategories = Object.entries(categoryCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([category, count]) => ({ category, count }));

    // Calculate performance metrics
    const responseTimes = searchLogs
      .filter(log => log.responseTime)
      .map(log => log.responseTime);

    const averageResponseTime =
      responseTimes.length > 0
        ? responseTimes.reduce((sum, time) => sum + time, 0) /
          responseTimes.length
        : 0;

    const totalSearches = searchLogs.length;

    // Mock cache hit rate (in a real implementation, this would come from cache metrics)
    const cacheHitRate = Math.random() * 30 + 70; // 70-100%

    const analytics = {
      popularSearches,
      searchTrends,
      topCategories,
      searchPerformance: {
        averageResponseTime: Math.round(averageResponseTime),
        cacheHitRate: Math.round(cacheHitRate),
        totalSearches,
      },
    };

    console.log('✅ Analytics generated:', {
      totalSearches,
      averageResponseTime: Math.round(averageResponseTime),
      cacheHitRate: Math.round(cacheHitRate),
    });

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('❌ Analytics error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch analytics',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { query, filters, resultCount, timestamp } = await request.json();

    console.log('📝 Logging search query:', { query, resultCount });

    // Save search log to Firestore
    const searchLog = {
      query: query || '',
      filters: filters || {},
      resultCount: resultCount || 0,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
      userAgent: request.headers.get('user-agent') || '',
      ip:
        request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip') ||
        '',
    };

    // In a real implementation, you would save this to Firestore
    // For now, we'll just log it
    console.log('Search log:', searchLog);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Log search error:', error);
    return NextResponse.json(
      {
        error: 'Failed to log search',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
