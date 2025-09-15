'use client';

import React, { useState } from 'react';
import { BulkQuestionData } from '@/lib/unified-question-schema';
import useUnifiedQuestions from '@/hooks/useUnifiedQuestions';
import {
  Upload,
  FileText,
  Download,
  AlertCircle,
  CheckCircle,
  X,
  Plus,
  Trash2,
  Save,
} from 'lucide-react';

interface BulkQuestionUploaderProps {
  sectionId: string;
  sectionName: string;
  onQuestionsAdded?: (questions: unknown[]) => void;
  onClose?: () => void;
}

export default function BulkQuestionUploader({
  sectionId,
  sectionName,
  onQuestionsAdded,
  onClose,
}: BulkQuestionUploaderProps) {
  const { bulkImportQuestions } = useUnifiedQuestions();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [questions, setQuestions] = useState<BulkQuestionData[]>([
    {
      title: '',
      content: '',
      type: 'single',
      difficulty: 'easy',
      options: [
        { id: 'a', text: '', isCorrect: false },
        { id: 'b', text: '', isCorrect: false },
        { id: 'c', text: '', isCorrect: false },
        { id: 'd', text: '', isCorrect: false },
      ],
      correctAnswers: [],
      explanation: '',
      audioQuestion: '',
      audioAnswer: '',
    },
  ]);

  const [jsonInput, setJsonInput] = useState('');
  const [inputMode, setInputMode] = useState<'form' | 'json'>('form');
  const [jsonParsed, setJsonParsed] = useState(false);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        title: '',
        content: '',
        type: 'single',
        difficulty: 'easy',
        options: [
          { id: 'a', text: '', isCorrect: false },
          { id: 'b', text: '', isCorrect: false },
          { id: 'c', text: '', isCorrect: false },
          { id: 'd', text: '', isCorrect: false },
        ],
        correctAnswers: [],
        explanation: '',
        audioQuestion: '',
        audioAnswer: '',
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const updateQuestion = (
    index: number,
    field: keyof BulkQuestionData,
    value: string | 'single' | 'multiple' | 'easy' | 'medium' | 'hard'
  ) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const updateOption = (
    questionIndex: number,
    optionIndex: number,
    field: 'text' | 'isCorrect',
    value: string | boolean
  ) => {
    const newQuestions = [...questions];
    const question = newQuestions[questionIndex];
    const newOptions = [...question.options];
    newOptions[optionIndex] = { ...newOptions[optionIndex], [field]: value };

    // If this is single choice and we're marking an option as correct, unmark others
    if (field === 'isCorrect' && value === true && question.type === 'single') {
      newOptions.forEach((option, i) => {
        if (i !== optionIndex) option.isCorrect = false;
      });
    }

    question.options = newOptions;
    question.correctAnswers = newOptions
      .filter(opt => opt.isCorrect)
      .map(opt => opt.id);
    setQuestions(newQuestions);
  };

  const addOption = (questionIndex: number) => {
    const newQuestions = [...questions];
    const question = newQuestions[questionIndex];
    const newId = String.fromCharCode(97 + question.options.length);
    question.options = [
      ...question.options,
      { id: newId, text: '', isCorrect: false },
    ];
    setQuestions(newQuestions);
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...questions];
    const question = newQuestions[questionIndex];
    if (question.options.length > 2) {
      question.options = question.options.filter((_, i) => i !== optionIndex);
      question.correctAnswers = question.options
        .filter(opt => opt.isCorrect)
        .map(opt => opt.id);
      setQuestions(newQuestions);
    }
  };

  // Handle JSON input parsing
  const parseJsonInput = () => {
    try {
      const parsed = JSON.parse(jsonInput);

      // Handle both array format and object with questions property
      let questionsArray: BulkQuestionData[];
      if (Array.isArray(parsed)) {
        questionsArray = parsed;
      } else if (parsed.questions && Array.isArray(parsed.questions)) {
        questionsArray = parsed.questions;
      } else {
        throw new Error(
          'Invalid format. Expected an array of questions or an object with a "questions" property.'
        );
      }

      // Validate each question
      const validatedQuestions = questionsArray.map((q, index) => {
        if (!q.title || !q.content) {
          throw new Error(
            `Question ${index + 1}: title and content are required`
          );
        }

        if (!q.options || !Array.isArray(q.options)) {
          throw new Error(`Question ${index + 1}: options array is required`);
        }

        if (!q.options.some(opt => opt.isCorrect)) {
          throw new Error(
            `Question ${index + 1}: at least one option must be marked as correct`
          );
        }

        return {
          title: q.title,
          content: q.content,
          type: q.type || 'single',
          difficulty: q.difficulty || 'easy',
          options: q.options.map((opt, optIndex) => ({
            id: opt.id || String.fromCharCode(97 + optIndex), // a, b, c, d...
            text: opt.text || '',
            isCorrect: opt.isCorrect || false,
          })),
          correctAnswers:
            q.correctAnswers ||
            q.options.filter(opt => opt.isCorrect).map(opt => opt.id),
          explanation: q.explanation || '',
          category: q.category || sectionName,
          learningPath: q.learningPath || sectionId,
          tags: q.tags || [],
          points: q.points || 1,
        };
      });

      setQuestions(validatedQuestions);
      setError(null);
      setSuccess(
        `Successfully parsed ${validatedQuestions.length} questions from JSON!`
      );
      setJsonParsed(true);
    } catch (error) {
      setError(
        `JSON parsing error: ${error instanceof Error ? error.message : 'Invalid JSON format'}`
      );
      setSuccess(null);
      setJsonParsed(false);
    }
  };

  // Generate JSON from current questions
  const generateJsonFromQuestions = () => {
    const jsonData = questions.map(q => ({
      title: q.title,
      content: q.content,
      type: q.type,
      difficulty: q.difficulty,
      options: q.options,
      correctAnswers: q.correctAnswers,
      explanation: q.explanation,
      category: q.category || sectionName,
      learningPath: q.learningPath || sectionId,
      tags: q.tags || [],
      points: q.points || 1,
    }));

    setJsonInput(JSON.stringify(jsonData, null, 2));
  };

  const submitQuestions = async () => {
    console.log('🚀 Starting bulk question submission to Firebase...');
    console.log('Section ID:', sectionId);
    console.log('Questions to submit:', questions);

    // Basic validation
    const validQuestions = questions.filter(
      q =>
        q.title.trim() &&
        q.content.trim() &&
        q.options.some(opt => opt.text.trim()) &&
        q.options.some(opt => opt.isCorrect)
    );

    console.log('Valid questions after filtering:', validQuestions);

    if (validQuestions.length === 0) {
      setError('At least one complete question is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Transform questions to include required Firebase fields
      const firebaseQuestions = validQuestions.map(q => ({
        ...q,
        learningPath: sectionId, // Use sectionId as learningPath
        category: sectionName, // Use sectionName as category
        subcategory: sectionName, // Use sectionName as subcategory
        sectionId: sectionId,
        tags: q.tags || [],
        points: q.points || 1,
        timeLimit: q.timeLimit || 60,
      }));

      console.log('📤 Calling bulkImportQuestions with Firebase...');
      const result = await bulkImportQuestions(firebaseQuestions);

      console.log('📥 Firebase Import Result:', result);

      if (result.success > 0) {
        setSuccess(
          `${result.success} questions added successfully! ${result.failed > 0 ? `${result.failed} failed.` : ''}`
        );
        setQuestions([
          {
            title: '',
            content: '',
            type: 'single',
            difficulty: 'easy',
            options: [
              { id: 'a', text: '', isCorrect: false },
              { id: 'b', text: '', isCorrect: false },
              { id: 'c', text: '', isCorrect: false },
              { id: 'd', text: '', isCorrect: false },
            ],
            correctAnswers: [],
            explanation: '',
          },
        ]);

        if (onQuestionsAdded) {
          onQuestionsAdded(firebaseQuestions);
        }
      } else {
        console.error('❌ No questions were imported:', result.errors);
        setError(`Failed to import questions: ${result.errors.join(', ')}`);
      }
    } catch (error) {
      console.error('❌ Exception during submission:', error);
      setError('Failed to add questions');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitQuestions();
  };

  const downloadTemplate = () => {
    const template = {
      questions: [
        {
          title: 'Sample Question Title',
          content: 'What is the correct answer?',
          type: 'single',
          difficulty: 'easy',
          options: [
            { id: 'a', text: 'Option A', isCorrect: true },
            { id: 'b', text: 'Option B', isCorrect: false },
            { id: 'c', text: 'Option C', isCorrect: false },
            { id: 'd', text: 'Option D', isCorrect: false },
          ],
          correctAnswers: ['a'],
          explanation: 'This is the correct answer because...',
          audioQuestion: 'https://example.com/question-audio.mp3',
          audioAnswer: 'https://example.com/answer-audio.mp3',
        },
      ],
    };

    const blob = new Blob([JSON.stringify(template, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk-questions-template.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Bulk Add Questions to {sectionName}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Add multiple questions at once. Incomplete questions will be saved
            for later editing.
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        )}
      </div>

      {/* Input Mode Toggle */}
      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Input Mode:
          </span>
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => {
                setInputMode('form');
                setJsonParsed(false);
              }}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                inputMode === 'form'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Form Input
            </button>
            <button
              onClick={() => {
                setInputMode('json');
                setJsonParsed(false);
              }}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                inputMode === 'json'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              JSON Array
            </button>
          </div>
        </div>

        {/* JSON Input Mode */}
        {inputMode === 'json' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Paste JSON Array of Questions:
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={generateJsonFromQuestions}
                  className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  Generate from Form
                </button>
                <button
                  onClick={downloadTemplate}
                  className="px-3 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-md hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                >
                  Download Template
                </button>
              </div>
            </div>
            <textarea
              value={jsonInput}
              onChange={e => setJsonInput(e.target.value)}
              placeholder={`Paste your questions array here, for example:
[
  {
    "title": "What is React?",
    "content": "React is a JavaScript library for building user interfaces.",
    "type": "single",
    "difficulty": "easy",
    "options": [
      { "id": "a", "text": "A JavaScript library", "isCorrect": true },
      { "id": "b", "text": "A CSS framework", "isCorrect": false },
      { "id": "c", "text": "A database", "isCorrect": false },
      { "id": "d", "text": "A server", "isCorrect": false }
    ],
    "correctAnswers": ["a"],
    "explanation": "React is indeed a JavaScript library for building user interfaces.",
    "audioQuestion": "https://example.com/question-audio.mp3",
    "audioAnswer": "https://example.com/answer-audio.mp3"
  }
]`}
              className="w-full h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white font-mono text-sm"
            />
            <div className="flex space-x-2">
              <button
                onClick={parseJsonInput}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Parse JSON</span>
              </button>
              <button
                onClick={() => {
                  setJsonInput('');
                  setJsonParsed(false);
                }}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Clear
              </button>
              {jsonParsed && questions.length > 0 && questions[0].title && (
                <button
                  onClick={submitQuestions}
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>
                    {loading
                      ? 'Adding...'
                      : `Bulk Add ${questions.length} Questions`}
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
            <p className="text-green-600 dark:text-green-400 text-sm">
              {success}
            </p>
          </div>
        </div>
      )}

      {/* Template Download */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-blue-900 dark:text-blue-100">
              Need a template?
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Download our JSON template to see the expected format
            </p>
          </div>
          <button
            onClick={downloadTemplate}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Template</span>
          </button>
        </div>
      </div>

      {/* Form Input Mode */}
      {inputMode === 'form' && (
        <form onSubmit={handleSubmit} className="space-y-8">
          {questions.map((question, questionIndex) => (
            <div
              key={questionIndex}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Question {questionIndex + 1}
                </h3>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(questionIndex)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {/* Question Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Question Title
                  </label>
                  <input
                    type="text"
                    value={question.title}
                    onChange={e =>
                      updateQuestion(questionIndex, 'title', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter question title"
                  />
                </div>

                {/* Question Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Question Content
                  </label>
                  <textarea
                    value={question.content}
                    onChange={e =>
                      updateQuestion(questionIndex, 'content', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter the question content..."
                    rows={3}
                  />
                </div>

                {/* Question Type and Difficulty */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Question Type
                    </label>
                    <select
                      value={question.type}
                      onChange={e =>
                        updateQuestion(questionIndex, 'type', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="single">Single Choice</option>
                      <option value="multiple">Multiple Choice</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Difficulty Level
                    </label>
                    <select
                      value={question.difficulty}
                      onChange={e =>
                        updateQuestion(
                          questionIndex,
                          'difficulty',
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>

                {/* Options */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Answer Options
                    </label>
                    <button
                      type="button"
                      onClick={() => addOption(questionIndex)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors flex items-center space-x-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Option</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={option.id}
                        className="flex items-center space-x-3"
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={option.isCorrect}
                            onChange={e =>
                              updateOption(
                                questionIndex,
                                optionIndex,
                                'isCorrect',
                                e.target.checked
                              )
                            }
                            className="mr-2"
                          />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-6">
                            {option.id.toUpperCase()}.
                          </span>
                        </div>
                        <input
                          type="text"
                          value={option.text}
                          onChange={e =>
                            updateOption(
                              questionIndex,
                              optionIndex,
                              'text',
                              e.target.value
                            )
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder={`Option ${option.id.toUpperCase()}`}
                        />
                        {question.options.length > 2 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeOption(questionIndex, optionIndex)
                            }
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Explanation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Explanation
                  </label>
                  <textarea
                    value={question.explanation}
                    onChange={e =>
                      updateQuestion(
                        questionIndex,
                        'explanation',
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Explain why the correct answer is correct..."
                    rows={2}
                  />
                </div>

                {/* Audio Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Question Audio URL
                    </label>
                    <input
                      type="url"
                      value={question.audioQuestion || ''}
                      onChange={e =>
                        updateQuestion(
                          questionIndex,
                          'audioQuestion',
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="https://example.com/question-audio.mp3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Answer Audio URL
                    </label>
                    <input
                      type="url"
                      value={question.audioAnswer || ''}
                      onChange={e =>
                        updateQuestion(
                          questionIndex,
                          'audioAnswer',
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="https://example.com/answer-audio.mp3"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add Question Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={addQuestion}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Another Question</span>
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>
                {loading ? 'Adding...' : `Add ${questions.length} Questions`}
              </span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
