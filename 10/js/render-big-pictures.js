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
const COMMENTS_PORTION = 5;

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
  commentsLoader.addEventListener('click', showMoreComments);
}

function closeUserModal() {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', closePictureButton);
  commentsLoader.removeEventListener('click', showMoreComments);
}

closePictureButton.addEventListener('click', () => {
  closeUserModal();
});

function renderBigPicture(post) {
  openUserModal();
  bigPictureImg.src = post.url;
  likesCount.textContent = post.likes;
  socialCommentTotalCount.textContent = post.comments.length;
  socialCaption.textContent = post.description;

  //генерация комментов под фото
  generateComments(post);

  //отображение кнопки загрузки
  if (post.comments.length < COMMENTS_PORTION) {
    commentsLoader.classList.add('hidden');
    socialCommentShownCount.textContent = post.comments.length; //число отображаемых комментов кладем кол-во комментов
  } else {
    commentsLoader.classList.remove('hidden');
    socialCommentShownCount.textContent = COMMENTS_PORTION;
  }
}

function generateComments(post) {
  const commentBox = document.createDocumentFragment();

  post.comments.forEach((element, index) => {
    const { avatar, message, name } = element;
    const commentClone = socialComment.cloneNode(true);
    commentClone.querySelector('.social__picture').src = avatar;
    commentClone.querySelector('.social__picture').alt = name;
    commentClone.querySelector('.social__text').textContent = message;

    //добавляем класс hidden эл-там которые не отображаем
    if (index > COMMENTS_PORTION - 1) {
      commentClone.classList.add('hidden');
    }

    commentBox.append(commentClone);
  });
  socialComments.innerHTML = '';
  socialComments.append(commentBox);
}

function showMoreComments () {
  const allComments = socialComments.querySelectorAll('.social__comment').length;
  const collectionCommentsHidden = socialComments.querySelectorAll('.hidden');
  for (const index in collectionCommentsHidden) {

    if (index < COMMENTS_PORTION) {
      collectionCommentsHidden[index].classList.remove('hidden');
      socialCommentShownCount.textContent = Number(socialCommentShownCount.textContent) + 1;
    }
    //сравниваем кол-во всех комментов с загруженными
    if(allComments === Number(socialCommentShownCount.textContent)) {
      commentsLoader.classList.add('hidden');
    }
  }
}

export { renderBigPicture, commentsLoader };
