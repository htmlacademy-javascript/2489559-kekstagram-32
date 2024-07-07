function checkName(strName, nameLength) {
  if (strName.length <= nameLength) {
    return true;
  } else {
    return false;
  }
}

// Строка короче 20 символов
checkName('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkName('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkName('проверяемая строка', 10); // false

function checkPalindromLength (palindromName) {
  palindromName = palindromName.toUpperCase();
  palindromName = palindromName.replaceAll(' ','');
  let reversedPalindrom = '';

  for (let i = palindromName.length - 1; 0 <= i; i--) {
    reversedPalindrom += palindromName[i];
  }

  if (reversedPalindrom === palindromName) {
    return true;
  } else {
    return false;
  }

}
// Строка является палиндромом
checkPalindromLength('топот'); // true
// Несмотря на разный регистр, тоже палиндром
checkPalindromLength('ДовОд'); // true
// Это не палиндром
checkPalindromLength('Кекс'); // false
// Это палиндром
checkPalindromLength('Лёша на полке клопа нашёл '); // true

function containsOnlyNumbers(str) {
  let number = '';
  for (let i = 0; i <= str.length - 1; i++) {
    if (/^[0-9]+$/.test(str[i])) {
      number += str[i];
    }
  }
  return(parseInt(number,10)) ;
}

containsOnlyNumbers('2023 год'); // 2023
containsOnlyNumbers('ECMAScript 2022'); // 2022
containsOnlyNumbers('1 кефир, 0.5 батона'); // 105
containsOnlyNumbers('агент 007'); // 7
containsOnlyNumbers('а я томат'); // NaN

// Задание Функции возвращаются
function toMinutes (array) {
  const arrayMinutes = array.split(':');
  arrayMinutes[0] *= 60;
  arrayMinutes[1] *= 1;
  const startArray = arrayMinutes.reduce((acc, number) => acc + number, 0);
  return startArray;
}

function conversationCheck(timeStart, timeEnd, conversationStart, conversationLasting) {
  const start = toMinutes(timeStart);
  const end = toMinutes(timeEnd);
  const conversation = toMinutes(conversationStart);
  const duration = conversation + conversationLasting;

  if (duration <= end && conversation >= start && conversation < end) {
    return true;
  } else {
    return false;
  }
}

conversationCheck('08:00', '17:30', '14:00', 90); // true
conversationCheck('8:0', '10:0', '8:0', 120); // true
conversationCheck('14:00', '17:30', '08:0', 90); // false
conversationCheck('8:00', '17:30', '08:00', 900); // false
