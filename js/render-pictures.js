//import { generatePosts } from './main.js';

const pictures = document.querySelector('.pictures');
const templatePost = document.querySelector('#picture').content.querySelector('.picture');
const similarListFragment = document.createDocumentFragment();

function createPosts(posts) {
  posts.forEach(({url, description, comments, likes}) => {
    const post = templatePost.cloneNode(true);
    post.querySelector('.picture__img').src = url;
    post.querySelector('.picture__img').alt = description;
    post.querySelector('.picture__comments').textContent = comments.length;
    post.querySelector('.picture__likes').textContent = likes;
    similarListFragment.append(post);
  });

  pictures.append(similarListFragment);
}
export {createPosts};
