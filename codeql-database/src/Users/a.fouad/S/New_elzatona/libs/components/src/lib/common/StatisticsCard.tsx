import React from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"]!;
const supabaseServiceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"]!;
const _supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export interface StatisticsCardProps {
  value: number;
  label: string;
  color?: "blue" | "green" | "purple" | "orange";
  className?: string;
}

const getColorClasses = (color: string) => {
  switch (color) {
    case "blue":
      return "text-blue-600";
    case "green":
      return "text-green-600";
    case "purple":
      return "text-purple-600";
    case "orange":
      return "text-orange-600";
    default:
      return "text-blue-600";
  }
};

export const StatisticsCard: React.FC<StatisticsCardProps> = ({
  value,
  label,
  color = "blue",
  className = "",
}) => {
  return (
    <div
      className={`bg-card rounded-lg shadow-sm border border-border p-3 sm:p-4 lg:p-6 text-center ${className}`}
    >
      <div
        className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 ${getColorClasses(color)}`}
      >
        {value}
      </div>
      <div className="text-card-foreground font-medium text-xs sm:text-sm lg:text-base">
        {label}
      </div>
    </div>
  );
};
