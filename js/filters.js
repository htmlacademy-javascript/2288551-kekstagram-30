import { createRandomIdFromRangeGenerator, debounce } from './util';
import { picturesContainer, renderPictures } from './render-pictures';

const PICTURE_RANDOM_COUNT = 10;
const FiltersNames = {
  FILTER_DEFAULT: 'filter-default',
  FILTER_RANDOM: 'filter-random',
  FILTER_DISCUSSED: 'filter-discussed'
};
const imgFiltersForm = document.querySelector('.img-filters__form');

//убираем все фото
const clearPictures = () => {
  picturesContainer.querySelectorAll('.picture').forEach((element) => element.remove());
};

//делаем фильтры видимыми
const showFilters = () => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

//переключаем выделение кнопки, только если клик по кнопке
const onFilterButtonClick = (evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
  }
};

const rerenderPictures = (data) => {
  clearPictures();
  renderPictures(data);
};

const debounceRerender = debounce(rerenderPictures);

const filtersFunctions = {
  [FiltersNames.FILTER_DEFAULT]: (data) => {
    debounceRerender(data);
  },
  [FiltersNames.FILTER_RANDOM]: (data) => {
    const createPictureId = createRandomIdFromRangeGenerator(0, data.length - 1);
    const randomPictures = [];
    const min = Math.min(PICTURE_RANDOM_COUNT, data.length);
    while (randomPictures.length < min) {
      randomPictures.push(data[createPictureId()]);
    }
    debounceRerender(randomPictures);
  },
  [FiltersNames.FILTER_DISCUSSED]: (data) => {
    debounceRerender(
      data
        .slice()
        .sort((pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length)
    );
  }
};

const changeImgFilter = (posts) => {
  imgFiltersForm.addEventListener('click', (evt) => {
    filtersFunctions[evt.target.id](posts); //выбираем функцию по id кнопки
    onFilterButtonClick(evt);
  });
};

const initFilters = (posts) => {
  showFilters();
  changeImgFilter(posts);
};

export { initFilters };
