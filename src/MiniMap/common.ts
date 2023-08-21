export const throttle = (callback: () => void, time: number) => {
  let isWait = true;
  return () => {
    if (isWait) {
      let timeOut: number = 0;
      callback();
      isWait = false;
      timeOut = setTimeout(() => {
        isWait = true;
        clearTimeout(timeOut);
      }, time);
    }
  };
};
