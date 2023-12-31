import { isEscapeKey } from './util';
import { addEffects, removeEffects } from './apply-effect';
import { sendPicture } from './api';
import { showSuccessMessage, showErrorMessage } from './messages';

const form = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('#upload-file'); //загружаем фото
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreview = document.querySelector('.img-upload__preview img'); //отобразить добавленное фото
const buttonCancel = document.querySelector('#upload-cancel');
const textDescription = document.querySelector('.text__description');
const textHashtags = document.querySelector('.text__hashtags');
const submitButton = document.querySelector('#upload-submit');
const effectsPreviews = document.querySelectorAll('.effects__preview');
const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAGS_COUNT = 5;
const FILE_EXTENSIONS = ['jpg', 'jpeg', 'png'];
const submitButtonCaption = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled
    ? submitButtonCaption.SENDING
    : submitButtonCaption.IDLE;
};

function isErrorMessage() {
  return Boolean(document.querySelector('.error'));
}

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isErrorMessage()) {
    evt.preventDefault();
    closeForm();
  }
};

const onTextKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

//создаем валидацию
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

async function setUserFormSubmit(formElement) {
  if (!pristine.validate()) {
    return;
  }
  pristine.reset();
  //нужен именно такой порядок в try
  try {
    toggleSubmitButton(true);
    await sendPicture(new FormData(formElement));
    closeForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  } finally {
    toggleSubmitButton(false);
  }
}

const onFormSubmit = (evt) => {
  evt.preventDefault();
  setUserFormSubmit(evt.target);
};

function openForm() {
  document.body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
  addEffects();
  document.addEventListener('keydown', onDocumentKeydown);
  textDescription.addEventListener('keydown', onTextKeydown);
  textHashtags.addEventListener('keydown', onTextKeydown);
}

buttonCancel.addEventListener('click', () => {
  closeForm();
});

function closeForm() {
  form.reset();
  pristine.reset();
  imgUploadPreview.src = 'img/upload-default-image.jpg';
  effectsPreviews.forEach((preview) => {
    preview.removeAttribute('style');
  });
  document.body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  removeEffects();
  document.removeEventListener('keydown', onDocumentKeydown);
  textDescription.removeEventListener('keydown', onTextKeydown);
  textHashtags.removeEventListener('keydown', onTextKeydown);
}

//проверка загруженного файла
const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_EXTENSIONS.some((item) => fileName.endsWith(item));
};

//добавить загруженное фото
const onFileInputChange = () => {
  const file = imgUploadInput.files[0];
  if (file && isValidType(file)) {
    imgUploadPreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${imgUploadPreview.src}')`;
    });
  }
  openForm();
};

//количество хэш-тегов не более 5
function checkHashtagCount(arrayString) {
  return (arrayString.length <= HASHTAGS_COUNT);
}

//хэш-тег соответсвует регулярному выражению
function checkRegExp(arrayString) {
  return arrayString.every((hashtag) => hashtagRegExp.test(hashtag));
}

//хэш-тег уникален
function checkUnique(arrayString) {
  return (new Set(arrayString).size === arrayString.length);
}

const getValidator = (type) => (string) => {
  if (string.length === 0) { //если string пустая не проверять
    return true;
  }
  const arrayString = (string.toLowerCase().trim()).split(' ').filter((tag) => Boolean(tag.length));

  switch (type) {
    case 'count':
      return checkHashtagCount(arrayString);
    case 'regExp':
      return checkRegExp(arrayString);
    case 'unique':
      return checkUnique(arrayString);
  }
};

pristine.addValidator(textHashtags, getValidator('count'), 'не более 5 хэш-тегов');
pristine.addValidator(textHashtags, getValidator('regExp'), 'некорректно введен хэш-тег');
pristine.addValidator(textHashtags, getValidator('unique'), 'хэш-теги не должны повторяться');

async function uploadImage() {
  imgUploadInput.addEventListener('change', onFileInputChange);
  form.addEventListener('submit', onFormSubmit);
}

export { uploadImage, imgUploadPreview, onDocumentKeydown };
