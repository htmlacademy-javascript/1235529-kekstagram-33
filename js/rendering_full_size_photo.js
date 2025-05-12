import { isEscapeKey } from './util.js';

const bigPhoto = document.querySelector('.big-picture');
const cancelBigPhoto = bigPhoto.querySelector('.big-picture__cancel');
const bodyList = document.querySelector('body');
const commentsLoader = bigPhoto.querySelector('.comments-loader');
const socialCommentCount = bigPhoto.querySelector('.social__comment-count');
const bigPhotoImg = bigPhoto.querySelector('.big-picture__img img');
const bigPhotoLikes = bigPhoto.querySelector('.likes-count');
const bigPhotoComments = bigPhoto.querySelector('.social__comment-shown-count');
const bigPhotoCommentsAll = bigPhoto.querySelector('.social__comment-total-count');
const bigPhotoDescription = bigPhoto.querySelector('.social__caption');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
};

const onPhotoCloseClick = (evt) => {
  evt.preventDefault();
  closeBigPhoto();
};

function openBigPhoto(photo) {
  bigPhoto.classList.remove('hidden');
  bodyList.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  socialCommentCount.classList.add('hidden');

  bigPhotoImg.src = photo.url;
  bigPhotoImg.alt = photo.description;
  bigPhotoDescription.textContent = photo.description;
  bigPhotoLikes.textContent = photo.likes;
  bigPhotoComments.textContent = photo.comments.length;
  bigPhotoCommentsAll.textContent = photo.comments.length;

  document.addEventListener('keydown', onDocumentKeydown);
  cancelBigPhoto.addEventListener('click', onPhotoCloseClick);
}

function closeBigPhoto() {
  bigPhoto.classList.add('hidden');
  bodyList.classList.remove('modal-open');

  bigPhotoImg.src = '';
  bigPhotoImg.alt = '';
  bigPhotoDescription.textContent = '';
  bigPhotoLikes.textContent = '';
  bigPhotoComments.textContent = '';
  bigPhotoCommentsAll.textContent = '';

  document.removeEventListener('keydown', onDocumentKeydown);
  cancelBigPhoto.removeEventListener('click', onPhotoCloseClick);
}

export {openBigPhoto};
