'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, BarChart3, BookOpen } from 'lucide-react';
import { behaviorQuestions, BehaviorQuestion } from '@/lib/behaviorQuestions';
import BehaviorQuestionComponent from '@/components/BehaviorQuestion';

type ViewMode = 'overview' | 'practice' | 'results';

export default function BehavioralQuestionsPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(
    new Set()
  );

  const currentQuestion = behaviorQuestions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < behaviorQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleComplete = () => {
    setViewMode('results');
  };

  const handleStartPractice = () => {
    setViewMode('practice');
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setCompletedQuestions(new Set());
  };

  const handleBackToOverview = () => {
    setViewMode('overview');
  };

  const getProgressPercentage = () => {
    return Math.round(
      (completedQuestions.size / behaviorQuestions.length) * 100
    );
  };

  if (viewMode === 'practice') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="outline"
                onClick={handleBackToOverview}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Overview
              </Button>
              <h1 className="text-3xl font-bold text-gray-800">
                Behavioral Interview Practice
              </h1>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>
                Question {currentQuestionIndex + 1} of{' '}
                {behaviorQuestions.length}
              </span>
              <span>{getProgressPercentage()}% Complete</span>
            </div>
          </div>

          {/* Question Component */}
          <BehaviorQuestionComponent
            question={currentQuestion}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onComplete={handleComplete}
            isFirst={currentQuestionIndex === 0}
            isLast={currentQuestionIndex === behaviorQuestions.length - 1}
          />
        </div>
      </div>
    );
  }

  if (viewMode === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Button
                variant="outline"
                onClick={handleBackToOverview}
                className="flex items-center gap-2 mb-4"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Overview
              </Button>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Practice Complete! 🎉
              </h1>
              <p className="text-gray-600">
                You&apos;ve completed all behavioral interview questions. Review
                your answers below.
              </p>
            </div>

            {/* Results Summary */}
            <Card className="mb-8 border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                  Practice Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600">
                      {completedQuestions.size}
                    </div>
                    <div className="text-sm text-gray-600">
                      Questions Answered
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600">
                      {behaviorQuestions.length}
                    </div>
                    <div className="text-sm text-gray-600">Total Questions</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600">
                      {getProgressPercentage()}%
                    </div>
                    <div className="text-sm text-gray-600">Completion Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Answer Review */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Your Answers</h2>
              {behaviorQuestions.map((question, index) => (
                <Card key={question.id} className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      Question {index + 1}: {question.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userAnswers[question.id] ? (
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-gray-700 whitespace-pre-wrap">
                          {userAnswers[question.id]}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">No answer provided</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button
                onClick={handleStartPractice}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                Practice Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Overview Mode
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <h1 className="text-3xl font-bold text-gray-800">
                Behavioral Interview Questions
              </h1>
            </div>
            <p className="text-lg text-gray-600 mb-6">
              Practice answering behavioral interview questions using the STAR
              method. These questions help employers understand how you handle
              real-world situations.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  About Behavioral Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Behavioral questions ask you to describe past experiences to
                  predict future performance. They help interviewers understand
                  your problem-solving, communication, and teamwork skills.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    • Use the STAR method (Situation, Task, Action, Result)
                  </li>
                  <li>• Be specific and provide concrete examples</li>
                  <li>• Focus on your actions and the positive outcomes</li>
                  <li>
                    • Prepare 5-7 stories that can answer multiple questions
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                  Practice Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Regular practice with behavioral questions helps you:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Structure your answers effectively</li>
                  <li>• Build confidence in storytelling</li>
                  <li>• Prepare for common interview scenarios</li>
                  <li>• Improve your communication skills</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Questions List */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Available Questions ({behaviorQuestions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {behaviorQuestions.map((question, index) => (
                  <div
                    key={question.id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2">
                          Question {index + 1}: {question.question}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {question.tags.map(tag => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Badge variant="secondary" className="ml-4">
                        {question.difficulty}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Start Practice Button */}
          <div className="text-center">
            <Button
              onClick={handleStartPractice}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
            >
              <Play className="h-5 w-5 mr-2" />
              Start Practice Session
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
