/**
 * Utility functions for audio handling
 */

/**
 * Check if an audio file exists by attempting to load it
 */
export async function checkAudioExists(audioPath: string): Promise<boolean> {
  if (!audioPath) return false;

  try {
    const response = await fetch(audioPath, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.log(`Audio file not found: ${audioPath}`);
    return false;
  }
}

/**
 * Check multiple audio files and return only the ones that exist
 */
export async function filterExistingAudio(
  audioPaths: string[]
): Promise<string[]> {
  const results = await Promise.all(
    audioPaths.map(async path => ({
      path,
      exists: await checkAudioExists(path),
    }))
  );

  return results.filter(result => result.exists).map(result => result.path);
}

/**
 * Generate audio path for a question
 */
export function generateAudioPath(
  learningPathId: string,
  type: 'question' | 'answer',
  index: number
): string {
  return `/audio/${learningPathId}/questions/${type}-${index + 1}.mp3`;
}

/**
 * Check if question has valid audio files
 */
export async function hasValidAudio(question: {
  audioQuestion?: string;
  audioAnswer?: string;
  content?: string;
  title?: string;
}): Promise<{
  hasQuestionAudio: boolean;
  hasAnswerAudio: boolean;
  questionAudioPath?: string;
  answerAudioPath?: string;
  shouldShowQuestionAudio: boolean;
  shouldShowAnswerAudio: boolean;
}> {
  const questionAudio = question.audioQuestion;
  const answerAudio = question.audioAnswer;

  const [questionExists, answerExists] = await Promise.all([
    questionAudio ? checkAudioExists(questionAudio) : false,
    answerAudio ? checkAudioExists(answerAudio) : false,
  ]);

  // Determine if we should show audio buttons based on question type
  const isCodeQuestion = isCodeOutputQuestion(question);

  return {
    hasQuestionAudio: questionExists,
    hasAnswerAudio: answerExists,
    questionAudioPath: questionExists ? questionAudio : undefined,
    answerAudioPath: answerExists ? answerAudio : undefined,
    shouldShowQuestionAudio: questionExists && !isCodeQuestion, // Don't show question audio for code questions
    shouldShowAnswerAudio: answerExists, // Always show answer audio if it exists
  };
}

/**
 * Determine if this is a code output question
 */
function isCodeOutputQuestion(question: {
  content?: string;
  title?: string;
}): boolean {
  const content = (question.content || '').toLowerCase();
  const title = (question.title || '').toLowerCase();

  const codeQuestionPatterns = [
    'what is the output',
    'what will be the output',
    'what does this code output',
    'what will this code print',
    'what will this code return',
    'what is the result',
    'what will be the result',
    'console.log',
    'output of',
    'result of',
    'code snippet',
    'javascript code',
    'what does the following code',
    'what will the following code',
  ];

  return codeQuestionPatterns.some(
    pattern => content.includes(pattern) || title.includes(pattern)
  );
}
