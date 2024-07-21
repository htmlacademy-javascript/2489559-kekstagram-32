import {getRandomArrayElement} from './util.js';
import {createRandomIdFromRangeGenerator} from './util.js';
import {getRandomInteger} from './util.js';

const idNumber = createRandomIdFromRangeGenerator(1, 25); // уникальный идентификатор
const urlPhoto = createRandomIdFromRangeGenerator(1, 25); // уникальная фотография
const likesCount = createRandomIdFromRangeGenerator(15, 200); // от 15 до 200 количество лайков

// Описания к постам
const descriptionTexts = [
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
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'ица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Создание комментариев к посту
const postComments = () => ({
  id: getRandomInteger(1, 999),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(messages),
  name: getRandomArrayElement(nameVariants),
});

// Создание поста
const createPost = () => ({
  id: idNumber(),
  url: `photos/${urlPhoto()}.jpg`,
  description: getRandomArrayElement(descriptionTexts),
  likes: likesCount(),
  comments: Array.from({length: getRandomInteger(0, 30)}, postComments),
});

// Генератор 25 постов
const similarPosts = () => (Array.from({length: 25}, createPost));

export {similarPosts};
