import * as React from "react";
import { cn } from "../../utils";
import { X } from "lucide-react";

const Dialog = React.forwardRef<
  HTMLDialogElement,
  React.HTMLAttributes<HTMLDialogElement> & {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(({ className: _className, open, onOpenChange, children, ...props }, ref) => {
  React.useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <dialog
      open
      ref={ref}
      className="fixed inset-0 z-[200] m-0 flex min-h-screen w-screen items-center justify-center p-4 sm:p-6"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      {...props}
    >
      <button
        type="button"
        className="absolute inset-0 w-full h-full border-0 cursor-pointer bg-transparent z-0"
        onClick={() => onOpenChange?.(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            onOpenChange?.(false);
          }
        }}
        tabIndex={0}
        aria-label="Close dialog"
      />
      {/* We just render the children (usually DialogContent) directly here so we don't double loop the backgrounds */}
      {children}
    </dialog>
  );
});
Dialog.displayName = "Dialog";

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    onOpenChange?: (open: boolean) => void;
  }
>(({ className, onOpenChange, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative z-[201] w-full max-w-2xl max-h-[90vh] rounded-xl border bg-white dark:bg-gray-900 p-6 shadow-2xl flex flex-col overflow-y-auto my-auto",
      className,
    )}
    {...(props as any)}
  >
    {onOpenChange && (
      <button
        type="button"
        onClick={() => onOpenChange(false)}
        className="absolute top-4 right-4 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-[202]"
        aria-label="Close dialog"
        title="Close"
      >
        <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
    )}
    {props.children}
  </div>
));
DialogContent.displayName = "DialogContent";

const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    {...(props as any)}
  />
));
DialogHeader.displayName = "DialogHeader";

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & { children: React.ReactNode }
>(({ className, children, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...(props as any)}
  >
    {children}
  </h2>
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...(props as any)}
  />
));
DialogDescription.displayName = "DialogDescription";

const DialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...(props as any)}
  />
));
DialogFooter.displayName = "DialogFooter";

const DialogTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
      className,
    )}
    {...(props as any)}
  />
));
DialogTrigger.displayName = "DialogTrigger";

const DialogClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...(props as any)}
  />
));
DialogClose.displayName = "DialogClose";

export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
};
