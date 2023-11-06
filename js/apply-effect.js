import { imgUploadPreview } from './validate-form';

const effectSlider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.effect-level');
const effectsList = document.querySelector('.effects__list');

effectLevel.classList.add('hidden');

const filters = {
  chrome: {
    name: 'grayscale',
    range: { min: 0, max: 1 },
    start: 0,
    step: 0.1,
  },
  sepia: {
    name: 'sepia',
    range: { min: 0, max: 1 },
    start: 0,
    step: 0.1,
  },
  marvin: {
    name: 'invert',
    range: { min: 0, max: 100 },
    start: 0,
    step: 1,
    format: {
      to (value) {
        return `${Number(value).toFixed(0)}%`;
      },
      from (value) {
        return parseFloat(value);
      },
    }
  },
  phobos: {
    name: 'blur',
    range: { min: 0, max: 3 },
    start: 0,
    step: 0.1,
    format: {
      to (value) {
        return `${Number(value).toFixed(1)}px`;
      },
      from (value) {
        return parseFloat(value);
      },
    }
  },
  heat: {
    name: 'brightness',
    range: { min: 1, max: 3 },
    start: 0,
    step: 0.1,
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
    to (value) {
      return Number(value).toFixed(1);
    },
    from (value) {
      return parseFloat(value);
    },
  }
});

effectsList.addEventListener('click', (evt) => {
  //если нажимать рядом с фильтром, evt.target.value будет undefined
  //на фильтр, будет value
  //console.log(evt.target);

  imgUploadPreview.removeAttribute('class'); //убираем класс
  const effectsPreview = `effects__preview--${evt.target.value}`;//стиль фильтра
  imgUploadPreview.classList.add(effectsPreview);
  effectLevel.classList.remove('hidden');
  //effectLevel.noUiSlider.destroy();
  let styleName = '';

  //по ключу нахожу настройки слайдера
  for (const key in filters) {
    if (evt.target.value === key) {
      styleName = filters[key].name;
      const { range: { min, max }, start, step, format } = filters[key];

      effectSlider.noUiSlider.updateOptions({
        range: {
          min: min,
          max: max,
        },
        start: start,
        step: step,
      });
    }
  }
  //значение слайдера записываем в effectValue
  effectSlider.noUiSlider.on('update', () => {
    effectValue.value = effectSlider.noUiSlider.get();
    imgUploadPreview.style.filter = `${styleName}(${(String(effectValue.value))})`;//``нужны для круглых скобок
  });

  //ползунок убираем,тк оригинал фото
  if (evt.target.value === 'none') {
    effectLevel.classList.add('hidden');
    imgUploadPreview.style.filter = 'none';
  }
});

//у всех убираем сотые, десятичные оставляем, кроме marvin
// .effects__preview--chrome {
//           filter: grayscale(1);
// }

// .effects__preview--sepia {
//           filter: sepia(1);
// }

// .effects__preview--marvin {
//           filter: invert(100%); делаем целое
// }

// .effects__preview--phobos {
//           filter: blur(3px);
// }

// .effects__preview--heat {
//           filter: brightness(3);
// }
