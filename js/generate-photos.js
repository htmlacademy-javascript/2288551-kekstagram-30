import {OBJECT_COUNT, DESCRIPTIONS} from './data.js';
import {makeComment} from './generate-comments.js';
import {getRandomInteger, createRandomIdFromRangeGenerator, getRandomArrayElement} from './util.js';

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
