import { imgUploadPreview } from './validate-form';

const SCALE_STEP = 25;
const MAX_SIZE = 100;
const MIN_SIZE = 25;
const effectSlider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.effect-level');
const effectsList = document.querySelector('.effects__list');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadScale = document.querySelector('.img-upload__scale');
let currentFilter;

const filters = {
  chrome: {
    name: 'grayscale',
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    suffix: ''
  },
  sepia: {
    name: 'sepia',
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    suffix: ''
  },
  marvin: {
    name: 'invert',
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    suffix: '%'
  },
  phobos: {
    name: 'blur',
    range: { min: 0, max: 3 },
    start: 3,
    step: 0.1,
    suffix: 'px'
  },
  heat: {
    name: 'brightness',
    range: { min: 1, max: 3 },
    start: 3,
    step: 0.1,
    suffix: ''
  },
};

//создаю слайдер
noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to(value) {
      return parseFloat(value);
    },
    from(value) { // from нужен, ругается nouislider.js
      return parseFloat(value);
    },
  }
});

//значение слайдера записываем в effectValue
effectSlider.noUiSlider.on('update', () => {
  const value = effectSlider.noUiSlider.get();
  effectValue.value = value;
  if(currentFilter) {
    imgUploadPreview.style.filter = `${currentFilter.name}(${value}${currentFilter.suffix})`;//``нужны для круглых скобок
  }
});

const onEffects = (evt) => {
  imgUploadPreview.removeAttribute('class'); //убираем класс
  const effectsPreview = `effects__preview--${evt.target.value}`;//стиль фильтра
  imgUploadPreview.classList.add(effectsPreview);
  effectLevel.classList.remove('hidden');

  if (filters[evt.target.value]) {
    currentFilter = filters[evt.target.value];
    /** @to-do */
    const { range: { min, max }, start, step } = filters[evt.target.value];

    effectSlider.noUiSlider.updateOptions({
      range: {
        min: min,
        max: max,
      },
      start: start,
      step: step,
    });
  }

  //ползунок убираем,тк оригинал фото
  if (evt.target.value === 'none') {
    effectLevel.classList.add('hidden');
    imgUploadPreview.style.filter = 'none';
    currentFilter = null;
  }
};

const onScaleButtons = (evt) => {
  const scaleControlNumber = parseInt(scaleControlValue.value, 10);

  if (scaleControlNumber > MIN_SIZE && evt.target.classList.contains('scale__control--smaller')) {
    imgUploadPreview.style.transform = `scale(${((scaleControlNumber - SCALE_STEP) / 100)})`;
    scaleControlValue.value = `${(scaleControlNumber - SCALE_STEP)}%`;
  } else if (scaleControlNumber < MAX_SIZE && evt.target.classList.contains('scale__control--bigger')) {
    imgUploadPreview.style.transform = `scale(${((scaleControlNumber + SCALE_STEP) / 100)})`;
    scaleControlValue.value = `${(scaleControlNumber + SCALE_STEP)}%`;
  }
};

//ф-ции для добавления фильтров и размера, передаю в openForm() и closeForm() из ./validate-form
function addEffects() {
  imgUploadScale.addEventListener('click', onScaleButtons);
  effectsList.addEventListener('click', onEffects);
  imgUploadPreview.style.transform = 'scale(1)'; //при открытии окна, фото всегда 100%
  effectLevel.classList.add('hidden');
}

function removeEffects() {
  imgUploadScale.removeEventListener('click', onScaleButtons);
  effectsList.removeEventListener('click', onEffects);
  imgUploadPreview.style.filter = 'none'; //сброс фильтра
  effectLevel.classList.add('hidden'); // прячем ползунок
}

export { addEffects, removeEffects };
