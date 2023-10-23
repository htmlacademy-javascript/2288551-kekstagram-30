import {makePhoto} from './generate-posts.js';
import {createPosts} from './render-pictures';
const generatePosts = Array.from({length: 25}, makePhoto);

console.log(createPosts(generatePosts));
//export {generatePosts};
