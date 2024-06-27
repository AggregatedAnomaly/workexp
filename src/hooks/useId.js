import { useId as useReactId } from "react";

/**
 * Wrapper for react's `useId` to prioritize developer provided id if present.
 * @param id User specified ID.
 * @returns {string} ID.
 */
export const useId = (id) => {
  const internalId = useReactId();
  return id ?? internalId;
};
