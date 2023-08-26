import Swiper, { Navigation } from 'swiper';

export const universityMatrialsSlider = new Swiper('.universityMaterials__slider', {
  modules: [Navigation],
  slidesPerView: 1,
  spaceBetween: 24,
  navigation: {
    prevEl: '.universityMaterials__arrow--prev',
    nextEl: '.universityMaterials__arrow--next',
  },
});
