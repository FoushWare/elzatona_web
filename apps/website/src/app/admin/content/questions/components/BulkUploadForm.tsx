'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Badge,
  DialogFooter,
} from '@elzatona/shared-components';
import { Upload, FileText, AlertTriangle, Loader2 } from 'lucide-react';

interface BulkUploadFormProps {
  onUpload: (file: File) => void;
  onCancel: () => void;
  loading: boolean;
  error: string | null;
  success: string | null;
  progress: { current: number; total: number } | null;
}

export function BulkUploadForm({
  onUpload,
  onCancel,
  loading,
  error,
  success,
  progress,
}: BulkUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewQuestions, setPreviewQuestions] = useState<any[]>([]);
  const [totalQuestionsCount, setTotalQuestionsCount] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!error && !success && !loading) {
      setFile(null);
      setPreviewQuestions([]);
      setTotalQuestionsCount(0);
      setShowPreview(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [error, success, loading]);

  const parseFile = async (selectedFile: File) => {
    try {
      const fileType = selectedFile.name.split('.').pop()?.toLowerCase();
      let questions: any[] = [];

      if (fileType === 'json') {
        const text = await selectedFile.text();
        const data = JSON.parse(text);
        questions = Array.isArray(data) ? data : data.questions || [];
      } else if (fileType === 'csv') {
        const text = await selectedFile.text();
        const lines = text.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim());
        questions = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim());
          const question: any = {};
          headers.forEach((header, index) => {
            question[header] = values[index] || '';
          });
          return question;
        });
      }

      setTotalQuestionsCount(questions.length);
      setPreviewQuestions(questions.slice(0, 3));
      setShowPreview(questions.length > 0);
    } catch (err) {
      console.error('Error parsing file:', err);
      setPreviewQuestions([]);
      setTotalQuestionsCount(0);
      setShowPreview(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileType = selectedFile.name.split('.').pop()?.toLowerCase();
      if (fileType !== 'csv' && fileType !== 'json') {
        return;
      }
      setFile(selectedFile);
      await parseFile(selectedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onUpload(file);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const fileType = droppedFile.name.split('.').pop()?.toLowerCase();
      if (fileType === 'csv' || fileType === 'json') {
        setFile(droppedFile);
        await parseFile(droppedFile);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6 p-4'>
      <div
        className='border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors bg-gray-50 dark:bg-gray-800/50'
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className='w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-500' />
        <p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
          Drag and drop a CSV or JSON file here, or click to select
        </p>
        <input
          ref={fileInputRef}
          type='file'
          accept='.csv,.json'
          onChange={handleFileChange}
          className='hidden'
        />
        {file && (
          <div className='mt-4 flex items-center justify-center space-x-2'>
            <FileText className='w-5 h-5 text-blue-500 dark:text-blue-400' />
            <span className='text-sm font-medium text-gray-900 dark:text-white'>
              {file.name}
            </span>
          </div>
        )}
      </div>

      {/* Question Preview */}
      {showPreview && previewQuestions.length > 0 && (
        <div className='space-y-4 rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-900/10 dark:to-gray-800/50 p-5 shadow-sm'>
          <div className='flex items-center justify-between mb-4 pb-3 border-b border-blue-200 dark:border-blue-800'>
            <div className='flex items-center gap-3'>
              <div className='flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center'>
                <FileText className='w-5 h-5 text-blue-600 dark:text-blue-400' />
              </div>
              <div>
                <h4 className='text-sm font-semibold text-gray-900 dark:text-white'>
                  Preview (First 3 Questions)
                </h4>
                <p className='text-xs text-gray-600 dark:text-gray-400 mt-0.5'>
                  {totalQuestionsCount} total question{totalQuestionsCount !== 1 ? 's' : ''} in file
                </p>
              </div>
            </div>
            <Badge
              variant='secondary'
              className='text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
            >
              {totalQuestionsCount} Total
            </Badge>
          </div>

          <div className='max-h-[500px] overflow-y-auto space-y-3 pr-2'>
            {previewQuestions.map((question, qIndex) => (
              <div
                key={qIndex}
                className='p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow space-y-3'
              >
                <div className='space-y-2'>
                  <div className='flex items-start justify-between gap-2'>
                    <h5 className='text-sm font-semibold text-gray-900 dark:text-white flex-1'>
                      {question.title || `Question ${qIndex + 1}`}
                    </h5>
                    {question.difficulty && (
                      <Badge variant='outline' className='text-xs capitalize'>
                        {question.difficulty}
                      </Badge>
                    )}
                  </div>
                  {question.content && (
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      {question.content}
                    </p>
                  )}
                  <div className='flex flex-wrap gap-2'>
                    {question.category && (
                      <Badge variant='secondary' className='text-xs'>
                        {question.category}
                      </Badge>
                    )}
                    {question.topic && (
                      <Badge variant='outline' className='text-xs'>
                        {question.topic}
                      </Badge>
                    )}
                    {question.type && (
                      <Badge variant='outline' className='text-xs'>
                        {question.type}
                      </Badge>
                    )}
                  </div>
                </div>

                {question.options &&
                  Array.isArray(question.options) &&
                  question.options.length > 0 && (
                    <div className='space-y-2'>
                      <p className='text-xs font-medium text-gray-700 dark:text-gray-300'>
                        Options:
                      </p>
                      <div className='space-y-2 pl-2'>
                        {question.options.map((option: any, oIndex: number) => (
                          <div
                            key={oIndex}
                            className={`flex items-start gap-2 p-2 rounded-md border ${
                              option.isCorrect
                                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                                : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                            }`}
                          >
                            <div className='flex items-center h-5 mt-0.5'>
                              <input
                                type='checkbox'
                                checked={option.isCorrect || false}
                                readOnly
                                className='w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-green-600 focus:ring-green-500 dark:focus:ring-green-400'
                              />
                            </div>
                            <div className='flex-1 min-w-0'>
                              <p
                                className={`text-sm ${
                                  option.isCorrect
                                    ? 'text-green-800 dark:text-green-200 font-medium'
                                    : 'text-gray-700 dark:text-gray-300'
                                }`}
                              >
                                {option.text || `Option ${oIndex + 1}`}
                              </p>
                              {option.explanation && (
                                <p className='text-xs text-gray-600 dark:text-gray-400 mt-1 italic'>
                                  {option.explanation}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {question.explanation && (
                  <div className='pt-2 border-t border-gray-200 dark:border-gray-700'>
                    <p className='text-xs font-medium text-gray-700 dark:text-gray-300 mb-1'>
                      Explanation:
                    </p>
                    <p className='text-xs text-gray-600 dark:text-gray-400'>
                      {question.explanation}
                    </p>
                  </div>
                )}

                {question.hints &&
                  Array.isArray(question.hints) &&
                  question.hints.length > 0 && (
                    <div className='pt-2 border-t border-gray-200 dark:border-gray-700'>
                      <p className='text-xs font-medium text-gray-700 dark:text-gray-300 mb-1'>
                        Hints:
                      </p>
                      <ul className='list-disc list-inside space-y-1'>
                        {question.hints.map((hint: string, hIndex: number) => (
                          <li
                            key={hIndex}
                            className='text-xs text-gray-600 dark:text-gray-400'
                          >
                            {hint}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {question.points && (
                  <div className='flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400'>
                    <span className='font-medium'>Points:</span>
                    <Badge variant='outline' className='text-xs'>
                      {question.points}
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>

          {totalQuestionsCount > 3 && (
            <div className='mt-3 pt-3 border-t border-blue-200 dark:border-blue-800'>
              <p className='text-xs text-center text-gray-600 dark:text-gray-400 italic'>
                + {totalQuestionsCount - 3} more question{totalQuestionsCount - 3 !== 1 ? 's' : ''} will be uploaded
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className='p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg'>
          <div className='flex items-start gap-3'>
            <div className='flex-shrink-0 w-5 h-5 mt-0.5'>
              <AlertTriangle className='w-5 h-5 text-red-600 dark:text-red-400' />
            </div>
            <div className='flex-1'>
              <p className='text-sm font-semibold mb-1'>Upload Errors</p>
              <p className='text-sm whitespace-pre-line'>{error}</p>
            </div>
          </div>
        </div>
      )}

      {progress && (
        <div className='p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg'>
          <div className='flex items-center gap-3 mb-3'>
            <Loader2 className='w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin' />
            <div className='flex-1'>
              <p className='text-sm font-semibold text-blue-900 dark:text-blue-200'>
                Uploading questions...
              </p>
              <p className='text-xs text-blue-700 dark:text-blue-300 mt-0.5'>
                Processing batch {progress.current} of {progress.total}
              </p>
            </div>
            <Badge
              variant='secondary'
              className='bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
            >
              {Math.round((progress.current / progress.total) * 100)}%
            </Badge>
          </div>
          <div className='w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2 overflow-hidden'>
            <div
              className='bg-blue-600 dark:bg-blue-400 h-2 transition-all duration-300 ease-out'
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            />
          </div>
        </div>
      )}

      {success && (
        <div className='p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg'>
          <p className='text-sm'>{success}</p>
        </div>
      )}

      <div className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
        <h4 className='text-sm font-semibold mb-2 text-gray-900 dark:text-white'>
          File Format Requirements:
        </h4>
        <div className='text-sm text-gray-600 dark:text-gray-400 space-y-2'>
          <div>
            <p className='font-medium mb-1'>
              <strong>JSON Format:</strong> Array of question objects
            </p>
            <p className='ml-2'>
              <strong>Required fields:</strong> title, content
            </p>
            <p className='ml-2'>
              <strong>Optional fields:</strong>
            </p>
            <ul className='ml-6 list-disc space-y-0.5'>
              <li>
                type: &quot;multiple-choice&quot; | &quot;true-false&quot; | &quot;code&quot;
                &quot;true-false&quot; | &quot;code&quot;
              </li>
              <li>
                difficulty: &quot;beginner&quot; | &quot;intermediate&quot; |
                &quot;advanced&quot;
              </li>
              <li>category: string (e.g., &quot;HTML&quot;, &quot;CSS&quot;)</li>
              <li>topic: string (e.g., &quot;HTML5 Semantics&quot;)</li>
              <li>learningCardId: string</li>
              <li>isActive: boolean (default: true)</li>
              <li>tags: string[]</li>
              <li>explanation: string</li>
              <li>hints: string[]</li>
              <li>points: number</li>
              <li>
                options: Array of objects with id, text, isCorrect, explanation
              </li>
              <li>answer: string</li>
              <li>metadata: object</li>
            </ul>
          </div>
          <div className='mt-2 pt-2 border-t border-gray-300 dark:border-gray-700'>
            <p className='font-medium mb-1'>
              <strong>CSV Format:</strong> First row contains headers
            </p>
            <p className='ml-2'>Required columns: title, content</p>
            <p className='ml-2'>
              Optional columns: type, difficulty, category, topic, learningCardId,
              isActive, tags, explanation, hints, points, answer
            </p>
          </div>
          <div className='mt-2 pt-2 border-t border-gray-300 dark:border-gray-700'>
            <p className='text-xs italic'>
              Note: Fields can be in camelCase (isActive, learningCardId) or
              snake_case (is_active, learning_card_id). The system will
              automatically convert them.
            </p>
          </div>
        </div>
      </div>

      <DialogFooter className='gap-3 pt-4'>
        <Button
          variant='outline'
          onClick={onCancel}
          disabled={loading}
          className='border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 disabled:opacity-50'
        >
          Cancel
        </Button>
        <Button
          type='submit'
          disabled={!file || loading}
          className='bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white dark:text-white shadow-sm dark:shadow-md disabled:opacity-50'
        >
          {loading ? (
            <>
              <Loader2 className='w-4 h-4 mr-2 animate-spin' />
              {progress
                ? `Uploading... (${progress.current}/${progress.total})`
                : 'Uploading...'}
            </>
          ) : (
            <>
              <Upload className='w-4 h-4 mr-2' />
              Upload Questions
            </>
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}

