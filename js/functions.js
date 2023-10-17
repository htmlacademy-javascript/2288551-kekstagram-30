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

//Задание(module5-task2): Делу — время
function workLifeBalance(startDay, endDay, startMeeting, durationMeeting) { //eslint-disable-line no-unused-vars
  startDay = startDay.split(':');
  startDay.forEach((element, index, array) => array[index] = Number(element));
  const startDayTime = startDay[0] * 60 + startDay[1];

  endDay = endDay.split(':');
  endDay.forEach((element, index, array) => array[index] = Number(element));
  const endDayTime = endDay[0] * 60 + endDay[1];

  startMeeting = startMeeting.split(':');
  startMeeting.forEach((element, index, array) => array[index] = Number(element));
  const startMeetingTime = startMeeting[0] * 60 + startMeeting[1];
  const endMeetingTime = startMeeting[0] * 60 + startMeeting[1] + durationMeeting;

  if (startDayTime <= startMeetingTime && endDayTime >= endMeetingTime) {
    return true;
  }
  return false;
}
