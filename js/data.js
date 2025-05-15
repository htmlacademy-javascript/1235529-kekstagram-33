import {getRandomInteger, shuffle, getRandomItem} from './util.js';

const CARDS_COUNT = 25;
const URL_COUNT = 25;
const QUANTITY_ARRAYS = 25;

const COMMENTS_ID_COUNT = {
  MIN: 0,
  MAX: 250,
};

const LIKES_COUNT = {
  MIN: 15,
  MAX: 250,
};

const AVATAR_COUNT = {
  MIN: 1,
  MAX: 6,
};

const COMMENTS_COUNT = {
  MIN: 0,
  MAX: 30,
};

const DESCRIPTIONS = [
  'Горы Китая',
  'Котопес',
  'Жизнь у моря',
  'Солнечная лагуна',
];

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
  'Это не мамины гены, это я',
  'Любовь к себе — лучшая любовь',
  'Внутри я также прекрасна, как и снаружи',
  'Будь холмом в мире равнин',
  'Улыбайтесь шире, смейтесь чаще',
  'Иногда вам просто необходимо собственное солнце',
  'Соленая, но сладкая',
];

const getRandomMessages = () =>{
  const shuffledMessages = shuffle([...MESSAGES]);
  return getRandomInteger(0, 1) === 1 ? shuffledMessages[0] : `${shuffledMessages[0]} ${shuffledMessages[1]}`;
};

const createPhotoComment = () => ({
  id: getRandomInteger(COMMENTS_ID_COUNT.MIN, COMMENTS_ID_COUNT.MAX),
  name: getRandomItem(NAMES),
  avatar: `img/avatar-${getRandomInteger(AVATAR_COUNT.MIN, AVATAR_COUNT.MAX)}.svg`,
  message: getRandomMessages(),
});

const getShuffledData = (count) =>{
  const data = Array.from({ length: count }, (_, i) => i + 1);
  return shuffle(data);
};

const urlIds = getShuffledData(URL_COUNT);

const createPhotoDescription = (id, i) => ({
  id,
  url: `photos/${urlIds[i]}.jpg`,
  description: getRandomItem(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_COUNT.MIN, LIKES_COUNT.MAX),
  comments: Array.from({length: getRandomInteger(COMMENTS_COUNT.MIN, COMMENTS_COUNT.MAX)}, createPhotoComment),
});

const getCards = () => getShuffledData(CARDS_COUNT).map(createPhotoDescription);

const createDescriptionPhoto = Array.from ({length: QUANTITY_ARRAYS}, createPhotoDescription);

export {getCards, createDescriptionPhoto};
