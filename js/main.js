import {makePhoto} from './generate-photos.js';

const generatePhotos = Array.from({length: 25}, makePhoto);

console.log(generatePhotos);
/*
если вызвать просто в консоли, не работает -> Uncaught ReferenceError: generatePhotos is not defined
at <anonymous>:1:13
*/
