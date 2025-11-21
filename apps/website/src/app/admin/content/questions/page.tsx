'use client';

import React, { useState, useEffect, useMemo } from 'react';
// Note: This page uses API routes, so Supabase client is not directly needed
// Keeping import for potential future use, but it's not currently used

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@elzatona/shared-components';
import { Button } from '@elzatona/shared-components';
import { Badge } from '@elzatona/shared-components';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@elzatona/shared-components';
import { Input } from '@elzatona/shared-components';
import {
  Plus,
  Edit,
  Trash2,
  Loader2,
  Eye,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Upload,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@elzatona/shared-components';
import { Label } from '@elzatona/shared-components';
import { Textarea } from '@elzatona/shared-components';
import { Checkbox } from '@elzatona/shared-components';
import { useToast, ToastContainer } from '@elzatona/shared-components';
import { UnifiedQuestion } from '@elzatona/shared-types';

type Question = UnifiedQuestion;

export default function AdminContentQuestionsPage() {
  // Toast notifications
  const { showSuccess, showError, toasts, removeToast } = useToast();

  // Local state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // Data state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / pageSize);

  // Additional data for forms (cards, categories, topics)
  const [cardsData, setCardsData] = useState<any>(null);
  const [categoriesData, setCategoriesData] = useState<any[]>([]);
  const [topicsData, setTopicsData] = useState<any[]>([]);

  // Modal states
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<Question | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [bulkUploadLoading, setBulkUploadLoading] = useState(false);
  const [bulkUploadError, setBulkUploadError] = useState<string | null>(null);
  const [bulkUploadSuccess, setBulkUploadSuccess] = useState<string | null>(null);
  const [bulkUploadProgress, setBulkUploadProgress] = useState<{ current: number; total: number } | null>(null);
  
  // Bulk deletion state
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<Set<string>>(new Set());
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
  const [bulkDeleteLoading, setBulkDeleteLoading] = useState(false);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      try {
        console.log('🔍 Fetching questions...', { currentPage, pageSize });
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/questions/unified?page=${currentPage}&pageSize=${pageSize}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);
        console.log('📡 Response:', response.status, response.ok);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('📊 Result:', result);

        setQuestions(result.data || []);
        setTotalCount(result.pagination?.totalCount || 0);
        setLoading(false);
        console.log('✅ Questions loaded:', result.data?.length || 0);
      } catch (err: any) {
        clearTimeout(timeoutId);
        console.error('❌ Error:', err);
        
        // Provide more specific error messages
        let errorMessage = 'Unknown error';
        if (err.name === 'AbortError') {
          errorMessage = 'Request timeout - please try again';
        } else if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
          errorMessage = 'Network error - please check your connection and ensure the server is running';
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
        
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchQuestions();
    // Clear selection when page changes
    setSelectedQuestionIds(new Set());
  }, [currentPage, pageSize]);

  // Fetch cards data
  useEffect(() => {
    const fetchCards = async () => {
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      try {
        const response = await fetch('/api/cards', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          setCardsData(data);
        } else {
          console.error('Error fetching cards: Response not OK', response.status, response.statusText);
          // Set empty data instead of failing silently
          setCardsData({ data: [] });
        }
      } catch (error: any) {
        clearTimeout(timeoutId);
        // Handle different types of errors
        if (error.name === 'AbortError') {
          console.error('Error fetching cards: Request timeout (10s)');
        } else if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
          console.error('Error fetching cards: Network error - API endpoint may be unavailable. Check if the server is running.');
        } else {
          console.error('Error fetching cards:', error);
        }
        // Set empty data instead of failing silently
        setCardsData({ data: [] });
      }
    };
    fetchCards();
  }, []);

  // Fetch categories data
  useEffect(() => {
    const fetchCategories = async () => {
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      try {
        console.log('🔄 Fetching categories...');
        const response = await fetch('/api/categories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        console.log('📡 Categories response:', response.status, response.ok);
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Categories data:', data);
          console.log('📊 Categories count:', data.data?.length || 0);
          setCategoriesData(data.data || []);
        } else {
          console.error('❌ Categories response not OK:', response.status, response.statusText);
          // Set empty array instead of failing silently
          setCategoriesData([]);
        }
      } catch (error: any) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
          console.error('❌ Error fetching categories: Request timeout (10s)');
        } else if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
          console.error('❌ Error fetching categories: Network error - API endpoint may be unavailable. Check if the server is running.');
        } else {
          console.error('❌ Error fetching categories:', error);
        }
        // Set empty array instead of failing silently
        setCategoriesData([]);
      }
    };
    fetchCategories();
  }, []);

  // Fetch topics data
  useEffect(() => {
    const fetchTopics = async () => {
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      try {
        console.log('🔄 Fetching topics...');
        const response = await fetch('/api/topics', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        console.log('📡 Topics response:', response.status, response.ok);
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Topics data:', data);
          console.log('📊 Topics count:', data.data?.length || 0);
          setTopicsData(data.data || []);
        } else {
          console.error('❌ Topics response not OK:', response.status, response.statusText);
          // Set empty array instead of failing silently
          setTopicsData([]);
        }
      } catch (error: any) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
          console.error('❌ Error fetching topics: Request timeout (10s)');
        } else if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
          console.error('❌ Error fetching topics: Network error - API endpoint may be unavailable. Check if the server is running.');
        } else {
          console.error('❌ Error fetching topics:', error);
        }
        // Set empty array instead of failing silently
        setTopicsData([]);
      }
    };
    fetchTopics();
  }, []);

  const cards = cardsData?.data || [];

  // Derived data - use API data instead of deriving from questions
  const allCategories = useMemo(() => {
    if (!Array.isArray(categoriesData)) {
      return [];
    }
    return categoriesData.map((cat: any) => cat.name || cat.title).filter(Boolean).sort();
  }, [categoriesData]);

  const allTypes = useMemo(() => {
    if (!questions || !Array.isArray(questions)) {
      return [];
    }
    const types = [
      ...new Set(questions.map((q: Question) => q.type).filter(Boolean)),
    ] as string[];
    return types.sort();
  }, [questions]);

  // Questions list - filter by search term (client-side filtering)
  const displayQuestions = useMemo(() => {
    if (!Array.isArray(questions)) {
      return [];
    }
    
    // If no search term, return all questions
    if (!searchTerm || searchTerm.trim() === '') {
      return questions;
    }
    
    // Filter questions by search term (case-insensitive)
    const searchLower = searchTerm.toLowerCase().trim();
    return questions.filter((question: Question) => {
      // Search in title
      if (question.title?.toLowerCase().includes(searchLower)) {
        return true;
      }
      // Search in content
      if (question.content?.toLowerCase().includes(searchLower)) {
        return true;
      }
      // Search in tags
      if (Array.isArray(question.tags)) {
        if (question.tags.some((tag: string) => tag.toLowerCase().includes(searchLower))) {
          return true;
        }
      }
      return false;
    });
  }, [questions, searchTerm]);
  
  // Clear selection when search term changes
  useEffect(() => {
    setSelectedQuestionIds(new Set());
  }, [searchTerm]);

  // Close modals
  const closeModals = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setIsCreateModalOpen(false);
    setIsBulkUploadModalOpen(false);
    setSelectedQuestion(null);
    setBulkUploadError(null);
    setBulkUploadSuccess(null);
  };

  // Handlers for CRUD operations
  const handleCreateQuestion = async (newQuestion: Partial<Question>) => {
    try {
      // Log the question data being sent
      console.log('📤 Creating question with data:', {
        title: newQuestion.title,
        category: newQuestion.category,
        topic: newQuestion.topic,
        learningCardId: newQuestion.learningCardId,
        learning_card_id: (newQuestion as any).learning_card_id,
        type: newQuestion.type,
        difficulty: newQuestion.difficulty,
        fullData: newQuestion,
      });

      // API expects questions array, even for single question
      const requestBody = {
        questions: [newQuestion],
        isBulkImport: false,
      };
      
      console.log('📤 Request body:', JSON.stringify(requestBody, null, 2));
      
      const response = await fetch('/api/questions/unified', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        // Check if there were any errors in the response
        if (responseData.data?.failed > 0) {
          const errorMessages = responseData.data?.errors || [];
          throw new Error(`Failed to create question: ${errorMessages.join(', ')}`);
        }
        
        // Refresh questions list without page reload
        // Reset to page 1 to show the newly created question (new questions appear on page 1)
        const fetchQuestions = async () => {
          try {
            setLoading(true);
            // Always fetch page 1 after creating a new question to ensure it's visible
            const response = await fetch(
              `/api/questions/unified?page=1&pageSize=${pageSize}`
            );
            const data = await response.json();
            if (data.success) {
              setQuestions(data.data || []);
              setTotalCount(data.pagination?.totalCount || 0);
              // Update current page to 1 to match the fetched data
              setCurrentPage(1);
            }
          } catch (err) {
            console.error('Error refreshing questions:', err);
          } finally {
            setLoading(false);
          }
        };
        
        await fetchQuestions();
        showSuccess('Question Created', 'Question created successfully!');
        closeModals();
        
        // Close modal after successful creation
        setTimeout(() => {
          setIsCreateModalOpen(false);
        }, 500);
      } else {
        const errorMessage = responseData.error || 'Failed to create question';
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error creating question:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error creating question';
      showError('Failed to Create Question', errorMessage);
    }
  };

  const handleUpdateQuestion = async (
    updatedQuestion: Partial<UnifiedQuestion>
  ) => {
    try {
      if (!updatedQuestion.id) {
        throw new Error('Question ID is required for update');
      }

      // Log the question data being sent
      console.log('📤 Updating question with data:', {
        id: updatedQuestion.id,
        title: updatedQuestion.title,
        category: updatedQuestion.category,
        topic: updatedQuestion.topic,
        learningCardId: updatedQuestion.learningCardId,
        learning_card_id: (updatedQuestion as any).learning_card_id,
        type: updatedQuestion.type,
        difficulty: updatedQuestion.difficulty,
        fullData: updatedQuestion,
      });

      const response = await fetch(
        `/api/questions/unified/${updatedQuestion.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedQuestion),
        }
      );

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        // Refresh questions list without page reload
        const fetchQuestions = async () => {
          try {
            setLoading(true);
            const response = await fetch(
              `/api/questions/unified?page=${currentPage}&pageSize=${pageSize}`
            );
            const data = await response.json();
            if (data.success) {
              setQuestions(data.data || []);
              setTotalCount(data.pagination?.totalCount || 0);
            }
          } catch (err) {
            console.error('Error refreshing questions:', err);
          } finally {
            setLoading(false);
          }
        };
        
        await fetchQuestions();
        showSuccess('Question Updated', 'Question updated successfully!');
        closeModals();
        
        // Close modal after successful update
        setTimeout(() => {
          setIsEditModalOpen(false);
        }, 500);
      } else {
        const errorMessage = responseData.error || 'Failed to update question';
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error updating question:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error updating question';
      showError('Failed to Update Question', errorMessage);
    }
  };

  const openDeleteModal = (question: Question) => {
    setQuestionToDelete(question);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setQuestionToDelete(null);
    setDeleteLoading(false);
  };

  const handleDeleteQuestion = async () => {
    if (!questionToDelete) return;

    setDeleteLoading(true);
    try {
      const response = await fetch(`/api/questions/unified/${questionToDelete.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Refresh questions list without page reload
        const fetchQuestions = async () => {
          try {
            setLoading(true);
            const response = await fetch(
              `/api/questions/unified?page=${currentPage}&pageSize=${pageSize}`
            );
            const data = await response.json();
            if (data.success) {
              setQuestions(data.data || []);
              setTotalCount(data.pagination?.totalCount || 0);
            }
          } catch (err) {
            console.error('Error refreshing questions:', err);
          } finally {
            setLoading(false);
          }
        };
        
        await fetchQuestions();
        showSuccess('Question Deleted', 'Question deleted successfully!');
        closeDeleteModal();
        
        // Close modal after successful deletion
        setIsDeleteModalOpen(false);
        setQuestionToDelete(null);
      } else {
        throw new Error('Failed to delete question');
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      showError('Failed to Delete Question', 'Error deleting question');
      setDeleteLoading(false);
    }
  };

  // Bulk upload handler
  const handleBulkUpload = async (file: File) => {
    setBulkUploadLoading(true);
    setBulkUploadError(null);
    setBulkUploadSuccess(null);

    try {
      const fileType = file.name.split('.').pop()?.toLowerCase();
      let rawQuestions: any[] = [];

      if (fileType === 'json') {
        const text = await file.text();
        const data = JSON.parse(text);
        rawQuestions = Array.isArray(data) ? data : data.questions || [];
      } else if (fileType === 'csv') {
        const text = await file.text();
        const lines = text.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim());
        rawQuestions = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim());
          const question: any = {};
          headers.forEach((header, index) => {
            question[header] = values[index] || '';
          });
          return question;
        });
      } else {
        throw new Error('Invalid file type. Please upload CSV or JSON file.');
      }

      if (rawQuestions.length === 0) {
        throw new Error('No questions found in file.');
      }

      // Map camelCase to snake_case and prepare questions for API
      const mappedQuestions = rawQuestions
        .filter(q => q.title && q.content) // Validate required fields
        .map((q: any) => {
          // Map camelCase fields to snake_case
          const mapped: any = {
            title: q.title,
            content: q.content,
            type: q.type || 'multiple-choice',
            difficulty: q.difficulty || 'beginner',
            is_active: q.isActive !== undefined ? q.isActive : (q.is_active !== undefined ? q.is_active : true),
            // Map optional fields
            category: q.category || undefined,
            topic: q.topic || undefined,
            learning_card_id: q.learningCardId || q.learning_card_id || undefined,
            tags: q.tags || undefined,
            explanation: q.explanation || undefined,
            hints: q.hints || undefined,
            points: q.points || undefined,
            options: q.options || undefined,
            answer: q.answer || undefined,
            metadata: q.metadata || undefined,
            // Remove fields that shouldn't be sent
            id: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            created_at: undefined,
            updated_at: undefined,
            createdBy: undefined,
            updatedBy: undefined,
            isActive: undefined,
            learningCardId: undefined,
          };
          
          // Remove undefined values
          Object.keys(mapped).forEach(key => {
            if (mapped[key] === undefined) {
              delete mapped[key];
            }
          });
          
          return mapped;
        });

      if (mappedQuestions.length === 0) {
        throw new Error('No valid questions found. Questions must have title and content.');
      }

      // Split questions into batches of 5
      const BATCH_SIZE = 5;
      const batches: any[][] = [];
      for (let i = 0; i < mappedQuestions.length; i += BATCH_SIZE) {
        batches.push(mappedQuestions.slice(i, i + BATCH_SIZE));
      }

      console.log(`📦 Splitting ${mappedQuestions.length} questions into ${batches.length} batches of ${BATCH_SIZE}`);

      // Process batches sequentially
      let totalSuccessCount = 0;
      let totalFailedCount = 0;
      const allErrorDetails: Array<{ index: number; title: string; error: string; batch: number }> = [];
      const allResults: any[] = [];

      for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
        const batch = batches[batchIndex];
        const batchStartIndex = batchIndex * BATCH_SIZE;
        
        // Update progress
        setBulkUploadProgress({
          current: batchIndex + 1,
          total: batches.length,
        });

        try {
          console.log(`📤 Uploading batch ${batchIndex + 1}/${batches.length} (${batch.length} questions)...`);

          // Use bulk import endpoint for each batch with timeout
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout per batch

          let response: Response;
          try {
            response = await fetch('/api/questions/unified', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                questions: batch,
                isBulkImport: true,
              }),
              signal: controller.signal,
            });
            clearTimeout(timeoutId);
          } catch (fetchError: any) {
            clearTimeout(timeoutId);
            if (fetchError.name === 'AbortError') {
              // Timeout error
              batch.forEach((question, idx) => {
                allErrorDetails.push({
                  index: batchStartIndex + idx + 1,
                  title: question.title || 'Unknown',
                  error: 'Request timeout - batch took too long to process',
                  batch: batchIndex + 1,
                });
              });
              totalFailedCount += batch.length;
              continue;
            } else {
              // Network error (Failed to fetch)
              batch.forEach((question, idx) => {
                allErrorDetails.push({
                  index: batchStartIndex + idx + 1,
                  title: question.title || 'Unknown',
                  error: `Network error: ${fetchError.message || 'Failed to fetch'}`,
                  batch: batchIndex + 1,
                });
              });
              totalFailedCount += batch.length;
              continue;
            }
          }

          if (!response.ok) {
            let errorMessage = 'Failed to upload batch';
            try {
              const errorData = await response.json();
              errorMessage = errorData.error || errorData.message || errorMessage;
            } catch (e) {
              // If response is not JSON, use status text
              errorMessage = `HTTP ${response.status}: ${response.statusText}`;
            }
            // Mark all questions in this batch as failed
            batch.forEach((question, idx) => {
              allErrorDetails.push({
                index: batchStartIndex + idx + 1,
                title: question.title || 'Unknown',
                error: errorMessage,
                batch: batchIndex + 1,
              });
            });
            totalFailedCount += batch.length;
            continue; // Continue to next batch
          }

          const result = await response.json();
          
          if (result.success) {
            const successCount = result.data?.success || 0;
            const failedCount = result.data?.failed || 0;
            const errorDetails = result.data?.errorDetails || [];
            const results = result.data?.results || [];

            totalSuccessCount += successCount;
            totalFailedCount += failedCount;

            // Adjust error indices to reflect global question index
            errorDetails.forEach((detail: any) => {
              allErrorDetails.push({
                index: batchStartIndex + detail.index,
                title: detail.title || 'Unknown',
                error: detail.error,
                batch: batchIndex + 1,
              });
            });

            // Collect successful results
            if (results && Array.isArray(results)) {
              allResults.push(...results);
            }

            console.log(`✅ Batch ${batchIndex + 1}/${batches.length} completed: ${successCount} succeeded, ${failedCount} failed`);
          } else {
            // Mark all questions in this batch as failed
            batch.forEach((question, idx) => {
              allErrorDetails.push({
                index: batchStartIndex + idx + 1,
                title: question.title || 'Unknown',
                error: result.error || 'Failed to import batch',
                batch: batchIndex + 1,
              });
            });
            totalFailedCount += batch.length;
          }

          // Small delay between batches to avoid overwhelming the server
          if (batchIndex < batches.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        } catch (error) {
          console.error(`❌ Error processing batch ${batchIndex + 1}:`, error);
          // Mark all questions in this batch as failed
          batch.forEach((question, idx) => {
            allErrorDetails.push({
              index: batchStartIndex + idx + 1,
              title: question.title || 'Unknown',
              error: error instanceof Error ? error.message : 'Failed to upload batch',
              batch: batchIndex + 1,
            });
          });
          totalFailedCount += batch.length;
        }
      }

      // Clear progress
      setBulkUploadProgress(null);

      // Refresh questions list without page reload
      const fetchQuestions = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `/api/questions/unified?page=${currentPage}&pageSize=${pageSize}`
          );
          const data = await response.json();
          if (data.success) {
            setQuestions(data.data || []);
            setTotalCount(data.pagination?.totalCount || 0);
          }
        } catch (err) {
          console.error('Error refreshing questions:', err);
        } finally {
          setLoading(false);
        }
      };

      // Refresh questions list
      await fetchQuestions();

      // Show results
      if (totalFailedCount > 0) {
        // Show detailed error information
        let errorMessage = `Uploaded ${totalSuccessCount} question(s) successfully, but ${totalFailedCount} failed.\n\n`;
        
        if (allErrorDetails.length > 0) {
          errorMessage += 'Failed Questions:\n';
          // Show first 20 errors to avoid overwhelming the UI
          const errorsToShow = allErrorDetails.slice(0, 20);
          errorsToShow.forEach((detail) => {
            errorMessage += `\n• Question ${detail.index} (${detail.title}): ${detail.error}`;
          });
          if (allErrorDetails.length > 20) {
            errorMessage += `\n\n... and ${allErrorDetails.length - 20} more errors`;
          }
        }
        
        setBulkUploadError(errorMessage);
        showError('Bulk Upload Partial Success', `Successfully imported ${totalSuccessCount} question(s), but ${totalFailedCount} failed. Check the error details below.`);
      } else {
        const successMessage = `Successfully imported ${totalSuccessCount} question(s)!`;
        setBulkUploadSuccess(successMessage);
        showSuccess('Bulk Upload Successful', successMessage);
        
        // Close modal after successful upload
        setTimeout(() => {
          setIsBulkUploadModalOpen(false);
          setBulkUploadSuccess(null);
          setBulkUploadError(null);
          setFile(null);
          setPreviewQuestions([]);
          setTotalQuestionsCount(0);
          setShowPreview(false);
        }, 1500);
      }
    } catch (error) {
      console.error('Error uploading bulk questions:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload questions';
      setBulkUploadError(errorMessage);
      setBulkUploadProgress(null); // Clear progress on error
      showError('Bulk Upload Failed', errorMessage);
    } finally {
      setBulkUploadLoading(false);
      setBulkUploadProgress(null); // Ensure progress is cleared when done
    }
  };

  const openViewModal = (question: Question) => {
    setSelectedQuestion(question);
    setIsViewModalOpen(true);
  };

  const openEditModal = (question: Question) => {
    setSelectedQuestion(question);
    setIsEditModalOpen(true);
  };

  // Bulk deletion handlers
  const handleSelectQuestion = (questionId: string) => {
    setSelectedQuestionIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedQuestionIds.size === displayQuestions.length) {
      // Deselect all
      setSelectedQuestionIds(new Set());
    } else {
      // Select all visible questions
      setSelectedQuestionIds(new Set(displayQuestions.map((q) => q.id)));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedQuestionIds.size === 0) return;

    setBulkDeleteLoading(true);
    try {
      const questionIds = Array.from(selectedQuestionIds);
      const deletePromises = questionIds.map((id) =>
        fetch(`/api/questions/unified/${id}`, {
          method: 'DELETE',
        })
      );

      const results = await Promise.allSettled(deletePromises);
      
      const successful: string[] = [];
      const failed: Array<{ id: string; error: string }> = [];

      results.forEach((result, index) => {
        const questionId = questionIds[index];
        if (result.status === 'fulfilled' && result.value.ok) {
          successful.push(questionId);
        } else {
          const errorMsg = result.status === 'rejected' 
            ? result.reason?.message || 'Unknown error'
            : 'Delete failed';
          failed.push({ id: questionId, error: errorMsg });
        }
      });

      // Refresh questions list without page reload
      const fetchQuestions = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `/api/questions/unified?page=${currentPage}&pageSize=${pageSize}`
          );
          const data = await response.json();
          if (data.success) {
            setQuestions(data.data || []);
            setTotalCount(data.pagination?.totalCount || 0);
          }
        } catch (err) {
          console.error('Error refreshing questions:', err);
        } finally {
          setLoading(false);
        }
      };

      await fetchQuestions();

      if (failed.length > 0) {
        const errorMessage = `Successfully deleted ${successful.length} question(s), but ${failed.length} failed.\n\nFailed:\n${failed.map(f => `• Question ${f.id}: ${f.error}`).join('\n')}`;
        showError('Bulk Delete Partial Success', `Deleted ${successful.length} question(s), but ${failed.length} failed.`);
      } else {
        showSuccess('Bulk Delete Successful', `Successfully deleted ${successful.length} question(s)!`);
      }

      // Clear selection and close modal
      setSelectedQuestionIds(new Set());
      setIsBulkDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting questions:', error);
      showError('Bulk Delete Failed', 'Failed to delete questions. Please try again.');
    } finally {
      setBulkDeleteLoading(false);
    }
  };

  const getCardTitleById = (card_id: string) => {
    return cards.find((card: any) => card.id === card_id)?.title || 'N/A';
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-8'>
            Question Management
          </h1>
          <div className='flex items-center justify-center h-64'>
            <div className='text-center'>
              <Loader2 className='w-8 h-8 animate-spin mx-auto mb-4 text-blue-600' />
              <p className='text-gray-600 dark:text-gray-400'>
                Loading questions...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-8'>
            Question Management
          </h1>
          <div className='flex items-center justify-center h-64'>
            <div className='text-center p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg'>
              <p className='font-semibold mb-2'>Error loading questions:</p>
              <p>{error}</p>
              <Button onClick={() => {
                const fetchQuestions = async () => {
                  const controller = new AbortController();
                  const timeoutId = setTimeout(() => controller.abort(), 15000);
                  
                  try {
                    setLoading(true);
                    setError(null);
                    const response = await fetch(
                      `/api/questions/unified?page=${currentPage}&pageSize=${pageSize}`,
                      {
                        method: 'GET',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        signal: controller.signal,
                      }
                    );
                    
                    clearTimeout(timeoutId);
                    
                    if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    
                    const data = await response.json();
                    if (data.success) {
                      setQuestions(data.data || []);
                      setTotalCount(data.pagination?.totalCount || 0);
                    } else {
                      throw new Error(data.error || 'Failed to fetch questions');
                    }
                  } catch (err: any) {
                    clearTimeout(timeoutId);
                    console.error('Error refreshing questions:', err);
                    let errorMessage = 'Failed to load questions';
                    if (err.name === 'AbortError') {
                      errorMessage = 'Request timeout - please try again';
                    } else if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
                      errorMessage = 'Network error - please check your connection and ensure the server is running';
                    } else if (err instanceof Error) {
                      errorMessage = err.message;
                    }
                    setError(errorMessage);
                  } finally {
                    setLoading(false);
                  }
                };
                fetchQuestions();
              }} className='mt-4'>
                Retry
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
        {/* Header Section */}
        <div className='mb-8'>
          <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2'>
            Question Management
          </h1>
          <p className='text-sm sm:text-base text-gray-600 dark:text-gray-400'>
            Create, edit, and manage learning questions for your platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8'>
          <Card className='hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700'>
            <CardContent className='p-5 sm:p-6'>
              <div className='flex items-center space-x-4'>
                <div className='w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center flex-shrink-0'>
                  <span className='text-blue-600 dark:text-blue-400 font-bold text-lg'>
                    Q
                  </span>
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
                    Total Questions
                  </p>
                  <p className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white'>
                    {totalCount}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700'>
            <CardContent className='p-5 sm:p-6'>
              <div className='flex items-center space-x-4'>
                <div className='w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center flex-shrink-0'>
                  <span className='text-green-600 dark:text-green-400 font-bold text-lg'>
                    C
                  </span>
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
                    Categories
                  </p>
                  <p className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white'>
                    {allCategories.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700'>
            <CardContent className='p-5 sm:p-6'>
              <div className='flex items-center space-x-4'>
                <div className='w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center flex-shrink-0'>
                  <span className='text-purple-600 dark:text-purple-400 font-bold text-lg'>
                    T
                  </span>
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
                    Topics
                  </p>
                  <p className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white'>
                    {topicsData.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700'>
            <CardContent className='p-5 sm:p-6'>
              <div className='flex items-center space-x-4'>
                <div className='w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-xl flex items-center justify-center flex-shrink-0'>
                  <span className='text-orange-600 dark:text-orange-400 font-bold text-lg'>
                    F
                  </span>
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
                    Filtered Results
                  </p>
                  <p className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white'>
                    {displayQuestions.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Simple Search */}
        <Card className='mb-6 sm:mb-8 border border-gray-200 dark:border-gray-700'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold'>Search Questions</CardTitle>
          </CardHeader>
          <CardContent className='pt-0'>
            <div className='flex space-x-2'>
              <Input
                placeholder='Search questions by title, content, tags...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='flex-1 h-11'
              />
            </div>
          </CardContent>
        </Card>

        {/* Questions List */}
        <Card className='border border-gray-200 dark:border-gray-700 shadow-sm'>
          <CardHeader className='pb-4 border-b border-gray-200 dark:border-gray-700'>
            <CardTitle className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
              <div className='flex items-center gap-4'>
                {displayQuestions.length > 0 && (
                  <div className='flex items-center gap-3'>
                    <Checkbox
                      checked={selectedQuestionIds.size === displayQuestions.length && displayQuestions.length > 0}
                      onCheckedChange={handleSelectAll}
                      className='h-5 w-5'
                    />
                    <span className='text-sm text-gray-600 dark:text-gray-400'>
                      {selectedQuestionIds.size > 0 
                        ? `${selectedQuestionIds.size} selected`
                        : 'Select all'}
                    </span>
                  </div>
                )}
                <span className='text-lg sm:text-xl font-semibold'>
                  Questions <span className='text-gray-500 dark:text-gray-400 font-normal'>({displayQuestions.length})</span>
                </span>
              </div>
              <div className='flex items-center space-x-2 sm:space-x-3'>
                {selectedQuestionIds.size > 0 && (
                  <Button
                    variant='destructive'
                    size='sm'
                    className='flex items-center space-x-2 h-9 sm:h-10 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white dark:text-white shadow-sm dark:shadow-md'
                    onClick={() => setIsBulkDeleteModalOpen(true)}
                  >
                    <Trash2 className='w-4 h-4' />
                    <span className='hidden sm:inline'>Delete Selected ({selectedQuestionIds.size})</span>
                    <span className='sm:hidden'>Delete ({selectedQuestionIds.size})</span>
                  </Button>
                )}
                <Button
                  variant='outline'
                  size='sm'
                  className='flex items-center space-x-2 h-9 sm:h-10 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500'
                  onClick={() => setIsBulkUploadModalOpen(true)}
                >
                  <Upload className='w-4 h-4' />
                  <span className='hidden sm:inline'>Bulk Upload</span>
                  <span className='sm:hidden'>Upload</span>
                </Button>
                <Button
                  size='sm'
                  className='flex items-center space-x-2 h-9 sm:h-10 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white dark:text-white shadow-sm dark:shadow-md'
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  <Plus className='w-4 h-4' />
                  <span className='hidden sm:inline'>Add New Question</span>
                  <span className='sm:hidden'>Add</span>
                </Button>
              </div>
            </CardTitle>
          </CardHeader>

          {/* Pagination Before Questions List */}
          {totalPages > 1 && (
            <div className='px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30'>
              <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                <div className='text-xs sm:text-sm text-gray-700 dark:text-gray-300'>
                  Showing{' '}
                  <span className='font-medium'>
                    {Math.min((currentPage - 1) * pageSize + 1, totalCount)} to{' '}
                    {Math.min(currentPage * pageSize, totalCount)}
                  </span>{' '}
                  of <span className='font-medium'>{totalCount}</span> questions
                </div>
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto'>
                  {/* Per Page Select */}
                  <div className='flex items-center space-x-2'>
                    <span className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap'>
                      Show:
                    </span>
                    <Select
                      value={pageSize.toString()}
                      onValueChange={value => setPageSize(parseInt(value))}
                    >
                      <SelectTrigger className='w-20 h-9'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='5'>5</SelectItem>
                        <SelectItem value='10'>10</SelectItem>
                        <SelectItem value='20'>20</SelectItem>
                        <SelectItem value='50'>50</SelectItem>
                        <SelectItem value='100'>100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Navigation Buttons */}
                  <div className='flex items-center space-x-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      className='h-9'
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className='h-4 w-4' />
                    </Button>
                    <span className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 px-2 whitespace-nowrap'>
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant='outline'
                      size='sm'
                      className='h-9'
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage >= totalPages}
                    >
                      <ChevronRight className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <CardContent className='p-0'>
            <div className='overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800'>
              {displayQuestions.length === 0 ? (
                <div className='text-center py-16 px-4'>
                  <BookOpen className='w-16 h-16 text-gray-400 mx-auto mb-4' />
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                    No questions found
                  </h3>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
                    {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first question'}
                  </p>
                  {!searchTerm && (
                    <Button
                      onClick={() => setIsCreateModalOpen(true)}
                      className='mt-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white dark:text-white shadow-sm dark:shadow-md'
                    >
                      <Plus className='w-4 h-4 mr-2' />
                      Add New Question
                    </Button>
                  )}
                </div>
              ) : (
                <div className='divide-y divide-gray-200 dark:divide-gray-700'>
                  {displayQuestions.map(question => (
                    <div
                      key={question.id}
                      className={`p-4 sm:p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                        selectedQuestionIds.has(question.id)
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500'
                          : ''
                      }`}
                    >
                      <div className='flex items-start justify-between gap-4'>
                        <div className='flex items-start gap-3 flex-1 min-w-0'>
                          <Checkbox
                            checked={selectedQuestionIds.has(question.id)}
                            onCheckedChange={() => handleSelectQuestion(question.id)}
                            className='mt-1 h-5 w-5 flex-shrink-0'
                          />
                          <div className='flex-1 min-w-0 pr-2'>
                          <h4 className='text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                            {question.title}
                          </h4>
                          <p className='text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3'>
                            {question.content}
                          </p>
                          <div className='flex flex-wrap gap-1.5 sm:gap-2'>
                            {/* Topics Badges */}
                            {(() => {
                              // Handle both array and single object formats
                              const topics = (question as any).topics;
                              const topicsArray = Array.isArray(topics) ? topics : (topics && typeof topics === 'object' ? [topics] : []);
                              
                              return topicsArray.length > 0 ? (
                                topicsArray.map(
                                  (topic: any, index: number) => (
                                    <Badge
                                      key={`${question.id}-topic-${index}`}
                                      variant={
                                        topic.is_primary ? 'default' : 'outline'
                                      }
                                      className={`${
                                        topic.is_primary
                                          ? 'bg-purple-600 text-white'
                                          : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                      }`}
                                    >
                                      {topic.is_primary && '⭐ '}Topic:{' '}
                                      {topic.name || topic.title || 'Unknown Topic'}
                                    </Badge>
                                  )
                                )
                              ) : (
                                <Badge
                                  variant='outline'
                                  className='bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                                >
                                  Topic: No Topic
                                </Badge>
                              );
                            })()}

                            {/* Categories Badges */}
                            {(() => {
                              // Handle both array and single object formats
                              const categories = (question as any).categories;
                              const categoriesArray = Array.isArray(categories) ? categories : (categories && typeof categories === 'object' ? [categories] : []);
                              
                              return categoriesArray.length > 0 ? (
                                categoriesArray.map(
                                  (category: any, index: number) => (
                                    <Badge
                                      key={`${question.id}-category-${index}`}
                                      variant={
                                        category.is_primary
                                          ? 'default'
                                          : 'secondary'
                                      }
                                      className={`${
                                        category.is_primary
                                          ? 'bg-green-600 text-white'
                                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                      }`}
                                    >
                                      {category.is_primary && '⭐ '}Category:{' '}
                                      {category.name || category.title || 'Unknown Category'}
                                    </Badge>
                                  )
                                )
                              ) : (
                                <Badge
                                  variant='outline'
                                  className='bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                                >
                                  Category: No Category
                                </Badge>
                              );
                            })()}

                            {/* Card Badge */}
                            {((question as any).learning_card || (question as any).learning_cards) ? (
                              <Badge
                                variant='secondary'
                                className='bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              >
                                Card: {((question as any).learning_card?.title || (question as any).learning_cards?.title || 'Unknown Card')}
                              </Badge>
                            ) : (
                              <Badge
                                variant='outline'
                                className='bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                              >
                                Card: No Card
                              </Badge>
                            )}

                            {/* Difficulty Badge */}
                            {question.difficulty && (
                              <Badge
                                variant={
                                  question.difficulty === 'beginner'
                                    ? 'default'
                                    : question.difficulty === 'intermediate'
                                      ? 'outline'
                                      : 'destructive'
                                }
                              >
                                {question.difficulty}
                              </Badge>
                            )}

                            {/* Type Badge */}
                            {question.type && (
                              <Badge variant='outline'>{question.type}</Badge>
                            )}
                          </div>
                          </div>
                        </div>
                        <div className='flex flex-col sm:flex-row gap-2 flex-shrink-0'>
                          <Button
                            variant='outline'
                            size='sm'
                            className='h-9 w-9 sm:w-auto sm:px-3 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500'
                            onClick={() => openViewModal(question)}
                            title='View question details'
                          >
                            <Eye className='w-4 h-4 sm:mr-2' />
                            <span className='hidden sm:inline'>View</span>
                          </Button>
                          <Button
                            variant='outline'
                            size='sm'
                            className='h-9 w-9 sm:w-auto sm:px-3 border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-400 dark:hover:border-blue-500'
                            onClick={() => openEditModal(question)}
                            title='Edit question'
                          >
                            <Edit className='w-4 h-4 sm:mr-2' />
                            <span className='hidden sm:inline'>Edit</span>
                          </Button>
                          <Button
                            variant='destructive'
                            size='sm'
                            className='h-9 w-9 sm:w-auto sm:px-3 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white dark:text-white border-red-600 dark:border-red-700'
                            onClick={() => openDeleteModal(question)}
                            title='Delete question'
                          >
                            <Trash2 className='w-4 h-4 sm:mr-2' />
                            <span className='hidden sm:inline'>Delete</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bottom Pagination */}
        {totalCount > pageSize && (
          <div className='mt-6 sm:mt-8 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm'>
            <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
              <div className='text-xs sm:text-sm text-gray-700 dark:text-gray-300'>
                Showing <span className='font-medium'>{Math.min((currentPage - 1) * pageSize + 1, totalCount)}</span> to{' '}
                <span className='font-medium'>{Math.min(currentPage * pageSize, totalCount)}</span> of{' '}
                <span className='font-medium'>{totalCount}</span> questions
              </div>
              <div className='flex items-center space-x-2'>
                <Button
                  variant='outline'
                  size='sm'
                  className='h-9'
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className='h-4 w-4' />
                </Button>
                <span className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 px-3'>
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant='outline'
                  size='sm'
                  className='h-9'
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                >
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* View Question Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Question Details</DialogTitle>
          </DialogHeader>
          {selectedQuestion && (
            <QuestionForm
              initialData={selectedQuestion}
              onSubmit={() => {}} // No-op for view mode
              onCancel={() => setIsViewModalOpen(false)}
              cards={cards}
              allCategories={allCategories}
              allTags={[]}
              categoriesData={categoriesData}
              topicsData={topicsData}
              disabled={true}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Question Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Edit Question</DialogTitle>
          </DialogHeader>
          {selectedQuestion && (
            <QuestionForm
              initialData={selectedQuestion}
              onSubmit={handleUpdateQuestion}
              onCancel={() => setIsEditModalOpen(false)}
              cards={cards}
              allCategories={allCategories}
              allTags={[]}
              categoriesData={categoriesData}
              topicsData={topicsData}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Create Question Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Create New Question</DialogTitle>
          </DialogHeader>
          <QuestionForm
            onSubmit={handleCreateQuestion}
            onCancel={() => setIsCreateModalOpen(false)}
            cards={cards}
            allCategories={allCategories}
            allTags={[]}
            categoriesData={categoriesData}
            topicsData={topicsData}
          />
        </DialogContent>
      </Dialog>

      {/* Bulk Upload Modal */}
      <Dialog open={isBulkUploadModalOpen} onOpenChange={setIsBulkUploadModalOpen}>
        <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Bulk Upload Questions</DialogTitle>
            <DialogDescription>
              Upload multiple questions at once using CSV or JSON format. Preview will show the first 3 questions.
            </DialogDescription>
          </DialogHeader>
          <BulkUploadForm
            onUpload={handleBulkUpload}
            onCancel={() => {
              setIsBulkUploadModalOpen(false);
              setBulkUploadError(null);
              setBulkUploadSuccess(null);
              setBulkUploadProgress(null);
            }}
            loading={bulkUploadLoading}
            error={bulkUploadError}
            success={bulkUploadSuccess}
            progress={bulkUploadProgress}
          />
        </DialogContent>
      </Dialog>

      {/* Bulk Delete Confirmation Modal */}
      <Dialog open={isBulkDeleteModalOpen} onOpenChange={setIsBulkDeleteModalOpen}>
        <DialogContent className='max-w-lg'>
          <DialogHeader>
            <div className='flex items-center gap-3 mb-2'>
              <div className='flex-shrink-0 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center'>
                <AlertTriangle className='w-6 h-6 text-red-600 dark:text-red-400' />
              </div>
              <DialogTitle className='text-xl font-bold text-gray-900 dark:text-white'>
                Delete Selected Questions
              </DialogTitle>
            </div>
            <DialogDescription className='text-base text-gray-600 dark:text-gray-400 pt-2'>
              Are you sure you want to delete <strong className='text-red-600 dark:text-red-400'>{selectedQuestionIds.size}</strong> question{selectedQuestionIds.size !== 1 ? 's' : ''}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className='my-4 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg'>
            <p className='text-sm font-semibold text-red-800 dark:text-red-200 mb-2'>
              ⚠️ Warning: This will permanently delete the following questions:
            </p>
            <div className='max-h-48 overflow-y-auto space-y-2'>
              {Array.from(selectedQuestionIds).slice(0, 10).map((questionId) => {
                const question = displayQuestions.find((q) => q.id === questionId);
                return (
                  <div
                    key={questionId}
                    className='p-2 bg-white dark:bg-gray-800 rounded border border-red-200 dark:border-red-800'
                  >
                    <p className='text-sm font-medium text-gray-900 dark:text-white'>
                      {question?.title || `Question ${questionId.substring(0, 8)}...`}
                    </p>
                    {question?.type && (
                      <Badge variant='outline' className='text-xs mt-1'>
                        {question.type}
                      </Badge>
                    )}
                  </div>
                );
              })}
              {selectedQuestionIds.size > 10 && (
                <p className='text-xs text-gray-600 dark:text-gray-400 italic text-center pt-2'>
                  ... and {selectedQuestionIds.size - 10} more question{selectedQuestionIds.size - 10 !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className='gap-3 pt-4'>
            <Button
              variant='outline'
              onClick={() => setIsBulkDeleteModalOpen(false)}
              disabled={bulkDeleteLoading}
              className='border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500'
            >
              Cancel
            </Button>
            <Button
              variant='destructive'
              onClick={handleBulkDelete}
              disabled={bulkDeleteLoading}
              className='bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white dark:text-white shadow-sm dark:shadow-md'
            >
              {bulkDeleteLoading ? (
                <>
                  <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className='w-4 h-4 mr-2' />
                  Delete {selectedQuestionIds.size} Question{selectedQuestionIds.size !== 1 ? 's' : ''}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className='max-w-lg'>
          <DialogHeader>
            <div className='flex items-center gap-3 mb-2'>
              <div className='flex-shrink-0 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center'>
                <AlertTriangle className='w-6 h-6 text-red-600 dark:text-red-400' />
              </div>
              <div>
                <DialogTitle className='text-xl font-bold text-gray-900 dark:text-white'>
                  Delete Question
                </DialogTitle>
                <DialogDescription className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
                  This action cannot be undone
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          <div className='py-4'>
            <p className='text-sm text-gray-700 dark:text-gray-300 mb-4'>
              Are you sure you want to delete this question? All associated data will be permanently removed.
            </p>
            
            {questionToDelete && (
              <div className='bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 rounded-lg p-4 border-2 border-red-200 dark:border-red-800/50'>
                <div className='flex items-start gap-3'>
                  <div className='flex-shrink-0 mt-0.5'>
                    <BookOpen className='w-5 h-5 text-red-600 dark:text-red-400' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <h4 className='font-semibold text-gray-900 dark:text-white mb-1.5 text-base'>
                      {questionToDelete.title}
                    </h4>
                    <p className='text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-3'>
                      {questionToDelete.content || questionToDelete.title}
                    </p>
                    <div className='flex flex-wrap gap-2 mt-2'>
                      {questionToDelete.type && (
                        <span className='inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'>
                          {questionToDelete.type}
                        </span>
                      )}
                      {questionToDelete.difficulty && (
                        <span className='inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'>
                          {questionToDelete.difficulty}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className='gap-3 pt-2 sm:flex-row sm:justify-end'>
            <Button
              variant='outline'
              onClick={closeDeleteModal}
              disabled={deleteLoading}
              className='w-full sm:w-auto border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 disabled:opacity-50 transition-colors'
            >
              Cancel
            </Button>
            <Button
              variant='destructive'
              onClick={handleDeleteQuestion}
              disabled={deleteLoading}
              className='w-full sm:w-auto bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white dark:text-white shadow-sm dark:shadow-md disabled:opacity-50 transition-colors font-medium'
            >
              {deleteLoading ? (
                <>
                  <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className='w-4 h-4 mr-2' />
                  Delete Question
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

interface QuestionFormProps {
  initialData?: Question | undefined;
  onSubmit: (question: Partial<Question>) => void;
  onCancel: () => void;
  cards: any[];
  allCategories: string[];
  allTags: string[];
  categoriesData: any[];
  topicsData: any[];
  disabled?: boolean; // New prop for view mode
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  cards,
  allCategories,
  allTags,
  categoriesData,
  topicsData,
  disabled = false,
}) => {
  const [formData, setFormData] = useState<Partial<Question>>(
    initialData || {
      title: '',
      type: 'multiple-choice',
      difficulty: 'beginner',
      is_active: true,
      options: [],
      sampleAnswers: [],
      tags: [],
      points: 1,
      timeLimit: 60,
      explanation: '',
    }
  );

  useEffect(() => {
    if (initialData) {
      // Extract category, topic, and learningCardId from initialData
      // Handle both direct properties and nested relationship objects
      const categoryName = (initialData as any).category || 
        ((initialData as any).categories && Array.isArray((initialData as any).categories) && (initialData as any).categories[0]?.name) ||
        ((initialData as any).categories && typeof (initialData as any).categories === 'object' && (initialData as any).categories.name) ||
        '';
      
      const topicName = (initialData as any).topic || 
        ((initialData as any).topics && Array.isArray((initialData as any).topics) && (initialData as any).topics[0]?.name) ||
        ((initialData as any).topics && typeof (initialData as any).topics === 'object' && (initialData as any).topics.name) ||
        '';
      
      const learningCardId = (initialData as any).learningCardId || 
        (initialData as any).learning_card_id ||
        ((initialData as any).learning_card?.id) ||
        ((initialData as any).learning_cards?.id) ||
        '';
      
      console.log('📝 Initializing form with:', { categoryName, topicName, learningCardId, initialData });
      
      setFormData({
        ...initialData,
        options: initialData.options || [],
        sampleAnswers: initialData.sampleAnswers || [],
        tags: initialData.tags || [],
        explanation: initialData.explanation || '',
        category: categoryName,
        topic: topicName,
        learningCardId: learningCardId,
      });
    }
  }, [initialData]);

  // Filter topics based on selected category
  const filteredTopics = useMemo(() => {
    if (!formData.category) {
      console.log('🔍 No category selected, returning empty topics');
      return [];
    }
    const selectedCategory = categoriesData.find(
      (cat: any) => (cat.name || cat.title) === formData.category
    );
    if (!selectedCategory) {
      console.log('⚠️ Category not found:', formData.category, 'Available categories:', categoriesData.map((c: any) => c.name || c.title));
      return [];
    }
    const filtered = topicsData.filter(
      (topic: any) => topic.categoryId === selectedCategory.id || topic.category_id === selectedCategory.id
    );
    
    // Deduplicate topics by name to prevent duplicate keys and values
    // Use a Map to track unique topics by name (since SelectItem value uses name)
    const uniqueTopicsMap = new Map<string, any>();
    
    filtered.forEach((topic: any, index: number) => {
      const topicName = (topic.name || topic.title || '').trim();
      
      if (!topicName) {
        console.warn('⚠️ Topic with no name/title found:', topic);
        return; // Skip topics without names
      }
      
      // Normalize the name for comparison (lowercase, trim)
      const normalizedName = topicName.toLowerCase().trim();
      
      // Use normalized name as the key to ensure no duplicate names appear
      // If we already have a topic with this name, keep the first one (or the one with an ID)
      if (!uniqueTopicsMap.has(normalizedName)) {
        uniqueTopicsMap.set(normalizedName, topic);
      } else {
        // If duplicate name found, prefer the one with an ID
        const existing = uniqueTopicsMap.get(normalizedName);
        if (topic.id && !existing.id) {
          // New topic has ID, existing doesn't - replace it
          uniqueTopicsMap.set(normalizedName, topic);
          console.warn('⚠️ Duplicate topic name found, keeping topic with ID:', topicName, topic);
        } else if (existing.id && !topic.id) {
          // Existing has ID, new doesn't - keep existing
          console.warn('⚠️ Duplicate topic name found, keeping existing topic with ID:', topicName, existing);
        } else {
          // Both have IDs or both don't - log warning but keep first
          // This ensures we only have one topic per name
          console.warn('⚠️ Duplicate topic name found, keeping first occurrence:', topicName, { existing, new: topic, index });
        }
      }
    });
    
    const uniqueTopics = Array.from(uniqueTopicsMap.values());
    
    console.log('🔍 Filtered topics for category', formData.category, ':', uniqueTopics.length, 'topics (deduplicated from', filtered.length, ')');
    return uniqueTopics;
  }, [formData.category, categoriesData, topicsData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (disabled) return; // Prevent changes in view mode
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSelectChange = (name: keyof Question, value: string) => {
    if (disabled) return; // Prevent changes in view mode
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return; // Prevent submission in view mode
    // Log form data before submission for debugging
    console.log('📤 Submitting question form:', {
      title: formData.title,
      category: formData.category,
      topic: formData.topic,
      learningCardId: formData.learningCardId,
      type: formData.type,
      difficulty: formData.difficulty,
    });
    onSubmit(formData);
  };

  const questionTypes = ['multiple-choice', 'open-ended', 'true-false', 'code'];
  const difficulties = ['beginner', 'intermediate', 'advanced'];

  return (
    <form onSubmit={handleSubmit} className='space-y-6 p-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='title'>Title <span className='text-red-500'>*</span></Label>
          <Input
            id='title'
            name='title'
            value={formData.title || ''}
            onChange={handleChange}
            required
            disabled={disabled}
            className='border-gray-300 dark:border-gray-600'
          />
        </div>
        <div>
          <Label htmlFor='type'>Type <span className='text-red-500'>*</span></Label>
          <Select
            value={formData.type || 'multiple-choice'}
            onValueChange={value => handleSelectChange('type', value)}
            disabled={disabled}
          >
            <SelectTrigger className='border-gray-300 dark:border-gray-600' disabled={disabled}>
              <SelectValue placeholder='Select Type' />
            </SelectTrigger>
            <SelectContent className='z-[110]'>
              {questionTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() +
                    type.slice(1).replace('-', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor='category'>Category <span className='text-red-500'>*</span></Label>
          <Select
            value={formData.category || ''}
            onValueChange={value => {
              handleSelectChange('category', value);
              // Clear topic when category changes
              setFormData((prev: any) => ({ ...prev, topic: undefined }));
            }}
            disabled={disabled}
          >
            <SelectTrigger className='border-gray-300 dark:border-gray-600' disabled={disabled}>
              <SelectValue placeholder='Select Category' />
            </SelectTrigger>
            <SelectContent className='z-[110]'>
              {categoriesData.length === 0 ? (
                <SelectItem value='loading' disabled>
                  Loading categories...
                </SelectItem>
              ) : (
                categoriesData.map((category: any) => (
                  <SelectItem key={category.id} value={category.name || category.title}>
                    {category.name || category.title}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor='topic'>Topic <span className='text-gray-500 dark:text-gray-400 text-xs font-normal'>(Optional)</span></Label>
          <Select
            value={formData.topic || ''}
            onValueChange={value => handleSelectChange('topic', value)}
            disabled={disabled || !formData.category || filteredTopics.length === 0}
          >
            <SelectTrigger className='border-gray-300 dark:border-gray-600 disabled:opacity-50' disabled={disabled || !formData.category || filteredTopics.length === 0}>
              <SelectValue placeholder={!formData.category ? 'Select category first' : 'Select Topic (Optional)'} />
            </SelectTrigger>
            <SelectContent className='z-[110]'>
              {filteredTopics.length > 0 ? (
                filteredTopics.map((topic: any, index: number) => {
                  // Create a truly unique key using ID, name, and index
                  const topicId = topic.id || `no-id-${index}`;
                  const topicName = (topic.name || topic.title || `no-name-${index}`).trim();
                  // Use a combination that ensures uniqueness even if names are the same
                  const uniqueKey = `topic-${topicId}-${topicName.replace(/\s+/g, '-')}-${index}`;
                  
                  return (
                    <SelectItem key={uniqueKey} value={topicName}>
                      {topicName}
                    </SelectItem>
                  );
                })
              ) : (
                <SelectItem value='no-topics' disabled>
                  {!formData.category ? 'Select category first' : 'No topics available for this category'}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor='difficulty'>Difficulty <span className='text-red-500'>*</span></Label>
          <Select
            value={formData.difficulty || 'beginner'}
            onValueChange={value => handleSelectChange('difficulty', value)}
            disabled={disabled}
          >
            <SelectTrigger className='border-gray-300 dark:border-gray-600' disabled={disabled}>
              <SelectValue placeholder='Select Difficulty' />
            </SelectTrigger>
            <SelectContent className='z-[110]'>
              {difficulties.map(difficulty => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor='learningCardId'>Learning Card <span className='text-gray-500 dark:text-gray-400 text-xs font-normal'>(Optional)</span></Label>
          <Select
            value={formData.learningCardId || ''}
            onValueChange={value => handleSelectChange('learningCardId', value === 'none' ? '' : value)}
            disabled={disabled}
          >
            <SelectTrigger className='border-gray-300 dark:border-gray-600' disabled={disabled}>
              <SelectValue placeholder='Select Learning Card (Optional)' />
            </SelectTrigger>
            <SelectContent className='z-[110] max-h-[300px]'>
              <SelectItem value='none' className='text-gray-500 dark:text-gray-400 italic'>
                None (No Learning Card)
              </SelectItem>
              {cards.length === 0 ? (
                <SelectItem value='loading' disabled>
                  Loading cards...
                </SelectItem>
              ) : (
                cards.map(card => (
                  <SelectItem key={card.id} value={card.id}>
                    {card.title}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor='points'>Points</Label>
          <Input
            id='points'
            name='points'
            type='number'
            value={formData.points || 1}
            onChange={handleChange}
            disabled={disabled}
            className='border-gray-300 dark:border-gray-600'
          />
        </div>
      </div>

      {/* Options Section */}
      <div className='space-y-3'>
        <div className='flex items-center justify-between'>
          <Label>Options</Label>
          {!disabled && (
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={() => {
                const newOptions = [...(formData.options || [])];
                newOptions.push({
                  id: `o${newOptions.length + 1}`,
                  text: '',
                  isCorrect: false,
                  explanation: '',
                });
                setFormData((prev: any) => ({ ...prev, options: newOptions }));
              }}
              className='flex items-center gap-2'
            >
              <Plus className='w-4 h-4' />
              Add Option
            </Button>
          )}
        </div>
        
        {formData.options && formData.options.length > 0 ? (
          <div className='space-y-3'>
            {formData.options.map((option: any, index: number) => (
              <div
                key={option.id || index}
                className='flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
              >
                <div className='flex items-center gap-2 h-10 mt-1'>
                  <Checkbox
                    id={`isCorrect-${index}`}
                    checked={option.isCorrect || false}
                    onCheckedChange={(checked) => {
                      if (disabled) return;
                      const newOptions = [...(formData.options || [])];
                      newOptions[index] = {
                        ...newOptions[index],
                        isCorrect: !!checked,
                      };
                      setFormData((prev: any) => ({ ...prev, options: newOptions }));
                    }}
                    disabled={disabled}
                    className='w-5 h-5'
                  />
                  <Label htmlFor={`isCorrect-${index}`} className='text-sm font-medium cursor-pointer'>
                    Is Correct
                  </Label>
                </div>
                <div className='flex-1'>
                  <Input
                    placeholder={`Option ${index + 1} text`}
                    value={option.text || ''}
                    onChange={(e) => {
                      if (disabled) return;
                      const newOptions = [...(formData.options || [])];
                      newOptions[index] = {
                        ...newOptions[index],
                        text: e.target.value,
                      };
                      setFormData((prev: any) => ({ ...prev, options: newOptions }));
                    }}
                    disabled={disabled}
                    className='w-full border-gray-300 dark:border-gray-600'
                  />
                </div>
                {!disabled && (
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => {
                      const newOptions = [...(formData.options || [])];
                      newOptions.splice(index, 1);
                      setFormData((prev: any) => ({ ...prev, options: newOptions }));
                    }}
                    className='text-red-500 hover:text-red-700 dark:hover:text-red-400'
                  >
                    <Trash2 className='w-4 h-4' />
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className='text-sm text-gray-500 dark:text-gray-400 text-center py-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg'>
            No options added. Click &quot;Add Option&quot; to add options.
          </div>
        )}
      </div>

      {/* Explanation */}
      <div>
        <Label htmlFor='explanation'>Explanation</Label>
        <Textarea
          id='explanation'
          name='explanation'
          value={formData.explanation || ''}
          onChange={handleChange}
          rows={4}
          disabled={disabled}
          placeholder='Provide an explanation for the correct answer...'
          className='border-gray-300 dark:border-gray-600'
        />
      </div>

      <div className='flex items-center space-x-2'>
        <Checkbox
          id='isActive'
          name='isActive'
          checked={formData.is_active || false}
          onCheckedChange={checked => {
            if (disabled) return;
            setFormData((prev: any) => ({ ...prev, is_active: !!checked }));
          }}
          disabled={disabled}
        />
        <Label htmlFor='isActive'>Is Active</Label>
      </div>

      <DialogFooter className='gap-3 pt-4'>
        {disabled ? (
          <Button 
            variant='outline' 
            onClick={onCancel}
            className='border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500'
          >
            Close
          </Button>
        ) : (
          <>
            <Button 
              variant='outline' 
              onClick={onCancel}
              className='border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500'
            >
              Cancel
            </Button>
            <Button 
              type='submit'
              className='bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white dark:text-white shadow-sm dark:shadow-md'
            >
              {initialData ? 'Save Changes' : 'Create Question'}
            </Button>
          </>
        )}
      </DialogFooter>
    </form>
  );
};

interface BulkUploadFormProps {
  onUpload: (file: File) => void;
  onCancel: () => void;
  loading: boolean;
  error: string | null;
  success: string | null;
  progress: { current: number; total: number } | null;
}

const BulkUploadForm: React.FC<BulkUploadFormProps> = ({
  onUpload,
  onCancel,
  loading,
  error,
  success,
  progress,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewQuestions, setPreviewQuestions] = useState<any[]>([]);
  const [totalQuestionsCount, setTotalQuestionsCount] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Reset form when modal closes (when error/success are cleared)
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

      // Store total count and show preview of first 3 questions only
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
        // File type validation - error will be shown via parent's error state
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
      // Error handling for invalid file types is done in parseFile
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
            <Badge variant='secondary' className='text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'>
              {totalQuestionsCount} Total
            </Badge>
          </div>
          
          <div className='max-h-[500px] overflow-y-auto space-y-3 pr-2'>
          
            {previewQuestions.map((question, qIndex) => (
              <div
                key={qIndex}
                className='p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow space-y-3'
              >
              {/* Question Header */}
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

              {/* Options with Checkboxes */}
              {question.options && Array.isArray(question.options) && question.options.length > 0 && (
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
                          <p className={`text-sm ${
                            option.isCorrect
                              ? 'text-green-800 dark:text-green-200 font-medium'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
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

              {/* Explanation */}
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

              {/* Hints */}
              {question.hints && Array.isArray(question.hints) && question.hints.length > 0 && (
                <div className='pt-2 border-t border-gray-200 dark:border-gray-700'>
                  <p className='text-xs font-medium text-gray-700 dark:text-gray-300 mb-1'>
                    Hints:
                  </p>
                  <ul className='list-disc list-inside space-y-1'>
                    {question.hints.map((hint: string, hIndex: number) => (
                      <li key={hIndex} className='text-xs text-gray-600 dark:text-gray-400'>
                        {hint}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Points */}
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
            <Badge variant='secondary' className='bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'>
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
            <p className='font-medium mb-1'><strong>JSON Format:</strong> Array of question objects</p>
            <p className='ml-2'><strong>Required fields:</strong> title, content</p>
            <p className='ml-2'><strong>Optional fields:</strong></p>
            <ul className='ml-6 list-disc space-y-0.5'>
              <li>type: &quot;multiple-choice&quot; | &quot;open-ended&quot; | &quot;true-false&quot; | &quot;code&quot;</li>
              <li>difficulty: &quot;beginner&quot; | &quot;intermediate&quot; | &quot;advanced&quot;</li>
              <li>category: string (e.g., &quot;HTML&quot;, &quot;CSS&quot;)</li>
              <li>topic: string (e.g., &quot;HTML5 Semantics&quot;)</li>
              <li>learningCardId: string</li>
              <li>isActive: boolean (default: true)</li>
              <li>tags: string[]</li>
              <li>explanation: string</li>
              <li>hints: string[]</li>
              <li>points: number</li>
              <li>options: Array of objects with id, text, isCorrect, explanation</li>
              <li>answer: string</li>
              <li>metadata: object</li>
            </ul>
          </div>
          <div className='mt-2 pt-2 border-t border-gray-300 dark:border-gray-700'>
            <p className='font-medium mb-1'><strong>CSV Format:</strong> First row contains headers</p>
            <p className='ml-2'>Required columns: title, content</p>
            <p className='ml-2'>Optional columns: type, difficulty, category, topic, learningCardId, isActive, tags, explanation, hints, points, answer</p>
          </div>
          <div className='mt-2 pt-2 border-t border-gray-300 dark:border-gray-700'>
            <p className='text-xs italic'>Note: Fields can be in camelCase (isActive, learningCardId) or snake_case (is_active, learning_card_id). The system will automatically convert them.</p>
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
};
