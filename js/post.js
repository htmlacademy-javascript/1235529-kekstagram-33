import { isEscapeKey } from './util.js';

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
const commentTemplate = document.querySelector('.social__comment');

const getComment = (commentSample) => {
  const comment = commentTemplate.cloneNode(true);
  const commentImg = comment.querySelector('img');
  const commentMessage = comment.querySelector('p');

  commentImg.src = commentSample.avatar;
  commentImg.alt = commentSample.name;
  commentMessage.textContent = commentSample.message;

  return comment;
};


const insertComments = (photoData) => {

  const socialComments = document.querySelector('.social__comments');
  const socialCommentsFragment = document.createDocumentFragment();

  while (socialComments.firstChild) {
    socialComments.removeChild(socialComments.firstChild);
  }

  photoData.comments.forEach((commentData) => {
    socialCommentsFragment.append(getComment(commentData));
  });

  socialComments.append(socialCommentsFragment);
};

const onDocumentKeydown = (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    closePost(); // eslint-disable-line
  }
};

const onPhotoCloseClick = (event) => {
  event.preventDefault();
  closePost(); // eslint-disable-line
};

const openPost = (post) => {
  bigPicture.classList.remove('hidden');
  bodyList.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  socialCommentCount.classList.add('hidden');

  insertComments(post);

  bigPictureImg.src = post.url;
  bigPictureImg.alt = post.description;
  bigPictureDescription.textContent = post.description;
  bigPictureLikes.textContent = post.likes;
  bigPictureComments.textContent = post.comments.length;
  bigPictureCommentsAll.textContent = post.comments.length;

  document.addEventListener('keydown', onDocumentKeydown);
  cancelBigPicture.addEventListener('click', onPhotoCloseClick);
};

const closePost = () => {
  bigPicture.classList.add('hidden');
  bodyList.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  cancelBigPicture.removeEventListener('click', onPhotoCloseClick);
};

export {openPost};
