/**
 * Animation utility functions for consistent animations across the app
 */

export interface AnimationConfig {
  showAnimation: boolean;
  isClient: boolean;
  delay?: string;
}

/**
 * Get animation classes for consistent fade-in and slide-up animations
 */
export function getAnimationClass(config: AnimationConfig): string {
  const { showAnimation, isClient, delay = '' } = config;
  const baseClass = `transition-all duration-1000 ${delay}`;
  const animatedClass =
    showAnimation || !isClient
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 translate-y-8';
  return `${baseClass} ${animatedClass}`;
}

/**
 * Get staggered animation classes for lists or grids
 */
export function getStaggeredAnimationClass(
  config: AnimationConfig,
  index: number,
  baseDelay: number = 1000
): string {
  const delay = `${baseDelay + index * 100}ms`;
  return getAnimationClass({ ...config, delay });
}

/**
 * Get conditional animation classes based on state
 */
export function getConditionalAnimationClass(
  condition: boolean,
  showAnimation: boolean,
  isClient: boolean,
  delay: string = ''
): string {
  return getAnimationClass({
    showAnimation: condition && showAnimation,
    isClient,
    delay,
  });
}

/**
 * Animation presets for common use cases
 */
export const animationPresets = {
  fadeIn: (config: AnimationConfig) => getAnimationClass(config),
  slideUp: (config: AnimationConfig) => getAnimationClass(config),
  stagger: (config: AnimationConfig, index: number) =>
    getStaggeredAnimationClass(config, index),
  hero: (config: AnimationConfig) => getAnimationClass({ ...config, delay: '' }),
  quickActions: (config: AnimationConfig, index: number) =>
    getStaggeredAnimationClass(config, index, 1000),
  userContent: (config: AnimationConfig) =>
    getAnimationClass({ ...config, delay: 'delay-1400' }),
  cta: (config: AnimationConfig) =>
    getAnimationClass({ ...config, delay: 'delay-1500' }),
} as const;

/**
 * Common animation delays for consistent timing
 */
export const animationDelays = {
  immediate: '',
  short: 'delay-300',
  medium: 'delay-500',
  long: 'delay-700',
  veryLong: 'delay-1000',
  extraLong: 'delay-1400',
  final: 'delay-1500',
} as const;
