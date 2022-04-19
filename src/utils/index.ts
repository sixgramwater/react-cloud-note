export const timeFormat = (timeStamp: number) => {
  if (!timeStamp) return "";
  let date = new Date(timeStamp*1000);
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

export const getAccessToken = () => {
  return localStorage.getItem('token');
}

export const uuid = () => {
  var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] as any & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}