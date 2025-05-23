const DESCRIPTION_SYMBOLS_MAX = 140;
const HASHTAGS_SYMBOLS_MAX = 20;
const HASHTAGS_MAX = 5;

let errorMessageSample = '';

const validateDescription = (inputText) => {
  errorMessageSample = '';

  if (!inputText) {
    return true;
  }

  const rules = [
    {
      check: inputText.length > DESCRIPTION_SYMBOLS_MAX,
      error: `Максимальная длина описания ${DESCRIPTION_SYMBOLS_MAX} символов.`
    }
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessageSample = rule.error;
    }
    return !isInvalid;
  });
};

const validateHashtags = (value) => {
  errorMessageSample = '';

  const inputText = value.toLowerCase().trim();

  if (!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэштег должен начинаться с символа "#".',
    },
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хэштег не может состоять только из символа "#".',
    },
    {
      check: inputArray.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэштеги разделяются пробелами.'
    },
    {
      check: inputArray.some((item, num, arr) => arr.includes(item, num + 1)),
      error: 'Хэштеги не должны повторяться.'
    },
    {
      check: inputArray.some((item) => item.length > HASHTAGS_SYMBOLS_MAX),
      error: `Максимальная длина одного хэштега ${HASHTAGS_SYMBOLS_MAX} символов, включая символ "#".`
    },
    {
      check: inputArray.length > HASHTAGS_MAX,
      error: `Хэштегов должно быть не больше ${HASHTAGS_MAX}.`
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэштег содержит недопустимый символ.'
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessageSample = rule.error;
    }
    return !isInvalid;
  });
};

const errorMessage = () => errorMessageSample;


export { validateDescription, validateHashtags, errorMessage };
