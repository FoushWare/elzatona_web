import * as React from "react";
import { cn } from "../../utils";

const Collapsible = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(({ className, open, onOpenChange, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("", className)} {...props}>
      {children}
    </div>
  );
});
Collapsible.displayName = "Collapsible";

const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button ref={ref} className={cn("", className)} {...props} />
));
CollapsibleTrigger.displayName = "CollapsibleTrigger";

const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("overflow-hidden transition-all", className)}
    {...props}
  />
));
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
