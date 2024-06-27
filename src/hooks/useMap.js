import { useState } from "react";

import { useStableCallback } from "./useStableCallback";

export const useMap = (defaultValue = []) => {
  const [map, setMap] = useState(
    defaultValue instanceof Map ? defaultValue : new Map(defaultValue)
  );
  const set = useStableCallback((key, value) =>
    setMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(key, value);
      return newMap;
    })
  );

  const setAll = useStableCallback((entries) => {
    const newMap = entries instanceof Map ? entries : new Map(entries);
    setMap(newMap);
  });

  const get = useStableCallback((key) => map.get(key));

  const has = useStableCallback((key) => map.has(key));

  const remove = useStableCallback((key) =>
    setMap((prev) => {
      const newMap = new Map(prev);
      newMap.delete(key);
      return newMap;
    })
  );

  const clear = useStableCallback(() => setMap(new Map()));

  const filter = useStableCallback((fn) =>
    Array.from(map.entries()).filter(fn)
  );

  const entries = Array.from(map.entries());
  const length = entries.length;

  return {
    /**
     * Removes all entires from the map.
     */
    clear,
    /** Map entries as array */
    entries,
    /**
     * Filters for map entries that meet condition.
     * @param fn Function to determine whether entry meets condition or not.
     * @return Array of map entires that met condition.
     */
    filter,
    /**
     * Retrives value from map with given key, or undefined if not found
     * @param key Key to lookup.
     * @return Value from map or undefined.
     */
    get,
    /**
     * Returns whether key exists in map.
     * @param key Key to lookup.
     * @return {boolean} True if entry exists, false if entry does not exist.
     */
    has,
    /** Number of items in map */
    length,
    /** Map of key-values */
    map,
    /**
     * Removes an entry from map, if present.
     * @param key Key to remove from map.
     */
    remove,
    /**
     * Assigns a value to the map.
     * @param key Key
     * @param value Value
     */
    set,
    /**
     * Empty all entries and populate new entries within map.
     * @param entries Entries to populate map.
     */
    setAll,
  };
};
