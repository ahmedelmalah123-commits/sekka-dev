"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

export function SheetContent({
  className,
  children,
  title,
  closeLabel = "إغلاق القائمة",
  side = "start",
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  title: string;
  closeLabel?: string;
  side?: "start" | "end";
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-text/40" />
      <DialogPrimitive.Content
        className={cn(
          "fixed inset-y-0 z-50 flex w-80 max-w-[85vw] flex-col border-border bg-bg p-6 text-text shadow-md focus-visible:outline-none",
          side === "start" ? "start-0 border-e" : "end-0 border-s",
          className
        )}
        {...props}
      >
        <VisuallyHidden.Root>
          <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
        </VisuallyHidden.Root>
        <div className="flex items-center justify-between border-b border-border pb-4">
          <span className="font-display text-lg font-semibold text-text">
            {title}
          </span>
          <DialogPrimitive.Close
            aria-label={closeLabel}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border-strong bg-surface text-text hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </DialogPrimitive.Close>
        </div>
        <div className="mt-6 flex-1 overflow-y-auto">{children}</div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
