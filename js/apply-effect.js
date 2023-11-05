import { imgUploadPreview } from './validate-form';

const effectSlider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.effect-level');
const effectsList = document.querySelector('.effects__list');

effectLevel.classList.add('hidden');

const chrome = {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
};
const sepia = {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
};
const marvin = {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 1,
};
const phobos = {
  range: {
    min: 0,
    max: 3,
  },
  start: 0,
  step: 0.1,
};
const heat = {
  range: {
    min: 1,
    max: 3,
  },
  start: 0,
  step: 0.1,
};
const filters = [chrome, sepia, marvin, phobos, heat];

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 1,
  connect: 'lower',
});

effectSlider.noUiSlider.on('update', () => {
  imgUploadPreview.class = effectSlider.noUiSlider.get();
});


effectsList.addEventListener('click', (evt) => {
  //если нажимать рядом с фильтром, evt.target.value будет undefined
  //на фильтр, будет value
  //console.log(evt.target);

  imgUploadPreview.removeAttribute('class'); //убираем весь класс

  evt.target.addEventListener('change', (evt) => {
    //меняем значение слайдера
  });

  const effectsPreview = `effects__preview--${evt.target.value}`;//стили фильтра
  imgUploadPreview.classList.add(effectsPreview);
  effectLevel.classList.remove('hidden');

  //ползунок убираем,тк оригинал фото
  if (evt.target.value === 'none') {
    effectLevel.classList.add('hidden');
  }
});
