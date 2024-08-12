import { getData, sendData } from './api.js';
import { renderGallery } from './gallery.js';
import {onFormSubmit, hideModal} from'./upload-form.js';
import {showAlert, showErrorUploadMessage, showSuccessUploadMessage} from './util.js';
import { initial as initFilterss, getFilteredPictures, debounce } from './filter-pictures.js';

onFormSubmit(async(data) => {
  try {
    await sendData(data);
    hideModal();
    showSuccessUploadMessage();
  } catch {
    showErrorUploadMessage();
  }
});

try {
  const data = await getData();
  const debouncedRenderGallery = debounce(renderGallery);
  initFilterss(data, debouncedRenderGallery);
  renderGallery(getFilteredPictures());
} catch {
  showAlert();
}
