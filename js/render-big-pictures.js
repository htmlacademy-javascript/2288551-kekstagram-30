import { isEscapeKey } from './util';

const closePictureButton = document.querySelector('.big-picture__cancel');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const socialCaption = document.querySelector('.social__caption');
// const socialCommentShownCount = document.querySelector('.social__comment-shown-count');
const socialCommentTotalCount = document.querySelector('.social__comment-total-count');
const socialComments = document.querySelector('.social__comments'); // ul
const socialComment = document.querySelector('.social__comment'); // li


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
  bigPictureImg.src = post.url;
  likesCount.textContent = post.likes;
  // socialCommentShownCount.textContent = post.comments.length; как определять кол-во показываемых комментов?
  socialCommentTotalCount.textContent = post.comments.length;
  socialCaption.textContent = post.description;

  //генерация комментов под фото
  generateComments(post);
}

function generateComments(post) {
  const commentBox = document.createDocumentFragment();

  post.comments.forEach(({ avatar, message, name }) => {
    const commentClone = socialComment.cloneNode(true);
    socialComment.querySelector('.social__picture').src = avatar;
    socialComment.querySelector('.social__picture').alt = name;
    socialComment.querySelector('.social__text').textContent = message;
    commentBox.append(commentClone);
  });

  socialComments.innerHTML = '';//удаляет только один коммент
  //два лишних коммента из html, как удалить?
  socialComments.append(commentBox);
}

export { renderBigPicture, openUserModal };
