'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useUnifiedQuestions } from '@/hooks/useUnifiedQuestions';
import { BulkQuestionData } from '@/lib/unified-question-schema';

interface ExtractedQuestion {
  content: string;
  type: 'single' | 'multiple';
  options: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
  explanation: string;
  learningPath: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  audioQuestion?: string;
  audioAnswer?: string;
}

interface MarkdownQuestionExtractorProps {
  learningPaths: Array<{ id: string; name: string }>;
  onClose: () => void;
}

export function MarkdownQuestionExtractor({ learningPaths, onClose }: MarkdownQuestionExtractorProps) {
  const [markdownContent, setMarkdownContent] = useState('');
  const [selectedLearningPath, setSelectedLearningPath] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [extractedQuestions, setExtractedQuestions] = useState<ExtractedQuestion[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Debug: Log learning paths
  console.log('MarkdownQuestionExtractor - Learning Paths:', learningPaths);

  const { bulkImportQuestions } = useUnifiedQuestions();

  const categories = [
    'JavaScript', 'CSS', 'React', 'TypeScript', 'Testing', 
    'Performance', 'Security', 'HTML', 'Node.js', 'General'
  ];

  const difficulties = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ] as const;

  // Parse markdown content to extract questions
  const parseMarkdownQuestions = (content: string): ExtractedQuestion[] => {
    const questions: ExtractedQuestion[] = [];
    
    // Split content by question markers
    const questionBlocks = content.split(/(?=##?\s*Question\s*\d*)/i);
    
    questionBlocks.forEach((block, index) => {
      if (index === 0) return; // Skip the first block (usually content before first question)
      
      const lines = block.split('\n').map(line => line.trim()).filter(line => line);
      
      if (lines.length === 0) return;
      
      // Extract question content
      const questionMatch = lines[0].match(/##?\s*Question\s*\d*:?\s*(.+)/i);
      if (!questionMatch) return;
      
      const questionContent = questionMatch[1];
      
      // Find options (lines starting with -, *, or A), B), C), D))
      const optionLines = lines.filter(line => 
        /^[-*]\s/.test(line) || 
        /^[A-D]\)\s/.test(line) ||
        /^\d+\.\s/.test(line)
      );
      
      // Find explanation (usually after options, before next question)
      const explanationStart = lines.findIndex(line => 
        /explanation|answer|solution/i.test(line)
      );
      
      let explanation = '';
      if (explanationStart !== -1) {
        explanation = lines.slice(explanationStart + 1).join(' ').trim();
      }
      
      // Parse options
      const options = optionLines.map((line, optIndex) => {
        const cleanLine = line.replace(/^[-*]\s*/, '').replace(/^[A-D]\)\s*/, '').replace(/^\d+\.\s*/, '');
        const isCorrect = /✓|correct|true|yes/i.test(cleanLine) || 
                         /\[x\]|\[X\]/.test(line) ||
                         cleanLine.includes('(correct)') ||
                         cleanLine.includes('(answer)');
        
        const cleanText = cleanLine.replace(/✓|correct|true|yes|\(correct\)|\(answer\)/gi, '').trim();
        
        return {
          id: `opt${optIndex + 1}`,
          text: cleanText,
          isCorrect: isCorrect
        };
      });
      
      // Determine question type
      const correctOptions = options.filter(opt => opt.isCorrect);
      const questionType = correctOptions.length > 1 ? 'multiple' : 'single';
      
      if (options.length >= 2 && questionContent) {
        questions.push({
          content: questionContent,
          type: questionType,
          options,
          explanation: explanation || 'No explanation provided.',
          learningPath: selectedLearningPath,
          category: selectedCategory,
          difficulty: selectedDifficulty,
          audioQuestion: `/audio/${selectedLearningPath}/questions/question-${questions.length + 1}.mp3`,
          audioAnswer: `/audio/${selectedLearningPath}/questions/answer-${questions.length + 1}.mp3`
        });
      }
    });
    
    return questions;
  };

  const handleExtractQuestions = () => {
    console.log('Extract Questions Debug:', {
      markdownContent: markdownContent.trim(),
      selectedLearningPath,
      selectedCategory,
      learningPathsCount: learningPaths.length
    });
    
    if (!markdownContent.trim()) {
      setError('Please enter markdown content');
      return;
    }
    
    if (!selectedLearningPath || selectedLearningPath === '') {
      setError('Please select a learning path');
      return;
    }
    
    if (!selectedCategory) {
      setError('Please select a category');
      return;
    }
    
    setIsExtracting(true);
    setError(null);
    
    try {
      const questions = parseMarkdownQuestions(markdownContent);
      
      if (questions.length === 0) {
        setError('No valid questions found in the markdown content. Please check the format.');
      } else {
        setExtractedQuestions(questions);
        setSuccess(`Successfully extracted ${questions.length} questions!`);
      }
    } catch (err) {
      setError('Error parsing markdown content. Please check the format.');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleImportQuestions = async () => {
    if (extractedQuestions.length === 0) return;
    
    setIsExtracting(true);
    setError(null);
    
    try {
      const bulkData: BulkQuestionData[] = extractedQuestions.map(q => ({
        content: q.content,
        type: q.type,
        options: q.options,
        explanation: q.explanation,
        learningPath: q.learningPath,
        category: q.category,
        difficulty: q.difficulty,
        audioQuestion: q.audioQuestion,
        audioAnswer: q.audioAnswer
      }));
      
      await bulkImportQuestions(bulkData);
      setSuccess(`Successfully imported ${extractedQuestions.length} questions!`);
      setExtractedQuestions([]);
      setMarkdownContent('');
    } catch (err) {
      setError('Error importing questions. Please try again.');
    } finally {
      setIsExtracting(false);
    }
  };

  const sampleMarkdown = `## Question 1: What is the correct way to declare a variable in JavaScript?

- var myVar = 10; ✓
- variable myVar = 10;
- v myVar = 10;
- declare myVar = 10;

**Explanation:** In JavaScript, variables are declared using 'var', 'let', or 'const' keywords. The correct syntax is 'var variableName = value;'

## Question 2: Which CSS property is used to change the text color?

- text-color
- color ✓
- font-color
- text-style

**Explanation:** The 'color' property in CSS is used to set the color of text content.`;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Extract Questions from Markdown
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Learning Path
              </label>
              <select
                value={selectedLearningPath}
                onChange={(e) => setSelectedLearningPath(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              >
                <option value="">Select Learning Path</option>
                {learningPaths.length === 0 ? (
                  <option value="" disabled>Loading learning paths...</option>
                ) : (
                  learningPaths.map(path => (
                    <option key={path.id} value={path.id}>
                      {path.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {difficulties.map(diff => (
                  <option key={diff.value} value={diff.value}>
                    {diff.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Markdown Input */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Markdown Content
              </label>
              <button
                onClick={() => setMarkdownContent(sampleMarkdown)}
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Load Sample
              </button>
            </div>
            <textarea
              value={markdownContent}
              onChange={(e) => setMarkdownContent(e.target.value)}
              placeholder="Paste your markdown content here..."
              className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none"
            />
          </div>

          {/* Debug Info */}
          <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Debug Info:</h4>
            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <div>Learning Paths Count: {learningPaths.length}</div>
              <div>Selected Learning Path: "{selectedLearningPath}"</div>
              <div>Selected Category: "{selectedCategory}"</div>
              <div>Selected Difficulty: "{selectedDifficulty}"</div>
              <div>Markdown Length: {markdownContent.length}</div>
            </div>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-700 dark:text-green-300">{success}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleExtractQuestions}
              disabled={isExtracting || !markdownContent.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              {isExtracting ? 'Extracting...' : 'Extract Questions'}
            </button>
            
            {extractedQuestions.length > 0 && (
              <button
                onClick={handleImportQuestions}
                disabled={isExtracting}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                {isExtracting ? 'Importing...' : `Import ${extractedQuestions.length} Questions`}
              </button>
            )}
          </div>

          {/* Extracted Questions Preview */}
          {extractedQuestions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Extracted Questions ({extractedQuestions.length})
              </h3>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {extractedQuestions.map((question, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Question {index + 1}
                      </h4>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                        {question.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      {question.content}
                    </p>
                    <div className="space-y-1">
                      {question.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`text-xs p-2 rounded ${
                            option.isCorrect
                              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                              : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {String.fromCharCode(65 + optIndex)}) {option.text}
                          {option.isCorrect && ' ✓'}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
