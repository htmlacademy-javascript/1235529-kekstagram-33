import { onDocumentKeydown } from './util.js';
import { createElementRemover } from './util.js';

const alertTemplateError = document.querySelector('#error').content;

const removeAlert = () => {
  createElementRemover(
    '.error',
    () => document.removeEventListener('keydown', onDocumentKeydown)
  );
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

  document.addEventListener('keydown', onDocumentKeydown(removeAlert));
  document.body.append(alert);
};

export {showAlertError};
