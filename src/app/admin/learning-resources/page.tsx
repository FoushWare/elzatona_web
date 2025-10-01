'use client';

import React, { useState, useEffect } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LearningResourcesService,
  LearningResourcesStats,
} from '@/lib/learning-resources-service';
import {
  Plus,
  Search,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Calendar,
  MessageSquare,
  RefreshCw,
  Check,
  BookOpen,
  FolderOpen,
} from 'lucide-react';

export default function LearningResourcesPage() {
  const [resources, setResources] = useState<LearningResourcesStats | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'closed'>(
    'all'
  );
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newIssue, setNewIssue] = useState({
    title: '',
    body: '',
    labels: [] as string[],
  });
  const [completedResources, setCompletedResources] = useState<Set<number>>(
    new Set()
  );

  // Fetch website resources data
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const resourcesData =
          await LearningResourcesService.getResourcesStats();
        setResources(resourcesData);
      } catch (error) {
        console.error('Failed to fetch website resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  // Filter resources based on search and status
  const filteredResources = React.useMemo(() => {
    if (!resources) return [];

    let allResources = [
      ...resources.openResources,
      ...resources.closedResources,
    ];

    // Apply completion status based on completedResources state
    allResources = allResources.map(resource => ({
      ...resource,
      state: completedResources.has(resource.id) ? 'closed' : 'open',
    }));

    // Filter by status
    if (filterStatus !== 'all') {
      allResources = allResources.filter(
        resource => resource.state === filterStatus
      );
    }

    // Filter by search term
    if (searchTerm) {
      allResources = allResources.filter(
        resource =>
          resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.labels.some(label =>
            label.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    return allResources.sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
  }, [resources, searchTerm, filterStatus, completedResources]);

  const handleCreateResource = async () => {
    if (!newIssue.title.trim()) return;

    try {
      // In a real implementation, this would call GitHub API
      console.log('Creating resource:', newIssue);

      // For now, just show success message
      alert(
        'Resource creation would be implemented with GitHub API integration'
      );

      // Reset form
      setNewIssue({ title: '', body: '', labels: [] });
      setShowCreateForm(false);

      // Refresh resources
      const resourcesData = await LearningResourcesService.getResourcesStats();
      setResources(resourcesData);
    } catch (error) {
      console.error('Failed to create resource:', error);
      alert('Failed to create resource');
    }
  };

  const toggleResourceCompletion = (resourceId: number) => {
    setCompletedResources(prev => {
      const newSet = new Set(prev);
      if (newSet.has(resourceId)) {
        newSet.delete(resourceId);
      } else {
        newSet.add(resourceId);
      }
      return newSet;
    });
  };

  const getStatusIcon = (state: string) => {
    return state === 'open' ? (
      <AlertCircle className="w-4 h-4 text-red-500" />
    ) : (
      <CheckCircle className="w-4 h-4 text-green-500" />
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin text-gray-500" />
          <span className="ml-2 text-gray-500">
            Loading website resources...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3" />
              Website Resources Checklist
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
              Track and manage website development resources and tasks
            </p>
          </div>
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Resource
          </Button>
        </div>

        {/* Stats Cards */}
        {resources && (
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <BookOpen className="h-8 w-8 text-blue-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total Resources
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {resources.total}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <AlertCircle className="h-8 w-8 text-red-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Open Resources
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {resources.total - completedResources.size}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Completed Resources
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {completedResources.size}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-yellow-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Completion Rate
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {resources.total > 0
                        ? Math.round(
                            (completedResources.size / resources.total) * 100
                          )
                        : 0}
                      %
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Create Issue Form */}
        {showCreateForm && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add New Resource
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resource Title
                </label>
                <Input
                  placeholder="Enter resource title..."
                  value={newIssue.title}
                  onChange={e =>
                    setNewIssue({ ...newIssue, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <Textarea
                  placeholder="Describe the resource..."
                  rows={4}
                  value={newIssue.body}
                  onChange={e =>
                    setNewIssue({ ...newIssue, body: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleCreateResource}
                  disabled={!newIssue.title.trim()}
                >
                  Add Resource
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <Select
                  value={filterStatus}
                  onValueChange={(value: 'all' | 'open' | 'closed') =>
                    setFilterStatus(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Resources</SelectItem>
                    <SelectItem value="open">Open Resources</SelectItem>
                    <SelectItem value="closed">Completed Resources</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Issues List */}
        <div className="space-y-4">
          {filteredResources.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No resources found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchTerm || filterStatus !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'No resources have been added yet.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Group resources by category */}
              {Object.entries(
                filteredResources.reduce(
                  (acc, resource) => {
                    const category =
                      resource.labels[0]?.name || 'Uncategorized';
                    if (!acc[category]) acc[category] = [];
                    acc[category].push(resource);
                    return acc;
                  },
                  {} as Record<string, typeof filteredResources>
                )
              ).map(([category, categoryResources]) => (
                <div key={category} className="space-y-3">
                  <div className="flex items-center gap-2 mb-4">
                    <FolderOpen className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {category}
                    </h2>
                    <Badge variant="outline" className="text-xs">
                      {categoryResources.length} resources
                    </Badge>
                  </div>

                  <div className="grid gap-3">
                    {categoryResources.map(resource => (
                      <Card
                        key={resource.id}
                        className={`transition-all duration-200 hover:shadow-md ${
                          resource.state === 'closed'
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                            : 'bg-white dark:bg-gray-800'
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            {/* Checkbox */}
                            <button
                              onClick={() =>
                                toggleResourceCompletion(resource.id)
                              }
                              className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                completedResources.has(resource.id)
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-gray-300 hover:border-green-400'
                              }`}
                            >
                              {completedResources.has(resource.id) && (
                                <Check className="w-3 h-3" />
                              )}
                            </button>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                {getStatusIcon(resource.state)}
                                <h3
                                  className={`text-lg font-semibold truncate ${
                                    completedResources.has(resource.id)
                                      ? 'line-through text-gray-500 dark:text-gray-400'
                                      : 'text-gray-900 dark:text-white'
                                  }`}
                                >
                                  {resource.title}
                                </h3>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  <span>{resource.user.login}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{formatDate(resource.created_at)}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 ml-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  window.open(resource.html_url, '_blank')
                                }
                                className="flex items-center gap-1"
                              >
                                <ExternalLink className="w-4 h-4" />
                                View
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
