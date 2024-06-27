import { useEffect, useState } from "react";

import { useStableCallback } from "./useStableCallback";

/**
 * Hook to manage a queue by exposing useful functions, as well raw state.
 * @param defaultValues Initial queue array.
 * @param limit Max number of items queue can hold, -1 for no limit.
 * @returns Functions and state of queue.
 */
export const useQueue = (defaultValues = [], limit = -1) => {
  const [queue, setQueue] = useState(defaultValues);

  /** Enqueues item at end of queue, removing oldest item if limit is surpassed. */
  const enqueue = useStableCallback((value) => {
    setQueue((cur) => {
      const newArr = [...cur, value];
      return newArr.slice(newArr.length > limit ? newArr.length - limit : 0);
    });
  });

  /** Removes and returns the topmost item from queue, if any. */
  const dequeue = useStableCallback(() => {
    if (queue.length === 0) return null;
    const item = queue[0];
    setQueue((cur) => cur.slice(1));
    return item;
  });

  /** Removes items that match predicate within queue. */
  const remove = useStableCallback((itemOrFn) => {
    if (typeof itemOrFn === "function")
      setQueue((cur) => [...cur].filter(itemOrFn));
    else setQueue((cur) => [...cur].filter((item) => item !== itemOrFn));
  });

  /** Returns subset array of elements matching a predicate. */
  const filter = useStableCallback((fn) => queue.filter(fn));

  /** Finds first/oldest element that matches a predicate. */
  const find = useStableCallback((fn) => queue.find(fn));

  /** Returns true if item exists or predicate matches an element, otherwise false. */
  const exists = useStableCallback((itemOrFn) => {
    if (typeof itemOrFn === "function") return !!find(itemOrFn);
    return queue.includes(itemOrFn);
  });

  /** Returns index of first element matching predicate, otherwise -1. */
  const indexOf = useStableCallback((fn) => queue.findIndex(fn));

  /** Empties the queue. */
  const clear = useStableCallback(() => {
    setQueue([]);
  });

  useEffect(() => {
    if (limit === -1) return;
    if (queue.length > limit) {
      const diff = queue.length - limit;
      setQueue((cur) => cur.slice(diff));
    }
  }, [limit]);

  return {
    enqueue,
    dequeue,
    remove,
    filter,
    find,
    exists,
    indexOf,
    clear,
    size: queue.length,
    queue,
  };
};
