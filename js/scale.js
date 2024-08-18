
const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const modalElement = document.querySelector('.img-upload');
const smallerButtonElement = modalElement.querySelector('.scale__control--smaller');
const biggerButtonElement = modalElement.querySelector('.scale__control--bigger');
const scaleInputElement = modalElement.querySelector('.scale__control--value');
const imageElement = modalElement.querySelector('.img-upload__preview').querySelector('img');

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  scaleInputElement.value = `${value}%`;
};

const onChangeScaleDown = () => {
  let newValue = parseInt(scaleInputElement.value, 10) - SCALE_STEP;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);
};

const onChangeScaleUp = () => {
  let newValue = parseInt(scaleInputElement.value, 10) + SCALE_STEP;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

smallerButtonElement.addEventListener('click', onChangeScaleDown);
biggerButtonElement.addEventListener('click', onChangeScaleUp);

export {resetScale};
