// v1.0 - Unified Questions Management Page
// Admin page for managing all questions from a single source

import { Metadata } from 'next';

// import UnifiedQuestionManager from '@/shared/components/learning/UnifiedQuestionManager';

export const metadata: Metadata = {
  title: 'Unified Questions | Admin Panel',
  description: 'Manage all questions from a single source of truth',
};

export default function UnifiedQuestionsPage() {
  return (
    <div className='container mx-auto py-6'>
      {/* <UnifiedQuestionManager /> */}
    </div>
  );
}
