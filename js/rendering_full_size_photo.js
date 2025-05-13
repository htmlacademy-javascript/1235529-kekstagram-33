import { isEscapeKey } from './util.js';
import { insertComments } from './insert-comment.js';

const bigPicture = document.querySelector('.big-picture');
const cancelBigPicture = bigPicture.querySelector('.big-picture__cancel');
const bodyList = document.querySelector('body');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureComments = bigPicture.querySelector('.social__comment-shown-count');
const bigPictureCommentsAll = bigPicture.querySelector('.social__comment-total-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onPhotoCloseClick = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

function openBigPicture(photo) {
  bigPicture.classList.remove('hidden');
  bodyList.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  socialCommentCount.classList.add('hidden');

  insertComments(photo);

  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  bigPictureDescription.textContent = photo.description;
  bigPictureLikes.textContent = photo.likes;
  bigPictureComments.textContent = photo.comments.length;
  bigPictureCommentsAll.textContent = photo.comments.length;

  document.addEventListener('keydown', onDocumentKeydown);
  cancelBigPicture.addEventListener('click', onPhotoCloseClick);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  bodyList.classList.remove('modal-open');

  bigPictureImg.src = '';
  bigPictureImg.alt = '';
  bigPictureDescription.textContent = '';
  bigPictureLikes.textContent = '';
  bigPictureComments.textContent = '';
  bigPictureCommentsAll.textContent = '';

  document.removeEventListener('keydown', onDocumentKeydown);
  cancelBigPicture.removeEventListener('click', onPhotoCloseClick);
}

export {openBigPicture};
