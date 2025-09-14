// v1.0 - Unified Questions Management Page
// Admin page for managing all questions from a single source

import { Metadata } from 'next';
import AdminLayout from '@/components/AdminLayout';
import UnifiedQuestionManager from '@/components/UnifiedQuestionManager';

export const metadata: Metadata = {
  title: 'Unified Questions | Admin Panel',
  description: 'Manage all questions from a single source of truth',
};

export default function UnifiedQuestionsPage() {
  return (
    <AdminLayout>
      <div className="container mx-auto py-6">
        <UnifiedQuestionManager />
      </div>
    </AdminLayout>
  );
}
