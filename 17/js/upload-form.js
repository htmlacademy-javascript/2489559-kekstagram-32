import {destroyFilters, initFilters} from './filters.js';
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const ErrorText = {
  INVALID_COUNT: 'Максимум 5 хештегов',
  NOT_UNIQUE: 'Хештеги не должны повторяться',
  INVALID_PATTERN: 'Неправильный хэштег',
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const fileField = document.querySelector('.img-upload__input');
const hashtagField = document.querySelector('.text__hashtags');
const submitButtonElement = document.querySelector('.img-upload__submit');
const previevPhoto = document.querySelector('.img-upload__preview').querySelector('img');
const photoEffects = document.querySelectorAll('.effects__preview');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown',onDocumentKeydown);
  initFilters();
};

const hideModal = () => {
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown',onDocumentKeydown);
  destroyFilters();
};

const isValidPhoto = (photo) => {
  const fileName = photo.name.toLowerCase();
  return FILE_TYPES.some((file) => fileName.endsWith(file));
};


const onFileInputChange = () => {
  const file = fileField.files[0];
  if (file && isValidPhoto(file)) {
    previevPhoto.src = URL.createObjectURL(file);
    photoEffects.forEach((preview) => {
      preview.style.backgroundImage = `url('${previevPhoto.src}')`;
    });
  }
  showModal();
};

const onCancelButtonClick = () => {
  hideModal();
};
const normalizeTags = (string) => string.split(' ').map((tag) => tag.trim()).filter((tag) => tag);

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

const hasValidCount = (value) => {
  const array = normalizeTags(value);
  return array.length <= 5;
};

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const submitFormTexts = {
  IDLE: 'Опубликовать',
  SUBMITTING: 'Отправляем',
};

const togleSubmitButton = (isDisabled) => {
  submitButtonElement.disabled = isDisabled;
  submitButtonElement.textContent = isDisabled
    ? submitFormTexts.SUBMITTING
    : submitFormTexts.IDLE;
};
const onFormSubmit = (callback) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      togleSubmitButton(true);
      await callback(new FormData(form));
      togleSubmitButton();
    }
  });
};

const isErrorMesageShown = () => Boolean(document.querySelector('.error'));

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape' && !isErrorMesageShown) {
    evt.preventDefault();
    hideModal();
  }
}
pristine.addValidator(
  hashtagField,
  hasValidCount,
  ErrorText.INVALID_COUNT,
  3,
  true
);

pristine.addValidator(
  hashtagField,
  hasUniqueTags,
  ErrorText.NOT_UNIQUE,
  2,
  true
);
pristine.addValidator(
  hashtagField,
  hasValidTags,
  ErrorText.INVALID_PATTERN,
  1,
  true
);

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);

export {onFormSubmit, hideModal};
