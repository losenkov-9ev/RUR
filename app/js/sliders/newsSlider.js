import Swiper, { Navigation } from 'swiper';

export const newsSlider = new Swiper('.newsCards__box', {
  modules: [Navigation],
  slidesPerView: 3,
  spaceBetween: 30,
  navigation: {
    prevEl: '.newsCards__arrow--prev',
    nextEl: '.newsCards__arrow--next',
  },
});
