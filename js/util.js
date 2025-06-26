const getRandomInteger = (a, b) => {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));
  const result = Math.random() * (max - min + 1) + min;
  return Math.floor(result);
};

const shuffle = (data) => {
  let m = data.length;
  while (m) {
    const item = Math.floor(Math.random() * m--);
    [data[m], data[item]] = [data[item], data[m]];
  }
  return data;
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const throttle = (callback, delayBetweenFrames) => {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
};

const getRandomItem = (data) => data[getRandomInteger(0, data.length - 1)];
const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomInteger, shuffle, getRandomItem, isEscapeKey, debounce, throttle};
