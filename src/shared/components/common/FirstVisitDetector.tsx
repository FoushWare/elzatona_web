'use client';

import React, { useEffect, useState } from 'react';
import { FirstVisitModal } from './FirstVisitModal';
import { useUserType } from '@/contexts/UserTypeContextSafe';

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
