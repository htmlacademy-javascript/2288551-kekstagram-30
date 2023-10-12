const OBJECT_COUNT = 25;

const NAME = [
  'Кузьма',
  'Прасковья',
  'Инга',
  'Шерлок',
  'Феликс',
  'Тамара',
  'Яна',
  'Святослав',
  'Абрам',
  'Глафира'
];

const DESCRIPTION = [
  'важный',
  'знаменитый',
  'ласковый',
  'вечный',
  'смешанный',
  'исполнительный',
  'интенсивный',
  'смеющийся',
  'блестящий',
  'утренний'
];

const MESSAGE = [
  'Всё отлично!',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.'
];

function getRandomInteger (min, max) {
  let lower = Math.ceil(Math.min(min, max));
  let upper = Math.floor(Math.max(min,max));
  let result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const photo = {
  id: '',
  url: 'photos/{{i}}.jpg, i от 1 до 25, не должны повторяться',
  description: '',
  likes: getRandomInteger(15,200),
  comments: {
    id: 'любое число. не должны повторяться',
    avatar: 'формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg',
    message: '',
    name: '',
  }
};
