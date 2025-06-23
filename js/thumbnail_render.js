import { openPost } from './post.js';
import { showPopup } from './popup-error.js';
import { getData } from './api.js';


const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const onThumbnailClick = (evt, photo) => {
  evt.preventDefault();
  openPost(photo);
};

const createThumbnail = (photo) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__img').src = photo.url;
  thumbnail.querySelector('.picture__img').alt = photo.description;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;

  thumbnail.addEventListener('click', (evt) => {
    onThumbnailClick(evt, photo);
  });

  return thumbnail;
};

const renderThumbnails = (pictures) =>{
  const fragment = document.createDocumentFragment();

  pictures.forEach((photo) => {
    fragment.append(createThumbnail(photo));
  });
  picturesContainer.append(fragment);
};

getData()
  .then((pictures)=> renderThumbnails(pictures))
  .catch((err) => showPopup(err.message));

export {renderThumbnails};
