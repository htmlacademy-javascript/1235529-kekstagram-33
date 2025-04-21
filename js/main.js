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

const COMMENTS_COUNT = {
  MIN: 0,
  MAX: 30,
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
  'Это не мамины гены, это я',
  'Любовь к себе — лучшая любовь',
  'Внутри я также прекрасна, как и снаружи',
  'Будь холмом в мире равнин',
  'Улыбайтесь шире, смейтесь чаще',
  'Иногда вам просто необходимо собственное солнце',
  'Соленая, но сладкая',
];

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

const getRandomMessages = () =>{
  const shuffledMessages = shuffle([...MESSAGES]);
  return getRandomInteger(0, 1) === 1 ? shuffledMessages[0] : `${shuffledMessages[0]} ${shuffledMessages[1]}`;
};

const createPhotoComment = () => ({
  id: getRandomInteger(COMMENTS_ID_COUNT.MIN, COMMENTS_ID_COUNT.MAX),
  name: getRandomArrayElement(NAMES),
  avatar: `img/avatar-${getRandomInteger(AVATAR_COUNT.MIN, AVATAR_COUNT.MAX)}.svg`,
  message: getRandomMessages(),
});

const createPhotoDescription = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_COUNT.MIN, LIKES_COUNT.MAX),
  comments: Array.from({length: getRandomInteger(COMMENTS_COUNT.MIN, COMMENTS_COUNT.MAX)}, createPhotoComment),
});


const getCards = () => {
  const ids = Array.from({ length: CARDS_COUNT }, (_, i) => i + 1);
  return shuffle(ids).map(createPhotoDescription);
};

console.log(getCards());


