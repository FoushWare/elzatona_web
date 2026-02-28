/* eslint-disable @typescript-eslint/no-explicit-any */
// NOTE: Type safety improvements tracked in refactoring task 401-reduce-any
// Shadcn UI component - will be typed in future refactor
import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../../utils";

const Select = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string;
    onValueChange?: (value: string) => void;
  }
>(({ className, value, onValueChange, children, ...props }, ref) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(value || "");

  React.useEffect(() => {
    setSelectedValue(value || "");
  }, [value]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        ref &&
        "current" in ref &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, ref]);

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    onValueChange?.(newValue);
    setOpen(false);
  };

  // Find SelectContent children
  const selectContent = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === SelectContent,
  );

  // Extract SelectItems from SelectContent
  const selectItems = React.Children.toArray(
    (React.isValidElement(selectContent)
      ? (selectContent.props as any).children
      : undefined) || [],
  ).filter((child) => React.isValidElement(child) && child.type === SelectItem);

  // Find the selected item text
  const selectedItem = selectItems.find(
    (item) =>
      React.isValidElement(item) && (item.props as any).value === selectedValue,
  );
  const selectedItemElement = React.isValidElement(selectedItem)
    ? selectedItem
    : null;
  const selectedText = selectedItemElement
    ? (selectedItemElement.props as any).children
    : "Select...";

  return (
    <div ref={ref} className={cn("relative", className)} {...(props as any)}>
      <button
        type="button"
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-accent hover:text-accent-foreground cursor-pointer"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Select option. Current: ${selectedText}`}
      >
        <span className="truncate">{selectedText}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 opacity-50" />
        ) : (
          <ChevronDown className="h-4 w-4 opacity-50" />
        )}
      </button>
      {open && (
        <div
          className="absolute z-50 w-full mt-1 rounded-md border bg-background shadow-lg"
          aria-label="Select options"
        >
          <div className="max-h-60 overflow-auto">
            {selectItems.map((item) => {
              if (React.isValidElement(item)) {
                const itemProps = item.props as any;
                return (
                  <button
                    key={itemProps.value}
                    type="button"
                    className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer focus:bg-accent focus:outline-none"
                    onClick={() => handleValueChange(itemProps.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleValueChange(itemProps.value);
                      }
                    }}
                  >
                    {itemProps.children}
                  </button>
                );
              }
              return item;
            })}
          </div>
        </div>
      )}
    </div>
  );
});
Select.displayName = "Select";

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-accent hover:text-accent-foreground cursor-pointer",
      className,
    )}
    {...(props as any)}
  >
    {children}
  </button>
));
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {
    placeholder?: string;
  }
>(({ className, placeholder, ...props }, ref) => (
  <span ref={ref} className={cn("truncate", className)} {...(props as any)}>
    {placeholder}
  </span>
));
SelectValue.displayName = "SelectValue";

const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
      className,
    )}
    {...(props as any)}
  >
    <div className="p-1">{children}</div>
  </div>
));
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string;
  }
>(({ className, children, value: _value, onClick, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      "w-full text-left relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent",
      className,
    )}
    onClick={onClick}
    {...(props as any)}
  >
    {children}
  </button>
));
SelectItem.displayName = "SelectItem";

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
