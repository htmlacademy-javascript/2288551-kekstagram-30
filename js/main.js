import { showErrorMessage } from './util';
import { renderPictures } from './render-pictures';
import { uploadImage } from './validate-form';
import { loadPictures } from './api';
import { initFilters } from './filters';

async function bootstrap() {
  try {
    const pictures = await loadPictures();
    renderPictures(pictures);
    initFilters(pictures);
    uploadImage(); //validation
  } catch (error) {
    showErrorMessage();
  }
}
bootstrap();
