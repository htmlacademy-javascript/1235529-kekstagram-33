import { isEscapeKey } from './util.js';

const alertTemplateError = document.querySelector('#error').content;

const removeAlert = () => {
  const currentAlert = document.querySelector('.error');
  if (currentAlert) {
    document.body.removeChild(currentAlert);
    /* eslint-disable no-use-before-define*/
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const onDocumentKeydown = (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    removeAlert();
  }
};

const showAlertError = (message) => {
  const alert = alertTemplateError.cloneNode(true);

  const alertTitle = alert.querySelector('.error__title');
  alertTitle.textContent = message;

  const alertButton = alert.querySelector('button');

  alertButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    removeAlert();
  });

  const alertSection = alert.querySelector('section');

  alertSection.addEventListener('click', () => {
    removeAlert();
  });

  document.addEventListener('keydown', onDocumentKeydown);
  document.body.append(alert);
};

export {showAlertError};
