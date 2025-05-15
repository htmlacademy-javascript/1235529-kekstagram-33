const getComment = (commentData) => {
  const commentTemplate = document.querySelector('.social__comment');

  const comment = commentTemplate.cloneNode(true);
  const commentImg = comment.querySelector('img');
  const commentMessage = comment.querySelector('p');

  commentImg.src = commentData.avatar;
  commentImg.alt = commentData.name;
  commentMessage.textContent = commentData.message;

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

export { insertComments };
