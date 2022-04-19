import React, { useEffect, useState, useRef, useCallback } from "react"

export const useThrottle = (fn: Function, delay: number, deps: React.DependencyList = []) => {
  let previous = useRef(0);
  let [time, setTime] = useState(delay);
  useEffect(() => {
    let now = Date.now();
    if (now - previous.current > time) {
      fn();
      previous.current = now;
    }
  }, deps)

  const cancel = () => {
    setTime(0);
  }


  // eslint-igonre-next-line
  // useEffect(() => {
  //   current.fn = fn;
  // }, [fn]);

  return [cancel];
}