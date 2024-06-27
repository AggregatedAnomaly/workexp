import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to concat numerous strings and/or objects to create singular className values with conflicting styles handled by order.
 * @param inputs Array of strings and/or objects
 * @returns
 */
export const cn = (...inputs) => twMerge(clsx(inputs));
