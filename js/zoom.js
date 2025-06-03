const scaleControlValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');

const zoomParameters = {
  min: 25,
  max: 100,
  step: 25,
};

const changeZoom = (facktor = 1) => {
  let size = parseInt(scaleControlValue.value, 10) + (zoomParameters.step * facktor);

  if (size < zoomParameters.min){
    size = zoomParameters.min;
  }

  if (size > zoomParameters.max){
    size = zoomParameters.max;
  }
  scaleControlValue.value = `${size}%`;
  imgPreview.style.transform = `scale(${size * 0.01})`;
};

const resetZoom = () => {
  imgPreview.style.removeProperty('transform');
  scaleControlValue.value = '100%';
};

export {changeZoom, resetZoom};
