import { renderBigPicture } from './render-big-pictures';

const pictures = document.querySelector('.pictures');
const templatePost = document.querySelector('#picture').content.querySelector('.picture');
const similarListFragment = document.createDocumentFragment();

const renderPictures = (posts) => {
  posts.forEach((element) => {
    const { url, description, comments, likes } = element;
    const post = templatePost.cloneNode(true);
    post.querySelector('.picture__img').src = url;
    post.querySelector('.picture__img').alt = description;
    post.querySelector('.picture__comments').textContent = comments.length;
    post.querySelector('.picture__likes').textContent = likes;
    similarListFragment.append(post);

    // для просмотра фотографий в полноразмерном режиме
    post.addEventListener('click', (evt) => {
      evt.preventDefault();// элемент-ссылка, убрать действие по умолчанию
      renderBigPicture(element); // функция для отрисовки фото
    });
  });

  pictures.append(similarListFragment);
};

export { renderPictures, pictures };
