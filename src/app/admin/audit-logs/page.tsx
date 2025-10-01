'use client';

// Admin Audit Logs Page
// v1.0 - Comprehensive audit log monitoring

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  CalendarIcon,
  Filter,
  RefreshCw,
  Download,
  Search,
  Eye,
  AlertCircle,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AuditLog {
  id: string;
  action: string;
  resource: string;
  resourceId?: string;
  resourceName?: string;
  details: string;
  changes?: Record<string, unknown>;
  userId?: string;
  userEmail?: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
  success: boolean;
  errorMessage?: string;
  metadata?: Record<string, unknown>;
}

const actionColors = {
  CREATE: 'bg-green-100 text-green-800',
  UPDATE: 'bg-blue-100 text-blue-800',
  DELETE: 'bg-red-100 text-red-800',
  VIEW: 'bg-gray-100 text-gray-800',
  LOGIN: 'bg-purple-100 text-purple-800',
  LOGOUT: 'bg-orange-100 text-orange-800',
  EXPORT: 'bg-cyan-100 text-cyan-800',
  IMPORT: 'bg-indigo-100 text-indigo-800',
};

const resourceColors = {
  TOPIC: 'bg-emerald-100 text-emerald-800',
  CATEGORY: 'bg-teal-100 text-teal-800',
  QUESTION: 'bg-blue-100 text-blue-800',
  SECTION: 'bg-violet-100 text-violet-800',
  LEARNING_PATH: 'bg-pink-100 text-pink-800',
  USER: 'bg-amber-100 text-amber-800',
  SYSTEM: 'bg-slate-100 text-slate-800',
};

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState({
    action: 'all',
    resource: 'all',
    userId: '',
    startDate: '',
    endDate: '',
    search: '',
  });
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

  const loadLogs = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (filters.action && filters.action !== 'all')
        params.append('action', filters.action);
      if (filters.resource && filters.resource !== 'all')
        params.append('resource', filters.resource);
      if (filters.userId) params.append('userId', filters.userId);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      params.append('limit', '500');

      const response = await fetch(
        `/api/admin/audit-logs?${params.toString()}`
      );
      const data = await response.json();

      if (data.success) {
        let filteredLogs = data.data;

        // Client-side search filter
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          filteredLogs = filteredLogs.filter(
            (log: AuditLog) =>
              log.details.toLowerCase().includes(searchTerm) ||
              log.resourceName?.toLowerCase().includes(searchTerm) ||
              log.userEmail?.toLowerCase().includes(searchTerm) ||
              log.action.toLowerCase().includes(searchTerm) ||
              log.resource.toLowerCase().includes(searchTerm)
          );
        }

        setLogs(filteredLogs);
      } else {
        setError(data.error || 'Failed to load audit logs');
      }
    } catch (err) {
      setError('Failed to load audit logs');
      console.error('Error loading audit logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, [
    filters.action,
    filters.resource,
    filters.userId,
    filters.startDate,
    filters.endDate,
  ]);

  const handleDateChange = (
    field: 'startDate' | 'endDate',
    date: Date | undefined
  ) => {
    if (date) {
      setFilters(prev => ({
        ...prev,
        [field]: date.toISOString().split('T')[0],
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const exportLogs = () => {
    const csvContent = [
      [
        'Timestamp',
        'Action',
        'Resource',
        'Resource Name',
        'Details',
        'User',
        'Success',
        'Error',
      ],
      ...logs.map(log => [
        log.timestamp,
        log.action,
        log.resource,
        log.resourceName || '',
        log.details,
        log.userEmail || log.userId || '',
        log.success ? 'Yes' : 'No',
        log.errorMessage || '',
      ]),
    ]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setFilters({
      action: 'all',
      resource: 'all',
      userId: '',
      startDate: '',
      endDate: '',
      search: '',
    });
    setDateRange({});
  };

  const toggleLogExpansion = (logId: string) => {
    setExpandedLogs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(logId)) {
        newSet.delete(logId);
      } else {
        newSet.add(logId);
      }
      return newSet;
    });
  };

  const expandAllLogs = () => {
    setExpandedLogs(new Set(logs.map(log => log.id)));
  };

  const collapseAllLogs = () => {
    setExpandedLogs(new Set());
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Audit Logs</h1>
          <p className="text-muted-foreground">
            Monitor all admin actions and system events
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={expandAllLogs} variant="outline" size="sm">
            <ChevronDown className="w-4 h-4 mr-2" />
            Expand All
          </Button>
          <Button onClick={collapseAllLogs} variant="outline" size="sm">
            <ChevronRight className="w-4 h-4 mr-2" />
            Collapse All
          </Button>
          <Button onClick={loadLogs} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={exportLogs} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium">Action</label>
              <Select
                value={filters.action}
                onValueChange={value =>
                  setFilters(prev => ({ ...prev, action: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="CREATE">Create</SelectItem>
                  <SelectItem value="UPDATE">Update</SelectItem>
                  <SelectItem value="DELETE">Delete</SelectItem>
                  <SelectItem value="VIEW">View</SelectItem>
                  <SelectItem value="LOGIN">Login</SelectItem>
                  <SelectItem value="LOGOUT">Logout</SelectItem>
                  <SelectItem value="EXPORT">Export</SelectItem>
                  <SelectItem value="IMPORT">Import</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Resource</label>
              <Select
                value={filters.resource}
                onValueChange={value =>
                  setFilters(prev => ({ ...prev, resource: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Resources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Resources</SelectItem>
                  <SelectItem value="TOPIC">Topic</SelectItem>
                  <SelectItem value="CATEGORY">Category</SelectItem>
                  <SelectItem value="QUESTION">Question</SelectItem>
                  <SelectItem value="SECTION">Section</SelectItem>
                  <SelectItem value="LEARNING_PATH">Learning Path</SelectItem>
                  <SelectItem value="USER">User</SelectItem>
                  <SelectItem value="SYSTEM">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">User ID</label>
              <Input
                placeholder="Enter user ID"
                value={filters.userId}
                onChange={e =>
                  setFilters(prev => ({ ...prev, userId: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  className="pl-10"
                  value={filters.search}
                  onChange={e =>
                    setFilters(prev => ({ ...prev, search: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !filters.startDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.startDate
                      ? format(new Date(filters.startDate), 'PPP')
                      : 'Select start date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      filters.startDate
                        ? new Date(filters.startDate)
                        : undefined
                    }
                    onSelect={date => handleDateChange('startDate', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="text-sm font-medium">End Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !filters.endDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.endDate
                      ? format(new Date(filters.endDate), 'PPP')
                      : 'Select end date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      filters.endDate ? new Date(filters.endDate) : undefined
                    }
                    onSelect={date => handleDateChange('endDate', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={clearFilters} variant="outline" size="sm">
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Logs List */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Logs ({logs.length})</CardTitle>
          <CardDescription>
            Recent admin actions and system events
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="w-6 h-6 animate-spin mr-2" />
              Loading audit logs...
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-8 text-red-600">
              <AlertCircle className="w-6 h-6 mr-2" />
              {error}
            </div>
          ) : logs.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <Eye className="w-6 h-6 mr-2" />
              No audit logs found
            </div>
          ) : (
            <div className="space-y-2">
              {logs.map(log => {
                const isExpanded = expandedLogs.has(log.id);
                return (
                  <div
                    key={log.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    {/* Collapsible Header */}
                    <div
                      className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => toggleLogExpansion(log.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            )}
                            <Badge
                              className={
                                actionColors[
                                  log.action as keyof typeof actionColors
                                ] || 'bg-gray-100 text-gray-800'
                              }
                            >
                              {log.action}
                            </Badge>
                            <Badge
                              className={
                                resourceColors[
                                  log.resource as keyof typeof resourceColors
                                ] || 'bg-gray-100 text-gray-800'
                              }
                            >
                              {log.resource}
                            </Badge>
                            {log.success ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">
                              {log.details}
                            </p>
                            {!isExpanded && (
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                                {log.resourceName && (
                                  <span>Resource: {log.resourceName}</span>
                                )}
                                {log.userEmail && (
                                  <span>User: {log.userEmail}</span>
                                )}
                                <span>
                                  {format(
                                    new Date(log.timestamp),
                                    'MMM dd, yyyy HH:mm:ss'
                                  )}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        {isExpanded && (
                          <div className="text-sm text-muted-foreground">
                            {format(
                              new Date(log.timestamp),
                              'MMM dd, yyyy HH:mm:ss'
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Expandable Content */}
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t bg-muted/20">
                        <div className="space-y-3 pt-4">
                          {log.resourceName && (
                            <div className="text-sm">
                              <span className="font-medium">Resource:</span>{' '}
                              <span className="text-muted-foreground">
                                {log.resourceName}
                                {log.resourceId && ` (ID: ${log.resourceId})`}
                              </span>
                            </div>
                          )}
                          {log.userEmail && (
                            <div className="text-sm">
                              <span className="font-medium">User:</span>{' '}
                              <span className="text-muted-foreground">
                                {log.userEmail}
                              </span>
                            </div>
                          )}
                          {log.userId && log.userId !== log.userEmail && (
                            <div className="text-sm">
                              <span className="font-medium">User ID:</span>{' '}
                              <span className="text-muted-foreground">
                                {log.userId}
                              </span>
                            </div>
                          )}
                          {log.ipAddress && (
                            <div className="text-sm">
                              <span className="font-medium">IP Address:</span>{' '}
                              <span className="text-muted-foreground">
                                {log.ipAddress}
                              </span>
                            </div>
                          )}
                          {log.errorMessage && (
                            <div className="text-sm">
                              <span className="font-medium text-red-600">
                                Error:
                              </span>{' '}
                              <span className="text-red-600">
                                {log.errorMessage}
                              </span>
                            </div>
                          )}
                          {log.changes &&
                            Object.keys(log.changes).length > 0 && (
                              <div className="text-sm">
                                <p className="font-medium mb-2">Changes:</p>
                                <pre className="bg-muted p-3 rounded text-xs overflow-auto max-h-40">
                                  {JSON.stringify(log.changes, null, 2)}
                                </pre>
                              </div>
                            )}
                          {log.metadata &&
                            Object.keys(log.metadata).length > 0 && (
                              <div className="text-sm">
                                <p className="font-medium mb-2">Metadata:</p>
                                <pre className="bg-muted p-3 rounded text-xs overflow-auto max-h-40">
                                  {JSON.stringify(log.metadata, null, 2)}
                                </pre>
                              </div>
                            )}
                          {log.userAgent && (
                            <div className="text-sm">
                              <p className="font-medium mb-1">User Agent:</p>
                              <p className="text-muted-foreground text-xs break-all">
                                {log.userAgent}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
