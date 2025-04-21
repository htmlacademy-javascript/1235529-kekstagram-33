const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
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

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export {getRandomInteger, shuffle, getRandomArrayElement};
