import {getRandomInteger, getRandomArrayElement, createIdGenerator} from './util.js';
import {NAMES, MESSAGES} from './data.js';

const commentId = createIdGenerator();

const makeComment = () => ({
  id: commentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

//const generateComments = Array.from({length: getRandomInteger(1, 30)}, makeComment);

export {makeComment};
