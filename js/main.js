import { showErrorMessage } from './util';
import { renderPictures } from './render-pictures';
import { uploadImage } from './validate-form';
import { loadPictures } from './api';

async function bootstrap() {
  try {
    const pictures = await loadPictures();
    renderPictures(pictures);
    //делаем фильтры видимыми, когда картинки загрузились
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  } catch (error) {
    showErrorMessage();
  }

  uploadImage(); //validation
}

bootstrap();
