const DESCRIPTION_SYMBOLS_MAX = 140;
const HASHTAGS_SYMBOLS_MAX = 20;
const HASHTAGS_MAX = 5;

const errors = {
  tags: '',
  description: '',
};

const validateDescription = (inputText) => {
  if (!inputText) {
    return true;
  }

  const errorDescription = `Максимальная длина описания ${DESCRIPTION_SYMBOLS_MAX} символов.`;

  if (inputText.length >= DESCRIPTION_SYMBOLS_MAX) {
    errors.description = errorDescription;
    return false;
  }
  return true;
};

const validateHashtags = (value) => {
  const inputText = value.toLowerCase().trim();
  if (!inputText) {
    return true;
  }

  const inputData = inputText.split(/\s+/);
  const rules = [
    {
      check: inputData.some((item) => item[0] !== '#'),
      error: 'Хэштег должен начинаться с символа "#".',
    },
    {
      check: inputData.some((item) => item === '#'),
      error: 'Хэштег не может состоять только из символа "#".',
    },
    {
      check: inputData.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэштеги разделяются пробелами.'
    },
    {
      check: inputData.some((item, i) => inputData.includes(item, i + 1)),
      error: 'Хэштеги не должны повторяться.'
    },
    {
      check: inputData.some((item) => item.length > HASHTAGS_SYMBOLS_MAX),
      error: `Максимальная длина одного хэштега ${HASHTAGS_SYMBOLS_MAX} символов, включая символ "#".`
    },
    {
      check: inputData.length > HASHTAGS_MAX,
      error: `Хэштегов должно быть не больше ${HASHTAGS_MAX}.`
    },
    {
      check: inputData.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэштег содержит недопустимый символ.'
    },
  ];

  return rules.every((rule) => {
    if (rule.check) {
      errors.tags = rule.error;
      return false;
    }
    return true;
  });
};

const getError = (field) => () => errors[field];


export {validateDescription, validateHashtags, getError};
