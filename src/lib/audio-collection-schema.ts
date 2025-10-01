import { Timestamp } from 'firebase/firestore';

/**
 * Audio Collection Schema
 *
 * This collection stores audio file mappings for questions, creating a relational
 * structure between questions and their audio files.
 *
 * Collection: 'questionAudio'
 *
 * Structure:
 * - questionId: string (references the question document)
 * - learningPath: string (e.g., 'javascript-deep-dive')
 * - sectionId: string (e.g., 'questions')
 * - questionNumber: number (1, 2, 3, etc.)
 * - questionAudio: AudioFileInfo
 * - answerAudio: AudioFileInfo
 * - createdAt: Timestamp
 * - updatedAt: Timestamp
 */

export interface AudioFileInfo {
  /** Local file path in public/audio/ */
  localPath: string;
  /** Whether this is a default/placeholder audio */
  isDefault: boolean;
  /** File size in bytes (if available) */
  fileSize?: number;
  /** Audio duration in seconds (if available) */
  duration?: number;
  /** MIME type of the audio file */
  mimeType?: string;
}

export interface QuestionAudioMapping {
  id: string;
  questionId: string;
  learningPath: string;
  sectionId: string;
  questionNumber: number;
  questionAudio: AudioFileInfo;
  answerAudio: AudioFileInfo;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Default audio file paths
 */
export const DEFAULT_AUDIO_PATHS = {
  QUESTION: '/audio/defaults/question.mp3',
  ANSWER: '/audio/defaults/answer.mp3',
} as const;

/**
 * Generate audio file paths based on learning path, section, and question number
 */
export function generateAudioPaths(
  learningPath: string,
  sectionId: string,
  questionNumber: number
): {
  questionAudio: string;
  answerAudio: string;
} {
  const basePath = `/audio/${learningPath}/${sectionId}`;

  return {
    questionAudio: `${basePath}/question-${questionNumber}.mp3`,
    answerAudio: `${basePath}/answer-${questionNumber}.mp3`,
  };
}

/**
 * Create default audio file info
 */
export function createDefaultAudioInfo(path: string): AudioFileInfo {
  return {
    localPath: path,
    isDefault: true,
    mimeType: 'audio/mpeg',
  };
}

/**
 * Create custom audio file info
 */
export function createCustomAudioInfo(
  path: string,
  fileSize?: number,
  duration?: number,
  mimeType: string = 'audio/mpeg'
): AudioFileInfo {
  return {
    localPath: path,
    isDefault: false,
    fileSize,
    duration,
    mimeType,
  };
}
