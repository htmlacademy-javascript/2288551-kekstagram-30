import {OBJECT_COUNT, DESCRIPTIONS, NAMES, MESSAGES} from './data.js';
import {getRandomInteger, createRandomIdFromRangeGenerator, getRandomArrayElement, createIdGenerator} from './util.js';

const commentId = createIdGenerator();

const makeComment = () => ({
  id: commentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const photoId = createRandomIdFromRangeGenerator(1, OBJECT_COUNT);
const photoUrl = createRandomIdFromRangeGenerator(1, OBJECT_COUNT);

const makePhoto = () => ({
  id: photoId(),
  url: `photos/${photoUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(1, 30)}, makeComment)
});

export {makePhoto};
