'use client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
import React, { useEffect, useState } from 'react';
import {
  loadFlashcards,
  removeFlashcard,
  FlashcardItem,
} from '@/lib/flashcards';
import {
  BookOpen,
  Trash2,
  Play,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  FlipHorizontal,
  CheckCircle,
  XCircle,
  Shuffle,
  Filter,
  Target,
  X,
  Eye,
  EyeOff,
  Loader2,
} from 'lucide-react';

type PracticeMode = 'list' | 'flip' | 'quiz';

export default function FlashcardsPage() {
  const [items, setItems] = useState<FlashcardItem[]>([]);
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('list');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledItems, setShuffledItems] = useState<FlashcardItem[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [filterSection, setFilterSection] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  useEffect(() => {
    const loaded = loadFlashcards();
    setItems(loaded);
    if (practiceMode === 'flip' || practiceMode === 'quiz') {
      let filtered = loaded;
      if (filterSection !== 'all') {
        filtered = filtered.filter(item => item.section === filterSection);
      }
      if (filterDifficulty !== 'all') {
        filtered = filtered.filter(
          item => item.difficulty === filterDifficulty
        );
      }
      setShuffledItems(filtered);
      setCurrentIndex(0);
      setIsFlipped(false);
      if (practiceMode === 'quiz' && filtered.length > 0) {
        fetchQuestionDetails(filtered[0].id);
      }
    }
  }, [practiceMode, filterSection, filterDifficulty]);

  const fetchQuestionDetails = async (questionId: string) => {
    try {
      // Try to fetch question details from API
      const response = await fetch(`/api/questions/${questionId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setCurrentQuestion(data.data);
        }
      } else {
        // If question not found in API, set to null
        setCurrentQuestion(null);
      }
    } catch (error) {
      console.error('Error fetching question details:', error);
      setCurrentQuestion(null);
    }
  };

  const handleFlip = () => {
    const newFlippedState = !isFlipped;
    setIsFlipped(newFlippedState);

    // Fetch question details when flipping to show answer (if not already loaded)
    if (newFlippedState && currentCard && !currentQuestion) {
      fetchQuestionDetails(currentCard.id);
    }
  };

  const startPractice = (mode: PracticeMode) => {
    let filtered = items;
    if (filterSection !== 'all') {
      filtered = filtered.filter(item => item.section === filterSection);
    }
    if (filterDifficulty !== 'all') {
      filtered = filtered.filter(item => item.difficulty === filterDifficulty);
    }

    if (filtered.length === 0) {
      alert('No flashcards match your filters. Please adjust your filters.');
      return;
    }

    // Shuffle for practice
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setShuffledItems(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setPracticeMode(mode);
    setCorrectAnswers(0);
    setSelectedAnswer(null);
    setShowExplanation(false);

    if (mode === 'quiz' && shuffled.length > 0) {
      fetchQuestionDetails(shuffled[0].id);
    }
  };

  const handleRemove = (id: string) => {
    removeFlashcard(id);
    setItems(loadFlashcards());
    if (practiceMode !== 'list') {
      const updated = shuffledItems.filter(item => item.id !== id);
      setShuffledItems(updated);
      if (currentIndex >= updated.length && updated.length > 0) {
        setCurrentIndex(updated.length - 1);
      }
      if (updated.length === 0) {
        setPracticeMode('list');
      }
    }
  };

  const nextCard = () => {
    if (currentIndex < shuffledItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setCurrentQuestion(null); // Reset question details
      if (practiceMode === 'quiz') {
        fetchQuestionDetails(shuffledItems[currentIndex + 1].id);
      }
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setCurrentQuestion(null); // Reset question details
      if (practiceMode === 'quiz') {
        fetchQuestionDetails(shuffledItems[currentIndex - 1].id);
      }
    }
  };

  const handleQuizAnswer = (answer: string) => {
    if (selectedAnswer || !currentQuestion) return;
    setSelectedAnswer(answer);
    setShowExplanation(true);
    const isCorrect = answer === currentQuestion.correct_answer;
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const getUniqueSections = () => {
    const sections = items
      .map(item => item.section)
      .filter(Boolean) as string[];
    return Array.from(new Set(sections));
  };

  const getUniqueDifficulties = () => {
    const difficulties = items
      .map(item => item.difficulty)
      .filter(Boolean) as string[];
    return Array.from(new Set(difficulties));
  };

  const currentCard = shuffledItems[currentIndex];

  if (practiceMode === 'flip') {
    return (
      <div className='min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-10'>
        <div className='container mx-auto px-4 max-w-4xl'>
          {/* Header */}
          <div className='flex items-center justify-between mb-6'>
            <button
              onClick={() => setPracticeMode('list')}
              className='inline-flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            >
              <ArrowLeft className='w-4 h-4' />
              <span>Back to List</span>
            </button>
            <div className='text-center'>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                Card {currentIndex + 1} of {shuffledItems.length}
              </div>
            </div>
            <button
              onClick={() => {
                const shuffled = [...shuffledItems].sort(
                  () => Math.random() - 0.5
                );
                setShuffledItems(shuffled);
                setCurrentIndex(0);
                setIsFlipped(false);
                setCurrentQuestion(null);
              }}
              className='inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95'
              title='Shuffle Cards'
            >
              <Shuffle className='w-4 h-4' />
              <span className='hidden sm:inline'>Shuffle</span>
            </button>
          </div>

          {/* Flashcard Preview */}
          <div className='mb-8'>
            <div
              className='bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 backdrop-blur-xl rounded-2xl p-8 shadow-xl border-2 border-gray-200 dark:border-gray-700 min-h-[400px] flex items-center justify-center cursor-pointer transition-all hover:scale-[1.02] hover:shadow-2xl group'
              onClick={handleFlip}
            >
              <div className='text-center w-full'>
                <div className='mb-6'>
                  <div className='inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full'>
                    <BookOpen className='w-4 h-4 text-blue-600 dark:text-blue-400' />
                    <span className='text-sm font-medium text-blue-900 dark:text-blue-100'>
                      {currentCard?.section || 'General'}{' '}
                      {currentCard?.difficulty
                        ? `• ${currentCard.difficulty}`
                        : ''}
                    </span>
                  </div>
                </div>
                <div className='w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform'>
                  <FlipHorizontal className='w-10 h-10 text-white' />
                </div>
                <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
                  Question
                </h2>
                <p className='text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed'>
                  {currentCard?.question}
                </p>
                <div className='inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-rose-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all'>
                  <Eye className='w-5 h-5' />
                  <span>Click to Reveal Answer</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Popup for Answer */}
          {isFlipped && (
            <div
              className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300'
              onClick={() => setIsFlipped(false)}
            >
              <div
                className='bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2 border-gray-200 dark:border-gray-700 transform transition-all duration-300 scale-100'
                onClick={e => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className='sticky top-0 z-10 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-6 py-4 rounded-t-3xl flex items-center justify-between'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center'>
                      <CheckCircle className='w-6 h-6 text-white' />
                    </div>
                    <div>
                      <h3 className='text-lg font-bold text-white'>Answer</h3>
                      <p className='text-xs text-white/80'>
                        {currentCard?.section || 'General'}{' '}
                        {currentCard?.difficulty
                          ? `• ${currentCard.difficulty}`
                          : ''}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsFlipped(false)}
                    className='p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors'
                    aria-label='Close'
                  >
                    <X className='w-5 h-5 text-white' />
                  </button>
                </div>

                {/* Modal Content */}
                <div className='p-8'>
                  {/* Question Display */}
                  <div className='mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500'>
                    <div className='text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-2'>
                      Question
                    </div>
                    <p className='text-gray-800 dark:text-gray-200 font-medium'>
                      {currentCard?.question}
                    </p>
                  </div>

                  {/* Answer Display */}
                  <div className='mb-6'>
                    {currentQuestion ? (
                      <>
                        {currentQuestion.correct_answer && (
                          <div className='p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border-2 border-green-200 dark:border-green-800 mb-4'>
                            <div className='flex items-center space-x-3 mb-3'>
                              <div className='w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center'>
                                <CheckCircle className='w-6 h-6 text-white' />
                              </div>
                              <h4 className='text-lg font-bold text-green-900 dark:text-green-100'>
                                Correct Answer
                              </h4>
                            </div>
                            <p className='text-xl text-green-800 dark:text-green-200 font-semibold'>
                              {currentQuestion.correct_answer}
                            </p>
                          </div>
                        )}
                        {currentQuestion.explanation && (
                          <div className='p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800'>
                            <div className='flex items-center space-x-3 mb-4'>
                              <div className='w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center'>
                                <BookOpen className='w-6 h-6 text-white' />
                              </div>
                              <h4 className='text-lg font-bold text-blue-900 dark:text-blue-100'>
                                Explanation
                              </h4>
                            </div>
                            <p className='text-blue-800 dark:text-blue-200 leading-relaxed'>
                              {currentQuestion.explanation}
                            </p>
                          </div>
                        )}
                        {!currentQuestion.correct_answer &&
                          !currentQuestion.explanation && (
                            <div className='p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl border-2 border-yellow-200 dark:border-yellow-800 text-center'>
                              <p className='text-yellow-800 dark:text-yellow-200'>
                                Full answer details not available for this
                                question.
                              </p>
                            </div>
                          )}
                      </>
                    ) : (
                      <div className='p-6 bg-gray-50 dark:bg-gray-700/50 rounded-2xl text-center'>
                        <Loader2 className='w-8 h-8 animate-spin text-blue-500 mx-auto mb-3' />
                        <p className='text-gray-600 dark:text-gray-400'>
                          Loading answer details...
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className='flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700'>
                    <button
                      onClick={() => setIsFlipped(false)}
                      className='flex-1 inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl'
                    >
                      <EyeOff className='w-4 h-4' />
                      <span>Hide Answer</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsFlipped(false);
                        nextCard();
                      }}
                      disabled={currentIndex === shuffledItems.length - 1}
                      className='flex-1 inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl'
                    >
                      <ArrowRight className='w-4 h-4' />
                      <span>Next Card</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className='flex justify-between items-center'>
            <button
              onClick={prevCard}
              disabled={currentIndex === 0}
              className='inline-flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors'
            >
              <ArrowLeft className='w-4 h-4' />
              <span>Previous</span>
            </button>
            <div className='flex gap-2'>
              {currentCard && (
                <button
                  onClick={() => handleRemove(currentCard.id)}
                  className='p-2 rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                  title='Remove from Flashcards'
                >
                  <Trash2 className='w-4 h-4' />
                </button>
              )}
            </div>
            <button
              onClick={nextCard}
              disabled={currentIndex === shuffledItems.length - 1}
              className='inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors'
            >
              <span>Next</span>
              <ArrowRight className='w-4 h-4' />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (practiceMode === 'quiz') {
    const isCorrect = selectedAnswer === currentQuestion?.correct_answer;

    return (
      <div className='min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-10'>
        <div className='container mx-auto px-4 max-w-4xl'>
          {/* Header */}
          <div className='flex items-center justify-between mb-6'>
            <button
              onClick={() => setPracticeMode('list')}
              className='inline-flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            >
              <ArrowLeft className='w-4 h-4' />
              <span>Back to List</span>
            </button>
            <div className='text-center'>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                Question {currentIndex + 1} of {shuffledItems.length}
              </div>
              <div className='text-sm font-semibold text-green-600 dark:text-green-400'>
                Score: {correctAnswers}/
                {currentIndex + (selectedAnswer ? 1 : 0)}
              </div>
            </div>
            <button
              onClick={() => {
                const shuffled = [...shuffledItems].sort(
                  () => Math.random() - 0.5
                );
                setShuffledItems(shuffled);
                setCurrentIndex(0);
                setSelectedAnswer(null);
                setShowExplanation(false);
                setCorrectAnswers(0);
                fetchQuestionDetails(shuffled[0].id);
              }}
              className='inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95'
              title='Shuffle Cards'
            >
              <Shuffle className='w-4 h-4' />
              <span className='hidden sm:inline'>Shuffle</span>
            </button>
          </div>

          {/* Question Card */}
          {currentCard && (
            <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border-2 border-white/20 dark:border-gray-700/20 mb-8'>
              <div className='mb-6'>
                <div className='text-sm text-gray-500 dark:text-gray-400 mb-2'>
                  {currentCard.section || 'General'}{' '}
                  {currentCard.difficulty ? `• ${currentCard.difficulty}` : ''}
                </div>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                  {currentQuestion?.title || currentCard.question}
                </h2>
                <p className='text-lg text-gray-700 dark:text-gray-300'>
                  {currentQuestion?.content || currentCard.question}
                </p>
              </div>

              {/* Options */}
              {currentQuestion?.options &&
              currentQuestion.options.length > 0 ? (
                <div className='space-y-3 mb-6'>
                  {currentQuestion.options.map((option: any, index: number) => {
                    const optionText =
                      typeof option === 'string' ? option : option.text;
                    const isSelected = selectedAnswer === optionText;
                    const isCorrectOption =
                      optionText === currentQuestion.correct_answer;

                    let buttonClass =
                      'w-full text-left p-4 rounded-lg border-2 transition-colors ';
                    if (selectedAnswer) {
                      if (isCorrectOption) {
                        buttonClass +=
                          'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-900 dark:text-green-100';
                      } else if (isSelected && !isCorrectOption) {
                        buttonClass +=
                          'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-900 dark:text-red-100';
                      } else {
                        buttonClass +=
                          'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400';
                      }
                    } else {
                      buttonClass +=
                        'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white';
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(optionText)}
                        disabled={!!selectedAnswer}
                        className={buttonClass}
                      >
                        <div className='flex items-center space-x-3'>
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                              selectedAnswer && isCorrectOption
                                ? 'bg-green-500 text-white'
                                : selectedAnswer &&
                                    isSelected &&
                                    !isCorrectOption
                                  ? 'bg-red-500 text-white'
                                  : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                            }`}
                          >
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className='flex-1'>{optionText}</span>
                          {selectedAnswer && isCorrectOption && (
                            <CheckCircle className='w-5 h-5 text-green-500' />
                          )}
                          {selectedAnswer && isSelected && !isCorrectOption && (
                            <XCircle className='w-5 h-5 text-red-500' />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className='p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg mb-6'>
                  <p className='text-yellow-800 dark:text-yellow-200'>
                    This question doesn't have answer options. Use Flip Card
                    mode to review it.
                  </p>
                </div>
              )}

              {/* Explanation */}
              {showExplanation && currentQuestion?.explanation && (
                <div className='mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg'>
                  <p className='text-blue-800 dark:text-blue-200'>
                    <strong>Explanation:</strong> {currentQuestion.explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className='flex justify-between items-center'>
            <button
              onClick={prevCard}
              disabled={currentIndex === 0}
              className='inline-flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors'
            >
              <ArrowLeft className='w-4 h-4' />
              <span>Previous</span>
            </button>
            <div className='flex gap-2'>
              {currentCard && (
                <button
                  onClick={() => handleRemove(currentCard.id)}
                  className='p-2 rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                  title='Remove from Flashcards'
                >
                  <Trash2 className='w-4 h-4' />
                </button>
              )}
            </div>
            <button
              onClick={nextCard}
              disabled={
                !selectedAnswer || currentIndex === shuffledItems.length - 1
              }
              className='inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors'
            >
              <span>Next</span>
              <ArrowRight className='w-4 h-4' />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // List View
  const uniqueSections = getUniqueSections();
  const uniqueDifficulties = getUniqueDifficulties();
  const filteredItems =
    filterSection === 'all' && filterDifficulty === 'all'
      ? items
      : items.filter(item => {
          const sectionMatch =
            filterSection === 'all' || item.section === filterSection;
          const difficultyMatch =
            filterDifficulty === 'all' || item.difficulty === filterDifficulty;
          return sectionMatch && difficultyMatch;
        });

  return (
    <div className='min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-10'>
      <div className='container mx-auto px-4 max-w-4xl'>
        <div className='text-center mb-8'>
          <div className='w-20 h-20 bg-gradient-to-r from-amber-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6'>
            <BookOpen className='w-10 h-10 text-white' />
          </div>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Flashcards
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mt-2'>
            Review questions you saved from practice.
          </p>
        </div>

        {items.length === 0 ? (
          <div className='text-center text-gray-600 dark:text-gray-400'>
            No flashcards yet. Add some from your practice sessions.
          </div>
        ) : (
          <>
            {/* Practice Mode Buttons */}
            <div className='mb-6 flex flex-col sm:flex-row gap-4 justify-center'>
              <button
                onClick={() => startPractice('flip')}
                className='inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl'
              >
                <FlipHorizontal className='w-5 h-5' />
                <span>Practice with Flip Cards</span>
              </button>
              <button
                onClick={() => startPractice('quiz')}
                className='inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl'
              >
                <Target className='w-5 h-5' />
                <span>Quiz Mode</span>
              </button>
            </div>

            {/* Filters */}
            {(uniqueSections.length > 0 || uniqueDifficulties.length > 0) && (
              <div className='mb-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-4 border border-white/30 dark:border-gray-700/30'>
                <div className='flex items-center space-x-2 mb-4'>
                  <Filter className='w-5 h-5 text-gray-600 dark:text-gray-400' />
                  <span className='font-semibold text-gray-900 dark:text-white'>
                    Filters
                  </span>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {uniqueSections.length > 0 && (
                    <div>
                      <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                        Section
                      </label>
                      <select
                        value={filterSection}
                        onChange={e => setFilterSection(e.target.value)}
                        className='px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                      >
                        <option value='all'>All Sections</option>
                        {uniqueSections.map(section => (
                          <option key={section} value={section}>
                            {section}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {uniqueDifficulties.length > 0 && (
                    <div>
                      <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                        Difficulty
                      </label>
                      <select
                        value={filterDifficulty}
                        onChange={e => setFilterDifficulty(e.target.value)}
                        className='px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                      >
                        <option value='all'>All Difficulties</option>
                        {uniqueDifficulties.map(difficulty => (
                          <option key={difficulty} value={difficulty}>
                            {difficulty}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className='mb-6 text-center'>
              <div className='inline-flex items-center space-x-6 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl border border-white/30 dark:border-gray-700/30'>
                <div>
                  <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                    {filteredItems.length}
                  </div>
                  <div className='text-sm text-gray-600 dark:text-gray-400'>
                    {filterSection === 'all' && filterDifficulty === 'all'
                      ? 'Total Cards'
                      : 'Filtered Cards'}
                  </div>
                </div>
                <div className='h-12 w-px bg-gray-300 dark:bg-gray-600'></div>
                <div>
                  <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                    {items.length}
                  </div>
                  <div className='text-sm text-gray-600 dark:text-gray-400'>
                    Total Saved
                  </div>
                </div>
              </div>
            </div>

            {/* List */}
            <div className='grid grid-cols-1 gap-4'>
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-5 border border-white/30 dark:border-gray-700/30 shadow'
                >
                  <div className='flex justify-between items-start gap-4'>
                    <div>
                      <div className='text-sm text-gray-500 dark:text-gray-400 mb-1'>
                        {item.section || 'General'}{' '}
                        {item.difficulty ? `• ${item.difficulty}` : ''}
                      </div>
                      <div className='font-medium text-gray-900 dark:text-white'>
                        {item.question}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className='p-2 rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                      title='Remove from Flashcards'
                    >
                      <Trash2 className='w-4 h-4' />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
