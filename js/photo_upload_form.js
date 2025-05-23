import { isEscapeKey } from './util.js';
import { validateDescription, validateHashtags, errorMessage } from './validation.js';

const body = document.querySelector('body');
const formUpload = document.querySelector('.img-upload__overlay');
const openBtnForm = document.querySelector('.img-upload__start');
const closeBtnForm = formUpload.querySelector('.img-upload__cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const inputDescription = imgUploadForm.querySelector('.text__description');
const inputHashtags = imgUploadForm.querySelector('.text__hashtags');
const imgUploadSubmit = imgUploadForm.querySelector('.img-upload__submit');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const onHashtagsInput = () => {
  if (pristine.validate()) {
    imgUploadSubmit.disabled = false;
    return;
  }
  imgUploadSubmit.disabled = true;

};

const onDescriptionInput = () => {
  if (pristine.validate()) {
    imgUploadSubmit.disabled = false;
    return;
  } imgUploadSubmit.disabled = true;
};

const onDocumentKeydown = (event) => isEscapeKey(event) && (document.activeElement === inputHashtags || document.activeElement === inputDescription ? event.stopPropagation() : closeFormUpload());// eslint-disable-line

const onClickCloseBtnForm = () => closeFormUpload();// eslint-disable-line


const onClickFormUpload = () => {
  body.classList.add('modal-open');
  formUpload.classList.remove('hidden');
  closeBtnForm.addEventListener('click', onClickCloseBtnForm);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeFormUpload = () => {
  formUpload.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeBtnForm.removeEventListener('click', onClickCloseBtnForm);
};

openBtnForm.addEventListener('click', onClickFormUpload);

pristine.addValidator(inputHashtags, validateHashtags, errorMessage, 1, false);
inputHashtags.addEventListener('input', onHashtagsInput);

pristine.addValidator(inputDescription, validateDescription, errorMessage, 2, false);
inputDescription.addEventListener('input', onDescriptionInput);
