import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-28 w-full rounded-sm border border-border-strong bg-surface px-3.5 py-2.5 text-base text-text placeholder:text-text-muted transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-danger",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
