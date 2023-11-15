import { showErrorMessage } from './util';
import { renderPictures } from './render-pictures';
import { uploadImage } from './validate-form';
import { loadPictures } from './api';

async function bootstrap() {
  try {
    const pictures = await loadPictures();
    renderPictures(pictures);
  } catch (error) {
    showErrorMessage();
  }

  uploadImage(); //validation
}

bootstrap();
