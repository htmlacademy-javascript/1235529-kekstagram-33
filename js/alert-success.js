import { onDocumentKeydown } from './util.js';
import { createElementRemover } from './util.js';

const alertTemplateSuccess = document.querySelector('#success').content;

const removeAlert = () => {
  createElementRemover(
    '.success',
    () => document.removeEventListener('keydown', onDocumentKeydown)
  );
};

const showAlertSucces = () => {
  const alert = alertTemplateSuccess.cloneNode(true);

  const alertButton = alert.querySelector('.success__button');

  alertButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    removeAlert();
  });

  const alertSection = alert.querySelector('.success');

  alertSection.addEventListener('click', () => {
    removeAlert();
  });

  document.addEventListener('keydown', onDocumentKeydown(removeAlert));
  document.body.append(alert);
};

export {showAlertSucces};
