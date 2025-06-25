import { renderThumbnails } from './thumbnail_render.js';
import { initUploadForm } from './photo_upload_form.js';
import { getData } from './api.js';
import { showPopup } from './popup-error.js';

const init = () => {
  initUploadForm();
  getData()
    .then((pictures) => renderThumbnails(pictures))
    .catch((err) => showPopup(err.message));
};

export {init};
