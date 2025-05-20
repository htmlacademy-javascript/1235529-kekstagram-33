import { isEscapeKey } from './util.js';

const COMMENTS_SHOW_STEP = 5;
let commentsDisplayedCount = COMMENTS_SHOW_STEP;
let commentsData = [];

const bigPicture = document.querySelector('.big-picture');
const cancelBigPicture = bigPicture.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const bigPictureComments = bigPicture.querySelector('.social__comment-shown-count');
const bigPictureCommentsAll = bigPicture.querySelector('.social__comment-total-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const commentTemplate = document.querySelector('.social__comment');
const socialComments = document.querySelector('.social__comments');

const getComment = (commentSample) => {
  const comment = commentTemplate.cloneNode(true);
  const commentImg = comment.querySelector('img');
  const commentMessage = comment.querySelector('p');

  commentImg.src = commentSample.avatar;
  commentImg.alt = commentSample.name;
  commentMessage.textContent = commentSample.message;

  return comment;
};

const clearComments = () => {
  socialComments.innerHTML = '';
  commentsDisplayedCount = COMMENTS_SHOW_STEP;
  commentsLoader.classList.remove('hidden');
};


const showMoreComments = () => {
  const showComments = commentsData.slice(commentsDisplayedCount - COMMENTS_SHOW_STEP, commentsDisplayedCount);

  showComments.forEach((comment) => {
    socialComments.append(getComment(comment));
  });

  commentsDisplayedCount += COMMENTS_SHOW_STEP;

  const сommentShownCount = socialComments.children.length;
  bigPictureComments.textContent = сommentShownCount;

  if (сommentShownCount === commentsData.length){
    commentsLoader.classList.add('hidden');
  }

};

const insertComments = (photoData) => {
  commentsData = photoData.comments;
  bigPictureCommentsAll.textContent = photoData.comments.length;
  showMoreComments();
};

const onShowMoreClick = () => {
  showMoreComments();
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
  body.classList.add('modal-open');

  clearComments();
  insertComments(post);

  bigPictureImg.src = post.url;
  bigPictureImg.alt = post.description;
  bigPictureDescription.textContent = post.description;
  likesCount.textContent = post.likes;
  bigPictureCommentsAll.textContent = post.comments.length;
  bigPicture.scrollTo(0,0);

  commentsLoader.addEventListener('click', onShowMoreClick);
  document.addEventListener('keydown', onDocumentKeydown);
  cancelBigPicture.addEventListener('click', onPhotoCloseClick);
};

const closePost = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  clearComments();

  document.removeEventListener('keydown', onDocumentKeydown);
  cancelBigPicture.removeEventListener('click', onPhotoCloseClick);
  commentsLoader.removeEventListener('click', onShowMoreClick);
};

export {openPost};
