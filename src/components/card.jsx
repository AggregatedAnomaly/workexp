import React, { forwardRef } from "react";

import { cn } from "@/utils/styling";

/**
 * Stylized container component for organizing content.
 */
const CardBase = forwardRef(function CardBase(
  { className, children, ...props },
  ref
) {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        "border-2 border-teal-300 text-sm rounded-md mx-2 bg-teal-600 bg-opacity-20 overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
});

const CardContent = forwardRef(function CardContent(
  { className, children, ...props },
  ref
) {
  return (
    <div {...props} ref={ref} className={cn("p-2", className)}>
      {children}
    </div>
  );
});

const CardHeader = forwardRef(function CardHeader(
  { className, children, ...props },
  ref
) {
  return (
    <div {...props} ref={ref} className={cn("p-2", className)}>
      {children}
    </div>
  );
});

const CardFooter = forwardRef(function CardFooter(
  { className, children, ...props },
  ref
) {
  return (
    <div {...props} ref={ref} className={cn("", className)}>
      {children}
    </div>
  );
});

/**
 * Stylized container component for organizing content.
 */
export const Card = Object.assign(CardBase, {
  /**
   * Inner container for wrapping card content.
   */
  Content: CardContent,
  /**
   * Optional sub-container for organizing and styling card footers.
   */
  Footer: CardFooter,
  /**
   * Optional sub-container for organizing and styling card headers.
   */
  Header: CardHeader,
});

export default Card;
