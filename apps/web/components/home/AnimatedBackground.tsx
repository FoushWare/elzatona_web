'use client';

import React, { memo } from 'react';

export const AnimatedBackground = memo(function AnimatedBackground() {
  return (
    <>
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-60 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute top-80 right-1/3 w-2 h-2 bg-pink-400 rounded-full animate-pulse"
          style={{ animationDelay: '0.5s' }}
        ></div>
        <div
          className="absolute bottom-40 left-1/3 w-3 h-3 bg-green-400 rounded-full animate-bounce"
          style={{ animationDelay: '1.5s' }}
        ></div>
        <div
          className="absolute bottom-60 right-10 w-1 h-1 bg-yellow-400 rounded-full animate-ping"
          style={{ animationDelay: '3s' }}
        ></div>

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      {/* Watermark */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 dark:opacity-30">
          <div className="absolute inset-0 bg-white/10 dark:bg-gray-800/20 rounded-full blur-sm scale-110"></div>
          <img
            src="/elzatona-watermark.png"
            alt="Elzatona Watermark"
            className="w-[400px] h-[400px] object-contain relative z-10"
          />
        </div>
      </div>
    </>
  );
});
