import { getData, sendData } from './api.js';
import { renderGallery } from './gallery.js';
import {onFormSubmit, hideModal} from'./upload-form.js';
import {showAlert, showErrorMessage, showSuccessMessage} from './util.js';
import { initial as initializeFilters, getFilteredPictures, debounce } from './filter-pictures.js';

onFormSubmit(async(data) => {
  try {
    await sendData(data);
    hideModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  const debouncedRenderGallery = debounce(renderGallery);
  initializeFilters(data, debouncedRenderGallery);
  renderGallery(getFilteredPictures());
} catch {
  showAlert();
}
