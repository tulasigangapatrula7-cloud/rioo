import { useCallback, useEffect, useRef } from 'react';

// setTimeout helper that automatically clears every pending timer on unmount.
export function useTimeouts() {
  const ids = useRef(new Set());
  useEffect(() => {
    const set = ids.current;
    return () => {
      set.forEach(clearTimeout);
      set.clear();
    };
  }, []);
  return useCallback((ms, fn) => {
    const id = setTimeout(() => {
      ids.current.delete(id);
      fn();
    }, ms);
    ids.current.add(id);
    return id;
  }, []);
}

// Small deterministic random generator so decorations are stable between renders.
export function seeded(seed) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
