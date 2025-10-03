'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LearningResourcesService, LearningResourcesStats } from '@/lib/learning-resources-service';
import { 
  allWebsiteFeatures, 
  getFeatureStats,
  WebsiteFeature
} from '@/lib/website-features';
import FeatureDetailsModal from '@/components/FeatureDetailsModal';
import {
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  ExternalLink,
  BookOpen,
  Eye,
  Globe,
  Shield,
} from 'lucide-react';

export default function PublicReportsPage() {
  const [learningResources, setLearningResources] = useState<LearningResourcesStats | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Website' | 'Admin'>('all');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [selectedFeature, setSelectedFeature] = useState<WebsiteFeature | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Fetch learning resources data
  useEffect(() => {
    const fetchLearningResources = async () => {
      try {
        const resources = await LearningResourcesService.getResourcesStats();
        setLearningResources(resources);
      } catch (error) {
        console.error('Failed to fetch learning resources:', error);
      }
    };

    fetchLearningResources();
  }, []);

  // Get feature statistics
  const featureStats = getFeatureStats();

  // Handle feature details modal
  const handleFeatureDetails = (feature: WebsiteFeature) => {
    setSelectedFeature(feature);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedFeature(null);
  };

  // Get unique sections for filtering
  const allSections = Array.from(new Set(allWebsiteFeatures.map(f => f.section))).sort();

  // Filter features based on selected category and section
  const filteredFeatures = allWebsiteFeatures.filter(feature => {
    const categoryMatch = selectedCategory === 'all' || feature.category === selectedCategory;
    const sectionMatch = selectedSection === 'all' || feature.section === selectedSection;
    return categoryMatch && sectionMatch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">In Progress</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Critical</Badge>;
      case 'High':
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">High</Badge>;
      case 'Medium':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Medium</Badge>;
      case 'Low':
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Website':
        return <Globe className="w-4 h-4" />;
      case 'Admin':
        return <Shield className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Website Features & Development Status</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore all features across our platform, see what&apos;s available, what&apos;s being developed, 
            and what&apos;s planned for the future. Get insights into our development process and feature stories.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Features</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{featureStats.total}</div>
              <p className="text-xs text-muted-foreground">
                {featureStats.website} Website • {featureStats.admin} Admin
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{featureStats.completed}</div>
              <p className="text-xs text-muted-foreground">
                {featureStats.completionRate}% completion rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{featureStats.inProgress}</div>
              <p className="text-xs text-muted-foreground">
                Currently being developed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <AlertCircle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{featureStats.pending}</div>
              <p className="text-xs text-muted-foreground">
                Planned for future development
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Learning Resources Integration */}
        {learningResources && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Learning Resources Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{learningResources.open}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Resources to Complete</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{learningResources.closed}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Resources Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{learningResources.total}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Resources</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Category:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as 'all' | 'Website' | 'Admin')}
                  className="px-3 py-1 border rounded-md text-sm"
                >
                  <option value="all">All Categories</option>
                  <option value="Website">Website Features</option>
                  <option value="Admin">Admin Features</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Section:</label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="px-3 py-1 border rounded-md text-sm"
                >
                  <option value="all">All Sections</option>
                  {allSections.map(section => (
                    <option key={section} value={section}>{section}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              All Features ({filteredFeatures.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredFeatures.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={feature.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        {getCategoryIcon(feature.category)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{feature.title}</h3>
                          {getStatusBadge(feature.status)}
                          {getPriorityBadge(feature.priority)}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {feature.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                          <span className="flex items-center gap-1">
                            <span className="font-medium">Category:</span> {feature.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="font-medium">Section:</span> {feature.section}
                          </span>
                          {feature.url && (
                            <span className="flex items-center gap-1">
                              <span className="font-medium">URL:</span> 
                              <a 
                                href={feature.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                {feature.url}
                              </a>
                            </span>
                          )}
                        </div>
                        {feature.status === 'in-progress' && feature.progress && (
                          <div className="mt-2">
                            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                              <span>Progress: {feature.progress}%</span>
                              {feature.estimatedCompletion && (
                                <span>• ETA: {feature.estimatedCompletion}</span>
                              )}
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${feature.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        {feature.status === 'pending' && feature.estimatedEffort && (
                          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Estimated Effort:</span> {feature.estimatedEffort}
                            {feature.dependencies && feature.dependencies.length > 0 && (
                              <span className="ml-2">
                                <span className="font-medium">Dependencies:</span> {feature.dependencies.join(', ')}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFeatureDetails(feature)}
                        className="flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        Details
                      </Button>
                      {feature.url && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(feature.url!, '_blank')}
                          className="flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => setSelectedCategory('Website')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                View Website Features
              </Button>
              <Button
                onClick={() => setSelectedCategory('Admin')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                View Admin Features
              </Button>
              <Button
                onClick={() => setSelectedCategory('all')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View All Features
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Feature Details Modal */}
        <FeatureDetailsModal
          feature={selectedFeature}
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
        />
      </div>
    </div>
  );
}
