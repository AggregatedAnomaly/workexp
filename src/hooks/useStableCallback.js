import { useCallback, useLayoutEffect, useRef } from "react";

/**
 * Utility hook for creating persistent function across re-renders, where `useCallback` would not suffice.
 * Do NOT call returned function during initial render!
 * Placeholder for potential hook 'useEvent' in React 18 RFC.
 * @see https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md
 * @param callback Function to persist.
 * @returns Persisted function callback.
 */
export const useStableCallback = (callback) => {
  const ref = useRef(callback);

  useLayoutEffect(() => {
    ref.current = callback;
  });

  return useCallback((...args) => {
    return ref.current(...args);
  }, []);
};
