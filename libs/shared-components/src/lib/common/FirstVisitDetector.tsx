'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL']!;
const supabaseServiceRoleKey = process.env['SUPABASE_SERVICE_ROLE_KEY']!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { FirstVisitModal } from './FirstVisitModal';
import { useUserType } from '@elzatona/shared-contexts';

export const FirstVisitDetector: React.FC = () => {
  const { isFirstVisit, setIsFirstVisit, userType } = useUserType();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if this is truly a first visit
    if (typeof window !== 'undefined') {
      const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');

      if (!hasVisitedBefore && !userType) {
        // This is a first visit and no user type is set
        setShowModal(true);
        setIsFirstVisit(true);
        localStorage.setItem('hasVisitedBefore', 'true');
      }
    }
  }, [userType, setIsFirstVisit]);

  const handleClose = () => {
    setShowModal(false);
    setIsFirstVisit(false);
  };

  return (
    <FirstVisitModal isOpen={showModal && !userType} onClose={handleClose} />
  );
};
