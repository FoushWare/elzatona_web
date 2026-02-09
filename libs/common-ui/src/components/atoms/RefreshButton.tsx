import { RefreshCw } from "lucide-react";
import { cn } from "../../utils";

interface RefreshButtonProps {
  readonly onClick: () => void;
  readonly disabled?: boolean;
  readonly loading?: boolean;
  readonly className?: string;
  readonly label?: string;
}

export type RefreshButtonPropsType = RefreshButtonProps;

export function RefreshButton({
  onClick,
  disabled = false,
  loading = false,
  className,
  label = "Refresh",
}: RefreshButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50",
        className,
      )}
      suppressHydrationWarning
    >
      <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
      <span className="text-sm font-medium" suppressHydrationWarning>
        {loading ? "Refreshing..." : label}
      </span>
    </button>
  );
}
