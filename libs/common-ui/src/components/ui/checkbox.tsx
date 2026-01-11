import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "../../utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, ...props }, ref) => {
    const [checked, setChecked] = React.useState(props.checked || false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      setChecked(newChecked);
      onCheckedChange?.(newChecked);
      props.onChange?.(e);
    };

    return (
      <div className="relative">
        <input
          type="checkbox"
          className={cn(
            "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          checked={checked}
          onChange={handleChange}
          {...(props as any)}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Check
            className={cn(
              "h-3 w-3 text-primary-foreground opacity-0 transition-opacity",
              checked && "opacity-100",
            )}
          />
        </div>
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
