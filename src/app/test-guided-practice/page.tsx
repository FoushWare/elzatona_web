'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface Question {
  id: string;
  question: string;
  content?: string;
  title?: string;
  options: string[];
  correctAnswer: number | string;
  explanation: string;
  section: string;
  difficulty:
    | 'easy'
    | 'medium'
    | 'hard'
    | 'beginner'
    | 'intermediate'
    | 'advanced';
  type:
    | 'multiple-choice'
    | 'conceptual'
    | 'open-ended'
    | 'true-false'
    | 'multiple-select';
  answer?: string;
}

function TestGuidedPracticeContent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan');

  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Helper function to get plan categories based on plan details
  const getPlanCategories = (planDetails: any) => {
    const categories = new Set<string>();

    if (planDetails.sections) {
      const sections = Array.isArray(planDetails.sections)
        ? planDetails.sections
        : Object.values(planDetails.sections);

      sections.forEach((section: any) => {
        if (section.name) {
          const sectionName = section.name;
          if (sectionName === 'HTML & CSS') {
            categories.add('HTML & CSS');
          } else if (sectionName === 'JavaScript') {
            categories.add('JavaScript (Core)');
          } else if (sectionName === 'React') {
            categories.add('React');
          } else if (sectionName === 'TypeScript') {
            categories.add('TypeScript');
          } else if (sectionName === 'CSS & Styling') {
            categories.add('CSS & Styling');
          } else if (sectionName === 'Performance') {
            categories.add('Performance');
          } else if (sectionName === 'Security') {
            categories.add('Security');
          } else if (sectionName === 'Testing') {
            categories.add('Testing');
          }
        }
      });
    }

    if (categories.size === 0) {
      categories.add('JavaScript (Core)');
      categories.add('React');
      categories.add('HTML & CSS');
    }

    return Array.from(categories);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!planId) {
        setError('No plan ID provided');
        setIsLoading(false);
        return;
      }

      try {
        console.log('🔄 Starting to fetch questions for plan:', planId);
        setIsLoading(true);
        setError(null);

        // First, get the plan details
        const planResponse = await fetch(
          `/api/guided-learning/plans/${planId}`
        );
        const planData = await planResponse.json();

        if (!planData.success) {
          throw new Error(planData.error || 'Failed to load plan details');
        }

        const planDetails = planData.data;
        console.log('📋 Plan details:', planDetails);

        // Get all question IDs from plan sections
        const allQuestionIds = [];
        if (planDetails.sections) {
          const sections = Array.isArray(planDetails.sections)
            ? planDetails.sections
            : Object.values(planDetails.sections);

          sections.forEach((section: any) => {
            if (section.questions && Array.isArray(section.questions)) {
              allQuestionIds.push(...section.questions);
            }
          });
        }

        console.log('🔍 Question IDs from plan sections:', allQuestionIds);

        let questionsToFetch = [];
        if (allQuestionIds.length > 0) {
          // Fetch specific questions by IDs
          const questionPromises = allQuestionIds.map(
            async (questionId: string) => {
              try {
                const response = await fetch(
                  `/api/questions/unified/${questionId}`
                );
                const data = await response.json();
                return data.success ? data.data : null;
              } catch (error) {
                console.error(`Error fetching question ${questionId}:`, error);
                return null;
              }
            }
          );

          const questionResults = await Promise.all(questionPromises);
          questionsToFetch = questionResults.filter(Boolean);
        } else {
          // Fallback: fetch questions by categories
          const planCategories = getPlanCategories(planDetails);
          console.log('📚 Plan categories for fallback:', planCategories);

          const questionPromises = planCategories.map(
            async (category: string) => {
              try {
                const response = await fetch(
                  `/api/questions/unified?isActive=true&category=${encodeURIComponent(category)}`
                );
                const data = await response.json();
                return data.success ? data.data : [];
              } catch (error) {
                console.error(
                  `Error fetching questions for category ${category}:`,
                  error
                );
                return [];
              }
            }
          );

          const questionResults = await Promise.all(questionPromises);
          questionsToFetch = questionResults.flat();
        }

        console.log('✅ Questions to use:', questionsToFetch.length);

        // Transform questions to our Question interface
        const transformedQuestions: Question[] = questionsToFetch.map(
          (q: any) => {
            let options: string[] = [];
            let correctAnswer: number | string = 0;

            if (
              q.type === 'conceptual' ||
              q.type === 'open-ended' ||
              q.type === 'practical'
            ) {
              options = [];
              correctAnswer = q.answer || '';
            } else if (q.type === 'true-false') {
              options = ['True', 'False'];
              correctAnswer = q.correctAnswer === true ? 0 : 1;
            } else if (q.type === 'multiple-select') {
              options = q.options?.map((opt: any) => opt.text) || [];
              correctAnswer = q.correctAnswer || [];
            } else {
              options = q.options?.map((opt: any) => opt.text) || [];
              correctAnswer =
                q.options?.findIndex((opt: any) => opt.isCorrect) || 0;
            }

            return {
              id: q.id,
              question: q.content || q.title || q.question,
              content: q.content,
              title: q.title,
              options,
              correctAnswer,
              explanation: q.explanation || 'No explanation available.',
              section: q.category || q.section || 'General',
              difficulty: q.difficulty || 'medium',
              type: q.type || 'multiple-choice',
              answer: q.answer,
            };
          }
        );

        setQuestions(transformedQuestions);
        if (transformedQuestions.length > 0) {
          setCurrentQuestion(transformedQuestions[0]);
        }
        console.log(
          '✅ Successfully loaded questions:',
          transformedQuestions.length
        );
      } catch (error: any) {
        console.error('❌ Error fetching questions:', error);
        setError(error.message || 'Failed to load questions');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [planId]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            No Questions Available
          </h1>
          <p className="text-gray-600 mb-6">
            There are no questions available for this plan.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Test Guided Practice
            </h1>
            <p className="text-gray-600">
              Plan: {planId} | Questions: {questions.length}
            </p>
          </div>

          {currentQuestion && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {currentQuestion.difficulty}
                </span>
                <span className="text-sm text-gray-500">
                  {currentQuestion.section}
                </span>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {currentQuestion.question}
              </h2>

              {currentQuestion.content && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{currentQuestion.content}</p>
                </div>
              )}

              {currentQuestion.type === 'conceptual' ||
              currentQuestion.type === 'open-ended' ||
              currentQuestion.type === 'practical' ? (
                <div className="space-y-4">
                  <textarea
                    value={selectedAnswer || ''}
                    onChange={e => setSelectedAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={4}
                    disabled={showExplanation}
                  />
                  {!showExplanation && (
                    <button
                      onClick={() => handleAnswerSelect(selectedAnswer || '')}
                      disabled={!selectedAnswer}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Submit Answer
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={showExplanation}
                      className="w-full p-4 text-left border rounded-lg transition-colors hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-700">
                        {String.fromCharCode(65 + index)}. {option}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {showExplanation && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  {(currentQuestion.type === 'conceptual' ||
                    currentQuestion.type === 'open-ended' ||
                    currentQuestion.type === 'practical') &&
                    currentQuestion.answer && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Correct Answer:
                        </h4>
                        <p className="text-gray-700 bg-white p-3 rounded-lg">
                          {currentQuestion.answer}
                        </p>
                      </div>
                    )}

                  <h4 className="font-semibold text-gray-900 mb-2">
                    Explanation:
                  </h4>
                  <p className="text-gray-700">{currentQuestion.explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TestGuidedPracticePage() {
  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <TestGuidedPracticeContent />
    </Suspense>
  );
}
