import { isEscapeKey } from './util';

const closePictureButton = document.querySelector('.big-picture__cancel');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const socialCaption = document.querySelector('.social__caption');
const socialCommentTotalCount = document.querySelector('.social__comment-total-count');
const socialComments = document.querySelector('.social__comments'); // ul
const socialComment = document.querySelector('.social__comment'); // li
const socialCommentShownCount = document.querySelector('.social__comment-shown-count');
const commentsLoader = document.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openUserModal() {
  document.body.classList.add('modal-open'); // при скролле, сайт за модал окном не двигается
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
}

closePictureButton.addEventListener('click', () => {
  closeUserModal();
});

function closeUserModal() {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', closePictureButton);
}

function renderBigPicture(post) {
  openUserModal();
  bigPictureImg.src = post.url;
  likesCount.textContent = post.likes;
  socialCommentTotalCount.textContent = post.comments.length;
  socialCaption.textContent = post.description;

  //генерация комментов под фото
  generateComments(post);
}

function generateComments(post) {
  const commentBox = document.createDocumentFragment();

  post.comments.forEach((element, index) => {
    const { avatar, message, name } = element;
    const commentClone = socialComment.cloneNode(true);
    socialComment.querySelector('.social__picture').src = avatar;
    socialComment.querySelector('.social__picture').alt = name;
    socialComment.querySelector('.social__text').textContent = message;

    if (index > 4) {
      commentClone.classList.add('hidden');
    }
    /**
     * проверка кол-ва комментов, если меньше 5 убираем кнопку загрузки комментов
     * socialCommentShownCount добавляем значение кол-во видимых комментов
     */
    //нужно сделать для каждого коммента
    if (post.comments.length < 4) {
      commentsLoader.classList.add('hidden');
      socialCommentShownCount.textContent = post.comments.length;
    }

    commentBox.append(commentClone);
  });
  socialComments.innerHTML = '';//удаляет только один коммент
  //два лишних коммента из html, как удалить?
  socialComments.append(commentBox);

  // нужно сделать для каждого коммента
  commentsLoader.addEventListener('click', () => {
    const collectionCommentsHidden = socialComments.querySelectorAll('.hidden');
    console.log(collectionCommentsHidden.length);
    console.log(socialCommentShownCount.textContent);
    for (const index in collectionCommentsHidden) {

      if (index < 5) {
        collectionCommentsHidden[index].classList.remove('hidden');
        socialCommentShownCount.textContent = Number(socialCommentShownCount.textContent) + 1;
      }
      // if (collectionCommentsHidden.classList.contains('hidden')) {
      // }
      //если collectionCommentsHidden не содерж эл-ов с классом hidden, добавить кнопке класс hidden
    }
  });
  //   commentsLoader.addEventListener(
}

export { renderBigPicture };
