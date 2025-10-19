'use client';

// GitHub Issues Card Component
// Displays real-time GitHub issues statistics and details
// Note: When GitHub MCP is available, this component can be enhanced to use MCP tools
// for more reliable and authenticated access to GitHub data

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  GitHubIssuesService,
  GitHubIssuesStats,
  GitHubIssue,
} from '@/lib/github-issues-service';
import {
  Github,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
} from 'lucide-react';

interface GitHubIssuesCardProps {
  className?: string;
}

export default function GitHubIssuesCard({ className }: GitHubIssuesCardProps) {
  const [issuesStats, setIssuesStats] = useState<GitHubIssuesStats | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [showOpenDetails, setShowOpenDetails] = useState(false);
  const [showClosedDetails, setShowClosedDetails] = useState(false);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setIsLoading(true);
        const stats = await GitHubIssuesService.getIssuesStats();
        setIssuesStats(stats);
      } catch (error) {
        console.error('Failed to fetch GitHub issues:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const getPriorityBadge = (issue: GitHubIssue) => {
    const priority = GitHubIssuesService.getIssuePriority(issue);
    switch (priority) {
      case 'Critical':
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-300 dark:border-red-700">
            Critical
          </Badge>
        );
      case 'High':
        return <Badge variant="destructive">High</Badge>;
      case 'Medium':
        return (
          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
            Medium
          </Badge>
        );
      case 'Low':
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getLabelBadge = (label: { name: string; color: string }) => (
    <Badge
      key={label.name}
      variant="outline"
      className="text-xs"
      style={{
        borderColor: `#${label.color}`,
        color: `#${label.color}`,
      }}
    >
      {label.name}
    </Badge>
  );

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center text-sm sm:text-base">
            <Github className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-2 flex-shrink-0" />
            <span className="truncate">GitHub Issues</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-400">
              Loading issues...
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!issuesStats) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center text-sm sm:text-base">
            <Github className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-2 flex-shrink-0" />
            <span className="truncate">GitHub Issues</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 dark:text-gray-400">
              Failed to load GitHub issues
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center text-sm sm:text-base">
          <Github className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-2 flex-shrink-0" />
          <span className="truncate">GitHub Issues</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 sm:space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold text-red-600">
                {issuesStats.open}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Open
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold text-green-600">
                {issuesStats.closed}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Closed
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold text-gray-600">
                {issuesStats.total}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Total
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${(issuesStats.closed / issuesStats.total) * 100}%`,
              }}
            ></div>
          </div>
          <div className="text-center">
            <div className="text-sm sm:text-lg font-bold text-green-600">
              {Math.round((issuesStats.closed / issuesStats.total) * 100)}%
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Issues Resolved
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={() => setShowOpenDetails(!showOpenDetails)}
              className="flex-1 text-xs sm:text-sm"
              variant="outline"
              size="sm"
            >
              <span className="hidden sm:inline">
                {showOpenDetails ? 'Hide Open' : 'Show Open'} (
                {issuesStats.open})
              </span>
              <span className="sm:hidden">
                {showOpenDetails ? 'Hide' : 'Open'} ({issuesStats.open})
              </span>
            </Button>
            <Button
              onClick={() => setShowClosedDetails(!showClosedDetails)}
              className="flex-1 text-xs sm:text-sm"
              variant="outline"
              size="sm"
            >
              <span className="hidden sm:inline">
                {showClosedDetails ? 'Hide Closed' : 'Show Closed'} (
                {issuesStats.closed})
              </span>
              <span className="sm:hidden">
                {showClosedDetails ? 'Hide' : 'Closed'} ({issuesStats.closed})
              </span>
            </Button>
          </div>
        </div>

        {/* Open Issues Details */}
        {showOpenDetails && (
          <div className="mt-4 space-y-3">
            <h4 className="font-semibold text-sm text-gray-900 dark:text-white flex items-center">
              <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
              Open Issues
            </h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {issuesStats.openIssues.map(issue => (
                <div
                  key={issue.id}
                  className="border border-red-200 dark:border-red-800 rounded-lg p-2 sm:p-3"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h5 className="font-medium text-xs sm:text-sm text-gray-900 dark:text-white break-words flex-1">
                      #{issue.number} {issue.title}
                    </h5>
                    <a
                      href={issue.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0"
                    >
                      <ExternalLink className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                    </a>
                  </div>
                  <div className="flex flex-wrap items-center gap-1 mb-1">
                    {getPriorityBadge(issue)}
                    {issue.labels.map(getLabelBadge)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Created:{' '}
                    {GitHubIssuesService.formatIssueDate(issue.created_at)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Closed Issues Details */}
        {showClosedDetails && (
          <div className="mt-4 space-y-3">
            <h4 className="font-semibold text-sm text-gray-900 dark:text-white flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Recently Closed Issues
            </h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {issuesStats.closedIssues.map(issue => (
                <div
                  key={issue.id}
                  className="border border-green-200 dark:border-green-800 rounded-lg p-2 sm:p-3"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h5 className="font-medium text-xs sm:text-sm text-gray-900 dark:text-white break-words flex-1">
                      #{issue.number} {issue.title}
                    </h5>
                    <a
                      href={issue.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0"
                    >
                      <ExternalLink className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                    </a>
                  </div>
                  <div className="flex flex-wrap items-center gap-1 mb-1">
                    {getPriorityBadge(issue)}
                    {issue.labels.map(getLabelBadge)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Closed:{' '}
                    {issue.closed_at
                      ? GitHubIssuesService.formatIssueDate(issue.closed_at)
                      : 'Unknown'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
