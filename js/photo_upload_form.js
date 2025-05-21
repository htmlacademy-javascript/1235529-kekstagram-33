import { isEscapeKey } from './util.js';
import { validateHashtags, errorHashtags } from './validation_hashtag.js';
import { validateDescription, errorDescription } from './validation_description.js';

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

function onHashtagsInput () {
  if (pristine.validate()) {
    imgUploadSubmit.disabled = false;
  } else {
    imgUploadSubmit.disabled = true;
  }
}

function onDescriptionInput () {
  if (pristine.validate()) {
    imgUploadSubmit.disabled = false;
  } else {
    imgUploadSubmit.disabled = true;
  }
}

const onDocumentKeydown = (event) => {
  if (isEscapeKey(event)) {
    if (document.activeElement === inputHashtags || document.activeElement === inputDescription) {
      event.stopPrepagation();
    } else {
      closeFormUpload();// eslint-disable-line
    }
  }
};

const onClickCloseBtnForm = () =>{
  closeFormUpload();// eslint-disable-line
};

const onClickFormUpload = () =>{
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

pristine.addValidator(inputHashtags, validateHashtags, errorHashtags, 1, false);
inputHashtags.addEventListener('input', onHashtagsInput);

pristine.addValidator(inputDescription, validateDescription, errorDescription, 2, false);
inputDescription.addEventListener('input', onDescriptionInput);
