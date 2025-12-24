"use client";

import React from "react";

interface Particle {
  top: string;
  left?: string;
  right?: string;
  width: string;
  height: string;
  color: string;
  animation: string;
  delay?: string;
}

interface GradientOrb {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width: string;
  height: string;
  gradient: string;
  delay?: string;
}

const particles: Particle[] = [
  { top: "top-20", left: "left-10", width: "w-2", height: "h-2", color: "bg-indigo-400", animation: "animate-pulse" },
  { top: "top-40", right: "right-20", width: "w-3", height: "h-3", color: "bg-purple-400", animation: "animate-bounce", delay: "1s" },
  { top: "top-60", left: "left-1/4", width: "w-1", height: "h-1", color: "bg-blue-400", animation: "animate-ping", delay: "2s" },
  { top: "top-80", right: "right-1/3", width: "w-2", height: "h-2", color: "bg-pink-400", animation: "animate-pulse", delay: "0.5s" },
  { top: "bottom-40", left: "left-1/3", width: "w-3", height: "h-3", color: "bg-green-400", animation: "animate-bounce", delay: "1.5s" },
  { top: "bottom-60", right: "right-10", width: "w-1", height: "h-1", color: "bg-yellow-400", animation: "animate-ping", delay: "3s" },
];

const gradientOrbs: GradientOrb[] = [
  { top: "top-1/4", left: "left-1/4", width: "w-64", height: "h-64", gradient: "from-indigo-400/20 to-purple-400/20" },
  { bottom: "bottom-1/4", right: "right-1/4", width: "w-80", height: "h-80", gradient: "from-purple-400/20 to-pink-400/20", delay: "2s" },
];

/**
 * AnimatedBackground Component
 * Background animations with floating particles and gradient orbs
 */
export function AnimatedBackground() {
  return (
    <>
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((particle, index) => (
          <div
            key={index}
            className={`absolute ${particle.top} ${particle.left || ""} ${particle.right || ""} ${particle.width} ${particle.height} ${particle.color} rounded-full ${particle.animation}`}
            style={{ animationDelay: particle.delay }}
          />
        ))}

        {/* Gradient orbs */}
        {gradientOrbs.map((orb, index) => (
          <div
            key={`orb-${index}`}
            className={`absolute ${orb.top || ""} ${orb.bottom || ""} ${orb.left || ""} ${orb.right || ""} ${orb.width} ${orb.height} bg-gradient-to-r ${orb.gradient} rounded-full blur-3xl animate-pulse`}
            style={{ animationDelay: orb.delay }}
          />
        ))}
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
}

