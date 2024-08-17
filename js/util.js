
const ALERT_SHOW_TIME = 5000;
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


const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

function hideMessage() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeyDown);
  body.removeEventListener('click', onBodyClick);
}

function onBodyClick(evt) {
  if (
    evt.target.closest('.success__inner') || evt.target.closest('.error__inner')
  ) {
    return;
  }
  hideMessage();
}

function onDocumentKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage();
  }
}

const showMessage = (messageElement, closeButtonClass) => {
  body.append(messageElement);
  document.addEventListener('keydown', onDocumentKeyDown);
  body.addEventListener('click', onBodyClick);
  messageElement.querySelector(closeButtonClass).addEventListener('click', hideMessage);
};

const showSuccessMessage = () => {
  showMessage(successTemplate, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorTemplate, '.error__button');
};


const showAlert = () => {
  const dataErrorElement = dataErrorTemplate.cloneNode(true);
  document.body.append(dataErrorElement);
  setTimeout(() => {
    dataErrorElement.remove();
  }, ALERT_SHOW_TIME);
};

export {showAlert, showSuccessMessage, showErrorMessage};
export {getRandomArrayElement};
export {createRandomIdFromRangeGenerator};
export {getRandomInteger};
