import { renderBigPicture } from './render-big-pictures';
import { createRandomIdFromRangeGenerator, debounce } from './util';

const pictures = document.querySelector('.pictures');
const templatePost = document.querySelector('#picture').content.querySelector('.picture');
const similarListFragment = document.createDocumentFragment();
const imgFilters = document.querySelector('.img-filters');
const buttonFilterDefault = document.querySelector('#filter-default');
const buttonFilterRandom = document.querySelector('#filter-random');
const buttonFilterDiscussed = document.querySelector('#filter-discussed');
const PICTURE_RANDOM_COUNT = 10;

const renderPictures = (posts) => {
  posts
    .forEach((element) => {
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

  //убираем все фото
  const clearPictures = () => {
    pictures.querySelectorAll('.picture').forEach((element) => element.remove());
  };

  imgFilters.addEventListener('click', (evt) => {
    if (evt.target === buttonFilterDefault && !evt.target.classList.contains('img-filters__button--active')) {
      clearPictures();
      renderPictures(posts);
    }

    //переключаем выделение кнопки, только если клик по кнопке
    if (evt.target.classList.contains('img-filters__button')) {
      document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
    }

    if (evt.target === buttonFilterRandom) {
      const createPictureId = createRandomIdFromRangeGenerator(0, posts.length - 1);
      const randomPictures = [];
      while (randomPictures.length < PICTURE_RANDOM_COUNT) {
        randomPictures.push(posts[createPictureId()]);
      }
      clearPictures();
      renderPictures(randomPictures);
    } else if (evt.target === buttonFilterDiscussed) {
      clearPictures();
      renderPictures(
        posts
          .slice()
          .sort((pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length)
      );
    }
  });
};

export { renderPictures };
