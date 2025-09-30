'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ExternalLink, BookOpen, Video, FileText, Code } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'video' | 'documentation' | 'tutorial' | 'article' | 'code' | 'other';
  description?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime?: number; // in minutes
}

interface LearningPath {
  id: string;
  name: string;
  description: string;
  questionCount: number;
}

export default function LearningPathResourcesPage() {
  const params = useParams();
  const router = useRouter();
  const pathId = params.id as string;
  
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'video' | 'documentation' | 'tutorial' | 'article' | 'code'>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch learning path details
        const pathResponse = await fetch(`/api/learning-paths/${pathId}`);
        if (!pathResponse.ok) {
          throw new Error('Failed to fetch learning path');
        }
        const pathData = await pathResponse.json();
        setLearningPath(pathData);

        // Fetch resources for this learning path
        const resourcesResponse = await fetch(`/api/learning-paths/${pathId}/resources`);
        if (!resourcesResponse.ok) {
          throw new Error('Failed to fetch resources');
        }
        const resourcesData = await resourcesResponse.json();
        setResources(resourcesData);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (pathId) {
      fetchData();
    }
  }, [pathId]);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'documentation':
        return <BookOpen className="w-5 h-5" />;
      case 'tutorial':
        return <FileText className="w-5 h-5" />;
      case 'code':
        return <Code className="w-5 h-5" />;
      default:
        return <ExternalLink className="w-5 h-5" />;
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const filteredResources = resources.filter(resource => 
    filter === 'all' || resource.type === filter
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-8">
        <main className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center py-12">
            <div className="text-white text-lg">Loading resources...</div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-8">
        <main className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center py-12">
            <div className="text-red-400 text-lg">Error: {error}</div>
            <button
              onClick={() => router.back()}
              className="mt-4 text-blue-400 hover:text-blue-300"
            >
              Go Back
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-8">
      <main className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-300 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Learning Paths</span>
          </button>
          
          <h1 className="text-4xl font-bold text-white mb-2">
            {learningPath?.name} Resources
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            {learningPath?.description}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All Resources' },
              { key: 'video', label: 'Videos' },
              { key: 'documentation', label: 'Documentation' },
              { key: 'tutorial', label: 'Tutorials' },
              { key: 'article', label: 'Articles' },
              { key: 'code', label: 'Code Examples' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-gray-800 hover:bg-gray-750 rounded-lg p-6 border border-gray-700 transition-all duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 text-blue-400">
                    {getResourceIcon(resource.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-lg mb-2 line-clamp-2">
                      {resource.title}
                    </h3>
                    
                    {resource.description && (
                      <p className="text-gray-300 text-sm mb-3 line-clamp-3">
                        {resource.description}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.difficulty && (
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                          {resource.difficulty}
                        </span>
                      )}
                      {resource.estimatedTime && (
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs font-medium">
                          {resource.estimatedTime} min
                        </span>
                      )}
                      <span className="px-2 py-1 bg-blue-600 text-blue-100 rounded text-xs font-medium capitalize">
                        {resource.type}
                      </span>
                    </div>
                    
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <span>Open Resource</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">
              No resources found for this learning path.
            </div>
            <p className="text-gray-500">
              Resources will be added soon. Check back later!
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-white font-medium text-lg mb-4">Resource Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{resources.length}</div>
              <div className="text-gray-400 text-sm">Total Resources</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {resources.filter(r => r.type === 'video').length}
              </div>
              <div className="text-gray-400 text-sm">Videos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {resources.filter(r => r.type === 'documentation').length}
              </div>
              <div className="text-gray-400 text-sm">Documentation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {resources.filter(r => r.type === 'tutorial').length}
              </div>
              <div className="text-gray-400 text-sm">Tutorials</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
