import { MetricCard, type MetricCardPropsType } from "../molecules/MetricCard";
import { cn } from "../../utils";

interface MetricGridProps {
  metrics: MetricCardPropsType[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export function MetricGrid({
  metrics,
  columns = 4,
  className,
}: MetricGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn(`grid ${gridCols[columns]} gap-6`, className)}>
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
}
