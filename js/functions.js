//Проверка длинны строки.

const isLTE = (text, length) => text.length <= length;

isLTE('ров', 3); //true
isLTE('помощь', 7); //false

//Проверка слова на палиндром.

const isPalindrome = (text) => {
  const refText = text.trim().toUpperCase();
  let reversedText = '';
  for (let i = refText.length - 1; i >= 0; i--){
    reversedText += refText[i];
  }
  return reversedText === refText;
};

isPalindrome(' ШалАш'); //true
isPalindrome('папа'); //folse
