const OBJECT_COUNT = 25;

const NAMES = [
  'Кузьма',
  'Прасковья',
  'Инга',
  'Шерлок',
  'Феликс',
  'Тамара',
  'Яна',
  'Святослав',
  'Абрам',
  'Глафира'
];

const DESCRIPTIONS = [
  'важный',
  'знаменитый',
  'ласковый',
  'вечный',
  'смешанный',
  'исполнительный',
  'интенсивный',
  'смеющийся',
  'блестящий',
  'утренний'
];

const MESSAGES = [
  'Всё отлично!',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.'
];

function createIdGenerator() {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min,max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const commentId = createIdGenerator();
const photoId = createRandomIdFromRangeGenerator(1, OBJECT_COUNT);
const photoUrl = createRandomIdFromRangeGenerator(1, OBJECT_COUNT);

const makeComment = () => ({
  id: commentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

function similarComment () {
  return Array.from({length: getRandomInteger(1, 30)}, makeComment);
}

const photo = () => ({
  id: photoId(),
  url: `photos/${photoUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15,200),
  comments: similarComment()
});

function makePhotos () {
  return Array.from({length: 25}, photo);
}
