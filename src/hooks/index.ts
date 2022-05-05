import React, { useEffect, useState, useRef, useCallback } from "react"
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

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

export const useClickOutside = (ref: any, callback: Function) => {
  const handleClick = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  }, [callback, ref]);
  React.useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
};

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
}


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;