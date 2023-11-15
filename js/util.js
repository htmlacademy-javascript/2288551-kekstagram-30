// function createIdGenerator() {
//   let lastGeneratedId = 0;
//   return function () {
//     lastGeneratedId += 1;
//     return lastGeneratedId;
//   };
// }

// function getRandomInteger(min, max) {
//   const lower = Math.ceil(Math.min(min, max));
//   const upper = Math.floor(Math.max(min, max));
//   const result = Math.random() * (upper - lower + 1) + lower;
//   return Math.floor(result);
// }

// function createRandomIdFromRangeGenerator(min, max) {
//   const previousValues = [];

//   return function () {
//     let currentValue = getRandomInteger(min, max);
//     if (previousValues.length >= (max - min + 1)) {
//       return null;
//     }
//     while (previousValues.includes(currentValue)) {
//       currentValue = getRandomInteger(min, max);
//     }
//     previousValues.push(currentValue);
//     return currentValue;
//   };
// }
// const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];


const ALERT_SHOW_TIME = 5000;
const templateDataError = document
  .querySelector('#data-error')
  .content
  .querySelector('.data-error');

function showErrorMessage() {
  const errorElement = templateDataError.cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ALERT_SHOW_TIME);
}

const isEscapeKey = (evt) => evt.key === 'Escape';

export { isEscapeKey, showErrorMessage };
