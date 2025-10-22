import { useState, useEffect } from 'react';

interface DashboardStats {
  questions: number;
  categories: number;
  topics: number;
  cards: number;
  learningPlans: number;
  admins: number;
  totalTasks: number;
  lastUpdated: string;
}

interface DashboardStatsResponse {
  success: boolean;
  data?: DashboardStats;
  error?: string;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    questions: 0,
    categories: 0,
    topics: 0,
    cards: 0,
    learningPlans: 0,
    admins: 0,
    totalTasks: 0,
    lastUpdated: new Date().toISOString(),
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/admin/dashboard-stats');
      const result: DashboardStatsResponse = await response.json();

      if (result.success && result.data) {
        setStats(result.data);
      } else {
        setError(result.error || 'Failed to fetch dashboard stats');
      }
    } catch (err) {
      setError('Network error while fetching dashboard stats');
      console.error('Dashboard stats fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
}
