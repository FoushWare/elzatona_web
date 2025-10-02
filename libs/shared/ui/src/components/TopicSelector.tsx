'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Plus,
  Minus,
  Tag,
  Loader2,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { QuestionTopic } from './TopicManager';

interface TopicSelection {
  topicId: string;
  topicName: string;
  questionCount: number;
  selectedCount: number;
  color: string;
}

interface TopicSelectorProps {
  selectedTopics: TopicSelection[];
  onTopicsChange: (topics: TopicSelection[]) => void;
  maxQuestionsPerTopic?: number;
  totalQuestionsLimit?: number;
}

export const TopicSelector: React.FC<TopicSelectorProps> = ({
  selectedTopics,
  onTopicsChange,
  maxQuestionsPerTopic = 10,
  totalQuestionsLimit,
}) => {
  const [availableTopics, setAvailableTopics] = useState<QuestionTopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');

  // Load available topics
  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/topics');
      const data = await response.json();

      if (data.success) {
        setAvailableTopics(data.data);
      } else {
        setError(data.error || 'Failed to load topics');
      }
    } catch (error) {
      setError('Failed to load topics');
      console.error('Error loading topics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTopic = async (topic: QuestionTopic) => {
    // Check if topic is already selected
    if (selectedTopics.some(st => st.topicId === topic.id)) {
      return;
    }

    // Get question count for this topic
    try {
      const response = await fetch(`/api/questions/by-topic/${topic.id}`);
      const data = await response.json();

      if (data.success) {
        const questionCount = data.count;
        const newSelection: TopicSelection = {
          topicId: topic.id,
          topicName: topic.name,
          questionCount,
          selectedCount: Math.min(1, questionCount), // Start with 1 question
          color: topic.color,
        };

        onTopicsChange([...selectedTopics, newSelection]);
      }
    } catch (error) {
      console.error('Error getting question count:', error);
    }
  };

  const removeTopic = (topicId: string) => {
    onTopicsChange(selectedTopics.filter(st => st.topicId !== topicId));
  };

  const updateQuestionCount = (topicId: string, count: number) => {
    const updatedTopics = selectedTopics.map(st => {
      if (st.topicId === topicId) {
        return {
          ...st,
          selectedCount: Math.min(Math.max(0, count), st.questionCount),
        };
      }
      return st;
    });
    onTopicsChange(updatedTopics);
  };

  const getTotalSelectedQuestions = () => {
    return selectedTopics.reduce(
      (total, topic) => total + topic.selectedCount,
      0
    );
  };

  const getFilteredTopics = () => {
    let filtered = availableTopics;

    if (filterCategory !== 'all') {
      filtered = filtered.filter(topic => topic.category === filterCategory);
    }

    // Filter out already selected topics
    filtered = filtered.filter(
      topic => !selectedTopics.some(st => st.topicId === topic.id)
    );

    return filtered;
  };

  const getCategoryInfo = (category: string) => {
    const categories = [
      { id: 'javascript-core', name: 'JavaScript Core', color: '#F7DF1E' },
      {
        id: 'data-structures-algorithms',
        name: 'Data Structures & Algorithms',
        color: '#FF6B6B',
      },
      { id: 'browser-dom', name: 'Browser & DOM', color: '#4ECDC4' },
      { id: 'css-styling', name: 'CSS & Styling', color: '#45B7D1' },
      { id: 'react', name: 'React', color: '#61DAFB' },
      {
        id: 'nextjs-frameworks',
        name: 'Next.js & Frameworks',
        color: '#000000',
      },
      { id: 'typescript', name: 'TypeScript', color: '#3178C6' },
      { id: 'testing', name: 'Testing', color: '#99425B' },
      {
        id: 'build-tools-workflow',
        name: 'Build Tools & Workflow',
        color: '#6C757D',
      },
      { id: 'security', name: 'Security', color: '#FF4757' },
      {
        id: 'software-engineering',
        name: 'Software Engineering',
        color: '#2ED573',
      },
      {
        id: 'performance-monitoring',
        name: 'Performance & Monitoring',
        color: '#FFA502',
      },
      { id: 'advanced-future', name: 'Advanced & Future', color: '#9C88FF' },
    ];
    return (
      categories.find(cat => cat.id === category) ||
      categories[categories.length - 1]
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Tag className="w-5 h-5" />
            <span>Topic Selection Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {selectedTopics.length}
              </div>
              <div className="text-sm text-gray-600">Topics Selected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {getTotalSelectedQuestions()}
              </div>
              <div className="text-sm text-gray-600">Total Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {selectedTopics.reduce(
                  (total, topic) => total + topic.questionCount,
                  0
                )}
              </div>
              <div className="text-sm text-gray-600">Available Questions</div>
            </div>
          </div>

          {totalQuestionsLimit && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span>Question Limit</span>
                <span
                  className={
                    getTotalSelectedQuestions() > totalQuestionsLimit
                      ? 'text-red-600'
                      : 'text-green-600'
                  }
                >
                  {getTotalSelectedQuestions()} / {totalQuestionsLimit}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className={`h-2 rounded-full ${
                    getTotalSelectedQuestions() > totalQuestionsLimit
                      ? 'bg-red-500'
                      : 'bg-green-500'
                  }`}
                  style={{
                    width: `${Math.min(100, (getTotalSelectedQuestions() / totalQuestionsLimit) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Selected Topics */}
      {selectedTopics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Selected Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedTopics.map(topic => (
                <div
                  key={topic.topicId}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: topic.color }}
                    />
                    <div>
                      <div className="font-medium">{topic.topicName}</div>
                      <div className="text-sm text-gray-600">
                        {topic.questionCount} questions available
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateQuestionCount(
                            topic.topicId,
                            topic.selectedCount - 1
                          )
                        }
                        disabled={topic.selectedCount <= 0}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">
                        {topic.selectedCount}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateQuestionCount(
                            topic.topicId,
                            topic.selectedCount + 1
                          )
                        }
                        disabled={topic.selectedCount >= topic.questionCount}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeTopic(topic.topicId)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Topic Dropdown */}
      <Card>
        <CardHeader>
          <CardTitle>Add Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Select
                onValueChange={topicId => {
                  const topic = availableTopics.find(t => t.id === topicId);
                  if (topic) {
                    addTopic(topic);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a topic to add..." />
                </SelectTrigger>
                <SelectContent>
                  {getFilteredTopics().map(topic => {
                    const categoryInfo = getCategoryInfo(topic.category);
                    return (
                      <SelectItem key={topic.id} value={topic.id}>
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: topic.color }}
                          />
                          <span>{topic.name}</span>
                          <Badge
                            variant="outline"
                            className="ml-2 text-xs"
                            style={{
                              borderColor: categoryInfo.color,
                              color: categoryInfo.color,
                            }}
                          >
                            {categoryInfo.name}
                          </Badge>
                          <span className="text-xs text-gray-500 ml-2">
                            ({topic.questionCount} questions)
                          </span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-48">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="javascript-core">
                    JavaScript Core
                  </SelectItem>
                  <SelectItem value="data-structures-algorithms">
                    Data Structures & Algorithms
                  </SelectItem>
                  <SelectItem value="browser-dom">Browser & DOM</SelectItem>
                  <SelectItem value="css-styling">CSS & Styling</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="nextjs-frameworks">
                    Next.js & Frameworks
                  </SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="testing">Testing</SelectItem>
                  <SelectItem value="build-tools-workflow">
                    Build Tools & Workflow
                  </SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="software-engineering">
                    Software Engineering
                  </SelectItem>
                  <SelectItem value="performance-monitoring">
                    Performance & Monitoring
                  </SelectItem>
                  <SelectItem value="advanced-future">
                    Advanced & Future
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {getFilteredTopics().length === 0 && (
            <div className="text-center py-8">
              <Tag className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">
                {filterCategory !== 'all'
                  ? 'No topics available in this category.'
                  : 'No topics available. Create some topics first.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
