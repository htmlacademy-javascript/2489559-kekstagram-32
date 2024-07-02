const idNumber = createRandomIdFromRangeGenerator(1, 25); // уникальный идентификатор
const urlPhoto = createRandomIdFromRangeGenerator(1, 25); // уникальная фотография
const likesCount = createRandomIdFromRangeGenerator(15, 200); // от 15 до 200 количество лайков

// Описания к постам
const descriptionText = [
  'Хорошо провел свой день!',
  'Гулял сегодня со своей собакой!',
  'Наконец-то долгожданный отпуск',
  'Вот что я сегодня увидел',
  'Любуюсь красивыми пейзажами, а вы?'
];

// Имена комментаторов
const nameVariants = [
  'Мария',
  'Артём',
  'Елена',
  'Денис',
  'Александр',
  'Евгений',
  'Евгения',
  'Пётр'
];

// Сообщения комментаторов
const message = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'ица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

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
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

// Создание комментариев к посту
const postComments = () => ({
  id: getRandomInteger(1, 999),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(message),
  name: getRandomArrayElement(nameVariants),
});

const similarComments = Array.from({length: getRandomInteger(0, 30)}, postComments);


// Создание поста
const createPost = () => ({
  id: idNumber(),
  avatar: `photos/${urlPhoto()}.jpg`,
  description: getRandomArrayElement(descriptionText),
  likes: likesCount(),
  comments: similarComments,
});

// Генератор 25 постов
const similarPosts = () => (Array.from({length: 25}, createPost));

similarPosts();
