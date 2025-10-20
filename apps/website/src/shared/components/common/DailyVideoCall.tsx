'use client';

import { useEffect, useRef, useState } from 'react';
import DailyIframe from '@daily-co/daily-js';

interface DailyVideoCallProps {
  roomUrl: string;
  userName: string;
  onLeave: () => void;
  className?: string;
}

export const DailyVideoCall: React.FC<DailyVideoCallProps> = ({
  roomUrl,
  userName,
  onLeave,
  className = '',
}) => {
  const iframeRef = useRef<HTMLDivElement>(null);
  const [isJoined, setIsJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!iframeRef.current || !roomUrl) return;

    const iframe = DailyIframe.createFrame(iframeRef.current, {
      showLeaveButton: true,
      showFullscreenButton: true,
      showLocalVideo: true,
      showParticipantsBar: true,
    });

    // Event listeners
    iframe
      .on('joined-meeting', () => {
        console.log('✅ Joined Daily.co meeting');
        setIsJoined(true);
        setIsLoading(false);
        setError(null);
      })
      .on('left-meeting', () => {
        console.log('👋 Left Daily.co meeting');
        setIsJoined(false);
        onLeave();
      })
      .on('error', event => {
        console.error('❌ Daily.co error:', event);
        setError(event.errorMsg || 'Failed to join meeting');
        setIsLoading(false);
      });

    // Join the meeting
    iframe.join({ url: roomUrl, userName });

    // Cleanup
    return () => {
      iframe.destroy();
    };
  }, [roomUrl, userName, onLeave]);

  if (error) {
    return (
      <div
        className={`bg-red-50 border border-red-200 rounded-lg p-6 text-center ${className}`}
      >
        <div className='text-red-600 mb-4'>
          <svg
            className='w-12 h-12 mx-auto mb-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
            />
          </svg>
          <h3 className='text-lg font-semibold'>Connection Error</h3>
          <p className='text-sm mt-2'>{error}</p>
        </div>
        <button
          onClick={onLeave}
          className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors'
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Loading State */}
      {isLoading && (
        <div className='absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10 rounded-lg'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
            <p className='text-gray-600'>Joining interview room...</p>
            <p className='text-sm text-gray-500 mt-2'>
              Please allow camera and microphone access
            </p>
          </div>
        </div>
      )}

      {/* Video Call Interface */}
      <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
        {/* Header */}
        <div className='bg-blue-600 text-white p-4 flex items-center justify-between'>
          <div>
            <h3 className='text-lg font-semibold'>AI Mock Interview</h3>
            <p className='text-blue-100 text-sm'>
              {isJoined ? 'Connected' : 'Connecting...'}
            </p>
          </div>
          <button
            onClick={onLeave}
            className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors'
          >
            Leave Interview
          </button>
        </div>

        {/* Video Container */}
        <div
          ref={iframeRef}
          className='w-full h-96 bg-gray-100'
          style={{ minHeight: '400px' }}
        />

        {/* Instructions */}
        <div className='p-4 bg-gray-50 border-t'>
          <div className='flex items-start space-x-3'>
            <div className='flex-shrink-0'>
              <svg
                className='w-5 h-5 text-blue-600 mt-0.5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <div className='text-sm text-gray-700'>
              <p className='font-medium mb-1'>Interview Tips:</p>
              <ul className='space-y-1 text-gray-600'>
                <li>• Speak clearly and at a normal pace</li>
                <li>
                  • The AI interviewer will ask questions and provide feedback
                </li>
                <li>• Take your time to think before answering</li>
                <li>• Ask for clarification if needed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
