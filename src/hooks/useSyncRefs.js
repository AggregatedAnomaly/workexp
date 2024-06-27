import { useCallback } from "react";

/**
 * Creates function to synchronise multiple references with same values when changed.
 * @param refs Collection of refs to sync.
 * @returns Sync ref function.
 */
export const useSyncRefs = (...refs) => {
  return useCallback(
    (value) => {
      for (const ref of refs) {
        if (!ref) continue;
        if (typeof ref === "function") ref(value);
        else ref.current = value;
      }
    },
    [refs]
  );
};
