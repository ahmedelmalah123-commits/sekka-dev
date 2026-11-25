import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-contrast hover:bg-primary-hover border border-transparent",
        secondary:
          "bg-surface text-text border border-border-strong hover:bg-surface-muted",
        ghost:
          "bg-transparent text-text hover:bg-surface-muted border border-transparent",
        outline:
          "bg-transparent text-text border border-border-strong hover:bg-surface",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-5 text-base",
        lg: "h-12 px-6 text-base font-semibold",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export type IconButtonProps = Omit<ButtonProps, "size"> & {
  "aria-label": string;
};

export function IconButton({
  className,
  variant = "outline",
  ...props
}: IconButtonProps) {
  return <Button variant={variant} size="icon" className={className} {...props} />;
}

export { buttonVariants };
