'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { learningPaths } from '@/lib/resources';
// import { QuestionGroup } from '@/lib/questions'; // Removed - using Firebase directly

// Define QuestionGroup type locally
interface QuestionGroup {
  id: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  questions: any[];
}
import { useFirebaseQuestions } from '@/hooks/useFirebaseQuestions';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import { flashcardService } from '@/lib/firebase-flashcards';
import AddToFlashcard from '@/components/AddToFlashcard';
import EnhancedTTS from '@/components/EnhancedTTS';
import ExpandableText from '@/components/ExpandableText';
import MobilePagination from '@/components/MobilePagination';
import ToastContainer, { useToast } from '@/components/Toast';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function QuestionsPage() {
  const params = useParams();
  const router = useRouter();
  const pathId = params.id as string;
  const { user } = useFirebaseAuth();
  const { toasts, removeToast, showSuccess, showError } = useToast();

  const [currentGroup, setCurrentGroup] = useState<QuestionGroup | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(
    new Set()
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const learningPath = learningPaths.find(path => path.id === pathId);

  // Use Firebase questions hook
  const { questions: firebaseQuestions, loading } =
    useFirebaseQuestions(pathId);

  // Convert Firebase questions to the expected format
  const questionsData = useMemo(() => {
    if (!firebaseQuestions || firebaseQuestions.length === 0) {
      return null;
    }

    // Filter only multiple-choice questions and ensure they have required fields
    const multipleChoiceQuestions = firebaseQuestions.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (q: any) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (q as any).type === 'multiple-choice' &&
        q.options &&
        q.options.length > 0 &&
        typeof q.correctAnswer === 'number'
    );

    if (multipleChoiceQuestions.length === 0) {
      return null;
    }

    // Group questions by category or create a single group
    const groups: QuestionGroup[] = [
      {
        id: 'main',
        title: 'Multiple Choice Questions',
        questions: multipleChoiceQuestions.map(q => ({
          id: q.id,
          title: q.title,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          answer: q.answer,
          explanation: q.explanation,
          category: q.category,
          difficulty: q.difficulty,
          source: `${learningPath?.title || 'Learning Path'} - ${q.category}`,
        })),
      },
    ];

    return {
      groups,
      totalQuestions: multipleChoiceQuestions.length,
    };
  }, [firebaseQuestions, learningPath]);

  // Set current group when questions are loaded
  useEffect(() => {
    if (questionsData && questionsData.groups.length > 0) {
      setCurrentGroup(questionsData.groups[0]);
      setCurrentQuestionIndex(0);
    }
  }, [questionsData]);

  // Auto TTS when question changes
  useEffect(() => {
    if (currentGroup && currentGroup.questions[currentQuestionIndex]) {
      const currentQuestion = currentGroup.questions[currentQuestionIndex];
      const questionText = currentQuestion.question || '';

      // Small delay to ensure UI is ready
      const timer = setTimeout(() => {
        // Trigger TTS automatically
        if (
          questionText &&
          questionText.trim() !== '' &&
          typeof window !== 'undefined' &&
          'speechSynthesis' in window
        ) {
          // Cancel any ongoing speech
          speechSynthesis.cancel();

          const utterance = new SpeechSynthesisUtterance(questionText);

          // Try to find the best available voice
          const voices = speechSynthesis.getVoices();
          const preferredVoices = [
            'Google US English',
            'Microsoft Zira Desktop',
            'Microsoft David Desktop',
            'Alex',
            'Samantha',
            'Victoria',
            'Daniel',
            'Moira',
            'Tessa',
            'Karen',
            'Fiona',
            'Veena',
          ];

          let selectedVoice = null;
          for (const preferred of preferredVoices) {
            selectedVoice = voices.find(
              voice =>
                voice.name.includes(preferred) ||
                voice.name.toLowerCase().includes(preferred.toLowerCase())
            );
            if (selectedVoice) break;
          }

          if (selectedVoice) {
            utterance.voice = selectedVoice;
          }

          // Optimize speech parameters
          utterance.rate = 0.9;
          utterance.pitch = 1.0;
          utterance.volume = 0.8;
          utterance.lang = 'en-US';

          speechSynthesis.speak(utterance);
        }
      }, 500); // 500ms delay

      return () => clearTimeout(timer);
    }
  }, [currentGroup, currentQuestionIndex]);

  // Auto TTS when answer is shown
  useEffect(() => {
    if (
      showAnswer &&
      currentGroup &&
      currentGroup.questions[currentQuestionIndex]
    ) {
      const currentQuestion = currentGroup.questions[currentQuestionIndex];
      const answerText = currentQuestion.answer || '';
      const explanationText = currentQuestion.explanation || '';

      // Combine answer and explanation for TTS with proper fallbacks
      let fullText = '';
      if (answerText && explanationText) {
        fullText = `${answerText}. ${explanationText}`;
      } else if (answerText) {
        fullText = answerText;
      } else if (explanationText) {
        fullText = explanationText;
      } else {
        // Fallback to a generic message if no content is available
        fullText = 'No answer explanation available for this question.';
      }

      // Small delay to ensure UI is ready
      const timer = setTimeout(() => {
        // Trigger TTS automatically for the answer
        if (
          fullText &&
          fullText.trim() !== '' &&
          fullText !== 'No answer explanation available for this question.' &&
          typeof window !== 'undefined' &&
          'speechSynthesis' in window
        ) {
          // Cancel any ongoing speech
          speechSynthesis.cancel();

          const utterance = new SpeechSynthesisUtterance(fullText);

          // Try to find the best available voice
          const voices = speechSynthesis.getVoices();
          const preferredVoices = [
            'Google US English',
            'Microsoft Zira Desktop',
            'Microsoft David Desktop',
            'Alex',
            'Samantha',
            'Victoria',
            'Daniel',
            'Moira',
            'Tessa',
            'Karen',
            'Fiona',
            'Veena',
          ];

          let selectedVoice = null;
          for (const preferred of preferredVoices) {
            selectedVoice = voices.find(
              voice =>
                voice.name.includes(preferred) ||
                voice.name.toLowerCase().includes(preferred.toLowerCase())
            );
            if (selectedVoice) break;
          }

          if (selectedVoice) {
            utterance.voice = selectedVoice;
          }

          // Optimize speech parameters
          utterance.rate = 0.9;
          utterance.pitch = 1.0;
          utterance.volume = 0.8;
          utterance.lang = 'en-US';

          speechSynthesis.speak(utterance);
        }
      }, 300); // 300ms delay for answer

      return () => clearTimeout(timer);
    }
  }, [showAnswer, currentGroup, currentQuestionIndex]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex.toString());
  };

  const handleSubmitAnswer = async () => {
    if (!selectedAnswer || !currentGroup) return;

    const currentQuestion = currentGroup.questions[currentQuestionIndex];
    const selectedIndex = parseInt(selectedAnswer);
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;

    if (isCorrect && !answeredQuestions.has(currentQuestion.id)) {
      setScore(prev => prev + 1);
      setAnsweredQuestions(prev => new Set([...prev, currentQuestion.id]));
    }

    // Automatic flashcard creation on failure
    if (!isCorrect && user) {
      try {
        // Check if Firebase is properly configured before attempting flashcard operations
        const { exists } = await flashcardService.checkFlashcardExists(
          user.uid,
          currentQuestion.question
        );

        if (!exists) {
          await flashcardService.createFlashcardFromQuestion({
            question: currentQuestion.question,
            answer:
              currentQuestion.answer ||
              currentQuestion.explanation ||
              'No explanation provided',
            category:
              currentQuestion.category || learningPath?.title || 'General',
            difficulty: currentQuestion.difficulty || 'intermediate',
            source: `${learningPath?.title} - ${currentGroup.title}`,
            addedBy: 'failed',
            userId: user.uid,
          });

          showSuccess(
            'Question Bookmarked',
            'This question has been automatically bookmarked to your Flashcards for review later.'
          );
        }
      } catch (error) {
        console.error('Error creating flashcard from failed question:', error);
        // Don't show error to user if Firebase is not configured - just log it
        if (
          error instanceof Error &&
          error.message.includes('Firebase not configured')
        ) {
          console.warn('Firebase not configured - skipping flashcard creation');
        } else {
          showError(
            'Error',
            'Failed to add question to flashcards. Please try again.'
          );
        }
      }
    }

    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    if (!currentGroup) return;

    setIsNavigating(true);

    // Simulate network delay with variation
    const delay = 800 + Math.random() * 800; // 800-1600ms
    setTimeout(() => {
      if (currentQuestionIndex < currentGroup.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Move to next group or finish
        const currentGroupIndex =
          questionsData?.groups.findIndex(g => g.id === currentGroup.id) || 0;
        if (
          questionsData &&
          currentGroupIndex < questionsData.groups.length - 1
        ) {
          const nextGroup = questionsData.groups[currentGroupIndex + 1];
          setCurrentGroup(nextGroup);
          setCurrentQuestionIndex(0);
        }
      }

      setSelectedAnswer(null);
      setShowAnswer(false);
      setIsNavigating(false);
    }, delay);
  };

  const handlePreviousQuestion = () => {
    setIsNavigating(true);

    // Simulate network delay with variation
    const delay = 800 + Math.random() * 800; // 800-1600ms
    setTimeout(() => {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(prev => prev - 1);
      } else {
        // Move to previous group
        const currentGroupIndex =
          questionsData?.groups.findIndex(g => g.id === currentGroup?.id) || 0;
        if (questionsData && currentGroupIndex > 0) {
          const prevGroup = questionsData.groups[currentGroupIndex - 1];
          setCurrentGroup(prevGroup);
          setCurrentQuestionIndex(prevGroup.questions.length - 1);
        }
      }

      setSelectedAnswer(null);
      setShowAnswer(false);
      setIsNavigating(false);
    }, delay);
  };

  const navigateToQuestion = (groupIndex: number, questionIndex: number) => {
    if (questionsData && questionsData.groups[groupIndex]) {
      setIsNavigating(true);

      // Simulate network delay with variation
      const delay = 800 + Math.random() * 800; // 800-1600ms
      setTimeout(() => {
        setCurrentGroup(questionsData.groups[groupIndex]);
        setCurrentQuestionIndex(questionIndex);
        setSelectedAnswer(null);
        setShowAnswer(false);
        setIsDrawerOpen(false);
        setIsNavigating(false);
      }, delay);
    }
  };

  const toggleGroupExpansion = (groupId: string) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading questions...
          </p>
        </div>
      </div>
    );
  }

  if (!learningPath || !questionsData || !currentGroup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Questions Not Found
          </h1>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = currentGroup.questions[currentQuestionIndex];
  // Progress calculations removed as they were unused

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {/* Navigation Loader Overlay */}
        {isNavigating && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-2xl">
              <div className="flex items-center space-x-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <div className="text-lg font-medium text-gray-900 dark:text-white">
                  Fetching question...
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 py-8 relative">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Learning Path
              </button>

              <button
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                Questions List
              </button>
            </div>

            {/* Centered Title and Description */}
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {learningPath.title} - Practice Questions
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                Test your knowledge with interactive questions
              </p>

              {/* Question Progress */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {currentGroup.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Questions {currentQuestionIndex + 1} of{' '}
                      {currentGroup.questions.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Score */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-lg px-6 py-3 shadow-lg">
              <span className="text-2xl font-bold text-green-600 mr-2">🏆</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Score: {score} / {answeredQuestions.size}
              </span>
            </div>
          </div>

          {/* Side Drawer */}
          {isDrawerOpen && (
            <div className="fixed inset-0 z-50 overflow-hidden">
              <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={() => setIsDrawerOpen(false)}
              ></div>
              <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Questions List
                    </h2>
                    <button
                      onClick={() => setIsDrawerOpen(false)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto">
                    {questionsData?.groups.map((group, groupIndex) => {
                      const isExpanded = expandedGroups.has(group.id);
                      const answeredInGroup = group.questions.filter(q =>
                        answeredQuestions.has(q.id)
                      ).length;
                      const totalInGroup = group.questions.length;

                      return (
                        <div
                          key={group.id}
                          className="border-b border-gray-200 dark:border-gray-700 pb-4"
                        >
                          {/* Group Header - Clickable to toggle */}
                          <button
                            onClick={() => toggleGroupExpansion(group.id)}
                            className="w-full text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg p-2 -m-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div
                                  className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : 'rotate-0'}`}
                                >
                                  <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                  {group.title}
                                </h3>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {answeredInGroup}/{totalInGroup}
                                </span>
                                <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-green-500 transition-all duration-300"
                                    style={{
                                      width: `${(answeredInGroup / totalInGroup) * 100}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </button>

                          {/* Collapsible Questions */}
                          <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${
                              isExpanded
                                ? 'max-h-96 opacity-100'
                                : 'max-h-0 opacity-0'
                            }`}
                          >
                            <div className="p-4 pt-3 space-y-3">
                              {group.questions.map(
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                (question: any, questionIndex: number) => {
                                  const isCurrentQuestion =
                                    currentGroup?.id === group.id &&
                                    currentQuestionIndex === questionIndex;
                                  const isAnswered = answeredQuestions.has(
                                    question.id
                                  );

                                  return (
                                    <button
                                      key={question.id}
                                      onClick={() =>
                                        navigateToQuestion(
                                          groupIndex,
                                          questionIndex
                                        )
                                      }
                                      disabled={isNavigating}
                                      className={`w-full text-left p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                        isCurrentQuestion
                                          ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500'
                                          : isAnswered
                                            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                                            : 'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                                      }`}
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-2">
                                            Q{questionIndex + 1}
                                          </span>
                                          <span className="text-sm text-gray-900 dark:text-white truncate">
                                            {question.title}
                                          </span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                          {isAnswered && (
                                            <span className="text-green-600 dark:text-green-400 text-xs">
                                              ✓
                                            </span>
                                          )}
                                          {isCurrentQuestion && (
                                            <span className="text-blue-600 dark:text-blue-400 text-xs">
                                              ●
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </button>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Question Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 relative">
              {/* Bookmark at top right */}
              <div className="absolute top-6 right-6 z-10">
                <AddToFlashcard
                  key={currentQuestion.question} // Force re-render when question changes
                  question={currentQuestion.question}
                  answer={
                    currentQuestion.answer ||
                    currentQuestion.explanation ||
                    'No explanation provided'
                  }
                  category={
                    currentQuestion.category || learningPath?.title || 'General'
                  }
                  difficulty={currentQuestion.difficulty || 'intermediate'}
                  source={`${learningPath?.title} - ${currentGroup.title}`}
                  onStatusChange={status => {
                    if (status === 'added') {
                      showSuccess(
                        'Question Bookmarked',
                        'Question saved to your flashcard deck for later review'
                      );
                    } else if (status === 'removed') {
                      showSuccess(
                        'Bookmark Removed',
                        'Question removed from your flashcard collection'
                      );
                    } else if (status === 'error') {
                      if (!user) {
                        showError(
                          'Authentication Required',
                          'Please sign in to bookmark questions'
                        );
                      } else {
                        showError(
                          'Error',
                          'Failed to update bookmark. Please try again.'
                        );
                      }
                    }
                  }}
                  className="!p-2 !px-0"
                />
              </div>

              {/* Text-to-Speech at top left */}
              <div className="absolute top-6 left-6 z-10">
                <EnhancedTTS text={currentQuestion.question} />
              </div>

              <div className="mb-6 pt-12">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                      {currentQuestion.category}
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium">
                      {currentQuestion.difficulty}
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {currentQuestion.title}
                </h2>

                <div className="prose dark:prose-invert max-w-none">
                  <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    <ExpandableText
                      text={currentQuestion.question || 'No question available'}
                      maxLength={400}
                      className="whitespace-pre-wrap"
                      expandText="Read more"
                      collapseText="Read less"
                    />
                  </div>
                </div>
              </div>

              {/* Code Example */}
              {currentQuestion.codeExample && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Code Example:
                  </h4>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
                      <code>{currentQuestion.codeExample}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Answer Options */}
              <div className="space-y-3 mb-6">
                {currentQuestion.options?.map(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (option: any, index: number) => {
                    const isSelected = selectedAnswer === index.toString();
                    const isCorrect = index === currentQuestion.correctAnswer;
                    const showResult = showAnswer;

                    let buttonClass =
                      'w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ';

                    if (showResult) {
                      if (isCorrect) {
                        buttonClass +=
                          'border-green-500 bg-green-50 dark:bg-green-900/20';
                      } else if (isSelected && !isCorrect) {
                        buttonClass +=
                          'border-red-500 bg-red-50 dark:bg-red-900/20';
                      } else {
                        buttonClass += 'border-gray-200 dark:border-gray-600';
                      }
                    } else {
                      buttonClass += isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500';
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => !showAnswer && handleAnswerSelect(index)}
                        disabled={showAnswer}
                        className={buttonClass}
                      >
                        <div className="flex items-start space-x-3">
                          {/* Radio button indicator */}
                          <div className="flex-shrink-0 mt-1">
                            <div
                              className={`w-5 h-5 rounded-full border-2 ${
                                isSelected
                                  ? 'border-blue-500 bg-blue-500'
                                  : 'border-gray-300 dark:border-gray-600'
                              }`}
                            >
                              {isSelected && (
                                <div className="w-full h-full rounded-full bg-white scale-50"></div>
                              )}
                            </div>
                          </div>

                          {/* Option text */}
                          <div className="flex-1 min-w-0">
                            <div
                              className={`text-gray-900 dark:text-white leading-relaxed ${
                                showResult && isCorrect ? 'font-semibold' : ''
                              }`}
                            >
                              <ExpandableText
                                text={option || 'No option text'}
                                maxLength={200}
                                className="text-left"
                                expandText="Read more"
                                collapseText="Read less"
                              />
                            </div>
                          </div>
                          {showResult && isCorrect && (
                            <span className="ml-auto text-green-600 dark:text-green-400 font-semibold">
                              ✓ Correct
                            </span>
                          )}
                          {showResult && isSelected && !isCorrect && (
                            <span className="ml-auto text-red-600 dark:text-red-400 font-semibold">
                              ✗ Incorrect
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  }
                )}
              </div>

              {/* Submit Button */}
              {!showAnswer && (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedAnswer}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Submit Answer
                </button>
              )}

              {/* Answer Explanation */}
              {showAnswer && (
                <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Answer & Explanation
                  </h3>
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="text-gray-700 dark:text-gray-300">
                      <ExpandableText
                        text={currentQuestion.answer || 'No answer available'}
                        maxLength={400}
                        className="whitespace-pre-line"
                        expandText="Read more"
                        collapseText="Read less"
                      />
                    </div>
                    {currentQuestion.explanation && (
                      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                          Why this is correct:
                        </h4>
                        <div className="text-blue-800 dark:text-blue-300">
                          <ExpandableText
                            text={
                              currentQuestion.explanation ||
                              'No explanation available'
                            }
                            maxLength={400}
                            className="whitespace-pre-line"
                            expandText="Read more"
                            collapseText="Read less"
                          />
                        </div>
                      </div>
                    )}

                    {/* Flashcard hint for wrong answers */}
                    {user &&
                      selectedAnswer &&
                      parseInt(selectedAnswer) !==
                        currentQuestion.correctAnswer && (
                        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                          <div className="flex items-center space-x-2">
                            <div className="p-1 bg-green-100 dark:bg-green-800 rounded">
                              <svg
                                className="w-4 h-4 text-green-600 dark:text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                                💡 This question has been automatically
                                bookmarked to your Flashcards!
                              </p>
                              <p className="text-xs text-green-700 dark:text-green-300">
                                Review it later with spaced repetition to
                                strengthen your understanding.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile-Friendly Pagination */}
          <MobilePagination
            currentGroup={currentGroup}
            currentQuestionIndex={currentQuestionIndex}
            questionsData={questionsData}
            onPrevious={handlePreviousQuestion}
            onNext={handleNextQuestion}
            onNavigateToQuestion={navigateToQuestion}
            isNavigating={isNavigating}
            showAnswer={showAnswer}
            answeredQuestions={answeredQuestions}
            expandedGroups={expandedGroups}
            onToggleGroupExpansion={toggleGroupExpansion}
          />
        </div>

        {/* Toast Notifications */}
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    </ErrorBoundary>
  );
}
