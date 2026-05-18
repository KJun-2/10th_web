import { useState, useEffect, useCallback, useRef } from 'react';

function useThrottle<T>(value: T, delay: number = 500) {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    if (now >= lastExecuted.current + delay) {
      lastExecuted.current = Date.now();
      setThrottledValue(value);
    } else {
      const timerId = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, delay);
      return () => clearTimeout(timerId);
    }
  }, [value, delay]);

  return throttledValue;
}

export function useThrottledCallback(callback: () => void, delay: number, resetKey?: unknown) {
  const callbackRef = useRef(callback);
  const lastExecuted = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  callbackRef.current = callback;

  useEffect(() => {
    lastExecuted.current = 0;
  }, [resetKey]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return useCallback(() => {
    const run = () => {
      lastExecuted.current = Date.now();
      callbackRef.current();
    };

    const elapsed = Date.now() - lastExecuted.current;
    if (elapsed >= delay) {
      clearTimeout(timerRef.current);
      run();
    } else {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(run, delay - elapsed);
    }
  }, [delay]);
}

export default useThrottle;
