import { createDescriptionPhoto } from './data.js';
import {openBigPicture} from './rendering_full_size_photo.js';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

const onThumbnailClick = (evt, photo) => {
  evt.preventDefault();
  openBigPicture(photo);
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


const renderThumbnails = () =>{
  const fragment = document.createDocumentFragment();

  createDescriptionPhoto.forEach((photo) => {
    fragment.append(createThumbnail(photo));
  });
  pictures.append(fragment);
};

export {renderThumbnails};
