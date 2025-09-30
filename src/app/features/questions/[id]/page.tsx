'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Code, CheckCircle, Users, Star } from 'lucide-react';
import { greatFrontendQuestions } from '@/lib/greatfrontendQuestions';

export default function QuestionDetailPage() {
  const params = useParams();
  const [question, setQuestion] = useState<
    (typeof greatFrontendQuestions)[0] | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const foundQuestion = greatFrontendQuestions.find(
        q => q.id === params.id
      );
      if (foundQuestion) {
        setQuestion(foundQuestion);
      }
      setLoading(false);
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading question...</p>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Question Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The question you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/questions"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Questions
          </Link>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'JavaScript Functions':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'React':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'CSS':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'System Design':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-sm border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/questions"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Questions
            </Link>

            <div className="flex items-center gap-2 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(question.category)}`}
              >
                {question.category}
              </span>
              <span className="text-muted-foreground">•</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(question.difficulty)}`}
              >
                {question.difficulty}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">
                {question.estimatedTime} min
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {question.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              {question.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              {question.completionRate && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{question.completionRate}% completion rate</span>
                </div>
              )}
              {question.companies && question.companies.length > 0 && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>Asked at {question.companies.join(', ')}</span>
                </div>
              )}
              {question.popularity && (
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Popularity: {question.popularity}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Problem Statement */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Code className="w-6 h-6 text-blue-500" />
              Problem Statement
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-foreground">{question.description}</p>
            </div>
          </div>

          {/* Tags */}
          {question.tags && question.tags.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Related Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {question.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={question.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
            >
              Try This Question
            </a>
            <button className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 px-6 py-3 rounded-lg font-medium transition-colors">
              View Discussion
            </button>
          </div>

          {/* Related Questions */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Related Questions
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {greatFrontendQuestions
                .filter(
                  q => q.category === question.category && q.id !== question.id
                )
                .slice(0, 6)
                .map(relatedQuestion => (
                  <Link
                    key={relatedQuestion.id}
                    href={`/questions/${relatedQuestion.id}`}
                    className="block bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {relatedQuestion.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(relatedQuestion.difficulty)}`}
                      >
                        {relatedQuestion.difficulty}
                      </span>
                      <span>{relatedQuestion.estimatedTime} min</span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
