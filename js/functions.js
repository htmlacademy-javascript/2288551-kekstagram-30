//Задание 1: проверки длины строки

function checkingLength (string, maxLength) { //eslint-disable-line no-unused-vars
  return (string.length <= maxLength);
}

//Задание 2: является ли строка палиндромом

function checkingPalindrome (string) { //eslint-disable-line no-unused-vars
  let word = '';
  word = (string.toLowerCase()).replaceAll(' ', '');
  let copyWord = '';
  for (let i = word.length - 1; i >= 0; --i) {
    copyWord += word[i];
  }
  return (copyWord === word);
}

//Задание 3: извлекаем цифры

function searchNumbers (string) { //eslint-disable-line no-unused-vars
  string = string.toString();
  let sumString = '';
  for (let i = 0; i < string.length; ++i) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      sumString += string[i];
    }
  }
  return (sumString === '') ? NaN : Number(sumString);
}
