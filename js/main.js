const OBJECT_COUNT = 25;

const NAME = [
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

const DESCRIPTION = [
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

const MESSAGE = [
  'Всё отлично!',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.'
];


const createIdGenerator = function () {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

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

const photo = () => ({
  id: photoId,
  url: `photos/${photoUrl}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(15,200),
  comments: {
    id: commentId,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(NAME),
  }
});
// нужна функция генерации comments 0 - 30
