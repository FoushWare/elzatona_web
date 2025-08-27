"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getResourceById, InternalQuestion } from "@/lib/internalResources";

export default function InternalResourceDetailPage() {
  const params = useParams();
  const resourceId = params.id as string;
  const [resource, setResource] = useState(getResourceById(resourceId));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (resource) {
      // Calculate initial score based on existing answers
      const correctAnswers = resource.questions.filter(
        (q) => userAnswers[q.id] === q.correctAnswer
      ).length;
      setScore(correctAnswers);
    }
  }, [resource, userAnswers]);

  if (!resource) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Resource not found
          </h1>
          <Link
            href="/internal-resources"
            className="text-blue-600 hover:text-blue-800"
          >
            Back to Internal Resources
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = resource.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === resource.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < resource.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(
        userAnswers[resource.questions[currentQuestionIndex + 1].id] || null
      );
      setShowExplanation(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(
        userAnswers[resource.questions[currentQuestionIndex - 1].id] || null
      );
      setShowExplanation(false);
    }
  };

  const handleShowExplanation = () => {
    setShowExplanation(true);
  };

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const hasAnswered = selectedAnswer !== null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              href="/internal-resources"
              className="text-blue-600 hover:text-blue-800"
            >
              ← Back to Resources
            </Link>
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <span className="text-4xl">{resource.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {resource.title}
              </h1>
              <p className="text-gray-600 mt-2">{resource.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {resource.totalQuestions}
              </div>
              <div className="text-sm text-gray-600">Questions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {Math.round((score / resource.totalQuestions) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {resource.estimatedTime}
              </div>
              <div className="text-sm text-gray-600">Minutes</div>
            </div>
          </div>
        </div>

        {/* Question Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Question {currentQuestionIndex + 1} of {resource.totalQuestions}
            </h2>
            <div className="flex space-x-2">
              {resource.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentQuestionIndex(index);
                    setSelectedAnswer(
                      userAnswers[resource.questions[index].id] || null
                    );
                    setShowExplanation(false);
                  }}
                  className={`w-8 h-8 rounded-full text-sm font-medium ${
                    index === currentQuestionIndex
                      ? "bg-blue-600 text-white"
                      : userAnswers[resource.questions[index].id]
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / resource.totalQuestions) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 mb-8">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Question {currentQuestionIndex + 1} of {resource.questions.length}
              </h3>
              <span className="text-sm text-gray-600 font-medium">
                {Math.round(((currentQuestionIndex + 1) / resource.questions.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / resource.questions.length) * 100}%` }}
              ></div>
            </div>
            <h4 className="text-lg sm:text-xl font-semibold text-gray-900">
              {currentQuestion.question}
            </h4>
          </div>

            {currentQuestion.code && (
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6 overflow-x-auto">
                <pre className="text-sm">{currentQuestion.code}</pre>
              </div>
            )}

          {/* Answer Options */}
          <div className="space-y-3 mb-6">
            {Object.entries(currentQuestion.options).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleAnswerSelect(key)}
                disabled={hasAnswered}
                className={`w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === key
                    ? isCorrect
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                } ${
                  hasAnswered
                    ? "cursor-default"
                    : "cursor-pointer hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start sm:items-center space-x-3">
                  <div
                    className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === key
                        ? isCorrect
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-red-500 bg-red-500 text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedAnswer === key && (
                      <span className="text-xs sm:text-sm font-bold">
                        {isCorrect ? "✓" : "✗"}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
                    <span className="font-medium text-gray-900 text-sm sm:text-base">{key}.</span>
                    <span className="text-gray-700 text-sm sm:text-base break-words">{value}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">Explanation</h4>
              <p className="text-blue-800">{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              onClick={handlePreviousQuestion}
              disabled={isFirstQuestion}
              className={`w-full sm:w-auto px-4 sm:px-6 py-2 rounded-md font-medium text-sm sm:text-base ${
                isFirstQuestion
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-600 text-white hover:bg-gray-700"
              }`}
            >
              ← Previous
            </button>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              {hasAnswered && !showExplanation && (
                <button
                  onClick={handleShowExplanation}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 text-sm sm:text-base"
                >
                  Show Explanation
                </button>
              )}

              {!isLastQuestion && (
                <button
                  onClick={handleNextQuestion}
                  disabled={!hasAnswered}
                  className={`w-full sm:w-auto px-4 sm:px-6 py-2 rounded-md font-medium text-sm sm:text-base ${
                    !hasAnswered
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Next Question →
                </button>
              )}

              {isLastQuestion && hasAnswered && (
                <button
                  onClick={() => {
                    // Could navigate to results page or show summary
                    alert("Congratulations! You've completed all questions!");
                  }}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 text-sm sm:text-base"
                >
                  Complete ✓
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Resource Info */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            About This Resource
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Prerequisites</h4>
              <ul className="space-y-1">
                {resource.prerequisites.map((prereq, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-600 flex items-center"
                  >
                    <span className="text-blue-500 mr-2">•</span>
                    {prereq}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Learning Outcomes
              </h4>
              <ul className="space-y-1">
                {resource.learningOutcomes.map((outcome, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-600 flex items-center"
                  >
                    <span className="text-green-500 mr-2">✓</span>
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
