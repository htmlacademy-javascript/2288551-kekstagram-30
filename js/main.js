import { showErrorMessage } from './util';
import { renderPictures } from './render-pictures';
import { uploadImage } from './validate-form';
import { loadPictures } from './api';
import { initFilters } from './filters';

async function bootstrap() {
  try {
    await uploadImage(); //validation
    const pictures = await loadPictures();
    renderPictures(pictures);
    initFilters(pictures);
  } catch (error) {
    showErrorMessage();
  }
}
bootstrap();
