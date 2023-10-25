import { renderBigPictures, onDocumentKeydown, bigPicture } from './render-big-pictures';

const pictures = document.querySelector('.pictures');
const templatePost = document.querySelector('#picture').content.querySelector('.picture');
const similarListFragment = document.createDocumentFragment();

function renderPictures(posts) {
  posts.forEach((element) => { //{ url, description, comments, likes }
    const post = templatePost.cloneNode(true);
    post.querySelector('.picture__img').src = element.url;
    post.querySelector('.picture__img').alt = element.description;
    post.querySelector('.picture__comments').textContent = element.comments.length;
    post.querySelector('.picture__likes').textContent = element.likes;
    similarListFragment.append(post);

    // для просмотра фотографий в полноразмерном режиме
    post.addEventListener('click', (evt) => {
      renderBigPictures(element); // функция для отрисовки фото
      evt.preventDefault();// элемент-ссылка, убрать действие по умолчанию
      document.body.classList.add('modal-open'); // при скролле, сайт за модал окном не двигается
      bigPicture.classList.remove('hidden');
      document.addEventListener('keydown', onDocumentKeydown);
    });
  });

  pictures.append(similarListFragment);
}

export { renderPictures };
