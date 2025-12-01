'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@elzatona/shared-components';
import { Loader2 } from 'lucide-react';
import { useToast, ToastContainer } from '@elzatona/shared-components';
import { UnifiedQuestion } from '@elzatona/shared-types';
import { StatsCards } from './components/StatsCards';
import { SearchBar } from './components/SearchBar';
import { FiltersCard } from './components/FiltersCard';
import { QuestionsList } from './components/QuestionsList';
import { BottomPagination } from './components/BottomPagination';
import { ViewQuestionModal } from './components/ViewQuestionModal';
import { EditQuestionModal } from './components/EditQuestionModal';
import { CreateQuestionModal } from './components/CreateQuestionModal';
import { DeleteQuestionModal } from './components/DeleteQuestionModal';
import { BulkDeleteModal } from './components/BulkDeleteModal';
import { BulkUploadModal } from './components/BulkUploadModal';

type Question = UnifiedQuestion;

export default function AdminContentQuestionsPage() {
  // Toast notifications
  const { showSuccess, showError, toasts, removeToast } = useToast();

  // Local state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

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

  // Build filter query params
  const buildFilterParams = () => {
    const params = new URLSearchParams();
    params.append('page', currentPage.toString());
    params.append('pageSize', pageSize.toString());
    
    // Convert "all" to empty string (no filter)
    if (selectedCategory && selectedCategory !== 'all') params.append('category', selectedCategory);
    if (selectedTopic && selectedTopic !== 'all') params.append('topic', selectedTopic);
    if (selectedType && selectedType !== 'all') params.append('type', selectedType);
    if (selectedDifficulty && selectedDifficulty !== 'all') params.append('difficulty', selectedDifficulty);
    if (selectedStatus && selectedStatus !== 'all') params.append('isActive', selectedStatus);
    
    return params.toString();
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedTopic, selectedType, selectedDifficulty, selectedStatus]);

  // Reset topic when category changes
  useEffect(() => {
    if (!selectedCategory || selectedCategory === 'all') {
      setSelectedTopic('all');
    }
  }, [selectedCategory]);

  // Filter change handlers - convert "all" to empty string for state
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === 'all' ? '' : value);
  };

  const handleTopicChange = (value: string) => {
    setSelectedTopic(value === 'all' ? '' : value);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value === 'all' ? '' : value);
  };

  const handleDifficultyChange = (value: string) => {
    setSelectedDifficulty(value === 'all' ? '' : value);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value === 'all' ? '' : value);
  };

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedTopic('');
    setSelectedType('');
    setSelectedDifficulty('');
    setSelectedStatus('');
    setCurrentPage(1);
  };

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      try {
        const filterParams = buildFilterParams();
        console.log('🔍 Fetching questions...', { currentPage, pageSize, filterParams });
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/questions/unified?${filterParams}`,
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
  }, [currentPage, pageSize, selectedCategory, selectedTopic, selectedType, selectedDifficulty, selectedStatus]);

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
  
  // Clear selection when search term or filters change
  useEffect(() => {
    setSelectedQuestionIds(new Set());
  }, [searchTerm, selectedCategory, selectedTopic, selectedType, selectedDifficulty, selectedStatus]);

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
          // Normalize difficulty to lowercase and validate
          let normalizedDifficulty = 'beginner'; // default
          if (q.difficulty) {
            const difficultyLower = String(q.difficulty).toLowerCase().trim();
            // Map common variations to valid values
            if (difficultyLower === 'beginner' || difficultyLower === 'easy' || difficultyLower === 'basic') {
              normalizedDifficulty = 'beginner';
            } else if (difficultyLower === 'intermediate' || difficultyLower === 'medium' || difficultyLower === 'moderate') {
              normalizedDifficulty = 'intermediate';
            } else if (difficultyLower === 'advanced' || difficultyLower === 'hard' || difficultyLower === 'expert' || difficultyLower === 'difficult') {
              normalizedDifficulty = 'advanced';
            } else {
              // If it doesn't match, use default
              console.warn(`Invalid difficulty value "${q.difficulty}", defaulting to "beginner"`);
              normalizedDifficulty = 'beginner';
            }
          }
          
          // CRITICAL: Preserve code field - check both camelCase and snake_case
          const codeValue = q.code !== undefined ? q.code : (q.code_field !== undefined ? q.code_field : undefined);
          
          // Log code field presence for debugging
          if (codeValue !== undefined && codeValue !== null && codeValue !== '') {
            console.log(`📝 Question "${q.title}" has code field:`, {
              codeLength: String(codeValue).length,
              codePreview: String(codeValue).substring(0, 100),
            });
          }
          
          // Map camelCase fields to snake_case
          const mapped: any = {
            title: q.title,
            content: q.content,
            code: codeValue, // CRITICAL: Include code field (preserve null/empty if present)
            type: q.type || 'multiple-choice',
            difficulty: normalizedDifficulty,
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
          
          // Remove undefined values (but preserve null and empty string for code)
          Object.keys(mapped).forEach(key => {
            if (mapped[key] === undefined) {
              delete mapped[key];
            }
          });
          
          // Log final mapped question to verify code is included
          if (mapped.code !== undefined) {
            console.log(`✅ Mapped question "${mapped.title}" includes code field:`, {
              hasCode: 'code' in mapped,
              codeType: typeof mapped.code,
              codeIsNull: mapped.code === null,
              codeLength: mapped.code ? String(mapped.code).length : 0,
            });
          } else {
            console.log(`⚠️ Mapped question "${mapped.title}" does NOT include code field`);
          }
          
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
      const refreshQuestions = async () => {
        // Create AbortController for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
        
        try {
          const filterParams = buildFilterParams();
          console.log('🔄 Refreshing questions after bulk upload...', { currentPage, pageSize, filterParams });
          setLoading(true);
          setError(null);

          const response = await fetch(
            `/api/questions/unified?${filterParams}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              signal: controller.signal,
            }
          );

          clearTimeout(timeoutId);
          console.log('📡 Refresh response:', response.status, response.ok);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          console.log('📊 Refresh result:', result);

          setQuestions(result.data || []);
          setTotalCount(result.pagination?.totalCount || 0);
          setLoading(false);
          console.log('✅ Questions refreshed:', result.data?.length || 0);
        } catch (err: any) {
          clearTimeout(timeoutId);
          console.error('❌ Error refreshing questions:', err);
          
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

      // Refresh questions list
      await refreshQuestions();

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
          // Note: setFile, setPreviewQuestions, etc. are handled inside BulkUploadForm component
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
        <StatsCards
          totalCount={totalCount}
          categoriesCount={allCategories.length}
          topicsCount={topicsData.length}
          filteredCount={displayQuestions.length}
        />

        {/* Filters */}
        <FiltersCard
          selectedCategory={selectedCategory || 'all'}
          selectedTopic={selectedTopic || 'all'}
          selectedType={selectedType || 'all'}
          selectedDifficulty={selectedDifficulty || 'all'}
          selectedStatus={selectedStatus || 'all'}
          categoriesData={categoriesData}
          topicsData={topicsData}
          allTypes={allTypes}
          onCategoryChange={handleCategoryChange}
          onTopicChange={handleTopicChange}
          onTypeChange={handleTypeChange}
          onDifficultyChange={handleDifficultyChange}
          onStatusChange={handleStatusChange}
          onClearFilters={handleClearFilters}
        />

        {/* Simple Search */}
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {/* Questions List */}
        <QuestionsList
          questions={displayQuestions}
          selectedQuestionIds={selectedQuestionIds}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalCount={totalCount}
          searchTerm={searchTerm}
          onSelectQuestion={handleSelectQuestion}
          onSelectAll={handleSelectAll}
          onView={openViewModal}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
          onBulkDelete={() => setIsBulkDeleteModalOpen(true)}
          onBulkUpload={() => setIsBulkUploadModalOpen(true)}
          onCreate={() => setIsCreateModalOpen(true)}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />

        {/* Bottom Pagination */}
        <BottomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalCount={totalCount}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* View Question Modal */}
      <ViewQuestionModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        question={selectedQuestion}
        cards={cards}
        allCategories={allCategories}
        categoriesData={categoriesData}
        topicsData={topicsData}
      />

      {/* Edit Question Modal */}
      <EditQuestionModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        question={selectedQuestion}
        onSubmit={handleUpdateQuestion}
        cards={cards}
        allCategories={allCategories}
        categoriesData={categoriesData}
        topicsData={topicsData}
      />

      {/* Create Question Modal */}
      <CreateQuestionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateQuestion}
        cards={cards}
        allCategories={allCategories}
        categoriesData={categoriesData}
        topicsData={topicsData}
      />

      {/* Bulk Upload Modal */}
      <BulkUploadModal
        isOpen={isBulkUploadModalOpen}
        onClose={() => setIsBulkUploadModalOpen(false)}
        onUpload={handleBulkUpload}
        loading={bulkUploadLoading}
        error={bulkUploadError}
        success={bulkUploadSuccess}
        progress={bulkUploadProgress}
        onClearState={() => {
          setBulkUploadError(null);
          setBulkUploadSuccess(null);
          setBulkUploadProgress(null);
        }}
      />

      {/* Bulk Delete Confirmation Modal */}
      <BulkDeleteModal
        isOpen={isBulkDeleteModalOpen}
        onClose={() => setIsBulkDeleteModalOpen(false)}
        selectedQuestionIds={selectedQuestionIds}
        questions={displayQuestions}
        onConfirm={handleBulkDelete}
        loading={bulkDeleteLoading}
      />

      {/* Delete Confirmation Modal */}
      <DeleteQuestionModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        question={questionToDelete}
        onConfirm={handleDeleteQuestion}
        loading={deleteLoading}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
