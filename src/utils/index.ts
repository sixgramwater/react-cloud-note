export const timeFormat = (timeStamp: number) => {
  if (!timeStamp) return "";
  let date = new Date(timeStamp);
  return date.toJSON().substring(0, 10).replaceAll("-", ".");
};


export const throttle = (callback: Function, delay: number = 100) => {
  // timeStamp版本会立刻触发，但是容易丢失最后一次的处理，导致input值不是最新
  let previous = 0;
  return function (...args: any[]) {
    let now = +new Date();
    if (now - previous > delay) {
      previous = now;
      callback.apply(null, args);
    }
  };
};

export const throttleByTimestamp = (
  callback: Function,
  delay: number = 100
) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (...args: any[]) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        callback.apply(null, args);
      }, delay);
    }
  };
};

export function debounce (fn: Function, delay: number = 500) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: any[]) => {
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(null, args)
    }, delay)
  }
}

export function findStartIndex(num: number, nums: number[]) {
  let startIndex = nums.length - 2
  for (let i = 0; i < nums.length; i++) {
    if (num < nums[i]) {
      startIndex = i - 1
      break
    }
  }
  startIndex = Math.max(startIndex, 0) // ensure >= 0
  return startIndex
}