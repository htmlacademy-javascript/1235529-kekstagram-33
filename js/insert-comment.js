import { getComment } from './get-comment.js';

const socialComments = document.querySelector('.social__comments');
const socialCommentsFragment = document.createDocumentFragment();

const insertComments = (photoData) => {
  while (socialComments.firstChild) {
    socialComments.removeChild(socialComments.firstChild);
  }

  photoData.comments.forEach((commentData) => {
    socialCommentsFragment.append(getComment(commentData));
  });

  socialComments.append(socialCommentsFragment);
};

export { insertComments };
