import { isEscapeKey } from './util.js';
import { validateDescription, validateHashtags, getError } from './validation.js';
import { changeZoom, resetZoom } from './zoom.js';
import { resetEffect } from './filters.js';
import { sendData } from './api.js';
import { showAlertSucces } from './alert-success.js';
import { showAlertError } from './alert-error.js';

const ERROR_TAGS = 'tags';
const ERROR_DESCRIPTION = 'description';

const body = document.querySelector('body');
const overlayForm = document.querySelector('.img-upload__overlay');
const closeBtnForm = overlayForm.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const inputDescription = uploadForm.querySelector('.text__description');
const inputHashtags = uploadForm.querySelector('.text__hashtags');
const uploadSubmit = uploadForm.querySelector('.img-upload__submit');
const uploadFile = document.querySelector('#upload-file');
const scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadForm.querySelector('.scale__control--bigger');


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const onHashtagsInput = () => {
  if (pristine.validate()) {
    uploadSubmit.disabled = false;
    return;
  }

  uploadSubmit.disabled = true;
};

const onDescriptionInput = () => {
  if (pristine.validate()) {
    uploadSubmit.disabled = false;
    return;
  } uploadSubmit.disabled = true;
};

const onDocumentKeydown = (event) => {
  if (isEscapeKey(event) && (document.activeElement === inputHashtags || document.activeElement === inputDescription)){
    return;
  }
  if (isEscapeKey(event)){
    /* eslint-disable no-use-before-define*/
    closeFormUpload();
  }
};

scaleControlSmaller.addEventListener('click', () => changeZoom(-1));
scaleControlBigger.addEventListener('click', () => changeZoom());

const onClickFormUpload = () => {
  body.classList.add('modal-open');
  overlayForm.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  closeBtnForm.addEventListener('click', closeFormUpload);
};

const closeFormUpload = () => {
  resetZoom();
  resetEffect();
  overlayForm.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeBtnForm.removeEventListener('click', closeFormUpload);
};

uploadFile.addEventListener('change', onClickFormUpload);

pristine.addValidator(inputHashtags, validateHashtags, getError(ERROR_TAGS), false);
inputHashtags.addEventListener('input', onHashtagsInput);

pristine.addValidator(inputDescription, validateDescription, getError(ERROR_DESCRIPTION), false);
inputDescription.addEventListener('input', onDescriptionInput);

const onFormImgUploadSubmit = (evt) => {
  evt.preventDefault();
  uploadSubmit.disabled = true;

  const formData = new FormData(uploadForm);

  sendData(formData)
    .then(() => {
      showAlertSucces();
      closeFormUpload();
    })
    .catch((err) => {
      showAlertError(err.message);
    })
    .finally(() => {
      uploadSubmit.disabled = false;
    });
};

uploadForm.addEventListener('submit', onFormImgUploadSubmit);
