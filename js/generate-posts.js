import {OBJECT_COUNT, DESCRIPTIONS, NAMES, MESSAGES} from './data.js';
import {getRandomInteger, createRandomIdFromRangeGenerator, getRandomArrayElement, createIdGenerator} from './util.js';

const START_GENERATE_NUMBER = 1;
const END_AVATAR_NUMBER = 6;
const END_COMMENT_NUMBER = 30;
const START_LIKE_NUMBER = 15;
const END_LIKE_NUMBER = 200;

const commentId = createIdGenerator();

const makeComment = () => ({
  id: commentId(),
  avatar: `img/avatar-${getRandomInteger(START_GENERATE_NUMBER, END_AVATAR_NUMBER)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const photoId = createRandomIdFromRangeGenerator(START_GENERATE_NUMBER, OBJECT_COUNT);
const photoUrl = createRandomIdFromRangeGenerator(START_GENERATE_NUMBER, OBJECT_COUNT);

const makePhoto = () => ({
  id: photoId(),
  url: `photos/${photoUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(START_LIKE_NUMBER, END_LIKE_NUMBER),
  comments: Array.from({length: getRandomInteger(START_GENERATE_NUMBER, END_COMMENT_NUMBER)}, makeComment)
});

export {makePhoto};
