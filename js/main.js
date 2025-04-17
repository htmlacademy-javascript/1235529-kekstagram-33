const CARDS_COUNT = 25;

const DESCRIPTIONS = [
  'Горы Китая',
  'Котопес',
  'Жизнь у моря',
  'Солнечная лагуна',
];

const COMMENTS_ID_COUNT = {
  MIN: 0,
  MAX: 250,
};

const LIKES_COUNT = {
  MIN: 15,
  MAX: 250,
};

const AVATAR_COUNT = {
  MIN: 0,
  MAX: 6,
};

const URL_COUNT = {
  MIN: 1,
  MAX: 25,
};

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

//генерация рандомного числа от min до max
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//генерация чисел от min до max по порядку
const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generatePhotoId = createIdGenerator();

//генерация числа из заданого промежутка без повторения значений
const createRandomNumberFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const generateUrlNumber = createRandomNumberFromRangeGenerator(URL_COUNT.MIN, URL_COUNT.MAX);

//взятие рандомного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//генерируем массив с описанием фотографии
const createPhotoDescription = () => ({
  id: generatePhotoId(),
  url: `photos/${generateUrlNumber()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_COUNT.MIN, LIKES_COUNT.MAX),
  comments:{
    id: getRandomInteger(COMMENTS_ID_COUNT.MIN, COMMENTS_ID_COUNT.MAX),
    name: getRandomArrayElement(NAMES),
    avatar: `img/avatar-${getRandomInteger(AVATAR_COUNT.MIN, AVATAR_COUNT.MAX)}.svg`,
    message: getRandomArrayElement(MESSAGES),
  },
});

//создаем массив из 25 обьектов
const getCards = Array.from({length: CARDS_COUNT}, createPhotoDescription);

getCards(); //для линтера
