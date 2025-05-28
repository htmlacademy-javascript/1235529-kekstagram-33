import { isEscapeKey } from './util.js';
import { validateDescription, validateHashtags, getError } from './validation.js';

const body = document.querySelector('body');
const overlayForm = document.querySelector('.img-upload__overlay');
const closeBtnForm = overlayForm.querySelector('.img-upload__cancel');
const UploadForm = document.querySelector('.img-upload__form');
const inputDescription = UploadForm.querySelector('.text__description');
const inputHashtags = UploadForm.querySelector('.text__hashtags');
const UploadSubmit = UploadForm.querySelector('.img-upload__submit');
const uploadFile = document.querySelector('#upload-file');

const pristine = new Pristine(UploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const onHashtagsInput = () => {
  if (pristine.validate()) {
    UploadSubmit.disabled = false;
    return;
  }
  UploadSubmit.disabled = true;
};

const onDescriptionInput = () => {
  if (pristine.validate()) {
    UploadSubmit.disabled = false;
    return;
  } UploadSubmit.disabled = true;
};

const onDocumentKeydown = (event) => isEscapeKey(event) && (document.activeElement === inputHashtags || document.activeElement === inputDescription ? event.stopPropagation() : closeFormUpload());// eslint-disable-line

const onClickCloseBtnForm = () => closeFormUpload();// eslint-disable-line


const onClickFormUpload = () => {
  body.classList.add('modal-open');
  overlayForm.classList.remove('hidden');
  closeBtnForm.addEventListener('click', onClickCloseBtnForm);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeFormUpload = () => {
  overlayForm.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeBtnForm.removeEventListener('click', onClickCloseBtnForm);
};

uploadFile.addEventListener('change', onClickFormUpload);

pristine.addValidator(inputHashtags, validateHashtags, getError('tags'), 1, false);
inputHashtags.addEventListener('input', onHashtagsInput);

pristine.addValidator(inputDescription, validateDescription, getError('description'), 2, false);
inputDescription.addEventListener('input', onDescriptionInput);

