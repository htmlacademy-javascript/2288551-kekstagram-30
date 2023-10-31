import { isEscapeKey } from './util';

const form = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreview = document.querySelector('.img-upload__preview img'); //туда надо положить добавленное фото
const buttonCancel = document.querySelector('#upload-cancel');
const textDescription = document.querySelector('.text__description');
const textHashtags = document.querySelector('.text__hashtags');
const hashtagRegExp = /^#[a-zа-я0-9]{1,19}$/i;
const HASHTAG_COUNT = 5;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm(); //другая ф-ция, нельзя взять из render-big-picture
  }
};

const onTextKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

function openForm() {
  document.body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  textDescription.addEventListener('keydown', onTextKeydown);
  textHashtags.addEventListener('keydown', onTextKeydown);
}

buttonCancel.addEventListener('click', () => {
  closeForm();
});

function closeForm() {
  form.reset();
  document.body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', closeForm);
  textDescription.removeEventListener('keydown', onTextKeydown);
  textHashtags.removeEventListener('keydown', onTextKeydown);
}

// ?.addEventListener('load', (evt) => {
//   imgUploadPreview.src = evt.target.result;
// });

// const pristine = new Pristine(form);
function validateHashtags(hashtags) {
  const arrayHashtags = (hashtags.toLowerCase()).split(' '); // делаем массив из строчки
  if (arrayHashtags.length > HASHTAG_COUNT) { //проверяем кол-во хэштегов
    console.log("много хэштегов"); // сделать ошибку pristine, если много
  } else {
    arrayHashtags.every((hashtag) => hashtagRegExp.test(hashtag));
  }
  //проверить чтоб хэштеги не повторялись
}


// form.addEventListener('submit', (evt) => {
//   evt.preventDefault();
// });

function uploadImage() {
  imgUploadInput.addEventListener('change', openForm);
}

export { uploadImage };
