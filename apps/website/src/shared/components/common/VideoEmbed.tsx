'use client';

import { useState } from 'react';

interface VideoEmbedProps {
  url: string;
  title: string;
}

export default function VideoEmbed({ url, title }: VideoEmbedProps) {
  const [showEmbed, setShowEmbed] = useState(false);

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(url);

  if (!videoId) {
    return (
      <a
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        className='block w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
      >
        <div className='text-4xl mb-4'>🎥</div>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
          {title}
        </h3>
        <p className='text-gray-600 dark:text-gray-400'>
          Click to watch on YouTube
        </p>
      </a>
    );
  }

  return (
    <div className='w-full'>
      {!showEmbed ? (
        <div
          onClick={() => setShowEmbed(true)}
          className='relative w-full bg-gray-900 rounded-lg cursor-pointer group overflow-hidden'
          style={{ aspectRatio: '16/9' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title}
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all duration-200'>
            <div className='bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform duration-200'>
              <svg
                className='w-8 h-8 text-white'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M8 5v14l11-7z' />
              </svg>
            </div>
          </div>
          <div className='absolute bottom-4 left-4 right-4'>
            <h3 className='text-white font-semibold text-lg mb-1'>{title}</h3>
            <p className='text-gray-200 text-sm'>Click to play video</p>
          </div>
        </div>
      ) : (
        <div className='w-full' style={{ aspectRatio: '16/9' }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            className='w-full h-full rounded-lg'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
