// Export main Firebase functions (avoiding conflicts)
export {
  signInWithGoogle,
  signInWithGithub,
  signInWithEmail,
  signUpWithEmail,
  signOutUser,
  saveUserToFirestore,
  getUserFromFirestore,
  onAuthStateChangedWrapper,
  getCurrentUser,
  refreshUserToken,
  withFirestoreErrorHandling,
  clearAuthData,
  setupTokenRefresh,
  setAuthCookie,
  clearAuthCookie,
  app,
  auth,
  db,
  storage,
  googleProvider,
  githubProvider
} from './firebase';

// Export server-side utilities (renamed to avoid conflicts)
export {
  app as serverApp,
  db as serverDb,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
  Timestamp
} from './firebase-server';

// Export other utilities
export * from './unified-question-schema';
export * from './admin-auth';
export * from './firestore-service';
export * from './cookie-manager';
export * from './firestore-connection-manager';
export * from './audio-collection-service';
export * from './audio-collection-schema';
export * from './guided-learning-service';
export * from './resources';
export * from './firebase-flashcards';

// Export progress types with specific names to avoid conflicts
export type {
  UserProgress,
  LearningPathProgress,
  QuestionAttempt as ProgressQuestionAttempt,
  ChallengeAttempt,
  Achievement,
  UserPreferences,
  DashboardStats,
} from './firebase-progress';

export {
  getDashboardStats,
  getUserProgress,
  updateQuestionProgress,
  updateChallengeProgress,
  updateLearningPathProgress,
  updateUserStreak,
  getContinueWhereLeftOff,
  updateUserPreferences,
} from './firebase-progress';

// Export question types with specific names to avoid conflicts
export type {
  Question,
  QuestionCategory,
  QuestionAttempt as QuestionAttemptRecord,
} from './firebase-questions';

export {
  getQuestions,
  getQuestion,
  getRandomQuestions,
  getCategories,
  getQuestionStats,
  saveQuestionAttempt,
  getUserQuestionAttempts,
  searchQuestions,
  getQuizQuestions,
} from './firebase-questions';

// Add other Firebase exports here
