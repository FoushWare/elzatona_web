/**
 * Home Page Constants
 * Magic numbers and repeated values for the home page
 */

export const ANIMATION_DELAYS = {
  INITIAL: 100, // ms - Reduced from 500ms
  HERO: 50, // ms - Reduced from 300ms
  CTA: 100, // ms - Reduced from 500ms
  STATS: 150, // ms - Reduced from 700ms
  LEARNING_SELECTOR: 200, // ms - Reduced from 800ms
  LEARNING_SELECTOR_SUBTITLE: 250, // ms - Reduced from 900ms
  LEARNING_CARD_GUIDED: 300, // ms - Reduced from 1000ms
  LEARNING_CARD_FREESTYLE: 350, // ms - Reduced from 1100ms
  CONTENT_SECTION: 400, // ms - Reduced from 1400ms
  FINAL_CTA: 450, // ms - Reduced from 1500ms
} as const;

export const ANIMATION_DURATION = {
  FAST: 150, // ms - Reduced from 300ms
  NORMAL: 300, // ms - Reduced from 500ms
  SLOW: 500, // ms - Reduced from 1000ms
} as const;

export const LOCAL_STORAGE_KEYS = {
  ACTIVE_GUIDED_PLAN: "active-guided-plan",
} as const;

export const USER_TYPES = {
  GUIDED: "guided",
  SELF_DIRECTED: "self-directed",
} as const;

export const ROUTES = {
  GET_STARTED: "/get-started",
  GUIDED_LEARNING: "/features/guided-learning",
  GUIDED_PRACTICE: "/guided-practice",
  BROWSE_QUESTIONS: "/browse-practice-questions",
  LEARN: "/learn",
} as const;
