"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { getPreparationGuideById } from "@/lib/preparationGuides";

export default function PreparationGuideDetailPage() {
  const params = useParams();
  const guideId = params.id as string;
  
  const guide = getPreparationGuideById(guideId);
  
  if (!guide) {
    notFound();
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300';
      case 'intermediate':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300';
      case 'advanced':
        return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300';
      case 'all-levels':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '🌱';
      case 'intermediate':
        return '🚀';
      case 'advanced':
        return '⚡';
      case 'all-levels':
        return '🎯';
      default:
        return '📚';
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link 
            href="/preparation-guides" 
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Preparation Guides
          </Link>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(guide.difficulty)}`}>
              {getDifficultyIcon(guide.difficulty)} {guide.difficulty.replace('-', ' ')}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{formatTime(guide.estimatedTime)}</span>
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {guide.title}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-6">
            {guide.description}
          </p>

          {/* Target Skills */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">Target Skills</h3>
            <div className="flex flex-wrap gap-2">
              {guide.targetSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Guide Sections</h2>
          
          <div className="space-y-6">
            {guide.sections.map((section, index) => (
              <div
                key={index}
                className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow bg-background"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                      {index + 1}
                    </span>
                    <h3 className="text-xl font-semibold text-foreground">
                      {section.title}
                    </h3>
                  </div>
                  <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {formatTime(section.readingTime)}
                  </span>
                </div>
                <p className="text-muted-foreground mb-4 text-lg">
                  {section.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {section.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guide.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center text-sm text-muted-foreground"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/preparation-guides"
            className="flex-1 bg-muted text-foreground px-6 py-3 rounded-lg text-center hover:bg-muted/80 transition-colors"
          >
            Browse All Preparation Guides
          </Link>
          <Link
            href="/study-plans"
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg text-center hover:bg-blue-700 transition-colors"
          >
            View Study Plans
          </Link>
        </div>
      </div>
    </div>
  );
}
