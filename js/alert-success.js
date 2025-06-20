import { isEscapeKey } from './util.js';

const alertTemplateSuccess = document.querySelector('#success').content;

const removeAlert = () => {
  const currentAlert = document.querySelector('.success');
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

  document.addEventListener('keydown', onDocumentKeydown);
  document.body.append(alert);
};

export { showAlertSucces };
