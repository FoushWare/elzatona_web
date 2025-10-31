'use client';

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
} from 'lucide-react';

type PracticeMode = 'list' | 'flip' | 'quiz';

export default function FlashcardsPage() {
  const [items, setItems] = useState<FlashcardItem[]>([]);
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('list');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledItems, setShuffledItems] = useState<FlashcardItem[]>([]);
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
              className='p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700'
              title='Shuffle'
            >
              <Shuffle className='w-4 h-4' />
            </button>
          </div>

          {/* Flashcard */}
          <div className='mb-8'>
            <div
              className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border-2 border-white/20 dark:border-gray-700/20 min-h-[400px] flex items-center justify-center cursor-pointer transition-all hover:scale-[1.02]'
              onClick={handleFlip}
            >
              <div className='text-center w-full'>
                {!isFlipped ? (
                  <div>
                    <div className='text-sm text-gray-500 dark:text-gray-400 mb-4'>
                      {currentCard?.section || 'General'}{' '}
                      {currentCard?.difficulty
                        ? `• ${currentCard.difficulty}`
                        : ''}
                    </div>
                    <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                      Question
                    </h2>
                    <p className='text-xl text-gray-700 dark:text-gray-300'>
                      {currentCard?.question}
                    </p>
                    <div className='mt-6 text-sm text-gray-500 dark:text-gray-400'>
                      Click to reveal answer
                    </div>
                    <FlipHorizontal className='w-6 h-6 mx-auto mt-2 text-gray-400' />
                  </div>
                ) : (
                  <div className='w-full'>
                    <div className='text-sm text-gray-500 dark:text-gray-400 mb-4'>
                      Answer
                    </div>
                    {currentQuestion ? (
                      <>
                        {currentQuestion.correct_answer && (
                          <p className='text-xl text-gray-700 dark:text-gray-300 mb-6'>
                            {currentQuestion.correct_answer}
                          </p>
                        )}
                        {currentQuestion.explanation && (
                          <div className='mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-left'>
                            <p className='text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2'>
                              Explanation:
                            </p>
                            <p className='text-blue-800 dark:text-blue-200'>
                              {currentQuestion.explanation}
                            </p>
                          </div>
                        )}
                        {!currentQuestion.correct_answer &&
                          !currentQuestion.explanation && (
                            <p className='text-lg text-gray-500 dark:text-gray-400'>
                              Full answer details not available for this
                              question.
                            </p>
                          )}
                      </>
                    ) : (
                      <p className='text-lg text-gray-500 dark:text-gray-400'>
                        Loading answer details...
                      </p>
                    )}
                    <div className='mt-6 text-sm text-gray-500 dark:text-gray-400'>
                      Click to see question again
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

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
              className='p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700'
              title='Shuffle'
            >
              <Shuffle className='w-4 h-4' />
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
