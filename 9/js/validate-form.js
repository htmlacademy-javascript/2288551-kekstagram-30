import { isEscapeKey } from './util';

const form = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreview = document.querySelector('.img-upload__preview img'); //туда надо положить добавленное фото
const buttonCancel = document.querySelector('#upload-cancel');
const textDescription = document.querySelector('.text__description');
const textHashtags = document.querySelector('.text__hashtags');
const hashtagRegExp = /^#[a-zа-я0-9]{1,19}$/i;
const HASHTAGS_COUNT = 5;
//отдельный файл с эффектами
// const effectSlider = document.querySelector('.effect-level__slider');
// const effectValue = document.querySelector('.effect-level__value');
// noUiSlider.create(effectSlider, {
//   range: {
//     min: 0,
//     max: 100,
//   },
//   start: 0,
//   step: 1,
//   conect: 'lower',
// });

// effectSlider.noUiSlider.on('update', () => {
//   imgUploadPreview.style = effectSlider.noUiSlider.get();
// });

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

//создаем валидацию
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'form-error'
});

//добавить загруженное фото
//  imgUploadPreview.addEventListener('load', (evt) => {
//   imgUploadPreview.src = evt.target.result;
// });

//количество хэш-тегов не более 5
function checkHashtagCount(string) {
  const arrayString = (string.toLowerCase().trim()).split(' ');
  return (arrayString.length <= HASHTAGS_COUNT);
}

//хэш-тег соответсвует регулярному выражению
function checkRegExp(string) {
  const arrayString = (string.toLowerCase().trim()).split(' ');
  if (string.length === 0) { //если string пустая не проверять
    return true;
  }
  return arrayString.every((hashtag) => hashtagRegExp.test(hashtag));
}

//хэш-тег уникален
function checkUnique(string) {
  const arrayString = (string.toLowerCase().trim()).split(' ');
  return (Array.from(new Set(arrayString)).length === arrayString.length);
}

pristine.addValidator(textHashtags, checkHashtagCount, 'не более 5 хэш-тегов');
pristine.addValidator(textHashtags, checkRegExp, 'некорректно введены хэш-теги');
pristine.addValidator(textHashtags, checkUnique, 'некорректно введены хэш-теги');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    form.submit();
  }
});

function uploadImage() {
  imgUploadInput.addEventListener('change', openForm);
}

export { uploadImage };
