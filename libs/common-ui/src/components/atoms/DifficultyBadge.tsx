import React from "react";
import clsx from "clsx";

export type Difficulty = "easy" | "medium" | "hard";

export type DifficultyBadgeProps = {
  difficulty: Difficulty;
  className?: string;
};

const colorMap: Record<Difficulty, string> = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-800",
};

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({
  difficulty,
  className,
}) => {
  const classes = clsx(
    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
    colorMap[difficulty],
    className,
  );

  return <span className={classes}>{difficulty.toUpperCase()}</span>;
};

export default DifficultyBadge;
