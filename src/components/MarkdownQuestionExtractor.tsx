'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bug } from 'lucide-react';
import { useUnifiedQuestions } from '@/hooks/useUnifiedQuestions';
import { BulkQuestionData } from '@/lib/unified-question-schema';

interface ExtractedQuestion {
  content: string;
  type: 'single' | 'multiple' | 'open-ended';
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
  // Open-ended question fields
  expectedAnswer?: string;
  aiValidationPrompt?: string;
  acceptPartialCredit?: boolean;
}

interface MarkdownQuestionExtractorProps {
  learningPaths: Array<{ id: string; name: string }>;
  onClose: () => void;
  onRefreshLearningPaths?: () => void;
  onExtract?: (questions: any[]) => void;
}

export function MarkdownQuestionExtractor({
  learningPaths,
  onClose,
  onRefreshLearningPaths,
  onExtract,
}: MarkdownQuestionExtractorProps) {
  const [markdownContent, setMarkdownContent] = useState('');
  const [selectedLearningPath, setSelectedLearningPath] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    'easy' | 'medium' | 'hard'
  >('easy');
  const [selectedQuestionType, setSelectedQuestionType] = useState<
    'single' | 'multiple' | 'open-ended'
  >('single');
  const [extractedQuestions, setExtractedQuestions] = useState<
    ExtractedQuestion[]
  >([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Debug: Log learning paths
  console.log('MarkdownQuestionExtractor - Learning Paths:', learningPaths);
  console.log(
    'MarkdownQuestionExtractor - Learning Paths Length:',
    learningPaths.length
  );
  console.log(
    'MarkdownQuestionExtractor - Learning Paths Structure:',
    learningPaths.map(p => ({ id: p.id, name: p.name }))
  );

  const { bulkImportQuestions } = useUnifiedQuestions();

  // Auto-set learning path when category is selected
  useEffect(() => {
    if (selectedCategory === 'JavaScript') {
      // Find the JavaScript Deep Dive learning path
      const jsDeepDivePath = learningPaths.find(
        path => path.name === 'JavaScript Deep Dive'
      );
      if (jsDeepDivePath) {
        setSelectedLearningPath(jsDeepDivePath.id);
        console.log('🔗 Auto-selected learning path:', jsDeepDivePath);
      } else {
        console.log(
          '⚠️ JavaScript Deep Dive learning path not found. Available paths:',
          learningPaths.map(p => ({ id: p.id, name: p.name }))
        );
      }
    }
  }, [selectedCategory, learningPaths]);

  // Cleanup duplicate learning paths
  const handleCleanupDuplicates = async () => {
    try {
      const response = await fetch(
        '/api/admin/learning-paths/cleanup-duplicates',
        {
          method: 'POST',
        }
      );
      const result = await response.json();
      if (result.success) {
        setSuccess('Duplicate learning paths cleaned up successfully!');
        // Refresh learning paths if callback provided
        if (onRefreshLearningPaths) {
          onRefreshLearningPaths();
        }
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(`Error: ${result.error}`);
      }
    } catch (error) {
      setError(`Error cleaning up duplicates: ${error}`);
    }
  };

  const categories = [
    'JavaScript',
    'CSS',
    'React',
    'TypeScript',
    'Testing',
    'Performance',
    'Security',
    'HTML',
    'Node.js',
    'General',
  ];

  const difficulties = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ] as const;

  // Parse markdown content to extract questions
  const parseMarkdownQuestions = (content: string): ExtractedQuestion[] => {
    const questions: ExtractedQuestion[] = [];

    // Split content by question markers - handle both formats
    const questionBlocks = content.split(
      /(?=######?\s*\d+\.|##?\s*Question\s*\d*)/i
    );

    questionBlocks.forEach((block, index) => {
      if (index === 0) return; // Skip the first block (usually content before first question)

      const lines = block
        .split('\n')
        .map(line => line.trim())
        .filter(line => line);

      if (lines.length === 0) return;

      // Extract question content - handle both formats
      let questionContent = '';
      let questionMatch = lines[0].match(/######?\s*\d+\.\s*(.+)/i);

      if (!questionMatch) {
        questionMatch = lines[0].match(/##?\s*Question\s*\d*:?\s*(.+)/i);
      }

      if (!questionMatch) return;

      questionContent = questionMatch[1];

      // Find code blocks (```javascript or ```)
      const codeBlockStart = lines.findIndex(line => /^```/.test(line));
      let codeBlock = '';
      if (codeBlockStart !== -1) {
        const codeBlockEnd = lines.findIndex(
          (line, idx) => idx > codeBlockStart && /^```/.test(line)
        );
        if (codeBlockEnd !== -1) {
          codeBlock = lines.slice(codeBlockStart + 1, codeBlockEnd).join('\n');
          questionContent += '\n\n```javascript\n' + codeBlock + '\n```';
        }
      }

      // Find options (lines starting with -, *, or A), B), C), D))
      const optionLines = lines.filter(
        line =>
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
        explanation = lines
          .slice(explanationStart + 1)
          .join(' ')
          .trim();
      }

      // Parse options
      const options = optionLines.map((line, optIndex) => {
        const cleanLine = line
          .replace(/^[-*]\s*/, '')
          .replace(/^[A-D]\)\s*/, '')
          .replace(/^\d+\.\s*/, '');
        const isCorrect =
          /✓|correct|true|yes/i.test(cleanLine) ||
          /\[x\]|\[X\]/.test(line) ||
          cleanLine.includes('(correct)') ||
          cleanLine.includes('(answer)');

        const cleanText = cleanLine
          .replace(/✓|correct|true|yes|\(correct\)|\(answer\)/gi, '')
          .trim();

        return {
          id: `opt${optIndex + 1}`,
          text: cleanText,
          isCorrect: isCorrect,
        };
      });

      // Use selected question type or determine from options
      let questionType = selectedQuestionType;
      if (
        selectedQuestionType === 'single' ||
        selectedQuestionType === 'multiple'
      ) {
        const correctOptions = options.filter(opt => opt.isCorrect);
        questionType = correctOptions.length > 1 ? 'multiple' : 'single';
      }

      // For open-ended questions, we don't need options
      if (selectedQuestionType === 'open-ended' && questionContent) {
        questions.push({
          content: questionContent,
          type: 'open-ended',
          options: [], // No options for open-ended questions
          explanation: explanation || 'No explanation provided.',
          learningPath: selectedLearningPath,
          category: selectedCategory,
          difficulty: selectedDifficulty,
          audioQuestion: `/audio/${selectedLearningPath}/questions/question-${questions.length + 1}.mp3`,
          audioAnswer: `/audio/${selectedLearningPath}/questions/answer-${questions.length + 1}.mp3`,
          // Open-ended question fields
          expectedAnswer: explanation || '', // Use explanation as expected answer
          aiValidationPrompt: '', // Default empty
          acceptPartialCredit: true, // Default to true
        });
      } else if (options.length >= 2 && questionContent) {
        questions.push({
          content: questionContent,
          type: questionType,
          options,
          explanation: explanation || 'No explanation provided.',
          learningPath: selectedLearningPath,
          category: selectedCategory,
          difficulty: selectedDifficulty,
          audioQuestion: `/audio/${selectedLearningPath}/questions/question-${questions.length + 1}.mp3`,
          audioAnswer: `/audio/${selectedLearningPath}/questions/answer-${questions.length + 1}.mp3`,
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
      learningPathsCount: learningPaths.length,
      learningPaths: learningPaths.map(p => ({ id: p.id, name: p.name })),
      selectedLearningPathType: typeof selectedLearningPath,
      selectedLearningPathLength: selectedLearningPath.length,
      isEmpty: selectedLearningPath === '',
      isFalsy: !selectedLearningPath,
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
        setError(
          'No valid questions found in the markdown content. Please check the format.'
        );
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
        title:
          q.content.substring(0, 100) + (q.content.length > 100 ? '...' : ''), // Use content as title, truncated
        content: q.content,
        type: q.type,
        options: q.options,
        correctAnswers: q.options
          .filter(opt => opt.isCorrect)
          .map(opt => opt.id),
        explanation: q.explanation,
        category: q.category,
        subcategory: q.category, // Use category as subcategory
        difficulty: q.difficulty,
        tags: [q.category, q.difficulty], // Add category and difficulty as tags
        learningPath: q.learningPath,
        sectionId: 'default', // Default section
        points:
          q.difficulty === 'easy' ? 10 : q.difficulty === 'medium' ? 20 : 30,
        timeLimit: 300, // 5 minutes default
        audioQuestion: q.audioQuestion,
        audioAnswer: q.audioAnswer,
        // Open-ended question fields
        expectedAnswer: q.expectedAnswer,
        aiValidationPrompt: q.aiValidationPrompt,
        acceptPartialCredit: q.acceptPartialCredit,
      }));

      console.log('Importing questions to Firebase:', {
        count: bulkData.length,
        sampleQuestion: bulkData[0],
        learningPath: selectedLearningPath,
      });

      const result = await bulkImportQuestions(bulkData);

      console.log('Import result:', result);

      if (result.success > 0) {
        setSuccess(
          `Successfully imported ${result.success} questions to Firebase! ${result.failed > 0 ? `${result.failed} failed.` : ''}`
        );
        setExtractedQuestions([]);
        setMarkdownContent('');

        // Call onExtract callback if provided
        if (onExtract) {
          onExtract(bulkData);
        }

        // Auto-close after successful import
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setError(`Failed to import questions: ${result.errors.join(', ')}`);
      }
    } catch (err) {
      console.error('Import error:', err);
      setError(
        `Error importing questions: ${err instanceof Error ? err.message : 'Unknown error'}`
      );
    } finally {
      setIsExtracting(false);
    }
  };

  const sampleMarkdown = `###### 1. What's the output?

\`\`\`javascript
function sayHi() {
  console.log(name);
  console.log(age);
  var name = 'Lydia';
  let age = 21;
}

sayHi();
\`\`\`

- A: \`Lydia\` and \`undefined\`
- B: \`Lydia\` and \`ReferenceError\`
- C: \`ReferenceError\` and \`21\`
- D: \`undefined\` and \`ReferenceError\` ✓

<details><summary><b>Answer</b></summary>
<p>

#### Answer: D

Within the function, we first declare the \`name\` variable with the \`var\` keyword. This means that the variable gets hoisted (memory space is set up during the creation phase) with the default value of \`undefined\`, until we actually get to the line where we define the variable. We haven't defined the variable yet on the line where we try to log the \`name\` variable, so it still holds the value of \`undefined\`.

Variables with the \`let\` keyword (and \`const\`) are hoisted, but unlike \`var\`, don't get <i>initialized</i>. They are not accessible before the line we declare (initialize) them. This is called the "temporal dead zone". When we try to access the variables before they are declared, JavaScript throws a \`ReferenceError\`.

</p>
</details>

---

###### 2. Explain the difference between \`var\`, \`let\`, and \`const\` in JavaScript.

<details><summary><b>Answer</b></summary>
<p>

#### Answer: Key Differences

**var:**
- Function-scoped or globally-scoped
- Hoisted and initialized with \`undefined\`
- Can be redeclared
- Can be reassigned

**let:**
- Block-scoped
- Hoisted but not initialized (temporal dead zone)
- Cannot be redeclared in same scope
- Can be reassigned

**const:**
- Block-scoped
- Hoisted but not initialized (temporal dead zone)
- Cannot be redeclared in same scope
- Cannot be reassigned (immutable binding)

</p>
</details>`;

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
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Learning Path
                  {selectedCategory === 'JavaScript' &&
                    selectedLearningPath && (
                      <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                        (Auto-set for JavaScript)
                      </span>
                    )}
                </label>
                {learningPaths.length > 0 && (
                  <button
                    type="button"
                    onClick={handleCleanupDuplicates}
                    className="text-xs text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300 flex items-center gap-1"
                    title="Clean up duplicate learning paths"
                  >
                    <Bug className="w-3 h-3" />
                    Cleanup
                  </button>
                )}
              </div>
              <select
                value={selectedLearningPath}
                onChange={e => setSelectedLearningPath(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              >
                <option value="">Select Learning Path</option>
                {learningPaths.length === 0 ? (
                  <option value="" disabled>
                    Loading learning paths...
                  </option>
                ) : (
                  // Deduplicate learning paths by name, keeping the first occurrence
                  learningPaths
                    .filter(
                      (path, index, self) =>
                        index ===
                        self.findIndex(
                          p =>
                            p.name.toLowerCase().trim() ===
                            path.name.toLowerCase().trim()
                        )
                    )
                    .map(path => (
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
                onChange={e => setSelectedCategory(e.target.value)}
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
                onChange={e =>
                  setSelectedDifficulty(
                    e.target.value as 'easy' | 'medium' | 'hard'
                  )
                }
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {difficulties.map(diff => (
                  <option key={diff.value} value={diff.value}>
                    {diff.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Question Type
              </label>
              <select
                value={selectedQuestionType}
                onChange={e =>
                  setSelectedQuestionType(
                    e.target.value as 'single' | 'multiple' | 'open-ended'
                  )
                }
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="single">Single Choice</option>
                <option value="multiple">Multiple Choice</option>
                <option value="open-ended">Open-ended (AI Validated)</option>
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
              onChange={e => setMarkdownContent(e.target.value)}
              placeholder="Paste your markdown content here..."
              className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none"
            />
          </div>

          {/* Debug Info */}
          <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Debug Info:
            </h4>
            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <div>Learning Paths Count: {learningPaths.length}</div>
              <div>
                Selected Learning Path: &quot;{selectedLearningPath}&quot;
              </div>
              <div>Selected Category: &quot;{selectedCategory}&quot;</div>
              <div>Selected Difficulty: &quot;{selectedDifficulty}&quot;</div>
              <div>
                Selected Question Type: &quot;{selectedQuestionType}&quot;
              </div>
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
                {isExtracting
                  ? 'Importing...'
                  : `Import ${extractedQuestions.length} Questions`}
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
