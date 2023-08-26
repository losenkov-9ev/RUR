import Swiper, { Navigation, Pagination } from 'swiper';

export const universityGallerySlider = new Swiper('.universityGallery__slider', {
  modules: [Navigation, Pagination],
  slidesPerView: 1,
  spaceBetween: 24,
  navigation: {
    prevEl: '.universityGallery__arrow--prev',
    nextEl: '.universityGallery__arrow--next',
  },
  pagination: {
    el: '.universityGallery__slider-pagination',
    type: 'bullets',
    clickable: true,
  },
});
