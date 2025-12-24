/**
 * Home Page Constants
 * Magic numbers and repeated values for the home page
 */

export const ANIMATION_DELAYS = {
  INITIAL: 500, // ms
  HERO: 300, // ms
  CTA: 500, // ms
  STATS: 700, // ms
  LEARNING_SELECTOR: 800, // ms
  LEARNING_SELECTOR_SUBTITLE: 900, // ms
  LEARNING_CARD_GUIDED: 1000, // ms
  LEARNING_CARD_FREESTYLE: 1100, // ms
  CONTENT_SECTION: 1400, // ms
  FINAL_CTA: 1500, // ms
} as const;

export const ANIMATION_DURATION = {
  FAST: 300, // ms
  NORMAL: 500, // ms
  SLOW: 1000, // ms
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
