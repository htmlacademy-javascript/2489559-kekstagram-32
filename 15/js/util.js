import { hideModal } from './upload-form.js';
// Рандомайзер
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
//Рандомный элемент массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Создание уникального ID/Photo
function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const ALERT_SHOW_TIME = 5000;
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const showAlert = () => {
  const dataErrorElement = dataErrorTemplate.cloneNode(true);
  document.body.append(dataErrorElement);
  setTimeout(() => {
    dataErrorElement.remove();
  }, ALERT_SHOW_TIME);
};

const showSuccessUploadMessage = () => {
  const cloned = successTemplate.cloneNode(true);
  const successButton = cloned.querySelector('.success__button');

  const closeModal = () => {
    document.removeEventListener('keydown', onEscape);
    cloned.remove();
  };

  function onEscape(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }

  successButton.addEventListener('click', closeModal);
  document.body.insertAdjacentElement('beforeend', cloned);
  document.addEventListener('keydown', onEscape);
};

const showErrorUploadMessage = () => {
  const cloned = errorTemplate.cloneNode(true);
  const errorButton = cloned.querySelector('.error__button');

  const closeForm = () => {
    document.removeEventListener('keydown', onEscape);
    cloned.remove();
    hideModal();
  };

  function onEscape(e) {
    if (e.key === 'Escape') {
      closeForm();
    }
  }

  errorButton.addEventListener('click', hideModal);
  document.body.insertAdjacentElement('beforeend', cloned);
  document.addEventListener('keydown', onEscape);
};

export {showAlert, showErrorUploadMessage, showSuccessUploadMessage};
export {getRandomArrayElement};
export {createRandomIdFromRangeGenerator};
export {getRandomInteger};
