'use client';

import React from 'react';
import { getAnimationClass, AnimationConfig } from '@/utils/animations';

interface AnimatedElementProps extends AnimationConfig {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * A reusable animated element that handles fade-in and slide-up animations
 */
export function AnimatedElement({
  children,
  showAnimation,
  isClient,
  delay = '',
  className = '',
  as: Component = 'div',
  ...props
}: AnimatedElementProps) {
  const animationClass = getAnimationClass({
    showAnimation,
    isClient,
    delay,
  });

  return (
    <Component className={`${animationClass} ${className}`} {...props}>
      {children}
    </Component>
  );
}

/**
 * Animated section wrapper with common styling
 */
interface AnimatedSectionProps extends AnimatedElementProps {
  sectionClassName?: string;
}

export function AnimatedSection({
  children,
  sectionClassName = '',
  ...animationProps
}: AnimatedSectionProps) {
  return (
    <AnimatedElement
      as="section"
      className={`py-16 px-4 sm:px-6 lg:px-8 relative z-10 ${sectionClassName}`}
      {...animationProps}
    >
      {children}
    </AnimatedElement>
  );
}
