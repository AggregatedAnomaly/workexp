import { useState } from "react";

import { useStableCallback } from "./useStableCallback";

/**
 * Hook to manage a array by exposing useful functions, as well raw state.
 * @param defaultValues Initial array
 * @returns Functions and state of array
 */
export const useArray = (defaultValue = []) => {
  const [arr, setArr] = useState(defaultValue);

  /** Add items to end of array. */
  const push = useStableCallback((value) => {
    setArr((cur) => [...cur, value]);
  });

  /** Removes all instances of item from array. */
  const remove = useStableCallback((value) => {
    setArr((cur) => [...cur].filter((v) => v !== value));
  });

  /** Removes item that match predicate. */
  const removeWhere = useStableCallback((fn) => {
    const item = arr.find(fn);
    if (item) remove(item);
  });

  /** Replaces items matching predicate with another item. */
  const replace = useStableCallback((idx, value) => {
    setArr((cur) => [
      ...cur.slice(0, idx),
      value,
      ...cur.slice(idx + 1, cur.length),
    ]);
  });

  /** Returns item matching predicate or null if not found. */
  const find = useStableCallback((fn) => arr.find(fn) ?? null);

  /** Returns true if an item matching predicate is found, otherwise false. */
  const exists = useStableCallback((itemOrFn) => {
    if (typeof itemOrFn === "function") {
      return !!find(itemOrFn);
    }
    return arr.includes(itemOrFn);
  });

  /** Returns subset array of items that match predicate. */
  const filter = useStableCallback((fn) => arr.filter(fn));

  /** Returns index of first item that matches predicate, -1 if no item found. */
  const indexOf = useStableCallback((fn) => arr.findIndex(fn));

  /** Removes all items from array */
  const clear = useStableCallback(() => {
    setArr([]);
  });

  return {
    push,
    remove,
    removeWhere,
    replace,
    find,
    exists,
    filter,
    indexOf,
    clear,
    length: arr.length,
    array: arr,
  };
};
