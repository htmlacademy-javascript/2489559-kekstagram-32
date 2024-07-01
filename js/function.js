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

