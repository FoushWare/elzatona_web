'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import { Alert, AlertDescription } from '@/shared/components/ui/alert';
import {
  History,
  FileText,
  Clock,
  User,
  Activity,
  GitBranch,
  RotateCcw,
  Eye,
  BarChart3,
  Calendar,
  Filter,
  Search,
} from 'lucide-react';
import {
  useAuditLogs,
  useAuditLogStats,
  useContentVersions,
  useRestoreContentVersion,
  useCompareVersions,
} from '@/hooks/useTanStackQuery';
import { useNotificationActions } from '@/hooks/useNotificationActions';

export default function ContentVersioningPage() {
  const [selectedContentType, setSelectedContentType] = useState<string>('');
  const [selectedContentId, setSelectedContentId] = useState<string>('');
  const [selectedAction, setSelectedAction] = useState<string>('');
  const [daysFilter, setDaysFilter] = useState<number>(30);
  const [selectedVersionId, setSelectedVersionId] = useState<string>('');
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);

  const { showNotification } = useNotificationActions();

  // Fetch audit logs
  const {
    data: auditLogsData,
    isLoading: auditLogsLoading,
    error: auditLogsError,
  } = useAuditLogs(
    selectedContentId || undefined,
    (selectedContentType as any) || undefined,
    100
  );

  // Fetch audit log stats
  const {
    data: auditStatsData,
    isLoading: auditStatsLoading,
    error: auditStatsError,
  } = useAuditLogStats(daysFilter);

  // Fetch content versions (if content is selected)
  const {
    data: versionsData,
    isLoading: versionsLoading,
    error: versionsError,
  } = useContentVersions(selectedContentId, selectedContentType as any, 20);

  // Restore version mutation
  const restoreVersionMutation = useRestoreContentVersion();

  // Compare versions (if two versions are selected)
  const { data: comparisonData, isLoading: comparisonLoading } =
    useCompareVersions('', ''); // Will be set when needed

  const handleRestoreVersion = async (versionId: string) => {
    if (!selectedContentId || !selectedContentType) return;

    try {
      await restoreVersionMutation.mutateAsync({
        versionId,
        contentId: selectedContentId,
        contentType: selectedContentType as any,
        userId: 'admin', // In a real app, this would come from auth context
      });

      showNotification({
        type: 'success',
        title: 'Version Restored',
        message: 'Content has been restored to the selected version',
      });

      setIsRestoreDialogOpen(false);
    } catch (error) {
      showNotification({
        type: 'error',
        title: 'Restore Failed',
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'update':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'delete':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'restore':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getContentTypeColor = (contentType: string) => {
    switch (contentType) {
      case 'cards':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'plans':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'categories':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'topics':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'questions':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (auditLogsLoading || auditStatsLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading versioning data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (auditLogsError || auditStatsError) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Error Loading Data
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              There was an error loading the versioning data.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          📚 Content Versioning & Audit Trails
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track content changes, manage versions, and monitor system activity
        </p>
      </div>

      {/* Stats Overview */}
      {auditStatsData?.stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Activity className="h-8 w-8 mr-3 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Activity
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {auditStatsData.stats.totalLogs}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 mr-3 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Period
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {auditStatsData.stats.period}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <User className="h-8 w-8 mr-3 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Active Users
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Object.keys(auditStatsData.stats.byUser).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 mr-3 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Content Types
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Object.keys(auditStatsData.stats.byContentType).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="contentType">Content Type</Label>
              <Select
                value={selectedContentType}
                onValueChange={setSelectedContentType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="cards">Cards</SelectItem>
                  <SelectItem value="plans">Plans</SelectItem>
                  <SelectItem value="categories">Categories</SelectItem>
                  <SelectItem value="topics">Topics</SelectItem>
                  <SelectItem value="questions">Questions</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="action">Action</Label>
              <Select value={selectedAction} onValueChange={setSelectedAction}>
                <SelectTrigger>
                  <SelectValue placeholder="All Actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Actions</SelectItem>
                  <SelectItem value="create">Create</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                  <SelectItem value="restore">Restore</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="contentId">Content ID</Label>
              <Input
                id="contentId"
                placeholder="Enter content ID"
                value={selectedContentId}
                onChange={e => setSelectedContentId(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="days">Time Period</Label>
              <Select
                value={daysFilter.toString()}
                onValueChange={value => setDaysFilter(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="365">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="audit-logs" className="space-y-6">
        <TabsList>
          <TabsTrigger value="audit-logs">Audit Logs</TabsTrigger>
          <TabsTrigger value="version-history">Version History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Audit Logs Tab */}
        <TabsContent value="audit-logs">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Audit Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              {auditLogsData?.logs && auditLogsData.logs.length > 0 ? (
                <div className="space-y-4">
                  {auditLogsData.logs.map((log: any) => (
                    <div
                      key={log.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getActionColor(log.action)}>
                              {log.action.toUpperCase()}
                            </Badge>
                            <Badge
                              className={getContentTypeColor(log.contentType)}
                            >
                              {log.contentType.toUpperCase()}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {log.contentId}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {log.userEmail}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {new Date(log.timestamp).toLocaleString()}
                            </span>
                            <span className="flex items-center">
                              <Activity className="h-4 w-4 mr-1" />
                              {log.changes.length} changes
                            </span>
                          </div>
                          {log.changes.length > 0 && (
                            <div className="mt-2 text-sm">
                              <details className="cursor-pointer">
                                <summary className="font-medium">
                                  View Changes
                                </summary>
                                <div className="mt-2 space-y-1">
                                  {log.changes.map(
                                    (change: any, index: number) => (
                                      <div
                                        key={index}
                                        className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded"
                                      >
                                        <strong>{change.field}:</strong>{' '}
                                        {change.changeType}
                                        {change.oldValue && (
                                          <span> from "{change.oldValue}"</span>
                                        )}
                                        {change.newValue && (
                                          <span> to "{change.newValue}"</span>
                                        )}
                                      </div>
                                    )
                                  )}
                                </div>
                              </details>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No audit logs found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try adjusting your filters or check back later for activity.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Version History Tab */}
        <TabsContent value="version-history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <History className="h-5 w-5 mr-2" />
                Version History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedContentId && selectedContentType ? (
                versionsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading version history...</p>
                  </div>
                ) : versionsData?.versions &&
                  versionsData.versions.length > 0 ? (
                  <div className="space-y-4">
                    {versionsData.versions.map((version: any) => (
                      <div
                        key={version.id}
                        className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="outline">
                                Version {version.version}
                              </Badge>
                              {version.isActive && (
                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                  Current
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                              <span className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                {version.createdBy}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {new Date(version.createdAt).toLocaleString()}
                              </span>
                              <span className="flex items-center">
                                <Activity className="h-4 w-4 mr-1" />
                                {version.changes.length} changes
                              </span>
                            </div>
                            {version.reason && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                <strong>Reason:</strong> {version.reason}
                              </p>
                            )}
                            <div className="flex items-center space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4 mr-1" />
                                    View Details
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Version {version.version} Details
                                    </DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-medium mb-2">
                                        Data:
                                      </h4>
                                      <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-auto max-h-60">
                                        {JSON.stringify(version.data, null, 2)}
                                      </pre>
                                    </div>
                                    {version.changes.length > 0 && (
                                      <div>
                                        <h4 className="font-medium mb-2">
                                          Changes:
                                        </h4>
                                        <div className="space-y-2">
                                          {version.changes.map(
                                            (change: any, index: number) => (
                                              <div
                                                key={index}
                                                className="text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded"
                                              >
                                                <strong>{change.field}:</strong>{' '}
                                                {change.changeType}
                                                {change.oldValue && (
                                                  <span>
                                                    {' '}
                                                    from "
                                                    {JSON.stringify(
                                                      change.oldValue
                                                    )}
                                                    "
                                                  </span>
                                                )}
                                                {change.newValue && (
                                                  <span>
                                                    {' '}
                                                    to "
                                                    {JSON.stringify(
                                                      change.newValue
                                                    )}
                                                    "
                                                  </span>
                                                )}
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </DialogContent>
                              </Dialog>
                              {!version.isActive && (
                                <Dialog
                                  open={isRestoreDialogOpen}
                                  onOpenChange={setIsRestoreDialogOpen}
                                >
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        setSelectedVersionId(version.id)
                                      }
                                    >
                                      <RotateCcw className="h-4 w-4 mr-1" />
                                      Restore
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>
                                        Confirm Version Restore
                                      </DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <Alert>
                                        <AlertDescription>
                                          Are you sure you want to restore this
                                          content to version {version.version}?
                                          This will create a new version with
                                          the restored data.
                                        </AlertDescription>
                                      </Alert>
                                      <div className="flex justify-end space-x-2">
                                        <Button
                                          variant="outline"
                                          onClick={() =>
                                            setIsRestoreDialogOpen(false)
                                          }
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          onClick={() =>
                                            handleRestoreVersion(
                                              selectedVersionId
                                            )
                                          }
                                          disabled={
                                            restoreVersionMutation.isPending
                                          }
                                        >
                                          {restoreVersionMutation.isPending
                                            ? 'Restoring...'
                                            : 'Restore Version'}
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No version history found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Select a content item to view its version history.
                    </p>
                  </div>
                )
              ) : (
                <div className="text-center py-12">
                  <GitBranch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Select Content to View History
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Choose a content type and enter a content ID to view version
                    history.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity by Content Type</CardTitle>
              </CardHeader>
              <CardContent>
                {auditStatsData?.stats.byContentType && (
                  <div className="space-y-2">
                    {Object.entries(auditStatsData.stats.byContentType).map(
                      ([type, count]) => (
                        <div
                          key={type}
                          className="flex justify-between items-center"
                        >
                          <span className="capitalize">{type}</span>
                          <Badge variant="outline">{count as number}</Badge>
                        </div>
                      )
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity by Action</CardTitle>
              </CardHeader>
              <CardContent>
                {auditStatsData?.stats.byAction && (
                  <div className="space-y-2">
                    {Object.entries(auditStatsData.stats.byAction).map(
                      ([action, count]) => (
                        <div
                          key={action}
                          className="flex justify-between items-center"
                        >
                          <span className="capitalize">{action}</span>
                          <Badge variant="outline">{count as number}</Badge>
                        </div>
                      )
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Most Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                {auditStatsData?.stats.mostActiveUsers && (
                  <div className="space-y-2">
                    {auditStatsData.stats.mostActiveUsers
                      .slice(0, 5)
                      .map(([user, count]) => (
                        <div
                          key={user}
                          className="flex justify-between items-center"
                        >
                          <span className="truncate">{user}</span>
                          <Badge variant="outline">{count as number}</Badge>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Most Modified Content</CardTitle>
              </CardHeader>
              <CardContent>
                {auditStatsData?.stats.mostModifiedContent && (
                  <div className="space-y-2">
                    {auditStatsData.stats.mostModifiedContent
                      .slice(0, 5)
                      .map(([contentId, count]) => (
                        <div
                          key={contentId}
                          className="flex justify-between items-center"
                        >
                          <span className="truncate font-mono text-sm">
                            {contentId}
                          </span>
                          <Badge variant="outline">{count as number}</Badge>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
