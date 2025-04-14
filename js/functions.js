//Проверка длинны строки.

function lengthCheck (line, length) {
  return line.length <= length;
}

lengthCheck();


//Проверка слова на палиндром.

function palindromeCheck (string) {
  const newString = string.replaceAll().toUpperCase();
  let emptyString = '';
  for (let i = newString.length - 1; i >= 0; i--){
    emptyString += newString[i];
  }
  return emptyString === newString ? true : false;
}

palindromeCheck();

