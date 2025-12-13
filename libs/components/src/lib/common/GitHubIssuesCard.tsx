"use client";

// GitHub Issues Card Component
// Displays real-time GitHub issues statistics and details
// Note: When GitHub MCP is available, this component can be enhanced to use MCP tools
// for more reliable and authenticated access to GitHub data

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"]!;
const supabaseServiceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"]!;
const _supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { Card, CardContent, CardHeader, CardTitle } from "@elzatona/components";
import { Badge } from "@elzatona/components";
import { Button } from "@elzatona/components";
import {
  GitHubIssuesService,
  GitHubIssuesStats,
  GitHubIssue,
} from "../types/github-issues";
import { ExternalLink, AlertCircle, CheckCircle } from "lucide-react";

interface GitHubIssuesCardProps {
  className?: string;
}

export default function GitHubIssuesCard({ className }: GitHubIssuesCardProps) {
  const [issuesStats, setIssuesStats] = useState<GitHubIssuesStats | null>(
    null,
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
        console.error("Failed to fetch GitHub issues:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const getPriorityBadge = (issue: GitHubIssue) => {
    const priority = GitHubIssuesService.getIssuePriority(issue);
    switch (priority) {
      case "Critical":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-300 dark:border-red-700">
            Critical
          </Badge>
        );
      case "High":
        return <Badge variant="destructive">High</Badge>;
      case "Medium":
        return (
          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
            Medium
          </Badge>
        );
      case "Low":
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
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
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
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
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
          <GitHubIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-2 flex-shrink-0" />
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
                {showOpenDetails ? "Hide Open" : "Show Open"} (
                {issuesStats.open})
              </span>
              <span className="sm:hidden">
                {showOpenDetails ? "Hide" : "Open"} ({issuesStats.open})
              </span>
            </Button>
            <Button
              onClick={() => setShowClosedDetails(!showClosedDetails)}
              className="flex-1 text-xs sm:text-sm"
              variant="outline"
              size="sm"
            >
              <span className="hidden sm:inline">
                {showClosedDetails ? "Hide Closed" : "Show Closed"} (
                {issuesStats.closed})
              </span>
              <span className="sm:hidden">
                {showClosedDetails ? "Hide" : "Closed"} ({issuesStats.closed})
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
              {issuesStats.openIssues.map((issue: GitHubIssue) => (
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
                    Created:{" "}
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
              {issuesStats.closedIssues.map((issue: GitHubIssue) => (
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
                    Closed:{" "}
                    {issue.closed_at
                      ? GitHubIssuesService.formatIssueDate(issue.closed_at)
                      : "Unknown"}
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
