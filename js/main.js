import { makePhoto } from './generate-posts.js';
import { renderPictures } from './render-pictures';
import { uploadImage } from './validate-form';

const POST_COUNT = 25;
const generatePosts = Array.from({ length: POST_COUNT }, makePhoto);

renderPictures(generatePosts);
uploadImage();
