import { isEscapeKey } from './util.js';

const alertTemplateError = document.querySelector('#error').content;
const alertTemplateSuccess = document.querySelector('#success').content;

const typeAlerts = {
  SUCCESS: '.success',
  ERROR: '.error',
};

const removeAlert = (type) => {
  const currentAlert = document.querySelector(type);
  if (currentAlert) {
    document.body.removeChild(currentAlert);
    /* eslint-disable no-use-before-define*/
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const onDocumentKeydown = (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    if (document.querySelector(typeAlerts.ERROR)) {
      removeAlert(typeAlerts.ERROR);
    } else if (document.querySelector(typeAlerts.SUCCESS)) {
      removeAlert(typeAlerts.SUCCESS);
    }
  }
};

const showAlertError = (message) => {
  const alert = alertTemplateError.cloneNode(true);

  const alertTitle = alert.querySelector('.error__title');
  alertTitle.textContent = message;

  const alertButton = alert.querySelector('button');

  alertButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    removeAlert(typeAlerts.ERROR);
  });

  const alertSection = alert.querySelector('section');

  alertSection.addEventListener('click', () => {
    removeAlert(typeAlerts.ERROR);
  });

  document.addEventListener('keydown', onDocumentKeydown);
  document.body.append(alert);
};

const showAlertSuccess = () => {
  const alert = alertTemplateSuccess.cloneNode(true);

  const alertButton = alert.querySelector('.success__button');

  alertButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    removeAlert(typeAlerts.SUCCESS);
  });

  const alertSection = alert.querySelector('.success');

  alertSection.addEventListener('click', () => {
    removeAlert(typeAlerts.SUCCESS);
  });

  document.addEventListener('keydown', onDocumentKeydown);
  document.body.append(alert);
};

export {showAlertError, showAlertSuccess};
