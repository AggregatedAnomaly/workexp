import React, { forwardRef } from "react";

import { cn } from "@/utils/styling";

const validTypes = ["primary", "secondary", "headless"];

/**
 * Stylized input component for handling mouse clicks.
 */
export const Button = forwardRef(function Button(
  { className, children, disabled, type = "primary", ...props },
  ref
) {
  const internalType = validTypes.includes(type.toLowerCase())
    ? type.toLowerCase()
    : validTypes[0];

  return (
    <button
      {...props}
      ref={ref}
      disabled={disabled}
      className={cn(
        "rounded-md p-2",
        {
          "text-yellow-400 bg-teal-600 bg-opacity-25 hover:bg-opacity-40 active:bg-teal-500 active:bg-opacity-25 disabled:bg-gray-600 border-teal-400 focus:outline-1 focus:outline-offset-2 focus:outline-teal-600":
            internalType === "primary",
          "text-white bg-opacity-40 bg-yellow-300 hover:bg-opacity-60 active:bg-opacity-40 border-white focus:outline-none focus:border-orange active:border-white":
            internalType === "secondary",
        },
        className
      )}
    >
      {children}
    </button>
  );
});

export default Button;
