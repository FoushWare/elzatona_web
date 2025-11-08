// Type definitions for GitHub Issues Service
// These types are used by shared-components but the service is app-specific
export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  body: string;
  state: 'open' | 'closed';
  created_at: string;
  updated_at: string;
  closed_at?: string;
  html_url: string;
  user: {
    login: string;
    avatar_url: string;
  };
  labels: Array<{
    name: string;
    color: string;
  }>;
}

export interface GitHubIssuesStats {
  total: number;
  open: number;
  closed: number;
  thisWeek: number;
  thisMonth: number;
  openIssues: GitHubIssue[];
  closedIssues: GitHubIssue[];
}

export class GitHubIssuesService {
  static async getIssues(): Promise<GitHubIssue[]> {
    return [];
  }

  static async getStats(): Promise<GitHubIssuesStats> {
    return {
      total: 0,
      open: 0,
      closed: 0,
      thisWeek: 0,
      thisMonth: 0,
      openIssues: [],
      closedIssues: [],
    };
  }

  static async getIssuesStats(): Promise<GitHubIssuesStats> {
    return {
      total: 0,
      open: 0,
      closed: 0,
      thisWeek: 0,
      thisMonth: 0,
      openIssues: [],
      closedIssues: [],
    };
  }

  static getIssuePriority(
    issue: GitHubIssue
  ): 'Critical' | 'High' | 'Medium' | 'Low' {
    return 'Medium';
  }

  static formatIssueDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
