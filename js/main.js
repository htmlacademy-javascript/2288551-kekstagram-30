import {makePhoto} from './generate-posts.js';
import {renderPictures} from './render-pictures';

const generatePosts = Array.from({length: 25}, makePhoto);

renderPictures(generatePosts);
