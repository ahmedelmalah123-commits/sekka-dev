"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b border-border", className)}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex flex-1 items-center justify-between gap-4 py-4 text-start text-base font-medium text-text transition-colors duration-150 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&[data-state=open]>svg]:rotate-180 cursor-pointer",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <ChevronDown
          className="h-4 w-4 shrink-0 text-text-muted transition-transform duration-200"
          aria-hidden="true"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className={cn(
        "overflow-hidden pb-4 text-sm leading-relaxed text-text-muted",
        className
      )}
      {...props}
    >
      <div>{children}</div>
    </AccordionPrimitive.Content>
  );
}
