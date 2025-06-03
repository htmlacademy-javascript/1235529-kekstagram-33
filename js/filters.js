const
  EFFECTS_STEP = 0.01,
  MAX_BLUR_VALUE = 3,
  MAX_BRIGHTNESS = 3;

const slider = {
  MIN: 0,
  MAX: 100,
  STEP: 1,
};

const uploadForm = document.querySelector('.img-upload__form');
const effectsList = uploadForm.querySelector('.effects__list');
const imgPreview = uploadForm.querySelector('.img-upload__preview');
const image = imgPreview.querySelector('img');
const imgSliderUpload = uploadForm.querySelector('.img-upload__effect-level');
const effectValue = uploadForm.querySelector('.effect-level__value');
const sliderElement = uploadForm.querySelector('.effect-level__slider');

const effects = {
  none: () => {
    imgSliderUpload.classList.add('visually-hidden');
    return 'none';
  },
  chrome: () => {
    imgSliderUpload.classList.remove('visually-hidden');
    return `grayscale(${parseInt(effectValue.value, 10) * EFFECTS_STEP})`;
  },
  sepia: () => {
    imgSliderUpload.classList.remove('visually-hidden');
    return `sepia(${parseInt(effectValue.value, 10) * EFFECTS_STEP})`;
  },
  marvin: () => {
    imgSliderUpload.classList.remove('visually-hidden');
    return `invert(${Math.floor(effectValue.value, 10)}%)`;
  },
  phobos: () => {
    imgSliderUpload.classList.remove('visually-hidden');
    return `blur(${(parseInt(effectValue.value, 10) * MAX_BLUR_VALUE) * EFFECTS_STEP}px)`;
  },
  heat: () => {
    imgSliderUpload.classList.remove('visually-hidden');
    return `brightness(${(parseInt(effectValue.value, 10) * MAX_BRIGHTNESS) * EFFECTS_STEP})`;
  },
};

effects.none();

let currentEffect = '';

const onEffectsListClick = (evt) => {
  const target = evt.target;

  if (target.classList.contains('effects__preview')) {
    sliderElement.noUiSlider.set(slider.MAX);
    effectValue.value = slider.MAX;

    currentEffect = target.classList[1].replace('effects__preview--', '');
    image.style.filter = effects[currentEffect]();
  }
};

effectsList.addEventListener('click', onEffectsListClick);

noUiSlider.create(sliderElement, {
  range: {
    min: slider.MIN,
    max: slider.MAX,
  },
  start: slider.MAX,
  step: slider.STEP,
  connect: 'lower',
});

sliderElement.noUiSlider.on('slide', (value) => {
  effectValue.value = [...value];
  image.style.filter = effects[currentEffect.replace('effects__preview--', '')]();
});

const resetEffect = () => {
  image.style.removeProperty('filter');
  effectValue.value = '';
  sliderElement.noUiSlider.updateOptions({
    start: slider.MAX,
  });
  effectsList.querySelector('#effect-none').checked = true;
  effects.none();
};

export { resetEffect };
